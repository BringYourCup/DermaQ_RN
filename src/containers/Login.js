import React, {Component} from 'react';
import {View, Text, Button, StyleSheet, StatusBar, ActivityIndicator } from 'react-native';
import config from 'src/config';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

export default class Login extends Component {

  state ={
    loginStatus: 'noaccount',
    email: "lazysupport@dermaster.io",
    password: "Hotice1234!1",
    isLoading : false,
  }


  static navigationOptions = {
    header : null
  };

  login = async (status) => {
    let send_data = null;

    this.setState({isLoading: true});
    switch(status){
      case "SignIn":
          send_data = {
            category: "public",
            service: "SignIn",
            account: this.state.email,
            password: this.state.password,
        }
        break;
    }
    try {
      const response = 
        await axios.post(config.baseUrl + '/api/', {"data" : send_data});
      this.setState({isLoading: false});
      if(response.data.data) {
        await AsyncStorage.setItem('access_info', JSON.stringify(response.data.data));
        this.props.navigation.navigate("home");
      }
    } catch (err) {
      console.log(err);
    }
  }


  register(){
    this.props.navigation.navigate("register");
  }
  render() {
    return (
          <View style={styles.container}>
            <StatusBar backgroundColor={config.colors.headerColor} barStyle='light-content'/>
            <Button onPress={() => this.login("SignIn")} title="Login"/>
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