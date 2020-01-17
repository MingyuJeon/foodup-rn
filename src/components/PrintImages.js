import React from 'react';
import {Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import storeStyles from '../styles/StoreScreen';
import TouchableScale from 'react-native-touchable-scale';
import throttle from 'lodash.throttle';

const PrintImages = (props) => {
    const {title, imageList, thumbs} = props;
    const temp = thumbs ? thumbs : imageList;
    let trimmedTitle = []

    const trimmer = () => {
        trimmedTitle = [...title.map(item => item.name.split('.').slice(0, -1).join())];
    }
    trimmer();

    const fillItems = () => {
        for(let i = 0; i < 3; i++) {
            if (temp.length < 3) {
                temp.push('');
            }
        }
    }
    fillItems();


    const printTrimmedTitle = (i) => {
        let title;
        if(trimmedTitle[i]) {
            if (trimmedTitle[i].length > 7) {
                title = trimmedTitle[i].substring(0, 6) + '...'
            } else {
                title = trimmedTitle[i]
            }
        }

        return <Text style={storeStyles.imgName}>{title}</Text>
    }

    return (
        <View style={{flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap'}}>
            {
                temp.map((img, i) =>
                    <TouchableScale
                        onPress={throttle(() => {
                            props.navigation.push('ImageGallery', {images: imageList, title, initialIndex: i, flag: props.flag});
                        }, 250)}
                        key={`${img}-${i}`}
                        disabled={!img}
                        activeScale={0.95}
                    >
                        <View style={{flexDirection: 'column', alignItems: 'center', flex: 1, marginBottom: 10}}>
                            <FastImage
                                resizeMode={FastImage.resizeMode.cover}
                                source={{uri: img}}
                                style={storeStyles.imgSize}
                            />
                            {
                                props.flag ? printTrimmedTitle(i) : null
                            }
                        </View>
                    </TouchableScale>,
                )}
        </View>
    );
};

export default PrintImages;
