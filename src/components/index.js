import React, {Component} from 'react';
import Router from '../router';
import SplashScreen from 'react-native-splash-screen';

export default class Components extends Component {
    componentDidMount() {
        SplashScreen.hide();
        /*setTimeout(() => {
            SplashScreen.hide();
        }, 250);*/
    }

    render() {
        return (
            <Router/>
        );
    }

    componentWillUnmount(): void {
        clearTimeout();
    }
}
