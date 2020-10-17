import React from 'react'
import { Label, Icon } from 'semantic-ui-react'

type TProps = {
  value: boolean
}

const YesNoLabel = (props: TProps) => {
  const { value } = props

  return (
    <Label color={value ? 'green' : 'red'}>
      <Icon name={value ? 'check' : 'times'} />
      {value ? 'Yes' : 'No'}
    </Label>
  )
}

export default YesNoLabel
