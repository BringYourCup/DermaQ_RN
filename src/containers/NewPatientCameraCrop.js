import React, {Component} from 'react';
import config from 'src/config';
import { View, Text, TouchableOpacity, StyleSheet, Alert,} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';



export default class NewPatientCameraCrop extends Component {
  constructor() {
    super();
    this.state = {
      cropImageData : null,
      imageData : null,
    };
  }

  static navigationOptions = ({ navigation }) => {       
    return {
      header: null
    }
  }

  componentDidMount() {
    this.setState({imageData : this.props.navigation.state.params.imageData})
    console.log("NewPatientCameraCrop componentDidMount()");
  }

  cropLast() {
    if (!this.state.imageData) {
      return Alert.alert('No image', 'Before open cropping only, please select image');
    }

    ImagePicker.openCropper({
      path: this.state.imageData.uri,
      width: 200,
      height: 200,
      cropperCircleOverlay: true,
      hideBottomControls : true,
      cropperStatusBarColor : config.colors.headerColor,
      cropperToolbarColor : config.colors.headerColor,

    }).then(image => {
      console.log('received cropped image', image);
      this.setState({
        cropImageData : {uri: image.path, width: image.width, height: image.height, mime: image.mime},
      });
      
    }).catch(e => {
      console.log(e);
      console.log("CCCCCCCCCCCCCCCCCCCCCCCC");
      //Alert.alert(e.message ? e.message : e);
      this.props.navigation.goBack();
    });
  }
  

  render() {  
    if(this.state.cropImageData !=null){
      this.props.navigation.goBack();
      this.props.navigation.state.params.onCropPic(this.state.cropImageData);
        
      return null;
    }
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