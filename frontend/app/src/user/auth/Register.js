import React, { Component } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

export default class Register extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {};
    }

    onInputChange = (e) => {
        const param = e.target.id;
        this.setState({[param]: e.target.value});
    };

    registerUser = () => {
        const apiUrl =  process.env.REACT_APP_API_ADDRESS + '/user/register';

        axios.post(apiUrl, this.state)
            .then(response => {
                this.props.authenticate(response.data.user);
                this.props.history.push('/');

            })
            .catch(error => { console.log(error); })
    };

    render() {
        return (
            <div className="container auth_pages">
                <header>
                    <span className="logo">MedCard</span>
                </header>

                <h1>Register new user</h1>

                <div className="input-group mb-3">
                    <input
                        onChange={this.onInputChange}
                        id="name"
                        type="text" className="form-control" placeholder="name"/>
                </div>
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

                <div className="row register_button_box">
                    <div className="col-7 text-right">
                        <button
                            onClick={this.registerUser}
                            className="btn btn-success">Register</button>
                    </div>
                    <div className="col-5 text-right">
                        Or &nbsp;
                        <NavLink to={"login"}>login</NavLink>
                    </div>
                </div>
            </div>
        );
    }
}