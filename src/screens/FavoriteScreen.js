import React from 'react';
import {Alert, Text, View} from 'react-native';
import GeneralHeader from '../components/GeneralHeader';
import {Container, Content} from 'native-base';
import globalStyles from '../styles';
import AsyncStorage from '@react-native-community/async-storage';
import StoreList from '../components/StoreList';
import retrieveStores from '../modules/retrieveStores';
import {fetchMore} from '../api/categoryApi';
import debounce from 'lodash.debounce';
import FastImage from 'react-native-fast-image';
import empty from '../../assets/Foodup_icons/favorite_empty.png';
import favoriteStyles from '../styles/FavoriteScreen';
import NetInfo from '@react-native-community/netinfo';
import {fetchIdStore} from '../api/storeApi';
import Loading from '../components/Loading';

class FavoriteScreen extends React.Component {
    static navigationOptions = {header: null};

    state = {
        stores: [],
        fetch: false,
    };

    componentDidMount(): void {
        NetInfo.fetch().then(state => {
            if (!state.isConnected) {
                Alert.alert(
                    '알림',
                    '"FoodUp"은 인터넷에 연결되어 있는 환경에서 이용할 수 있습니다.',
                    [
                        {text: '확인'},
                    ],
                );
            } else {
                this.getFavoriteStores();
            }
        });
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
        if (prevState.stores !== this.state.stores) {
            this.setState({...this.state, fetch: false});
        }
    }

    getFavoriteStores = async () => {
        this.setState({...this.state, fetch: true});
        const stores = JSON.parse(await AsyncStorage.getItem('favorite'));
        const storeInfo = [];

        for (let id of stores) {
            storeInfo.push(await fetchIdStore(id));
        }
        this.setState({...this.state, stores: storeInfo});
    };

    retrieveMore = async (nativeEvent) => {
        if (await retrieveStores(nativeEvent, null)) {
            this.setState({...this.state, fetch: true});

            const {stores, lastVisible} = await fetchMore(this.categoryName, this.state.lastVisible);
            const temp = [...this.state.stores, ...stores];
            this.setState({...this.state, stores: temp, lastVisible, fetch: false});
        }
    };

    moveToStoreScreen = debounce((data) => {
        this.props.navigation.push('Store', {name: data.name, fromCategory: null, from: 'favorite', favoriteFunc: this.getFavoriteStores});
    }, 250);

    render() {
        return (
            <Container>
                <GeneralHeader flag={false} navigation={this.props.navigation}/>
                <Content contentContainerStyle={globalStyles.content} scrollEnabled={false}>
                    <View style={{flex: 1, width: '100%', backgroundColor: 'white'}}>
                        {this.state.fetch ? <Loading/> :
                            this.state.stores.length === 0 ?
                                <View style={{flex: 1, padding: 30, justifyContent: 'center', alignItems: 'center'}}>
                                    <FastImage
                                        resizeMode={FastImage.resizeMode.contain}
                                        style={{width: '70%', height: '70%'}}
                                        source={empty}
                                    />
                                    <Text allowFontScaling={false} style={favoriteStyles.txt}>아직 추가된 맛집 리스트가 없어요.</Text>
                                </View> :
                                <StoreList
                                    featuredStoreInfo={false}
                                    fetch={this.state.fetch}
                                    stores={this.state.stores}
                                    retrieveMore={this.retrieveMore}
                                    navigation={this.props.navigation}
                                    moveToStoreScreen={this.moveToStoreScreen}
                                    category={this.categoryName}
                                    from={'Favorite'}
                                />
                        }
                    </View>
                </Content>
            </Container>
        );
    }
};

export default FavoriteScreen;
