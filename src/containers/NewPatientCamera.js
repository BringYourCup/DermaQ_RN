import React, {Component} from 'react';
import {BackIcon, MenuIcon, HeaderTitle} from 'src/components/header';
import config from 'src/config';
import { View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import { RNCamera } from "react-native-camera";
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';


export default class NewPatientCamera extends Component {
  constructor() {
    super();
    this.state = {
       cameraType: RNCamera.Constants.Type.front
    };
  }

  static navigationOptions = ({ navigation }) => {       
    return {
      header: null
    }
  }

  onCropPic = data => {
    console.log("onCropPic : ", data);
    this.setState({cropPicture : data});
  }

  componentDidMount() {
    console.log("NewPatient Camera componentDidMount()");
  }

  takePicture = async function() {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const imageData = await this.camera.takePictureAsync(options);
 
      console.log("ImageData : ", imageData);
      
      this.props.navigation.navigate("newPatientCameraCrop", 
      {imageData : imageData,
        onCropPic : this.onCropPic,
      });
      //this.props.navigation.goBack();
      //this.props.navigation.state.params.onTakePic(imageData);
    }
  }
  reverseCamera = () => {
    if(this.state.cameraType == RNCamera.Constants.Type.front){
      this.setState({cameraType : RNCamera.Constants.Type.back})
    } else {
      this.setState({cameraType : RNCamera.Constants.Type.front})
    }
  }

  render() {
    console.log("AAAAAAAAAAAAAAAAAA: ", this.props.navigation.state.params);
    if(this.state.cropPicture != null)  {
      this.props.navigation.goBack();
      this.props.navigation.state.params.onTakePic(this.state.cropPicture);
      return null;
    }
    return (
      <View style={styles.container}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={this.state.cameraType}
          flashMode={RNCamera.Constants.FlashMode.on}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
        />
        <View
          style={styles.bottom}
        >
          <TouchableOpacity
            style={styles.cancel}
            onPress={() =>{this.props.navigation.goBack()}}>
            <Text style={{ fontSize: 14, color : "white" }}> CANCEL </Text>
          </TouchableOpacity>          
          <TouchableOpacity 
            style={styles.capture} 
            onPress={this.takePicture.bind(this)}>
            <Icon name="photo-camera"
                  color="white"
                  size={36}
                  underlayColor="#4BA6F8" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>{this.reverseCamera()}}
            style={styles.reverse}>
            <Ionicons name="ios-reverse-camera"
                  color="white"
                  size={36}
                  underlayColor="#4BA6F8" />
          </TouchableOpacity>
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
    //marginTop : 30,
  },
  cancel : {
    flex : 1,
    justifyContent: "center",
    alignItems : "center"
  },
  capture: {
    flex: 1,
    justifyContent: "center",
    alignItems : "center"
  },
  reverse :{
    flex : 1,
    justifyContent: "center",
    alignItems : "center"
  },
});