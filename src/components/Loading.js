import React from 'react';
import {View} from 'react-native';
import LottieView from "lottie-react-native";
import loadingAnimation from '../../assets/animation/loading'
//TODO: here design => border를 따로 줘야됨 디자인쪽에
const Loading = () => {
    return (
        <View style={{width:'100%', height:'100%', justifyContent: 'center', alignSelf:'center', position: 'absolute', backgroundColor: 'transparent', zIndex: 2}}>
            <LottieView autoPlay loop source={loadingAnimation} style={{justifyContent: 'center', alignSelf:'center', width: 100, height: 100}}/>
        </View>
    );
};

export default Loading;

