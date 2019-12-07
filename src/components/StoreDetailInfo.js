import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';

const StoreDetailInfo = (props) => {
    return (
        <View style={{flexDirection: 'row', marginBottom: 5, alignItems: 'center'}}>
                <FastImage resizeMode={FastImage.resizeMode.contain}
                           source={props.img}
                           style={{width: 20, height: 20, marginRight: 5, alignSelf: 'flex-start'}}
                />
            {
                props.action !== null ?
                    <TouchableOpacity onPress={() => props.action()} activeOpacity={0.7}>
                        <View>{props.children}</View>
                    </TouchableOpacity>
                    : <View>{props.children}</View>

            }
        </View>
    );
};

export default StoreDetailInfo;
