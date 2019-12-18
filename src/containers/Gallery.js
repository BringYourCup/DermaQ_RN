import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {BackIcon, MenuIcon, HeaderTitle} from 'src/components/header';
import config from 'src/config';

export default class Gallery extends Component {
  static navigationOptions = ({ navigation }) => {
    const image=config.images.galleryIcon;
    return {
      headerLeft: <BackIcon navigation={navigation}/>,
      headerTitle : <HeaderTitle image={image} title="Gallery" />,
      headerRight : <MenuIcon navigation={navigation}/>,
      headerStyle : {
        backgroundColor: config.colors.headerColor,
      }
    }
  };
  render() {
    return (
      <View>
        <Text>Gallery Page</Text>
      </View>
      );
  }
}