import React, {Component} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity, ImageBackground, StatusBar, TouchableOpacityBase} from 'react-native';
import config from 'src/config';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

export default class StartScreen extends Component {

  state ={
    loginStatus: 'noaccount',
    email: "lazysupport@dermaster.io",
    password: "Hotice1234!1",
    isLoading : false,
  }

  login = async (status) => {
    let send_data = null;
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
      if(response.data.data) {
        await AsyncStorage.setItem('access_info', JSON.stringify(response.data.data));
        this.props.navigation.navigate("home");
      }
    } catch (err) {
      console.log(err);
    }
  }
  render() {
    const dermateLogImage = config.images.dermateLogImage;
    const backGroundImage = config.images.dermateHomeScreen;

    

    return (      
      <View style={styles.container}>
        <StatusBar backgroundColor={config.colors.headerColor} barStyle='light-content'/>
        <ImageBackground source={backGroundImage} style={{width : "100%", height : "100%"}}>
          <View style={styles.header}>
            <Image
              style={{width : 50, height : 50}}
              source={dermateLogImage}/>
            <Text style={styles.title}>D E R M A T E</Text>
          </View>
          <View style={styles.body}>
            
          </View>
          <TouchableOpacity style={styles.bottom} onPress={() => this.login("SignIn")}>
            <Text style={styles.item}>START without QR CODE</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.bottom} onPress={() => this.props.navigation.navigate('qrcodescan')}>
            <Text style={styles.item}>START with QR CODE</Text>
          </TouchableOpacity>
        </ImageBackground>
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
    flexDirection : "column"
  },
  header : {
    flex : 4,
    justifyContent : "center",
    alignItems : "center",
    
  },
  title : {
    marginTop : 5,
    fontSize : 24,
  },
  body : {
    flex : 5,
    flexDirection : "column",
    alignItems : "center",
    //backgroundColor : "green",
    width : "100%",
  },
  bottom : {
    flex : 0.5,
    //backgroundColor : "green",
    width : "90%",
    backgroundColor: config.colors.startButtonColor,
    padding:10,
    margin : 10,
    borderRadius: 10,
    justifyContent : "center",
    alignSelf : "center",
  },
  item : {
    alignItems : "center",
    color : "white",
    textAlign : "center",
    fontSize : 18
    
  }
})