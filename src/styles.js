import { StyleSheet, Dimensions } from 'react-native';

const { width: winWidth, height: winHeight } = Dimensions.get('window');

export default StyleSheet.create({
    backArrow: {
        color: 'white',
        width: 50
    },
    buttonRow:{
        display: 'flex',
        justifyContent: 'space-around',
        flexDirection: 'row',
        marginTop: 300,
        marginBottom: 30
    },
    buttonRow2:{
        position: 'absolute',
        bottom: 20,
        left: 20,
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        width: winWidth,
    },
    buttonRow3:{
        position: 'absolute',
        bottom: .5 * winHeight,
        left: .45 * winWidth,
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        width: winWidth,
    },
    cameraFlip:{
        color: 'white',
        margin: 20
    },
    circleButton:{
        color: 'white',
        margin: 10
    },
    pageStyle:{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        width: winWidth,
        height: winHeight,
        backgroundColor: 'black',
        margin: 0
    },
    page2Style:{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: winWidth,
        height: winHeight,
        backgroundColor: 'black'
    },
    picPreview:{
       width: '100%',
       height: '100%'
    },
    photoLibrary:{
        color: 'white',
        margin: 20,
        marginTop: 30
    }
});