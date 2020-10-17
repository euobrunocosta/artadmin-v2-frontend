import React from 'react'
import {
  GridRow,
  GridColumn,
  Select,
  DropdownProps,
  DropdownItemProps,
} from 'semantic-ui-react'

type TProps = {
  label: string
  name: string
  options: DropdownItemProps[]
  value: string
  onChange:
    | ((
        event: React.SyntheticEvent<HTMLElement, Event>,
        data: DropdownProps
      ) => void)
    | undefined
}

const Text = (props: TProps) => {
  const { label, name, options, value, onChange } = props

  return (
    <GridRow>
      <GridColumn computer={3} verticalAlign="middle" textAlign="right">
        <label>{label}</label>
      </GridColumn>
      <GridColumn computer={13}>
        <Select
          id={name}
          name={name}
          options={options}
          value={value}
          search
          onChange={onChange}
        />
      </GridColumn>
    </GridRow>
  )
}

export default Text
