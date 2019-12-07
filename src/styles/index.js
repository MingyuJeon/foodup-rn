import EStyleSheet from 'react-native-extended-stylesheet';

const globalStyles = EStyleSheet.create({
    content: {flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', paddingBottom: 15},
    header: {
        paddingLeft: 20, paddingRight: 20, paddingBottom: 20, paddingTop: 20,
        backgroundColor: '$themeColor', borderBottomColor: '$themeColor'
    },
    btn: {
        justifyContent: 'center',
    },
    logoSize: {
        width: '100%',
        height: '100%'
    }
});

export default globalStyles;
