import React from 'react';
import {View, Text} from 'react-native';
import storeStyles from '../styles/StoreScreen';
import FastImage from 'react-native-fast-image';

const StoreDetailTitle = (props) => {
    return (
        <View style={storeStyles.infoTitleWrapper}>
            {
                props.img ?
                    <FastImage
                        resizeMode={FastImage.resizeMode.contain}
                        style={{width: 23, height: 23, marginRight: 5}}
                        source={props.img}
                    /> : null
            }
            <Text style={storeStyles.infoTitle}>
                {props.children}
            </Text>
        </View>
    );
};

export default StoreDetailTitle;
