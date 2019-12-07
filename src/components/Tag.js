import React from 'react';
import {View, TouchableWithoutFeedback, Text} from 'react-native';
import storeStyles from '../styles/StoreScreen';
const Tag = ({tag, goToCategory, from}) => {
    return (
        <TouchableWithoutFeedback onPress={() => goToCategory(tag)}>
            <View style={storeStyles.tagContainer}>
                <Text allowFontScaling={false} style={storeStyles.tag}>{tag}</Text>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default Tag;










/*
import React, {Component, Fragment} from 'react';
import {Text, TouchableWithoutFeedback, View} from 'react-native';
import style from "../styles/restaurantDetailStyle";

const styles = {
    tag: {
        borderTopStartRadius: 15,
        borderTopEndRadius: 15,
        borderBottomStartRadius: 15,
        borderBottomEndRadius: 15,
        borderColor: '#cf072a',
        borderWidth: 1,
        paddingTop: 5,
        paddingLeft: 8,
        paddingBottom: 5,
        paddingRight: 8,
        backgroundColor: '#cf072a',
        marginTop: 10,
        marginRight: 10
    }
}
export default class Tags extends Component {

    tagClicked = (tag) => {
        this.props.navigation.push('RestaurantList', {categoryName: tag});
        this.props.tagClick(tag);
    }

    render() {
        const {tag} = this.props;

        return (
            <TouchableWithoutFeedback onPress={() => this.tagClicked(tag)}
                                      hitSlop={{top: 7, right: 7, bottom: 7, left: 7}}>
                <View style={styles.tagStyle}>
                    <Text allowFontScaling={false} style={style.tag}>{tag}</Text>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}*/
