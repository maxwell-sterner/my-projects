import React, { Component } from 'react';
import "./Playlist.css";
import {withRouter} from "react-router-dom";
import DeletePopUp from "../../components/DeletePopUp/DeletePopUp";
import Button from 'react-bootstrap/Button';


class Playlist extends Component{
    constructor(){
        super();
    
        this.state = {
          count:0,
          clicked: false
        }
        this._openPlaylist = this._openPlaylist.bind(this);
    }

    componentDidMount(){
        
            fetch(`http://localhost:8888/songs/${this.props.userId}/${this.props.name}`)
            .then(response => response.json())
            .then(result =>{
               
                this.setState({
                    count:result.length
                  });
            })
            
      }
      
      togglePop = () => {
        this.setState({
         clicked: !this.state.clicked
        });
       };

    _openPlaylist(){
        window.location.href =`http://localhost:3000/playlist/${this.props.name}/${this.props.userId}/${this.props.accessToken}`;
    }


  
    render(){
        return(
            <div className = "playlist">
                    <div className = "head" onClick = {this._openPlaylist}>
                        {this.props.name}
                    </div>
                      
                    <div className = "body" onClick = {this._openPlaylist}>
                        Number of Songs: {this.state.count}
                    </div>
                             
                
             

                
                <div className = "removeButton">
                            <Button onClick = {this.togglePop} variant = "outline-dark" size = "sm">Remove</Button>
                            {this.state.clicked ? <DeletePopUp key = {this.props.songId} toggle={this.togglePop} playlistName = {this.props.name} songId = {this.props.songId} userId = {this.props.userId}
                            accessToken = {this.props.accessToken} type = "playlist"/> : null}
                            
                </div>
                
            </div>
        );
    }
}
export default withRouter(Playlist);