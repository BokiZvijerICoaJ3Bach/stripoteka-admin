import React from 'react'
import axios from 'axios'
const Cart = props=>{
    return(
        <div>
        <h3>{props.kontakt}</h3>
        {props.items.map(item=><div key={item.ID}>
            <p>{item.ime+":"+item.naslov}</p>
            <p>{item.cena}</p>
            <button onclick={()=>{axios.delete("https://sleepy-beach-98711.herokuapp.com/api/approvecart", props, {auth:{password: props.password}})}}>potvrdi</button>
            <button onclick={()=>{axios.delete("https://sleepy-beach-98711.herokuapp.com/api/declinecart", props, {auth:{password: props.password}})}}>otkazi</button>
            </div>)}
        </div>
    )
}

export default Cart
