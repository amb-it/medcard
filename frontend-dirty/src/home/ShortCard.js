import React, { Component } from "react";

export default class ShortCard extends Component {

    render() {
        const card = this.props.card;

        return (
            <div className="card">
                <div className="row">
                    <div className="col date">{card.date.substring(0,10)} <div className="card-id"># {card.id}</div></div>
                    <div className="col type">{card.cardType.title}</div>
                </div>

                <div className="description">{card.complaint.substring(0,90) + '...'}</div>
                <div className="hospital">
                    {card.visited.clinic.title}
                    {/*<span className="oi oi-map" title="icon name" aria-hidden="true"></span>*/}
                </div>
            </div>
        );
    }
}
