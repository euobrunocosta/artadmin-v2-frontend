import React from 'react'
import { Popup, Button } from 'semantic-ui-react'

type TProps = {
  onClick: () => void
}

const ButtonEdit = (props: TProps) => {
  const { onClick } = props

  return (
    <Popup
      position="top right"
      content="Edit"
      trigger={
        <Button icon="pencil" inverted color="violet" onClick={onClick} />
      }
    />
  )
}

export default ButtonEdit
