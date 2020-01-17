import React from 'react';
import {StatusBar, Text} from 'react-native';
import globalStyles from '../styles';
import {Body, Button, Header, Left, Right} from 'native-base';
import FastImage from 'react-native-fast-image';
import btnStyles from '../styles/HomeScreen';
import throttle from 'lodash.throttle';
import EStyleSheet from 'react-native-extended-stylesheet';

class GeneralHeader extends React.PureComponent {
    render() {
        return (
            <>
                <StatusBar hidden={true}/>
                <Header style={globalStyles.header}>
                    <Left style={{flex: 1}}>
                        <Button
                            transparent
                            onPress={throttle(() => this.props.navigation.pop(), 250)}
                            style={globalStyles.btn}
                        >
                            <FastImage resizeMode={FastImage.resizeMode.contain}
                                       style={btnStyles.headerImg}
                                       source={require('../../assets/Foodup_icons/back.png')}/>
                        </Button>
                    </Left>
                    <Body style={{flex: 1}}>
                        <Button
                            transparent
                            style={globalStyles.btn}
                            onPress={throttle(() => this.props.navigation.navigate('Home'), 250)}
                        >
                            {
                                this.props.categoryName? <Text style={styles.header}>{this.props.categoryName}</Text>:
                            <FastImage resizeMode={FastImage.resizeMode.contain}
                                       style={globalStyles.logoSize}
                                       source={require('../../assets/Foodup_icons/logo.png')}/>
                            }
                        </Button>

                    </Body>
                    {
                        this.props?.flag ? <Right/> :
                            <Right style={{flex: 1}}>
                                <Button transparent
                                        onPress={throttle(() => this.props.navigation.push('Search'), 250)}
                                        style={globalStyles.btn}
                                >
                                    <FastImage
                                        style={btnStyles.headerImg}
                                        resizeMode={FastImage.resizeMode.contain}
                                        source={require('../../assets/Foodup_icons/search.png')}/>
                                </Button>
                            </Right>
                    }
                </Header>
            </>
        );
    }
};

const styles = EStyleSheet.create({
    header: {fontSize: '1.5rem', color: '#fff', fontFamily: '$font'}
});

export default GeneralHeader;
