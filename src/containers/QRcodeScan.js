import React, {Component} from 'react';
import {BackIcon, MenuIcon, HeaderTitle} from 'src/components/header';
import config from 'src/config';
import { Text, View, Linking, TouchableHighlight, PermissionsAndroid, Platform, StyleSheet} from 'react-native';
import { CameraKitCameraScreen, } from 'react-native-camera-kit';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

export default class QRcodeScan extends Component {
  constructor() {
    super();
    this.state = {
      //variable to hold the qr valuep
      qrvalue: '',
      opneScanner: true,
    };
  }

  static navigationOptions = ({ navigation }) => {   
    return {
      header : null
      
    }
  }

  login = async (qrvalue) => {
    let access_info = JSON.parse(qrvalue);
    try {
      if (!access_info.access_token){
        throw new Error("Access Token is not set");
      } else {
        let send_data = {
          category: "private",
          service: "GetUserInformation",
          access_token: access_info.access_token,
        }
        const response = await axios.post(config.baseUrl + '/api/', {"data" : send_data});
        if(response.data.err){
          throw new Error("Access Token is not avaliable");
        }
      }
      await AsyncStorage.setItem('access_info', JSON.stringify(access_info));
      config.baseUrl = access_info.host;
      //config.baseUrl = "https://" + access_info.ip + ':' + access_info.port;
      this.props.navigation.navigate("home");
      
    } catch (err) {
      alert(err.message);
    }
  }

  componentDidMount() {
    console.log("QR CODE SCAN componentDidMount()");
    this.onOpneScanner(); 
  }

  onOpenlink() {
    //Function to open URL, If scanned 
    Linking.openURL(this.state.qrvalue);
    //Linking used to open the URL in any browser that you have installed
  }

  onBarcodeScan(qrvalue) {
    //called after te successful scanning of QRCode/Barcode
    console.log("QR CODE SCAN : ", qrvalue);
    this.setState({ qrvalue: qrvalue });
    this.setState({ opneScanner: false });
    this.login(qrvalue);
  }

  onOpneScanner() {
    var that =this;
    //To Start Scanning
    if(Platform.OS === 'android'){
      async function requestCameraPermission() {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,{
              'title': 'CameraExample App Camera Permission',
              'message': 'CameraExample App needs access to your camera '
            }
          )
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            //If CAMERA Permission is granted
            that.setState({ qrvalue: '' });
            that.setState({ opneScanner: true });
          } else {
            alert("CAMERA permission denied");
          }
        } catch (err) {
          alert("Camera permission err",err);
          console.warn(err);
        }
      }
      //Calling the camera permission function
      requestCameraPermission();
    }else{
      that.setState({ qrvalue: '' });
      that.setState({ opneScanner: true });
    }    
  }
  render() {
    let displayModal;
    //If qrvalue is set then return this view
    /*
    if (!this.state.opneScanner) {
      return (
        <View style={styles.container}>
            <Text style={styles.heading}>React Native QR Code Example</Text>
            <Text style={styles.simpleText}>{this.state.qrvalue ? 'Scanned QR Code: '+this.state.qrvalue : ''}</Text>
            {this.state.qrvalue.includes("http") ? 
              <TouchableHighlight
                onPress={() => this.onOpenlink()}
                style={styles.button}>
                  <Text style={{ color: '#FFFFFF', fontSize: 12 }}>Open Link</Text>
              </TouchableHighlight>
              : null
            }
            <TouchableHighlight
              onPress={() => this.onOpneScanner()}
              style={styles.button}>
                <Text style={{ color: '#FFFFFF', fontSize: 12 }}>
                Open QR Scanner
                </Text>
            </TouchableHighlight>
        </View>
      );
    }
    */
    return (
      <View style={{ flex: 1 }}>
        <CameraKitCameraScreen
          actions={{ rightButtonText: 'Done', leftButtonText: 'Cancel' }}
          onBottomButtonPressed={() => this.props.navigation.goBack()}
          cameraOptions={{
            flashMode: 'auto',             // on/off/auto(default)
            focusMode: 'on',               // off/on(default)
            zoomMode: 'on',                // off/on(default)
            ratioOverlay:'1:1',            // optional, ratio overlay on the camera and crop the image seamlessly
            ratioOverlayColor: '#00000077' // optional
          }}
          showFrame={true}
          //Show/hide scan frame
          scanBarcode={true}
          //Can restrict for the QR Code only
          laserColor={'blue'}
          //Color can be of your choice
          frameColor={'white'}
          //If frame is visible then frame color
          colorForScannerFrame={'black'}
          //heightForScannerFrame = {0}
          //offsetForScannerFrame ={0}
          //hideControls={true}
          //Scanner Frame color
          onReadCode={event =>
            this.onBarcodeScan(event.nativeEvent.codeStringValue)
          }
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'white'
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#2c3539',
    padding: 10,
    width:300,
    marginTop:16
  },
  heading: { 
    color: 'black', 
    fontSize: 24, 
    alignSelf: 'center', 
    padding: 10, 
    marginTop: 30 
  },
  simpleText: { 
    color: 'black', 
    fontSize: 20, 
    alignSelf: 'center', 
    padding: 10, 
    marginTop: 16
  }
});