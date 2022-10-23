import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

import Inputs from './Inputs';

export default class AddCard extends Component {
    constructor(props, context) {
        super(props, context);

        props.requestCardTypes();
        props.requestTags();

        this.state = {
            newCard: {}
        };
    }

    newCardChange = (key, value) => {
        const newCard = this.state.newCard;
        newCard[key] = value;
        this.setState({newCard});
    }
    
    onAddFile = (filename) => {
        const newCard = this.state.newCard;
        if (newCard.files) {
            newCard.files.push(filename);
        } else {
            newCard.files = [filename];
        }
        this.setState({newCard});
    };
    
    saveCard = () => {
        const newCard = this.state.newCard;
        const apiUrl =  process.env.REACT_APP_API_ADDRESS + '/cards';
        const config = this.props.user.getAuthConfig();
        
        axios.post(apiUrl, newCard, config)
            .then((response) => {

                this.setState({newCard});

                this.props.history.push('/card/' + response.data._id);

            })
            .catch(error => { console.log(error); })
    };
    
    render() {
        return (
            <div className='container'>
                <header>
                    <NavLink to='/history' className='btn menu_button'>
                        <span className='oi oi-x'/>
                    </NavLink>
                    <span className='card_page_title'>Новая запись</span>
                    <button
                        onClick={this.saveCard}
                        className='btn btn-success float-right'>сохранить</button>
                    <hr/>
                </header>

                <div className='add_card_page'>
                    <Inputs
                        newCard={this.state.newCard}
                        newCardChange={this.newCardChange}
                        cardTypes={this.props.cardTypes}
                        tags={this.props.tags}
                        onAddFile={this.onAddFile}
                        />

                    <hr/>
                </div>

                <div className='row md-5'>
                    <div className='col-6 text-center'>
                        <NavLink to='/history' className='btn btn-outline-danger menu_button'>
                            отмена
                        </NavLink>
                    </div>
                    <div className='col-6 text-center'>
                        <button
                            onClick={this.saveCard}
                            className='btn btn-success'>сохранить</button>
                    </div>
                </div>

                <hr />

            </div>
        );
    }
}
