import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import MainMenuPatients from "./MainMenuPatients";

export default class MainMenu extends Component {
    render() {
        let menuClassName = 'left_menu';

        if (this.props.visible) {
            menuClassName += ' visible';
        }

        return (
            <div className={menuClassName}>
                {this.props.user ?
                    <div>
                        <div className="user_data">
                            <span className="oi oi-person"/>
                            <b>{this.props.user.profile.name}</b>
                        </div>
                        <ul>
                            <li><NavLink to="/profile">Профиль</NavLink></li>
                            <li><NavLink to="/history">Медицинская история</NavLink></li>
                            <li><NavLink to="/show-to-doctor">Показать карту врачу</NavLink></li>
                            <li><NavLink to="/logout">Выйти</NavLink></li>
                        </ul>
                    </div>
                    :
                    <div>
                        <ul>
                            <li><NavLink to="/login">Войти в аккаунт</NavLink></li>
                        </ul>
                    </div>
                }
                {this.props.patients ?
                    <MainMenuPatients
                        patients={this.props.patients}
                    />
                    :
                    ''
                }


                        {/*<div className="user_data">*/}
                        {/*    <b>Пациенты:</b>*/}
                        {/*</div>*/}
                        {/*<div className="user_data">*/}
                        {/*    <span className="oi oi-person" />*/}
                        {/*    ID {this.props.user._id}. Прокопенко Олександр*/}
                        {/*</div>*/}
                        {/*<ul>*/}
                        {/*    <li><NavLink to="/profile">Профиль</NavLink></li>*/}
                        {/*    <li><NavLink to="/history">Медицинская история</NavLink></li>*/}
                        {/*</ul>*/}


                {/*<hr/>*/}
            </div>
        );
    }
}