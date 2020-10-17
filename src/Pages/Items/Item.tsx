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
  ProfitLabel,
} from '../../Components'
import {
  calculateProfit,
  formatNumberToCurrency,
  formatDateToUI,
  formatNumber,
} from '../../Utils/Helpers'

type TCustomType = TItem
type TCustomFormType = TItemForm
const individualTitle = 'Item'

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

  const goToMaterialsPage = () => {
    history.push(`/materials/${item._id}`)
  }

  const onChangeToggleSelect = (index: number) => () => {
    toggleSelect(index)
  }

  const onClickShowConfirm = () => setShowConfirm(true)

  const onClickHideConfirm = () => setShowConfirm(false)

  const onClickShowModal = () => setShowModal(true)

  const hideModal = () => setShowModal(false)

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
      label: 'Description',
      value: item.description,
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

  const total = (item.quantity * item.price) / 100

  const valueProfit = calculateProfit(
    item.price,
    item.materials,
    item.labor,
    item.quantity
  )

  const percentageProfit = (valueProfit / total) * 10000

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
        <TableCell>{formatNumberToCurrency(item.materials)}</TableCell>
        <TableCell>{formatNumberToCurrency(item.labor)}</TableCell>
        <TableCell>{formatNumberToCurrency(item.price)}</TableCell>
        <TableCell>{formatNumber(item.quantity)}</TableCell>
        <TableCell>{formatNumberToCurrency(total)}</TableCell>
        <TableCell>
          {formatNumberToCurrency(valueProfit)}
          <ProfitLabel profitPercentage={percentageProfit} />
        </TableCell>
        <TableCell textAlign="right">
          <ButtonInfo info={info} />
          <ButtonCustom
            onClick={goToMaterialsPage}
            tip="List Materials"
            color="olive"
            icon="cut"
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
