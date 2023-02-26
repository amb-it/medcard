import React, { Component } from "react";

import Logo from "../core/component/Logo";

export default class UnderConstruction extends Component {

    render() {
        return (
            <div className="container under_construction_page">
                <header>
                    <span className="btn menu_button menu_button_box" onClick={this.props.history.goBack}>
                        <span className="oi oi-caret-left" title="icon name" aria-hidden="true" />
                        <Logo/>
                    </span>
                    <hr/>
                </header>

                <div className="content">
                    <h1>Функционал в разработке...</h1>
                </div>
            </div>
        );
    }
}