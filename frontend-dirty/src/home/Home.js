import React, { Component } from "react";

import ShortCard from "./ShortCard";
import MenuButton from "../core/component/MenuButton";
import MainMenu from "./MainMenu";

export default class Home extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            visibleMainMenu: false
        };

        this.handleMenuButtonClick = this.handleMenuButtonClick.bind(this);
    }

    renderCards() {
        const cards = this.props.cards;

        if (cards.length > 0) {
            return cards.map(
                (card, key) => <ShortCard card={card} key={key}/>
            )
        } else {
            return "Fail to load cards";
        }
    }

    handleMenuButtonClick(e) {
        this.setState({
            visibleMainMenu: !this.state.visibleMainMenu
        });

        e.stopPropagation();
    }

    render() {
        return (
            <div>
                <header>
                    <span className="btn menu-button">
                        <MenuButton
                            handleClick={this.handleMenuButtonClick}
                            visibleMenu={this.state.visibleMainMenu}
                        />
                        <span className="logo">MedCard</span>
                    </span>
                    <span className="oi oi-magnifying-glass float-right right-icon"></span>
                    <hr />
                </header>

                <MainMenu visible={this.state.visibleMainMenu}/>

                <div className="mainpage-cards">
                    {this.renderCards()}
                </div>

                <span className="add-card-link">
                    <span className="oi oi-plus" title="icon name" aria-hidden="true"></span>
                </span>
            </div>
        );
    }
}