import React, {Component} from 'react';
import { createSwitchNavigator, createAppContainer, NavigationActions } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {createDrawerNavigator, SlideMenu} from "react-navigation-drawer";
import { HomeScreen, Login, Register, Patient, Diagnosis, Image, Profile, Guide, QuickSnap } from './containers';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {TouchableHighlight} from 'react-native';
import FontAwesome from "react-native-vector-icons/FontAwesome";


const PatientStack = createStackNavigator({
  patient : { 
    screen : Patient,
    headerMode: 'screen',
    navigationOptions : ({ navigation }) => ({
      title: "PATIENT",
      headerLeft: <BackIcon navigation={navigation}/>
    })
  },
  diagnosis : { 
    screen : Diagnosis,
    headerMode: 'screen',
    navigationOptions : ({ navigation }) => ({
      title: "DIAGNOSIS",
      headerLeft: <BackIcon navigation={navigation}/>
    })
  },
  image : { 
    screen : Image,
    headerMode: 'screen',
    navigationOptions : ({ navigation }) => ({
      title: "IMAGE",
      headerLeft: <BackIcon navigation={navigation}/>
    })
  },  
});

const QuickSnapStack = createStackNavigator({
  quicksnap : {
    screen : QuickSnap,
    headerMode: 'screen',
    navigationOptions : ({ navigation }) => ({
      title: "QUICK SNAP",
      headerLeft: <BackIcon navigation={navigation}/>
    })
  }
});

const ProfileStack = createStackNavigator({
  profile : {
    screen : Profile,
    headerMode: 'screen',
    navigationOptions : ({ navigation }) => ({
      title: "PROFILE",
      headerLeft: <BackIcon navigation={navigation}/>
    })
  }
});

const GuideStack = createStackNavigator({
  guide : {
    screen : Guide,
    headerMode: 'screen',
    navigationOptions : ({ navigation }) => ({
      title: "GUIDE",
      headerLeft: <BackIcon navigation={navigation}/>
    })
  }
});


const HomeScreenStack = createStackNavigator({
  home : HomeScreen,
  patients : PatientStack,
  quicksnaps : QuickSnapStack,
  profiles : ProfileStack,
  guides : GuideStack,
},
{
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
}});


const IntroStack = createStackNavigator({
  login : {
    screen : Login,
  },
  register : {
    screen : Register,
    headerMode: 'screen',
    navigationOptions : ({ navigation }) => ({
      title: "REGISTER",
      headerVisible: true,
      headerLeft: <BackIcon navigation={navigation}/>
    })
  }
});

const RootIntroStack = createStackNavigator({
  RootIntroStack:{
    screen : IntroStack,
    navigationOptions: {
      header: null,
    }
  }
})

const MainStack = createSwitchNavigator({
  intro: RootIntroStack,
  main: HomeScreen,
  home : HomeScreenStack,
});






const AppContainer = createAppContainer(MainStack);

export default class Main extends Component {
  render() {
    return (
      <AppContainer />
    );
  }
}

class BackIcon extends Component {
  render() {
    const {navigation} = this.props;
    return (
      <Icon
        name="chevron-left"
        color="#000"
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

