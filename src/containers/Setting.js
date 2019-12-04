import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {BackIcon, MenuIcon, HeaderTitle} from 'src/components/header';
import config from 'src/config';

export default class Setting extends Component {
  static navigationOptions = ({ navigation }) => {
    const image=config.images.settingIcon;
    return {
      headerLeft: <BackIcon navigation={navigation}/>,
      headerTitle : <HeaderTitle image={image} title="Settings" />,
      headerRight : <MenuIcon navigation={navigation}/>,
      headerStyle : {
        backgroundColor: '#00A5BD',
      }
    }
  };
  render() {
    return (
      <View>
        <Text>Setting Page</Text>
      </View>
      );
  }
}