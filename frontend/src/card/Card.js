import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Dots from 'react-activity/lib/Dots';

import CardData from "./CardData";
import CardMenu from "./CardMenu";
import MenuButton from "../core/component/MenuButton";


export default class Card extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            visibleMenu: false,
        };
    }

    getCardById = (id) => {
        if (this.props.cards.length === 0) {
            this.props.requestCards();
        }
        for (const cardItem of this.props.cards) {
            if (cardItem._id === +id) return cardItem;
        }
    };

    onMenuButtonClick = () => {
        this.setState({ visibleMenu: !this.state.visibleMenu });
    };

    deleteCard = () => {
        this.props.deleteCard(this.props.match.params.id);
        this.props.history.push("/");
    };

    render() {
        const card_id = this.props.match.params.id;
        const card = this.getCardById(card_id);

        return (
            <div className="container">
                <header>
                    <NavLink to="/" className="btn menu_button">
                        <span className="oi oi-caret-left" title="icon name" aria-hidden="true" />
                    </NavLink>
                    <span className="card_page_title">Запись &nbsp; № {card_id}</span>
                    <span className="float-right right_icon">
                        <MenuButton
                            handleClick={this.onMenuButtonClick}
                            visibleMenu={this.state.visibleMenu}
                        />
                    </span>
                    <hr/>
                </header>

                <CardMenu
                    visible={this.state.visibleMenu}
                    card={card}
                    deleteCard={this.deleteCard}
                />

                { card
                    ? <CardData card={card} />
                    : <Dots size={32} />
                }

            </div>
        );
    }
}

// HOC component (just for history)
// export default withLoadingScreen(Card);