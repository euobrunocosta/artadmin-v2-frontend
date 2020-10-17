import React, { useState, useEffect } from 'react'
import { Form, Grid, DropdownProps } from 'semantic-ui-react'
import { useFormik } from 'formik'
import {
  FormButtons,
  TextField,
  ToggleField,
  SelectField,
} from '../../Components'
import api from '../../Services/Api'
import { useAuth } from '../../Hooks'

type TCustomType = TUser
type TCustomFormType = TUserForm

const formInitialValues: TUserForm = {
  name: '',
  email: '',
  isMaster: false,
  tenant: '',
}

type TProps = {
  addItem?: (item: TCustomFormType) => Promise<true | void>
  editItem?: (item: TCustomFormType) => Promise<true | void>
  hideModal: () => void
  item?: TCustomType
}

const FormComponent = (props: TProps) => {
  const { addItem, editItem, hideModal, item } = props

  const [isAdding, setIsAdding] = useState(false)
  const [tenantsList, setTenantsList] = useState<TSelectOptions[]>([])

  const { user } = useAuth()

  if (!user?.tenant.isMaster) {
    formInitialValues.tenant = user?.tenant._id ?? ''
  }

  const formik = useFormik({
    initialValues: formInitialValues,
    onSubmit(values) {
      handleSubmit(values)
    },
  })

  useEffect(() => {
    getTenants()
  }, [])

  const getTenants = async () => {
    const response = await api.get('/tenants')
    if (!response) return
    const list: TSelectOptions[] = []
    response.forEach((tenant: TTenant) => {
      list.push({
        key: tenant._id,
        value: tenant._id,
        text: `${tenant.name} (${tenant.namespace})`,
      } as TSelectOptions)
    })
    setTenantsList(list)
  }

  useEffect(() => {
    populateForm()
    if (item) formik.setFieldValue('tenant', item.tenant._id)
    // eslint-disable-next-line
  }, [item])

  const populateForm = () => {
    if (!item) return
    formik.setFieldValue('name', item.name)
    formik.setFieldValue('email', item.email)
    formik.setFieldValue('isMaster', item.isMaster)
    formik.setFieldValue('tenant', item.tenant)
  }

  const closeModal = () => {
    formik.resetForm()
    hideModal()
  }

  const handleSubmit = async (values: TCustomFormType) => {
    setIsAdding(true)
    const _item = {
      ...item,
      name: values.name,
      email: values.email,
      isMaster: values.isMaster,
      tenant: values.tenant,
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
          label="Email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
        />
        {user?.tenant.isMaster && (
          <SelectField
            label="Tenant"
            name="tenant"
            options={tenantsList}
            value={formik.values.tenant}
            onChange={(e, data: DropdownProps) =>
              formik.setFieldValue('tenant', data.value)
            }
          />
        )}
        <ToggleField
          label="Is Master"
          name="isMaster"
          value={formik.values.isMaster}
          onChange={() => {
            formik.setFieldValue('isMaster', !formik.values.isMaster)
          }}
        />
        <FormButtons isAdding={isAdding} closeModal={closeModal} />
      </Grid>
    </Form>
  )
}

export default FormComponent
