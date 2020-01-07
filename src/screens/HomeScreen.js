import React, {Component} from 'react';
import {Alert, PermissionsAndroid, ScrollView, Text, View, Button} from 'react-native';
import {Container, Content} from 'native-base';
import homeStyles from '../styles/HomeScreen';
import globalStyles from '../styles';
import {fetchCategories} from '../api/categoryApi';
import CategoryList from '../components/CategoryList';
import HomeScreenHeader from '../components/HomeScreenHeader';
import Loading from '../components/Loading';
import NetInfo from '@react-native-community/netinfo';


import {db} from '../api';


// import AsyncStorage from '@react-native-community/async-storage';

class HomeScreen extends Component {
    static navigationOptions = {header: null};

    state = {
        categories: [],
    };

    componentDidMount() {
        // AsyncStorage.clear()
        NetInfo.fetch().then(state => {
            if (!state.isConnected) {
                Alert.alert(
                    '알림',
                    '"FoodUp"은 인터넷에 연결되어 있는 환경에서 이용할 수 있습니다.',
                    [
                        {text: '확인'},
                    ],
                );
            }
        });

        this.getCategoryInfo();
    }

    getCategoryInfo = async () => {
        let categories;
        this.setState({...this.state.categories, fetching: true});
        try {
            categories = await fetchCategories();
        } catch (e) {
            console.log(e);
        }
        this.setState({categories, fetching: false});
    };

    /*getData = async () => {
        /!*const testArr = [{name: 'mingyu'}, {name: 'heamin'}];
        const ans = testArr.filter(e => e.name == 'mingyu');

        if(!ans) {
        }

        console.log(ans);*!/

        const categoryRef = db.collection('categories');
        let categories = [];
        await categoryRef.get()
            .then(res => {
                categories = res.docs.map(x => x.data().name);
            })
        let relatedStores = {};

        for (let category of categories) {
            console.log('loading');
            await db.collection('categories').doc(category).collection('relatedStore').get()
                .then(res => {
                    relatedStores[category] = res.docs.map(x => x.data().name);
                })
        }

        // let list = {}
        // let emptyList = []
        // let noChips = {}
        for (const category in relatedStores) {
            console.log('loading...')
            if (relatedStores[category] && relatedStores[category].length > 0) {
                /!*for (let store of relatedStores[category]) {
                    await db.collection('stores').doc(store).get().then(res => {
                        let flag = [];
                        // console.log(res.data(), category, store);

                        if(res.data() && res.data().hasOwnProperty('categoryChips')) {
                            flag = res.data()?.categoryChips.filter(e => e.name == category)
                        } else {
                            if (noChips[category] && noChips[category].length > 0 ) {
                                noChips[category].push(store);
                            } else {
                                noChips[category] = [];
                                noChips[category].push(store);
                            }
                        }

                        if(flag.length === 0) {
                            // console.log(list)
                            if (list[category] && list[category].length > 0 ) {
                                list[category].push(store);
                            } else {
                                list[category] = [];
                                list[category].push(store)
                            }
                        }
                    })
                }*!/
            } else {
                await db.collection('categories').doc(category).delete();
                // await db.collection('categories').doc(category).collection('relatedStore').get()
                // emptyList.push(category)
            }
        }

        /!*console.log('- emptyList -', emptyList)
        console.log('- noChips -', noChips)
        console.log('==========================================================================')
        console.log('- error 유발 list -', list);*!/
    }*/

    render() {
        return (
            <Container>
                <HomeScreenHeader navigation={this.props.navigation}/>
                <Content contentContainerStyle={globalStyles.content} scrollEnabled={false}>
                    {
                        this.state.categories.length > 0 ?
                            <ScrollView showsVerticalScrollIndicator={false} style={homeStyles.categoryImageListScrollView} bounces={false}>
                                <View style={homeStyles.TextContainer}>
                                    <Text style={homeStyles.TextStr} allowFontScaling={false}>아,</Text>
                                    <Text style={homeStyles.TextStr} allowFontScaling={false}>오늘은</Text>
                                    <Text style={homeStyles.TextStr} allowFontScaling={false}>또 뭘 먹지?</Text>
                                </View>

       {/*                         <View style={{height:100}}>
                                    <Button onPress={this.getData} title={'click'}/>
                                </View>*/}

                                <CategoryList
                                    categories={this.state.categories}
                                    goCategory={this.goCategory}
                                    navigation={this.props.navigation}
                                />
                            </ScrollView>
                            :
                            <Loading/>
                    }
                </Content>
            </Container>
        );
    }
}

export default HomeScreen;
