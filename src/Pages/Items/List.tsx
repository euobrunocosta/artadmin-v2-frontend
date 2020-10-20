import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { Table, Confirm } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom'
import api from '../../Services/Api'
import Form from './Form'
import Item from './Item'
import ImportModal from './ImportModal'
import {
  Header,
  EmptyList,
  ModalContainer,
  ButtonAdd,
  ButtonDelete,
  TableHeader,
  PageTitle,
  ButtonPrint,
  ButtonSearch,
  ProfitLabel,
} from '../../Components'
import {
  prepareNumber,
  formatNumberToCurrency,
  formatNumber,
} from '../../Utils/Helpers'

const customOptions = {
  tableHeaderCells: [
    {
      title: 'Title',
      column: 'title',
    },
    {
      title: 'Materials',
      column: 'materials',
    },
    {
      title: 'Labor',
      column: 'labor',
    },
    {
      title: 'Price',
      column: 'price',
    },
    {
      title: 'Quantity',
      column: 'quantity',
    },
    {
      title: 'Total',
      column: '',
    },
    {
      title: 'Profit',
      column: '',
    },
  ],
  apiPath: '/items',
  title: 'Items',
  item: 'Item',
  limit: 5,
  sort: {
    column: 'createdAt',
    order: 'desc',
  },
}

type TTotals = {
  materials: number
  labor: number
  price: number
  profit: number
}

type TCustomType = TItem
type TCustomFormType = TItemForm

const ListPage = () => {
  const params = useParams<{ orderId: string }>()

  const [showAddModal, setShowAddModal] = useState(false)
  const [list, setList] = useState<TCustomType[]>([])
  const [showDeleteSelectedConfirm, setShowDeteteSelectedConfirm] = useState(
    false
  )
  const [selectedItems, setSelectedItems] = useState<number[]>([])
  const [isSelectAllChecked, setIsSelectAllChecked] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [sort, setSort] = useState<TSort>(customOptions.sort as TSort)
  const [search, setSearch] = useState('')

  const history = useHistory()

  const onClickShowAddModal = () => setShowAddModal(true)
  const onClickHideAddModal = () => setShowAddModal(false)

  const clearSelectedItensList = () => {
    setSelectedItems([])
  }

  const getData = async () => {
    setIsLoading(true)
    const query: any = {
      sort: `${sort.order === 'desc' ? '-' : ''}${sort.column}`,
    }
    if (search !== '') query.search = search
    const response = await api.get(
      `${customOptions.apiPath}/order/${params.orderId}`,
      query
    )
    setIsLoading(false)
    if (!response) return

    setList(response.data)
  }

  const prepareData = (data: TCustomFormType) => {
    const preparedData = {
      ...data,
      labor: prepareNumber(data.labor),
      price: prepareNumber(data.price),
      quantity: prepareNumber(data.quantity),
    }
    return preparedData
  }

  const importItem = async (data: TImportItem) => {
    const response = await api.post(
      `${customOptions.apiPath}/order/${params.orderId}/import`,
      data
    )
    if (!response) return
    const newList = [...list]
    newList.unshift(response)
    setList(newList)
    return true
  }

  const addItem = async (item: TCustomFormType) => {
    const response = await api.post(
      `${customOptions.apiPath}/order/${params.orderId}`,
      prepareData(item)
    )
    if (!response) return
    const newList = [...list]
    newList.unshift(response)
    setList(newList)
    return true
  }

  const editItem = async (item: TCustomFormType) => {
    const response = await api.put(
      `${customOptions.apiPath}/${item._id}`,
      prepareData(item)
    )
    if (!response) return
    const newList = list.map((_item) =>
      _item._id === response._id ? response : _item
    )
    setList(newList)
    clearSelectedItensList()
    return true
  }

  const removeItem = async (id: string) => {
    const response = await api.delete(`${customOptions.apiPath}/${id}`, {})
    if (!response) return
    const newList = list.filter((item) => item._id !== id)
    setList(newList)
    clearSelectedItensList()
  }

  const toggleSelect = (index: number) => {
    const newList = [...selectedItems]
    if (newList.includes(index)) {
      const _index = newList.indexOf(index)
      newList.splice(_index, 1)
    } else {
      newList.push(index)
    }
    setSelectedItems(newList)
  }

  const onClickShowRemoveSelectedConfirm = () => {
    setShowDeteteSelectedConfirm(true)
  }

  const onClickGoToPrintPage = (type: TPrintPage) => {
    if (type === 'report') history.push(`/items/print/${params.orderId}`)
    if (type === 'budget')
      history.push(`/items/print/${params.orderId}/budget/true`)
    if (type === 'file')
      history.push(`/items/print/${params.orderId}/file/true`)
  }

  const closeRemoveSelectedConfirm = () => {
    setShowDeteteSelectedConfirm(false)
  }

  const removeSelectedItems = async () => {
    const response = await api.deleteMany(customOptions.apiPath, {
      data: { ids: getSelectedIds() },
    })
    closeRemoveSelectedConfirm()
    if (!response) return
    clearSelectedItensList()
    getData()
  }

  const toggleSelectAll = () => {
    if (isSelectAllChecked) {
      setSelectedItems([])
    } else {
      const newList: number[] = []
      list.forEach((_, index) => {
        newList.push(index)
      })
      setSelectedItems(newList)
    }
    setIsSelectAllChecked(!isSelectAllChecked)
  }

  const getSelectedIds = () => {
    const ids: string[] = []
    selectedItems.forEach((item) => {
      const id = list[item]._id
      if (id) ids.push(id)
    })
    return ids
  }

  const calculateTotals = () => {
    const totals = {
      materials: 0,
      labor: 0,
      quantity: 0,
      total: 0,
      profit: 0,
    }

    list.forEach((item) => {
      const quantity = item.quantity / 100
      totals.materials += item.materials * quantity
      totals.labor += item.labor * quantity
      totals.quantity += item.quantity
      totals.total += item.price * quantity
    })

    totals.profit = totals.total - (totals.materials + totals.labor)

    return totals
  }

  useEffect(() => {
    getData()
    // eslint-disable-next-line
  }, [sort, search])

  useEffect(() => {
    if (selectedItems.length === list.length) {
      setIsSelectAllChecked(true)
    } else if (isSelectAllChecked) {
      setIsSelectAllChecked(false)
    }
  }, [selectedItems, list, isSelectAllChecked])

  const columnCount = customOptions.tableHeaderCells.length + 2

  const totals = calculateTotals()

  const percentageProfit = (totals.profit / totals.total) * 10000

  return (
    <>
      <Confirm
        open={showDeleteSelectedConfirm}
        content="Are you sure you want to remove all the selected items?"
        onCancel={closeRemoveSelectedConfirm}
        onConfirm={removeSelectedItems}
        dimmer="blurring"
      />
      <Header>
        <PageTitle goesBack>{customOptions.title}</PageTitle>
        <nav>
          {selectedItems.length > 0 && (
            <ButtonDelete
              onClick={onClickShowRemoveSelectedConfirm}
              tip="Remove Selected"
            />
          )}
          <ButtonPrint onClickGoTo={onClickGoToPrintPage} />
          <ImportModal importItem={importItem} />
          <ButtonSearch search={search} setSearch={setSearch} />
          <ModalContainer
            title={`New ${customOptions.item}`}
            showModal={showAddModal}
            trigger={<ButtonAdd onClick={onClickShowAddModal} />}
            hideModal={onClickHideAddModal}
          >
            <Form addItem={addItem} hideModal={onClickHideAddModal} />
          </ModalContainer>
        </nav>
      </Header>
      <Table selectable celled>
        <TableHeader
          items={customOptions.tableHeaderCells}
          isSelectAllChecked={isSelectAllChecked}
          toggleSelectAll={toggleSelectAll}
          sort={sort}
          setSort={setSort}
          isLoading={isLoading}
        />
        <Table.Body>
          {list.length ? (
            list.map((item, index) => {
              return (
                <Item
                  item={item}
                  editItem={editItem}
                  index={index}
                  isSelected={selectedItems.includes(index)}
                  toggleSelect={toggleSelect}
                  removeItem={removeItem}
                />
              )
            })
          ) : (
            <EmptyList isLoading={isLoading} colSpan={columnCount} />
          )}
        </Table.Body>
        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan={2}></Table.HeaderCell>
            <Table.HeaderCell>
              <strong>{formatNumberToCurrency(totals.materials)}</strong>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <strong>{formatNumberToCurrency(totals.labor)}</strong>
            </Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell>
              <strong>{formatNumber(totals.quantity)}</strong>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <strong>{formatNumberToCurrency(totals.total)}</strong>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <strong>
                {formatNumberToCurrency(totals.profit)}
                <ProfitLabel profitPercentage={percentageProfit} />
              </strong>
            </Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </>
  )
}

export default ListPage
