import React from 'react'
import { Label, Icon } from 'semantic-ui-react'
import { orderStatusesInfo } from '../../Utils/Constants'
import styled from 'styled-components'

const LabelComponent = styled(Label)`
  white-space: nowrap;
`

type TProps = {
  status: number
}

const GenderLabel = (props: TProps) => {
  const { status } = props

  const { color, icon, title } = orderStatusesInfo[status]

  return (
    <LabelComponent color={color}>
      <Icon name={icon} />
      {title}
    </LabelComponent>
  )
}

export default GenderLabel
