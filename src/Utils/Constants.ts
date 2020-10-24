import { SemanticCOLORS, SemanticICONS } from 'semantic-ui-react'

export enum Messages {
  genericError = 'Something went wrong. Check your data and try again!',
}

export enum DateFormats {
  server = 'yyyy-MM-dd',
  ui = 'dd/MM/yyyy'
}

export enum DateTimeFormats {
  server = 'YYYY-MM-DD HH:II:SS',
  ui = 'DD/MM/YYYY HH:II:SS'
}

type TOrderStatusesInfo = {
  color: SemanticCOLORS
  icon: SemanticICONS
  title: string
}

export const orderStatusesInfo: TOrderStatusesInfo[] = [
  {
    color: 'yellow',
    icon: 'time',
    title: 'SOLIC. ORÇAMENTO',
  },
  {
    color: 'orange',
    icon: 'dollar',
    title: 'PEDIDO FECHADO',
  },
  {
    color: 'olive',
    icon: 'cut',
    title: 'EM ANDAMENTO',
  },
  {
    color: 'green',
    icon: 'boxes',
    title: 'FINALIZADO',
  },
  {
    color: 'blue',
    icon: 'truck',
    title: 'ENTREGUE',
  },
  {
    color: 'red',
    icon: 'ban',
    title: 'DESISTÊNCIA',
  },
  {
    color: 'grey',
    icon: 'time',
    title: 'INDEFINIDO',
  }
]

export const SelectOrderStatuses = [
  {
    key: '0',
    value: '0',
    text: 'Solic. Fechamento'
  },
  {
    key: '1',
    value: '1',
    text: 'Pedido Fechado'
  },
  {
    key: '2',
    value: '2',
    text: 'Em Andamento'
  },
  {
    key: '3',
    value: '3',
    text: 'Finalizado'
  },
  {
    key: '4',
    value: '4',
    text: 'Entregue'
  },
  {
    key: '5',
    value: '5',
    text: 'Desistência'
  },
]

export const dateInputRegex = [
  /\d/,
  /\d/,
  '/',
  /\d/,
  /\d/,
  '/',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
]

export const SelectProductBoughtBy = [
  {
    key: 'squareMeter',
    value: 'squareMeter',
    text: 'Square Meter'
  },
  {
    key: 'linearMeter',
    value: 'linearMeter',
    text: 'Linear Meter'
  },
  {
    key: 'weight',
    value: 'weight',
    text: 'Weight'
  },
  {
    key: 'unity',
    value: 'unity',
    text: 'Unity'
  },
]

export const SelectGenders = [
  {
    key: 'uknown',
    value: 'uknown',
    text: 'Uknown'
  },
  {
    key: 'female',
    value: 'female',
    text: 'It\'s a girl'
  },
  {
    key: 'male',
    value: 'male',
    text: 'It\'s a boy'
  },
]

export const SelectStates = [
  {
    key: 'AC',
    value: 'AC',
    text: 'Acre'
  },
  {
    key: 'AL',
    value: 'AL',
    text: 'Alagoas'
  },
  {
    key: 'AP',
    value: 'AP',
    text: 'Amapá'
  },
  {
    key: 'AM',
    value: 'AM',
    text: 'Amazonas'
  },
  {
    key: 'BA',
    value: 'BA',
    text: 'Bahia'
  },
  {
    key: 'CE',
    value: 'CE',
    text: 'Ceará'
  },
  {
    key: 'DF',
    value: 'DF',
    text: 'Distrito Federal'
  },
  {
    key: 'ES',
    value: 'ES',
    text: 'Espírito Santo'
  },
  {
    key: 'GO',
    value: 'GO',
    text: 'Goías'
  },
  {
    key: 'MA',
    value: 'MA',
    text: 'Maranhão'
  },
  {
    key: 'MT',
    value: 'MT',
    text: 'Mato Grosso'
  },
  {
    key: 'MS',
    value: 'MS',
    text: 'Mato Grosso do Sul'
  },
  {
    key: 'MG',
    value: 'MG',
    text: 'Minas Gerais'
  },
  {
    key: 'PA',
    value: 'PA',
    text: 'Pará'
  },
  {
    key: 'PB',
    value: 'PB',
    text: 'Paraíba'
  },
  {
    key: 'PR',
    value: 'PR',
    text: 'Paraná'
  },
  {
    key: 'PE',
    value: 'PE',
    text: 'Pernambuco'
  },
  {
    key: 'PI',
    value: 'PI',
    text: 'Piauí'
  },
  {
    key: 'RJ',
    value: 'RJ',
    text: 'Rio de Janeiro'
  },
  {
    key: 'RN',
    value: 'RN',
    text: 'Rio Grande do Norte'
  },
  {
    key: 'RS',
    value: 'RS',
    text: 'Rio Grande do Sul'
  },
  {
    key: 'RO',
    value: 'RO',
    text: 'Rondônia'
  },
  {
    key: 'RR',
    value: 'RR',
    text: 'Roraíma'
  },
  {
    key: 'SC',
    value: 'SC',
    text: 'Santa Catarina'
  },
  {
    key: 'SP',
    value: 'SP',
    text: 'São Paulo'
  },
  {
    key: 'SE',
    value: 'SE',
    text: 'Sergipe'
  },
  {
    key: 'TO',
    value: 'TO',
    text: 'Tocantins'
  },
]
