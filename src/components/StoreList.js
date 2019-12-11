import React from 'react';
import {View, FlatList, Text, ImageBackground} from 'react-native';
import StoreItem from './StoreItem';
import EStyleSheet from 'react-native-extended-stylesheet';
import Loading from '../components/Loading';
import debounce from 'lodash.debounce';
import FastImage from 'react-native-fast-image';
import speechBubble from '../../assets/Foodup_icons/speechBubble.png';
import empty from '../../assets/Foodup_icons/favorite_empty.png';
import favoriteStyles from '../styles/FavoriteScreen';

class StoreList extends React.Component {
    _timeOut;
    state = {
        scrollPosition: 0,
    };

    componentDidMount(): void {
        this.flatList = React.createRef();
    }

    scrollEvent = (nativeEvent) => {
        this.props.retrieveMore(nativeEvent).then(res => {
            if(res) {
                const offset = this.state.scrollPosition
                this._timeOut = setTimeout(() => {
                    this.flatList.current.scrollToOffset({ offset, animated: false })
                }, 250)
            }
        });
    };

    goToStoreScreen = debounce((store) => {
        this.props.moveToStoreScreen(store.item);
    }, 250);

    renderStoreItem = (store) => {
        const {featuredStoreInfo, likes, from, category, onClickLike} = this.props;
        const flag = likes ? !!likes[store.item.name] : false

        return (
                <View style={{padding: 5, paddingBottom: 10}}>
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

    handleScroll = (event: Object) => {
        this.setState({scrollPosition: event.nativeEvent.contentOffset.y});
    };

    renderStoreList = () => {
        const {stores} = this.props;

        return (
            <FlatList
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
            />
        );
    };

    render() {
        return (
            <View style={styles.container}>
                {this.props.fetch ? <Loading/> : null}
                {this.props.from ? null :
                        <ImageBackground source={speechBubble} style={{paddingLeft: 10, paddingRight: 10, height: 50, alignSelf: 'center', justifyContent:'center', marginTop: 10, marginBottom: 10}}
                                         imageStyle={{resizeMode: 'stretch'}}
                                         // resizeMode='contain'
                        >
                            <Text allowFontScaling={false} style={{fontSize: 16, fontWeight:'300', color:'#fff', bottom:0, alignSelf: 'center', justifyContent:'center'}}>{this.props.category} 맛집에 투표해주세요!</Text>
                        </ImageBackground>
                }
                { this.props.stores.length ? this.renderStoreList() :
                    /*<View style={{flex: 1, padding: 30, justifyContent:'center', alignItems: 'center'}}>
                        <FastImage
                            resizeMode={FastImage.resizeMode.contain}
                            style={{width: '70%', height: '70%'}}
                            source={empty}
                        />
                        <Text allowFontScaling={false} style={favoriteStyles.txt}>아직 추가된 맛집 리스트가 없어요.</Text>
                    </View>*/
                    <Loading/>
                }
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
        padding: 10,
        marginTop: -10,
        flex: 1
    }
});

export default StoreList;
