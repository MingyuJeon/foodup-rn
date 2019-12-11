import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import storeStyles from '../styles/StoreScreen';
import TouchableScale from 'react-native-touchable-scale';

const PrintImages = (props) => {
    const {title, imageList, thumbs} = props;
    const temp = thumbs ? thumbs : imageList;
    let trimmedTitle = []

    const trimmer = () => {
        trimmedTitle = [...title.map(item => item.name.split('.').slice(0, -1).join())];
    }

    const fillItems = () => {
        for(let i = 0; i < 3; i++) {
            if (temp.length < 3) {
                temp.push('');
            }
        }
    }

    trimmer();
    fillItems();

    return (
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            {
                temp.map((img, i) =>
                    <TouchableScale
                        onPress={() => {
                            props.navigation.push('ImageGallery', {images: imageList, title, initialIndex: i, flag: props.flag});
                        }}
                        key={`${img}-${i}`}
                        disabled={!img}
                        activeScale={0.95}
                    >
                        <View style={{flexDirection: 'column', alignItems: 'center', flex: 1}}>
                            <FastImage
                                resizeMode={FastImage.resizeMode.cover}
                                source={{uri: img}}
                                style={storeStyles.imgSize}
                            />
                            {
                                props.flag ? <Text style={storeStyles.imgName}>{trimmedTitle[i] !== undefined ? trimmedTitle[i].length > 6 ? trimmedTitle[i].substring(0, 6) + '...' : trimmedTitle[i] :null}</Text> : null
                            }
                        </View>
                    </TouchableScale>,
                )}
        </View>
    );
};

export default PrintImages;
