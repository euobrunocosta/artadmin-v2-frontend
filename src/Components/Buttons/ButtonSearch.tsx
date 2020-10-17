import React, { useState } from 'react'
import { Label, Icon, Button, Popup, Form, Input } from 'semantic-ui-react'
import styled from 'styled-components'

const Container = styled.span`
  margin-right: 5px;
`

const Tag = styled.span`
  margin-right: 5px;
`

const FormComponent = styled(Form)`
  display: inline-block;
  margin-right: 43px;
`

type TProps = {
  search: string | null
  setSearch(search: string): void
}

const ButtonSearch = (props: TProps) => {
  const { search, setSearch } = props

  const [input, setInput] = useState('')
  const [showInput, setShowInput] = useState(false)

  // const inputRef = useRef<Input>(null)

  const onClickShowInput = () => {
    setShowInput(true)
  }

  const onChangeUpdateInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value)
  }

  const onSubmitUpdateSearch = () => {
    setSearch(input)
  }

  const onClickClearSearch = () => {
    setSearch('')
    setInput('')
    setShowInput(false)
  }

  if (search !== '') {
    return (
      <Container>
        <Label as="a" color="blue">
          <Icon name="search" />
          <Tag>{input}</Tag>
          <Icon name="delete" onClick={onClickClearSearch} />
        </Label>
      </Container>
    )
  }

  if (showInput) {
    return (
      <FormComponent onSubmit={onSubmitUpdateSearch}>
        <Input
          action={{
            color: 'blue',
            icon: 'search',
          }}
          placeholder="Search..."
          size="small"
          value={input}
          onChange={onChangeUpdateInput}
          autoFocus
        />
      </FormComponent>
    )
  }

  return (
    <Popup
      position="top right"
      content="Make a search"
      trigger={
        <Button
          icon="search"
          inverted
          color="blue"
          onClick={onClickShowInput}
        />
      }
    />
  )
}

export default ButtonSearch
