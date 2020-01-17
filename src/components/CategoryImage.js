import React from 'react';
import {Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import homeStyles from '../styles/HomeScreen';
import throttle from 'lodash.throttle';
import TouchableScale from 'react-native-touchable-scale';

const CategoryImage = (props) => {
    const {uri, name} = props;

    return (
        <TouchableScale
            hitSlop={{top: 7, right: 7, bottom: 7, left: 7}}
            onPress={throttle(() => props.navigation.navigate('Category', {categoryName: name}), 140)}
            activeScale={0.95}
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
        </TouchableScale>
    );
};

export default CategoryImage;
