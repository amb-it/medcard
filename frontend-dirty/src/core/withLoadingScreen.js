import * as React from "react";
import Dots from 'react-activity/lib/Dots';
import 'react-activity/lib/Dots/Dots.css';

const withLoadingScreen = WrappedComponent => {
    return class LoadingScreen extends React.Component {
        render() {
            if (this.props.loading) return <Dots />
            return <WrappedComponent {...this.props} />;
        }
    };
};

export default withLoadingScreen;