import React from 'react';
import {View, ScrollView, Text} from 'react-native';
import CategoryImage from './CategoryImage';
import FastImage from 'react-native-fast-image';
import homeStyles from '../styles/HomeScreen';
import TouchableScale from 'react-native-touchable-scale';

const CategoryList = ({categories, navigation}) => {

    return (
        <View style={{bottom: 20, zIndex: 2, alignSelf: 'center'}}>
            {/*<ScrollView showsVerticalScrollIndicator={false} style={ homeStyles.categoryImageListScrollView }>*/}
                <View style={homeStyles.categoryImageListContainer}>
                    {categories.map((category, i) => <CategoryImage key={`${category.name}-${i}`} name={category.name} uri={category.url} navigation={navigation}/>)}
                    {
                        categories.length > 0 ?
                            <TouchableScale onPress={() => navigation.push('CustomerService')} activeScale={0.95}>
                                <View style={homeStyles.categoryImageCard}>
                                    <FastImage
                                        resizeMode={FastImage.resizeMode.contain}
                                        style={{
                                            height: 70,
                                            width: 70,
                                        }}
                                        source={require('../../assets/Foodup_icons/callcenter.png')}
                                    />
                                    <Text allowFontScaling={false} style={{textAlign: 'center', fontFamily: 'ThecircleB'}}>고객센터</Text>
                                </View>
                            </TouchableScale>
                            : null
                    }
                </View>
            {/*</ScrollView>*/}
        </View>
    );
};

export default CategoryList;
