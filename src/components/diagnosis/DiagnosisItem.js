import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from "react-native";
import config from 'src/config';



class DateItem extends Component {
  render() {
    const {item, handleClick} = this.props;
    console.log("item : " , item);
    return (
      <View style={styles.container}>
          <View style={styles.bodyLeft}>
            <Image source={config.images.patientEmptyImage} 
            style={{width : 25, height : 25}}/>
          </View>
          <TouchableOpacity style={styles.bodyMiddle} onPress={()=>handleClick(item)}>
              <View style={styles.diagnosis_date}>
                <Text>{item.visit_date}</Text>
              </View>
              <View style={styles.diagnosis_disease}>
                <Text>{item.diagnosis.type}</Text>
              </View>
              <View style={styles.diagnosis_location}>
                <Text>{item.}</Text>
              </View>
          </TouchableOpacity>
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
  diagnosis_date:{
    flex : 1,
  },
  diagnosis_disease :{
    flex : 1,
  },
  diagnosis_location : {
    flex : 1,
  },
  
});
export default DateItem;