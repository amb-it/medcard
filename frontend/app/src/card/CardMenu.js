import React, { Component } from "react";

export default class CardMenu extends Component {
    render() {
        let menuClassName = 'right_menu';

        if (this.props.visible) {
            menuClassName += ' visible';
        }

        return (
            <div className={menuClassName}>
                <ul>
                    <li>Edit</li>
                    <li>Delete</li>
                </ul>
            </div>
        );
    }
}