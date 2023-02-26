import React, { Component } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import toastr from "toastr";
import 'toastr/build/toastr.min.css'
import Logo from "../../core/component/Logo";

export default class Register extends Component {

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

    registerUser = () => {
        const apiUrl =  process.env.REACT_APP_API_ADDRESS + '/user/register';

        toastr.clear();

        axios.post(apiUrl, this.state)
            .then(response => {
                this.props.authenticate(response.data.user);
                this.props.history.push('/history');

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
                    <span className="menu_button_box">
                        <NavLink to="/login">
                            <span className='oi oi-caret-left'/>
                        </NavLink>
                        <Logo />
                    </span>
                </header>

                <h1>Зарегистрироваться</h1>

                <div className="input-group mb-3">
                    <input
                        onChange={this.onInputChange}
                        id="name"
                        type="text" className="form-control" placeholder="имя"/>
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
                        type="password" className="form-control" placeholder="пароль"/>
                </div>

                <div className="row register_button_box">
                    <div className="col-7 text-right">
                        <button
                            onClick={this.registerUser}
                            className="btn btn-success">Зарегистрировать</button>
                    </div>
                    <div className="col-5 text-right">
                        <small>или</small> &nbsp;
                        <NavLink to={"login"}>войти</NavLink>
                    </div>
                </div>
            </div>
        );
    }
}