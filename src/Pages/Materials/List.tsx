import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { Table, Confirm } from 'semantic-ui-react'
import api from '../../Services/Api'
import Form from './Form'
import Item from './Item'
import {
  Header,
  EmptyList,
  ModalContainer,
  ButtonAdd,
  ButtonDelete,
  TableHeader,
  PageTitle,
  ButtonSearch,
} from '../../Components'
import {
  prepareNumber,
  calculateMaterialValue,
  formatNumberToCurrency,
} from '../../Utils/Helpers'

const customOptions = {
  tableHeaderCells: [
    {
      title: 'Title',
      column: 'title',
    },
    {
      title: 'Product',
      column: '',
    },
    {
      title: 'Measure / Quantity',
      column: 'measurementQuantity',
    },
    {
      title: 'Width',
      column: 'width',
    },
    {
      title: 'Waste',
      column: 'waste',
    },
    {
      title: 'Value',
      column: 'value',
    },
  ],
  apiPath: '/materials',
  title: 'Materials',
  item: 'Material',
  limit: 5,
  sort: {
    column: 'createdAt',
    order: 'desc',
  },
}

type TCustomType = TMaterial
type TCustomFormType = TMaterialForm

const ListPage = () => {
  const params = useParams<{ itemId: string }>()

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
      `${customOptions.apiPath}/item/${params.itemId}`,
      query
    )
    setIsLoading(false)
    if (!response) return

    setList(response.data)
  }

  const calculateTotal = (listParam?: TCustomType[]) => {
    const _list = listParam ?? list
    return _list.reduce(
      (accumulator, currentValue) =>
        accumulator + calculateMaterialValue(currentValue),
      0
    )
  }

  const updateMaterials = async (list?: TCustomType[]) => {
    await api.put(`/items/materials/${params.itemId}`, {
      value: calculateTotal(list),
    })
  }

  const prepareData = (data: TCustomFormType) => {
    console.log(data)
    const preparedData = {
      ...data,
      measurementQuantity: prepareNumber(data.measurementQuantity),
      width: prepareNumber(data.width),
      waste: prepareNumber(data.waste),
    }
    console.log(preparedData)
    return preparedData
  }

  const addItem = async (item: TCustomFormType) => {
    const response = await api.post(
      `${customOptions.apiPath}/item/${params.itemId}`,
      prepareData(item)
    )
    if (!response) return
    const newList = [...list]
    newList.unshift(response)
    setList(newList)
    await updateMaterials(newList)
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
    await updateMaterials(newList)
    return true
  }

  const removeItem = async (id: string) => {
    const response = await api.delete(`${customOptions.apiPath}/${id}`, {})
    if (!response) return
    const newList = list.filter((item) => item._id !== id)
    setList(newList)
    clearSelectedItensList()
    await updateMaterials(newList)
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
    await updateMaterials()
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
            <Table.HeaderCell colSpan={6}></Table.HeaderCell>
            <Table.HeaderCell>
              <strong>{formatNumberToCurrency(calculateTotal())}</strong>
            </Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </>
  )
}

export default ListPage
