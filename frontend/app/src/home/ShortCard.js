import React, { Component } from "react";
import {NavLink} from "react-router-dom";

export default class ShortCard extends Component {

    render() {
        const card = this.props.card;

        return (
            <NavLink to={"card/"+card._id}>
                <div className="card">
                    <div className="row">
                        <div className="col date">{card.date.substring(0,10)} <div className="card-id">№ {card._id}</div></div>
                        <div className="col type">{card.cardType ? card.cardType.name : ''}</div>
                    </div>

                    <div className="description">{card.complaint ? card.complaint.substring(0,90) + '...' : ' - '}</div>
                    <div className="hospital">
                        {card.visited ? card.visited.clinic.title : ''}
                    </div>
                </div>
            </NavLink>
        );
    }
}
