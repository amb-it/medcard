import React, { Component } from "react";

import ShortCard from "./ShortCard";


export default class Home extends Component {
    render() {
        return (
            <div>
                <header>
                    <span className="btn menu-button">
                        {/*<span className="oi oi-menu" title="icon name" aria-hidden="true"></span>*/}
                        <span>=</span>
                        <span className="logo">MedCard</span>
                    </span>
                    {/*<span className="oi oi-magnifying-glass float-right search-magnifier"></span>*/}
                    <span className="float-right search-magnifier">search</span>
                    <hr />
                </header>


                <div className="cards">
                    <ShortCard/>
                    {/*<div className="card">*/}
                        {/*<div className="row">*/}
                            {/*<div className="col date">24 April <div className="card-id">#124</div></div>*/}
                            {/*<div className="col type">Tooth</div>*/}
                        {/*</div>*/}

                        {/*<div className="description">Had a toothache. Approximately fourth upper. Ache was for 2 days*/}
                            {/*...*/}
                        {/*</div>*/}
                        {/*<div className="hospital">*/}
                            {/*Astra Dental hospital*/}
                            {/*/!*<span className="oi oi-map" title="icon name" aria-hidden="true"></span>*!/*/}
                        {/*</div>*/}
                    {/*</div>*/}
                </div>

                <a className="add-card-link">
                    <span>+</span>
                </a>
            </div>
        );
    }
}