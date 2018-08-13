import React, { Component, PropTypes } from 'react'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import Messages from '../notifications/Messages'
import Errors from '../notifications/Errors'

import loginRequest from './actions'

class Login extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    loginRequest: PropTypes.func,
    login: PropTypes.shape({
      requesting: PropTypes.bool,
      successful: PropTypes.bool,
      messages: PropTypes.array,
      errors: PropTypes.array,
    }),
  }

  submit = (values) => {
    this.props.loginRequest(values)
  }

  render () {
    const {
      handleSubmit, // remember, Redux Form injects this into our props
      login: {
        requesting,
        successful,
        messages,
        errors,
      },
    } = this.props

    return (
      <div className="login" align="center">
        <form className="widget-form" onSubmit={handleSubmit(this.submit)}>
          <h1 >LOGIN</h1>
          <label htmlFor="email">Email</label>
          <Field
            name="email"
            type="text"
            id="email"
            className="email"
            component="input"
          />
          <label htmlFor="password">Password</label>
          <Field
            name="password"
            type="password"
            id="password"
            className="password"
            component="input"
          />
          <button action="submit">LOGIN</button>
        </form>
        <div className="auth-messages">
          {!requesting && !!errors.length && (
            <Errors message="Failure to login due to:" errors={errors} />
          )}
          {!requesting && !!messages.length && (
            <Messages messages={messages} />
          )}
          {requesting && <div>Logging in...</div>}
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  login: state.login,
})
const connected = connect(mapStateToProps, { loginRequest })(Login)

const formed = reduxForm({
  form: 'login',
})(connected)

export default formed
