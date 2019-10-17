import 'rsuite/dist/styles/rsuite-default.css'
import 'rsuite/dist/styles/rsuite-dark.css'
import React from 'react'
import Apollo from './Providers/apollo'
import { Container, Header, Content } from 'rsuite'
import Navbar from './Components/navbar'
import Login from './Components/login'
import Issues from './Components/issues'
import { AuthProvider, AuthContext } from './Context/auth'

export default (
  <AuthProvider>
    <Container>
      <Header>
        <Navbar />
      </Header>
      <Content>
        <AuthContext.Consumer>
          {context => (
            <>
              {!context.token && <Login />}
              {context.token && (
                <Apollo token={context.token}>
                  <Issues />
                </Apollo>
              )}
            </>
          )}
        </AuthContext.Consumer>
      </Content>
    </Container>
  </AuthProvider>
)
