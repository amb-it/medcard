import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export default class CardMenu extends Component {
    render() {
        let menuClassName = 'right_menu';
        const editUrl = this.props.card
            ? '/card/' + this.props.card._id + '/edit'
            : '';

        if (this.props.visible) {
            menuClassName += ' visible';
        }

        return (
            <div className={menuClassName}>
                <ul>
                    <li><NavLink to={editUrl}>Редактировать</NavLink></li>
                    <li onClick={this.props.deleteCard}>Удалить</li>
                </ul>
            </div>
        );
    }
}