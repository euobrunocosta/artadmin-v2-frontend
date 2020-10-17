import React, { useState, useEffect } from 'react'
import { Form, Modal, Grid, DropdownProps } from 'semantic-ui-react'
import { ButtonImport, FormButtons, SelectField } from '../../Components'
import { useFormik } from 'formik'
import api from '../../Services/Api'
import { formatDateToUI } from '../../Utils/Helpers'

type TProps = {
  importItem: (data: TImportItem) => Promise<true | void>
}

const formInitialValues = {
  order: '',
  item: '',
}

const ImportItem = (props: TProps) => {
  const { importItem } = props
  const [showModal, setShowModal] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [ordersList, setOrdersList] = useState<TSelectOptions[]>([])
  const [itemsList, setItemsList] = useState<TSelectOptions[]>([])

  const formik = useFormik({
    initialValues: formInitialValues,
    onSubmit(values) {
      handleSubmit(values)
    },
  })

  useEffect(() => {
    getOrders()
  }, [])

  const getOrders = async () => {
    const response = await api.get('/orders')
    if (!response) return
    const list: TSelectOptions[] = []
    response.data.forEach((order: TOrder) => {
      list.push({
        key: order._id,
        value: order._id,
        text: `${order.client.name} - ${formatDateToUI(order.deadline)} - ${
          order.title
        }`,
      } as TSelectOptions)
    })
    setOrdersList(list)
  }

  const getItems = async (orderId: string) => {
    const response = await api.get(`/items/order/${orderId}`)
    if (!response) return
    const list: TSelectOptions[] = []
    response.data.forEach((item: TItem) => {
      list.push({
        key: item._id,
        value: item._id,
        text: item.title,
      } as TSelectOptions)
    })
    setItemsList(list)
  }

  const handleSubmit = async (values: any) => {
    setIsSubmitting(true)
    const data: TImportItem = {
      order: values.order,
      item: values.item,
    }
    importItem(data)
    // if (addItem) await addItem(_item)
    // if (editItem) await editItem(_item)

    onCloseModal()
    setIsSubmitting(false)
  }

  const onCloseModal = () => {
    formik.resetForm()
    setShowModal(false)
  }
  const onShowModal = () => setShowModal(true)

  return (
    <>
      <ButtonImport onClick={onShowModal} />
      <Modal size="small" open={showModal} onClose={onCloseModal}>
        <Modal.Header>Import Item</Modal.Header>
        <Modal.Content>
          <Form onSubmit={formik.handleSubmit}>
            <Grid>
              <SelectField
                label="Order"
                name="order"
                options={ordersList}
                value={formik.values.order}
                onChange={(e, data: DropdownProps) => {
                  getItems(data.value as string)
                  formik.setFieldValue('order', data.value)
                }}
              />
              <SelectField
                label="Item"
                name="item"
                options={itemsList}
                value={formik.values.item}
                onChange={(e, data: DropdownProps) => {
                  formik.setFieldValue('item', data.value)
                }}
              />
              <FormButtons isAdding={isSubmitting} closeModal={onCloseModal} />
            </Grid>
          </Form>
        </Modal.Content>
      </Modal>
    </>
  )
}

export default ImportItem
