import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Moment from "react-moment";

export default class ShortCard extends Component {

    render() {
        const card = this.props.card;

        let complaint = '';

        if (card.complaint) {
            complaint = card.complaint.length > 130
                ? card.complaint.substring(0,130) + '...'
                : card.complaint
        }

        return (
            <NavLink to={"card/"+card._id}>
                <div className="card">
                    <div className="row">
                        <div className="col title">
                            <Moment format="D MMMM">{card.date}</Moment>
                            <div className="card_id">№ {card._id}</div>
                        </div>
                        <div className="col type">{card.cardType ? card.cardType.title : ''}</div>
                    </div>

                    <div className="description">{complaint}</div>
                    {card.clinic && card.clinic.title ?
                    <div className="visited">
                        <span className="oi oi-home" title="icon name" aria-hidden="true" />
                        { card.clinic.title }
                    </div>
                    : ''}
                    {card.doctor ?
                    <div className="visited">
                        <span className="oi oi-person" title="icon name" aria-hidden="true" />
                        { card.doctor.name + ' ' + card.doctor.surname }
                    </div>
                    : ''}
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
