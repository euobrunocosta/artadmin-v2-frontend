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
      content="New"
      trigger={<Button icon="file" inverted color="green" onClick={onClick} />}
    />
  )
}

export default ButtonAdd
