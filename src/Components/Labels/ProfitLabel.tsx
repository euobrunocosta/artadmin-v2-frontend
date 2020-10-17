import React from 'react'
import { Label } from 'semantic-ui-react'
import styled from 'styled-components'
import { formatNumberToPercentage } from '../../Utils/Helpers'

const LabelComponent = styled(Label)`
  margin-left: 10px !important;
`

type TProps = {
  profitPercentage: number
}

type TProfitColor = 'green' | 'yellow' | 'red'

const ProfitLabel = (props: TProps) => {
  const { profitPercentage } = props

  let profitColor: TProfitColor = 'green'
  if (profitPercentage < 5000) profitColor = 'yellow'
  if (profitPercentage < 2000) profitColor = 'red'

  return (
    <LabelComponent color={profitColor}>
      {formatNumberToPercentage(profitPercentage)}
    </LabelComponent>
  )
}

export default ProfitLabel
