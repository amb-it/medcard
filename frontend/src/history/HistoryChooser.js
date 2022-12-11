import React, {Component} from "react";
import History from "./History";
import {Redirect} from "react-router-dom";

export default class HistoryChooser extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {};
    }

    requestCards = () => {
        const patient_id = this.props.match.params.id;
        const patient = this.props.getPatientById(patient_id);
        let cards = null;

        if (patient) {
            cards = patient.cards
                .filter(card => !card.deleted_at)
                .sort((a, b) => a.date < b.date ? 1 : -1)
        }
        this.setState({cards})
    }

    render() {
        const patient_id = this.props.match.params.id;
        const patient = this.props.getPatientById(patient_id);

        return !patient
            ? <Redirect to={{
                    pathname: '/',
                    state: { from: this.props.location }
                }} />
            : (
                <History
                    user={this.props.user}
                    cards={this.state.cards}
                    patients={this.props.patients}
                    patient={patient}
                    requestCards={this.requestCards}
                />
            );
    }
}