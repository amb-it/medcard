import React, {Component} from "react";
import {NavLink} from "react-router-dom";
import FadingBalls from "react-cssfx-loading/lib/FadingBalls";

import ShortCard from "./ShortCard";
import MenuButton from "../core/component/MenuButton";
import MainMenu from "./MainMenu";
import EmptyMedicalHistory from "./EmptyMedicalHistory";

export default class History extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            visibleMainMenu: false,
            visibleSearchInput: false,
            visibleAddCardText: true,
            visiblePictures: false,
            cards: this.props.cards,
            cardsFiltered: null
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
        let result;

        if (cards === null) {
            result = <div className="text-center"><FadingBalls color="green" /></div>
        } else if (cards.length > 0) {
            result = cards.map((card, key) => <ShortCard card={card} key={key} visiblePictures={this.state.visiblePictures} />);
        } else {
            result = <EmptyMedicalHistory />;
        }

        return result;
    }

    onMenuButtonClick = () => {
        this.setState({visibleMainMenu: !this.state.visibleMainMenu});
    };

    onShowFilesClick = () => {
        this.setState({visiblePictures: !this.state.visiblePictures});
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
                    <span className="float-right right_icon">
                        <span
                            onClick={this.onShowFilesClick}
                            className="oi oi-file show_files_button"
                        />
                    </span>
                    <hr/>
                </header>

                <MainMenu
                    visible={this.state.visibleMainMenu}
                    user={this.props.user}
                    patients={this.props.patients}
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

                <div className="history_page">
                    {this.props.patient ?
                        <div className="history_title">
                            Медицинская история пациента: { this.props.patient.profile.name }
                        </div>
                    : ''}
                    {this.renderCards()}
                </div>

                {!this.props.patient ?
                    <NavLink to="/add-card" className="btn add_card_link">
                        {this.props.cards && this.props.cards.length === 0 ?
                            <span className="text">Добавить запись</span> :
                            ''
                        }
                        <span className="oi oi-plus" title="icon name" aria-hidden="true" />
                    </NavLink>
                : ''}
            </div>
        );
    }
}