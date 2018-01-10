import React from 'react'
import {Link} from 'react-router-dom'

const Item = props=>{
    return(
        <Link to={"/edit/"+props.item.ID}>
        <img src={props.item.slike[0]} alt={props.naslov}/>
        <p>{props.item.ime+":"+props.item.naslov}</p>
        </Link>
    )
}

export default Item
