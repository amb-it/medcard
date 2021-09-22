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

    render() {
        // this.requestProfile();
        const profile = this.state.profile;
        // let profile = this.props.user.profile;

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
                        {/*<tr>*/}
                        {/*    <td className="title">Возраст (лет)</td>*/}
                        {/*    <td>33</td>*/}
                        {/*</tr>*/}
                            <tr>
                                <td className="title">Вес (кг)</td>
                                <td>{profile.weight}</td>
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

                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}