import React, {Component} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

export default class HomeScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Button onPress={() => this.props.navigation.navigate('patients')} title="Patient"/>
        <Button onPress={() => this.props.navigation.navigate('quicksnaps')} title="Quick Snap"/>
        <Button onPress={() => this.props.navigation.navigate('profiles')} title="Profile"/>
        <Button onPress={() => this.props.navigation.navigate('guides')} title="Guide"/>
      </View>
      );
  }
}

const styles = StyleSheet.create({
  container : {
    height:"100%", 
    flex:1,
    justifyContent:"center",
    //alignItems: "center",
  }
})