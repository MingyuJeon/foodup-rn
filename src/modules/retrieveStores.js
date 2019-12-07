import React from 'react';
import {Dimensions} from 'react-native';
import {fetchMore} from '../api/categoryApi';
import {Toast} from "native-base";

const retrieveStores = async (nativeEvent, lastVisible) => {
    const windowHeight = Dimensions.get('window').height,
        height = nativeEvent.contentSize.height,
        offset = nativeEvent.contentOffset.y;
    if ((windowHeight + offset >= height) && offset >= 0) {
        if (lastVisible) {
            return true;
        } else {
            return Toast.show({
                text: '더 이상 상점이 없습니다!',
            });
        }
    }
};

export default retrieveStores;
