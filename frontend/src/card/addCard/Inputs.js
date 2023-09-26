import React, { Component } from "react";

import TextInput from 'react-autocomplete-input';
import 'react-autocomplete-input/dist/bundle.css';
import {Collapse} from 'react-collapse';
import {FormattedMessage, injectIntl} from "react-intl";

import Files from "./Files";


class Inputs extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            tagInput: '',
            showFilepondBox: false
        };
    }

    renderCardTypeOptions() {
        const cardTypes = this.props.cardTypes;

        if (cardTypes.length > 0) {
            return cardTypes.map(
                (cardType, key) => <option value={cardType._id} key={key}>{cardType.title}</option>
            )
        }
    }

    renderTags() {
        const tags = this.props.newCard.tags;

        if (tags && tags.length > 0) {
            return tags.map(
                (tag, key) =>
                    <button key={key} type="button" className="btn btn-link btn-sm" onClick={() => this.removeTag(tag)}>
                        #{tag} <span className='oi oi-circle-x' />
                    </button>
            )
        }
    }

    addTag = (tag) => {
        let chosenTags = this.props.newCard.tags;
        tag= tag.trim().toLowerCase();

        this.setState({tagInput:''});

        if (!chosenTags) {
            chosenTags = [];
        }
        if (!tag || (tag && chosenTags.includes(tag)) || chosenTags.length > 2) {
            return;
        }

        chosenTags.push(tag)

        this.props.newCardChange('tags', chosenTags);
    }

    removeTag = (tag) => {
        let chosenTags = this.props.newCard.tags;
        chosenTags = chosenTags.filter(function(value, index, arr){
            return value !== tag;
        })

        this.props.newCardChange('tags', chosenTags);
    }

    onInputChange = (e) => {
        this.props.newCardChange(e.target.id, e.target.value);
    }

    render() {
        return (
            <div className="card_inputs">
                <div className="text-right">
                    <button
                        onClick={() => {this.setState({showFilepondBox: !this.state.showFilepondBox})}}
                        data-toggle='tab'
                        className={this.state.showFilepondBox ? "btn btn-light add_files" : "btn btn-outline-info add_files"}>
                            <span className='oi oi-camera-slr' />
                            <span className='oi oi-file' />
                            {this.state.showFilepondBox
                                ? <FormattedMessage id="card.add.hide-files" defaultMessage="hide photo and files box" />
                                : <FormattedMessage id="card.add.add-files" defaultMessage="add photo and files" />
                            }
                    </button>
                </div>

                <Collapse isOpened={this.state.showFilepondBox}>
                    <Files
                        onAddFile={this.props.onAddFile}
                    />
                </Collapse>

                <hr />

                <div className="mb-3">
                    <div className="text-right not_required_fields">
                        * <FormattedMessage id="card.add.not-required" defaultMessage="all fields are not required" />
                    </div>
                </div>
                <div className="input-group mb-3">
                    <textarea
                        onChange={this.onInputChange}
                        id="complaint"
                        rows="8"
                        className="form-control"
                        placeholder={this.props.intl.formatMessage({ id: "card.add.description", defaultMessage: "enter description or complaint\nsuch as 'headache.. '\nor 'undergo medical examination.. '\nor 'taken tests.. ' etc."})}
                    />
                </div>
                <div className="input-group mb-3 tags_box">
                    <TextInput
                        Component="input"
                        options={this.props.tags}
                        onChange={(tagInput) => this.setState({tagInput})}
                        onSelect={(option) => this.addTag(option)}
                        value={this.state.tagInput}
                        trigger=''
                        spacer=''
                        regex='^[a-zA-Zа-яА-Я0-9_\-]+$'
                        type="text"
                        className="form-control"
                        placeholder={this.props.intl.formatMessage({ id: "card.add.tags", defaultMessage: "tags (keywords)"})}
                    />
                    <button
                        onClick={() => this.addTag(this.state.tagInput)}
                        className='btn btn-sm btn-outline-primary'>
                            <FormattedMessage id="common.add" defaultMessage="add" />
                    </button>
                    <div className='tags'>
                        {this.renderTags()}
                    </div>
                </div>
                <div className="input-group mb-3">
                    <select
                        onChange={this.onInputChange}
                        id="cardType"
                        className="custom-select"
                        placeholder={this.props.intl.formatMessage({ id: "card.add.type", defaultMessage: "type"})}>
                            <option>{this.props.intl.formatMessage({ id: "card.add.choose-type", defaultMessage: "choose type"})}</option>
                            {this.renderCardTypeOptions()}
                    </select>
                </div>

                <div className="input-group mb-3">
                    <input
                        onChange={this.onInputChange}
                        id="date"
                        defaultValue={(new Date()).toISOString().substring(0,10)}
                        type="date"
                        className="form-control"
                        placeholder={this.props.intl.formatMessage({ id: "card.add.date", defaultMessage: "date"})}
                    />
                </div>
                <hr />
                <h2 className="badge badge-secondary">
                    <span className="oi oi-home" title="icon name" aria-hidden="true" />
                    <FormattedMessage id="card.add.clinic" defaultMessage="Clinic" />
                </h2>
                <div className="input-group mb-3">
                    <input
                        onChange={this.onInputChange}
                        id="clinicTitle"
                        type="text"
                        className="form-control"
                        placeholder={this.props.intl.formatMessage({ id: "card.add.clinic-title", defaultMessage: "clinic title"})}
                    />
                </div>
                <div className="input-group mb-3">
                    <input
                        onChange={this.onInputChange}
                        id="clinicAddress"
                        type="text" className="form-control"
                        placeholder={this.props.intl.formatMessage({ id: "card.add.clinic-address", defaultMessage: "address"})}
                    />
                </div>
                <div className="input-group mb-3">
                    <input
                        onChange={this.onInputChange}
                        id="clinicDepartmentTitle"
                        type="text"
                        className="form-control"
                        placeholder={this.props.intl.formatMessage({ id: "card.add.clinic-department", defaultMessage: "department"})}
                    />
                </div>
                <div className="input-group mb-3">
                    <input
                        onChange={this.onInputChange}
                        id="clinicDepartmentAddress"
                        type="text"
                        className="form-control"
                        placeholder={this.props.intl.formatMessage({ id: "card.add.clinic-department-address", defaultMessage: "department address"})}
                    />
                </div>

                <hr />
                <h2 className="badge badge-secondary">
                    <span className="oi oi-person" title="icon name" aria-hidden="true" />
                    <FormattedMessage id="card.add.doctor" defaultMessage="Doctor" />
                </h2>
                <div className="input-group mb-3">
                  <input
                      onChange={this.onInputChange}
                      id="doctorName"
                      type="text"
                      className="form-control"
                      placeholder={this.props.intl.formatMessage({ id: "common.full-name", defaultMessage: "full name"})}
                  />
                </div>
                <div className="input-group mb-3">
                  <input
                      onChange={this.onInputChange}
                      id="doctorSpecialization"
                      type="text"
                      className="form-control"
                      placeholder={this.props.intl.formatMessage({ id: "card.add.specialization", defaultMessage: "specialization (f.e. therapist)"})}
                  />
                </div>

                <hr />
                <h2 className="badge badge-secondary">
                    <span className="oi oi-info" title="icon name" aria-hidden="true" />
                    <FormattedMessage id="card.add.other" defaultMessage="other" />
                </h2>
                <div className="input-group mb-3">
                    <textarea
                        onChange={this.onInputChange}
                        id="diagnoses"
                        rows="2"
                        className="form-control"
                        placeholder={this.props.intl.formatMessage({ id: "card.add.diagnoses", defaultMessage: "diagnoses"})}
                    />
                </div>
                <div className="input-group mb-3">
                    <textarea
                        onChange={this.onInputChange}
                        id="materials"
                        rows="8"
                        className="form-control"
                        placeholder={this.props.intl.formatMessage({ id: "card.add.parameters", defaultMessage: "parameters (such as blood pressure, level of glucose, hormones)"})}
                    />
                </div>
                <div className="input-group mb-3">
                    <textarea
                        onChange={this.onInputChange}
                        id="prescriptions"
                        rows="8"
                        className="form-control"
                        placeholder={this.props.intl.formatMessage({ id: "card.add.prescriptions", defaultMessage: "prescriptions"})}
                    />
                </div>
                <div className="input-group mb-5">
                  <textarea
                      onChange={this.onInputChange}
                      id="notes"
                      rows="8"
                      className="form-control"
                      placeholder={this.props.intl.formatMessage({ id: "card.add.other-notes", defaultMessage: "other notes"})}
                  />
                </div>
            </div>
        );
    }
}

export default injectIntl(Inputs);