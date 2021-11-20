import React, {Component} from "react";
import {NavLink} from "react-router-dom";

import ShortCard from "./ShortCard";
import MenuButton from "../core/component/MenuButton";
import MainMenu from "./MainMenu";

export default class Home extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            visibleMainMenu: false,
            visibleSearchInput: false,
            visibleAddCardText: true,
            cards: [],
            cardsFiltered: []
        };

        this.props.requestCards();
    }

    // componentDidMount() {
    //     this.interval = setInterval(() => this.setState({ visibleAddCardText: false }), 1500);
    // }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.cards !== prevProps.cards) {
            this.setState({cards: this.props.cards});
            this.setState({cardsFiltered: this.props.cards});
        }
    }

    renderCards() {
        const cards = this.state.cardsFiltered;

        return cards.length > 0
            ? cards.map((card, key) => <ShortCard card={card} key={key} />)
            : 'Отсутствуют карточки либо проблема с загрузкой..';
    }

    onMenuButtonClick = () => {
        this.setState({visibleMainMenu: !this.state.visibleMainMenu});
    };

    onSearchButtonClick = () => {
        this.setState({visibleSearchInput: !this.state.visibleSearchInput});
    };

    onCloseSearchClick = () => {
        this.setState({
            visibleSearchInput: !this.state.visibleSearchInput,
            cardsFiltered: this.state.cards
        });
    };

    onSearchInputChange = (event) => {
        const input = event.target.value;
        let cardsFiltered = this.state.cards;

        if (input.length !== 0) {
            cardsFiltered = this.state.cards.filter(function(card) {
                    return (card.complaint && card.complaint.toLowerCase().includes(input.toLowerCase()))
                        || (card.cardType && card.cardType.title.toLowerCase().includes(input.toLowerCase()))
                        || (card.tags && card.tags.join().includes(input.toLowerCase()))
                        || (card.doctor && card.doctor.name.toLowerCase().includes(input.toLowerCase()))
                        || (card.clinic && card.clinic.title.toLowerCase().includes(input.toLowerCase()))
            });
        }

        this.setState({cardsFiltered});
    };

    render() {
        return (
            <div className="container">
                <header>
                    <span className="btn menu_button_box">
                        <MenuButton
                            handleClick={this.onMenuButtonClick}
                            visibleMenu={this.state.visibleMainMenu}
                        />
                        <span className="logo">
                            <span className="oi oi-medical-cross" title="icon name" aria-hidden="true" />
                            MedCard
                        </span>
                    </span>
                    {
                        !this.state.visibleSearchInput ?
                            <span className="float-right right_icon">
                                <span
                                    onClick={this.onSearchButtonClick}
                                    className="oi oi-magnifying-glass search_button"
                                />
                            </span>
                            : ""
                    }
                    <hr/>
                </header>

                <MainMenu
                    visible={this.state.visibleMainMenu}
                    user={this.props.user}
                />

                {this.state.visibleSearchInput ?
                    <div className="input-group mb-3">
                        <input
                            onChange={this.onSearchInputChange}
                            autoFocus={true}
                            type="text" className="form-control col-10" placeholder="поиск"/>
                        <div className="input-group-append">
                            <button className="btn" type="button">
                                <span
                                    onClick={this.onCloseSearchClick}
                                    className="col-2 oi oi-x"
                                />
                            </button>
                        </div>

                    </div>
                    : ''}

                <div className="home_page">
                    {this.renderCards()}
                </div>

                <NavLink to="/add-card" className="btn add_card_link">
                    {/*<span className={'text' + (this.state.visibleAddCardText ? '' : ' collapsible')}>Добавить запись</span>*/}
                    <span className="oi oi-plus" title="icon name" aria-hidden="true" />
                </NavLink>
            </div>
        );
    }
}