import React, { Component } from "react";

export default class MainMenu extends Component {
    render() {
        let menuClassName = 'left-menu';

        if (this.props.visible) {
            menuClassName += ' visible';
        }

        return (
            <div className={menuClassName}>
                <ul>
                    <li>Settings</li>
                    <li>Clinics</li>
                    <li>Share</li>
                    <li>About</li>
                </ul>
            </div>
        );
    }
}