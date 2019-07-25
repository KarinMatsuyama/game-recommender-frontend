import React from 'react'
import { Redirect } from 'react-router-dom'
import UsersAPI from '../api/UsersAPI'
import { Form, Button } from 'react-bootstrap'

function login(props) {
  const {token, setUsername, setToken, loginError, setLoginError} = props

  const handleSubmit = (event) => {
    event.preventDefault()
    const credentialInfo = {
      username: event.target.elements.username.value,
      password: event.target.elements.password.value
    }

    UsersAPI.login(credentialInfo)
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          throw true
        }
      })
      .then(jsonResponse => {
        setUsername(credentialInfo.username)
        setToken(jsonResponse.token)
      })
      .catch(_error => setLoginError('Unable to log in with provided credentials. Please try again.'))
  }

  return (
    <div>
      {token && <Redirect to="/" />}
      <h2>Login</h2>
      {loginError}
      <Form onSubmit={handleSubmit}>
        <Form.Label>Username: </Form.Label>
        <Form.Control name="username" type="text" placeholder="Enter username" required />
        <Form.Label>Password: </Form.Label>
        <Form.Control name="password" type="password" placeholder="Enter password" required />
        <Button type="submit">Submit</Button>
      </Form>
    </div>
  )
}

export default login
