import React, { PropTypes } from 'react'
import logo from './logo.svg'
import './App.css'

const App = props => (
  <div className="App">
    <div className="App-header">
      <h2>Welcome to Country Repository</h2>
    </div>
    <section className="App-body">
      {props.children}
    </section>
  </div>
)

App.propTypes = {
  children: PropTypes.node,
}

export default App
