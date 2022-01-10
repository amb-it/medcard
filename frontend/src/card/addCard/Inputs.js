import React, { Component } from "react";

import TextInput from 'react-autocomplete-input';
import 'react-autocomplete-input/dist/bundle.css';
import {Collapse} from 'react-collapse';

import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';
import FilePondPluginImageResize from 'filepond-plugin-image-resize';
import FilePondPluginImageTransform from 'filepond-plugin-image-transform';


registerPlugin(FilePondPluginImageTransform, FilePondPluginImageResize, FilePondPluginImagePreview);


export default class Inputs extends Component {
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
        const apiUrl =  process.env.REACT_APP_API_ADDRESS + '/cards/files';
        const filePondServerConfig = {
            url: apiUrl,
            process: {
                onload: (data) => {
                    this.props.onAddFile(JSON.parse(data).filename);
                }
            }
        };

        return (
            <div className="card_inputs">
                <div className="text-right">
                    <button
                        onClick={() => {this.setState({showFilepondBox: !this.state.showFilepondBox})}}
                        data-toggle='tab'
                        className={this.state.showFilepondBox ? "btn btn btn-light" : "btn btn-outline-info"}>
                        <span className='oi oi-camera-slr' />
                        &nbsp;&nbsp;
                        <span className='oi oi-file' /> <small>{this.state.showFilepondBox ? "спрятать блок фото и файлов" : "добавить фото и файлы"}</small>
                    </button>
                </div>

                <Collapse isOpened={this.state.showFilepondBox}>
                    <div className="filepond_box">
                        <p>Добавьте к записи фотографии или файлы выписок, справок, анализов или любые другие файлы</p>
                        <FilePond
                            labelIdle="<span class='btn btn-outline-primary'>Сфотографировать или выбрать файлы нажимайте здесь</span>"
                            allowMultiple={true}
                            imageResizeTargetWidth={1024}
                            imageResizeUpscale={false}
                            server={filePondServerConfig}
                        />
                    </div>
                </Collapse>

                <hr />

                <div className="mb-3">
                    <div className="text-right not_required_fields"><small>* все поля НЕ обязательны к заполнению</small></div>
                </div>
                <div className="input-group mb-3">
                    <textarea
                        onChange={this.onInputChange}
                        id="complaint"
                        rows="8" className="form-control" placeholder="введите описание или жалобу &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;     (например 'Болел живот.. ' или 'Проходил мед. осмотр..' или 'Сдал анализы' и т.д.)"
                    />
                </div>
                <div className="input-group mb-3">
                    <TextInput
                        Component="input"
                        options={this.props.tags}
                        onChange={(tagInput) => this.setState({tagInput})}
                        onSelect={(option) => this.addTag(option)}
                        value={this.state.tagInput}
                        trigger=''
                        spacer=''
                        regex='^[a-zA-Zа-яА-Я0-9_\-]+$'
                        type="text" className="form-control" placeholder="теги (ключевые слова)"
                    />
                    &nbsp;
                    <button
                        onClick={() => this.addTag(this.state.tagInput)}
                        className='btn btn-sm btn-outline-primary'>добавить</button>
                    <div className='tags'>
                        {this.renderTags()}
                    </div>
                </div>
                <div className="input-group mb-3">
                    <select
                        onChange={this.onInputChange}
                        id="cardType"
                        className="custom-select" placeholder="Тип">
                        <option>выберите тип</option>
                        {this.renderCardTypeOptions()}
                    </select>
                </div>

                <div className="input-group mb-3">
                    <input
                        onChange={this.onInputChange}
                        id="date"
                        defaultValue={(new Date()).toISOString().substr(0,10)}
                        type="date" className="form-control" placeholder="дата" />
                </div>
                <hr />
                <h2 className="badge badge-secondary">
                    <span className="oi oi-home" title="icon name" aria-hidden="true" />
                    Клиника
                </h2>
                <div className="input-group mb-3">
                    <input
                        onChange={this.onInputChange}
                        id="clinicTitle"
                        type="text" className="form-control" placeholder="название" />
                </div>
                <div className="input-group mb-3">
                    <input
                        onChange={this.onInputChange}
                        id="clinicAddress"
                        type="text" className="form-control" placeholder="адрес" />
                </div>
                <div className="input-group mb-3">
                    <input
                        onChange={this.onInputChange}
                        id="clinicDepartmentTitle"
                        type="text" className="form-control" placeholder="отделение" />
                </div>
                <div className="input-group mb-3">
                    <input
                        onChange={this.onInputChange}
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
                      onChange={this.onInputChange}
                      id="doctorName"
                      type="text" className="form-control" placeholder="ФИО" />
                </div>
                <div className="input-group mb-3">
                  <input
                      onChange={this.onInputChange}
                      id="doctorSpecialization"
                      type="text" className="form-control" placeholder="Специализация (например 'терапевт')" />
                </div>

                <hr />
                <h2 className="badge badge-secondary">
                    <span className="oi oi-info" title="icon name" aria-hidden="true" />
                    другое
                </h2>
                <div className="input-group mb-3">
                    <textarea
                        onChange={this.onInputChange}
                        id="diagnoses"
                        rows="2" className="form-control" placeholder="диагноз" />
                </div>
                <div className="input-group mb-3">
                    <textarea
                        onChange={this.onInputChange}
                        id="materials"
                        rows="8" className="form-control" placeholder="параметры (например: давление, уровень глюкозы, гормонов и т.д.)" />
                </div>
                <div className="input-group mb-3">
                    <textarea
                        onChange={this.onInputChange}
                        id="prescriptions"
                        rows="8" className="form-control" placeholder="назначения" />
                </div>
                <div className="input-group mb-5">
                  <textarea
                      onChange={this.onInputChange}
                      id="notes"
                      rows="8" className="form-control" placeholder="заметки" />
                </div>
            </div>
        );
    }
}