import React, {Component}  from "react";
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import {BackIcon, MenuIcon, HeaderTitle} from 'src/components/header';

import config from 'src/config';

export default class QuickSnap extends Component {
  constructor() {
    super();
    this.state = {
      isFocused: false,
      location : null,
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
      this.props.navigation.addListener("didFocus", () => {console.log("didFocus"); this.setState({ isFocused: true });}),
      this.props.navigation.addListener("willBlur", () => {console.log("willBlur"); this.setState({ isFocused: false });}),
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
      Alert.alert("Next", JSON.stringify(this.state));
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
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.body}>
          
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
  },
  bottom : {
    flex : 1,
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
});
