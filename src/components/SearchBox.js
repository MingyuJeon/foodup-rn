import React from 'react';
import {TextInput, View, KeyboardAvoidingView} from 'react-native';
import {connectSearchBox} from 'react-instantsearch-native';
import searchIcon from '../../assets/Foodup_icons/searchbar_smallicon.png';
import FastImage from 'react-native-fast-image';

const SearchBox = connectSearchBox(({refine, currentRefinement, _presKey}, props) => {
    return (
        <View
            style={{
                flexDirection: 'row',
                backgroundColor: '#f90631',
                padding: 10,
            }}
        >
            <View style={styles.iconWrapper}>
                <FastImage
                    resizeMode={FastImage.resizeMode.contain}
                    style={styles.searchIcon}
                    source={searchIcon}
                />
            </View>
            <TextInput
                style={styles.input}
                placeholder="한식, 짜장면, 양식, 강호동 백정..."
                returnKeyType={'search'}
                onChangeText={value => refine(value)}
                underlineColorAndroid="transparent"
                clearButtonMode={'always'}
                value={currentRefinement}
                autoFocus={false}
            />
        </View>
    );
});

const styles = {
    searchSection: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 5,
        height: 50,
    },
    searchIcon: {
        flex: 1
    },
    iconWrapper: {
        width: 25,
        backgroundColor: '#fff',
        paddingLeft: 10,
        borderBottomLeftRadius: 5,
        borderTopLeftRadius: 5,
    },
    input: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff',
        borderBottomRightRadius: 5,
        borderTopRightRadius: 5,
        color: '#424242',
    },
};
export default SearchBox;
