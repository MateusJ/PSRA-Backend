export type Pagination = {
  page: number;
  pageSize: number;
  skip: number;
  take: number;
};

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 20;
const MAX_PAGE_SIZE = 100;

function toPositiveInt(value: unknown, fallback: number): number {
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    return fallback;
  }

  return Math.floor(parsed);
}

export function getPagination(query: Record<string, unknown>): Pagination {
  const page = toPositiveInt(query.page, DEFAULT_PAGE);
  const pageSize = Math.min(
    toPositiveInt(query.pageSize, DEFAULT_PAGE_SIZE),
    MAX_PAGE_SIZE,
  );

  return {
    page,
    pageSize,
    skip: (page - 1) * pageSize,
    take: pageSize,
  };
}
