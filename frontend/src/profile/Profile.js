import React, {Component} from "react";
import {NavLink} from "react-router-dom";

import MenuButton from "../core/component/MenuButton";
import MainMenu from "../history/MainMenu";
import Logo from "../core/component/Logo";

export default class Profile extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            visibleMainMenu: false,
        };

        this.props.requestProfile();
    }

    onMenuButtonClick = () => {
        document.querySelector('html').style.overflow = !this.state.visibleMainMenu ? 'hidden' : 'auto';
        this.setState({visibleMainMenu: !this.state.visibleMainMenu});
    };

    componentWillUnmount() {
        document.querySelector('html').style.overflow = 'auto';
    }

    getAge = () => {}

    render() {
        let profileUser = this.props.patient;
        if (!profileUser) {
            profileUser = this.props.user;
        }
        const profile = profileUser.profile;

        let age = profile.birthdate
            ? (new Date()).getFullYear() - profile.birthdate.substring(0,4)
            : null;

        return (
            <div className="container">
                <header>
                    <span className="menu_button_box">
                        <MenuButton
                            handleClick={this.onMenuButtonClick}
                            visibleMenu={this.state.visibleMainMenu}
                        />
                        <Logo />
                    </span>
                    <hr/>
                </header>

                <MainMenu
                    visible={this.state.visibleMainMenu}
                    user={this.props.user}
                    patients={this.props.patients}
                />

                <div className="profile_page">
                    {!this.props.patient ?
                        <div className="">
                            <button type="button" className="btn btn-light float-right edit_button">
                                <NavLink to="/profile/edit"><span><i className="oi oi-pencil"></i> редактировать </span></NavLink>
                            </button>
                        </div>
                    :
                        <div className="profile_title">
                            Данные пациента
                        </div>
                    }

                    <table className="table">
                        <thead>
                        <tr>
                            <td>ФИО</td>
                            <th>{profile.name}</th>
                        </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="title">Дата рождения: </td>
                                <td>{profile.birthdate}</td>
                            </tr>
                        <tr>
                            <td className="title">Возраст</td>
                            <td>{age ? age : ''}{ age ? ' года/лет' : '' }</td>
                        </tr>
                            <tr>
                                <td className="title">Вес</td>
                                <td>{profile.weight}{ profile.weight ? ' кг' : '' }</td>
                            </tr>
                            <tr>
                                <td className="title">Кровь:</td>
                                <td>{profile.blood}</td>
                            </tr>
                            <tr>
                                <td className="title">Хронические заболевания:</td>
                                <td>{profile.chronics}</td>
                            </tr>
                            <tr>
                                <td className="title">Аллергии:</td>
                                <td>{profile.allergies}</td>
                            </tr>
                            <tr>
                                <td className="title">Другое:</td>
                                <td>{profile.other}</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td className="title">email: </td>
                                <td>{profileUser.email}</td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}