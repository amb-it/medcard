import React, { Component } from "react";

export default class Inputs extends Component {
    renderCardTypeOptions() {
        const cardTypes = this.props.cardTypes;

        if (cardTypes.length > 0) {
            return cardTypes.map(
                (cardType, key) => <option value={cardType._id} key={key}>{cardType.title}</option>
            )
        }
    }

    render() {
        return (
            <div>
                <div className="input-group mb-3">
                    <textarea
                        onChange={this.props.onInputChange}
                        id="complaint"
                        rows="8" className="form-control" placeholder="Complaint" />
                </div>
                <div className="input-group mb-3">
                    <select
                        onChange={this.props.onInputChange}
                        id="cardType"
                        className="custom-select" placeholder="Type">
                        <option>choose type</option>
                        {this.renderCardTypeOptions()}
                    </select>
                </div>

                <hr />
                <h2 className="badge badge-secondary">
                    Clinic
                </h2>
                <div className="input-group mb-3">
                    <input
                        onChange={this.props.onInputChange}
                        id="clinicTitle"
                        type="text" className="form-control" placeholder="title" />
                </div>
                <div className="input-group mb-3">
                    <input
                        onChange={this.props.onInputChange}
                        id="clinicAddress"
                        type="text" className="form-control" placeholder="address" />
                </div>
                <div className="input-group mb-3">
                    <input
                        onChange={this.props.onInputChange}
                        id="clinicDepartmentTitle"
                        type="text" className="form-control" placeholder="department title" />
                </div>
                <div className="input-group mb-3">
                    <input
                        onChange={this.props.onInputChange}
                        id="clinicDepartmentAddress"
                        type="text" className="form-control" placeholder="department address" />
                </div>

                <hr />
                <h2 className="badge badge-secondary">
                    Doctor
                </h2>
                <div className="input-group mb-3">
                  <input
                      onChange={this.props.onInputChange}
                      id="doctorSurname"
                      type="text" className="form-control" placeholder="surname" />
                </div>
                <div className="input-group mb-3">
                  <input
                      onChange={this.props.onInputChange}
                      id="doctorName"
                      type="text" className="form-control" placeholder="name" />
                </div>

                <hr />
                <h2 className="badge badge-secondary">
                    other
                </h2>
                <div className="input-group mb-3">
                    <textarea
                        onChange={this.props.onInputChange}
                        id="diagnoses"
                        rows="8" className="form-control" placeholder="Diagnose" />
                </div>
                <div className="input-group mb-3">
                    <textarea
                        onChange={this.props.onInputChange}
                        id="materials"
                        rows="8" className="form-control" placeholder="Materials and analysis" />
                </div>
                <div className="input-group mb-3">
                    <textarea
                        onChange={this.props.onInputChange}
                        id="prescriptions"
                        rows="8" className="form-control" placeholder="Prescription" />
                </div>
                <div className="input-group mb-5">
                  <textarea
                      onChange={this.props.onInputChange}
                      id="notes"
                      rows="8" className="form-control" placeholder="Notes" />
                </div>
            </div>
        );
    }
}