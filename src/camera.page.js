import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import { Ionicons, Entypo } from '@expo/vector-icons';
import styles from './styles';


export default class CameraPage extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    hasPhoto: false,
    photoURI: null
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
    const minSize = await this.camera.getAvailablePictureSizesAsync()
    this.setState({minPhotoSize: minSize[0]})
  }

  snap = async () => {
      console.log('snapping')
    if (this.camera) {
      let photo = await this.camera.takePictureAsync();
      this.setState({
            photoURI: photo.uri,
            hasPhoto: true
        })
    }
  };

  unsnap = () => {
      console.log(
        "unsnapping"
      )
    this.setState({
        photoURI: null,
        hasPhoto: false
    })
  }


  render() {
    const { hasCameraPermission, hasPhoto } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
        if (hasPhoto === false){
            return (
                <View style={styles.pageStyle}>
                    <Camera style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-end', height: '50%'}} type={this.state.type}
                        ref={ref => { this.camera = ref }}
                    >
                        <View
                        style={styles.buttonRow}>
                            <TouchableOpacity
                            onPress={() => {
                            this.setState({
                                type:
                                this.state.type === Camera.Constants.Type.back
                                    ? Camera.Constants.Type.front
                                    : Camera.Constants.Type.back,
                            });
                            }}>
                                <Ionicons name='ios-reverse-camera' size={50} style={styles.cameraFlip}/>
                            </TouchableOpacity>
                            <TouchableOpacity
                            onPress={this.snap}
                            >
                                <Entypo name='circle' size={75} style={styles.circleButton} />
                            </TouchableOpacity>
                            <TouchableOpacity
                            onPress={this.goToLibrary}
                            >
                                <Ionicons name='ios-photos' size={40} style={styles.photoLibrary}/>
                            </TouchableOpacity>
                        </View>
                    </Camera>
                </View>
            );
        }
        else{
        //photo has been taken
            return (
                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center'}}>
                    <Image style={{flex: 1, height: 50}} source={{uri: `${this.state.photoURI}`}} />
                    <View style={styles.buttonRow}>
                        <TouchableOpacity onPress={this.unsnap}>
                            <Ionicons name='ios-arrow-back' size={50} style={styles.backArrow}  />
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }
    }
  }
}