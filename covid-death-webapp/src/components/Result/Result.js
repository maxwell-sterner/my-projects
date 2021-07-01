import React, { Component } from 'react';
import "./Result.css";
import {withRouter} from "react-router-dom";
import cases from '../../assets/images/cases.png'
import recovered from '../../assets/images/recovered.png'
import dead from '../../assets/images/dead.png'

class Result extends Component{
  constructor(){
    super();
    this.state = {
      error: false,
      cases: null,
      recovered: null,
      deaths: null
    }
    this._handleBack = this._handleBack.bind(this);
  }

  componentDidMount(){
      const url = `https://api.covid19api.com/total/country/${this.props.match.params.countryName}?from=2020-10-01T00:00:00Z&to=2020-10-31T00:00:00Z`;
      fetch(url)
      .then(response => response.json())
      .then(data =>{
        if(data.length === 0){
          this.setState({
            error:true
          })
        }
        else{
          this.setState({
            cases: data[data.length-1].Confirmed - data[0].Confirmed,
            recovered: data[data.length-1].Recovered - data[0].Recovered,
            deaths: data[data.length-1].Deaths - data[0].Deaths,
            error:false
          })
        }
        
      })
    
   
    
  }

  _handleBack(){
    window.location.href = "http://localhost:3000/";
  }
    render(){
      if(!this.state.error){
        return(
          <div className = "resultScreen">
            
                <h1>{this.props.match.params.countryName.toUpperCase()}</h1>
                <div className="flip-card">
                  <div className="flip-card-inner">
                    <div className="flip-card-front">
                      <img src={cases} alt="cases"/>
                    </div>
                      <div className="flip-card-back">
                        <h1>Cases: {this.state.cases}</h1>
                      </div>
                  </div>
                </div>
                <div className="flip-card">
                  <div className="flip-card-inner">
                    <div className="flip-card-front">
                      <img src={recovered} alt="cases"/>
                    </div>
                      <div className="flip-card-back">
                      <h1>Recovered: {this.state.recovered}</h1>
                      </div>
                  </div>
                </div>
                <div className="flip-card">
                  <div className="flip-card-inner">
                    <div className="flip-card-front">
                      <img src={dead} alt="cases"/>
                    </div>
                      <div className="flip-card-back">
                        <h1>Deaths: {this.state.deaths}</h1>
                      </div>
                  </div>
                </div>
               <div>
                  <button className="back" onClick = {this._handleBack}>BACK</button>
                </div>  
            </div>
            
        );
      }
      else{
        return(
          <div className = "resultScreen">
                <p>No information found on {this.props.match.params.countryName.toUpperCase()}.</p>

                <button onClick = {this._handleBack}>BACK</button>
        </div>
        );
      }
        
    }
}
export default withRouter(Result);