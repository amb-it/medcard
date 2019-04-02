import React, { Component } from "react";

export default class Card extends Component {
    render() {
        console.log(this.props.card);
        return (
            <div className="container">
                <header>
                    <span className="btn menu-button">
                        <span className="oi oi-caret-left" title="icon name" aria-hidden="true"></span>
                    </span>
                    <span className="card-title">Card № 124</span>
                    <span className="oi oi-menu float-right float-right right-icon"></span>
                    <hr />
                </header>


                <div className="pagecard">
                    <div className="title-elements">
                        <span>24 April</span>
                        <span className="float-right type">Tooth</span>
                    </div>

                    <div className="parargaph">
                        <div className="title">Complaint</div>
                        <div className="description">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
                            been the industry's standard dummy text ever since the 1500s.
                            <br/>
                            At 12-00 when an unknown printer took a galley of type and scrambled it to make a type
                            specimen book. It has survived not only five centuries.
                        </div>
                    </div>

                    <div className="parargaph">
                        <div className="title">Visited</div>
                        <div className="description">
                            Astra Dental Clinic <span className="float-right">(Kiev, Peremohy ave, 143)</span>
                            <br/>
                            <p>Face Surgery</p>
                            <p>Dr. Sergei Prihodko</p>
                        </div>
                    </div>

                    <div className="parargaph">
                        <div className="title">Diagnose</div>
                        <div className="description">
                            <ul>
                                <li>2 upper left - carries</li>
                                <li>4 upper rigth - carries</li>
                                <li>inflammation in 3 bottom left root</li>
                            </ul>
                        </div>
                    </div>

                    <div className="parargaph">
                        <div className="title">Materials and Analysis</div>
                        <div className="description">
                            <ul>
                                <li>Rentgen</li>
                                <li>blood IR/AR</li>
                            </ul>
                        </div>
                    </div>

                </div>

            </div>
        );
    }
}
