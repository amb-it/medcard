import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Moment from 'react-moment';

import CardMenu from "./CardMenu";
import MenuButton from "../core/component/MenuButton";

import withLoadingScreen from "../core/withLoadingScreen";

class Card extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            visibleMenu: false,
            card: this.props.getCardById(this.props.match.params.id)
        };
    }

    onMenuButtonClick = () => {
        this.setState({ visibleMenu: !this.state.visibleMenu });
    };

    deleteCard = () => {
        this.props.deleteCard(this.state.card._id);
        this.props.history.push("/");
    };

    render() {
        const card = this.state.card;

        return (
            <div className="container">
                <header>
                    <NavLink to="/" className="btn menu_button">
                        <span className="oi oi-caret-left" title="icon name" aria-hidden="true" />
                    </NavLink>
                    <span className="card_page_title">Card &nbsp; № {card._id}</span>
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
                    deleteCard={this.deleteCard}
                />

                <div className="card_page">
                    <div className="title_elements">
                        <span className="date">
                            <Moment format="D MMMM YYYY">{card.date}</Moment>
                        </span>
                        <span className="float-right type">{card.cardType ? card.cardType.title : ''}</span>
                    </div>

                    { card.complaint &&
                        <div className="paragraph">
                            <div className="title">Complaint</div>
                            <div className="description">{card.complaint}</div>
                        </div>
                    }

                    { card.clinic &&
                        <div className="paragraph">
                            <div className="title">Visited</div>
                            <div className="description">
                                { card.clinic.title ? card.clinic.title : ''}
                                { card.clinic.address && <span className="float-right">({card.clinic.address})</span> }
                            </div>
                            { card.clinicDepartment &&
                                <div className="description">
                                    { card.clinicDepartment.title ? card.clinicDepartment.title : ''}
                                    { card.clinicDepartment.address &&
                                        <span className="float-right">({card.clinicDepartment.address})</span>
                                    }
                                </div>
                            }
                            { card.doctor &&
                                <div className="description">
                                    <div>-</div>
                                    { card.doctor.surname ? card.doctor.surname : ''}&nbsp;
                                    { card.doctor.name ? card.doctor.name : ''}
                                </div>
                            }
                        </div>
                    }

                    { card.diagnoses &&
                        <div className="paragraph">
                            <div className="title">Diagnose</div>
                            <div className="description">
                                { card.diagnoses }
                                {/*<ul>*/}
                                {/*    {card.diagnose.map(*/}
                                {/*        (item, key) => <li key={key}>{item.title}</li>*/}
                                {/*    )}*/}
                                {/*</ul>*/}
                            </div>
                        </div>
                    }

                    { card.materials &&
                        <div className="paragraph">
                            <div className="title">Materials and Analysis</div>
                            <div className="description">
                                { card.materials }
                            </div>
                        </div>
                    }

                    { card.prescriptions &&
                        <div className="paragraph">
                            <div className="title">Prescriptions</div>
                            <div className="description">
                                { card.prescriptions }
                            </div>
                        </div>
                    }

                    { card.notes &&
                        <div className="paragraph">
                            <div className="title">Notes</div>
                            <div className="description">
                                { card.notes }
                            </div>
                        </div>
                    }
                    
                    { card.files.length > 0 &&
                    <div className="paragraph">
                        <div className="title">Materials</div>
                        <div className="description">
                            <ul className="pictures_list">
                                {card.files.map(
                                    (item, key) => <li key={key}>
                                        <img src={process.env.REACT_APP_API_ADDRESS + '/' + item} alt=""/>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                    }

                </div>

            </div>
        );
    }
}

// todo: need it ?
export default withLoadingScreen(Card);