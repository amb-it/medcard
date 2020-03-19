import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export default class MainMenu extends Component {
    render() {
        let menuClassName = 'left_menu';

        if (this.props.visible) {
            menuClassName += ' visible';
        }

        return (
            <div className={menuClassName}>
                <div className="user_data">
                    <span className="oi oi-person" />
                    <b>{this.props.user.name}</b>
                </div>
                <ul>
                    <li><NavLink to="/under-construction">My bio</NavLink></li>
                    <li><NavLink to="/under-construction">Settings</NavLink></li>
                    <li><NavLink to="/under-construction">Clinics</NavLink></li>
                    <li><NavLink to="/under-construction">Share</NavLink></li>
                    <li><NavLink to="/under-construction">About</NavLink></li>
                </ul>
            </div>
        );
    }
}