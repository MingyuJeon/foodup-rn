import React from 'react';
import {View} from 'react-native';
import FastImage from 'react-native-fast-image';
import EStyleSheet from 'react-native-extended-stylesheet';

const StoreImg = ({specialImg}) => {
    return (
        <View
            style={{height: '100%', width: '40%',}}
        >
            {
                specialImg ?
                    <FastImage
                        resizeMode={FastImage.resizeMode.cover}
                        style={styles.storeImg}
                        source={{uri: specialImg}}
                    /> :
                    <View style={{
                        borderBottomLeftRadius: 10,
                        borderTopLeftRadius: 10,
                        backgroundColor: '#e7e7e7'
                    }}>
                        <FastImage
                            resizeMode={FastImage.resizeMode.contain}
                            style={styles.storeImg}
                            source={require('../../assets/Foodup_icons/default_img.png')}
                        />
                    </View>
            }
        </View>
    );
};

const styles = EStyleSheet.create({
    storeContainer: {
        flexDirection: 'row',
        flex:1,
        width: '100%',
        backgroundColor: '#fff',
        height: 100,

        elevation: 2,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {width:0, height: .5},
        shadowOpacity: .3,
        shadowRadius: 2,
    },
    storeImg: {
        width: '100%',
        height: '100%',
        borderBottomLeftRadius: 10,
        borderTopLeftRadius: 10
    }
});

export default StoreImg;
