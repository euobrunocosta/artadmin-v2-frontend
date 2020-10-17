import React, { useState } from 'react'
import {
  GridRow,
  GridColumn,
  Search,
  SearchProps,
  SearchResultData,
} from 'semantic-ui-react'
import { useFormik } from 'formik'
import api from '../../../Services/Api'
import { formatListToSearchField } from '../../../Utils/Helpers'

type TProps = {
  value: string
  setFieldValue(
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ): any
  fieldTitle: string
  apiPath: string
  sort?: string
}

const SearchField = (props: TProps) => {
  const { value, setFieldValue, fieldTitle, apiPath, sort } = props

  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState<any[]>([])

  const formik = useFormik({
    initialValues: { value },
    onSubmit: () => {},
  })

  const handleSearchChange = async (selectedValue?: string) => {
    if (!selectedValue) return

    formik.setFieldValue('value', selectedValue)
    setIsLoading(true)
    const query: any = {
      search: selectedValue,
    }
    if (sort) query.sort = sort
    const response = await api.get(apiPath, query)
    if (!response) return
    setResults(formatListToSearchField(response.data))
    setIsLoading(false)
  }

  return (
    <GridRow>
      <GridColumn computer={3} verticalAlign="middle" textAlign="right">
        <label>Product</label>
      </GridColumn>
      <GridColumn computer={13}>
        <Search
          input={{ icon: 'search', iconPosition: 'left' }}
          id="product"
          name="product"
          results={results}
          value={formik.values.value}
          loading={isLoading}
          onSearchChange={(
            event: React.MouseEvent<HTMLElement, MouseEvent>,
            data: SearchProps
          ) => {
            handleSearchChange(data.value)
          }}
          onResultSelect={(
            event: React.MouseEvent<HTMLElement, MouseEvent>,
            data: SearchResultData
          ) => {
            setFieldValue(fieldTitle, data.result._id)
            formik.setFieldValue('value', data.result.title)
          }}
          // onSelectionChange={}
          noResultsMessage="Não foi encontrado resultados"
        />
      </GridColumn>
    </GridRow>
  )
}

export default SearchField
