import React, {Component}  from "react";
import {View, Text, Button, StyleSheet,} from "react-native";
import {BackIcon, MenuIcon, HeaderTitle} from 'src/components/header';
import config from 'src/config';


export default class Patient extends Component {  
  static navigationOptions = ({ navigation }) => {
    const image=config.images.patientIcon;
    return {
      headerLeft: <BackIcon navigation={navigation}/>,
      headerTitle : <HeaderTitle image={image} title="Patients" />,
      headerRight : <MenuIcon navigation={navigation}/>,
      headerStyle : {
        backgroundColor: '#00A5BD',
      }
    }
  };
  render() {
    return (
      <View style={styles.container}>
      <Button onPress={() => this.props.navigation.navigate('diagnosis')} title="Go to Diagnosis"/>
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
  }
})

