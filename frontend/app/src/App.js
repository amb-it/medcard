import React, { Component } from "react";
import {
  Route,
  // NavLink,
  BrowserRouter as Router
} from "react-router-dom";
import axios from "axios";

// import './App.css';

import config from "./config";
import ScrollToTop from "./core/helper/ScrollToTop";

import Home from "./home/Home";
import Card from "./card/Card";
import AddCard from "./card/AddCard";


export default class App extends Component {
  constructor(props, context) {
    super(props, context);
    
    this.state = {
      cards: []
    };
  }
  
  componentDidMount() {
    this.requestCards();
  }
  
  updateCards = () => {
    this.requestCards();
  };
  
  getCardById = (id) => {
    for (const cardItem of this.state.cards) {
      if (cardItem._id === id) return cardItem;
    }
  };
  
  requestCards() {
    const apiUrl =  config.apiBaseUrl + '/cards';
    
    axios.get(apiUrl)
      .then(response => {
        this.setState({
          cards: response.data
        });
      })
      .catch(error => {
        console.log(error);
      })
  }
  
  render() {
    return (
      <Router>
        <ScrollToTop>
          
          <Route exact path="/"
                 render={(props) => (
                   <Home {...props}
                         cards={this.state.cards}
                   />)}/>
          <Route path="/card/:id"
                 render={(props) => (
                   <Card {...props}
                         card={this.getCardById(props.match.params.id)}
                         loading={!this.getCardById(props.match.params.id)}
                   />)}/>
          <Route path="/add-card"
                 render={(props) => (
                   <AddCard {...props}
                         cards={this.state.cards}
                         updateCards={this.updateCards}
                   />)}/>
        
        </ScrollToTop>
      </Router>
    );
  }
}