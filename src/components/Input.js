import React from 'react'
import _ from 'lodash'
import axios from 'axios'

class Input extends React.Component{
    state={slike:[]}
    readFiles(e){
        const imgs=[...this.state.slike]
      for (let i = 0; i<e.target.files.length; i++)
      {
        const reader= new FileReader();
        const set= st=>this.setState(st)
    reader.addEventListener("load", function () {
        imgs.push(reader.result);
        set({slike: _.uniq(imgs)})
      }, false);
          reader.readAsDataURL(e.target.files[i])}
    }
    componentWillReceiveProps(nextProps){
        this.setState(nextProps)
    }
    remove(slika){
        this.setState({slike: _.without(this.state.slike, slika)})
    }
    submit(e){
        e.preventDefault()
        if(this.state.ID){
            axios.put("https://sleepy-beach-98711.herokuapp.com/api/update", this.state, {
                headers: {"Access-Control-Allow-Origin": "*"},auth:{password:this.state.password}}).then(r=>console.log(r))
        }
        else{

            axios.post("https://sleepy-beach-98711.herokuapp.com/api/additem", this.state, {
                headers: {"Access-Control-Allow-Origin": "*"},auth:{password:this.state.password}}).then(r=>console.log(r))
        }
    }
     render(){
    return(
        <div>
        <form onSubmit={this.submit.bind(this)}>
        <input type="text" placeholder="grupa" onChange={e=>this.setState({grupa: e.target.value})}/>
        <input type="text" placeholder="podgrupa" onChange={e=>this.setState({podgrupa: e.target.value})}/>
        <input type="text" placeholder="ime" onChange={e=>this.setState({ime: e.target.value})}/>
        <input type="text" placeholder="izdavac" onChange={e=>this.setState({izdavac: e.target.value})}/>
        <input type="text" placeholder="naslov" onChange={e=>this.setState({naslov: e.target.value})}/>
        <input type="text" placeholder="opis" onChange={e=>this.setState({opis: e.target.value})}/>
        <input type="number" placeholder="cena" onChange={e=>this.setState({cena: e.target.value})}/>
        <input type="number" placeholder="broj" onChange={e=>this.setState({broj: e.target.value})}/>
        <input type="number" placeholder="ocuvanost" onChange={e=>this.setState({ocuvanost: e.target.value})}/>//ocuvanost ti ide od 1 do 5, stavi neki dropdown ili neka govna ako ti je lakse, i obrisi ovaj tekst ne znam kako se pisu komentari u jsx faking
        <input type="file" multiple onChange={this.readFiles.bind(this)}/>
        {this.state.slike?
            this.state.slike.map(slika=>
            <img key = {slika} onClick={()=>{this.remove(slika)}} src={slika} alt={this.state.naslov}/>)
            :null
        }
        <button type="submit">Submit</button>
        </form>
        </div>
    )
}
}

export default Input
