import React from 'react'
import { GridRow, GridColumn, Radio } from 'semantic-ui-react'

type TProps = {
  label: string
  name: string
  value: boolean
  onChange: any
}

const Toggle = (props: TProps) => {
  const { label, name, value, onChange } = props

  return (
    <GridRow>
      <GridColumn computer={3} />
      <GridColumn computer={13}>
        <Radio
          toggle
          id={name}
          name={name}
          label={label}
          checked={value}
          onChange={onChange}
        />
      </GridColumn>
    </GridRow>
  )
}

export default Toggle
