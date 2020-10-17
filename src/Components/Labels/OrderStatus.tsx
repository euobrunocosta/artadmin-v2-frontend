import React from 'react'
import { Label, Icon } from 'semantic-ui-react'
import { orderStatuses } from '../../Utils/Constants'

type TProps = {
  status: number
}

const GenderLabel = (props: TProps) => {
  const { status } = props

  switch (status) {
    case orderStatuses.aguardandoFechamento:
      return (
        <Label color="yellow">
          <Icon name="time" />
          SOLIC. ORÇAMENTO
        </Label>
      )
    case orderStatuses.pedidoFechado:
      return (
        <Label color="orange">
          <Icon name="dollar" />
          PEDIDO FECHADO
        </Label>
      )
    case orderStatuses.emAndamento:
      return (
        <Label color="olive">
          <Icon name="cut" />
          EM ANDAMENTO
        </Label>
      )
    case orderStatuses.finalizado:
      return (
        <Label color="green">
          <Icon name="boxes" />
          FINALIZADO
        </Label>
      )
    case orderStatuses.entregue:
      return (
        <Label color="blue">
          <Icon name="truck" />
          ENTREGUE
        </Label>
      )
    case orderStatuses.desistencia:
      return (
        <Label color="red">
          <Icon name="ban" />
          DESISTÊNCIA
        </Label>
      )
    default:
      return <Label color="blue">INDEFINIDO</Label>
  }
}

export default GenderLabel
