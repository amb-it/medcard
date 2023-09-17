import React, {Component} from "react";

import MenuButton from "../core/component/MenuButton";
import MainMenu from "../history/MainMenu";
import Logo from "../core/component/Logo";
import LangChooser from "../core/lang/LangChooser";

export default class Settings extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            visibleMainMenu: false,
        };
    }

    onMenuButtonClick = () => {
        document.querySelector('html').style.overflow = !this.state.visibleMainMenu ? 'hidden' : 'auto';
        this.setState({visibleMainMenu: !this.state.visibleMainMenu});
    };

    componentWillUnmount() {
        document.querySelector('html').style.overflow = 'auto';
    }

    render() {
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

                <div className="settings_page">
                    <div className="settings_title">Settings</div>
                    <table className="table">
                        <tbody>
                            <tr>
                                <td className="title">Language </td>
                                <td><LangChooser /></td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}