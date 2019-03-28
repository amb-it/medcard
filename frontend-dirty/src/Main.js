import React, { Component } from "react";
import {
    Route,
    NavLink,
    BrowserRouter as Router
} from "react-router-dom";
import Home from "./home/Home";
import Card from "./card/Card";

export default class Main extends Component {
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