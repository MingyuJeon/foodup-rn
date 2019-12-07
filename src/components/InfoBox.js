import React from 'react';
import {View} from 'react-native';
import storeStyles from '../styles/StoreScreen';
const InfoBox = (props) => {
    return (
        <View style={storeStyles.infoBox}>
            {props.children}
        </View>
    );
};

export default InfoBox;
