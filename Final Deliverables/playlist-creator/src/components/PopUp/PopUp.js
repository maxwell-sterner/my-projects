import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./PopUp.css";
import Button from 'react-bootstrap/Button';




class PopUp extends Component {
    constructor(){
        super();
        this.whichPlaylist = React.createRef();

        this.state = {
            new:false,
            error:false,
            first:true,
            noName:false
        }
        this._addSong = this._addSong.bind(this);
        this._createNew = this._createNew.bind(this);
    }
    
  handleClick = () => {
   this.props.toggle();
   
  
  };

  componentDidMount(){
    if(this.props.playlists.length === 0){
        this.setState({
            first:true
        })
    }
    else{
      this.setState({
          first:false
      })

    }
  }

  _addSong(){
    if(this.whichPlaylist.current.value === ""){
        this.setState({
            noName:true
        });
    }
    else{
        this.setState({
            noName:false
        });
      
    const url = `http://localhost:8888/add`;

    const message = {
        userId: `${this.props.userId}`,
        songId: `${this.props.songId}`,
        playlist: `${this.whichPlaylist.current.value}`,
        songName: `${this.props.songName}`,
        artist: `${this.props.artist}`

    }

    const fetchOptions ={
        method: "POST",
        headers:{
            "Accept": "application/json",
            "Content-Type":"application/json"
        },
        body: JSON.stringify(message)
    };

    fetch(url, fetchOptions)
    .then(response => response.json())
    .then(result =>{
        if(!result[0].Added){
            this.setState({
                error:true
            });
        }

        if(!this.state.error && !this.state.noName){
            window.location.href = `http://localhost:3000/home/${this.props.accessToken}`;
        }

    })
   
   
}

}
    
_createNew(){
    this.setState({
        new: !this.state.new
    })
}        
           
            
    
  

  
render() {
    if(this.state.new || this.state.first){
        return (
            <div>
              
         
                 <p>Enter a new Playlist Name</p>
                 <input type="text"
                     placeholder = "New Playlist Name. . ."
                     ref = {this.whichPlaylist}/>
                 <Button variant = "success"  size = "sm" onClick = {this._addSong}>Add</Button>
                 <Button variant = "light"  size = "sm" onClick = {this._createNew}>Existing Playlists</Button>
                 {this.state.first ? <p className = "warning">(No existing playlists)</p> : null}

                 <div className = "error">
                            {this.state.noName ? <div>Either enter a name or select from existing.</div> : null}
                            
                    </div>
                 
            </div>
           );

    }
    else{
        return (
            <div>
              
                 <div className="close" onClick={this.handleClick}>&times;    </div>
                 <p>Add song to which playlist?</p>
         
                 <select ref={this.whichPlaylist}>
                     {this.props.playlists.map(playlist => {
                             return <option key = {playlist} value = {playlist}>{playlist}</option>
                     })}
                 </select>

         
                 <Button variant = "success" size = "sm" onClick = {this._addSong}>Add</Button>
                 <Button variant = "light"  size = "sm" onClick = {this._createNew}>Create New Playlist</Button>
                 <div className = "error">
                            {this.state.error ? <div>Playlist already contains this song.</div> : null}
                            
                    </div>
                 
            </div>
           );
    }
  
 }
}
export default withRouter(PopUp);
