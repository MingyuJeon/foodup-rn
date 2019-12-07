import React, {Component} from "react";
import {StatusBar} from 'react-native';
import FastImage from "react-native-fast-image";
import {Container, Content, Text, View} from 'native-base';
import GeneralHeader from '../components/GeneralHeader';
import EStyleSheet from 'react-native-extended-stylesheet';

class CustomerServiceScreen extends Component {
    static navigationOptions = {header: null};

    render() {
        return (
            <Container>
                <StatusBar hidden={true}/>
                <GeneralHeader navigation={this.props.navigation}/>
                <Content
                    contentContainerStyle={{
                        flex: 1, justifyContent: 'center', backgroundColor: '#f90631',
                    }}
                    scrollEnabled={false}
                >
                    <View style={{
                        backgroundColor: '#fff',
                        borderTopStartRadius: 15,
                        borderTopEndRadius: 15,
                        paddingTop: 10,
                        paddingLeft: 10,
                        paddingRight: 10,
                        height: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <FastImage
                            resizeMode={FastImage.resizeMode.contain}
                            style={{justifyContent: 'center', alignSelf: 'center', width: 200, height: 200}}
                            source={require('../../assets/Foodup_icons/callcenter.png')}
                        />
                        <Text>General Inquiries & Comments | 일반 문의 및 의견</Text>
                        <Text>info@foodupktown.com</Text>
                        <Text>213-428-2900</Text>
                        <Text>Advertising | 광고 문의</Text>
                        <Text>ad@foodupktown.com</Text>
                        <Text>Add & Update Store Information | 가게 추가 및 정보 업데이트</Text>
                        <Text>store@foodupktown.com</Text>
                    </View>
                </Content>
            </Container>
        );
    }
}

const styles = EStyleSheet.create({
    mainHeading: {
        color: '#000',
        fontSize: '2rem',
        fontFamily: 'ThecircleB',
        textAlign: 'left',
    }
});

export default CustomerServiceScreen;
