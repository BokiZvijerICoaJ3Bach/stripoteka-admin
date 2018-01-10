import React, { Component } from 'react';
import './App.css';
import {Route, withRouter} from 'react-router-dom'

import Header from './components/Header'
import Inp from  './components/Input'
import Its from './components/Items'
import Crt from './components/Carts'

class App extends Component {
  state={password: ""}
  setSearch=e=>this.setState({search: e})
  updateAxios=e=>this.setState({password: e.target.value})
  Input = props=><Inp {...props} password={this.state.password}/>
  Items = props=><Its {...props}  search={this.setSearch.bind(this)}/>
  Carts = props=><Crt {...props} password={this.state.password}/>
  render() {
    return (
      <div className="App">
      <Header search={this.state.search} showCarts={()=>this.props.history.push('/carts')} addNewItem={()=>this.props.history.push('/edit')} showItems={()=>this.props.history.push('/')} setPwd={this.updateAxios}/>
      <Route path = '/edit/:ID' component={this.Input}/>
      <Route path = '/edit' exact component={this.Input}/>
      <Route path= '/carts' component = {this.Carts}/>
      <Route path = '/' exact component = {this.Items}/>
      </div>
    );
  }
}

export default withRouter(App);
