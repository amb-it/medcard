import React, { Component } from "react";
import {
    Route,
    // NavLink,
    BrowserRouter as Router
} from "react-router-dom";
// import { createStore } from "redux";
// import { Provider } from "react-redux";
// import { reducer } from "./redux/reducer";
import axios from "axios";

import config from "./config";

import Home from "./home/Home";
import Card from "./card/Card";

// let store = createStore(reducer);

export default class Main extends Component {
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
                <div className="container">
                    <Route exact path="/" render={(props) => (<Home {...props} cards={this.state.cards} />)}/>
                    <Route path="/card/:id" render={
                        (props) => (<Card {...props}
                                          card={this.state.cards[props.match.params.id]}
                                          loading={!this.state.cards[props.match.params.id]} />)
                    }/>
                </div>
            </Router>
        );
    }
}