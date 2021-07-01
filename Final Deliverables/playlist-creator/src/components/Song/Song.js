import React, { Component } from 'react';
import "./Song.css";
import {withRouter} from "react-router-dom";
import PopUp from "../../components/PopUp/PopUp";
import DeletePopUp from "../../components/DeletePopUp/DeletePopUp";
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';



class Song extends Component{

    constructor(){
        super();
        this.state = {
          name: null,
          artists: [],
          imageURL: null,
          previewURL:null,
          seen:false,
          clicked:false
        

                

        }
        this._onClick = this._onClick.bind(this);
      }

    componentDidMount(){
        
        const url = `https://api.spotify.com/v1/tracks/${this.props.songId}`;
        fetch(url, {
            method: 'GET',
            headers: new Headers({
                Authorization: `Bearer ${this.props.accessToken}`,
            })
        })
        .then(response => response.json())
        .then(result =>{
           
            let arr = []
            for(let i in result.artists){
                if(i < 3){
                    arr.push(result.artists[i].name)
                }
               
            }
            this.setState({
                name:result.name,
                artists:arr,
                imageURL: result.album.images[0].url,
                previewURL:result.preview_url
            })
           
           
            
        })
    }

    _onClick(event){
        window.open(this.state.previewURL)
    }

    togglePop = () => {
        this.setState({
         seen: !this.state.seen
        });
       };
    
       togglePop2 = () => {
        this.setState({
         clicked: !this.state.clicked
        });
       };


   
  
    render(){
        if(this.props.type === "search"){
            return(
               
               
                <div className = "song">   
                        <Image onClick = {this._onClick} src={this.state.imageURL} rounded />
                            <div onClick = {this._onClick}>
                                {this.state.name}
                            </div>
                           
                           <div onClick = {this._onClick}>
                               
                           {this.state.artists.map(artist => {
                            return <p key = {artist}>({artist})</p>
                            })}
                            
                           </div >
                        <div>
                        <Button onClick = {this.togglePop} variant = "success">Add</Button>
                            {this.state.seen ? <PopUp key = {this.props.songId} toggle={this.togglePop} songName = {this.state.name} artist = {this.state.artists[0]} playlists = {this.props.playlists} songId = {this.props.songId} userId = {this.props.userId}
                            accessToken = {this.props.accessToken}/> : null}
                        </div>
                      
                        
                </div>

            );

        }
        else{
            return(
                <div >   
                        <div className = "song" >
                            <Image onClick = {this._onClick} src={this.state.imageURL} rounded />
                            <div onClick = {this._onClick}>
                                {this.state.name}
                            </div>
                           
                           <div onClick = {this._onClick}>
                               
                           {this.state.artists.map(artist => {
                            return <p key = {artist}>({artist})</p>
                            })}
                            
                           </div >

                           <div>
                            <Button onClick = {this.togglePop2} variant = "outline-danger" size = "sm">Remove</Button>
                            {this.state.clicked ? <DeletePopUp key = {this.props.songId} toggle={this.togglePop2} playlistName = {this.props.playlistName} songId = {this.props.songId} userId = {this.props.userId}
                            accessToken = {this.props.accessToken}/> : null}
                            
                            </div>
                           
                        </div>
                        
                </div>

            );
            
        }


  
        

            
       

        
    }
}
export default withRouter(Song);