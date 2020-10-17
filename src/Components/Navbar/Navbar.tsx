import React from 'react'
import { Link } from 'react-router-dom'
import { Menu, Container, Dropdown } from 'semantic-ui-react'
import { useAuth } from '../../Hooks'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog, faCrown } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'

const Icon = styled(FontAwesomeIcon)`
  margin-right: 9px;
`

const Navbar = () => {
  const { user, signOut } = useAuth()

  return (
    <Menu color={user?.isMaster ? 'orange' : 'blue'} inverted>
      <Container>
        <Menu.Item as={Link} to="/" header>
          ArtAdmin
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item as={Link} to="/orders">
            <span>Orders</span>
          </Menu.Item>
          <Menu.Item as={Link} to="/products">
            <span>Products</span>
          </Menu.Item>
          <Menu.Item as={Link} to="/clients">
            <span>Clients</span>
          </Menu.Item>
          <Menu.Item>
            <Dropdown
              trigger={
                <>
                  <Icon icon={user?.isMaster ? faCrown : faCog} />
                  <span> {user?.name}</span>
                </>
              }
            >
              <Dropdown.Menu>
                {user?.isMaster && user?.tenant.isMaster && (
                  <Dropdown.Item text="Users" as={Link} to="/tenants">
                    <span>Tenants</span>
                  </Dropdown.Item>
                )}
                {user?.isMaster && (
                  <Dropdown.Item text="Users" as={Link} to="/users">
                    <span>Users</span>
                  </Dropdown.Item>
                )}
                <Dropdown.Item text="Sign Out" onClick={signOut} />
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>
        </Menu.Menu>
      </Container>
    </Menu>
  )
}

export default Navbar
