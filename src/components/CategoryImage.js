import React from 'react';
import {Text, TouchableWithoutFeedback, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import homeStyles from '../styles/HomeScreen';

const CategoryImage = (props) => {
    const {uri, name} = props;

    return (
        <TouchableWithoutFeedback
            hitSlop={{top: 7, right: 7, bottom: 7, left: 7}}
            activeOpacity={.5}
            onPress={() => props.goCategory(name)}
        >
            <View style={homeStyles.categoryImageCard}>
                <FastImage
                    resizeMode={FastImage.resizeMode.contain}
                    style={{
                        height: 70,
                        width: 70,
                    }}
                    source={{
                        uri,
                    }}
                />
                    <Text allowFontScaling={false}
                          style={{textAlign: 'center', fontFamily: 'ThecircleB'}}>{name}</Text>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default CategoryImage;
