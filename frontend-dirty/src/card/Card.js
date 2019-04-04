import React, { Component } from "react";
import {NavLink} from "react-router-dom";

import withLoadingScreen from "../core/withLoadingScreen";

class Card extends Component {
    render() {
        const card = this.props.card;

        return (
            <div className="container">
                <header>
                    <NavLink to="/" className="btn menu-button">
                        <span className="oi oi-caret-left" title="icon name" aria-hidden="true"></span>
                    </NavLink>
                    <span className="card-title">Card &nbsp; #{card.id}</span>
                    <span className="oi oi-menu float-right float-right right-icon"></span>
                    <hr/>
                </header>


                <div className="pagecard">
                    <div className="title-elements">
                        <span>{card.date.substring(0,10)}</span>
                        <span className="float-right type">{card.cardType.title}</span>
                    </div>

                    <div className="parargaph">
                        <div className="title">Complaint</div>
                        <div className="description">{card.complaint}</div>
                    </div>

                    <div className="parargaph">
                        <div className="title">Visited</div>
                        <div className="description">
                            {card.visited.clinic.title} <span className="float-right">({card.visited.clinic.address})</span>
                            <br/>
                            <p>{card.visited.clinic.district}</p>
                            <p>{card.visited.doctor.title}</p>
                        </div>
                    </div>

                    <div className="parargaph">
                        <div className="title">Diagnose</div>
                        <div className="description">
                            <ul>
                                {card.diagnose.map(
                                    (item) => <li>{item.title}</li>
                                )}
                            </ul>
                        </div>
                    </div>

                    <div className="parargaph">
                        <div className="title">Materials and Analysis</div>
                        <div className="description">
                            <ul>
                                {card.materials.map(
                                    (item) => <li>{item.title}</li>
                                )}
                            </ul>
                        </div>
                    </div>

                </div>

            </div>
        );
    }
}

export default withLoadingScreen(Card);