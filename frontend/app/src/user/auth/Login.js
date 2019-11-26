import React, { Component } from "react";
import axios from "axios";
import { NavLink, Redirect } from "react-router-dom";

export default class Login extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {};
    }

    onInputChange = (e) => {
        const param = e.target.id;
        this.setState({[param]: e.target.value});
    };

    registerUser = () => {
        const apiUrl =  process.env.REACT_APP_API_ADDRESS + '/user/login';

        axios.post(apiUrl, this.state)
            .then(response => {
                this.setState({redirectTo: "/"});
            })
            .catch(error => { console.log(error); })
    };

    renderRedirect = () => {
        if (this.state.redirectTo) {
            return <Redirect to={this.state.redirectTo} />
        }
    };

    render() {
        return (
            <div className="container auth">
                {this.renderRedirect()}

                <header>
                    <span className="logo">MedCard</span>
                </header>

                <h1>Login</h1>

                <div className="input-group mb-3">
                    <input
                        onChange={this.onInputChange}
                        id="email"
                        type="text" className="form-control" placeholder="email"/>
                </div>
                <div className="input-group mb-3">
                    <input
                        onChange={this.onInputChange}
                        id="password"
                        type="password" className="form-control" placeholder="password"/>
                </div>

                <div className="row register-button-box">
                    <div className="col-12 text-center">
                        <button
                            onClick={this.registerUser}
                            className="btn btn-success">Login</button>
                    </div>
                </div>
            </div>
        );
    }
}