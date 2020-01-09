import React from 'react';
import {View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import StoreImg from './StoreImg';
import StoreInfoBlock from './StoreInfoBlock';
import Medal from './Medal';
import TouchableScale from 'react-native-touchable-scale';

const StoreItem = ({i, store, featuredStoreInfo, onClickLike, category, from, goToStoreScreen, flag}) => {
    const renderMedal = () => {
        if (i < 4) {
            return (
                <Medal i={i} featuredStore={!!featuredStoreInfo} storeName={store.name}/>
            );
        }
    };

    let temp = store.hasOwnProperty('thumb') ? store.thumb.best[0] : (store.hasOwnProperty('normalPhotoList') ? store.normalPhotoList[0] : store.specialImg);
    return (
        <TouchableScale onPress={() => goToStoreScreen(store)} activeScale={0.95}>
            <View style={styles.container}>
                {store.hasOwnProperty('thumb') || store.hasOwnProperty('specialImg') && from !== 'Favorite' ? renderMedal() : null }
                <StoreImg specialImg={temp}/>
                <StoreInfoBlock
                    i={i}
                    store={store}
                    // goToStoreScreen={() => goToStoreScreen(store)}
                    featuredStoreInfo={featuredStoreInfo}
                    onClickLike={() => onClickLike(i)}
                    category={category}
                    from={from}
                    flag={flag}
                />
            </View>
        </TouchableScale>
    );
};

const styles = EStyleSheet.create({
    container: {
        flexDirection: 'row',
        flex: 1,
        backgroundColor: '#fff',
        height: 100,

        elevation: 2,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: .5},
        shadowOpacity: .3,
        shadowRadius: 2,
    },
});

export default StoreItem;
