import React from 'react'

const Header = props=>{
    return(
        <div>
        <button onClick={props.addNewItem}>Dodaj</button>
<input type='search' placeholder='pretrazi' onChange={props.search}/>
<button onClick={props.showCarts}>Pregledaj Narudzbine</button>
<button onClick={props.showItems}>Vidi Iteme</button>
        </div>
    )
}

export default Header


