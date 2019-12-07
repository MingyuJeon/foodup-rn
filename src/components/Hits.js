// First, we need to import the FlatList and other React Native component
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
// We also need to add the connectInfiniteHits connector to our import
import {connectInfiniteHits} from 'react-instantsearch-native';
import React, {Component, Fragment} from 'react';
import FastImage from 'react-native-fast-image';
import _ from "lodash";

import storeIcn from '../../assets/Foodup_icons/search_restaurants.png';
import categoryIcn from '../../assets/Foodup_icons/sharp.png';

const styles = {
    separator: {
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: 'rgb(251, 251, 251)',
        padding: 10
    }
}

class Hits extends Component {
    goToDetail = (name) => {
        this.props.router.navigate('Category', {storeName: name});
        // this.props.moveToDetail(name)
    };

    goToList = (name) => {
        this.props.router.navigate('Category', {categoryName: name});
        // this.props.moveToList(name)
    };

    onEndReached = () => {
        const {hasMore, refine} = this.props;
        hasMore ? refine() : null;
    };

    searchListRender = (item) => {
        return (
            <TouchableOpacity
                onPress={() => item.city ? this.goToDetail(item.name) : this.goToList(item.name)}
                style={styles.separator}
            >
                <View style={{flexDirection: 'row'}}>
                    <FastImage
                        source={ item.city ? storeIcn : categoryIcn }
                    />
                    <Text allowFontScaling={false} style={{marginLeft: 10, alignSelf: 'center'}}>{item.name}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    render() {
        const {hits} = this.props;
        let imgUrl;
        const result = hits.filter(item => item.hide === false);

        return (
            <FlatList
                data={result}
                onEndReached={this.onEndReached}
                keyExtractor={(item, index) => index.toString()}
                keyboardShouldPersistTaps={'handled'}
                renderItem={({item}) => this.searchListRender(item, imgUrl)}
            />
        )
    }
}

export default connectInfiniteHits(Hits);
