import React from 'react';
import {View, Text, Alert} from 'react-native';
import {Container, Content} from 'native-base';
import categoryStyles from '../styles/CategoryScreen';
import globalStyles from '../styles';
import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from '@react-native-community/netinfo';

import {fetchCategory, fetchRelatedStores, fetchMore} from '../api/categoryApi';
import Loading from '../components/Loading';
import FeaturedCategoryImage from '../components/FeaturedCategoryImage';
import StoreList from '../components/StoreList';
import GeneralHeader from '../components/GeneralHeader';
import {voteDocRef} from '../api/storeApi';
import retrieveStores from '../modules/retrieveStores';
import debounce from 'lodash.debounce';

class CategoryScreen extends React.Component {
    static navigationOptions = {header: null};

    state = {
        stores: [],
        from: '',
        categoryInfo: null,
        lastVisible: null,
        fetch: false,
        likes: {}
    };

    categoryName;

    componentDidMount(): void {
        /*NetInfo.fetch().then(state => {
            if (!state.isConnected) {
                Alert.alert(
                    '알림',
                    '"FoodUp"은 인터넷에 연결되어 있는 환경에서 이용할 수 있습니다.',
                    [
                        {text: '확인'},
                    ],
                );
            } else {
                this.categoryName = this.props.navigation.getParam('categoryName');
                this.fetchStores();
            }
        });*/
        this.categoryName = this.props.navigation.getParam('categoryName');
        this.fetchStores();
    }

    fetchStores = async () => {
        try {
            this.setState({...this.state, fetch: true});
            const temp = await AsyncStorage.getItem(this.categoryName);

            const likes = await JSON.parse(temp) || [];
            const categoryInfo = await fetchCategory(this.categoryName);
            const {stores, lastVisible} = await fetchRelatedStores(this.categoryName);
            if (categoryInfo?.featuredStore) {
                const featuredStoreAddedList = [categoryInfo?.featuredStore, ...stores];
                this.setState({...this.state, likes, categoryInfo, stores: featuredStoreAddedList, lastVisible, fetch: false});
            } else {
                this.setState({...this.state, likes, categoryInfo, stores, lastVisible, fetch: false});
            }

        } catch (e) {
            console.log(e);
        }
    };

    retrieveMore = async (nativeEvent) => {
        if (await retrieveStores(nativeEvent, this.state.lastVisible)) {
            this.setState({...this.state, fetch: true});

            const {stores, lastVisible} = await fetchMore(this.categoryName, this.state.lastVisible);
            const temp = [...this.state.stores, ...stores];
            this.setState({...this.state, stores: temp, lastVisible, fetch: false});
        }
    };

    onClickLike = async (index) => {
        const {stores} = this.state;
        const storeName = stores[index].name;
        let count = await voteDocRef(storeName, this.categoryName);
        const obj = {};

        stores[index].count = count;
        obj[storeName] = true;

        this.setState({...this.state, stores});
        this.setState({...this.state, likes: {...this.state.likes, ...obj}});
        await AsyncStorage.setItem(`${this.categoryName}`, JSON.stringify({...this.state.likes, ...obj}));
    };

    fromCategory = (data) => {
        this.setState(data);
    };

    moveToStoreScreen = debounce((store) => {
        const {name, thumb} = store;
        this.props.navigation.push('Store', {name, thumb, fromCategory: this.fromCategory, from: this.state.from});
    }, 250);

    render() {
        return (
            <Container>
                <GeneralHeader navigation={this.props.navigation} categoryName={this.categoryName}/>
                <Content contentContainerStyle={globalStyles.content} scrollEnabled={false}>
                    <View style={{flex: 1, width: '100%', backgroundColor: 'white'}}>
                        <>
                            {
                                this.categoryName && this.state.categoryInfo ?
                                    <StoreList
                                        featuredStoreInfo={!!this.state.categoryInfo?.featuredStore}
                                        fetch={this.state.fetch}
                                        stores={this.state.stores}
                                        retrieveMore={this.retrieveMore}
                                        onClickLike={this.onClickLike}
                                        navigation={this.props.navigation}
                                        moveToStoreScreen={this.moveToStoreScreen}
                                        category={this.categoryName}
                                        likes={this.state.likes}
                                        categoryInfo={this.state.categoryInfo}
                                    /> : <Loading/>
                            }
                        </>
                    </View>
                </Content>
            </Container>
        );
    }
}

export default CategoryScreen;
