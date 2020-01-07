import React, { Component } from "react";
import {
  Route,
  BrowserRouter as Router
} from "react-router-dom";
import axios from "axios";

import ScrollToTop from "./core/helper/ScrollToTop";
import PrivateRoute from "./core/PrivateRoute";

import Register from "./user/auth/Register";
import Login from "./user/auth/Login";
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

    this.requestCards = this.requestCards.bind(this);
    this.requestCardTypes = this.requestCardTypes.bind(this);
    this.getCardById = this.getCardById.bind(this);
  }

  authenticate = (user) => {
    user.getAuthConfig = function() {
      return {
        headers: {
          Authorization: "Bearer " + this.tokens[this.tokens.length - 1].token
        }
      };
    };

    this.setState(
      { user: user }
    );
  };
  
  getCardById = (id) => {
    for (const cardItem of this.state.cards) {
      if (cardItem._id === +id) return cardItem;
    }
  };
  
  requestCards() {
    const apiUrl =  process.env.REACT_APP_API_ADDRESS + '/cards';
    const config = this.state.user.getAuthConfig();

    axios.get(apiUrl, config)
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

  deleteCard = (id) => {
    const apiUrl =  process.env.REACT_APP_API_ADDRESS + '/cards/' + id;
    const config = this.state.user.getAuthConfig();

    axios.delete(apiUrl, config)
        .then(response => {
          const cards = this.state.cards.filter(card => card._id !== id);
          this.setState({cards: cards});
        })
        .catch(error => {console.log(error);})
  };

  render() {
    return (
      <Router>
        <ScrollToTop>

          <Route path="/register"
                 render={() => (
                     <Register authenticate={this.authenticate} />)}/>

          <Route path="/login"
                 render={() => (
                     <Login authenticate={this.authenticate} />)}/>

          <PrivateRoute exact path="/"
                        component={Home}
                        user={this.state.user}
                        cards={this.state.cards}
                        requestCards={this.requestCards}
          />

          <PrivateRoute path="/card/:id"
                        component={Card}
                        user={this.state.user}
                        getCardById={this.getCardById}
                        deleteCard={this.deleteCard}
          />

          <PrivateRoute path="/add-card"
                        component={AddCard}
                        user={this.state.user}
                        cardTypes={this.state.cardTypes}
                        requestCardTypes={this.requestCardTypes}
                        requestCards={this.requestCards}
          />

        </ScrollToTop>
      </Router>
    );
  }
}