import React, { Component } from "react";

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
                    <li>My bio</li>
                    <li>Settings</li>
                    <li>Clinics</li>
                    <li>Share</li>
                    <li>About</li>
                </ul>
            </div>
        );
    }
}