import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Moment from "react-moment";
import 'moment/locale/ru';

export default class ShortCard extends Component {

    render() {
        const card = this.props.card;

        let complaint = '';
        let tags = '';
        let images;
        let otherFiles;
        let dateFormat;

        if (card.complaint) {
            complaint = card.complaint.length > 130
                ? card.complaint.substring(0,130) + '...'
                : card.complaint
        }

        if (card.tags && card.tags.length > 0) {
            tags = card.tags.map(
                (tag, key) =>
                    <span className='tag' key={key}>
                        #{tag}
                    </span>
            )
        }

        if (card.files.length > 0) {
            images = card.files.map(function (item, key) {
                return ['jpg', 'jpeg', 'png'].includes(item.split('.').pop()) ?
                    <img src={process.env.REACT_APP_API_ADDRESS + '/' + item} key={key} alt=""/>
                    : null;
            }).filter(Boolean);

            otherFiles = card.files.map(function (item, key) {
                return !['jpg', 'jpeg', 'png'].includes(item.split('.').pop()) ?
                    <div key={key}>
                        <span>{item}</span>
                    </div>
                    : null;
            }).filter(Boolean);
        }

        dateFormat = (new Date()).toISOString().substr(0,4) === card.date.substring(0, 4)
            ? "D MMMM"
            : "D MMMM Y";

        return (
            <div>
                <NavLink to={"card/"+card._id}>
                    <div className="card">
                        <div className="row title_row">
                            <div className="col title">
                                <div className="card_id">запись № <span>{card._id}</span></div>
                                <span className="oi oi-calendar" title="icon name" aria-hidden="true" />
                                <Moment format={dateFormat}>{card.date}</Moment>
                            </div>
                            <div className="col type">
                                {card.cardType
                                    ? <span className='cardType'>{card.cardType.title}</span>
                                    : ''}
                                {tags}
                            </div>
                        </div>

                        <div className="description">{complaint}</div>
                        {card.clinic && card.clinic.title ?
                        <div className="visited">
                            <span className="oi oi-home" title="icon name" aria-hidden="true" />
                            { card.clinic.title }
                        </div>
                        : ''}
                        {card.doctor ?
                        <div className="visited">
                            <span className="oi oi-person" title="icon name" aria-hidden="true" />
                            { card.doctor.name + ' ' + card.doctor.surname }
                        </div>
                        : ''}
                        {card.files.length > 0 ?
                        <div className="files">
                            {images}
                            {otherFiles}
                        </div>
                        : ''}
                    </div>
                </NavLink>
            </div>
        );
    }
}
