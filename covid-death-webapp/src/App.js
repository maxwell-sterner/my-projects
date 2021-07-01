import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import Result from "./components/Result/Result"

class App extends Component{

  constructor(){
    super();
    this.countryName = React.createRef();
    this.state = {
      countries: [],
    }
    this._handleGo = this._handleGo.bind(this);
  }

  
  componentDidMount(){
    fetch("https://api.covid19api.com/countries")
    .then(response =>response.json())
    .then(data =>{
     data = data.sort((a, b) =>a.Slug.localeCompare(b.Slug));

      this.setState({
        countries: data
      })
    
    })
  }
  _handleGo(){
    window.location.href = `/result/${this.countryName.current.value}`
  }

  render(){ 
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path = "/">
              <div className="header">
                <h1>October Covid Cases</h1>
                
              </div>
              <div className = "dropDownSection">
                <select className="select" ref = {this.countryName}>
                  {this.state.countries.map(country => {
                    return <option key = {country.Country} value = {country.Slug}>{country.Country}</option>
                  })}
                </select>
                <button className="go" onClick = {this._handleGo}>GO</button>
                <p>select a country</p>
              </div>
            </Route>
            <Route path = "/result/:countryName">
              <Result/>
            </Route>
          

          </Switch>
        </Router>
        
        

      </div>
    );
  }
  
}
export default App;

