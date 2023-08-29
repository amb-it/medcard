import React, { Component } from "react";
import { NavLink } from "react-router-dom";
// import Dots from 'react-activity/lib/Dots';

import CardData from "./CardData";
import Dots from "react-activity/lib/Dots";


export default class PatientCard extends Component {

    render() {
        const card = this.props.card;

        return (
            <div className="container card_page">
                <header>
                    <NavLink to={"/patient/"+this.props.patient._id+"/history"} className="btn menu_button">
                        <span className="oi oi-caret-left" title="icon name" aria-hidden="true" />
                    </NavLink>
                    <span className="page_title">Запись &nbsp; № {card._id}</span>
                    <hr/>
                </header>

                { card
                    ? <CardData card={card} />
                    : <Dots size={32} />
                }

            </div>
        );
    }
}
