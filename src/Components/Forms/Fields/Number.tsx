import React from 'react'
import { GridRow, GridColumn, Input } from 'semantic-ui-react'
import MaskedInput from 'react-text-mask'
import { createNumberMask } from 'text-mask-addons'

type TProps = {
  label: string
  name: string
  value: string
  onChange: any
}

const numberMaskOptions = {
  prefix: '',
  suffix: '',
  includeThousandsSeparator: true,
  thousandsSeparatorSymbol: '.',
  allowDecimal: true,
  decimalSymbol: ',',
  decimalLimit: 2,
  allowNegative: false,
  allowLeadingZeroes: true,
}

const numberMask = createNumberMask(numberMaskOptions)

const Number = (props: TProps) => {
  const { label, name, value, onChange } = props

  return (
    <GridRow>
      <GridColumn computer={3} verticalAlign="middle" textAlign="right">
        <label>{label}</label>
      </GridColumn>
      <GridColumn computer={13}>
        <Input type="text">
          <MaskedInput
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            mask={numberMask}
            guide
            style={{ textAlign: 'right' }}
          />
        </Input>
      </GridColumn>
    </GridRow>
  )
}

export default Number
