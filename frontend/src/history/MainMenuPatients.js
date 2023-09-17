import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import {FormattedMessage} from "react-intl";

export default class MainMenuPatients extends Component {
    render() {
        return (
            <div>
                <div className="patients_title">
                    <FormattedMessage
                        id="main.menu.patients.title"
                        defaultMessage="Patients"
                    />
                </div>
                {
                    this.props.patients.map((patient, key) =>
                        <div key={key}>
                            <div className="user_data">
                                <span className="oi oi-person"/>
                                <b>{patient.profile.name}</b>
                            </div>
                            <ul>
                                <li><NavLink to={"/patient/"+patient._id+"/profile"}>
                                    <FormattedMessage
                                        id="main.menu.profile"
                                        defaultMessage="Profile"
                                    />
                                </NavLink></li>
                                <li><NavLink to={"/patient/"+patient._id+"/history"}>
                                    <FormattedMessage
                                        id="main.menu.history"
                                        defaultMessage="Medical history"
                                    />
                                </NavLink></li>
                            </ul>
                        </div>
                    )
                }
            </div>
        );
    }
}