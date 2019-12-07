import React from 'react';
import {View} from 'react-native';
import homeStyles from '../styles/HomeScreen';
import FastImage from 'react-native-fast-image';
import categoryStyles from '../styles/CategoryScreen';

const FeaturedCategoryImage = ({categoryInfo}) => {
        return (<View style={homeStyles.categoryImageCard}>
            {
                categoryInfo?.url ?
                    <FastImage
                        resizeMode="contain"
                        style={categoryStyles.categoryImage}
                        source={{uri: categoryInfo.url}}
                    />
                    :
                    <FastImage
                        resizeMode="contain"
                        style={categoryStyles.categoryImage}
                        source={require("../../assets/Foodup_icons/category_default.png")}
                    />
            }
        </View>)};

export default FeaturedCategoryImage;
