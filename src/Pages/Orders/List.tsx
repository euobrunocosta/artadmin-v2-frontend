import React, { useState, useEffect } from 'react'
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
  ButtonLoadMore,
} from '../../Components'
import { parseDate } from '../../Utils/Helpers'

const customOptions = {
  tableHeaderCells: [
    {
      title: 'Title',
      column: 'title',
    },
    {
      title: 'Client',
      column: '',
    },
    {
      title: 'City - State',
      column: '',
    },
    {
      title: 'Deadline / Finish Date',
      column: 'deadline',
    },
    {
      title: 'Status',
      column: 'status',
    },
  ],
  apiPath: '/orders',
  title: 'Orders',
  item: 'Order',
  limit: 5,
  sort: {
    column: 'createdAt',
    order: 'desc',
  },
}

type TCustomType = TOrder
type TCustomFormType = TOrderForm

const ListPage = () => {
  const [showAddModal, setShowAddModal] = useState(false)
  const [list, setList] = useState<TCustomType[]>([])
  const [showDeleteSelectedConfirm, setShowDeteteSelectedConfirm] = useState(
    false
  )
  const [selectedItems, setSelectedItems] = useState<number[]>([])
  const [isSelectAllChecked, setIsSelectAllChecked] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showLoadMore, setShowLoadMore] = useState(false)
  const [sort, setSort] = useState<TSort>(customOptions.sort as TSort)
  const [search, setSearch] = useState('')

  const onClickShowAddModal = () => setShowAddModal(true)
  const onClickHideAddModal = () => setShowAddModal(false)

  const clearSelectedItensList = () => {
    setSelectedItems([])
  }

  const getData = async (offset?: number, limit?: number) => {
    setIsLoading(true)
    const query: any = {
      limit: limit ?? customOptions.limit,
      offset: offset ?? 0,
      sort: `${sort.order === 'desc' ? '-' : ''}${sort.column}`,
    }
    if (search !== '') query.search = search
    const response = await api.get(customOptions.apiPath, query)
    setIsLoading(false)
    if (!response) return

    setShowLoadMore(response.nextPage)

    if (offset) {
      setList([...list, ...response.data])
    } else {
      setList(response.data)
    }
  }

  const prepareData = (data: any) => {
    const preparedData = {
      ...data,
      deadline: parseDate(data.deadline),
    }
    return preparedData
  }

  const addItem = async (item: TCustomFormType) => {
    const response = await api.post(customOptions.apiPath, prepareData(item))
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

  useEffect(() => {
    if (sort.column !== 'createdAt') {
      getData(0, list.length)
    }
    // eslint-disable-next-line
  }, [sort])

  useEffect(() => {
    getData()
    // eslint-disable-next-line
  }, [search])

  useEffect(() => {
    if (selectedItems.length === list.length) {
      setIsSelectAllChecked(true)
    } else if (isSelectAllChecked) {
      setIsSelectAllChecked(false)
    }
  }, [selectedItems, list, isSelectAllChecked])

  const loadMore = async () => {
    await getData(list.length)
  }

  const colSpan = customOptions.tableHeaderCells.length + 2

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
        <PageTitle>{customOptions.title}</PageTitle>
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
            <EmptyList isLoading={isLoading} colSpan={colSpan} />
          )}
        </Table.Body>
      </Table>
      {showLoadMore && <ButtonLoadMore onClick={loadMore} />}
    </>
  )
}

export default ListPage
