import './App.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Footer from './components/layout/Footer'
import Landing from './components/layout/Landing'
import Navbar from './components/layout/Navbar'
import React, { Component } from 'react'


class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Landing} />
          <Footer />
        </div>
      </Router>
    )
  }
}

export default App;
