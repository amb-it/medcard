import React, { Component } from "react";

export default class Inputs extends Component {
    render() {
        return (
            <div>
                <div className="input-group mb-3">
                    <textarea rows="8" className="form-control" placeholder="Complaint"></textarea>
                </div>
                <div className="input-group mb-3">
                    <select className="custom-select" placeholder="Type">
                        <option value="0">Type...</option>
                        <option value="1">Heart</option>
                        <option value="2">Head</option>
                    </select>
                </div>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Clinic"/>
                </div>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Doctor"/>
                </div>
                <div className="input-group mb-3">
                    <textarea rows="8" className="form-control" placeholder="Materials and analysis"></textarea>
                </div>
                <div className="input-group mb-3">
                    <textarea rows="8" className="form-control" placeholder="Prescription"></textarea>
                </div>
                <div className="input-group mb-5">
                    <textarea rows="8" className="form-control" placeholder="Notes"></textarea>
                </div>
            </div>
        );
    }
}