import React, {Component}  from "react";
import { NavigationActions, StackActions } from 'react-navigation';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default class BackIcon extends Component {
  render() {
    const {navigation} = this.props;
    console.log("BackIcon navigation1 : ", navigation);
    console.log("BackIcon navigation2 : ", JSON.stringify(navigation));
    console.log("BackIcon navigation3 : ", navigation.dangerouslyGetParent());

    let backAction;
    /* index가 0 인상태에서 뒤로 가기 버튼 누르면 스택 리셋 */
    if(navigation.dangerouslyGetParent().state && navigation.dangerouslyGetParent().state.index == 0){
      backAction = StackActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({routeName : "home"})
        ]
      })
    } else {
      backAction = NavigationActions.back();
    }

    return (
      <Icon
        style={{marginLeft : 5}}
        name="chevron-left"
        color="white"
        size={26}
        underlayColor="#4BA6F8"
        onPress={() => {
          navigation.dispatch(backAction);
        }}
      />
    );
  }
}
