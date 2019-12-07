import EStyleSheet from 'react-native-extended-stylesheet';

const categoryStyles = EStyleSheet.create({
    textContainer: {
        width: '100%',
        backgroundColor: '$themeColor',
        paddingLeft: 10,
        paddingBottom: 20,
        // paddingTop: 20,
        height: 140,
        flexDirection: 'row',
    },
    categoryImage: {
        width: '90%',
        height: '90%'
    },
    subTitle: {
        textAlign: 'left',
        fontFamily: '$font',
        color: '#fff',
        fontSize: '1.5rem',
        marginLeft: 15
    },
    categoryNameTitle: {
        textAlign: 'left',
        fontFamily: '$font',
        color: '#fff',
        fontSize: '2.5rem',
        marginLeft: 15,
        flex: 1,
    },
    storeContainer: {
        width: '70%',
        height: '100%',
        backgroundColor: '#fff',

        flexDirection: 'row',

        shadowColor: '#000',
        shadowOffset: {width:0, height: .1},
        shadowOpacity: .1,
        shadowRadius: 2,
        elevation: 2,
        position:'absolute',
        left:'30%',

        borderBottomLeftRadius: 17,
        borderRightColor: '#fff',
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
    },
    storeName: {
        fontFamily: '$font',
        fontSize: '1rem'
    },
    storeAddr: {
        color: '#C0C0C0',
        marginTop: 5,
        marginBottom: 11,
        fontSize: '.7rem'
    },
    opt: {
        flexDirection: 'row',
        flex: 1
    },
    icn: {width: 20, height:20, margin: 2},

});

export default categoryStyles;
