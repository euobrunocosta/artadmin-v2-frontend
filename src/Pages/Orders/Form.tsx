import React, { useState, useEffect } from 'react'
import { Form, Grid, DropdownProps } from 'semantic-ui-react'
import { useFormik } from 'formik'
import {
  FormButtons,
  TextField,
  SelectField,
  DateField,
} from '../../Components'
import { SelectOrderStatus } from '../../Utils/Constants'
import { formatDateToUI } from '../../Utils/Helpers'
import api from '../../Services/Api'

const formInitialValues = {
  title: '',
  client: '',
  baby: '',
  status: '',
  deadline: '',
}

type TCustomType = TOrder
type TCustomFormType = TOrderForm

type TProps = {
  addItem?: (item: TCustomFormType) => Promise<true | void>
  editItem?: (item: TCustomFormType) => Promise<true | void>
  hideModal: () => void
  item?: TCustomType
}

const FormComponent = (props: TProps) => {
  const { addItem, editItem, hideModal, item } = props
  const [isAdding, setIsAdding] = useState(false)
  const [clientsList, setClientsList] = useState<TSelectOptions[]>([])
  const [babiesList, setBabiesList] = useState<TSelectOptions[]>([])

  const formik = useFormik({
    initialValues: formInitialValues,
    onSubmit(values) {
      handleSubmit(values)
    },
  })

  useEffect(() => {
    getClients()
  }, [])

  useEffect(() => {
    populateForm()
    // eslint-disable-next-line
  }, [item])

  const populateForm = () => {
    if (!item) return
    formik.setFieldValue('title', item.title)
    formik.setFieldValue('client', item.client)
    formik.setFieldValue('status', item.status.toString())
    if (item.baby) formik.setFieldValue('baby', item.baby)
    if (item.deadline)
      formik.setFieldValue('deadline', formatDateToUI(item.deadline))
  }

  const getClients = async () => {
    const response = await api.get('/clients')
    if (!response) return
    const list: TSelectOptions[] = []
    response.data.forEach((client: TClient) => {
      list.push({
        key: client._id,
        value: client._id,
        text: `${client.name} (${client.city} - ${client.state})`,
      } as TSelectOptions)
    })
    setClientsList(list)
  }

  useEffect(() => {
    if (item) {
      getBabies(item.client._id)
      formik.setFieldValue('client', item.client._id)
      formik.setFieldValue('baby', item.baby._id)
    }
    // eslint-disable-next-line
  }, [item])

  const getBabies = async (clientId: string) => {
    const response = await api.get(`/babies/client/${clientId}`)
    if (!response) return
    const list: TSelectOptions[] = []
    response.data.forEach((baby: TClient) => {
      list.push({
        key: baby._id,
        value: baby._id,
        text: baby.name,
      } as TSelectOptions)
    })
    setBabiesList(list)
  }

  const closeModal = () => {
    formik.resetForm()
    hideModal()
  }

  const handleSubmit = async (values: TCustomFormType) => {
    setIsAdding(true)
    const _item = {
      ...item,
      title: values.title,
      client: values.client,
      baby: values.baby,
      status: values.status,
      deadline: values.deadline,
      updatedAt: new Date(Date.now()),
    }
    if (addItem) await addItem(_item)
    if (editItem) await editItem(_item)

    closeModal()
    setIsAdding(false)
  }

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Grid>
        <TextField
          label="Title"
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
        />
        <SelectField
          label="Client"
          name="client"
          options={clientsList}
          value={formik.values.client}
          onChange={(e, data: DropdownProps) => {
            getBabies(data.value as string)
            formik.setFieldValue('client', data.value)
          }}
        />
        <SelectField
          label="Baby"
          name="baby"
          options={babiesList}
          value={formik.values.baby}
          onChange={(e, data: DropdownProps) =>
            formik.setFieldValue('baby', data.value)
          }
        />
        <SelectField
          label="Status"
          name="status"
          options={SelectOrderStatus}
          value={formik.values.status}
          onChange={(e, data: DropdownProps) =>
            formik.setFieldValue('status', data.value)
          }
        />
        <DateField
          label="Deadline / Finish Date"
          name="deadline"
          value={formik.values.deadline}
          onChange={formik.handleChange}
        />
        <FormButtons isAdding={isAdding} closeModal={closeModal} />
      </Grid>
    </Form>
  )
}

export default FormComponent
