import React, {Component} from "react";
import {Redirect} from "react-router-dom";

import PatientCard from "./PatientCard";

export default class CardChooser extends Component {

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
        const patient = this.props.getPatientById(patient_id);
        const card_id = this.props.match.params.card_id;
        const card = patient ? this.getCardById(patient.cards, card_id) : null;

        return !patient || !card
            ? <Redirect to={{
                pathname: '/',
                state: { from: this.props.location }
            }} />
            : (
                <PatientCard
                    patient={patient}
                    card={card}
                />
            );
    }
}