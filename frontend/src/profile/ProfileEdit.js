import React, {Component} from "react";
import {NavLink} from "react-router-dom";
import axios from "axios";
import {FormattedMessage} from "react-intl";

export default class ProfileEdit extends Component {
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

    onInputChange = (e) => {
        const profile = this.state.profile;

        profile[e.target.id] = e.target.value;
        this.setState({profile});
    }

    saveProfile = () => {
        const profile = this.state.profile;
        const apiUrl =  process.env.REACT_APP_API_ADDRESS + '/user/profile/save';
        const config = this.props.user.getAuthConfig();

        axios.post(apiUrl, profile, config)
            .then((response) => {

                this.props.history.push('/profile/');

            })
            .catch(error => { console.log(error); })
    };

    render() {
        const profile = this.state.profile;

        return (
            <div className='container'>
                <header>
                    <span className="menu_button_box">
                        <NavLink to="/profile">
                            <span className='oi oi-caret-left'/>
                        </NavLink>
                        <span className='page_title'>
                            <FormattedMessage
                                id="profile.edit.title"
                                defaultMessage="Edit profile"
                            />
                        </span>

                        {/*<button*/}
                        {/*    onClick={this.saveProfile}*/}
                        {/*    className='btn menu_button float-right right_icon'>*/}
                        {/*    <span className='oi oi-check'/>*/}
                        {/*</button>*/}
                    </span>

                    <hr/>
                </header>

                <div className='add_card_page'>
                    <div className="card_inputs">
                        <div className="input-group mb-3">
                            <input
                                onChange={this.onInputChange}
                                value={profile.name}
                                id="name"
                                type="text" className="form-control" />
                        </div>
                        <h2 className="badge badge-secondary">
                            <FormattedMessage
                                id="profile.birth-date"
                                defaultMessage="Birth date"
                            />
                        </h2>
                        <div className="input-group mb-3">
                            <input
                                onChange={this.onInputChange}
                                id="birthdate"
                                defaultValue={profile.birthdate}
                                type="date" className="form-control" />
                        </div>
                        <h2 className="badge badge-secondary">
                            <FormattedMessage
                                id="profile.edit.weight"
                                defaultMessage="Weight (kg)"
                            />
                        </h2>
                        <div className="input-group mb-3">
                            <input
                                onChange={this.onInputChange}
                                value={profile.weight}
                                id="weight"
                                type="number" className="form-control" />
                        </div>
                        <h2 className="badge badge-secondary">
                            <FormattedMessage
                                id="profile.edit.blood-rf"
                                defaultMessage="Blood group and Rhesus factor"
                            />
                        </h2>
                        <div className="input-group mb-3">
                            <input
                                onChange={this.onInputChange}
                                value={profile.blood}
                                id="blood"
                                type="text" className="form-control" />
                        </div>
                        <h2 className="badge badge-secondary">
                            <FormattedMessage
                                id="profile.chronic-diseases"
                                defaultMessage="Chronic diseases"
                            />
                        </h2>
                        <div className="input-group mb-3">
                            <textarea
                                onChange={this.onInputChange}
                                value={profile.chronics}
                                id="chronics"
                                rows="2" className="form-control" />
                        </div>
                        <h2 className="badge badge-secondary">
                            <FormattedMessage
                                id="profile.allergies"
                                defaultMessage="Allergies"
                            />
                        </h2>
                        <div className="input-group mb-3">
                            <textarea
                                onChange={this.onInputChange}
                                value={profile.allergies}
                                id="allergies"
                                rows="2" className="form-control" />
                        </div>
                        <h2 className="badge badge-secondary">
                            <FormattedMessage
                                id="profile.other"
                                defaultMessage="Other"
                            />
                        </h2>
                        <div className="input-group mb-3">
                            <textarea
                                onChange={this.onInputChange}
                                value={profile.other}
                                id="other"
                                rows="4" className="form-control" />
                        </div>
                    </div>

                    <hr/>

                    <div className='row md-5'>
                        <div className='col-6 text-center'>
                            <NavLink to='/profile' className='btn btn-outline-danger menu_button'>
                                <FormattedMessage
                                    id="common.cancel"
                                    defaultMessage="cancel"
                                />
                            </NavLink>
                        </div>
                        <div className='col-6 text-center'>
                            <button
                                onClick={this.saveProfile}
                                className='btn btn-success'>
                                <FormattedMessage
                                    id="common.save"
                                    defaultMessage="save"
                                />
                            </button>
                        </div>
                    </div>

                    <hr/>
                </div>

            </div>
        );
    }
}