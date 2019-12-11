/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {Root} from 'native-base';

import Components from './src/components';
import SplashScreen from 'react-native-splash-screen';

const App = () => {
    const splashScreen = () => {
        setTimeout(() => {
            SplashScreen.hide();
        }, 250);
    };
    splashScreen();
    return (
        <Root>
            <Components/>
        </Root>
    );
};

export default App;
