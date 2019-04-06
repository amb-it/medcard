import React, { Component } from "react";

class MenuButton extends Component {
    getIcon() {
        if (this.props.visibleMenu) {
            return <span className="oi oi-x" title="icon name" aria-hidden="true"></span>;
        } else {
            return <span className="oi oi-menu" title="icon name" aria-hidden="true"></span>;
        }
    }

    render() {
        return (
            <span onClick={this.props.handleClick}>
                {this.getIcon()}
            </span>
        );
    }
}

export default MenuButton;