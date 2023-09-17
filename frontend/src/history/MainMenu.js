import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import MainMenuPatients from "./MainMenuPatients";
import {FormattedMessage} from "react-intl";

export default class MainMenu extends Component {
    render() {
        let menuClassName = 'container left_menu';

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
                            <li><NavLink to="/profile">
                                <FormattedMessage
                                    id="main.menu.profile"
                                    defaultMessage="Profile"
                                />
                            </NavLink></li>
                            <li><NavLink to="/history">
                                <FormattedMessage
                                    id="main.menu.history"
                                    defaultMessage="Medical history"
                                />
                            </NavLink></li>
                            <li><NavLink to="/share">
                                <FormattedMessage
                                    id="main.menu.share"
                                    defaultMessage="Share with doctor"
                                />
                            </NavLink></li>
                            <li><NavLink to="/settings">
                                <FormattedMessage
                                    id="main.menu.settings"
                                    defaultMessage="Settings"
                                />
                            </NavLink></li>
                            <li><NavLink to="/logout">
                                <FormattedMessage
                                    id="main.menu.log.out"
                                    defaultMessage="Log out"
                                />
                            </NavLink></li>
                        </ul>
                    </div>
                    :
                    <div>
                        <ul>
                            <li><NavLink to="/login">
                                <FormattedMessage
                                    id="main.menu.log.in"
                                    defaultMessage="Log in"
                                />
                            </NavLink></li>
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
            </div>
        );
    }
}