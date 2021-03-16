import React, { Component } from "react";

export default class Picture extends Component {
    render() {
        return (
            <div className='picture'>
                <span className='oi oi-x delete_button'/>
                <img src={process.env.REACT_APP_API_ADDRESS + '/' + this.props.filename} key={this.props.key} alt=""/>

            </div>
        );
    }
}