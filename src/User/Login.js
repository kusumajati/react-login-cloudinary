import React from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Redirect } from 'react-router-dom'

export default class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      userId: '',
      redirect: false
    }

    this.onChangeUsername = this.onChangeUsername.bind(this)
    this.onChangePassword = this.onChangePassword.bind(this)
    this.login = this.login.bind(this)

  }

  login() {
    fetch('https://mpbinarsiang.herokuapp.com/user/login', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrer: 'no-referrer', // no-referrer, *client
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      }) // body data type must match "Content-Type" header
    }).then(response => response.json())
      .then(data => {
        // store.set('isLoggedIn', true)
        localStorage.setItem('isLoggedIn', true)
        localStorage.setItem('TOKEN', data.data.token)
        localStorage.setItem('USER', data.data.userId)


      }).then(() => {
         this.props.history.push('/')

      })
  }

  onChangeUsername(event) {
    this.setState({
      username: event.target.value
    })
  }
  onChangePassword(event) {
    this.setState({
      password: event.target.value
    })
  }

  render() {
    if (localStorage.getItem('isLoggedIn')|| this.state.redirect) {
      return (
        <Redirect to={'/'} />
      )
    } else {
      return (
        <div>
          <h1>Login</h1>
          <Form inline>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <Label for="exampleEmail" className="mr-sm-2">Username</Label>
              <Input onChange={this.onChangeUsername} type="text" name="email" id="exampleEmail" placeholder="username" />
            </FormGroup>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <Label for="examplePassword" className="mr-sm-2">Password</Label>
              <Input onChange={this.onChangePassword} type="password" name="password" id="examplePassword" placeholder="don't tell!" />
            </FormGroup>
            <Button onClick={this.login}>Submit</Button>
          </Form>
        </div>
      )
    }
  }
}
