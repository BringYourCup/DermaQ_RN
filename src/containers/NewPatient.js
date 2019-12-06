import React, {Component}  from "react";
import {View, Text, Button, StyleSheet,Image ,Platform} from "react-native";
import {BackIcon, MenuIcon, HeaderTitle} from 'src/components/header';
import config from 'src/config';
import { TouchableOpacity } from "react-native-gesture-handler";
import { SearchBar } from 'react-native-elements';



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


        </View>
        <View style={styles.bottom}>
        </View>
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
  },
  body:{
    flex:9,
    //justifyContent:"center",
    alignItems : "center",
  },
  bottom:{
    flex:1,
    justifyContent:"center",
    backgroundColor: config.colors.bottomColor,
    alignItems : "center",
    color: 'white',
    flexDirection:"row"
  },
  bottomSub1:{
    flex:8,
  },
  bottomSub2:{
    flex:2,
    flexDirection:"row",
    marginRight : 15,
  },
  bottomItem:{
    //color : "white",
  },
  })

