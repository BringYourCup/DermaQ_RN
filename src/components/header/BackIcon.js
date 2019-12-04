import React, {Component}  from "react";
import { NavigationActions } from 'react-navigation';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default class BackIcon extends Component {
  render() {
    const {navigation} = this.props;
    return (
      <Icon
        style={{marginLeft : 5}}
        name="chevron-left"
        color="white"
        size={26}
        underlayColor="#4BA6F8"
        onPress={() => {
          const backAction = NavigationActions.back();
          navigation.dispatch(backAction);
        }}
      />
    );
  }
}
