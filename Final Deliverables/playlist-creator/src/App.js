import React, { Component } from 'react';
import './App.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import Home from "./components/Home/Home"
import SongDisplay from "./components/SongDisplay/SongDisplay"


class App extends Component{



  render(){ 
   
      return (
        <div className = "App"> 
          
          <Router>
            <Switch>
              <Route exact path = "/">
              
                <div className = "login">
                  <Card className = "card" bg = "light" style = {{}}>
                    <Card.Body>
                      <Card.Text className= "title">Playlist Creator</Card.Text>
                      <img className = "image" src = "https://jccdallas.org/wp-content/uploads/2020/06/Spotify-Play-Button.png" alt = "playbutton"/>
                      <Card.Text className = "author">Made by Maxwell Sterner</Card.Text>
                      <a href='http://localhost:8888'>
                        <Button variant="success">Log In with Spotify</Button>
                      </a>
                    </Card.Body>
                  </Card>
                  
                  
                
                  
                  
                </div>     

            
               
              </Route>

              <Route path = "/home/:accessToken">
                <Home/>
              </Route>

              <Route path = "/playlist/:playlistName/:userId/:accessToken">
                <SongDisplay/>
              </Route>
            
  
            </Switch>
          </Router>
        </div>
      );

  }
    
  
}
export default App;

