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
                    <li onClick={this.props.deleteCard}>Delete</li>
                </ul>
            </div>
        );
    }
}