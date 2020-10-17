import React from 'react'
import { GridRow, GridColumn, TextArea } from 'semantic-ui-react'

type TProps = {
  label: string
  name: string
  value: string
  onChange: any
}

const TextAreaField = (props: TProps) => {
  const { label, name, value, onChange } = props

  return (
    <GridRow>
      <GridColumn computer={3} verticalAlign="middle" textAlign="right">
        <label>{label}</label>
      </GridColumn>
      <GridColumn computer={13}>
        <TextArea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          fluid
        />
      </GridColumn>
    </GridRow>
  )
}

export default TextAreaField
