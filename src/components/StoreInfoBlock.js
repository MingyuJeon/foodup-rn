import React, {PureComponent} from 'react';
import {Text, View, TouchableWithoutFeedback} from 'react-native';
import FastImage from 'react-native-fast-image';
import styles from '../styles/CategoryScreen';
import ThumbUp from './ThumbUp';

import hasPromoURL from '../../assets/Foodup_icons/category_screen/icn_promo_red.png';
import noPromoURL from '../../assets/Foodup_icons/category_screen/icn_promo.png';
import hasPickupURL from '../../assets/Foodup_icons/category_screen/icn_pickup_red.png';
import noPickupURL from '../../assets/Foodup_icons/category_screen/icn_pickup.png';
import hasDeliveryURL from '../../assets/Foodup_icons/category_screen/icn_deliver_red.png';
import noDeliveryURL from '../../assets/Foodup_icons/category_screen/icn_deliver.png';

export default class StoreInfoBlock extends PureComponent {
    voteView = () => {
        const {i, store, featuredStoreInfo, from, category, onClickLike, flag} = this.props;
        return (
            <>
                {
                    from === 'Favorite' ? null
                        : featuredStoreInfo && (i === 0) ? null :
                        <ThumbUp
                            storeName={store.name}
                            i={i}
                            onClickLike={() => onClickLike(i)}
                            category={category}
                            flag={flag}
                        />
                }
            </>
        );
    };

    render() {
        const {store, featuredStoreInfo, i, from} = this.props;
        const opts = [store?.promotion ? hasPromoURL : noPromoURL, store?.pickup ? hasPickupURL : noPickupURL, store?.delivery ? hasDeliveryURL : noDeliveryURL];

        return (
            <View style={styles.storeContainer}>
                <View style={{flex: 1, padding: 13}}>
                    <TouchableWithoutFeedback onPress={() => this.props.goToStoreScreen(store)}>
                        <View>
                            <Text allowFontScaling={false} style={styles.storeName}>{store.name.length > 15 ? store.name.substring(0, 14) + '...' : store.name}</Text>
                            <Text allowFontScaling={false} style={styles.storeAddr}>{store.addr}</Text>
                        {
                            from === 'Favorite' ?
                                <View style={{position:'absolute', width: '100%', height: '100%', justifyContent: 'flex-end', alignItems: 'flex-end'}}>
                                    <FastImage
                                        resizeMode={FastImage.resizeMode.contain}
                                        style={{width: 24, height: 24}}
                                        source={require('../../assets/Foodup_icons/favorite_arrowright.png')}
                                    />
                                </View>
                                : null
                        }
                        </View>
                    </TouchableWithoutFeedback>
                    {this.voteView()}
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                        <View style={styles.opt}>
                            {
                                opts.map((opt) =>
                                    <FastImage
                                        key={opt}
                                        resizeMode={FastImage.resizeMode.contain}
                                        style={styles.icn}
                                        source={opt}
                                    />,
                                )
                            }
                        </View>
                        {featuredStoreInfo && (i === 0) || from === 'Favorite' ? null : <Text allowFontScaling={false} style={{color: '#f90631', fontFamily: 'ThecircleB', fontSize: 14}}>{store.count} UP</Text>}
                    </View>
                </View>
            </View>
        );
    }
}
