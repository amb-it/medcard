import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

import Inputs from './Inputs';
import Dots from "react-activity/lib/Dots";
import {FormattedMessage} from "react-intl";

export default class EditCard extends Component {
    constructor(props, context) {
        super(props, context);

        props.requestCardTypes();
        props.requestTags();

        this.state = {
            editCard: null
        };
    }

    getCard = () => {
        const card_id = this.props.match.params.id;

        const cards = this.props.cards;

        if (cards === null || cards.length === 0) {
            this.props.requestCards();
        }

        if (cards && cards.length > 0) {
            for (const cardItem of cards) {
                if (cardItem._id === +card_id) return cardItem;
            }
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
            ? '/card/' + card._id
            : '/history';

        return (
            <div className='container'>
                <header>
                    <NavLink to={backUri} className='btn menu_button'>
                        <span className='oi oi-caret-left'/>
                    </NavLink>
                    <span className="page_title">
                        <FormattedMessage id="card.edit.edit" defaultMessage="Edit" /> <FormattedMessage id="card.note" defaultMessage="Note" /> № <span>{this.props.match.params.id}</span>
                    </span>
                    <hr/>
                </header>

                <div className='add_card_page'>
                    <Inputs
                        user={this.props.user}
                        card={card}
                        cardTypes={this.props.cardTypes}
                        tags={this.props.tags}
                        editCardChange={this.editCardChange}
                        onTagsChange={this.onTagsChange}
                        onAddFile={this.onAddFile}
                        onUpdateFiles={this.onUpdateFiles}
                    />

                    <hr/>

                    <div className='row md-5'>
                        <div className='col-6 text-center'>
                            <NavLink to='/history' className='btn btn-outline-danger menu_button'>
                                <FormattedMessage id="common.cancel" defaultMessage="cancel" />
                            </NavLink>
                        </div>
                        <div className='col-6 text-center'>
                            <button
                                onClick={this.saveCard}
                                disabled={!this.state.editCard}
                                className='btn btn-success'>
                                    <FormattedMessage id="common.save" defaultMessage="save" />
                            </button>
                        </div>
                    </div>

                    <hr/>
                </div>

            </div>
        );
    }
}
