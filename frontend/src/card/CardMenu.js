import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export default class CardMenu extends Component {
    render() {
        let menuClassName = 'right_menu';

        if (this.props.visible) {
            menuClassName += ' visible';
        }

        return (
            <div className={menuClassName}>
                <ul>
                    <li><NavLink to="/under-construction">Редактировать</NavLink></li>
                    <li><NavLink to="/under-construction">Удалить</NavLink></li>
                    {/*<li onClick={this.props.deleteCard}>Delete</li>*/}
                </ul>
            </div>
        );
    }
}