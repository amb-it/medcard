import React, { Component } from "react";
import {NavLink} from "react-router-dom";

export default class Logo extends Component {
    render() {
        return (
            <span className="logo_box">
                <NavLink to="/">
                    <span className="logo">
                        MedCard
                        <span className="oi oi-medical-cross" title="icon name" aria-hidden="true" />
                    </span>
                </NavLink>
            </span>
        );
    }
}
