import React, { Component } from "react";
import TextInput from 'react-autocomplete-input';
import 'react-autocomplete-input/dist/bundle.css';

export default class Inputs extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            availableTags: ["apple", "apricot", "banana", "carrot"],
            chosenTags: [],
            tagInput: ''
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
        const tags = this.state.chosenTags;

        if (tags.length > 0) {
            return tags.map(
                (tag, key) =>
                    <button key={key} type="button" className="btn btn-link btn-sm" onClick={() => this.removeTag(tag)}>
                        #{tag}
                    </button>
            )
        }
    }

    addTag = (tag) => {
        const chosenTags = this.state.chosenTags;
        tag= tag.trim();

        this.setState({tagInput:''});

        if (!tag || (tag && chosenTags.includes(tag)) || chosenTags.length > 2) {
            return;
        }

        chosenTags.push(tag)

        this.setState({chosenTags});
        this.props.newCardChange('tags', chosenTags);
    }

    removeTag = (tag) => {
        let chosenTags = this.state.chosenTags;
        chosenTags = chosenTags.filter(function(value, index, arr){
            return value !== tag;
        })

        this.setState({chosenTags})
        this.props.newCardChange('tags', chosenTags);
    }

    render() {
        return (
            <div className="card_inputs">
                <div className="input-group mb-3">
                    <textarea
                        onChange={this.props.onInputChange}
                        id="complaint"
                        rows="8" className="form-control" placeholder="введите описание или жалобу &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;     (например 'Болел живот с правой стороны.. ' или 'Проходил плановый осмотр..' и т.д.)" />
                </div>
                <div className="input-group mb-3">
                    <select
                        onChange={this.props.onInputChange}
                        id="cardType"
                        className="custom-select" placeholder="Тип">
                        <option>выберите тип</option>
                        {this.renderCardTypeOptions()}
                    </select>
                </div>
                <div className="input-group mb-3">
                    <TextInput
                        Component="input"
                        options={this.state.availableTags}
                        onChange={(tagInput) => this.setState({tagInput})}
                        onSelect={(option) => this.addTag(option)}
                        value={this.state.tagInput}
                        trigger=''
                        spacer=''
                        type="text" className="form-control" placeholder="добавьте тег(и)"
                    />
                    &nbsp;
                    <button
                        onClick={() => this.addTag(this.state.tagInput)}
                        className='btn btn-light'>+</button>
                </div>
                {this.renderTags()}

                <hr />
                <h2 className="badge badge-secondary">
                    <span className="oi oi-home" title="icon name" aria-hidden="true" />
                    Клиника
                </h2>
                <div className="input-group mb-3">
                    <input
                        onChange={this.props.onInputChange}
                        id="clinicTitle"
                        type="text" className="form-control" placeholder="название" />
                </div>
                <div className="input-group mb-3">
                    <input
                        onChange={this.props.onInputChange}
                        id="clinicAddress"
                        type="text" className="form-control" placeholder="адрес" />
                </div>
                <div className="input-group mb-3">
                    <input
                        onChange={this.props.onInputChange}
                        id="clinicDepartmentTitle"
                        type="text" className="form-control" placeholder="отделение" />
                </div>
                <div className="input-group mb-3">
                    <input
                        onChange={this.props.onInputChange}
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
                      id="doctorSurname"
                      type="text" className="form-control" placeholder="Фамилия" />
                </div>
                <div className="input-group mb-3">
                  <input
                      onChange={this.props.onInputChange}
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
                        id="diagnoses"
                        rows="8" className="form-control" placeholder="диагноз" />
                </div>
                <div className="input-group mb-3">
                    <textarea
                        onChange={this.props.onInputChange}
                        id="prescriptions"
                        rows="8" className="form-control" placeholder="назначения" />
                </div>
                <div className="input-group mb-3">
                    <textarea
                        onChange={this.props.onInputChange}
                        id="materials"
                        rows="8" className="form-control" placeholder="анализы и материалы" />
                </div>
                <div className="input-group mb-5">
                  <textarea
                      onChange={this.props.onInputChange}
                      id="notes"
                      rows="8" className="form-control" placeholder="заметки" />
                </div>
            </div>
        );
    }
}