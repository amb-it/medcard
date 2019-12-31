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
  }
  
  componentDidMount() {
    this.requestCardTypes();
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

          {/*<PrivateRoute path="/card/:id"*/}
          {/*              component={Card}*/}
          {/*              user={this.state.user}*/}
          {/*              card={console.log(location)}*/}
          {/*              loading={true}*/}
          {/*/>*/}

          <Route path="/card/:id"
                 render={(props) => (
                   // here {...props}  - throw all props from Route into Card .It is not needed. But I left it to remember how to do it
                   <Card {...props}
                         card={this.getCardById(props.match.params.id)}
                         loading={!this.getCardById(props.match.params.id)}
                   />)}/>


          <PrivateRoute path="/add-card"
                        component={AddCard}
                        user={this.state.user}
                        cardTypes={this.state.cardTypes}
                        requestCards={this.requestCards}
          />

        </ScrollToTop>
      </Router>
    );
  }
}