import React from 'react'
import Item from './Item'
import axios from 'axios'

class Items extends React.Component{
    state={items: []}
    componentDidMount(){
      axios.get('https://sleepy-beach-98711.herokuapp.com/api/items').then(r=>this.setState({items: r.data}))
    this.props.search(e=>{axios.get('https://sleepy-beach-98711.herokuapp.com/api/search/'+e.target.value).then(r=>this.setState({items: r.data}))})
    }
    render(){
    return(
        this.state.items.map(item=><Item key={item.ID} item={item}/>)
    )}
}

export default Items
