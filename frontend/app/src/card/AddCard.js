import React, { Component } from "react";
import {NavLink, Redirect} from "react-router-dom";
import axios from "axios";

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
    }
    
    onInputChange = (e) => {
        const newCard = this.state.newCard;
        newCard[e.target.id] = e.target.value;

        this.setState({newCard: newCard});
    };
    
    onSubmitInputs = () => {
        const apiUrl =  process.env.REACT_APP_API_ADDRESS + '/cards';
        const newCard = this.state.newCard;
        // newCard.date = (new Date()).toDateString();
        
        axios.post(apiUrl, newCard)
            .then(response => {
                this.props.updateCards();
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
            <div className="container">
                {this.renderRedirect()}
                <header>
                    <NavLink to="/" className="btn menu-button">
                        <span className="oi oi-x"></span>
                    </NavLink>
                    <span className="card-page-title">New card</span>
                    <button
                        onClick={this.onSubmitInputs}
                        className="btn menu-button float-right right-icon">
                        <span className="oi oi-check"></span>
                    </button>

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
                        : <Inputs
                            onInputChange={this.onInputChange}
                            cardTypes={this.props.cardTypes}
                            />
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