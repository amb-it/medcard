import React, { Component } from "react";
import {
  Route,
  BrowserRouter as Router
} from "react-router-dom";
import axios from "axios";

import ScrollToTop from "./core/helper/ScrollToTop";

import Home from "./home/Home";
import Card from "./card/Card";
import AddCard from "./card/AddCard";


export default class App extends Component {
  constructor(props, context) {
    super(props, context);
    
    this.state = {
      cards: [],
      cardTypes: []
    };
  }
  
  componentDidMount() {
    this.requestCards();
    this.requestCardTypes();
  }
  
  updateCards = () => {
    this.requestCards();
  };
  
  getCardById = (id) => {
    for (const cardItem of this.state.cards) {
      if (cardItem._id === +id) return cardItem;
    }
  };
  
  requestCards() {
    const apiUrl =  process.env.REACT_APP_API_ADDRESS + '/cards';
    
    axios.get(apiUrl)
      .then(response => {
        this.setState({
          cards: response.data
        });
      })
      .catch(error => {console.log(error);})
  }
  
  requestCardTypes() {
    const apiUrl =  process.env.REACT_APP_API_ADDRESS + '/card-types';
  
    axios.get(apiUrl)
      .then(response => {
        this.setState({
          cardTypes: response.data
        });
      })
      .catch(error => {console.log(error);})
  }
  
  render() {
    return (
      <Router>
        <ScrollToTop>
          
          <Route exact path="/"
                 render={() => (
                   <Home cards={this.state.cards}
                   />)}/>
          <Route path="/card/:id"
                 render={(props) => (
                   // here {...props}  - throw all props from Route into Card .It is not needed. But I left it to remember how to do it
                   <Card {...props}
                         card={this.getCardById(props.match.params.id)}
                         loading={!this.getCardById(props.match.params.id)}
                   />)}/>
          <Route path="/add-card"
                 render={() => (
                   <AddCard cardTypes={this.state.cardTypes}
                            updateCards={this.updateCards}
                   />)}/>
        
        </ScrollToTop>
      </Router>
    );
  }
}