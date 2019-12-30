import React, {Component}  from "react";
import {View, Text, StyleSheet, TouchableOpacity, Image} from "react-native";
import {BackIcon, MenuIcon, HeaderTitle} from 'src/components/header';

import config from 'src/config';
import { TouchableHighlight, TouchableWithoutFeedback } from "react-native-gesture-handler";

export default class QuickSnap extends Component {
  constructor() {
    super();
    this.state = {
      isFocused: false,
      location : null,
      didTouch : false,
    };
  }

  static navigationOptions = ({ navigation }) => {
    const image=config.images.quickSnapIcon;
    return {
      headerLeft: <BackIcon navigation={navigation}/>,
      headerTitle : <HeaderTitle image={image} title="Quick Snap" />,
      headerRight : <MenuIcon navigation={navigation}/>,
      headerStyle : {
        backgroundColor: config.colors.headerColor,
      }
    }
  };

  componentDidMount() {
    console.log("QuickSnap componentDidMount()");
    this.subs = [
      this.props.navigation.addListener("didFocus", () => {console.log("QuickSnap didFocus"); this.setState({ isFocused: true });}),
      this.props.navigation.addListener("willBlur", () => {console.log("QuickSnap  willBlur"); this.setState({ isFocused: false });}),
      this.props.navigation.addListener("willFocus", () => console.log("willFocus")),
      this.props.navigation.addListener("didBlur", () => console.log("didBlur")),
    ];
  }
  componentWillUnmount() {
    console.log("QuickSnap componentWillUnmount()");
    this.subs.forEach((sub) => {
      sub.remove();
    });
  }
  next = () => {
    if(this.checkInput()){
      console.log("Good");
      //Alert.alert("Next", JSON.stringify(this.state));
      this.props.navigation.navigate("quicksnapCamera",{
        location : this.state.location,
      });
    } else{
      console.log("Bad");
    }
  }
  checkInput = () => {
    const {location} = this.state;
    if(location == null){
      alert("Please Choose Location");
      return false;
    }
    return true;
  }

  tempTouch = () => {
    let locationInfo = {
      three : {
        mesh_list : [
          { intersection_object_name: "000.0.visible.pass.main",
            intersection_point: {x: 1.11035412482198, y: -1.7531907234031223, z: 0.37196224693434843},
            location_name: "Left Anterior Thigh",
            location_number: 1,
            orientation: {x: -0.024069281115682163, y: 0.3702698752504438, z: 0.008711341280754093},
            ray_direction: {x: 0.03738487278459906, y: -0.059028746501998415, z: -0.9975560026250567},
          }
        ]
      }
    };
    this.setState({didTouch : true,
                  location: locationInfo});

  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.body}>
          <View style={styles.bodySub1}>
            <TouchableWithoutFeedback  onPress={this.tempTouch}>
              <Image source={config.images.testBodyImage}  style={styles.bodyImage} />
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.bodySub2}>
            {this.state.didTouch && <Text style={{fontSize : 16,}}>Left Anterior Thigh</Text>}
          </View>
        </View>
        <View style={styles.bottom}>
        <TouchableOpacity style={styles.nextButton} onPress={() => this.next()}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container : {
    height:"100%", 
    flex:1,
  },
  body:{
    flex: 8,
    flexDirection:"column",
  },
  bottom : {
    flex : 1,
    backgroundColor: config.colors.confirmBackGroundColor,
  },
  nextButton : {
    width : "95%",
    backgroundColor: config.colors.confirmButtonColor,
    padding: 10,
    margin : 10,
    borderRadius: 5,
    justifyContent : "center",
    alignSelf : "center",
  },
  nextButtonText : {
    alignItems : "center",
    color : "white",
    textAlign : "center",
    fontSize : 18 
  },
  bodySub1: {
    flex:9,
    justifyContent : "center",
  },
  bodySub2: {
    flex:1,
    justifyContent : "flex-start",
    padding: 10,
    margin : 10,
  },
  bodyImage: {
    resizeMode : "contain",
    alignSelf : "center",
    height : 300,
    width : 300,
  },
});
