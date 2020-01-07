import React from 'react';
import {View, Text, ScrollView, FlatList, Platform, Linking, Alert} from 'react-native';
import {Container, Content} from 'native-base';
import StoreScreenHeader from '../components/StoreScreenHeader';
import {fetchStore} from '../api/storeApi';
import storeStyles from '../styles/StoreScreen';
import Tag from '../components/Tag';
import InfoBox from '../components/InfoBox';
import Option from '../components/Option';
import StoreDetailTitle from '../components/StoreDetailTitle';
import StoreDetailInfo from '../components/StoreDetailInfo';
import Loading from '../components/Loading';
import PrintImages from '../components/PrintImages';
import addrIcn from '../../assets/Foodup_icons/store_screen/info_location.png';
import phoneIcn from '../../assets/Foodup_icons/store_screen/info_phone.png';
import businessHourIcn from '../../assets/Foodup_icons/store_screen/info_hours.png';
import bestMenuIcn from '../../assets/Foodup_icons/store_screen/best.png';
import honeyTipIcn from '../../assets/Foodup_icons/store_screen/detail_honeytips.png';
import menuIcn from '../../assets/Foodup_icons/store_screen/menu.png';
import Geolocation from '@react-native-community/geolocation';
import debounce from 'lodash.debounce';
import NetInfo from '@react-native-community/netinfo';
import {check, PERMISSIONS, RESULTS} from 'react-native-permissions';

import {InteractionManager} from 'react-native';

class StoreScreen extends React.Component {
    static navigationOptions = {header: null};

    constructor(props) {
        super(props);

        this.state = {
            storeName: '',
            storeData: null,
            fetch: false,
            region: {},
            storeRegion: {},
            thumb: {},
            triggerFunc: null,
        };
    }

    componentDidMount(): void {
        InteractionManager.runAfterInteractions(() => {

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
                    this.getStoreName();
                    this.getCurrentPosition();
                }
            });
        });


        /*check(PERMISSIONS.IOS.LOCATION_ALWAYS || PERMISSIONS.IOS.LOCATION_WHEN_IN_USE ||PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
            .then(result => {
                switch (result) {
                    case RESULTS.UNAVAILABLE:
                        alert(
                            'This feature is not available (on this device / in this context)',
                        );
                        break;
                    case RESULTS.DENIED:
                        alert(
                            'The permission has not been requested / is denied but requestable',
                        );
                        break;
                    case RESULTS.GRANTED:
                        alert('The permission is granted');
                        break;
                    case RESULTS.BLOCKED:
                        alert('The permission is denied and not requestable anymore');
                        break;
                }
            })
            .catch(error => {
                // …
            });*/
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
        if (prevState.storeName !== this.state.storeName || prevState.triggerFunc !== this.state.triggerFunc) {
            this.fetchStoreInfo();
        }
    }

    goToCategory = debounce((name) => {
        this.props.navigation.push('Category', {categoryName: name});
    }, 250);

    getStoreName = async () => {
        const {navigation} = this.props;
        const storeName = await navigation.getParam('name');
        const thumb = await navigation.getParam('thumb');
        const triggerFunc = await navigation.getParam('favoriteFunc');
        this.setState({...this.state, storeName, thumb, triggerFunc});
    };

    fetchStoreInfo = async () => {
        const storeData = await fetchStore(this.state.storeName);

        this.setState({...this.state, storeData, fetch: false});
    };

    makeCall = () => {
        let phoneNumber = '';

        if (Platform.OS === 'android') {
            phoneNumber = `tel:\$${this.state.storeData.phone}`;
        } else {
            phoneNumber = `telprompt:\$${this.state.storeData.phone}`;
        }

        Linking.openURL(phoneNumber);
    };

    getCurrentPosition = () => {
        try {
            Geolocation.getCurrentPosition(
                (position) => {
                    const region = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    };
                    this.setState({...this.state, region});
                },
            );
        } catch (e) {
            alert(e.message || '');
        }
    };

    showMap = () => {
        const data = {
            source: this.state.region,
            destination: this.state.storeRegion,
        };
        if (!this.state.region) {
            alert('현재위치 정보 수집을 허용해주세요.');
        } else {
            Linking.openURL(`https://www.google.com/maps/dir/?api=1&travelmode=driving&dir_action=navigate&destination=${this.state.storeData.addr} ${this.state.storeData.city} ${this.state.storeData.state} ${this.state.storeData.zipCode}&origin=${data.source.latitude} ${data.source.longitude}`);
        }
    };

    renderStoreInfo = () => {
        const {addr, addr2, city, state, zipCode, phone, businessHour} = this.state.storeData;

        return (
            <>
                <StoreDetailInfo action={this.showMap} img={addrIcn}>
                    <Text allowFontScaling={false} style={storeStyles.touchableFont}>{`${addr}`}</Text>
                    {addr2 ? <Text allowFontScaling={false} style={storeStyles.touchableFont}>{`${addr2}`}</Text> : null}
                    <Text allowFontScaling={false} style={storeStyles.touchableFont}>{`${city === 'LA' ? 'Los Angeles' : city}, ${state}, ${zipCode}`}</Text>
                </StoreDetailInfo>
                <StoreDetailInfo action={this.makeCall} img={phoneIcn}>
                    <Text allowFontScaling={false} style={storeStyles.touchableFont}>{phone.replace(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/, '$1-$2-$3')}</Text>
                </StoreDetailInfo>
                {
                    businessHour ?
                    <StoreDetailInfo action={null} img={businessHourIcn}>
                        <Text allowFontScaling={false} style={{lineHeight: 21}}>{businessHour}</Text>
                    </StoreDetailInfo> : null
                }
            </>
        );
    };

    render() {
        return (
            <Container style={{backgroundColor: '#F0F7F5'}}>
                <StoreScreenHeader navigation={this.props.navigation} storeData={this.state.storeData} favoriteFunc={this.state.triggerFunc}/>
                <Content scrollEnabled={false} contentContainerStyle={{flex: 1, backgroundColor: '#F0F7F5'}}>
                    {this.state.storeData !== null ?
                        <View style={{backgroundColor: '#F0F7F5', flex: 1, height: '100%'}}>
                            <View style={storeStyles.titleContainer}>
                                <Text allowFontScaling={false} style={storeStyles.title}>{this.state.storeName}</Text>
                                <View style={storeStyles.tagsWrapper}>
                                    <FlatList
                                        showsHorizontalScrollIndicator={false}
                                        horizontal={true}
                                        onEndThreshold={0}
                                        data={this.state.storeData?.categoryChips}
                                        renderItem={(chip) => {
                                            return <Tag tag={chip.item.name} from={this.state.storeName} navigation={this.props.navigation} goToCategory={this.goToCategory}/>;
                                        }}
                                        keyExtractor={(item, i) => {
                                            return i.toString();
                                        }}
                                        style={{width: '100%'}}
                                    />
                                </View>
                            </View>
                            <ScrollView showsVerticalScrollIndicator={false}
                                        bounces={true}
                                        overScrollMode={'never'}
                                        style={{backgroundColor: 'transparent', height: '100%'}}>

                                <>
                                    <InfoBox>
                                        <Option storeData={this.state.storeData}/>
                                        <View style={storeStyles.infoWrapper}>
                                            <StoreDetailTitle>가게정보</StoreDetailTitle>
                                            {
                                                this.renderStoreInfo()
                                            }
                                        </View>
                                    </InfoBox>
                                    {
                                        this.state.storeData?.promotion ?
                                            <InfoBox>
                                                <View style={storeStyles.infoWrapper}>
                                                    <StoreDetailTitle img={honeyTipIcn}>꿀정보</StoreDetailTitle>
                                                    <Text allowFontScaling={false} style={{lineHeight: 21}}>{this.state.storeData.promotion}</Text>
                                                </View>
                                            </InfoBox>
                                            : null
                                    }
                                    <InfoBox>
                                        <View style={storeStyles.infoWrapper}>
                                            <StoreDetailTitle img={bestMenuIcn}>베스트 메뉴 TOP3</StoreDetailTitle>
                                            <PrintImages navigation={this.props.navigation} title={this.state.storeData?.normalImgChips} thumbs={this.state?.thumb?.best} imageList={this.state.storeData.normalPhotoList} flag={true}/>
                                        </View>
                                    </InfoBox>
                                    <InfoBox>
                                        <View style={storeStyles.infoWrapper}>
                                            <StoreDetailTitle img={menuIcn}>메뉴</StoreDetailTitle>
                                            {
                                                this.state?.storeData.imgChips.length ?
                                                    <PrintImages navigation={this.props.navigation} title={this.state.storeData?.normalImgChips} thumbs={this.state.storeData.menuPhotoList} imageList={this.state.storeData.menuPhotoList} flag={false}/>
                                                    : <Text>제보해주세요</Text>
                                            }
                                        </View>
                                    </InfoBox>
                                    {/*<View style={storeStyles.yelpBox}>
                                        <TouchableWithoutFeedback onPress={() => Linking.openURL(this.state.storeData.yelpLink)}>
                                            <View style={{flexDirection: 'row', alignItems:'center', justifyContent: 'space-between'}}>
                                                <View style={{flexDirection: 'row', alignItems:'center'}}>
                                                    <FastImage
                                                        resizeMode={FastImage.resizeMode.contain}
                                                        style={{width: 23, height: 23, marginRight: 5}}
                                                        source={require('../../assets/Foodup_icons/yelp.png')}
                                                    />
                                                    <Text allowFontScaling={false} style={{paddingLeft: 5, fontSize: 14}}>Yelp에서 더 자세히 알아보기</Text>
                                                </View>
                                                <FastImage
                                                    resizeMode={FastImage.resizeMode.contain}
                                                    style={{width: 23, height: 23, marginRight: 5}}
                                                    source={require('../../assets/Foodup_icons/yelp_arrow.png')}
                                                />
                                            </View>
                                        </TouchableWithoutFeedback>
                                    </View>*/}
                                </>

                            </ScrollView>
                        </View>
                        : <Loading/>
                    }

                </Content>
            </Container>
        );
    }
}

export default StoreScreen;
