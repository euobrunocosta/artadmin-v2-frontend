import React, { useState } from 'react'
import {
  TableRow,
  TableCell,
  Checkbox,
  Confirm,
  Label,
} from 'semantic-ui-react'
import Form from './Form'
import {
  ModalContainer,
  ButtonEdit,
  ButtonDelete,
  ButtonInfo,
  ButtonEnable,
} from '../../Components'
import {
  formatNumberToCurrency,
  formatNumber,
  boughtByUserFriendly,
  formatDateToUI,
} from '../../Utils/Helpers'

type TCustomType = TProduct
type TCustomFormType = TProductForm
const individualTitle = 'Product'

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
        <TableCell>
          <Label size="small" color="blue">
            {boughtByUserFriendly(item.boughtBy)}
          </Label>
        </TableCell>
        <TableCell>
          {item.boughtBy === 'squareMeter' ? formatNumber(item.width) : '...'}
        </TableCell>
        <TableCell>{formatNumberToCurrency(item.price)}</TableCell>
        <TableCell textAlign="right">
          <ButtonInfo info={info} />
          <ButtonEnable page='products' isEnabled={item.enabled} id={item._id} />
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
