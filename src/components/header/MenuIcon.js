import React, {Component}  from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {DrawerActions} from "react-navigation-drawer";

export default class MenuIcon extends Component {
  render() {
    const {navigation} = this.props;
    return (
      <Icon
        style={{marginRight : 5}}
        name="menu"
        color="white"
        size={26}
        underlayColor="#4BA6F8"
        onPress={() => {
          const openDrawerAction = DrawerActions.toggleDrawer();
          navigation.dispatch(openDrawerAction);
        }}
      />
    );
  }
}

