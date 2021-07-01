import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./DeletePopUp.css";
import Button from 'react-bootstrap/Button';


class DeletePopUp extends Component {
    constructor(){
        super();
        

        this.state = {

        }
        this._deleteSong = this._deleteSong.bind(this);
        this._deletePlaylist = this._deletePlaylist.bind(this);
    }
  handleClick = () => {
   this.props.toggle();
  
  };


  _deleteSong(){
    const url = `http://localhost:8888/delete`;

    const message = {
        userId: `${this.props.userId}`,
        songId: `${this.props.songId}`,
        playlist: `${this.props.playlistName}`

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
    window.location.href = `http://localhost:3000/playlist/${this.props.playlistName}/${this.props.userId}/${this.props.accessToken}`

  }

  _deletePlaylist(){
    const url = `http://localhost:8888/deletePlaylist`;

    const message = {
        userId: `${this.props.userId}`,
        playlist: `${this.props.playlistName}`
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
    window.location.href = `http://localhost:3000/home/${this.props.accessToken}`
  }



  
render() {
        if(this.props.type === "playlist"){
            return (
                <div className = "playlistDelete">
                  
                 
                  <div>Are you sure you want to delete the entire Playlist?</div>
                  <Button variant = "danger" onClick = {this._deletePlaylist}>Yes</Button>
                     
                </div>
               );

        }
        else{
            return (
                <div >
                  
                  <Button variant = "dark" className="close" onClick={this.handleClick}>X</Button>
                  <div>Are you sure you want to remove song from Playlist?</div>
                  <Button variant = "danger" onClick = {this._deleteSong}>Yes</Button>
                     
                </div>
               );
        }
        
    
  
 }
}
export default withRouter(DeletePopUp);