import React, { useState, useEffect } from 'react'
import { Form, Grid, DropdownProps } from 'semantic-ui-react'
import { useFormik } from 'formik'
import {
  FormButtons,
  TextField,
  TextAreaField,
  SelectField,
} from '../../Components'
import { SelectStates } from '../../Utils/Constants'

const formInitialValues = {
  name: '',
  city: '',
  state: '',
  referral: '',
}

type TCustomType = TClient
type TCustomFormType = TClientForm

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
    formik.setFieldValue('name', item.name)
    if (item.city) formik.setFieldValue('city', item.city)
    if (item.state) formik.setFieldValue('state', item.state)
    if (item.referral) formik.setFieldValue('referral', item.referral)
  }

  const closeModal = () => {
    formik.resetForm()
    hideModal()
  }

  const handleSubmit = async (values: any) => {
    setIsAdding(true)
    const _item: TCustomFormType = {
      ...item,
      name: values.name,
      city: values.city,
      state: values.state,
      referral: values.referral,
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
          label="Name"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
        />
        <TextField
          label="City"
          name="city"
          value={formik.values.city}
          onChange={formik.handleChange}
        />
        <SelectField
          label="State"
          name="state"
          options={SelectStates}
          value={formik.values.state}
          onChange={(e, data: DropdownProps) =>
            formik.setFieldValue('state', data.value)
          }
        />
        <TextAreaField
          label="Referral"
          name="referral"
          value={formik.values.referral}
          onChange={formik.handleChange}
        />
        <FormButtons isAdding={isAdding} closeModal={closeModal} />
      </Grid>
    </Form>
  )
}

export default FormComponent
