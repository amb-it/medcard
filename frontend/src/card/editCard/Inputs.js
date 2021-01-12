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
        let card = this.props.card;
        card = card ? card : {};

        return (
            <div className="card_inputs">
                <div className="input-group mb-3">
                    <textarea
                        onChange={this.props.onInputChange}
                        value={card.complaint}
                        id="complaint"
                        rows="8" className="form-control"
                        placeholder="введите описание или жалобу &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;     (например 'Болел живот с правой стороны.. ' или 'Проходил плановый осмотр..' и т.д.)">
                    </textarea>
                </div>
                <div className="input-group mb-3">
                    <select
                        onChange={this.props.onInputChange}
                        value={card.cardType ? card.cardType._id : 0}
                        id="cardType"
                        className="custom-select" placeholder="Тип">
                        <option>выберите тип</option>
                        {this.renderCardTypeOptions()}
                    </select>
                </div>

                <hr />
                <h2 className="badge badge-secondary">
                    <span className="oi oi-home" title="icon name" aria-hidden="true" />
                    Клиника
                </h2>
                <div className="input-group mb-3">
                    <input
                        onChange={this.props.onInputChange}
                        value={card.clinic ? card.clinic.title : ''}
                        id="clinicTitle"
                        type="text" className="form-control" placeholder="название" />
                </div>
                <div className="input-group mb-3">
                    <input
                        onChange={this.props.onInputChange}
                        value={card.clinic ? card.clinic.address : ''}
                        id="clinicAddress"
                        type="text" className="form-control" placeholder="адрес" />
                </div>
                <div className="input-group mb-3">
                    <input
                        onChange={this.props.onInputChange}
                        value={card.clinicDepartment ? card.clinicDepartment.title : ''}
                        id="clinicDepartmentTitle"
                        type="text" className="form-control" placeholder="отделение" />
                </div>
                <div className="input-group mb-3">
                    <input
                        onChange={this.props.onInputChange}
                        value={card.clinicDepartment ? card.clinicDepartment.address : ''}
                        id="clinicDepartmentAddress"
                        type="text" className="form-control" placeholder="адрес отделения" />
                </div>

                <hr />
                <h2 className="badge badge-secondary">
                    <span className="oi oi-person" title="icon name" aria-hidden="true" />
                    Врач
                </h2>
                <div className="input-group mb-3">
                  <input
                      onChange={this.props.onInputChange}
                      value={card.doctor ? card.doctor.surname : ''}
                      id="doctorSurname"
                      type="text" className="form-control" placeholder="Фамилия" />
                </div>
                <div className="input-group mb-3">
                  <input
                      onChange={this.props.onInputChange}
                      value={card.doctor ? card.doctor.name : ''}
                      id="doctorName"
                      type="text" className="form-control" placeholder="Имя" />
                </div>

                <hr />
                <h2 className="badge badge-secondary">
                    <span className="oi oi-info" title="icon name" aria-hidden="true" />
                    другое
                </h2>
                <div className="input-group mb-3">
                    <textarea
                        onChange={this.props.onInputChange}
                        value={card.diagnoses}
                        id="diagnoses"
                        rows="8" className="form-control" placeholder="диагноз" />
                </div>
                <div className="input-group mb-3">
                    <textarea
                        onChange={this.props.onInputChange}
                        value={card.prescriptions}
                        id="prescriptions"
                        rows="8" className="form-control" placeholder="назначения" />
                </div>
                <div className="input-group mb-3">
                    <textarea
                        onChange={this.props.onInputChange}
                        value={card.materials}
                        id="materials"
                        rows="8" className="form-control" placeholder="анализы и материалы" />
                </div>
                <div className="input-group mb-5">
                  <textarea
                      onChange={this.props.onInputChange}
                      value={card.notes}
                      id="notes"
                      rows="8" className="form-control" placeholder="заметки" />
                </div>
            </div>
        );
    }
}