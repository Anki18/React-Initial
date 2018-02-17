import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import LabelComponent from "./LabelComponent";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      origin: '',//GOWERTON ROAD, BRACKMILCO IND ESTATE
      destination: '',//Abington, NN
      originCoordinates: '',
      destinationCoordinates: '',
      travelDistance: ''
    };

    this.handleChange = this.handleChange.bind(this);// // This binding is necessary to make `this` work in the callback 
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    if (event.target.name === "origin") {
      this.setState({ origin: event.target.value });
    }
    if (event.target.name === "destination") {
      this.setState({ destination: event.target.value });
    }
  }
  handleSubmit(event) {
    this.fetchFromBing();
    event.preventDefault();
  }
  fetchFromBing() {
    axios.get('http://dev.virtualearth.net/REST/v1/Locations?query=' + this.state.origin + ',' + this.state.destination + '&includeNeighborhood=0&include=ciso2&key=--apikey--')
      .then(res => {
        this.setState({ originCoordinates: res.data.resourceSets["0"].resources["0"].point.coordinates.join() });
        this.setState({ destinationCoordinates: res.data.resourceSets["0"].resources[1].geocodePoints["0"].coordinates.join() });
        this.calculateDistance();
      });
  }
  calculateDistance() {
    axios.get('http://dev.virtualearth.net/REST/V1/Routes/Driving?o=json&wp.0=' + this.state.originCoordinates + '&wp.1=' + this.state.destinationCoordinates + '&avoid=minimizeTolls&key=--apikey-- ')
      .then(res => {
        this.setState({ travelDistance: res.data.resourceSets["0"].resources["0"].travelDistance });
      });
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          <form onSubmit={this.handleSubmit}>
            <LabelComponent labelName={"Origin"} propName={"origin"} onChange={this.handleChange} location={this.state.origin} /> <br />
            <LabelComponent labelName={"Destination"} propName={"destination"} onChange={this.handleChange} location={this.state.destination} />
            <input type="submit" value="Submit" />
          </form>
        </p>
        <p>
          <label> Origin Co-ordinates : {this.state.originCoordinates}</label><br />
          <label> Destination Co-ordinates : {this.state.destinationCoordinates}</label><br />
          <label> Travel Distance : {this.state.travelDistance}</label><br />
        </p>
      </div>
    );
  }
}

export default App;
