import React from 'react';
import {Alert, View} from 'react-native';
import GeneralHeader from '../components/GeneralHeader';
import InfiniteHits from '../components/InfiniteHits';
import Hits from '../components/Hits';
import {Container, Content, Text} from 'native-base';
import algoliasearch from 'algoliasearch/reactnative';
import {Configure, Index, InstantSearch} from 'react-instantsearch-native';
import throttle from 'lodash.throttle';
import SearchBox from '../components/SearchBox';
import NetInfo from '@react-native-community/netinfo';


const searchClient = algoliasearch(
    'M5OF15GQRD',
    '0d6f8cb3a063731533ab5e533873d985',
);


class SearchScreen extends React.Component {
    static navigationOptions = {header: null};

    root = {
        Root: View,
        props: {
            style: {
                flex: 1,
            },
        },
    };

    componentDidMount() {
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
    }

    moveToCategory = throttle((name) => {
        this.props.navigation.push('Category', {categoryName: name});
    }, 250);

    moveToStore = throttle((name) => {
        this.props.navigation.push('Store', {name: name});
    }, 250);

    render() {
        return (
            <Container>
                <GeneralHeader flag={true} navigation={this.props.navigation}/>
                <Content scrollEnabled={false}>
                    <InstantSearch
                        searchClient={searchClient}
                        indexName={'categories'}
                        root={this.root}
                    >
                        <Configure
                            hitsPerPage={15}
                            distinct
                        />
                        <SearchBox/>
                        <View style={{height:'100%'}}>
                            <Index indexName="categories">
                                <IndexTitle>FOOD CATEGORIES</IndexTitle>
                                <InfiniteHits flag={'categories'} hitComponent={Hits} moveTo={this.moveToCategory}/>
                                <View style={{
                                    borderBottomWidth: 1,
                                    borderColor: '#c1c1c1',
                                    width: '90%',
                                    alignSelf: 'center',
                                    paddingTop: 10
                                }}/>
                            </Index>
                            <Index indexName="stores">
                                <IndexTitle>RESTAURANTS</IndexTitle>
                                <InfiniteHits flag={'stores'} hitComponent={Hits} moveTo={this.moveToStore}/>
                            </Index>
                        </View>
                    </InstantSearch>
                </Content>
            </Container>
        );
    }
}

export default SearchScreen;

const IndexTitle = (props) => {
    return (
        <View style={{paddingLeft: 20, paddingTop: 20, paddingBottom: 10}}>
            <Text allowFontScaling={false} style={{color: '#c1c1c1', fontSize: 11, fontWeight: '900', letterSpacing: 3}}>{props.children}</Text>
        </View>
    );
};
