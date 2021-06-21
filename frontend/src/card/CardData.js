import React, { Component } from "react";
import Moment from 'react-moment';

// import { Document, Page } from 'react-pdf';
// import { pdfjs } from 'react-pdf';
// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default class CardData extends Component {

    getFileTag(filename) {
        let result;

        if (['jpg', 'jpeg', 'png'].includes(filename.split('.').pop())) {
            result = <img src={process.env.REACT_APP_API_ADDRESS + '/' + filename} alt=""/>;
        // } else if(filename.split('.').pop() === 'pdf') {
        //     const pageNumber = 1;
        //     result = <Document file={process.env.REACT_APP_API_ADDRESS + '/' + filename}>
        //         <Page pageNumber={pageNumber} scale='0.5' />
        //     </Document>
        } else {
            result = <a href={process.env.REACT_APP_API_ADDRESS + '/' + filename}>{filename}</a>;
        }
        return result;
    }

    render() {
        const card = this.props.card;

        let tags = '';
        // let files = '';

        if (card.tags && card.tags.length > 0) {
            tags = card.tags.map(
                (tag, key) =>
                    <span className='tag' key={key}>
                        #{tag}
                    </span>
            )
        }

        return (
            <div className="card_page">
                <div className="card_data_box">
                    <div className="row title_elements">
                        <span className="col date">
                            <Moment format="D MMMM">{card.date}</Moment>
                            {/*<Moment format="D MMMM YYYY">{card.date}</Moment>*/}
                        </span>
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
                            Описание
                        </div>
                        <div className="description">{card.complaint}</div>
                    </div>
                    }

                    { card.clinic &&
                    <div className="paragraph">
                        <div className="title">
                            <span className="oi oi-badge" title="icon name" aria-hidden="true" />
                            Обратился
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
                            <span className="oi oi-badge" title="icon name" aria-hidden="true" />
                            Диагноз
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

                    { card.prescriptions &&
                    <div className="paragraph">
                        <div className="title">
                            <span className="oi oi-badge" title="icon name" aria-hidden="true" />
                            Назначения
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
                            Анализы и материалы
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
                            Другие записи
                        </div>
                        <div className="description">
                            { card.notes }
                        </div>
                    </div>
                    }
                </div>

                { card.files.length > 0 &&
                <div className="paragraph">
                    <div className="title">
                        <span className="oi oi-badge" title="icon name" aria-hidden="true" />
                        Файлы
                    </div>
                    {/*<hr />*/}
                    <div className="description">
                        <ul className="pictures_list">
                            {card.files.map(
                                (item, key) => <li key={key}>
                                    {this.getFileTag(item)}
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