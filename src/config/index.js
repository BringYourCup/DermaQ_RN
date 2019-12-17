import { Dimensions } from "react-native";

export default {
  images: {
    patientIcon : require("src/images/Patient.png"),
    diagnosisIcon: require("src/images/Diagnosis.png"),
    profileIcon : require("src/images/Profile.png"),
    quickSnapIcon : require("src/images/QuickSnap.png"),
    dermateLogImage : require('src/images/Dermate_log.png'),
    dermateHomeScreen : require('src/images/DermateHomeScreen.png'),
    settingIcon : require('src/images/Setting.png'),
    libraryIcon : require('src/images/Library.png'),
    guideIcon : require('src/images/Guide.png'),
    drawerBackIcon : require('src/images/DrawerBackIcon.png'),
    addIcon : require('src/images/AddIcon.png'),
    trashIcon : require('src/images/TrashIcon.png'),
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
  },
  styleConstants: {
    oneThirdWidth: Dimensions.get("window").width / 3,
    width: Dimensions.get("window").width
  },
  //baseUrl : 'https://dermaster.lazybird.kr'
  //baseUrl : "http://localhost:3000/api/"
  baseUrl : 'https://dermaster.lazybird.kr'
};