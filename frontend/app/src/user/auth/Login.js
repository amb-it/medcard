import React, { Component } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

export default class Login extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {};
    }

    onInputChange = (e) => {
        const param = e.target.id;
        this.setState({[param]: e.target.value});
    };

    componentDidMount() {
        this.fakeAuth()
    }

    fakeAuth() {
        const user =  {
            _id: 9,
            email: "u@e.com",
            name: "Vladimir",
            tokens: [
                {
                    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjksImlhdCI6MTU3ODA2ODIwM30.PryspKwi2a3oY7uzSftR9v7fBCvqfn53wgG06sttD7A"
                }
            ]
        };
        this.props.authenticate(user);
        this.props.history.push('/');
    }

    loginUser = () => {
        const apiUrl =  process.env.REACT_APP_API_ADDRESS + '/user/login';

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
                    <div className="col-7 text-right">
                        <button
                            onClick={this.loginUser}
                            className="btn btn-success">Login</button>
                    </div>
                    <div className="col-5 text-right">
                        Or <NavLink to={"register"}>register</NavLink>
                    </div>
                </div>
            </div>
        );
    }
}