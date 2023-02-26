import React, {Component} from "react";
import {NavLink, Redirect} from "react-router-dom";
import Logo from "../core/component/Logo";

export default class Landing extends Component {

    render() {
        return this.props.user
            ? <Redirect to={{
                pathname: '/history',
                state: { from: this.props.location }
            }} />
            : (
            <div className="container">
                <header>
                    <span className="menu_button_box">
                        <Logo />
                    </span>
                </header>

                <div className="landing_page">
                    <h1>Твоя онлайн медицинская карточка</h1>
                    <div className="screenshots">
                        <video height="280" loop={true} autoPlay={true} muted={true}>
                            <source src={process.env.REACT_APP_API_ADDRESS + '/video_shot_1.mp4'} type="video/mp4" />
                        </video>
                        {/*<img src={process.env.REACT_APP_API_ADDRESS + '/screenshot_1.png'} />*/}
                        {/*<img src={process.env.REACT_APP_API_ADDRESS + '/screenshot_2.png'} />*/}
                        {/*<img src={process.env.REACT_APP_API_ADDRESS + '/screenshot_3.png'} />*/}
                    </div>
                    <div>
                        <NavLink to={"history"} className="btn btn-success">начать пользоваться</NavLink>
                    </div>
                    <h2>или если Вы - доктор</h2>
                    <div>
                        <NavLink to={"patient/authenticate"} className="btn btn-outline-success">посмотреть карту пациента</NavLink>
                    </div>
                </div>

            </div>
            );
    }
}