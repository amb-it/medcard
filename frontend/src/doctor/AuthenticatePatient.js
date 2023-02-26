import React, {Component} from "react";

import axios from "axios";
import toastr from "toastr";
import Logo from "../core/component/Logo";
import {NavLink} from "react-router-dom";

export default class AuthenticatePatient extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {};
    }

    onInputChange = (e) => {
        const param = e.target.id;
        this.setState({[param]: e.target.value});
    };

    authenticatePatient = () => {
        const apiUrl =  process.env.REACT_APP_API_ADDRESS + '/user/' + this.state.user_id;

        axios.post(apiUrl, this.state)
            .then(response => {
                this.props.authenticatePatient(response.data);
                this.props.history.push('/patient/' + response.data._id + '/history');

            })
            .catch(error => {
                console.log(error);

                toastr.options = {
                    timeOut: 2000,
                    closeButton: true
                };
                toastr.error(error);
            })
    }

    render() {

        return (
            <div className="container">
                <header>
                    <span className="menu_button_box">
                        <NavLink to="/">
                            <span className='oi oi-caret-left'/>
                        </NavLink>
                        <Logo />
                    </span>
                </header>

                <div className="authenticate_patient_page">
                    <div className="input-group mb-3 title">
                        введите авторизационные&nbsp;данные&nbsp;пациента
                    </div>

                    <div className="input-group mb-3">
                        <input
                            onChange={this.onInputChange}
                            id="user_id"
                            type="string" className="form-control" placeholder="ID пациента" />

                    </div>

                    <div className="input-group mb-3">
                        <input
                            onChange={this.onInputChange}
                            id="code"
                            type="string" className="form-control" placeholder="код доступа" />
                    </div>

                    <div className='row md-5'>
                        <div className='col-6 text-center'> </div>
                        <div className='col-6 text-center'>
                            <button
                                onClick={this.authenticatePatient}
                                className='btn btn-success'>посмотреть карту</button>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}