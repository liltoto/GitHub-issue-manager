import React, { useReducer, createContext } from 'react'

const initialState = {
  token: localStorage.getItem('token') || undefined,
}

const AuthContext = createContext({
  token: undefined,
  setToken: () => {},
  clearToken: () => {},
})

const authReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TOKEN':
      return {
        ...state,
        token: action.payload,
      }
    case 'REMOVE_TOKEN':
      return {
        ...state,
        token: null,
      }
    default:
      return state
  }
}

const AuthProvider = props => {
  const [state, dispatch] = useReducer(authReducer, initialState)

  const signIn = token => {
    localStorage.setItem('token', token)
    dispatch({
      type: 'ADD_TOKEN',
      payload: token,
    })
  }
  const signOut = () => {
    localStorage.removeItem('token')
    dispatch({ type: 'REMOVE_TOKEN' })
  }

  return (
    <AuthContext.Provider
      value={{ ...state, setToken: signIn, clearToken: signOut }}
      {...props}
    />
  )
}

export { AuthContext, AuthProvider }
