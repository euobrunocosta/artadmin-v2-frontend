import React from 'react'
import { Popup, Button } from 'semantic-ui-react'
import { GenderLabel } from '../'
import { formatDateToUI } from '../../Utils/Helpers'

type TProps = {
  baby: TBaby
}
const ButtonBabyInfo = (props: TProps) => {
  const { baby } = props
  return (
    <Popup
      position="top right"
      trigger={<Button color="yellow" icon="child" inverted />}
    >
      <div>
        <strong>Name: </strong>
        <span>{baby.name}</span>
      </div>
      <div>
        <strong>Gender: </strong>
        <span>
          <GenderLabel gender={baby.gender} />
        </span>
      </div>
      <div>
        <strong>Birthday: </strong>
        <span>{formatDateToUI(baby.birthday)}</span>
      </div>
    </Popup>
  )
}

export default ButtonBabyInfo
