import React, { Component } from "react";
import {NavLink} from "react-router-dom";

import withLoadingScreen from "../core/withLoadingScreen";

class Card extends Component {
    render() {
        const card = this.props.card;

        const pictureListStyle = {
            listStyle: 'none'
        };
        const pictureStyle = {
            width: '100%',
            marginBottom: '30px'
        };

        return (
            <div className="container">
                <header>
                    <NavLink to="/" className="btn menu-button">
                        <span className="oi oi-caret-left" title="icon name" aria-hidden="true"></span>
                    </NavLink>
                    <span className="card-page-title">Card &nbsp; № {card._id}</span>
                    <span className="oi oi-menu float-right float-right right-icon"></span>
                    <hr/>
                </header>


                <div className="card-page">
                    <div className="title-elements">
                        <span>{card.date.substring(0,10)}</span>
                        <span className="float-right type">{card.cardType ? card.cardType.title : ''}</span>
                    </div>

                    { card.complaint &&
                        <div className="parargaph">
                            <div className="title">Complaint</div>
                            <div className="description">{card.complaint}</div>
                        </div>
                    }

                    { card.clinic &&
                        <div className="parargaph">
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
                        <div className="parargaph">
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
                        <div className="parargaph">
                            <div className="title">Materials and Analysis</div>
                            <div className="description">
                                { card.materials }
                            </div>
                        </div>
                    }

                    { card.prescriptions &&
                        <div className="parargaph">
                            <div className="title">Prescriptions</div>
                            <div className="description">
                                { card.prescriptions }
                            </div>
                        </div>
                    }

                    { card.notes &&
                        <div className="parargaph">
                            <div className="title">Notes</div>
                            <div className="description">
                                { card.notes }
                            </div>
                        </div>
                    }
                    
                    { card.files &&
                    <div className="parargaph">
                        <div className="title">Materials</div>
                        <div className="description">
                            <ul style={pictureListStyle}>
                                {card.files.map(
                                    (item, key) => <li key={key}>
                                        <img src={'http://localhost:8080/' + item} alt="" style={pictureStyle} />
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                    }
                    <hr />

                </div>

            </div>
        );
    }
}

export default withLoadingScreen(Card);