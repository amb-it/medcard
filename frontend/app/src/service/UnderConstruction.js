import React, { Component } from "react";

export default class UnderConstruction extends Component {

    render() {
        return (
            <div className="container under_construction_page">
                <header>
                    <span className="btn menu_button" onClick={this.props.history.goBack}>
                        <span className="oi oi-caret-left" title="icon name" aria-hidden="true" />
                    </span>
                    <hr/>
                </header>

                <div className="content">
                    <div className="logo">MedCard</div>
                    <h1>This feature is under construction...</h1>
                </div>
            </div>
        );
    }
}