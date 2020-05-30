import React, { Component } from "react";
import Moment from 'react-moment';


export default class CardData extends Component {

    render() {
        const card = this.props.card;

        return (
            <div className="card_page">
                <div className="title_elements">
                    <span className="date">
                        <Moment format="D MMMM">{card.date}</Moment>
                        {/*<Moment format="D MMMM YYYY">{card.date}</Moment>*/}
                    </span>
                    <span className="float-right type">{card.cardType ? card.cardType.title : ''}</span>
                </div>

                { card.complaint &&
                <div className="paragraph">
                    <div className="title">
                        <span className="oi oi-pin" title="icon name" aria-hidden="true" />
                        Complaint
                    </div>
                    <div className="description">{card.complaint}</div>
                </div>
                }

                { card.clinic &&
                <div className="paragraph">
                    <div className="title">
                        <span className="oi oi-pin" title="icon name" aria-hidden="true" />
                        Visited
                    </div>
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
                    <div className="title">
                        <span className="oi oi-pin" title="icon name" aria-hidden="true" />
                        Diagnose
                    </div>
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
                    <div className="title">
                        <span className="oi oi-pin" title="icon name" aria-hidden="true" />
                        Materials and Analysis
                    </div>
                    <div className="description">
                        { card.materials }
                    </div>
                </div>
                }

                { card.prescriptions &&
                <div className="paragraph">
                    <div className="title">
                        <span className="oi oi-pin" title="icon name" aria-hidden="true" />
                        Prescriptions
                    </div>
                    <div className="description">
                        { card.prescriptions }
                    </div>
                </div>
                }

                { card.notes &&
                <div className="paragraph">
                    <div className="title">
                        <span className="oi oi-pin" title="icon name" aria-hidden="true" />
                        Notes
                    </div>
                    <div className="description">
                        { card.notes }
                    </div>
                </div>
                }

                { card.files.length > 0 &&
                <div className="paragraph">
                    <div className="title">
                        <span className="oi oi-pin" title="icon name" aria-hidden="true" />
                        Files
                    </div>
                    <hr />
                    <div className="description">
                        <ul className="pictures_list">
                            {card.files.map(
                                (item, key) => <li key={key}>
                                    <img src={process.env.REACT_APP_API_ADDRESS + '/' + item} alt=""/>
                                    <hr />
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
                }

            </div>
        );
    }
}