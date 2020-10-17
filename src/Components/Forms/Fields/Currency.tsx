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

const currencyMaskOptions = {
  prefix: 'R$ ',
  suffix: '',
  includeThousandsSeparator: true,
  thousandsSeparatorSymbol: '.',
  allowDecimal: true,
  decimalSymbol: ',',
  decimalLimit: 2,
  allowNegative: true,
  allowLeadingZeroes: true,
}

const currencyMask = createNumberMask(currencyMaskOptions)

const Currency = (props: TProps) => {
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
            mask={currencyMask}
            guide
            style={{ textAlign: 'right' }}
          />
        </Input>
      </GridColumn>
    </GridRow>
  )
}

export default Currency
