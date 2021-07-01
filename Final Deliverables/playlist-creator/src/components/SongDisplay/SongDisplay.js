import React, { Component } from 'react';
import "./SongDisplay.css";
import {withRouter} from "react-router-dom";
import Song from "../../components/Song/Song";
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'


class SongDisplay extends Component{

    constructor(){
        super();
        this.state = {
          songs: [],
          normal:[],
          byName:[],
          byArtist:[]
        
        }
        this._filter = this._filter.bind(this);
      }

    componentDidMount(){

        const url = `http://localhost:8888/songs/${this.props.match.params.userId}/${this.props.match.params.playlistName}`;
        fetch(url)
        .then(response => response.json())
        .then(result =>{
            
            let arr = [];
            for(let i in result){
                arr.push({
                    songId:result[i].songId,
                    name:result[i].name,
                    artist:result[i].artist
                })
            }
            this.setState({
                songs:arr,
                normal:arr
            })    
        })
    
    }

    _filter(type){
        

        if(type === "name"){
            let arr = this.state.songs.sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : -1)
            this.setState({
                songs:arr
            })
        }
        if(type === "artist"){
            let arr = this.state.songs.sort((a, b) => (a.artist.toLowerCase() > b.artist.toLowerCase()) ? 1 : -1)
            this.setState({
                songs:arr
            })
        }
    }

  
  
    render(){
      
        return(
            
            <div className = "home">

                <div className = "playlistHead">
                    {this.props.match.params.playlistName}
                </div>
            <div className = "topSection">
                <div id = "backButton">
                        <a  href={'http://localhost:3000/home/' + this.props.match.params.accessToken}>
                            <Button variant = "light">Back</Button>
                        </a>
                </div>
                <div className= "dropdown">
                    <DropdownButton title="Filter" variant = "secondary">
                            <Dropdown.Item onClick = {this._filter.bind(this, "name")}>By Song Name</Dropdown.Item>
                            <Dropdown.Item onClick = {this._filter.bind(this, "artist")}>By Artist Name</Dropdown.Item>
                    </DropdownButton>
                </div>

            </div>
            
                

                

            <div className = "box">
                    {this.state.songs.map(song => {
                            return <Song key = {song.songId} userId = {this.props.match.params.userId} songId = {song.songId} 
                            playlistName = {this.props.match.params.playlistName} accessToken = {this.props.match.params.accessToken} type = ""/>
                        })}
            </div>
                

                
               
            </div>
        );
    }
}
export default withRouter(SongDisplay);