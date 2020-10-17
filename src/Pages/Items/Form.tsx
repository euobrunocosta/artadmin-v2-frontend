import React, { useState, useEffect } from 'react'
import { Form, Grid } from 'semantic-ui-react'
import { useFormik } from 'formik'
import {
  FormButtons,
  TextField,
  TextAreaField,
  CurrencyField,
  NumberField,
} from '../../Components'
import { formatNumberToCurrency, formatNumber } from '../../Utils/Helpers'

const formInitialValues = {
  title: '',
  description: '',
  labor: '',
  price: '',
  quantity: '',
}

type TCustomType = TItem
type TCustomFormType = TItemForm

type TProps = {
  addItem?: (item: TCustomFormType) => Promise<true | void>
  editItem?: (item: TCustomFormType) => Promise<true | void>
  hideModal: () => void
  item?: TCustomType
}

const FormComponent = (props: TProps) => {
  const { addItem, editItem, hideModal, item } = props
  const [isAdding, setIsAdding] = useState(false)

  const formik = useFormik({
    initialValues: formInitialValues,
    onSubmit(values) {
      handleSubmit(values)
    },
  })

  useEffect(() => {
    populateForm()
    // eslint-disable-next-line
  }, [item])

  const populateForm = () => {
    if (!item) return
    formik.setFieldValue('title', item.title)
    if (item.description) formik.setFieldValue('description', item.description)
    if (item.labor) {
      formik.setFieldValue('labor', formatNumberToCurrency(item.labor))
    }

    if (item.price) {
      formik.setFieldValue('price', formatNumberToCurrency(item.price))
    }

    if (item.quantity) {
      formik.setFieldValue('quantity', formatNumber(item.quantity))
    }
  }

  const closeModal = () => {
    formik.resetForm()
    hideModal()
  }

  const handleSubmit = async (values: TCustomFormType) => {
    setIsAdding(true)
    console.log(values)
    const _item: TCustomFormType = {
      ...item,
      title: values.title,
      description: values.description,
      labor: values.labor,
      price: values.price,
      quantity: values.quantity,
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
        <TextAreaField
          label="Description"
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
        />
        <CurrencyField
          label="Labor"
          name="labor"
          value={formik.values.labor}
          onChange={formik.handleChange}
        />
        <CurrencyField
          label="Price"
          name="price"
          value={formik.values.price}
          onChange={formik.handleChange}
        />
        <NumberField
          label="Quantity"
          name="quantity"
          value={formik.values.quantity}
          onChange={formik.handleChange}
        />
        <FormButtons isAdding={isAdding} closeModal={closeModal} />
      </Grid>
    </Form>
  )
}

export default FormComponent
