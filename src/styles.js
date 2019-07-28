import { StyleSheet, Dimensions } from 'react-native';

const { width: winWidth, height: winHeight } = Dimensions.get('window');

export default StyleSheet.create({
    backArrow: {
        color: 'white',
        backgroundColor: 'blue',
        margin: 30,
        width: 30
    },
    buttonRow:{
        display: 'flex',
        justifyContent: 'space-around',
        flexDirection: 'row',
        marginTop: 300,
        marginBottom: 30
    },
    buttonRow2:{
        display: 'flex',
        justifyContent: 'space-around',
        flexDirection: 'row',
        marginTop: 300,
        marginBottom: 30 
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
        justifyContent: 'flex-end'
    },
    photoLibrary:{
        color: 'white',
        margin: 20,
        marginTop: 30
    }
});