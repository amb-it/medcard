import React, { Component } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import toastr from 'toastr';
import 'toastr/build/toastr.min.css'

export default class Login extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {};

        if (this.props.authenticated) {
            this.props.history.push('/');
        }
    }

    onInputChange = (e) => {
        const param = e.target.id;
        this.setState({[param]: e.target.value});
    };

    componentDidMount() {
        if (process.env.REACT_APP_FAKE_AUTH === true) {
            this.fakeAuth()
        }
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

        toastr.clear();

        axios.post(apiUrl, this.state)
            .then(response => {
                this.props.authenticate(response.data.user);
                this.props.history.push('/');

            })
            .catch(error => {
                console.log(error);

                toastr.options = {
                    timeOut: 2000,
                    closeButton: true
                };
                toastr.error(error.response.data);
            })
    };

    render() {
        return (
            <div className="container auth_pages">
                <header>
                    <span className="logo">
                        <span className="oi oi-medical-cross" title="icon name" aria-hidden="true" />
                        MedCard
                    </span>
                </header>

                <h1>Войти</h1>

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
                        type="password" className="form-control" placeholder="пароль"/>
                </div>

                <div className="row register_button_box">
                    <div className="col-7 text-right">
                        <button
                            onClick={this.loginUser}
                            className="btn btn-success">Войти</button>
                    </div>
                    <div className="col-5 text-right">
                        <small>или</small> &nbsp;
                        <NavLink to={"register"}>зарегистрировать</NavLink>
                    </div>
                </div>
            </div>
        );
    }
}