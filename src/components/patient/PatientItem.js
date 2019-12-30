import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from "react-native";
import config from 'src/config';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";



class PatientItem extends Component {


 getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
  }
  render() {
    const {item, handleClick} = this.props;
    return (
      <View style={styles.container}>
          <View style={styles.bodyLeft}>
            <Image source={config.images.patientEmptyImage} resizeMode="contain"
            style={{width : 40, height : 40}}/>
          </View>
          
          <TouchableOpacity style={styles.bodyMiddle} onPress={()=>handleClick(item)}>
              <View style={styles.patientName}>
                <Text style={styles.textStyle}>{item.name}</Text>
              </View>
              <View style={styles.patientInfo}>
                <View style={styles.patientAge}>
                  <Text style={styles.textStyle}>{"M"} {"(" + this.getAge(item.birth_date) + ")"}</Text>
                </View>
                <View style={styles.patientBirth}>
                  <Text style={styles.textStyle}>{" / "} {item.birth_date}</Text>
                </View>
              </View>
            
          </TouchableOpacity>
          <View style={styles.bodyRight}>
            <Icon
              style={{marginLeft : 5}}
              name="chevron-right"
              color="#00A5BD"
              size={26}
              underlayColor="#4BA6F8"
              onPress={() => handleClick(item)}
            />
          </View>
      </View>)
  }
}

const styles = StyleSheet.create({
  container : {
    width: "100%",
    flex:1,
    height : 50,
    justifyContent:"center",
    flexDirection : "row",
    paddingBottom:5,
    paddingTop:5,
  },
  textStyle: {
    fontFamily : "Arial",
  },
  bodyLeft : {
    flex : 2,
    justifyContent:"center",
    alignItems: "center",
  },
  bodyMiddle : {
    flex : 8,
    justifyContent:"center",
    flexDirection : "column",
  },
  patientName:{
    flex : 1,
  },
  patientInfo :{
    flex : 1,
    flexDirection : "row",
  },
  patientAge : {
    flex : 3,
  },
  patientBirth : {
    flex : 7,
  },
  bodyRight : {
    flex : 2,
    justifyContent:"center",
    alignItems:"center"
  },
});
export default PatientItem;