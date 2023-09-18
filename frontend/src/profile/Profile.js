import React, {Component} from "react";
import {NavLink} from "react-router-dom";

import MenuButton from "../core/component/MenuButton";
import MainMenu from "../history/MainMenu";
import Logo from "../core/component/Logo";
import {FormattedMessage} from "react-intl";

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
                        <NavLink to="/profile/edit" className="btn btn-light float-right edit_button">
                            <span><i className="oi oi-pencil"></i>
                                <FormattedMessage
                                    id="common.edit"
                                    defaultMessage="edit"
                                />
                            </span>
                        </NavLink>
                    :
                        <div className="profile_title">
                            <FormattedMessage
                                id="profile.patient-data"
                                defaultMessage="Patient data"
                            />
                        </div>
                    }

                    <table className="table">
                        <thead>
                        <tr>
                            <td>
                                <FormattedMessage
                                    id="profile.full-name"
                                    defaultMessage="Full name"
                                />
                            </td>
                            <th>{profile.name}</th>
                        </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="title">
                                    <FormattedMessage
                                        id="profile.birth-date"
                                        defaultMessage="Birth date"
                                    />
                                    :
                                </td>
                                <td>{profile.birthdate}</td>
                            </tr>
                            <tr>
                                <td className="title">
                                    <FormattedMessage
                                        id="profile.age"
                                        defaultMessage="Age"
                                    />
                                </td>
                                <td>{age ? age : ''}{ age ? <FormattedMessage id="profile.years" defaultMessage=" years"/> : '' }</td>
                            </tr>
                            <tr>
                                <td className="title">
                                    <FormattedMessage
                                        id="profile.weight"
                                        defaultMessage="Weight"
                                    />
                                </td>
                                <td>{profile.weight}{ profile.weight ? <FormattedMessage id="profile.kg" defaultMessage=" kg"/> : '' }</td>
                            </tr>
                            <tr>
                                <td className="title">
                                    <FormattedMessage
                                        id="profile.blood"
                                        defaultMessage="Blood"
                                    />:
                                </td>
                                <td>{profile.blood}</td>
                            </tr>
                            <tr>
                                <td className="title">
                                    <FormattedMessage
                                        id="profile.chronic-diseases"
                                        defaultMessage="Chronic diseases"
                                    />:
                                </td>
                                <td>{profile.chronics}</td>
                            </tr>
                            <tr>
                                <td className="title">
                                    <FormattedMessage
                                        id="profile.allergies"
                                        defaultMessage="Allergies"
                                    />:</td>
                                <td>{profile.allergies}</td>
                            </tr>
                            <tr>
                                <td className="title">
                                    <FormattedMessage
                                        id="profile.other"
                                        defaultMessage="Other"
                                    />:
                                </td>
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