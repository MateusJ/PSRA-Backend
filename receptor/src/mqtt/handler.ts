import mqtt from "mqtt";

const brokerUrl = process.env.MQTT_BROKER_URL || "mqtt://mosquitto:1883";
const topic = process.env.MQTT_TOPIC || "rfid/r200/tags";

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

  client.on("message", (incomingTopic, message) => {
    try {
      const data = JSON.parse(message.toString());
      console.log("New tag detected");
      console.log(`ID: ${data.id}`);
      console.log(`Hora: ${data.timestamp}`);
      console.log(`Leitor: ${data.reader_id}`);
      console.log("---");
    } catch (error) {
      console.log("Mensagem recebida (nao JSON):", message.toString());
    }
  });
}
