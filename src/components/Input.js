import React from 'react'
import _ from 'lodash'
import axios from 'axios'

let imgs=[]
let slike=[]

class Input extends React.Component{
    state={grupa: "", podgrupa: "", ime: "", naslov: "",
    opis: "", izdavac: "", cena: 0, broj: 0, ocuvanost: 0, slike:[]}
    readFiles(e){
      for (let i = 0; i<e.target.files.length; i++)
      {
        this.uploadFile.bind(this)(e.target.files[i])
    }
}
    componentDidMount(){
        const { match: { params } } = this.props;
      if(params.ID){
        axios.get(`https://sleepy-beach-98711.herokuapp.com/api/item/${params.ID}`)
          .then((response) => {
      
            this.setState(response.data);
            imgs=[...this.state.slike]
            slike=[...this.state.slike]
            this.setState({thumbs: [...this.state.slike]})
          });}
    }
    remove(slika){
        imgs.splice(slika, 1)
        slike.splice(slika, 1)
        this.setState({thumbs: imgs})
        this.setState({slike})
    }
    submit(e){
        e.preventDefault()
        if(this.state.ID){
            axios.put("https://sleepy-beach-98711.herokuapp.com/api/update", this.state, {
                headers: {"Access-Control-Allow-Origin": "*"},auth:{password:this.props.password}}).then(r=>console.log(r))
        }
        else{

            axios.post("https://sleepy-beach-98711.herokuapp.com/api/additem", this.state, {
                headers: {"Access-Control-Allow-Origin": "*"},auth:{password:this.props.password}}).then(r=>console.log(r))
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
        <input type="text" placeholder="grupa" value={this.state.grupa} onChange={e=>this.setState({grupa: e.target.value})}/>
        <input type="text" placeholder="podgrupa" value={this.state.podgrupa} onChange={e=>this.setState({podgrupa: e.target.value})}/>
        <input type="text" placeholder="ime" value={this.state.ime} onChange={e=>this.setState({ime: e.target.value})}/>
        <input type="text" placeholder="izdavac" value={this.state.izdavac} onChange={e=>this.setState({izdavac: e.target.value})}/>
        <input type="text" placeholder="naslov" value={this.state.naslov} onChange={e=>this.setState({naslov: e.target.value})}/>
        <input type="text" placeholder="opis" value={this.state.opis} onChange={e=>this.setState({opis: e.target.value})}/>
        <input type="number" placeholder="cena" value={this.state.cena} onChange={e=>this.setState({cena: e.target.value})}/>
        <input type="number" placeholder="broj" value={this.state.broj} onChange={e=>this.setState({broj: e.target.value})}/>
        <input type="number" placeholder="ocuvanost" value={this.state.ocuvanost} onChange={e=>this.setState({ocuvanost: e.target.value})}/>//ocuvanost ti ide od 1 do 5, stavi neki dropdown ili neka govna ako ti je lakse, i obrisi ovaj tekst ne znam kako se pisu komentari u jsx faking
        <input type="file" multiple onChange={this.readFiles.bind(this)}/>
        <div style={{...this.progressBarStyle,
            width: "200px",
            position: "relative",
            height: "8px",
            marginTop: "4px"}}><div style={{width:this.state.width, ...this.progressBarStyle}}></div></div>
        {this.state.thumbs?
            this.state.thumbs.map((slika, index)=>
            <img key = {index} onClick={()=>{this.remove(index)}} src={slika} alt={this.state.naslov}/>)
            :null
        }
        <button type="submit">Submit</button>
        </form>
        </div>
    )
}
}

export default Input
