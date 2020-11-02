import { Colors } from './Styles'

declare global {

  // tenat

  type TTenant = {
    _id: string
    name: string
    namespace: string
    isMaster: boolean
    user: TUser
    createdAt: Date
    updatedAt: Date
  }

  type TTenantForm = {
    _id?: string
    name: string
    namespace: string
    isMaster: boolean
    updatedAt?: Date
  }

  // user

  type TUser = {
    _id: string
    name: string
    email: string
    isMaster: boolean
    tenant: TTenant
    token?: string
    enabled: boolean
    user: TUser
    createdAt: Date
    updatedAt: Date
  }

  type TUserForm = {
    _id?: string
    name: string
    email: string
    isMaster: boolean
    tenant: string
    updatedAt?: Date
  }

  // product

  type TBoughBy = 'squareMeter' | 'linearMeter' | 'weight' | 'unity'

  type TProduct = {
    _id: string
    title: string
    boughtBy: TBoughBy
    price: number
    width: number
    enabled: boolean
    user: TUser
    createdAt: Date
    updatedAt: Date
  }

  type TProductForm = {
    _id?: string
    title: string
    boughtBy: TBoughBy
    price: string
    width: string
    updatedAt?: Date
  }

  type TFilterEnable = 'Enabled' | 'Disabled' | null

  // client

  type TClient = {
    _id: string
    name: string
    city: string
    state: string
    referral: string
    user: TUser
    createdAt: Date
    updatedAt: Date
  }

  type TClientForm = {
    _id?: string
    name: string
    city: string
    state: string
    referral: string
    updatedAt?: Date
  }

  // baby

  type TGender = 'male' | 'female' | 'uknown'

  type TBaby = {
    _id: string
    name: string
    gender: TGender
    birthday: Date
    client: TClient
    user: TUser
    createdAt: Date
    updatedAt: Date
  }

  type TBabyForm = {
    _id?: string
    name: string
    gender: string
    birthday: string
    updatedAt?: Date
  }

  // order

  type TOrder = {
    _id: string
    title: string
    client: TClient
    baby: TBaby
    deadline: Date
    status: number
    payments: TPayment[]
    user: TUser
    createdAt: Date
    updatedAt: Date
  }

  type TOrderForm = {
    _id?: string
    title: string
    client: string
    baby: string
    status: string
    deadline: string | Date
    updatedAt?: Date
  }

  type TPayment = {
    _id: string
    date: Date
    description: string
    value: number
    order: TOrder
    user: TUser
    createdAt: Date
    updatedAt: Date
  }

  type TPaymentForm = {
    _id?: string
    date: string
    description: string
    value: string
    updatedAt?: Date
  }

  type TItem = {
    _id: string
    title: string
    description: string
    materials: number
    labor: number
    price: number
    quantity: number
    order: TOrder
    user: TUser
    createdAt: Date
    updatedAt: Date
  }

  type TItemForm = {
    _id?: string
    title: string
    description: string
    labor: string
    price: string
    quantity: string
    updatedAt?: Date
  }

  type TImportItem = {
    order: string
    item: string
  }

  type TMaterial = {
    _id: string
    title: string
    measurementQuantity: number,
    width: number,
    waste: number,
    product: TProduct
    item: TItem
    user: TUser
    createdAt: Date
    updatedAt: Date
  }

  type TMaterialForm = {
    _id?: string
    title: string
    measurementQuantity: string
    width: string
    waste: string
    product: string
    updatedAt?: Date
  }

  type TTableHeader = {
    title: string
    column: string
  }

  type TSort = {
    column: string
    order: 'asc' | 'desc'
  }

  type TInfo = {
    label: string
    value: any
  }

  type TTheme = {
    padding: string
    borderRadius: string
    boxShadow: string
    colors: typeof Colors
    color: {
      Black: string
      Blue: string
      Error: string
      Green: string
      LightBlueMenus: string
      Main: string
      MainDarker1: string
      MainLighter1: string
      Red: string
      White: string
      Yellow: string
    }
  }

  type TSelectOptions = {
    key: string
    value: string
    text: string
  }

  type TSelectProps = {
    id: string
    name: string
    options: TSelectOptions[]
  }

  type TPrintPage = 'report' | 'budget' | 'file'

}

export { }