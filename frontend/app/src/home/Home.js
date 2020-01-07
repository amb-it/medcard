import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import ShortCard from "./ShortCard";
import MenuButton from "../core/component/MenuButton";
import MainMenu from "./MainMenu";

export default class Home extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            visibleMainMenu: false,
            visibleSearchInput: false,
            cards: [],
            cardsFiltered: []
        };

        this.props.requestCards();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.cards !== prevProps.cards) {
            this.setState({ cards: this.props.cards });
            this.setState({ cardsFiltered: this.props.cards });
        }
    }

    renderCards() {
        const cards = this.state.cardsFiltered;

        if (cards.length > 0) {
            return cards.map(
                (card, key) => <ShortCard card={card} key={key}/>
            )
        } else {
            return "No cards";
        }
    }

    onMenuButtonClick = () => {
        this.setState({ visibleMainMenu: !this.state.visibleMainMenu });
    };

    onSearchButtonClick = () => {
        this.setState({ visibleSearchInput: !this.state.visibleSearchInput });
    };

    onCloseSearchClick = () => {
        this.setState({
            visibleSearchInput: !this.state.visibleSearchInput,
            cardsFiltered: this.state.cards
        });
    };

    onSearchInputChange = (e) => {
        let cardsFiltered = [];

        if (e.target.value === '') {
            cardsFiltered = this.state.cards;
        } else {
            this.state.cards.forEach( (element) => {
                if (element.complaint && element.complaint.toLowerCase().includes(e.target.value.toLowerCase())) {
                    cardsFiltered.push(element);
                }
            } );
        }

        this.setState({ cardsFiltered: cardsFiltered });
    };

    render() {
        return (
            <div className="container">
                <header>
                    <span className="btn menu_button">
                        <MenuButton
                            handleClick={this.onMenuButtonClick}
                            visibleMenu={this.state.visibleMainMenu}
                        />
                        <span className="logo">MedCard</span>
                    </span>
                    {
                        !this.state.visibleSearchInput ?
                            <span className="float-right right_icon">
                                <span
                                    onClick={this.onSearchButtonClick}
                                    className="oi oi-magnifying-glass"
                                />
                            </span>
                            : ""
                    }
                    <hr />
                </header>

                <MainMenu
                    visible={this.state.visibleMainMenu}
                    user={this.props.user}
                />

                { this.state.visibleSearchInput ?
                    <div className="input-group mb-3">
                        <input
                            onChange={this.onSearchInputChange}
                            autoFocus={true}
                            type="text" className="form-control col-10" placeholder="search" />
                        <div className="input-group-append">
                            <button className="btn" type="button">
                                <span
                                    onClick={this.onCloseSearchClick}
                                    className="col-2 oi oi-x"
                                />
                            </button>
                        </div>

                    </div>
                    : '' }

                <div className="mainpage_cards">
                    {this.renderCards()}
                </div>

                <NavLink to="/add-card" className="btn menu_button add_card_link">
                    <span className="oi oi-plus" title="icon name" aria-hidden="true"></span>
                </NavLink>
            </div>
        );
    }
}