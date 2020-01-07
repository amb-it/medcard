import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export default class ShortCard extends Component {

    render() {
        const card = this.props.card;

        let complaint = ' - ';

        if (card.complaint) {
            complaint = card.complaint.length > 110
                ? card.complaint.substring(0,110) + '...'
                : card.complaint
        }

        return (
            <NavLink to={"card/"+card._id}>
                <div className="card">
                    <div className="row">
                        <div className="col date">{card.date.substring(0,10)} <div className="card_id">№ {card._id}</div></div>
                        <div className="col type">{card.cardType ? card.cardType.title : ''}</div>
                    </div>

                    <div className="description">{complaint}</div>
                    <div className="hospital">
                        {card.clinic && card.clinic.title ? card.clinic.title : ''}
                    </div>
                    <div className="files text-right">
                        {card.files.map(
                            (item, key) => <span key={key} className="oi oi-file"></span>
                        )}
                    </div>
                </div>
            </NavLink>
        );
    }
}
