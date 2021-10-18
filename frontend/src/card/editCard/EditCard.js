import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

import Inputs from './Inputs';
import Files from './Files';
import Dots from "react-activity/lib/Dots";

export default class EditCard extends Component {
    constructor(props, context) {
        super(props, context);

        props.requestCardTypes();
        props.requestTags();

        this.inputs_tab_id = 'inputs_tab';
        this.files_tab_id = 'files_tab';

        this.state = {
            showTab: this.inputs_tab_id,
            editCard: null
        };
    }

    getCard = () => {
        const card_id = this.props.match.params.id;

        if (this.props.cards.length === 0) {
            this.props.requestCards();
        }
        for (const cardItem of this.props.cards) {
            if (cardItem._id === +card_id) return cardItem;
        }
    };

    editCardChange = (key, value) => {
        const editCard = this.state.editCard === null
            ? this.getCard()
            : this.state.editCard;

        editCard[key] = value;
        this.setState({editCard});
    }

    onAddFile = (filename) => {
        const editCard = this.state.editCard === null
            ? this.getCard()
            : this.state.editCard;

        if (editCard.files) {
            editCard.files.push(filename);
        } else {
            editCard.files = [filename];
        }
        this.setState({editCard});
    };

    onUpdateFiles = (files) => {
        const editCard = this.state.editCard === null
            ? this.getCard()
            : this.state.editCard;

        editCard.files = files;
        this.setState({editCard});
    };

    saveCard = () => {
        const editCard = this.state.editCard;
        const apiUrl =  process.env.REACT_APP_API_ADDRESS + '/cards/' + editCard._id;
        const config = this.props.user.getAuthConfig();

        axios.put(apiUrl, editCard, config)
            .then((response) => {

                this.setState({editCard});

                this.props.history.push('/card/' + editCard._id);

            })
            .catch(error => { console.log(error); })
    };

    render() {
        const card = this.state.editCard
            ? this.state.editCard
            : this.getCard();

        if (!card) {
            return <Dots size={32} />;
        }

        const backUri = card
            ? '/card/'+card._id
            : '/';

        return (
            <div className='container'>
                <header>
                    <NavLink to={backUri} className='btn menu_button'>
                        <span className='oi oi-x'/>
                    </NavLink>
                    <span className='card_page_title'>Редактировать запись</span>
                    <button
                        onClick={this.saveCard}
                        disabled={!this.state.editCard}
                        className='btn menu_button float-right right_icon'>
                        <span className='oi oi-check'/>
                    </button>

                    <hr/>
                </header>

                <div className='add_card_page'>
                    <nav className='mb-5'>
                        <div className='nav nav-tabs nav-fill' id='nav-tab' role='tablist'>
                            <button
                                onClick={() => {this.setState({showTab: this.inputs_tab_id})}}
                                id={this.inputs_tab_id}
                                className={this.state.showTab === this.inputs_tab_id ? 'nav-item nav-link active' : 'nav-item nav-link'}
                                data-toggle='tab' role='tab' aria-controls='nav-home' aria-selected='true'>
                                <span className='oi oi-align-center' /> <small>текст</small>
                                {/*Inputs*/}
                            </button>
                            <button
                                onClick={() => {this.setState({showTab: this.files_tab_id})}}
                                id={this.files_tab_id}
                                className={this.state.showTab === this.files_tab_id ? 'nav-item nav-link active' : 'nav-item nav-link'}
                                data-toggle='tab' role='tab' aria-controls='nav-profile' aria-selected='false'>
                                <span className='oi oi-camera-slr' />
                                &nbsp;&nbsp;
                                <span className='oi oi-file' /> <small>фото и файлы</small>
                                {/*Files, pictures*/}
                            </button>
                        </div>
                    </nav>

                    {(this.state.showTab === this.files_tab_id)
                        ? <Files
                            card={card}
                            onAddFile={this.onAddFile}
                            onUpdateFiles={this.onUpdateFiles}
                            />
                        : <Inputs
                            card={card}
                            cardTypes={this.props.cardTypes}
                            tags={this.props.tags}
                            editCardChange={this.editCardChange}
                            onTagsChange={this.onTagsChange}
                        />
                    }

                    <hr/>

                    <div className='row md-5'>
                        <div className='col-6 text-center'>
                            <NavLink to='/' className='btn btn-outline-danger menu_button'>
                                отмена
                            </NavLink>
                        </div>
                        <div className='col-6 text-center'>
                            <button
                                onClick={this.saveCard}
                                disabled={!this.state.editCard}
                                className='btn btn-success'>сохранить</button>
                        </div>
                    </div>

                    <hr/>
                </div>

            </div>
        );
    }
}
