import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from "react-native";
import config from 'src/config';



class DiagnosisItem extends Component {
  render() {
    const {item, handleClick} = this.props;
    console.log("item!!! : " , item);

    const location_list = item.location_list ? item.location_list.join(' /  ')  : ' '; 
    const imageUrl = item.image_list ? item.image_list[0].uri.thumbnail : '';
    const imageCount = item.image_number;

    console.log("AAAA : ", imageUrl);

    return (
      <View style={styles.container}>
          <View style={styles.bodyLeft}>
            <View style={styles.diagnosis_image}>
              <Image source={{uri : imageUrl}} style={{borderRadius : 7, width : 75, height : 70, }}/>
            </View>
            <View style={styles.diagnosis_image_count}>
              <Text style={{color : "white", fontWeight: "bold"}}>{imageCount}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.bodyMiddle} onPress={()=>handleClick(item)}>
              <View style={styles.diagnosis_date}>
                <Text style={{borderRadius : 5, backgroundColor : config.colors.imageDateColor, width : 100, textAlign : "center"}}>{item.visit_date}</Text>
              </View>
              <View style={styles.diagnosis_disease}>
                <Text>{item.diagnosis.type}</Text>
              </View>
              <View style={styles.diagnosis_location}>
                <Text>{location_list}</Text>
              </View>
          </TouchableOpacity>
      </View>)
  }
}

const styles = StyleSheet.create({
  container : {
    width: "100%",
    flex:1,

    height : 100,
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
    borderRadius : 7,
    width : 10,
    marginLeft : 20,
    marginRight : 20,
    
    backgroundColor : config.colors.imageBackGroundColor,
  },
  diagnosis_image : {
    height : 70,
    padding : 1,
    
  },
  diagnosis_image_count :{
    height : 20,
    color : "white"
    
  },
  bodyMiddle : {
    flex : 6,
    justifyContent:"center",
    flexDirection : "column",
  },
  diagnosis_date:{
    flex : 1.5,
    
  },
  diagnosis_disease :{
    flex : 1,
  },
  diagnosis_location : {
    flex : 1,
  },

  
});
export default DiagnosisItem;