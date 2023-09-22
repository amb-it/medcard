import React, {Component} from "react";
import {NavLink} from "react-router-dom";
import FadingBalls from "react-cssfx-loading/lib/FadingBalls";
import {FormattedMessage} from "react-intl";

import ShortCard from "./ShortCard";
import MenuButton from "../core/component/MenuButton";
import MainMenu from "./MainMenu";
import EmptyMedicalHistory from "./EmptyMedicalHistory";
import Logo from "../core/component/Logo";

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
        document.querySelector('html').style.overflow = !this.state.visibleMainMenu ? 'hidden' : 'auto';
        this.setState({visibleMainMenu: !this.state.visibleMainMenu});
    };

    componentWillUnmount() {
        document.querySelector('html').style.overflow = 'auto';
    }

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
                    <span className="menu_button_box">
                        <MenuButton
                            handleClick={this.onMenuButtonClick}
                            visibleMenu={this.state.visibleMainMenu}
                        />
                        <Logo />
                    </span>
                    {
                        !this.state.visibleSearchInput && !this.state.visibleMainMenu ?
                            <span className="float-right right_icon">
                                <span
                                    onClick={this.onSearchButtonClick}
                                    className="oi oi-magnifying-glass search_button"
                                />
                            </span>
                            : ""
                    }
                    {
                        !this.state.visibleMainMenu ?
                            <span className="float-right right_icon">
                                <span
                                    onClick={this.onShowFilesClick}
                                    className="oi oi-file show_files_button"
                                />
                            </span>
                        : ""
                    }
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
                            <FormattedMessage id="history.title" defaultMessage="Patient medical history" />: { this.props.patient.profile.name }
                        </div>
                    :
                        <NavLink to="/add-card">
                            <div className="card">
                                <div className="add_card">
                                    <span className="oi oi-plus" title="icon name" aria-hidden="true" />
                                    <FormattedMessage id="history.add-entry" defaultMessage="Add entry" />
                                </div>
                            </div>
                        </NavLink>
                    }
                    {this.renderCards()}
                </div>
            </div>
        );
    }
}