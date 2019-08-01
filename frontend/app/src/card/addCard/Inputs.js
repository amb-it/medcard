import React, { Component } from "react";

export default class Inputs extends Component {
  renderCardTypeOptions() {
    const cardTypes = this.props.cardTypes;
  
    if (cardTypes.length > 0) {
      return cardTypes.map(
        (cardType, key) => <option value={cardType._id} key={key}>{cardType.name}</option>
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
                      rows="8" className="form-control" placeholder="Complaint"></textarea>
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
              <div className="input-group mb-3">
                  <input
                      onChange={this.props.onInputChange}
                      id="clinic"
                      type="text" className="form-control" placeholder="Clinic"/>
              </div>
              <div className="input-group mb-3">
                  <input
                      onChange={this.props.onInputChange}
                      id="doctor"
                      type="text" className="form-control" placeholder="Doctor"/>
              </div>
              <div className="input-group mb-3">
                  <textarea
                      onChange={this.props.onInputChange}
                      id="materials"
                      rows="8" className="form-control" placeholder="Materials and analysis"></textarea>
              </div>
              <div className="input-group mb-3">
                  <textarea
                      onChange={this.props.onInputChange}
                      id="prescription"
                      rows="8" className="form-control" placeholder="Prescription"></textarea>
              </div>
              <div className="input-group mb-5">
                  <textarea
                      onChange={this.props.onInputChange}
                      id="notes"
                      rows="8" className="form-control" placeholder="Notes"></textarea>
              </div>
          </div>
      );
  }
}