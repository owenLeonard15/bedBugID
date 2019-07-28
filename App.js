import React, {Component} from 'react';
import {View} from 'react-native';
import CameraPage from './src/camera.page';
import styles from './src/styles';
export default class App extends Component {

  render(){
    return (
      <View style={styles.pageStyle}>
        <CameraPage />
      </View>
    )
  }
}
