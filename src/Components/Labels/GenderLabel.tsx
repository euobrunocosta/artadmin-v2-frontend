import React from 'react'
import { Label, Icon } from 'semantic-ui-react'

type TProps = {
  gender: TGender
}

const GenderLabel = (props: TProps) => {
  const { gender } = props

  switch (gender) {
    case 'female':
      return (
        <Label color="pink">
          <Icon name="female" />
          It's a girl
        </Label>
      )
    case 'male':
      return (
        <Label color="blue">
          <Icon name="male" />
          It's a boy
        </Label>
      )
    default:
      return (
        <Label>
          <Icon name="question" />
          Uknown
        </Label>
      )
  }
}

export default GenderLabel
