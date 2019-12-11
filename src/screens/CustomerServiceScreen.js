import React, {Component} from 'react';
import {StatusBar} from 'react-native';
import FastImage from 'react-native-fast-image';
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
                    <View style={styles.mainHeading}>
                        <View>
                            <View style={styles.block}>
                                <Text style={styles.headTitle}>General Inquiries & Comments</Text>
                                <Text style={styles.subTitle}>일반 문의 및 의견</Text>
                            </View>
                            <View style={styles.subBlock}>
                                <Text style={styles.contents}>info@foodupktown.com</Text>
                                <Text style={styles.contents}>213-428-2900</Text>
                            </View>
                            <View style={styles.block}>
                                <Text style={styles.headTitle}>Advertising</Text>
                                <Text style={styles.subTitle}>광고 문의</Text>
                            </View>
                            <View style={styles.subBlock}>
                                <Text style={styles.contents}>ad@foodupktown.com</Text>
                            </View>
                            <View style={styles.block}>
                                <Text style={styles.headTitle}>Add & Update Store Information</Text>
                                <Text style={styles.subTitle}>가게 추가 및 정보 업데이트</Text>
                            </View>
                            <View style={styles.subBlock}>
                                <Text style={styles.contents}>store@foodupktown.com</Text>
                            </View>
                        </View>
                        <FastImage
                            resizeMode={FastImage.resizeMode.contain}
                            style={{justifyContent: 'center', alignSelf: 'center', width: 200, height: 200}}
                            source={require('../../assets/Foodup_icons/callcenter.png')}
                        />
                    </View>
                </Content>
            </Container>
        );
    }
}

const styles = EStyleSheet.create({
    mainHeading: {
        // color: '#000',
        // fontSize: '2rem',
        // fontFamily: 'ThecircleB',
        // textAlign: 'left',
        backgroundColor: '#fff',
        borderTopStartRadius: 15,
        borderTopEndRadius: 15,
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    block: {
        marginBottom: 15,
    },
    subBlock: {
        marginBottom: 40,
    },
    headTitle: {
        color: '#333',
        fontSize: 20,
        fontFamily: '$font',
        fontWeight: 'bold'
    },
    subTitle: {
        color: '#333',
        fontSize: 16,
        fontWeight: 'bold'
    },
    contents: {
        color: '#333',
        fontSize: 14,
    },
});

export default CustomerServiceScreen;
