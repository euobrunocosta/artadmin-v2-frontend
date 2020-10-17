import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { TableRow, TableCell, Checkbox, Confirm } from 'semantic-ui-react'
import Form from './Form'
import {
  ModalContainer,
  ButtonEdit,
  ButtonDelete,
  ButtonInfo,
  ButtonBabyInfo,
  ButtonCustom,
  OrderStatus,
} from '../../Components'
import { formatDateToUI } from '../../Utils/Helpers'

type TCustomType = TOrder
type TCustomFormType = TOrderForm
const individualTitle = 'Order'

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

  const goToPaymentsPage = () => {
    history.push(`/payments/${item._id}`)
  }

  const goToItemPage = () => {
    history.push(`/items/${item._id}`)
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
        <TableCell>{item.title}</TableCell>
        <TableCell>{`${item.client.name}`}</TableCell>
        <TableCell>{`${item.client.city} - ${item.client.state}`}</TableCell>
        <TableCell>{formatDateToUI(item.deadline)}</TableCell>
        <TableCell>
          <OrderStatus status={item.status} />
        </TableCell>
        <TableCell textAlign="right">
          <ButtonInfo info={info} />
          <ButtonCustom
            onClick={goToItemPage}
            tip="List Items"
            color="orange"
            icon="cart"
          />
          <ButtonCustom
            onClick={goToPaymentsPage}
            tip="List Payments"
            color="green"
            icon="dollar"
          />
          <ButtonBabyInfo baby={item.baby} />
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
