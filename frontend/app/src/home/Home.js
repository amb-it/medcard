import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import ShortCard from "./ShortCard";
import MenuButton from "../core/component/MenuButton";
import MainMenu from "./MainMenu";

export default class Home extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            visibleMainMenu: false
        };

        this.props.requestCards();
    }

    renderCards() {
        const cards = this.props.cards;

        if (cards && cards.length > 0) {
            return cards.map(
                (card, key) => <ShortCard card={card} key={key}/>
            )
        } else {
            return "No cards yet";
        }
    }

    handleMenuButtonClick = (e) => {
        this.setState({
            visibleMainMenu: !this.state.visibleMainMenu
        });

        e.stopPropagation();
    }

    render() {
        return (
            <div className="container">
                <header>
                    <span className="btn menu_button">
                        <MenuButton
                            handleClick={this.handleMenuButtonClick}
                            visibleMenu={this.state.visibleMainMenu}
                        />
                        <span className="logo">MedCard</span>
                    </span>
                    <span className="oi oi-magnifying-glass float-right right_icon"></span>
                    <hr />
                </header>

                <MainMenu
                    visible={this.state.visibleMainMenu}
                    user={this.props.user}
                />

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