import React from 'react';
import {View} from 'react-native';
import _tip from '../../assets/Foodup_icons/store_screen/honeytips_on.png';
import noTip from '../../assets/Foodup_icons/store_screen/honeytips_off.png';
import _delivery from '../../assets/Foodup_icons/store_screen/deliver_on.png';
import noDelivery from '../../assets/Foodup_icons/store_screen/deliver_off.png';
import _pickup from '../../assets/Foodup_icons/store_screen/pickup_on.png';
import noPickup from '../../assets/Foodup_icons/store_screen/pickup_off.png';
import FastImage from 'react-native-fast-image';
import storeStyles from '../styles/StoreScreen';


const Option = (props) => {
    const {promotion, delivery, pickup} = props.storeData;
    return (
        <View style={storeStyles.optionContainer}>
            <View style={{flex:1, width: 72.6, height: 22.6}}>
                <FastImage resizeMode={FastImage.resizeMode.contain} source={promotion ? _tip : noTip} style={storeStyles.option}/>
            </View>
            <View style={{flex:1, width: 72.6, height: 22.6}}>
                <FastImage resizeMode={FastImage.resizeMode.contain} source={delivery ? _delivery : noDelivery} style={storeStyles.option}/>
            </View>
            <View style={{flex:1, width: 72.6, height: 22.6}}>
                <FastImage resizeMode={FastImage.resizeMode.contain} source={pickup ? _pickup : noPickup} style={storeStyles.option}/>
            </View>
        </View>
    );
};

export default Option;
