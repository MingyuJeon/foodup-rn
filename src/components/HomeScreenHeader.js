import React from 'react';
import {StatusBar} from 'react-native';
import globalStyles from '../styles';
import {Body, Button, Header, Left, Right} from 'native-base';
import FastImage from 'react-native-fast-image';
import styles from '../styles/HomeScreen';
import debounce from 'lodash.debounce';

const HomeScreenHeader = ({navigation}) => {
    return (
        <>
            <StatusBar hidden={true}/>
            <Header style={globalStyles.header}>
                <Left style={{flex: 1}}>
                    <Button
                        transparent
                        onPress={debounce(() => navigation.push('Favorite'), 250)}
                        style={globalStyles.btn}
                    >
                        <FastImage resizeMode={FastImage.resizeMode.contain}
                                   style={styles.headerImg}
                                   source={require('../../assets/Foodup_icons/hamburger.png')}/>
                    </Button>
                </Left>
                <Body style={{flex: 1}}>
                    <Button
                        transparent
                        style={globalStyles.btn}
                    >
                        <FastImage resizeMode={FastImage.resizeMode.contain}
                                   style={globalStyles.logoSize}
                                   source={require('../../assets/Foodup_icons/logo.png')}/>
                    </Button>
                </Body>
                <Right style={{flex: 1}}>
                    <Button transparent
                            onPress={debounce(() => navigation.push('Search'), 250)}
                            style={globalStyles.btn}
                    >
                        <FastImage
                            style={styles.headerImg}
                            resizeMode={FastImage.resizeMode.contain}
                            source={require('../../assets/Foodup_icons/search.png')}/>
                    </Button>
                </Right>
            </Header>
        </>
    );
};

export default HomeScreenHeader;
