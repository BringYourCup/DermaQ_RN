import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from "react-native";
import config from 'src/config';



class ImageItem extends Component {
  render() {
    const {item, handleClick} = this.props;
    console.log("ImageItem!!! : " , item);

    const imageUrl = item.uri.image;

    console.log("ImageItem : ", imageUrl);

    return (
      <View style={styles.container}>
        <View style={styles.body}>
          <Image  resizeMode="contain"
            source={{uri : imageUrl}} 
            style={{width : config.styleConstants.width-5, height : config.styleConstants.width-5 }}
            />
        </View>
      </View>)
  }
}

const styles = StyleSheet.create({
  container : {
    flex:1,
    height : "100%",
    justifyContent:"center",
    alignItems :"center",
  },
  body : {
    flex : 1,
    height : "100%",
    justifyContent:"center",
    alignItems: "center",
  },
  
});
export default ImageItem;