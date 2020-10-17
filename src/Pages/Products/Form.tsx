import React, { useState, useEffect } from 'react'
import { Form, Grid, DropdownProps } from 'semantic-ui-react'
import { useFormik } from 'formik'
import {
  FormButtons,
  TextField,
  CurrencyField,
  NumberField,
  SelectField,
} from '../../Components'
import { SelectProductBoughtBy } from '../../Utils/Constants'
import { formatNumberToCurrency, formatNumber } from '../../Utils/Helpers'

const formInitialValues = {
  title: '',
  boughtBy: 'squareMeter',
  price: '',
  width: '',
}

type TCustomType = TProduct
type TCustomFormType = TProductForm

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
    formik.setFieldValue('boughtBy', item.boughtBy)
    formik.setFieldValue('price', formatNumberToCurrency(item.price))
    if (item.width) formik.setFieldValue('width', formatNumber(item.width))
  }

  const closeModal = () => {
    formik.resetForm()
    hideModal()
  }

  const handleSubmit = async (values: any) => {
    setIsAdding(true)
    const _item = {
      ...item,
      title: values.title,
      boughtBy: values.boughtBy,
      price: values.price,
      width: values.width,
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
          label="Bought By"
          name="boughtBy"
          options={SelectProductBoughtBy}
          value={formik.values.boughtBy}
          onChange={(e, data: DropdownProps) =>
            formik.setFieldValue('boughtBy', data.value)
          }
        />
        {formik.values.boughtBy === 'squareMeter' && (
          <NumberField
            label="Width"
            name="width"
            value={formik.values.width}
            onChange={formik.handleChange}
          />
        )}
        <CurrencyField
          label="Price"
          name="price"
          value={formik.values.price}
          onChange={formik.handleChange}
        />
        <FormButtons isAdding={isAdding} closeModal={closeModal} />
      </Grid>
    </Form>
  )
}

export default FormComponent
