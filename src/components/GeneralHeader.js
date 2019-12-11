import React from 'react';
import {StatusBar, Text} from 'react-native';
import globalStyles from '../styles';
import {Body, Button, Header, Left, Right} from 'native-base';
import FastImage from 'react-native-fast-image';
import styles from '../styles/HomeScreen';
import debounce from 'lodash.debounce';

class GeneralHeader extends React.PureComponent {
    render() {
        return (
            <>
                <StatusBar hidden={true}/>
                <Header style={globalStyles.header}>
                    <Left style={{flex: 1}}>
                        <Button
                            transparent
                            onPress={() => this.props.navigation.pop()}
                            style={globalStyles.btn}
                        >
                            <FastImage resizeMode={FastImage.resizeMode.contain}
                                       style={styles.headerImg}
                                       source={require('../../assets/Foodup_icons/back.png')}/>
                        </Button>
                    </Left>
                    <Body style={{flex: 1}}>
                        <Button
                            transparent
                            style={globalStyles.btn}
                            onPress={() => this.props.navigation.navigate('Home')}
                        >
                            {/*{
                                this.props.categoryName? <Text style={{color: '#fff'}}>{this.props.categoryName}</Text>:*/}
                            <FastImage resizeMode={FastImage.resizeMode.contain}
                                       style={globalStyles.logoSize}
                                       source={require('../../assets/Foodup_icons/logo.png')}/>
                            {/*}*/}
                        </Button>

                    </Body>
                    {
                        this.props?.flag ? <Right/> :
                            <Right style={{flex: 1}}>
                                <Button transparent
                                        onPress={debounce(() => this.props.navigation.push('Search'), 250)}
                                        style={globalStyles.btn}
                                >
                                    <FastImage
                                        style={styles.headerImg}
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

export default GeneralHeader;
