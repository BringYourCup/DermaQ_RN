import React, {Component}  from "react";
import {View, Text} from "react-native";
import {BackIcon, MenuIcon, HeaderTitle} from 'src/components/header';
import config from 'src/config';

export default class Image extends Component {
  static navigationOptions = ({ navigation }) => {
    const image=config.images.diagnosisIcon;
    return {
      headerLeft: <BackIcon navigation={navigation}/>,
      headerTitle : <HeaderTitle image={image} title="Image" />,
      headerRight : <MenuIcon navigation={navigation}/>,
      headerStyle : {
        backgroundColor: '#00A5BD',
      }
    }
  };
  render() {
    return (
      <View>
        <Text> Image Page </Text>
      </View>
    );
  }
}
