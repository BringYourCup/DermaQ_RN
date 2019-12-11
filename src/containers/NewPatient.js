import React, {Component}  from "react";
import {View, Text, Button, StyleSheet,Image,TouchableOpacity,TextInput } from "react-native";
import {BackIcon, MenuIcon, HeaderTitle} from 'src/components/header';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import config from 'src/config';




export default class NewPatient extends Component {  

  constructor() {
    super();
    this.state = {
      
    };
    
  }

  static navigationOptions = ({ navigation }) => {
    const image=config.images.patientIcon;
    return {
      headerLeft: <BackIcon navigation={navigation}/>,
      headerTitle : <HeaderTitle image={image} title="New Patients" />,
      headerRight : <MenuIcon navigation={navigation}/>,
      headerStyle : {
        backgroundColor: config.colors.headerColor,
      },
    }
  }
  
  render() {

    return (
      <View style={styles.container}>
        <View style={styles.body}>
          <KeyboardAwareScrollView 
            resetScrollToCoords={{ x: 0, y: 0 }}
            scrollEnabled={false}>
        
            <View style={styles.patientImage}>
            </View>
            <View style={styles.patientPID}>
              <TextInput style={styles.textInput} placeholder="PID"></TextInput>
            </View>
            <View style={styles.patientFisrtName}>
              <TextInput style={styles.textInput} placeholder="First Name"></TextInput>
            </View>
            <View style={styles.patientLastName}>
              <TextInput style={styles.textInput} placeholder="Last Name"></TextInput>
            </View>
            <View style={styles.patientBirthDay}>
              <TextInput style={styles.textInput} placeholder="BirthDay"></TextInput>
            </View>
            <View style={styles.patientGender}>
              <TextInput style={styles.textInput} placeholder="Gender"></TextInput>
            </View>
          </KeyboardAwareScrollView>
        </View >
      <View style={styles.bottom}>
        <TouchableOpacity style={styles.confirm} onPress={() => alert("Confirm")}>
          <Text style={styles.item}>Confirm</Text>
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
    //justifyContent:"center",
    //alignItems: "center",
  },
  body:{
    flex:8,
    
    //justifyContent:"center",
    //alignItems : "center",
  },

  patientImage : {
    height : 160,
    backgroundColor : "red"
  },
  patientPID : {
    flex : 0.7,
    paddingLeft: 10,
    paddingRight: 10,    
  },
  patientFisrtName : {
    flex : 0.7,
    paddingLeft: 10,
    paddingRight: 10,
  },
  patientLastName : {
    flex : 0.7,
    paddingLeft: 10,
    paddingRight: 10,
  },
  patientBirthDay : {
    flex : 0.7,
    paddingLeft: 10,
    paddingRight: 10,
    
  },
  patientGender : {
    flex : 0.7,
    paddingLeft: 10,
    paddingRight: 10,
  },
  textInput :{
    borderBottomColor : "#767171",
    borderBottomWidth : 1
  },
  bottom : {
    flex : 1,
    //backgroundColor : "green",
  },
  confirm : {
    width : "95%",
    backgroundColor: config.colors.confirmButtonColor,
    padding: 10,
    margin : 10,
    borderRadius: 5,
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

