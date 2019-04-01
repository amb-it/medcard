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
// import MockedCards from "./mocks/MockedCards";
import RequestService from "./request/RequestService";

import Home from "./home/Home";
import Card from "./card/Card";

// let store = createStore(reducer);

export default class Main extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {};
    }

    componentDidMount() {
        // let mockedCardsService = new MockedCards();
        let requestService = new RequestService();
        // let cards = mockedCardsService.getCards();
        let cards = requestService.getCards();
        console.log(cards);

        const apiUrl = 'https://reqres.in/api/users';

        return axios.get(apiUrl)
            .then(response => {
                this.setState({
                    users: response.data
                })
            })
            .catch(error => {
                console.log(error);
            })
    }

    render() {
        return (
            <Router>
                <div className="container">
                    <Route exact path="/" component={Home}/>
                    <Route path="/card/:id" component={Card}/>
                </div>
            </Router>
        );
    }
}