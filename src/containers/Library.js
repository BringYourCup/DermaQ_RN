import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {BackIcon, MenuIcon, HeaderTitle} from 'src/components/header';

export default class Library extends Component {
  static navigationOptions = ({ navigation }) => {
    const image=null;
    return {
      headerLeft: <BackIcon navigation={navigation}/>,
      headerTitle : <HeaderTitle image={image} title="Library" />,
      headerRight : <MenuIcon navigation={navigation}/>,
      headerStyle : {
        backgroundColor: '#00A5BD',
      }
    }
  };
  render() {
    return (
      <View>
        <Text>Library Page</Text>
      </View>
      );
  }
}