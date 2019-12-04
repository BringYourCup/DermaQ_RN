import React, {Component}  from "react";
import {Image, View, Text, StyleSheet} from 'react-native';

export default class Headertitle extends Component {
  render() {
    const {image, title} = this.props;
    return (
      <View style={styles.container}>
        <Image source={image}/>
        <Text style={styles.titleText}>{title}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container : {
    alignItems: "center",
    flexDirection : "row",
    //backgroundColor : "green",
    width : 200,
    marginLeft : -20
  },
  titleText : {
    fontSize : 20,
    marginLeft : 10,
    color : 'white'
  }
});