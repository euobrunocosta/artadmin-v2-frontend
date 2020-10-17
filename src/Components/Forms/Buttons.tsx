import React from 'react'
import { GridRow, GridColumn, Button, Icon } from 'semantic-ui-react'

type TProps = {
  isAdding: boolean
  closeModal: () => void
}
const Buttons = (props: TProps) => {
  const { isAdding, closeModal } = props

  return (
    <GridRow>
      <GridColumn computer={3}></GridColumn>
      <GridColumn computer={13}>
        <Button type="submit" inverted color="blue" loading={isAdding}>
          <Icon name="check" /> Send
        </Button>
        <Button type="reset" inverted color="red" onClick={closeModal}>
          <Icon name="close" /> Cancel
        </Button>
      </GridColumn>
    </GridRow>
  )
}

export default Buttons
