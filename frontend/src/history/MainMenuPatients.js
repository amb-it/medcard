import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export default class MainMenuPatients extends Component {
    render() {
        return (
            <div>
                <div className="patients_title">
                    Пациенты
                </div>
                {
                    this.props.patients.map((patient, key) =>
                        <div key={key}>
                            <div className="user_data">
                                <span className="oi oi-person"/>
                                <b>{patient.profile.name}</b>
                            </div>
                            <ul>
                                <li><NavLink to={"/patient/"+patient._id+"/profile"}>Профиль</NavLink></li>
                                <li><NavLink to={"/patient/"+patient._id+"/history"}>Медицинская история</NavLink></li>
                            </ul>
                        </div>
                    )
                }
            </div>
        );
    }
}