import React, {Component}  from "react";
import {View, Text} from "react-native";
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
      <View>
        <Text> Profile Page </Text>
      </View>
    );
  }
}
