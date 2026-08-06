export function calculateTotalPages(total: number, limit: number): number {
  return Math.ceil(total / limit);
}
