import React, { useState, useEffect } from 'react'
import { Form, Grid } from 'semantic-ui-react'
import { useFormik } from 'formik'
import {
  FormButtons,
  TextAreaField,
  CurrencyField,
  DateField,
} from '../../Components'
import { formatDateToUI, formatNumberToCurrency } from '../../Utils/Helpers'

const formInitialValues = {
  date: '',
  description: '',
  value: '',
}

type TCustomType = TPayment
type TCustomFormType = TPaymentForm

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
    formik.setFieldValue('date', formatDateToUI(item.date))
    if (item.description) formik.setFieldValue('description', item.description)
    formik.setFieldValue('value', formatNumberToCurrency(item.value))
  }

  const closeModal = () => {
    formik.resetForm()
    hideModal()
  }

  const handleSubmit = async (values: TCustomFormType) => {
    setIsAdding(true)
    const _item: TCustomFormType = {
      ...item,
      date: values.date,
      description: values.description,
      value: values.value,
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
        <DateField
          label="Date"
          name="date"
          value={formik.values.date}
          onChange={formik.handleChange}
        />
        <TextAreaField
          label="Description"
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
        />
        <CurrencyField
          label="Value"
          name="value"
          value={formik.values.value}
          onChange={formik.handleChange}
        />
        <FormButtons isAdding={isAdding} closeModal={closeModal} />
      </Grid>
    </Form>
  )
}

export default FormComponent
