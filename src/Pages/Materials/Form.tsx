import React, { useState, useEffect } from 'react'
import { Form, Grid, DropdownProps } from 'semantic-ui-react'
import { useFormik } from 'formik'
import {
  FormButtons,
  TextField,
  NumberField,
  SelectField,
} from '../../Components'
import { formatNumber, formatNumberToCurrency } from '../../Utils/Helpers'
import api from '../../Services/Api'

const formInitialValues = {
  title: '',
  measurementQuantity: '',
  width: '',
  waste: '',
  product: '',
  productSearchTerm: '',
}

type TCustomType = TMaterial
type TCustomFormType = TMaterialForm

type TProps = {
  addItem?: (item: TCustomFormType) => Promise<true | void>
  editItem?: (item: TCustomFormType) => Promise<true | void>
  hideModal: () => void
  item?: TCustomType
}

type TCustomSelectOptions = TSelectOptions & { showWidth: boolean }

const FormComponent = (props: TProps) => {
  const { addItem, editItem, hideModal, item } = props
  const [isAdding, setIsAdding] = useState(false)
  const [productsList, setProductsList] = useState<TCustomSelectOptions[]>([])
  const [showWidth, setShowWidth] = useState(false)

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

  useEffect(() => {
    if (productsList.length && formik.values.product !== '') {
      setShowWidthByProduct(formik.values.product)
    }
    // eslint-disable-next-line
  }, [productsList, formik.values.product])

  useEffect(() => {
    getProducts()
    // eslint-disable-next-line
  }, [])

  const getProducts = async () => {
    const response = await api.get('/products', { sort: 'title' })
    if (!response) return
    const list: TCustomSelectOptions[] = []
    response.data.forEach((product: TProduct) => {
      list.push({
        key: product._id,
        value: product._id,
        text: `${product.title} - (${formatNumberToCurrency(product.price)})`,
        showWidth: product.boughtBy === 'squareMeter',
      } as TCustomSelectOptions)
    })
    setProductsList(list)
  }

  const setShowWidthByProduct = (productId: string) => {
    const product = productsList.find((item) => item.key === productId)
    if (product) setShowWidth(product.showWidth)
  }

  const populateForm = () => {
    if (!item) return
    formik.setFieldValue('title', item.title)
    formik.setFieldValue(
      'measurementQuantity',
      formatNumber(item.measurementQuantity)
    )
    formik.setFieldValue('width', formatNumber(item.width))
    formik.setFieldValue(
      'waste',
      item.waste === 0 ? 0 : formatNumber(item.waste)
    )
    formik.setFieldValue('product', item.product._id)
  }

  const closeModal = () => {
    formik.resetForm()
    hideModal()
  }

  const handleSubmit = async (values: TCustomFormType) => {
    setIsAdding(true)
    const _item: TCustomFormType = {
      ...item,
      title: values.title,
      measurementQuantity: values.measurementQuantity,
      width: values.width,
      waste: values.waste,
      product: values.product,
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
        {/* <SearchField
          value={formik.values.product}
          setFieldValue={formik.setFieldValue}
          fieldTitle="product"
          apiPath="/products"
          sort="title"
        /> */}
        <SelectField
          label="Product"
          name="product"
          options={productsList}
          value={formik.values.product}
          onChange={(e, data: DropdownProps) => {
            setShowWidthByProduct(data.value as string)
            formik.setFieldValue('product', data.value)
          }}
        />
        <NumberField
          label="Measure / Quantity"
          name="measurementQuantity"
          value={formik.values.measurementQuantity}
          onChange={formik.handleChange}
        />
        {showWidth && (
          <NumberField
            label="Width"
            name="width"
            value={formik.values.width}
            onChange={formik.handleChange}
          />
        )}
        <NumberField
          label="Waste"
          name="waste"
          value={formik.values.waste}
          onChange={formik.handleChange}
        />
        <FormButtons isAdding={isAdding} closeModal={closeModal} />
      </Grid>
    </Form>
  )
}

export default FormComponent
