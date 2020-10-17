import React, { useState, useEffect } from 'react'
import { Form, Grid, DropdownProps } from 'semantic-ui-react'
import { useFormik } from 'formik'
import {
  FormButtons,
  TextField,
  SelectField,
  DateField,
} from '../../Components'
import { formatDateToUI } from '../../Utils/Helpers'
import { SelectGenders } from '../../Utils/Constants'

const formInitialValues = {
  name: '',
  gender: 'uknown',
  birthday: '',
}

type TCustomType = TBaby
type TCustomFormType = TBabyForm

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
    if (item.gender) formik.setFieldValue('gender', item.gender)
    if (item.birthday)
      formik.setFieldValue('birthday', formatDateToUI(item.birthday))
  }

  const closeModal = () => {
    formik.resetForm()
    hideModal()
  }

  const handleSubmit = async (values: TCustomFormType) => {
    setIsAdding(true)
    const _item: TCustomFormType = {
      ...item,
      name: values.name,
      gender: values.gender,
      birthday: values.birthday,
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
        <SelectField
          label="Gender"
          name="gender"
          options={SelectGenders}
          value={formik.values.gender}
          onChange={(e, data: DropdownProps) =>
            formik.setFieldValue('gender', data.value)
          }
        />
        <DateField
          label="Birthday"
          name="birthday"
          value={formik.values.birthday}
          onChange={formik.handleChange}
        />
        <FormButtons isAdding={isAdding} closeModal={closeModal} />
      </Grid>
    </Form>
  )
}

export default FormComponent
