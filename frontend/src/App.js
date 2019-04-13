import React, { Component } from "react";
import {
  Route,
  // NavLink,
  BrowserRouter as Router
} from "react-router-dom";
import axios from "axios";

// import { createStore } from "redux";
// import { Provider } from "react-redux";
// import { reducer } from "./redux/reducer";

import config from "./config";
import ScrollToTop from "./core/helper/ScrollToTop";

import Home from "./home/Home";
import Card from "./card/Card";
import AddCard from "./card/AddCard";

// let store = createStore(reducer);

export default class App extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      cards: []
    };
  }

  componentDidMount() {

    const apiUrl =  config.apiBaseUrl + '/cards';

    return axios.get(apiUrl)
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

                <Route exact path="/" render={(props) => (<Home {...props} cards={this.state.cards} />)}/>
                <Route path="/card/:id" render={
                  (props) => (<Card {...props}
                                    card={this.state.cards[props.match.params.id]}
                                    loading={!this.state.cards[props.match.params.id]} />)
                }/>
                <Route path="/add-card" render={(props) => (<AddCard {...props} cards={this.state.cards} />)}/>

            </ScrollToTop>
        </Router>
    );
  }
}