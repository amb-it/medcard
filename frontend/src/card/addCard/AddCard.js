import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

import Inputs from './Inputs';
import Files from './Files';

export default class AddCard extends Component {
    constructor(props, context) {
        super(props, context);

        props.requestCardTypes();
        props.requestTags();

        this.inputs_tab_id = 'inputs_tab';
        this.files_tab_id = 'files_tab';

        this.state = {
            showTab: this.inputs_tab_id,
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
        const apiUrl =  process.env.REACT_APP_API_ADDRESS + '/cards';
        const newCard = this.state.newCard;
        const config = this.props.user.getAuthConfig();
        
        axios.post(apiUrl, newCard, config)
            .then((response) => {

                const newCard = this.state.newCard;
                this.setState({newCard});

                this.props.history.push('/card/' + response.data._id);

            })
            .catch(error => { console.log(error); })
    };
    
    render() {
        return (
            <div className='container'>
                <header>
                    <NavLink to='/' className='btn menu_button'>
                        <span className='oi oi-x'/>
                    </NavLink>
                    <span className='card_page_title'>Новая запись</span>
                    <button
                        onClick={this.saveCard}
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
                                <span className='oi oi-align-center' />
                                {/*Inputs*/}
                            </button>
                            <button
                                onClick={() => {this.setState({showTab: this.files_tab_id})}}
                                id={this.files_tab_id}
                                className={this.state.showTab === this.files_tab_id ? 'nav-item nav-link active' : 'nav-item nav-link'}
                                data-toggle='tab' role='tab' aria-controls='nav-profile' aria-selected='false'>
                                <span className='oi oi-file' />
                                &nbsp;&nbsp;
                                <span className='oi oi-camera-slr' />
                                {/*Files, pictures*/}
                            </button>
                        </div>
                    </nav>

                    {(this.state.showTab === this.files_tab_id)
                        ? <Files
                            onAddFile={this.onAddFile}
                            />
                        : <Inputs
                            newCard={this.state.newCard}
                            // onTagsChange={this.onTagsChange}
                            newCardChange={this.newCardChange}
                            cardTypes={this.props.cardTypes}
                            tags={this.props.tags}
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
                                className='btn btn-success'>сохранить</button>
                        </div>
                    </div>

                    <hr/>
                </div>

            </div>
        );
    }
}
