import React from 'react'
import { Popup, Button } from 'semantic-ui-react'
import {
  SemanticCOLORS,
  SemanticICONS,
} from 'semantic-ui-react/dist/commonjs/generic'

type TProps = {
  onClick: () => void
  onDoubleClick?: () => void
  tip: string
  color: SemanticCOLORS
  icon: SemanticICONS
}
const ButtonCustom = (props: TProps) => {
  const handleDoubleClick = () => {
    if (!props.onDoubleClick) return
    props.onDoubleClick()
  }

  return (
    <Popup
      position="top right"
      content={props.tip}
      trigger={<Button {...props} inverted onDoubleClick={handleDoubleClick} />}
    />
  )
}

export default ButtonCustom
