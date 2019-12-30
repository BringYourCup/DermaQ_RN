import React, {Component}  from "react";
import {View, Text, Image, StyleSheet} from "react-native";
import {BackIcon, MenuIcon, HeaderTitle} from 'src/components/header';
import config from 'src/config';

export default class Profile extends Component {
  static navigationOptions = ({ navigation }) => {
    const image=config.images.profileIcon;
    return {
      headerLeft: <BackIcon navigation={navigation}/>,
      headerTitle : <HeaderTitle image={image} title="Profile" />,
      headerRight : <MenuIcon navigation={navigation}/>,
      headerStyle : {
        backgroundColor: config.colors.headerColor,
      }
    }
  };
  render() {
    return (
      <View style={styles.container}>

        <Image source={config.images.underConstruction} 
          style={{width : 200, height : 200,  }}  />
      </View>
    );
  }
}

const styles =StyleSheet.create({
  container : {
    justifyContent : "center",
    alignItems : "center",
    height : "100%",
  },
});
