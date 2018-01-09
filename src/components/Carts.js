import React from 'react'

const Carts = props=>{
    return(
        <div>
        <p>{}props.ID</p>
        <p>{props.ime}</p>
        <p>{props.naslov}</p>
        <button onClick={props.approve}>Prihvati Narudzbu</button>
        <button onClick={props.decline}>Prihvati Narudzbu</button>
        </div>
    )
}

export default Carts
