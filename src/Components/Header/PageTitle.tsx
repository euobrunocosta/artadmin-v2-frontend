import React from 'react'
import { Button } from 'semantic-ui-react'
import styled from 'styled-components'

const Title = styled.h2`
  display: inline;
  margin-left: 10px;
`

type TProps = {
  goesBack?: boolean
  children: string
}

const PageTitle = (props: TProps) => {
  const { goesBack, children } = props

  const onClickGoBack = () => window.history.back()

  return (
    <div>
      {goesBack && (
        <Button
          circular
          inverted
          color="blue"
          icon="arrow left"
          onClick={onClickGoBack}
        />
      )}
      <Title>{children}</Title>
    </div>
  )
}

export default PageTitle
