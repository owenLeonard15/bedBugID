import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';

export default class App extends Component {
  constructor(){
    super()
    this.state = {
      textColor: 'blue'
    }
  }
  
  clicked = () => {
    if( this.state.textColor === 'pink')
     this.setState({textColor: 'blue'})
    else
      this.setState({textColor: 'pink'})
  }
  render(){
    return (
      <View style={styles.container}>
        <TouchableOpacity  onPress={(target) => this.clicked(target)}>
         <Text style={[this.state.textColor === 'pink' ? (styles.pink) : (styles.blue), styles.title]}>Hello World</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold'
  },
  pink: {
    color: 'pink'
  },
  blue: {
    color: 'blue'
  }
});
