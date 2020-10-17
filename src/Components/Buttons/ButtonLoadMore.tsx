import React, { useState } from 'react'
import { Button, Icon } from 'semantic-ui-react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  justify-content: center;
`

type TProps = {
  onClick: () => Promise<void>
}

const ButtonLoadMore = (props: TProps) => {
  const { onClick } = props

  const [isLoading, setIsLoading] = useState(false)

  const onClickLoadMore = async () => {
    setIsLoading(true)
    await onClick()
    setIsLoading(false)
  }

  return (
    <Container>
      <Button
        inverted
        color="blue"
        onClick={onClickLoadMore}
        loading={isLoading}
      >
        <Icon name="cloud download" />
        Load more
      </Button>
    </Container>
  )
}

export default ButtonLoadMore
