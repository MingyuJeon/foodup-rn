import EStyleSheet from 'react-native-extended-stylesheet';

const homeStyles = EStyleSheet.create({
    // HomeScreen.js
    TextContainer: {
        height: '35%',
        width: '100%',
        backgroundColor: '$themeColor',
        paddingLeft: 30,
        paddingBottom: 20,
        paddingTop: 20,
        top: 0,
        position: 'absolute',
        zIndex: 1,
    },
    TextStr: {
        fontFamily: '$font',
        color: '#fff',
        fontSize: '3rem',
    },
    headerImg: {
        width: '2rem',
        height: '2rem',
    },

    // CategoryImage.js
    categoryImageListScrollView: {
        backgroundColor: 'transparent',
    },
    categoryImageListContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        // paddingLeft: 10,
        // paddingRight: 10,
        flexWrap: 'wrap',
        width: '100%'
    },
    categoryImageCard: {
        height: '6.5rem',
        width: '6.5rem',
        margin: 5,

        borderWidth: 1,
        borderRadius: 15,
        borderColor: '#ddd',
        borderBottomWidth: 0.3,

        shadowColor: '#000',
        shadowOffset: {width:0, height: .5},
        shadowOpacity: .3,
        shadowRadius: 2,

        elevation: 5,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    categoryImage: {
        height: '3rem',
        width: '3rem',
    }
});

export default homeStyles;
