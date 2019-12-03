import React, {Component} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

export default class Login extends Component {
  static navigationOptions = {
    header : null
  };

  login(){
      this.props.navigation.navigate("main");
  }
  register(){
    this.props.navigation.navigate("register");
  }
  render() {
    return (
      <View style={styles.container}>
        <Button onPress={() => this.login()} title="Login"/>
        <Button onPress={() => this.register()} title="Register"/>
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