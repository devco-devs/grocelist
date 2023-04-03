function convertToCents(value: string) {
  return Number(value.replace(',', '.')) * 100
}

export function convertToReais(value: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value / 100)
}

export function removeMaskPriceAndConvertToCents(value: string) {
  if (!value) return 0
  return convertToCents(value.replace(/\D/g, '').replace(/,/g, '.')) / 100
}
