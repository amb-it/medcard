import React, {Component} from "react";

import MenuButton from "../core/component/MenuButton";
import MainMenu from "../history/MainMenu";
import axios from "axios";
import Logo from "../core/component/Logo";
import {FormattedMessage} from "react-intl";

export default class Share extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            visibleMainMenu: false,
            shareData: null
        };
    }

    componentDidMount() {
        this.requestSharaData();
    }

    requestSharaData = () => {
        const apiUrl =  process.env.REACT_APP_API_ADDRESS + '/user/share';
        const config = this.props.user.getAuthConfig();

        axios.post(apiUrl, null, config)
            .then(response => {
                this.setState({
                    shareData: response.data
                });
            })
            .catch(error => {console.log(error);})
    };

    onMenuButtonClick = () => {
        document.querySelector('html').style.overflow = !this.state.visibleMainMenu ? 'hidden' : 'auto';
        this.setState({visibleMainMenu: !this.state.visibleMainMenu});
    };

    componentWillUnmount() {
        document.querySelector('html').style.overflow = 'auto';
    }

    render() {
        let shareCode = '.. .. ..';

        if (this.state.shareData) {
            shareCode = this.state.shareData.code;
            shareCode = shareCode.slice(0,2) + ' ' + shareCode.slice(2,4) + ' ' + shareCode.slice(4,6);
        }

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

                <div className="show_to_doctor_page">
                    <h1>
                        <FormattedMessage id="share.show-to-doctor" defaultMessage="Show card to doctor" />
                        {/*Показать карточку врачу*/}
                    </h1>

                    <div>
                        <p className="must">
                            <FormattedMessage id="share.get-access" defaultMessage="In order to get access to your card doctor has to" />:
                            {/*Чтоб получить доступ к Вашей карточке врачу нужно:*/}
                        </p>
                        <p>
                            1. <FormattedMessage id="share.go-to-address" defaultMessage="go to address" />:
                            {/*1. перейти по адресу: */}
                            <span className="url float-right">medcard.plus</span>
                        </p>
                        <p>2. <FormattedMessage id="share.click" defaultMessage="click button" />
                            {/*нажать кнопку*/}
                            <span className="btn btn-outline-success float-right">
                                <FormattedMessage id="share.look-at-card" defaultMessage="look at patient card" />
                                {/*посмотреть карту пациента*/}
                            </span></p>
                        <br />
                        <p>
                            3. <FormattedMessage id="share.enter-data" defaultMessage="enter your data" />:
                            {/*3. ввести Ваши данные:*/}
                        </p>
                    </div>

                    <table className="table">
                        <tbody>
                        <tr>
                            <td>
                                <FormattedMessage id="share.your-id" defaultMessage="your ID" />
                                {/*Ваш id*/}
                            </td>
                            <td className="values">{this.props.user._id}</td>
                        </tr>
                        <tr>
                            <td>
                                <FormattedMessage id="share.access-code" defaultMessage="Access code" />
                                {/*Код доступа*/}
                            </td>
                            <td className="values">{shareCode}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}