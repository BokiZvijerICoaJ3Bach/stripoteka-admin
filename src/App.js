import React, { Component } from 'react';
import './App.css';

import Header from './components/Header'
import Input from  './components/Input'

class App extends Component {
  render() {
    return (
      <div className="App">
      <Header/>
      <Input password="kjkszpj"/>
      </div>
    );
  }
}

export default App;
