import React, {Component} from "react";
import {NavLink} from "react-router-dom";
import axios from "axios";

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
                    <NavLink to="/profile" className='btn menu_button'>
                        <span className='oi oi-x'/>
                    </NavLink>
                    <span className='card_page_title'>Редактировать профиль</span>
                    {/*<button*/}
                    {/*    onClick={this.saveProfile}*/}
                    {/*    className='btn menu_button float-right right_icon'>*/}
                    {/*    <span className='oi oi-check'/>*/}
                    {/*</button>*/}

                    <hr/>
                </header>

                <div className='add_card_page'>
                    <div className="card_inputs">
                        <div className="input-group mb-3">
                            <input
                                onChange={this.onInputChange}
                                value={profile.name}
                                id="name"
                                type="text" className="form-control" placeholder="ФИО" />
                        </div>
                        <h2 className="badge badge-secondary">
                            дата рождения
                        </h2>
                        <div className="input-group mb-3">
                            <input
                                onChange={this.onInputChange}
                                id="birthdate"
                                defaultValue={profile.birthdate}
                                type="date" className="form-control" placeholder="дата" />
                        </div>
                        <h2 className="badge badge-secondary">
                            вес (кг)
                        </h2>
                        <div className="input-group mb-3">
                            <input
                                onChange={this.onInputChange}
                                value={profile.weight}
                                id="weight"
                                type="number" className="form-control" placeholder="вес (кг)" />
                        </div>
                        <h2 className="badge badge-secondary">
                            {/*<span className="oi oi-home" title="icon name" aria-hidden="true" />*/}
                            Группа крови и резус фактор
                        </h2>
                        <div className="input-group mb-3">
                            <input
                                onChange={this.onInputChange}
                                value={profile.blood}
                                id="blood"
                                type="text" className="form-control" placeholder="Группа крови и резус фактор" />
                        </div>
                        <h2 className="badge badge-secondary">
                            Хронические заболевания
                        </h2>
                        <div className="input-group mb-3">
                            <textarea
                                onChange={this.onInputChange}
                                value={profile.chronics}
                                id="chronics"
                                rows="2" className="form-control" placeholder="Хронические заболевания" />
                        </div>
                        <h2 className="badge badge-secondary">
                            Аллергии
                        </h2>
                        <div className="input-group mb-3">
                            <textarea
                                onChange={this.onInputChange}
                                value={profile.allergies}
                                id="allergies"
                                rows="2" className="form-control" placeholder="Аллергия" />
                        </div>
                        <h2 className="badge badge-secondary">
                            Другое
                        </h2>
                        <div className="input-group mb-3">
                            <textarea
                                onChange={this.onInputChange}
                                value={profile.other}
                                id="other"
                                rows="4" className="form-control" placeholder="Другое" />
                        </div>
                    </div>

                    <hr/>

                    <div className='row md-5'>
                        <div className='col-6 text-center'>
                            <NavLink to='/profile' className='btn btn-outline-danger menu_button'>
                                отмена
                            </NavLink>
                        </div>
                        <div className='col-6 text-center'>
                            <button
                                onClick={this.saveProfile}
                                // disabled={!this.state.editCard}
                                className='btn btn-success'>сохранить</button>
                        </div>
                    </div>

                    <hr/>
                </div>

            </div>
        );
    }
}