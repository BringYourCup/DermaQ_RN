import React, {Component} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity, ImageBackground, StatusBar} from 'react-native';
import config from 'src/config';

export default class HomeScreen extends Component {
  render() {
    const dermateLogImage = config.images.menuLogo;
    const patientImage = config.images.menuPatient;
    const quickSnapImage = config.images.menuQuickSnap;
    const liveImage = config.images.menuLive;
    const galleryImage = config.images.menuGallery;
    const backGroundImage = config.images.dermateHomeScreen;

    return (      
      <View style={styles.container}>
        <StatusBar backgroundColor={config.colors.statusBarColor} barStyle='light-content'/>
        <ImageBackground source={backGroundImage} style={{width : "100%", height : "100%"}}>
          <View style={styles.header}>
            <Image
              style={{width : 150, height : 150, resizeMode: "contain"}}
              source={dermateLogImage}/>
          </View>
          <View style={styles.body}>
            <View style={styles.bodySub}>
              <TouchableOpacity style={styles.item } onPress={() => this.props.navigation.navigate('patients')}>
                <Image
                  style={{width : 100, height : 100}}
                  source={patientImage}/>
              </TouchableOpacity>
              <TouchableOpacity style={styles.item} onPress={() => this.props.navigation.navigate('quicksnaps')}>
                <Image
                  style={{width : 100, height : 100}}
                  source={quickSnapImage}/>
              </TouchableOpacity>
            </View>
            <View style={styles.bodySub}>
              <TouchableOpacity style={styles.item} onPress={() => this.props.navigation.navigate('lives')}>
                <Image
                  style={{width : 100, height : 100}}
                  source={liveImage}/>
              </TouchableOpacity>
              <TouchableOpacity style={styles.item} onPress={() => this.props.navigation.navigate('galleries')}>
              <Image
                  style={{width : 100, height : 100}}
                  source={galleryImage}/>
              </TouchableOpacity>
              
            </View>
          </View>
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
    flex : 6,
    flexDirection : "column",
    alignItems : "center",
    //backgroundColor : "green"
  },
  bodySub : {
    flexDirection : "row",
    padding : 5,
  },
  item : {
    //padding:10,
	  //backgroundColor: '#d5dadd',
    borderRadius: 10,
    marginRight : 10,
    //width : 100,
    //height : 100,
    justifyContent : "center",
    alignItems : "center",
    
  }
})