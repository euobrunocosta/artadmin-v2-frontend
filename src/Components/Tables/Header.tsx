import React from 'react'
import {
  TableHeader,
  TableRow,
  TableHeaderCell,
  Checkbox,
} from 'semantic-ui-react'
import HeaderItem from './HeaderItem'

type TProps = {
  items: TTableHeader[]
  sort?: TSort
  setSort(order: TSort): void
  isSelectAllChecked: boolean
  toggleSelectAll(): void
  isLoading?: boolean
}
const Header = (props: TProps) => {
  const {
    items,
    isSelectAllChecked,
    toggleSelectAll,
    sort,
    setSort,
    isLoading,
  } = props

  return (
    <TableHeader>
      <TableRow>
        <TableHeaderCell>
          <Checkbox checked={isSelectAllChecked} onChange={toggleSelectAll} />
        </TableHeaderCell>
        {items.map((item) => (
          <HeaderItem
            item={item}
            sort={sort}
            setSort={setSort}
            isLoading={isLoading}
          />
        ))}
        <TableHeaderCell>Actions</TableHeaderCell>
      </TableRow>
    </TableHeader>
  )
}

export default Header
