import React, { useState, useEffect } from 'react'
import { TableHeaderCell, Icon, SemanticICONS, Loader } from 'semantic-ui-react'

type TProps = {
  item: TTableHeader
  sort?: TSort
  setSort(order: TSort): void
  isLoading?: boolean
}
const HeaderItem = (props: TProps) => {
  const { item, sort, setSort, isLoading } = props
  const [updated, setUpdated] = useState(false)

  const handleSetSort = async () => {
    const order =
      item.column === sort?.column && sort.order === 'asc' ? 'desc' : 'asc'
    setSort({ column: item.column, order } as TSort)
    setUpdated(true)
  }

  const getIcon = (): SemanticICONS => {
    if (sort?.column === item.column) {
      return sort.order === 'desc'
        ? 'long arrow alternate down'
        : 'long arrow alternate up'
    }
    return 'arrows alternate vertical'
  }

  useEffect(() => {
    if (!isLoading) setUpdated(false)
  }, [isLoading])

  return (
    <TableHeaderCell>
      {updated ? (
        <Loader active inline size="mini" style={{ marginRight: '6px' }} />
      ) : (
        item.column !== '' && (
          <Icon name={getIcon()} link onClick={handleSetSort} />
        )
      )}
      {item.title}
    </TableHeaderCell>
  )
}

export default HeaderItem
