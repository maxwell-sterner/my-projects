import React, { Component } from 'react';
import "./Home.css";
import Button from 'react-bootstrap/Button';
import {withRouter} from "react-router-dom";
import Playlist from "../../components/Playlist/Playlist";
import Song from "../../components/Song/Song";


class Home extends Component{
  constructor(){
    super();

    this.search = React.createRef();

    this.state = {
      name: null,
      playlists:[],
      userId: null,
      email: null,
      noResults: false,

      //searchResults
      songIds:[],
      enter:false,
      noPlaylists:false
    
    }
    this._keyPressed = this._keyPressed.bind(this);
    this._endSearch = this._endSearch.bind(this);
  }

  componentDidMount(){
    const url = `https://api.spotify.com/v1/me`;
    fetch(url, {
        method: 'GET',
        headers: new Headers({
            Authorization: `Bearer ${this.props.match.params.accessToken}`,
          })
    })
    .then(response => response.json())
    .then(result =>{
        this.setState({
            userId:result.id,
            email:result.email
        })
        fetch(`http://localhost:8888/playlists/${result.id}`)
        .then(response => response.json())
        .then(result2 =>{
            let arr = [];
            for(let i in result2)
                arr.push(result2[i]._id)


            if(arr.length === 0){
                this.setState({
                    noPlaylists:true
                });
            }
            else{
                this.setState({
                    noPlaylists:false
                });
                arr = arr.sort();
            }
           

            this.setState({
                playlists: arr
              });
        })
        this.setState({
            name:result.display_name,
            
        })
       
    })

  }

_keyPressed(event){
    if(event.key === "Enter" && this.search.current.value !== ''){
        this.setState({
            songIds:[]
        })
        let searchQuery = this.search.current.value.toLowerCase();
        searchQuery = searchQuery.replace(/ /g,"%20");

        const url = `https://api.spotify.com/v1/search?q=${searchQuery}&type=track`;
        fetch(url, {
            method: 'GET',
            headers: new Headers({
                Authorization: `Bearer ${this.props.match.params.accessToken}`,
            })
        })
        .then(response => response.json())
        .then(result =>{
        
            let arr = []
            for(let i in result.tracks.items){
                arr.push(result.tracks.items[i].id)
            }
          
            this.setState({
                songIds: arr
            });

        if(arr.length === 0){
            this.setState({
                noResults: true
            });
        }
        else{
            this.setState({
                noResults: false
            });
        }

            
        })
        this.setState({
            enter:true
        })
    
    }
}

_endSearch(event){
    this.setState({
        enter:false
    })
}


    render(){
        if(this.state.enter){
            return(
                <div>

               
                <div className = "home">

                    <div className = "search">
                    <img src = "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Vector_search_icon.svg/1200px-Vector_search_icon.svg.png" alt = "search icon"/>
                        <input type="text" id="searchBar" 
                        placeholder = "Search songs by name. . ."
                        ref = {this.search}
                        onKeyPress = {this._keyPressed}/>
                        <p>(Press 'Enter' to Search)</p>
                    </div>

                    <Button id = "close" variant = "light" onClick = {this._endSearch}>Close</Button>
    
                    <div>
                        {this.state.songIds.map(song => {
                            return <Song key= {song} songId ={song} accessToken = {this.props.match.params.accessToken} playlists = {this.state.playlists} 
                            userId = {this.state.userId} type = "search" />
                        })}
                        
                    </div>
                    <div className = "noPlaylists">
                            {this.state.noResults ? <div>No songs match your search criteria. Please try again.</div> : null}
                            
                    </div>
    
                
                
                </div>
                </div>
            );

        }
        else{
            return(
                <div className = "App">

              
                <div className = "home">
                    <a className = "logout" href= {`http://localhost:3000/`}>
                        <Button variant = "secondary">Log Out - {this.state.email} </Button>
                    </a>
                   
                    <div className = "header">
                        Welcome! {this.state.name}
                    </div>

    
    
                    <div className = "search">
                        <img src = "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Vector_search_icon.svg/1200px-Vector_search_icon.svg.png" alt = "search icon"/>
                        <input type="text" id="searchBar" 
                        placeholder = "Search songs by name. . ."
                        ref = {this.search}
                        onKeyPress = {this._keyPressed}/>
                         <p>(Press 'Enter' to Search)</p>
                    </div>
                    <div className = "playlistHeader">Your Playlists:</div>
                    <div className = "playlists">
                        {this.state.playlists.map(playlist => {
                            return <Playlist key= {playlist} name ={playlist} accessToken = {this.props.match.params.accessToken} userId = {this.state.userId}/>
                        })}
                    </div>
                    <div className = "noPlaylists">
                            {this.state.noPlaylists ? <div>Search for a song to create your first playlist!</div> : null}
                            
                    </div>
                
                </div>
                </div>
            );
        }
        
    }
}
export default withRouter(Home);