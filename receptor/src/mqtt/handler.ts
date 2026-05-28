import mqtt from "mqtt";
import { getAnimalByTagRfid, updateAnimal } from "../services/animalService";
import { createLeitura } from "../services/leituraService";
import { validateIfExistAndReturn as validateLeitor } from "../services/leitorService";
import { createMovimentacao } from "../services/movimentacaoService";
import { ServiceError } from "../services/serviceError";

const brokerUrl = process.env.MQTT_BROKER_URL || "mqtt://mosquitto:1883";
const topic = process.env.MQTT_TOPIC || "rfid/r200/tags";

type MqttPayload = {
  id?: unknown;
  reader_id?: unknown;
  timestamp?: unknown;
  rssi?: unknown;
};

function parseTimestamp(value: unknown): Date | undefined {
  if (value === undefined || value === null) {
    return undefined;
  }

  const date = new Date(value as string | number | Date);
  if (Number.isNaN(date.getTime())) {
    return undefined;
  }

  return date;
}

async function handleMqttMessage(message: Buffer): Promise<void> {
  let data: MqttPayload;
  try {
    data = JSON.parse(message.toString()) as MqttPayload;
  } catch (error) {
    console.log("Mensagem recebida (nao JSON):", message.toString());
    return;
  }

  const tagId = typeof data.id === "string" ? data.id.trim() : "";
  const readerId =
    typeof data.reader_id === "string" ? data.reader_id.trim() : "";
  const timestamp = parseTimestamp(data.timestamp);
  const rssi = typeof data.rssi === "number" ? data.rssi : undefined;

  if (!tagId || !readerId) {
    console.error("Mensagem MQTT incompleta: id ou reader_id ausente.");
    return;
  }

  let leitor;
  let animal;

  const tagNormalizada = tagId.replace(/^0[xX]/, "0x");

  try {
    [leitor, animal] = await Promise.all([
      validateLeitor(readerId),
      getAnimalByTagRfid(tagNormalizada),
    ]);
  } catch (error) {
    if (error instanceof ServiceError) {
      console.error(error.message);
      return;
    }

    console.error("Erro ao processar mensagem MQTT:", error);
    return;
  }

  if (leitor.id_propriedade !== animal.id_propriedade) {
    await createMovimentacao({
      id_animal: animal.id,
      id_origem: animal.id_propriedade,
      id_destino: leitor.id_propriedade,
      data: timestamp,
      pendente_dados: true,
    });

    await updateAnimal(animal.id, { id_propriedade: leitor.id_propriedade });

    console.log(
      `Movimentacao registrada: animal ${animal.id} agora em ${leitor.id_propriedade}`,
    );
  }

  await createLeitura({
    id_animal: animal.id,
    id_leitor: leitor.id,
    rssi,
    timestamp,
  });

  console.log(`Leitura registrada para o animal ${animal.id}`);
}

export function initMqtt(): void {
  const client = mqtt.connect(brokerUrl);

  client.on("connect", () => {
    console.log("MQTT connected");
    client.subscribe(topic, (err) => {
      if (!err) {
        console.log(`MQTT listening on topic: ${topic}`);
      }
    });
  });

  client.on("message", (_incomingTopic, message) => {
    void handleMqttMessage(message);
  });
}
