import React from 'react';
import {View} from 'react-native';
import GeneralHeader from '../components/GeneralHeader';
import Gallery from 'react-native-image-gallery';
import {Container, Content, Text} from 'native-base';

//TODO: Image 주입, 이름 출력
class ImageGalleryScreen extends React.Component {
    static navigationOptions = {header: null};
    state = {
        initialIndex: 0,
        images: [],
        flag: false,
    };

    componentDidMount(): void {
        this.getImage();
    }

    getImage = async () => {
        const initialIndex = await this.props.navigation.getParam('initialIndex');
        const imageList = await this.props.navigation.getParam('images');
        const title = await this.props.navigation.getParam('title');
        const flag = await this.props.navigation.getParam('flag');

        const images = imageList.filter(image => image !== '').map((image, i) => {
            return {
                caption: title[i].name,
                source: {uri: image},
            };
        });

        this.setState({...this.state, images, initialIndex, flag});
    };

    setIndex = (index) => {
        this.setState({...this.state, initialIndex: index});
    };

    render() {
        return (
            <Container style={{backgroundColor: '#000'}}>
                <GeneralHeader flag={true} navigation={this.props.navigation}/>
                <Content contentContainerStyle={{flex: 1, height: '100%', backgroundColor: '#000'}}>
                    {
                        this.state.images.length ?
                            <Gallery
                                images={this.state.images}
                                initialPage={this.state.initialIndex}
                                onPageSelected={this.setIndex}
                                maxScale={10}
                            /> : null
                    }
                    {
                        this.state.flag ?
                            <View style={{bottom: 0, height: 65, backgroundColor: '#000', width: '100%', position: 'absolute', justifyContent: 'center'}}>
                                <Text style={{
                                    textAlign: 'center',
                                    color: 'white',
                                    fontSize: 15,
                                }}>{this.state.images[this.state.initialIndex]?.caption.split('.').slice(0, -1).join() || 'No Named'} </Text>
                            </View> : null
                    }
                </Content>
            </Container>
        );
    }
};

export default ImageGalleryScreen;
