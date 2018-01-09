import React from 'react'
import _ from 'lodash'
import axios from 'axios'

const imgs=[]
const slike=[]

class Input extends React.Component{
    state={slike:[]}
    readFiles(e){
      for (let i = 0; i<e.target.files.length; i++)
      {
        this.uploadFile.bind(this)(e.target.files[i])
    }
}
    componentWillReceiveProps(nextProps){
        this.setState(nextProps)
    }
    remove(thumb){
        const slika = this.state.thumbs.indexOf(thumb)
        console.log(slika)
        imgs.splice(slika, 1)
        slike.splice(slika, 1)
        this.setState({thumbs: _.without(this.state.thumbs, thumb)})
        this.setState({slike: this.state.slike.filter((s, i)=>i!== slika)})
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
    cloudName="dcmifddlf"
    uploadFile(file) {
        const set= st=>this.setState(st)
        const url = `https://api.cloudinary.com/v1_1/dcmifddlf/upload`;
        const xhr = new XMLHttpRequest();
        const fd = new FormData();
        xhr.open('POST', url, true);
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
          set({width:"0"});
        xhr.upload.addEventListener("progress", function(e) {
          var progress = Math.round((e.loaded * 100.0) / e.total);
          set({width:progress+"%"});
      
          console.log(`fileuploadprogress data.loaded: ${e.loaded},
        data.total: ${e.total}`);
        });
      
        xhr.onreadystatechange = function(e) {
          if (xhr.readyState == 4 && xhr.status == 200) {
            const response = JSON.parse(xhr.responseText);
            const url = response.secure_url;
            slike.push(url)
            const tokens = url.split('/');
            tokens.splice(-2, 0, 'w_240,c_scale');
            imgs.push(tokens.join('/'));
            set({thumbs: imgs})
            set({slike})
          }
        };
      
        fd.append('upload_preset', "lynr14lw");
        fd.append('tags', 'browser_upload'); // Optional - add tag for image admin in Cloudinary
        fd.append('file', file);
        xhr.send(fd);
      }
      progressBarStyle={
        height: "8px",
        backgroundColor: "#ff0000",
        width: 0}
        progress={}
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
        <div style={{...this.progressBarStyle,
            width: "200px",
            position: "relative",
            height: "8px",
            marginTop: "4px"}}><div style={{width:this.state.width, ...this.progressBarStyle}}></div></div>
        {this.state.thumbs?
            this.state.thumbs.map(slika=>
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
