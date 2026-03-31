export const PAGE_SIZE = 10;

export function parsePagination(searchParams: { page?: string | string[] }): {
  pageNum: number;
  offset: number;
} {
  const rawPage = searchParams.page;
  const rawPageNum = typeof rawPage === "string" ? rawPage : undefined;
  const pageNum = parseInt(rawPageNum || "1", 10);
  const offset = (pageNum - 1) * PAGE_SIZE;
  return { pageNum, offset };
}

export function totalPages(total: number): number {
  return Math.ceil(total / PAGE_SIZE);
}
