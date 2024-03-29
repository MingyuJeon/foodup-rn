import React from 'react';
import {Animated, Easing} from 'react-native';
import LottieView from 'lottie-react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import throttle from 'lodash.throttle';
import thumbup from '../../assets/animation/thumb-up.json';
import TouchableScale from 'react-native-touchable-scale';

class ThumbUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            progress: new Animated.Value(0),
        };
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return nextState.progress !== this.state.progress || nextProps.flag !== this.props.flag;
    }

    componentDidMount() {
        this.getFlag();
    }

    getFlag = async () => {
        if (this.props.flag) {
            Animated.timing(this.state.progress, {
                toValue: 1,
                duration: 800,
                easing: Easing.linear,
            }).start();
        }
    };

    renderIcn = () => (
        <LottieView progress={this.state.progress} source={thumbup} autoSize={true}/>
    );

    voting = throttle(() => {
        const index = this.props.i;

        Animated.timing(this.state.progress, {
            toValue: 1,
            duration: 800,
            easing: Easing.linear,
        }).start();
        this.props.onClickLike(index);
    }, 250);

    render() {
        return (
            <TouchableScale disabled={this.props.flag} onPress={this.voting} style={styles.thumbImg} activeScale={0.9}>
                {
                    this.renderIcn()
                }
            </TouchableScale>
        );
    }
}

const styles = EStyleSheet.create({
    thumbImg: {width: 60, height: 60, position: 'absolute', top: -10, right: 20},
});

export default ThumbUp;
