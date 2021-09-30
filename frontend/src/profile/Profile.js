import React, {Component} from "react";
import {NavLink} from "react-router-dom";

import MenuButton from "../core/component/MenuButton";
import MainMenu from "../home/MainMenu";
import axios from "axios";

export default class Profile extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            visibleMainMenu: false,
            profile: this.props.user.profile
        };
    }

    componentDidMount() {
        this.requestProfile();
    }

    requestProfile = () => {
        const apiUrl =  process.env.REACT_APP_API_ADDRESS + '/user/profile';
        const config = this.props.user.getAuthConfig();

        axios.get(apiUrl, config)
            .then(response => {
                this.setState({
                    profile: response.data.profile
                });

            })
            .catch(error => {console.log(error);})
    };

    onMenuButtonClick = () => {
        this.setState({visibleMainMenu: !this.state.visibleMainMenu});
    };

    getAge = (bd) => {}

    render() {
        const profile = this.state.profile;

        let age = profile.birthdate
            ? (new Date()).getFullYear() - profile.birthdate.substring(0,4)
            : null;

        // if (profile.birthdate) {
        //     console.log(parseInt((new Date()).getFullYear()));
        //     console.log(parseInt(profile.birthdate.substring(0,4)));
        //     console.log(parseInt((new Date()).getFullYear()) - parseInt(profile.birthdate.substring(0,4)));
        // }

        return (
            <div className="container">
                <header>
                    <span className="btn menu_button_box">
                        <MenuButton
                            handleClick={this.onMenuButtonClick}
                            visibleMenu={this.state.visibleMainMenu}
                        />
                        <span className="logo">
                            <span className="oi oi-medical-cross" title="icon name" aria-hidden="true" />
                            MedCard
                        </span>
                    </span>
                    <hr/>
                </header>

                <MainMenu
                    visible={this.state.visibleMainMenu}
                    user={this.props.user}
                />

                <div className="profile_page">
                    <div className="">
                        <button type="button" className="btn btn-light float-right edit_button">
                            <NavLink to="/profile/edit"><span><i className="oi oi-pencil"></i> редактировать </span></NavLink>
                        </button>
                    </div>

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
                                <td>{this.props.user.email}</td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}