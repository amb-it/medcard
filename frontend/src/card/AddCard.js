import React, { Component } from "react";
import {NavLink} from "react-router-dom";

import Inputs from "./addCard/Inputs";
import Files from "./addCard/Files";

class AddCard extends Component {
    constructor(props, context) {
        super(props, context);

        this.inputs = "inputs_tab";
        this.files = "files_tab";

        this.state = {
            showTab: this.inputs
        };
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
                                onClick={() => {this.setState({showTab: this.inputs})}}
                                id={this.inputs}
                                className={this.state.showTab === this.inputs ? "nav-item nav-link active" : "nav-item nav-link"}
                                data-toggle="tab" role="tab" aria-controls="nav-home" aria-selected="true">
                                Inputs
                            </button>
                            <button
                                onClick={() => {this.setState({showTab: this.files})}}
                                id={this.files}
                                className={this.state.showTab === this.files ? "nav-item nav-link active" : "nav-item nav-link"}
                                data-toggle="tab" role="tab" aria-controls="nav-profile" aria-selected="false">
                                Files, pictures
                            </button>
                        </div>
                    </nav>

                    {(this.state.showTab === this.files) ? <Files/> : <Inputs/>}

                    <hr/>

                    <div className="row md-5">
                        <div className="col-6 text-center">
                            <NavLink to="/" className="btn btn-outline-danger menu-button">
                                Cancel
                            </NavLink>
                        </div>
                        <div className="col-6 text-center">
                            <button className="btn btn-success">Save</button>
                        </div>
                    </div>

                    <hr/>
                </div>

            </div>
        );
    }
}

export default AddCard;