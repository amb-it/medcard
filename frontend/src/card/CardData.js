import React, { Component } from "react";
import {FormattedMessage, FormattedDate} from "react-intl";

// import { Document, Page } from 'react-pdf';
// import { pdfjs } from 'react-pdf';
// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default class CardData extends Component {

    // getFileTag(filename) {
    //     let result;
    //
    //     if (['jpg', 'jpeg', 'png'].includes(filename.split('.').pop())) {
    //         result = <img src={process.env.REACT_APP_API_ADDRESS + '/' + filename} alt=""/>;
    //     } else if(filename.split('.').pop() === 'pdf') {
    //         const pageNumber = 1;
    //         result = <Document file={process.env.REACT_APP_API_ADDRESS + '/' + filename}>
    //             <Page pageNumber={pageNumber} scale='0.5' />
    //         </Document>
    //     } else {
    //         result = <a href={process.env.REACT_APP_API_ADDRESS + '/' + filename}>{filename}</a>;
    //     }
    //     return result;
    // }

    render() {
        const card = this.props.card;

        let tags = '';
        let images;
        let otherFiles;

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
                        <a href={process.env.REACT_APP_API_ADDRESS + '/' + item}>{item} &nbsp;&nbsp;<span className="oi oi-fullscreen-enter" title="icon name" aria-hidden="true" /></a>
                    </div>
                    : null;
            }).filter(Boolean);
        }

        let formattedDate = (new Date()).toISOString().substring(0,4) === card.date.substring(0, 4)
            ? <FormattedDate value={card.date} month="long" day="numeric" />
            : <FormattedDate value={card.date} month="long" day="numeric" year="numeric" />;

        return (
            <div className="card_data">
                <div className="card_data_box">
                    <div className="row title_elements">
                        <span className="col date">{formattedDate}</span>
                        <span className="col type">
                            <div className="cardType">
                                {card.cardType ? card.cardType.title : ''}
                            </div>
                            {tags}
                        </span>
                    </div>

                    { card.complaint &&
                    <div className="paragraph">
                        <div className="title">
                            <span className="oi oi-badge" title="icon name" aria-hidden="true" />
                            <FormattedMessage id="card.description" defaultMessage="Description" />
                        </div>
                        <div className="description">{card.complaint}</div>
                    </div>
                    }

                    { card.clinic &&
                    <div className="paragraph">
                        <div className="title">
                            <span className="oi oi-badge" title="icon name" aria-hidden="true" />
                            <FormattedMessage id="card.visited" defaultMessage="Visited" />
                            {/*Обратился*/}
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
                    </div>
                    }

                    { card.doctor &&
                    <div className="paragraph">
                        <div className="title">
                            <span className="oi oi-badge" title="icon name" aria-hidden="true" />
                            <FormattedMessage id="card.doctor" defaultMessage="Doctor" />
                            {/*Врач*/}
                        </div>
                        <div className="description">
                            { card.doctor.specialization ? <small>{card.doctor.specialization} &nbsp;</small> : ''}
                            { card.doctor.name ? card.doctor.name : ''}
                        </div>
                    </div>
                    }

                    { card.diagnoses &&
                    <div className="paragraph">
                        <div className="title">
                            <span className="oi oi-badge" title="icon name" aria-hidden="true" />
                            <FormattedMessage id="card.diagnoses" defaultMessage="Diagnoses" />
                            {/*Диагноз*/}
                        </div>
                        <div className="description">
                            { card.diagnoses }
                        </div>
                    </div>
                    }

                    { card.prescriptions &&
                    <div className="paragraph">
                        <div className="title">
                            <span className="oi oi-badge" title="icon name" aria-hidden="true" />
                            <FormattedMessage id="card.prescriptions" defaultMessage="Prescriptions" />
                            {/*Назначения*/}
                        </div>
                        <div className="description">
                            { card.prescriptions }
                        </div>
                    </div>
                    }

                    { card.materials &&
                    <div className="paragraph">
                        <div className="title">
                            <span className="oi oi-badge" title="icon name" aria-hidden="true" />
                            <FormattedMessage id="card.analysis" defaultMessage="Analysis" />
                            {/*Анализы и материалы*/}
                        </div>
                        <div className="description">
                            { card.materials }
                        </div>
                    </div>
                    }

                    { card.notes &&
                    <div className="paragraph">
                        <div className="title">
                            <span className="oi oi-badge" title="icon name" aria-hidden="true" />
                            <FormattedMessage id="card.notes" defaultMessage="Notes" />
                            {/*Другие записи*/}
                        </div>
                        <div className="description">
                            { card.notes }
                        </div>
                    </div>
                    }
                </div>

                { card.files.length > 0 &&
                <div className="paragraph">
                    <div className="title files_title">
                        <span className="oi oi-badge" title="icon name" aria-hidden="true" />
                        <FormattedMessage id="card.files" defaultMessage="Files" />
                        {/*Файлы*/}
                    </div>
                    <div className="description">
                        <ul className="pictures_list">
                            {images}
                            {otherFiles}
                        </ul>
                    </div>
                </div>
                }

            </div>
        );
    }
}