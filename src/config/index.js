import { Dimensions } from "react-native";

export default {
  images: {
    patientIcon : require("src/images/patient.png"),
    diagnosisIcon: require("src/images/diagnosis.png"),
    imageIcon: require("src/images/image.png"),
    profileIcon : require("src/images/profile.png"),
    quickSnapIcon : require("src/images/camera.png"),
    liveIcon : require('src/images/live.png'),
    dermateLogImage : require('src/images/Dermate_log.png'),
    dermateHomeScreen : require('src/images/DermateHomeScreen.png'),
    settingIcon : require('src/images/setting.png'),
    galleryIcon : require('src/images/gallery.png'),
    guideIcon : require('src/images/guide.png'),
    editIcon : require('src/images/edit.png'),
    drawerBackIcon : require('src/images/DrawerBackIcon.png'),
    addIcon : require('src/images/new.png'),
    trashIcon : require('src/images/delete.png'),
    patientEmptyImage : require('src/images/PatientEmptyImage.png'),
    favoriteImage : require('src/images/FavoriteImage.png'),
    emptyPictureImage : require('src/images/EmptyPictureImage.png'),
  },
  colors :{
    headerColor : "#00A5BD",
    bottomColor : "#00A5BD",
    loadingCircleColor : "#00A5BD",
    imageBackGroundColor : "#00A5BD",
    imageDateColor : "#99dbe5",
    tagBackGroundColor : "#bfbfbf",
    bottomBackGroundColor : "#f5f6fa",
    startButtonColor : "#354d67",
    confirmButtonColor : "#354d67",
    nextButtonColor : "#354d67",
    textborderBottomColor : "#a8a8a8",
    placeholderTextColor : "#a8a8a8",
    buttonBackGroundColor : "#354d66",
    basicButtonColor : "#354d67",
    statusBarColor  : "#00525e",
  },
  styleConstants: {
    oneThirdWidth: Dimensions.get("window").width / 3,
    width: Dimensions.get("window").width
  },
  //baseUrl : 'https://dermaster.lazybird.kr'
  //baseUrl : "http://localhost:3000/api/"
  baseUrl : 'https://dermaster.lazybird.kr'
};