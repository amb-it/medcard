import React, { Component } from "react";

export default class Card extends Component {
    render() {
        return (
            <div>
                Card { this.props.match.params.id }
            </div>
        );
    }
}
