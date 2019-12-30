import React, {Component} from 'react';
import config from 'src/config';
import { View, Text, TouchableOpacity, StyleSheet, Alert,} from 'react-native';
import {NavigationActions} from 'react-navigation';

import ImagePicker from 'react-native-image-crop-picker';



export default class QuickSnapCameraCrop extends Component {
  constructor() {
    super();
    this.state = {
      imageData : null,
    };
  }

  static navigationOptions = ({ navigation }) => {     
    console.log("QuickSnapCameraCrop navi : ", navigation);
    return {
      header: null
    }
  }

  componentDidMount() {
    console.log("QuickSnapCameraCrop componentDidMount()");
    this.setState({imageData : this.props.navigation.state.params.imageData})
  }


  componentWillUnmount() {
    console.log("QuickSnapCameraCrop componentWillUnmount()");
  }

  cropLast() {
    if (!this.state.imageData) {
      return Alert.alert('No image', 'Before open cropping only, please select image');
    }

    ImagePicker.openCropper({
      path: this.state.imageData.uri,
      //cropping : true,
      hideBottomControls : true,
      cropperStatusBarColor : config.colors.headerColor,
      cropperToolbarColor : config.colors.headerColor,
      freeStyleCropEnabled : true,
      showCropGuidelines : false,

    }).then(image => {
      console.log('received cropped image', image);
      
      this.props.navigation.navigate("quicksnapNewImage", {
        cropImageData : image,
        location : this.props.navigation.state.params.location
      })

    }).catch(e => {
      console.log(e);
      this.props.navigation.goBack();
    });
  }
  

  render() {  
    console.log("QuickSnapCameraCrop render() : ", this.state.imageData);

    return (
      <View style={styles.container}>
        <View style={styles.preview}>
          {this.state.imageData ? this.cropLast() :  null}
        </View>
      </View>
    );
  }
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "black"
  },
  preview: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  bottom : { 
    flex: 0, 
    flexDirection: "row", 
    justifyContent: "center",
    alignItems : "center",
    marginTop : 30,
  },
  cancel : {
    flex : 1,
    alignItems : "center"
  },
  use :{
    flex : 1,
    alignItems : "center"
  },
});