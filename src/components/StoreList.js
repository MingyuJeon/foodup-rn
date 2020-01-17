import React from 'react';
import {View, FlatList, Text} from 'react-native';
import StoreItem from './StoreItem';
import EStyleSheet from 'react-native-extended-stylesheet';
import Loading from '../components/Loading';
import debounce from 'lodash.debounce';
import categoryStyles from '../styles/CategoryScreen';
import FeaturedCategoryImage from './FeaturedCategoryImage';
import Icon from 'react-native-vector-icons/Entypo';

class StoreList extends React.Component {
    _timeOut;
    state = {
        scrollPosition: 0,
    };

    componentDidMount() {
        this.flatList = React.createRef();
    }

    scrollEvent = (nativeEvent) => {
        this.props.retrieveMore(nativeEvent).then(res => {
            if (res) {
                const offset = this.state.scrollPosition;
                this._timeOut = setTimeout(() => {
                    this.flatList.current.scrollToOffset({offset, animated: false});
                }, 250);
            }
        });
    };

    goToStoreScreen = debounce((store) => {
        this.props.moveToStoreScreen(store.item);
    }, 500);

    renderStoreItem = (store) => {
        const {featuredStoreInfo, likes, from, category, onClickLike} = this.props;
        const flag = likes ? !!likes[store.item.name] : false;

        return (
            <View style={{paddingLeft: 15, paddingRight: 15, paddingTop: 5, paddingBottom: 10}}>
                <StoreItem
                    i={store.index}
                    store={store.item}
                    goToStoreScreen={() => this.goToStoreScreen(store)}
                    featuredStoreInfo={featuredStoreInfo}
                    onClickLike={() => onClickLike(store.index)}
                    category={category}
                    from={from}
                    flag={flag}
                />
            </View>
        );
    };

    handleScroll = (event) => {
        this.setState({scrollPosition: event.nativeEvent.contentOffset.y});
    };

    renderStoreList = () => {
        const {stores} = this.props;

        return (
            <FlatList
                bounces={false}
                ref={this.flatList}
                onScroll={this.handleScroll}
                showsVerticalScrollIndicator={false}
                onEndThreshold={0}
                onScrollEndDrag={({nativeEvent}) => {
                    this.scrollEvent(nativeEvent);
                }}
                data={stores}
                renderItem={(store) => this.renderStoreItem(store)}
                keyExtractor={(item, i) => {
                    return i.toString();
                }}
                ListHeaderComponent={
                    this.props.from ?
                        <View style={[categoryStyles.textContainer, {marginBottom: 10}]}>
                            <View style={{flexDirection: 'column', alignSelf: 'center'}}>
                                <Icon name="heart" size={30} color="#fff" style={{paddingLeft: 10}}/>

                                <Text allowFontScaling={false} style={[categoryStyles.categoryNameTitle, {fontSize: 35}]}>나만의</Text>
                                <Text allowFontScaling={false} style={[categoryStyles.categoryNameTitle, {fontSize: 35}]}>#맛집 컬렉션</Text>
                            </View>
                        </View>
                        :
                        <>
                            <View style={categoryStyles.textContainer}>
                                <FeaturedCategoryImage categoryInfo={this.props.categoryInfo}/>
                                <View style={{flexDirection: 'column', alignSelf: 'center', flex: 1}}>
                                    <Text allowFontScaling={false} style={categoryStyles.subTitle}>푸드업랭킹</Text>
                                    <Text allowFontScaling={false} style={categoryStyles.categoryNameTitle}>#{this.props.category}</Text>
                                </View>
                            </View>
                            <View style={{backgroundColor: '#F2F2F2', borderRadius: 10, padding: 9, margin: 15}}>
                                <Text allowFontScaling={false} style={styles.bubble}>나의 최고의 {this.props.category} 맛집은 어디?</Text>
                                <Text allowFontScaling={false} style={styles.bubble}>따봉을 눌러서 UP UP!</Text>
                            </View>
                        </>
                }
            />
        );
    };

    render() {
        return (
            <View style={styles.container}>
                {this.props.fetch ? <Loading/> : null}
                {this.renderStoreList()}
            </View>
        );
    }

    componentWillUnmount(): void {
        clearTimeout(this._timeOut);
    }
}

const styles = EStyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderTopStartRadius: 15,
        borderTopEndRadius: 15,
        // padding: 10,
        marginTop: -10,
        flex: 1,
    },
    bubble: {
        fontSize: 16, fontWeight: '300', color: '#333333', bottom: 0, alignSelf: 'center', justifyContent: 'center',
        fontFamily: '$font',
    },
});

export default StoreList;
