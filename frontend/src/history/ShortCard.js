import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import {FormattedMessage, FormattedDate} from "react-intl";

export default class ShortCard extends Component {

    render() {
        const card = this.props.card;
        const user = this.props.user;

        let complaint = '';
        let tags = '';
        let images;
        let otherFiles;

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
                if (['jpg', 'jpeg', 'png'].includes(item.split('.').pop())) {
                    return item;
                }
            }).filter(Boolean); // to filter empty element
            otherFiles = card.files.map(function (item, key) {
                if (!['jpg', 'jpeg', 'png'].includes(item.split('.').pop())) {
                    return item;
                }
            }).filter(Boolean);

            if (this.props.visiblePictures) {
                images = images.map(function (item, key) {
                    return <img src={process.env.REACT_APP_API_ADDRESS + '/' + user._id + '/' + item} key={key} alt=""/>
                });
                otherFiles = otherFiles.map(function (item, key) {
                    return <div key={key}><span>{item}</span></div>
                });
            } else {
                images = images.map(function (item, key) {
                    return <span className="oi oi-image" key={key} title="icon name" aria-hidden="true" />
                });
                otherFiles = otherFiles.map(function (item, key) {
                    return <span className="oi oi-file" key={key} title="icon name" aria-hidden="true" />
                });
            }
        }

        let formattedDate = (new Date()).toISOString().substring(0,4) === card.date.substring(0, 4)
            ? <FormattedDate value={card.date} month="long" day="numeric" />
            : <FormattedDate value={card.date} month="long" day="numeric" year="numeric" />;

        return (
            <div>
                <NavLink to={"card/"+card._id}>
                    <div className="card" id={"card_"+card._id}>
                        <div className="row title_row">
                            <div className="col title">
                                <div className="card_id">
                                    <FormattedMessage id="history.note" defaultMessage="note" /> № <span>{card._id}</span>
                                </div>
                                <span className="oi oi-calendar" title="icon name" aria-hidden="true" />
                                <span className="date">{formattedDate}</span>
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
                            { card.doctor.specialization ?
                                <small>{ card.doctor.specialization } </small>
                                : ''}
                            { card.doctor.name }
                        </div>
                        : ''}
                        {card.files.length > 0 ?
                        <div className="files">
                            {images}
                            {otherFiles}
                        </div>
                        : ''}
                        <div className="enter_card_icon">
                            <span className="float-right oi oi-fullscreen-enter" />
                        </div>
                    </div>
                </NavLink>
            </div>
        );
    }
}
