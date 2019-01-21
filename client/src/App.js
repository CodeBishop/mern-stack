import './App.css';
import Footer from './components/layout/Footer'
import Navbar from './components/layout/Navbar'
import React, { Component } from 'react';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <h1>My React App</h1>
        <Footer />
      </div>
    );
  }
}

export default App;
