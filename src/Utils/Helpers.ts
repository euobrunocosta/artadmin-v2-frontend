import { parse } from 'date-fns'
import { DateFormats, SelectProductBoughtBy } from './Constants';

export const formatDateToUI = (date?: Date): string => {
  if (!date) return ''

  const stringDate = date.toString().substring(0, 10)

  const formattedDate = parse(
    stringDate,
    DateFormats.server,
    new Date()
  ).toLocaleDateString('pt-BR')

  return formattedDate
}

export const formatDateTimeToUI = (date?: Date): string => {
  if (!date) return ''

  const stringDate = date.toString().substring(0, 10)

  const formattedDate = parse(
    stringDate,
    DateFormats.server,
    new Date()
  ).toLocaleDateString('pt-BR')

  return formattedDate
}

export const parseDate = (date?: string) => {

  if (!date) return 

  const parsedDate = parse(
    date,
    DateFormats.ui,
    new Date()
  )

  return parsedDate
}

export const formatNumberToCurrency = (value: number) => {
  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
  return formatter.format(value / 100)
}

export const formatNumber = (value?: number) => {
  if (!value) return '...'
  const formatter = new Intl.NumberFormat('pt-BR', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2
  });
  return formatter.format(value / 100)
}

export const formatNumberToPercentage = (value?: number) => {
  if (!value) return '...'
  return `${formatNumber(value)} %`
}

export const boughtByUserFriendly = (serverBougthBy: string) => {
  const boughtBy = SelectProductBoughtBy.filter(item => item.value === serverBougthBy)
  return boughtBy[0].text.toUpperCase()
}

export const prepareNumber = (value: string) => {
  console.log(value)
  let intValue = value.replace('.', '')
    .replace(',', '.')
    .replace(/[^\d.-]/g, '')
    console.log(intValue)
  return Math.round(Number(intValue) * 100)
}

export const calculateProfit = (price: number, mateirals: number, labor: number, quantity: number) => {
  return (price - (mateirals + labor)) * (quantity / 100)
}

export const calculateMaterialValue = (material: TMaterial) => {
  const waste = (material.waste === 0 ? 0 : (material.waste / 10000)) + 1
  if (material.product.boughtBy !== 'squareMeter') {
    return ((material.product.price * material.measurementQuantity) / 100) * waste
  }
  
  return ((((material.measurementQuantity * material.width) / material.product.width) * material.product.price) / 100) * waste
}

export const formatListToSearchField = (list: TProduct[]): any[] => {
  return list.map(item => {
    return {
      ...item,
      price: formatNumberToCurrency(item.price)
    }
  })
}
