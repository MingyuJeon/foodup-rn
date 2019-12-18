import React from 'react';
import {StatusBar, Alert} from 'react-native';
import globalStyles from '../styles';
import {Body, Button, Header, Left, Right} from 'native-base';
import FastImage from 'react-native-fast-image';
import styles from '../styles/HomeScreen';
import debounce from 'lodash.debounce';

import favoriteOff from '../../assets/Foodup_icons/favorite_filledout.png';
import favoriteOn from '../../assets/Foodup_icons/favorite_filledin.png';
import AsyncStorage from '@react-native-community/async-storage';

class StoreScreenHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            favorite: false,
            favoriteStores: [],
        };
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
        if (prevProps.storeData !== this.props.storeData) {
            this.getFavorite();
        }

        if (prevState.favoriteStores !== this.state.favoriteStores) {
            this.setItemToAsyncStorage()
        }
    }

    setItemToAsyncStorage = async () => {
        await AsyncStorage.setItem(`favorite`, JSON.stringify(this.state.favoriteStores));
    }

    getFavorite = async () => {
        const data = await AsyncStorage.getItem(`favorite`);
        const res = JSON.parse(data);
        if (res !== null) {
            this.setState(prevState => ({...this.state, favoriteStores: [...prevState.favoriteStores, ...res]}));
            res.find(id => id === this.props.storeData.id) ? this.setState({...this.state, favorite: true}) : null; // favorite에 존재하면 하트 채우기 없으면 아무것도 안함
        }
    };

    onClickFavorite = debounce(async () => {
        if (this.state.favorite) {
            AsyncStorage.removeItem(`${this.props.storeData.id}`)
            this.setState(prevState => ({
                favorite: !prevState.favorite,
                favoriteStores: [...prevState.favoriteStores.filter((id) => id !== this.props.storeData.id)]
            }));

            Alert.alert(
                '알림',
                '나만의 맛집 컬렉션에서 제거되었습니다.',
                [
                    {text: '확인'},
                ],
            );
        } else {
            this.setState(prevState => ({
                favorite: !prevState.favorite,
                favoriteStores: [...prevState.favoriteStores, this.props.storeData.id],
            }));
            Alert.alert(
                '알림',
                '나만의 맛집 컬렉션에 추가되었습니다.',
                [
                    {text: '확인'},
                ],
            );
        }
    }, 250);

    goBack = debounce(() => {
        const {navigation, favoriteFunc} = this.props;
        if(favoriteFunc) {
            favoriteFunc();
        }
        navigation.pop();
    }, 250);


    render() {
        return (
            <>
                <StatusBar hidden={true}/>
                <Header style={globalStyles.header}>
                    <Left style={{flex: 1}}>
                        <Button
                            transparent
                            onPress={this.goBack}
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
                            <FastImage resizeMode={FastImage.resizeMode.contain}
                                       style={globalStyles.logoSize}
                                       source={require('../../assets/Foodup_icons/logo.png')}/>
                        </Button>
                    </Body>
                    <Right style={{flex: 1}}>
                        <Button
                            transparent
                            onPress={this.onClickFavorite}
                            style={globalStyles.btn}
                        >
                            <FastImage resizeMode={FastImage.resizeMode.contain}
                                       style={styles.headerImg}
                                       source={this.state.favorite ? favoriteOn : favoriteOff}/>
                        </Button>
                    </Right>
                </Header>
            </>
        );
    }
};

export default StoreScreenHeader;
