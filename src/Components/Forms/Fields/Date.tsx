import React from 'react'
import { GridRow, GridColumn, Input } from 'semantic-ui-react'
import MaskedInput from 'react-text-mask'
import { dateInputRegex } from '../../../Utils/Constants'

type TProps = {
  label: string
  name: string
  value: string
  onChange: any
}

const Date = (props: TProps) => {
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
            mask={dateInputRegex}
            guide
          />
        </Input>
      </GridColumn>
    </GridRow>
  )
}

export default Date
