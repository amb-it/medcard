import React, { Component } from "react";
import {NavLink} from "react-router-dom";
import axios from "axios";

import config from "../config";
import Inputs from "./addCard/Inputs";
import Files from "./addCard/Files";

class AddCard extends Component {
    constructor(props, context) {
        super(props, context);

        this.inputs_tab_id = "inputs_tab";
        this.files_tab_id = "files_tab";

        this.state = {
            showTab: this.inputs_tab_id,
            newCard: {}
        };

        this.onInputChange = this.onInputChange.bind(this);
        this.onSubmitInputs = this.onSubmitInputs.bind(this);
    }

    onInputChange(e) {
        let newCard = this.state.newCard;
        newCard[e.target.id] = e.target.value;

        this.setState({newCard: newCard});
    }

    onSubmitInputs() {
        const apiUrl =  config.apiBaseUrl + '/card';
        const newCard = this.state.newCard;

        return axios.post(apiUrl, newCard)
            .then(response => {
                console.log("success")
            })
            .catch(error => {
                console.log(error);
            })
    }

    render() {
        return (
            <div className="container">
                <header>
                    <NavLink to="/" className="btn menu-button">
                        <span className="oi oi-x"></span>
                    </NavLink>
                    <span className="card-page-title">New card</span>
                    <NavLink to="/" className="btn menu-button float-right right-icon">
                        <span className="oi oi-check"></span>
                    </NavLink>

                    <hr/>
                </header>


                <div className="add_card_page">
                    <nav className="mb-5">
                        <div className="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
                            <button
                                onClick={() => {this.setState({showTab: this.inputs_tab_id})}}
                                id={this.inputs_tab_id}
                                className={this.state.showTab === this.inputs_tab_id ? "nav-item nav-link active" : "nav-item nav-link"}
                                data-toggle="tab" role="tab" aria-controls="nav-home" aria-selected="true">
                                Inputs
                            </button>
                            <button
                                onClick={() => {this.setState({showTab: this.files_tab_id})}}
                                id={this.files_tab_id}
                                className={this.state.showTab === this.files_tab_id ? "nav-item nav-link active" : "nav-item nav-link"}
                                data-toggle="tab" role="tab" aria-controls="nav-profile" aria-selected="false">
                                Files, pictures
                            </button>
                        </div>
                    </nav>

                    {(this.state.showTab === this.files_tab_id)
                        ? <Files onInputChange={this.onInputChange}/>
                        : <Inputs onInputChange={this.onInputChange}/>
                    }

                    <hr/>

                    <div className="row md-5">
                        <div className="col-6 text-center">
                            <NavLink to="/" className="btn btn-outline-danger menu-button">
                                Cancel
                            </NavLink>
                        </div>
                        <div className="col-6 text-center">
                            <button
                                onClick={this.onSubmitInputs}
                                className="btn btn-success">Save</button>
                        </div>
                    </div>

                    <hr/>
                </div>

            </div>
        );
    }
}

export default AddCard;