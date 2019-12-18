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
          <Image style={styles.image}
            source={{uri : imageUrl}} />
      </View>)
  }
}

const styles = StyleSheet.create({
  container : {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  image : {
    flex: 1,
    resizeMode: 'contain',
  },
  
});
export default ImageItem;