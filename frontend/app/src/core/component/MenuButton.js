import React, { Component } from "react";

export default class MenuButton extends Component {

    render() {
        let classes = "oi menu_button ";

        classes += this.props.visibleMenu ?
            "oi-x" : "oi-menu";

        return (
            <span className={classes} onClick={this.props.handleClick} />
        );
    }
}
