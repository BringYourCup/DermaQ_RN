import React, {Component} from 'react';
import {BackIcon, MenuIcon, HeaderTitle} from 'src/components/header';
import config from 'src/config';
import { View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import { RNCamera } from "react-native-camera";
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

const DESIRED_RATIO = "1:1";


export default class QuickSnapCamera extends Component {
  constructor() {
    super();
    this.state = {
       cameraType: RNCamera.Constants.Type.back,
       ratio : DESIRED_RATIO,
    };
  }

  static navigationOptions = ({ navigation }) => {       
    return {
      header: null
    }
  }

  componentDidMount() {
    console.log("QuickSnapCamera componentDidMount()");
    /*
    this.subs = [
      this.props.navigation.addListener("didFocus", () => {console.log("QuickSnapCamera didFocus"); this.setState({ isFocused: true });}),
      this.props.navigation.addListener("willBlur", () => {console.log("QuickSnapCamera willBlur"); this.setState({ isFocused: false });}),
    ];
    */
  }

  componentWillUnmount() {
    console.log("QuickSnap componentWillUnmount()");
    /*
    this.subs.forEach((sub) => {
      sub.remove();
    });
    */
  }

  takePicture = async function() {
    try{
      if (this.camera) {
        //const options = { quality: 1.0, base64: false, pauseAfterCapture : true };        
        
        const options = { quality: 1.0, 
            base64: false, 
            pauseAfterCapture : true,
            
        };
        const imageData = await this.camera.takePictureAsync(options);
  
        console.log("ImageData : ", imageData);
        
        this.props.navigation.navigate("quicksnapCameraCrop", 
        {imageData : imageData,
          location : this.props.navigation.state.params.location
          
        });    
      }
    } catch(e) {
      console.log(e);
    }
  }
  reverseCamera = () => {
    if(this.state.cameraType == RNCamera.Constants.Type.front){
      this.setState({cameraType : RNCamera.Constants.Type.back})
    } else {
      this.setState({cameraType : RNCamera.Constants.Type.front})
    }
  }

  prepareRatio = async () => {
    if (Platform.OS === 'android' && this.camera) {
        const ratios = await this.camera.getSupportedRatiosAsync();

        // See if the current device has your desired ratio, otherwise get the maximum supported one
        // Usually the last element of "ratios" is the maximum supported ratio
        console.log("Image Camara ratios : ", ratios);
        const ratio = ratios.find((ratio) => ratio === DESIRED_RATIO) || "4:3";
        console.log("Image Camara ratio : ", ratio);
        this.setState({
            ratio
        });
    }
  }

  render() {
    console.log("AAAAAAAAAAAAAAAAAA: ", this.props.navigation.state.params);
    return (
      <View style={styles.container}>
        <View style={styles.body}>
          <RNCamera
            ref={ref => {
              this.camera = ref;
            }}
            
            onCameraReady = {
              this.prepareRatio
            }
            ratio={this.state.ratio}
            style={styles.preview}
            type={this.state.cameraType}
            autoFocus="auto"
            playSoundOnCapture={true}
            
            flashMode={RNCamera.Constants.FlashMode.off}
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
        </View>
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
  body: {
    flex: 8,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  preview : {
    width : config.styleConstants.width,
    height : config.styleConstants.width,
  },
  bottom : { 
    flex: 2, 
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