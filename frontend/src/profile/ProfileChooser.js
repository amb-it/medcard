import React, {Component} from "react";
import Profile from "./Profile";
import {Redirect} from "react-router-dom";

export default class ProfileChooser extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {};
    }

    requestProfile = () => {
        const patient_id = this.props.match.params.id;
        const patient = this.props.getPatientById(patient_id);
        let profile = null;

        if (patient) {
            profile = patient.profile
        }
        this.setState({profile})
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
                <Profile
                    user={this.props.user}
                    patient={patient}
                    patients={this.props.patients}
                    requestProfile={this.requestProfile}
                />
            );
    }
}