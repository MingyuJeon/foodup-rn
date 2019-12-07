import EStyleSheet from 'react-native-extended-stylesheet';
const font = {
    color: '#fff',
    fontFamily: '$font',
}

const storeStyles = EStyleSheet.create({
    titleContainer: {
        backgroundColor: '$themeColor',
        height: '10rem',
        marginBottom: '-2rem',
        justifyContent: 'center'
    },
    title: {
        ...font,
        textAlign: 'left',
        paddingLeft: '1rem',
        fontSize: '2rem',
    },
    tagsWrapper: {
        height: '3rem',
        margin: '.5rem',
        alignItems: 'flex-start',
    },
    tagContainer: {
        borderRadius: 15,
        borderColor: '$tagColor',
        borderWidth: 1,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 8,
        paddingRight: 8,
        backgroundColor: '$tagColor',
        marginLeft: '.2rem',
        marginRight: '.2rem',

        height: '1.8rem',
    },
    tag: {
        color: '#fff',
        fontSize: '.8rem',
        alignSelf: 'center'
    },
    infoTitleWrapper: {
        marginBottom: '.5rem',
        flexDirection: 'row',
    },
    infoTitle: {
        fontFamily: '$font',
        alignSelf: 'center',

        color: '#000',
        fontSize: '1.5rem',
    },
    infoWrapper: {
        padding: '1rem',
    },
    infoBox: {
        width: '90%',
        flex:1,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: {width: 0, height: .5},
        shadowOpacity: .3,
        shadowRadius: 2,
        borderRadius: 10,

        flexDirection: 'column',

        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: '1rem',
    },
    optionContainer: {
        flexDirection: 'row',
        width: '100%',
        height: 50,
        justifyContent: 'space-around',
        alignItems: 'center',
        borderBottomWidth: .5,
        borderBottomColor: '#ECECEC',
    },
    option: {
        flex:1,
    },
    touchableFont: {color: '$touchableFont'},
    imgSize: {width: 95, height: 95, marginLeft: '.2rem', marginRight: '.2rem', marginBottom: '.2rem', borderRadius: 10},
    imgName: {marginTop: 5, fontSize: '.8rem'},
    imagesWrapper: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingTop: '1rem',
        paddingLeft: '1rem',
        flexWrap: 'wrap',
        width: '100%'
    },
    yelpBox: {
        width: '90%',
        // height: '100%',
        flex:1,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: {width: 0, height: .5},
        shadowOpacity: .3,
        shadowRadius: 2,
        borderRadius: 10,

        flexDirection: 'column',

        marginLeft: 'auto',
        marginRight: 'auto',
        padding: '1rem',
    }
});

export default storeStyles;
