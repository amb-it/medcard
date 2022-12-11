import React, { Component } from "react";
import { NavLink } from "react-router-dom";
// import Dots from 'react-activity/lib/Dots';

import CardData from "./CardData";
import Dots from "react-activity/lib/Dots";


export default class PatientCard extends Component {

    getCardById = (cards, id) => {
        let card = null;

        if (cards && cards.length > 0) {
            for (const cardItem of cards) {
                if (cardItem._id === +id) {
                    card = cardItem;
                }
            }
        }

        return card;
    };

    render() {
        const patient_id = this.props.match.params.id;
        const patient = this.props.getPatientById(patient_id)
        const card_id = this.props.match.params.card_id;
        const card = this.getCardById(patient.cards, card_id);

        return (
            <div className="container card_page">
                <header>
                    <NavLink to={"/patient/"+patient_id+"/history"} className="btn menu_button">
                        <span className="oi oi-caret-left" title="icon name" aria-hidden="true" />
                    </NavLink>
                    <span className="card_page_title">Запись &nbsp; № {card_id}</span>
                    <hr/>
                </header>

                { card
                    ? <CardData card={card} />
                    : <Dots size={32} />
                }

            </div>
        );
    }
}

// HOC component (just for history)
// export default withLoadingScreen(Card);