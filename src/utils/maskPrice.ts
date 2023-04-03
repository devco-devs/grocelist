export function maskPrice(value: string) {
  if (!value) return ''
  return `R$ ${value
    .replace(/\D/g, '')
    .replace(/(\d{1,2})$/, ',$1')
    .replace(/(?=(\d{3})+(\D))\B/g, '.')}`
}
