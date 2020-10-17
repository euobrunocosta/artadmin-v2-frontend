import React from 'react'
import styled from 'styled-components'
import { TableRow, TableCell, Loader } from 'semantic-ui-react'

const Container = styled.div`
  padding: 20px 8px;
  text-align: center;
`

type TProps = {
  isLoading: boolean
  colSpan: number
}

const EmptyList = (props: TProps) => {
  const { isLoading, colSpan } = props
  return (
    <TableRow>
      <TableCell colSpan={colSpan} textAlign="center">
        <Container>
          {isLoading ? (
            <Loader active inline="centered">
              Loading
            </Loader>
          ) : (
            'No results!'
          )}
        </Container>
      </TableCell>
    </TableRow>
  )
}

export default EmptyList
