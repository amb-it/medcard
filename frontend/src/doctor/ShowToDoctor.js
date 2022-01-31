import React, {Component} from "react";
import {NavLink} from "react-router-dom";

import MenuButton from "../core/component/MenuButton";
import MainMenu from "../home/MainMenu";
import axios from "axios";

export default class ShowToDoctor extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            visibleMainMenu: false,
            profile: this.props.user.profile
        };
    }

    // componentDidMount() {
    //     this.requestProfile();
    // }

    onMenuButtonClick = () => {
        this.setState({visibleMainMenu: !this.state.visibleMainMenu});
    };

    render() {

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

                <div className="show_to_doctor_page">
                    <h1>Показать карточку врачу </h1>

                    <div>
                        <p className="must">Чтоб получить доступ к Вашей карточке врачу нужно:</p>
                        <p>1. перейти по адресу:
                            <span className="float-right">
                                <b>medcard.amb.in.ua</b>
                            </span>
                        </p>
                        <p>2. нажать кнопку <br/><button className="btn btn-outline-success float-right">посмотреть карту пациента</button></p>
                        <br />
                        <p>3. ввести Ваши данные:</p>
                    </div>

                    <table className="table">
                        <tbody>
                        <tr>
                            <td>Ваш id</td>
                            <td className="values">13</td>
                        </tr>
                        <tr>
                            <td>Код доступа</td>
                            <td className="values">35 67 29</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}