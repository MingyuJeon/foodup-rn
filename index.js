/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
/* app.js */
import EStyleSheet from 'react-native-extended-stylesheet';

// always call EStyleSheet.build() even if you don't use global variables!
EStyleSheet.build({
    $themeColor: '#f90631',
    $tagColor: '#cf072a',
    $font: 'ThecircleB',
    $touchableFont: '#0273BA',
});

AppRegistry.registerComponent(appName, () => App);
