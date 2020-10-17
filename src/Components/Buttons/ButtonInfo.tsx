import React, { useState } from 'react'
import { Modal, Button, Grid, Popup } from 'semantic-ui-react'
import styled from 'styled-components'

const Label = styled(Grid.Column)`
  font-weight: bold;
  text-align: right;
`

const Content = styled(Grid.Row)`
  margin: 0;
  padding: 5px 0 !important;
`

type TProps = {
  info: TInfo[]
}
const ButtonInfo = (props: TProps) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Popup
        position="top right"
        content="More Info"
        trigger={
          <Button
            icon="info circle"
            inverted
            color="blue"
            onClick={() => setOpen(true)}
          />
        }
      />
      <Modal open={open} size="mini" dimmer="blurring">
        <Modal.Header>More Info</Modal.Header>
        <Modal.Content>
          <Grid>
            {props.info?.map((item) => (
              <Content>
                <Label computer={5}>{item.label}</Label>
                <Grid.Column computer={11}>{item.value}</Grid.Column>
              </Content>
            ))}
          </Grid>
        </Modal.Content>
        <Modal.Actions>
          <Button
            icon="close"
            content="Close"
            color="red"
            inverted
            onClick={() => setOpen(false)}
          />
        </Modal.Actions>
      </Modal>
    </>
  )
}

export default ButtonInfo
