import React from 'react'
import { Popup, Button } from 'semantic-ui-react'

type TProps = {
  onClick: () => void
}
const ButtonAdd = (props: TProps) => {
  const { onClick } = props
  return (
    <Popup
      position="bottom right"
      content="Import Item"
      trigger={
        <Button icon="in cart" inverted color="orange" onClick={onClick} />
      }
    />
  )
}

export default ButtonAdd
