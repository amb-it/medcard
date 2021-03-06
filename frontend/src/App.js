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
import Logout from "./user/auth/Logout";
import UnderConstruction from "./service/UnderConstruction";
import Home from "./home/Home";
import Card from "./card/Card";
import AddCard from "./card/addCard/AddCard";
import EditCard from "./card/editCard/EditCard";


export default class App extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            cards: [],
            cardTypes: [],
            tags: [],
            user: this.authenticateFromStorage()
        };

        axios.defaults.headers.common['Cache-Control'] = 'no-cache';
    }

    authenticateFromStorage = () => {
        let user = localStorage.getItem('currentUser');

        if (user) {
            user = JSON.parse(user);
            user = this.initializeUser(user);
        }

        return user;
    };

    initializeUser(user) {
        user.getAuthConfig = function() {
            return {headers: {Authorization: "Bearer " + this.tokens[this.tokens.length - 1].token}};
        };

        return user;
    }

    authenticate = (user) => {
        localStorage.setItem('currentUser', JSON.stringify(user));

        user = this.initializeUser(user);

        this.setState(
           { user }
        );
    };

    logout = () => {
        localStorage.removeItem('currentUser');

        this.setState({user: null});
    };

    requestCards = () => {
        const apiUrl =  process.env.REACT_APP_API_ADDRESS + '/cards';
        const config = this.state.user.getAuthConfig();

        axios.get(apiUrl, config)
            .then(response => {
                this.setState({
                    cards: response.data
                });
            })
          .catch(error => {console.log(error);})
    };

    requestCardTypes = () => {
        const apiUrl =  process.env.REACT_APP_API_ADDRESS + '/card-types';

        axios.get(apiUrl)
            .then(response => {
                this.setState({
                    cardTypes: response.data
                });
            })
            .catch(error => {console.log(error);})
    };

    requestTags = () => {
        const apiUrl =  process.env.REACT_APP_API_ADDRESS + '/tags';
        const config = this.state.user.getAuthConfig();

        axios.get(apiUrl, config)
            .then(response => {
                this.setState({
                    tags: response.data
                });
            })
            .catch(error => {console.log(error);})
    };

    deleteCard = (id) => {
        const apiUrl =  process.env.REACT_APP_API_ADDRESS + '/cards/' + id;
        const config = this.state.user.getAuthConfig();

        axios.delete(apiUrl, config)
            .then(response => {
                const cards = this.state.cards.filter(card => card._id !== id);
                this.setState({cards});
            })
            .catch(error => {console.log(error);})
    };

    render() {
        return (
            <Router>
                <ScrollToTop>

                    <Route path="/register"
                           render={(props) => (
                               <Register {...props}
                                         authenticate={this.authenticate}
                                         authenticated={!!this.state.user}
                               />)}/>

                    <Route path="/login"
                           render={(props) => (
                               <Login {...props}
                                      authenticate={this.authenticate}
                                      authenticated={!!this.state.user}
                               />)}/>

                    <Route path="/logout"
                           render={(props) => (
                               <Logout {...props}
                                   logout={this.logout}
                               />)}/>

                    <Route path="/under-construction"
                           render={(props) => (
                               <UnderConstruction {...props} />)}/>

                    <PrivateRoute exact path="/"
                                  component={Home}
                                  user={this.state.user}
                                  cards={this.state.cards}
                                  requestCards={this.requestCards}
                    />

                    <PrivateRoute exact path="/card/:id"
                                  component={Card}
                                  user={this.state.user}
                                  cards={this.state.cards}
                                  requestCards={this.requestCards}
                                  deleteCard={this.deleteCard}
                    />

                    <PrivateRoute exact path="/card/:id/edit"
                                  component={EditCard}
                                  user={this.state.user}
                                  cards={this.state.cards}
                                  cardTypes={this.state.cardTypes}
                                  tags={this.state.tags}
                                  requestCardTypes={this.requestCardTypes}
                                  requestTags={this.requestTags}
                                  requestCards={this.requestCards}
                    />

                    <PrivateRoute path="/add-card"
                                  component={AddCard}
                                  user={this.state.user}
                                  cardTypes={this.state.cardTypes}
                                  tags={this.state.tags}
                                  requestCardTypes={this.requestCardTypes}
                                  requestTags={this.requestTags}
                                  requestCards={this.requestCards}
                    />

                </ScrollToTop>
            </Router>
        );
    }
}