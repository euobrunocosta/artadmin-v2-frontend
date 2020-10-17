import React, { useState } from 'react'
import { Popup, Button } from 'semantic-ui-react'
import api from '../../Services/Api'

type TProps = {
  page: string
  isEnabled: boolean
  id: string
}
const ButtonEnable = (props: TProps) => {
  const { page, isEnabled, id } = props

  const [isLoading, setIsLoading] = useState(false)
  const [enabled, setEnabled] = useState(isEnabled)

  const onClickToggleEnableDisable = async () => {
    setIsLoading(true)
    const response = await api.put(`${page}/enabled/${id}`, {
      enabled: !enabled,
    })
    setIsLoading(false)
    if (!response) return
    setEnabled(response.enabled)
  }

  return (
    <Popup
      position="top right"
      content={enabled ? 'Set to Disabled' : 'Set to Enabled'}
      trigger={
        <Button
          icon={enabled ? 'check' : 'ban'}
          inverted
          color={enabled ? 'green' : 'red'}
          onClick={onClickToggleEnableDisable}
          loading={isLoading}
        />
      }
    />
  )
}

export default ButtonEnable
