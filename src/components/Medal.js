import React from 'react';
import FastImage from 'react-native-fast-image';
import ad from '../../assets/Foodup_icons/red_icons/ad.png';
import gold from '../../assets/Foodup_icons/medal/medal1.png';
import silver from '../../assets/Foodup_icons/medal/medal2.png';
import bronze from '../../assets/Foodup_icons/medal/medal3.png';
import EStyleSheet from 'react-native-extended-stylesheet';

const RenderMedal = (i, featuredStore) => {
    const adMedal = [ad, gold, silver, bronze];
    const medal = [gold, silver, bronze];

    return (
        <FastImage
            resizeMode={FastImage.resizeMode.contain}
            style={[(i===3 && !featuredStore) ? {width:0, height:0} : styles.medal, (featuredStore && i === 0) ? styles.ad : styles.medal]}
            source={featuredStore? adMedal[i] : medal[i]}
        />
    );
};
const Medal = ({i, featuredStore}) => RenderMedal(i, featuredStore);

const styles = EStyleSheet.create({
    medal: {width: 19, height: 29, position: 'absolute', left: 10, zIndex: 2},
    ad: {width: 30, height: 29, position: 'absolute', left: 5, top: 5, zIndex: 2}
});

export default Medal;
