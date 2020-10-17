import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import { useAuth } from '../Hooks/useAuth'
import DefaultLayout from '../Components/DefaultLayout/DefaultLayout'
import {
  LoginPage,
  UsersPage,
  OrdersPage,
  ProductsPage,
  ClientsPage,
  BabiesPage,
  PaymentsPage,
  ItemsPage,
  ItemsPrintPage,
  MaterialsPage,
} from '../Pages'

const PrivateRoute = ({ component: Component, ...rest }: any) => {
  const { userToken } = useAuth()
  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (userToken) {
          return (
            <DefaultLayout>
              <Component />
            </DefaultLayout>
          )
        } else {
          return (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: location },
              }}
            />
          )
        }
      }}
    />
  )
}

const PrintPrivateRoute = ({ component: Component, ...rest }: any) => {
  const { userToken } = useAuth()
  return (
    <Route
      {...rest}
      render={(routeProps) => {
        if (userToken) {
          return <Component />
        } else {
          return (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: routeProps.location },
              }}
            />
          )
        }
      }}
    />
  )
}

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login" exact component={LoginPage} />
        <PrivateRoute path="/" exact component={OrdersPage} />
        <PrivateRoute path="/users" exact component={UsersPage} />
        <PrivateRoute path="/orders" exact component={OrdersPage} />
        <PrivateRoute path="/products" exact component={ProductsPage} />
        <PrivateRoute path="/clients" exact component={ClientsPage} />
        <PrivateRoute path="/babies/:clientId" exact component={BabiesPage} />
        <PrivateRoute
          path="/payments/:orderId"
          exact
          component={PaymentsPage}
        />
        <PrivateRoute path="/items/:orderId" exact component={ItemsPage} />
        <PrintPrivateRoute
          path="/items/print/:orderId"
          exact
          component={ItemsPrintPage}
        />
        <PrintPrivateRoute
          path="/items/print/:orderId/budget/:budget"
          exact
          component={ItemsPrintPage}
        />
        <PrivateRoute
          path="/materials/:itemId"
          exact
          component={MaterialsPage}
        />
      </Switch>
    </Router>
  )
}

export default Routes
