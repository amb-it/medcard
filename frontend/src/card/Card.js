import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';
import Dots from 'react-activity/lib/Dots';
import {FormattedMessage} from "react-intl";

import CardData from "./CardData";
// import CardMenu from "./CardMenu";


export default class Card extends Component {

    // constructor(props, context) {
    //     super(props, context);
    //
    //     this.state = {
    //         visibleMenu: false,
    //     };
    // }

    getCardById = (id) => {
        const cards = this.props.cards;

        if (cards === null || cards.length === 0) {
            this.props.requestCards();
        }

        let card = null;

        if (cards && cards.length > 0) {
            for (const cardItem of cards) {
                if (cardItem._id === +id) {
                    card = cardItem;
                }
            }
        }

        if (!card) {
            setTimeout(() => {
                this.props.requestCards();
            }, 1000);
        }

        return card;
    };

    // onMenuButtonClick = () => {
    //     this.setState({ visibleMenu: !this.state.visibleMenu });
    // };

    deleteCard = () => {
        this.props.deleteCard(this.props.match.params.id);
        setTimeout(() => {
            this.props.history.push("/history")
        },1000);
    };

    render() {
        const card_id = this.props.match.params.id;
        const card = this.getCardById(card_id);

        const editUrl = card
            ? '/card/' + card._id + '/edit'
            : '';

        return (
            <div className="container card_page">
                <header>
                    <HashLink to={"/history#card_"+card_id} className="btn menu_button">
                        <span className="oi oi-caret-left" title="icon name" aria-hidden="true" />
                    </HashLink>
                    <span className="page_title">
                        <FormattedMessage id="card.entry" defaultMessage="Entry" /> № <span>{card_id}</span>
                    </span>
                    <span className="float-right">
                        <button
                            className='btn btn-outline-danger btn-sm'
                            onClick={this.deleteCard}>
                            <span className="oi oi-trash" />
                        </button>
                        <NavLink to={editUrl}>
                            <button className='btn btn-outline-primary'>
                            <span className="oi oi-pencil" />
                        </button>
                        </NavLink>
                    </span>
                    <hr/>
                </header>

                {/*<CardMenu*/}
                {/*    visible={this.state.visibleMenu}*/}
                {/*    card={card}*/}
                {/*    deleteCard={this.deleteCard}*/}
                {/*/>*/}

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