import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { Container, Table } from 'semantic-ui-react'
import styled from 'styled-components'
import api from '../../Services/Api'
import {
  Header,
  PageTitle,
  EmptyList,
  OrderStatus,
  GenderLabel,
  ProfitLabel,
} from '../../Components'
import {
  formatNumberToCurrency,
  formatNumber,
  calculateProfit,
  formatDateToUI,
} from '../../Utils/Helpers'

const ProfitWrapper = styled.div`
  white-space: nowrap;
`

type TProps = {
  orderId: string
}

const Payments = (props: TProps) => {
  const { orderId } = props
  const [payments, setPayments] = useState<TPayment[]>([])
  const [isPaymentsLoading, setIsPaymentsLoading] = useState(false)

  useEffect(() => {
    const getPaymentsData = async () => {
      setIsPaymentsLoading(true)
      const response = await api.get(`/payments/order/${orderId}`, {
        sort: 'date',
      })
      setIsPaymentsLoading(false)
      if (!response) return
      setPayments(response.data)
    }

    getPaymentsData()
  }, [orderId])

  const calculatePaymentTotals = () => {
    const totals = {
      income: 0,
      expenses: 0,
      balance: 0,
    }

    payments.forEach((item) => {
      if (item.value > 0) totals.income += item.value
      else totals.expenses += item.value * -1
    })
    totals.balance = totals.income - totals.expenses

    return totals
  }

  const paymentTotals = calculatePaymentTotals()

  return (
    <>
      <Header>
        <PageTitle>Payments</PageTitle>
      </Header>
      <Table selectable celled>
        <Table.Header>
          <Table.HeaderCell>Date</Table.HeaderCell>
          <Table.HeaderCell>Description</Table.HeaderCell>
          <Table.HeaderCell>Value</Table.HeaderCell>
        </Table.Header>
        <Table.Body>
          {payments.length ? (
            payments.map((item, index) => {
              return (
                <Table.Row key={index}>
                  <Table.Cell>{formatDateToUI(item.date)}</Table.Cell>
                  <Table.Cell>{item.description}</Table.Cell>
                  <Table.Cell>{formatNumberToCurrency(item.value)}</Table.Cell>
                </Table.Row>
              )
            })
          ) : (
            <EmptyList isLoading={isPaymentsLoading} colSpan={7} />
          )}
        </Table.Body>
        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan={5} textAlign="center">
              Income:{' '}
              <strong>{`${formatNumberToCurrency(
                paymentTotals.income
              )}`}</strong>{' '}
              - Expenses:{' '}
              <strong>{`${formatNumberToCurrency(
                paymentTotals.expenses
              )}`}</strong>{' '}
              = Balance:{' '}
              <strong>{`${formatNumberToCurrency(
                paymentTotals.balance
              )}`}</strong>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </>
  )
}

const OrderAndBay = (props: TProps) => {
  const { orderId } = props

  const [order, setOrder] = useState<TOrder>()
  const [isOrderLoading, setIsOrderLoading] = useState(false)

  useEffect(() => {
    const getOrderData = async () => {
      setIsOrderLoading(true)
      const response = await api.get(`/orders/${orderId}`)
      setIsOrderLoading(false)
      if (!response) return
      setOrder(response)
    }

    getOrderData()
  }, [orderId])

  return (
    <>
      <Header>
        <PageTitle>Order</PageTitle>
      </Header>
      <Table selectable celled>
        <Table.Header>
          <Table.HeaderCell>Title</Table.HeaderCell>
          <Table.HeaderCell>Client</Table.HeaderCell>
          <Table.HeaderCell>City - State</Table.HeaderCell>
          <Table.HeaderCell>Deadline / Finish Date</Table.HeaderCell>
          <Table.HeaderCell>Status</Table.HeaderCell>
        </Table.Header>
        <Table.Body>
          {order ? (
            <Table.Row>
              <Table.Cell>{order.title}</Table.Cell>
              <Table.Cell>{order.client.name}</Table.Cell>
              <Table.Cell>{`${order.client.city} - ${order.client.state}`}</Table.Cell>
              <Table.Cell>{formatDateToUI(order.deadline)}</Table.Cell>
              <Table.Cell>
                <OrderStatus status={order.status} />
              </Table.Cell>
            </Table.Row>
          ) : (
            <EmptyList isLoading={isOrderLoading} colSpan={5} />
          )}
        </Table.Body>
      </Table>
      <Header>
        <PageTitle>Baby</PageTitle>
      </Header>
      <Table selectable celled>
        <Table.Header>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Gender</Table.HeaderCell>
          <Table.HeaderCell>Birthday</Table.HeaderCell>
        </Table.Header>
        <Table.Body>
          {order ? (
            <Table.Row>
              <Table.Cell>{order.baby.name}</Table.Cell>
              <Table.Cell>
                <GenderLabel gender={order.baby.gender} />
              </Table.Cell>
              <Table.Cell>{formatDateToUI(order.baby.birthday)}</Table.Cell>
            </Table.Row>
          ) : (
            <EmptyList isLoading={isOrderLoading} colSpan={3} />
          )}
        </Table.Body>
      </Table>
    </>
  )
}

type TItemsProps = {
  orderId: string
  isBudgetRequest: boolean
}

const Items = (props: TItemsProps) => {
  const { orderId, isBudgetRequest } = props

  const [items, setItems] = useState<TItem[]>([])
  const [isItemsLoading, setIsItemsLoading] = useState(false)

  useEffect(() => {
    const getItemsData = async () => {
      setIsItemsLoading(true)
      const response = await api.get(`/items/order/${orderId}`)
      setIsItemsLoading(false)
      if (!response) return
      setItems(response.data)
    }

    getItemsData()
  }, [orderId])

  const calculateTotals = () => {
    const totals = {
      materials: 0,
      labor: 0,
      quantity: 0,
      total: 0,
      profit: 0,
    }

    items.forEach((item) => {
      const quantity = item.quantity / 100
      totals.materials += item.materials * quantity
      totals.labor += item.labor * quantity
      totals.quantity += item.quantity
      totals.total += item.price * quantity
    })

    totals.profit = totals.total - (totals.materials + totals.labor)

    return totals
  }

  const totals = calculateTotals()
  const percentageTotalProfit = (totals.profit / totals.total) * 10000

  return (
    <>
      <Header>
        <PageTitle>Items</PageTitle>
      </Header>
      <Table selectable celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Title</Table.HeaderCell>
            <Table.HeaderCell>Description</Table.HeaderCell>
            {isBudgetRequest && (
              <>
                <Table.HeaderCell>Materials</Table.HeaderCell>
                <Table.HeaderCell>Labor</Table.HeaderCell>
              </>
            )}
            <Table.HeaderCell>Price</Table.HeaderCell>
            <Table.HeaderCell>Quantity</Table.HeaderCell>
            <Table.HeaderCell>Total</Table.HeaderCell>
            {isBudgetRequest && <Table.HeaderCell>Profit</Table.HeaderCell>}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {items.length ? (
            items.map((item, index) => {
              const total = (item.quantity * item.price) / 100
              const valueProfit = calculateProfit(
                item.price,
                item.materials,
                item.labor,
                item.quantity
              )
              const percentageProfit = (valueProfit / total) * 10000
              return (
                <Table.Row key={index}>
                  <Table.Cell>{item.title}</Table.Cell>
                  <Table.Cell>{item.description}</Table.Cell>
                  {isBudgetRequest && (
                    <>
                      <Table.Cell>
                        {formatNumberToCurrency(item.materials)}
                      </Table.Cell>
                      <Table.Cell>
                        {formatNumberToCurrency(item.labor)}
                      </Table.Cell>
                    </>
                  )}
                  <Table.Cell>{formatNumberToCurrency(item.price)}</Table.Cell>
                  <Table.Cell>{formatNumber(item.quantity)}</Table.Cell>
                  <Table.Cell>{formatNumberToCurrency(total)}</Table.Cell>
                  {isBudgetRequest && (
                    <Table.Cell>
                      <ProfitWrapper>
                        {formatNumberToCurrency(valueProfit)}
                        <ProfitLabel profitPercentage={percentageProfit} />
                      </ProfitWrapper>
                    </Table.Cell>
                  )}
                </Table.Row>
              )
            })
          ) : (
            <EmptyList isLoading={isItemsLoading} colSpan={7} />
          )}
        </Table.Body>
        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan={2}></Table.HeaderCell>
            {isBudgetRequest && (
              <>
                <Table.HeaderCell>
                  <strong>{formatNumberToCurrency(totals.materials)}</strong>
                </Table.HeaderCell>
                <Table.HeaderCell>
                  <strong>{formatNumberToCurrency(totals.labor)}</strong>
                </Table.HeaderCell>
              </>
            )}
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell>
              <strong>{formatNumber(totals.quantity)}</strong>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <strong>{formatNumberToCurrency(totals.total)}</strong>
            </Table.HeaderCell>
            {isBudgetRequest && (
              <Table.HeaderCell>
                <ProfitWrapper>
                  <strong>{formatNumberToCurrency(totals.profit)}</strong>
                  <ProfitLabel profitPercentage={percentageTotalProfit} />
                </ProfitWrapper>
              </Table.HeaderCell>
            )}
          </Table.Row>
        </Table.Footer>
      </Table>
    </>
  )
}

const PrintPage = () => {
  const params = useParams<{ orderId: string; budget: string }>()

  return (
    <Container style={{ backgroundColor: 'white' }}>
      {!params.budget && <OrderAndBay orderId={params.orderId} />}
      <Items orderId={params.orderId} isBudgetRequest={!params.budget} />
      {!params.budget && <Payments orderId={params.orderId} />}
    </Container>
  )
}

export default PrintPage
