import React, {Component}  from "react";
import {View, Text, Button, StyleSheet,} from "react-native";

export default class Patient extends Component {    
  render() {
    return (
      <View style={styles.container}>
      <Button onPress={() => this.props.navigation.push('diagnosis')} title="Diagnosis"/>
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

