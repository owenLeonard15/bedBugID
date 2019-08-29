import React from 'react';
import { ActivityIndicator, Text, View, TouchableOpacity, Image } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import { Ionicons, Entypo } from '@expo/vector-icons';
import styles from './styles';

import {ApiService} from "../api";


export default class CameraPage extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    flash: Camera.Constants.FlashMode.on,
    hasPhoto: false,
    photoURI: null,
    loading: false,
    predictionData: null
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  snap = async () => {
    if (this.camera) {
      let photo = await this.camera.takePictureAsync({quality: 1});
      this.setState({
            photoURI: photo.uri,
            hasPhoto: true,
            loading: true
        })
      this.sendToModel(photo)
    }
  };

  unsnap = () => {
    this.setState({
        photoURI: null,
        hasPhoto: false
    })
  }

  goToLibrary = async () => {
      try{
        const pingData = await ApiService.ping()
      } catch (e) {
        this.setState({loading: false})
        alert(e)
        console.log(e)
      }
  }



  sendToModel = async (imageData) => {
    try {
      const predictionData = await ApiService.predict(imageData.uri);
      this.setState({predictionData: predictionData.result, loading: false});

  } catch (e) {
      this.setState({loading: false});
      alert(e);
      console.log(e)

  }
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
                    <Camera style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-end', height: '50%'}} type={this.state.type} flashMode={this.state.flash}
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
            return (
                <View style={styles.page2Style}>
                    <Image style={styles.picPreview} source={{uri: `${this.state.photoURI}`}} />
                    { this.state.loading 
                    ?
                    <View style={styles.buttonRow3}>
                      <ActivityIndicator size='large' color='#fffff' id="actInd"/>
                    </View> 
                    :
                    <>
                    <View style={styles.buttonRow3}>
                      {this.state.predictionData === 'notbedbug'
                        ?
                        <Text style={styles.goodBug}>This bug is harmless</Text>
                        :
                        <Text style={styles.badBug}>We recommend you call an exterminator</Text>
                      }
                    </View> 
                    <View style={styles.buttonRow2}>
                        <TouchableOpacity style={styles.buttonRow2} onPress={this.unsnap}>
                            <Ionicons name='ios-arrow-back' size={50} style={styles.backArrow}  />
                            <Text style={{color: 'white', fontSize: 30}}>Camera</Text>
                        </TouchableOpacity>
                    </View>
                    </>
                    }
                </View>
            )
        }
    }
  }
}