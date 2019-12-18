import React, {Component} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity, ImageBackground, StatusBar} from 'react-native';
import config from 'src/config';

export default class HomeScreen extends Component {
  render() {
    const dermateLogImage = config.images.dermateLogImage;
    const patientImage = config.images.patientIcon;
    const quickSnapImage = config.images.quickSnapIcon;
    const liveImage = config.images.liveIcon;
    const galleryImage = config.images.galleryIcon;
    const backGroundImage = config.images.dermateHomeScreen;

    return (      
      <View style={styles.container}>
        <StatusBar backgroundColor={config.colors.statusBarColor} barStyle='light-content'/>
        <ImageBackground source={backGroundImage} style={{width : "100%", height : "100%"}}>
          <View style={styles.header}>
            <Image
              style={{width : 50, height : 50}}
              source={dermateLogImage}/>
            <Text style={styles.title}>D E R M A T E</Text>
          </View>
          <View style={styles.body}>
            <View style={styles.bodySub}>
              <TouchableOpacity style={styles.item } onPress={() => this.props.navigation.navigate('patients')}>
                <Image
                  style={{width : 40, height : 40}}
                  source={patientImage}/>
                <Text>Patient</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.item} onPress={() => this.props.navigation.navigate('quicksnaps')}>
                <Image
                  style={{width : 40, height : 40}}
                  source={quickSnapImage}/>
                <Text>Quick Snap</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.bodySub}>
              <TouchableOpacity style={styles.item} onPress={() => this.props.navigation.navigate('lives')}>
                <Image
                  style={{width : 40, height : 40}}
                  source={liveImage}/>
                <Text>Live</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.item} onPress={() => this.props.navigation.navigate('galleries')}>
              <Image
                  style={{width : 40, height : 40}}
                  source={galleryImage}/>
                <Text>Gallery</Text>
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
    padding:10,
	  backgroundColor: '#d5dadd',
    borderRadius: 10,
    marginRight : 10,
    width : 100,
    height : 100,
    justifyContent : "center",
    alignItems : "center",
    
  }
})