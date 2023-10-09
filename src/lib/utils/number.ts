function formatNumberWithCommas (num: number | string): string {
  const parts = num.toString().split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return parts.join('.')
}

export const NumberUtils = { formatNumberWithCommas }
