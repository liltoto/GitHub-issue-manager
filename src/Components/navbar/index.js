import React from 'react'
import { Navbar as RsuiteNavbar, Nav, Icon } from 'rsuite'
import { AuthContext } from '../../Context/auth'

const styles = {
  display: 'flex',
  height: '100%',
  alignItems: 'center',
  padding: '0 15px',
}

const Navbar = () => {
  return (
    <AuthContext.Consumer>
      {context => (
        <RsuiteNavbar>
          <RsuiteNavbar.Header>
            <div style={styles} className="navbar-brand logo">
              GitHub issue manager
            </div>
          </RsuiteNavbar.Header>
          {context.token && (
            <RsuiteNavbar.Body>
              <Nav onSelect={context.clearToken} pullRight>
                <Nav.Item eventKey="logout" icon={<Icon icon="sign-out" />}>
                  Sign Out
                </Nav.Item>
              </Nav>
            </RsuiteNavbar.Body>
          )}
        </RsuiteNavbar>
      )}
    </AuthContext.Consumer>
  )
}

export default Navbar
