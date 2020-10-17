import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { TableRow, TableCell, Checkbox, Confirm } from 'semantic-ui-react'
import Form from './Form'
import {
  ModalContainer,
  ButtonEdit,
  ButtonDelete,
  ButtonInfo,
  ButtonCustom,
} from '../../Components'
import { formatDateToUI } from '../../Utils/Helpers'

type TCustomType = TClient
type TCustomFormType = TClientForm
const individualTitle = 'Client'

type TProps = {
  item: TCustomType
  index: number
  isSelected: boolean
  toggleSelect: (index: number) => void
  editItem: (client: TCustomFormType) => Promise<true | void>
  removeItem: (id: string) => Promise<true | void>
}

const Item = (props: TProps) => {
  const { item, index, isSelected, toggleSelect, editItem, removeItem } = props
  const [showModal, setShowModal] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const history = useHistory()

  const goToBabiesPage = () => {
    history.push(`/babies/${item._id}`)
  }

  const onChangeToggleSelect = (index: number) => () => {
    toggleSelect(index)
  }

  const onClickShowConfirm = () => setShowConfirm(true)

  const onClickHideConfirm = () => setShowConfirm(false)

  const onClickShowModal = () => {
    setShowModal(true)
  }

  const hideModal = () => {
    setShowModal(false)
  }

  const _removeItem = () => {
    setShowConfirm(false)
    if (!item._id) return
    removeItem(item._id)
  }

  const info: TInfo[] = [
    {
      label: 'ID',
      value: item._id,
    },
    {
      label: 'User',
      value: item.user.name,
    },
    {
      label: 'Created At',
      value: formatDateToUI(item.createdAt),
    },
    {
      label: 'Updated At',
      value: formatDateToUI(item.updatedAt),
    },
  ]

  return (
    <>
      <Confirm
        open={showConfirm}
        content="Are you sure you want to remove this item?"
        onCancel={onClickHideConfirm}
        onConfirm={_removeItem}
        onClose={onClickHideConfirm}
        dimmer="blurring"
      />
      <TableRow key={item._id}>
        <TableCell>
          <Checkbox
            onChange={onChangeToggleSelect(index)}
            checked={isSelected}
          />
        </TableCell>
        <TableCell>{item.name}</TableCell>
        <TableCell>{`${item.city} - ${item.state}`}</TableCell>
        <TableCell>{item.referral}</TableCell>
        <TableCell textAlign="right">
          <ButtonInfo info={info} />
          <ButtonCustom
            onClick={goToBabiesPage}
            tip="List Babies"
            color="yellow"
            icon="child"
          />
          <ModalContainer
            title={`Edit ${individualTitle}`}
            showModal={showModal}
            trigger={<ButtonEdit onClick={onClickShowModal} />}
            hideModal={hideModal}
          >
            <Form editItem={editItem} hideModal={hideModal} item={item} />
          </ModalContainer>
          <ButtonDelete onClick={onClickShowConfirm} />
        </TableCell>
      </TableRow>
    </>
  )
}

export default Item
