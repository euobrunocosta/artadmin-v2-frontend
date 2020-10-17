import React from 'react'
import { GridRow, GridColumn, Input } from 'semantic-ui-react'

type TProps = {
  label: string
  name: string
  value: string
  onChange: any
}

const Text = (props: TProps) => {
  const { label, name, value, onChange } = props

  return (
    <GridRow>
      <GridColumn computer={3} verticalAlign="middle" textAlign="right">
        <label>{label}</label>
      </GridColumn>
      <GridColumn computer={13}>
        <Input
          id={name}
          name={name}
          type="text"
          value={value}
          onChange={onChange}
          fluid
        />
      </GridColumn>
    </GridRow>
  )
}

export default Text
