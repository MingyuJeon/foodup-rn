import React, {Component} from 'react';
import {Alert, PermissionsAndroid, ScrollView, Text, View} from 'react-native';
import {Container, Content} from 'native-base';
import homeStyles from '../styles/HomeScreen';
import globalStyles from '../styles';
import {fetchCategories} from '../api/categoryApi';
import CategoryList from '../components/CategoryList';
import HomeScreenHeader from '../components/HomeScreenHeader';
import Loading from '../components/Loading';
import debounce from 'lodash.debounce';
import NetInfo from '@react-native-community/netinfo';

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

    render() {
        console.log(this.state);
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
