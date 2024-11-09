export function formatDate(date: string): string {
  const [tahun, bulan, hari] = date.split("-");
  return `${hari}-${bulan}-${tahun}`;
}
