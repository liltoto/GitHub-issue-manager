import React, { useState } from 'react'
import {
  Form,
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock,
  ButtonToolbar,
  Button,
  FlexboxGrid,
  Col,
} from 'rsuite'
import { AuthContext } from '../../Context/auth'

const Login = () => {
  const [formValue, setFormValue] = useState()
  return (
    <FlexboxGrid justify="center">
      <FlexboxGrid.Item componentClass={Col} colspan={24} sm={8} md={6}>
        <AuthContext.Consumer>
          {context => (
            <Form
              fluid
              style={{ paddingTop: 25 }}
              onChange={formValue => {
                setFormValue(formValue)
              }}
            >
              <FormGroup>
                <ControlLabel>Github personal token</ControlLabel>
                <FormControl name="token" type="password" />
                <HelpBlock>Required</HelpBlock>
              </FormGroup>
              <FormGroup>
                <ButtonToolbar>
                  <Button
                    color="cyan"
                    onClick={() =>
                      formValue?.token && context.setToken(formValue.token)
                    }
                  >
                    Submit
                  </Button>
                </ButtonToolbar>
              </FormGroup>
            </Form>
          )}
        </AuthContext.Consumer>
      </FlexboxGrid.Item>
    </FlexboxGrid>
  )
}

export default Login
