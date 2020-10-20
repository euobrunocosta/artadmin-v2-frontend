import React from 'react'
import { Popup, Dropdown, Button } from 'semantic-ui-react'

type TProps = {
  onClickGoTo(type: TPrintPage): void
}

const ButtonPrint = (props: TProps) => {
  const { onClickGoTo } = props

  const onClickGoToReport = () => {
    onClickGoTo('report')
  }

  const onClickGoToFile = () => {
    onClickGoTo('file')
  }

  const onClickGoToBudget = () => {
    onClickGoTo('budget')
  }

  return (
    <Dropdown
      style={{ marginRight: 0 }}
      icon={null}
      trigger={
        <Popup
          content="Print"
          position="bottom right"
          trigger={<Button icon="print" color="purple" inverted />}
        />
      }
    >
      <Dropdown.Menu>
        <Dropdown.Item>
          <span onClick={onClickGoToReport}>Print Report</span>
        </Dropdown.Item>
        <Dropdown.Item>
          <span onClick={onClickGoToFile}>Print File</span>
        </Dropdown.Item>
        <Dropdown.Item>
          <span onClick={onClickGoToBudget}>Print Budget</span>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default ButtonPrint
