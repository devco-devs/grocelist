export function convertToCents(value: string) {
  return Number(value.replace(',', '.')) * 100;
}

export function convertToReais(value: number) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value / 100);
}
