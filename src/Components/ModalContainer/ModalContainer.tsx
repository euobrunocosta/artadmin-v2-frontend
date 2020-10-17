import React from 'react'
import { Modal } from 'semantic-ui-react'

type TProps = {
  children: React.ReactNode
  trigger: React.ReactNode
  showModal: boolean
  hideModal: () => void
  title: string
}

const ModalContainer = (props: TProps) => {
  const { children, trigger, showModal, title, hideModal } = props

  const onCloseHideModal = () => {
    hideModal()
  }
  return (
    <Modal
      size="small"
      trigger={trigger}
      open={showModal}
      onClose={onCloseHideModal}
    >
      <Modal.Header>{title}</Modal.Header>
      <Modal.Content>{children}</Modal.Content>
    </Modal>
  )
}

export default ModalContainer
