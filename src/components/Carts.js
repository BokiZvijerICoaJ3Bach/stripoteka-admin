import React from 'react'
import Cart from './Cart'
import axios from 'axios'

class Carts extends React.Component{
    state={items: []}
    updateItems(d){
        if(d instanceof Array){
        this.setState({items: d})
        }
        console.log(d)
    }
    componentDidMount(){
        axios.get("https://sleepy-beach-98711.herokuapp.com/api/getcarts", null, {auth: {password: this.props.password}}).then(r=>this.updateItems(r.data))
    }
    render(){
    return(
        <div>
        {this.state.items.map(item=><Cart password={this.props.password} key={item.kontakt} kontakt={item.kontakt} items={item.itemi}/>)}
        </div>
    )}
}

export default Carts
