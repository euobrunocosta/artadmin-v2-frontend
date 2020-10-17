import React from 'react'
import { Popup, Button } from 'semantic-ui-react'

type TProps = {
  onClick: () => void
  tip?: string
}
const ButtonDelete = (props: TProps) => {
  const { onClick, tip } = props
  return (
    <Popup
      position="top right"
      content={tip ? tip : 'Remove'}
      trigger={
        <Button icon="trash alternate" inverted color="red" onClick={onClick} />
      }
    />
  )
}

export default ButtonDelete
