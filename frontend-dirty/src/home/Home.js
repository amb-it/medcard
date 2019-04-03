import React, { Component } from "react";

import ShortCard from "./ShortCard";

export default class Home extends Component {
    renderCards() {
        const cards = this.props.cards;

        if (true) {
            return cards.map(
                (card, key) => <ShortCard card={card} key={key}/>
            )
        } else {
            return "Fail to load cards";
        }
    }

    render() {
        return (
            <div>
                <header>
                    <span className="btn menu-button">
                        {/*<span className="oi oi-menu" title="icon name" aria-hidden="true"></span>*/}
                        <span>=</span>
                        <span className="logo">MedCard</span>
                    </span>
                    {/*<span className="oi oi-magnifying-glass float-right search-magnifier"></span>*/}
                    <span className="float-right search-magnifier">search</span>
                    <hr />
                </header>


                <div className="mainpage-cards">
                    {this.renderCards()}
                </div>

                <span className="add-card-link">
                    <span>+</span>
                </span>
            </div>
        );
    }
}