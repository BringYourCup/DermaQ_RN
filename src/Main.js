import React, {Component} from 'react';
import { createSwitchNavigator, createAppContainer, NavigationActions } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {createDrawerNavigator, DrawerActions} from "react-navigation-drawer";
import { HomeScreen, Login, Register, Patient, Diagnosis, Image, Profile, Guide, QuickSnap, Library, Setting } from 'src/containers';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";


const PatientStack = createStackNavigator({
  patient : { 
    screen : Patient,
  },
  diagnosis : { 
    screen : Diagnosis,
  },
  image : { 
    screen : Image,
  },  
});

const QuickSnapStack = createStackNavigator({
  quicksnap : {
    screen : QuickSnap,
  }
});

const ProfileStack = createStackNavigator({
  profile : {
    screen : Profile,
  }
});

const GuideStack = createStackNavigator({
  guide : {
    screen : Guide,
  }
});

const LibraryStack = createStackNavigator({
  library : {
    screen : Library,
  }
});

const SettingStack = createStackNavigator({
  setting : {
    screen : Setting,
  }
});

const DetailStacks = createDrawerNavigator({
  home : { 
    screen : HomeScreen,
    navigationOptions : {
      drawerLabel: ()=>null,
    }
  },
  patients : {
    screen : PatientStack,
    navigationOptions : {
      drawerLabel : "Patient"
    }
  },
  quicksnaps : {
    screen : QuickSnapStack,
    navigationOptions : {
      drawerLabel : "Quick Snap"
    }
  },
  profiles : {
    screen : ProfileStack,
    navigationOptions : {
      drawerLabel : "Profile"
    }
  },
  guides : {
    screen : GuideStack,
    navigationOptions : {
      drawerLabel : "Guide"
    }
  },
  librarys : {
    screen : LibraryStack,
    navigationOptions : {
      drawerLabel : "Library"
    }
  },
  settins : {
    screen : SettingStack,
    navigationOptions : {
      drawerLabel : "Setting"
    }
  }
},
{
  headerMode: 'none',
  drawerPosition : "right",
  drawerLockMode: 'locked-closed',
  drawerOpenRoute: 'DrawerRightOpen',
  navigationOptions: {
    headerVisible: false, 
  }
});


const HomeScreenStack = createStackNavigator({
  home : HomeScreen,
  detail : DetailStacks,
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
      headerLeft: <BackIcon navigation={navigation}/>,
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
  home2 : HomeScreenStack,
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

class MenuIcon extends Component {
  render() {
    const {navigation} = this.props;
    return (
      <Icon
        name="menu"
        color="#000"
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

