import React, { useState } from 'react'
import {
  Label,
  Icon,
  Button,
  Popup,
  Dropdown,
  DropdownProps,
} from 'semantic-ui-react'
import styled from 'styled-components'

const Container = styled.span`
  margin-right: 5px;
`

const ButtonGroupComponent = styled(Button.Group)`
  margin-right: 4px !important;
`

const Tag = styled.span`
  margin-right: 3px;
`

const filterOptions = [
  { key: 'Enabled', text: 'Enabled', value: 'Enabled' },
  { key: 'Disabled', text: 'Disabled', value: 'Disabled' },
]

type TProps = {
  filterEnable: TFilterEnable
  setFilterEnable(search: TFilterEnable): void
}

const ButtonFilterEnable = (props: TProps) => {
  const { filterEnable, setFilterEnable } = props

  const [filter, setFilter] = useState<TFilterEnable>(filterEnable)
  const [showDropdown, setShowDropdown] = useState(false)

  const onClickShowDropdown = () => {
    setShowDropdown(true)
  }

  const onSelectUpdateFilter = (
    e: React.SyntheticEvent<HTMLElement, Event>,
    data: DropdownProps
  ) => {
    setFilter(data.value as TFilterEnable)
    setFilterEnable(data.value as TFilterEnable)
  }

  const onClickClearFilter = () => {
    setFilterEnable(null)
    setFilter(null)
    setShowDropdown(false)
  }

  if (filter !== null) {
    return (
      <Container>
        <Label as="a" color={filter === 'Enabled' ? 'green' : 'red'}>
          <Icon name="filter" />
          <Icon name={filter === 'Enabled' ? 'check' : 'ban'} />
          <Tag>{filter}</Tag>
          <Icon name="delete" onClick={onClickClearFilter} />
        </Label>
      </Container>
    )
  }

  if (showDropdown) {
    return (
      <ButtonGroupComponent color="purple" basic>
        <Dropdown
          className="button icon"
          floating
          options={filterOptions}
          trigger={
            <>
              <Icon name="filter" />
              <Tag>Enable / Disabled</Tag>
            </>
          }
          onChange={onSelectUpdateFilter}
        />
      </ButtonGroupComponent>
    )
  }

  return (
    <Popup
      position="top right"
      content="Filter Enable/Disable"
      trigger={
        <Button
          icon="filter"
          inverted
          color="purple"
          onClick={onClickShowDropdown}
        />
      }
    />
  )
}

export default ButtonFilterEnable
