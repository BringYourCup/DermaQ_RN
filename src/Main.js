import React, {Component} from 'react';
import {Image} from 'react-native';
import { createSwitchNavigator, createAppContainer, NavigationActions } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {createDrawerNavigator, DrawerActions} from "react-navigation-drawer";
import { HomeScreen, Login, Register, Patient, Diagnosis, PatientImage, Profile, Guide, QuickSnap, Library, Setting } from 'src/containers';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {DrawContentComponent} from "src/components/drawScreen";
import config from 'src/config';


const patientImage = config.images.patientIcon;
const quickSnapImage = config.images.quickSnapIcon;
const profileImage = config.images.profileIcon;
const guideImage = config.images.guideIcon;
const settingImage = config.images.settingIcon;
const libraryImage = config.images.libraryIcon;

const PatientStack = createStackNavigator({
  patient : { 
    screen : Patient,
  },
  diagnosis : { 
    screen : Diagnosis,
  },
  image : { 
    screen : PatientImage,
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
      drawerLabel : "Patient",
      drawerIcon: (
        <Image
          style={{ width: 30, height: 30 }}
          source={patientImage}
        />
      ),
    }
  },
  quicksnaps : {
    screen : QuickSnapStack,
    navigationOptions : {
      drawerLabel : "Quick Snap",
      drawerIcon: (
        <Image
          style={{ width: 30, height: 30 }}
          source={quickSnapImage}
        />
      ),
    }
  },
  profiles : {
    screen : ProfileStack,
    navigationOptions : {
      drawerLabel : "Profile",
      drawerIcon: (
        <Image
          style={{ width: 30, height: 30 }}
          source={profileImage}
        />
      ),
    }
  },
  guides : {
    screen : GuideStack,
    navigationOptions : {
      drawerLabel : "Guide",
      drawerIcon: (
        <Image
          style={{ width: 30, height: 30 }}
          source={guideImage}
        />
      ),
    }
  },
  librarys : {
    screen : LibraryStack,
    navigationOptions : {
      drawerLabel : "Library",
      drawerIcon: (
        <Image
          style={{ width: 30, height: 30 }}
          source={libraryImage}
        />
      ),
    }
  },
  settins : {
    screen : SettingStack,
    navigationOptions : {
      drawerLabel : "Setting",
      drawerIcon: (
        <Image
          style={{ width: 30, height: 30 }}
          source={settingImage}
        />
      ),
    }
  }
},
{
  headerMode: 'none',
  drawerPosition : "right",
  drawerLockMode: 'locked-closed',
  drawerOpenRoute: 'DrawerRightOpen',
  contentComponent: DrawContentComponent,
  contentOptions: {
    labelStyle: {
      fontSize : 16,
      fontWeight: 'normal',
      fontFamily : 'Arial'

    },
    /* icon 투명도 설정 */
    iconContainerStyle: {
      opacity: 1
    }
  },
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

