import React from 'react'
import { Label } from 'semantic-ui-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCrown } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'

const Icon = styled(FontAwesomeIcon)`
  margin-right: 9px;
`

type TProps = {
  isMaster: boolean
  name: string
}

const MasterLabel = (props: TProps) => {
  const { isMaster, name } = props

  if (isMaster) {
    return (
      <Label color="yellow">
        <Icon icon={faCrown} />
        {name}
      </Label>
    )
  }
  return <div>{name}</div>
}

export default MasterLabel
