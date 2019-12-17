import React, {Component}  from "react";
import {View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Alert,ActivityIndicator } from "react-native";
import {BackIcon, MenuIcon, HeaderTitle} from 'src/components/header';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import config from 'src/config';
import {CheckBox} from 'react-native-elements';
import DateTimePicker from 'react-native-datepicker';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';



export default class NewPatient extends Component {  
  constructor() {
    super();
    
  }

  state = {
    genderFemaleChecked: true,
    genderMaleChecked: false,
    birthDay : null,
    pid : '',
    firstName : '',
    lastName : '',
    gender : 'F',
    picture : null,
    loading : false,
  };

  onTakePic = data => {
    console.log("onTakePic111111 : ", data);
    this.setState({picture : data});
  };

  static navigationOptions = ({ navigation }) => {
    const image=config.images.patientIcon;
    return {
      headerLeft: <BackIcon navigation={navigation}/>,
      headerTitle : <HeaderTitle image={image} title="New Patients" />,
      headerRight : <MenuIcon navigation={navigation}/>,
      headerStyle : {
        backgroundColor: config.colors.headerColor,
      },
    }
  }

  setGender = (gender) => {
    switch (gender) {
      case 'M':
        this.setState({
          genderFemaleChecked : false,
          genderMaleChecked : true,
          gender : 'M',
        })
        break;
      case 'F':
        this.setState({
          genderFemaleChecked : true,
          genderMaleChecked : false,
          gender : 'F',
        })
        break;
        }
  }

  checkInput = () => {
    const {birthDay, gender, firstName, lastName, pid} = this.state;

    if (birthDay == null) {
      alert("Please Enter BirthDay");
      return false;
    } else if(gender.length == 0){
      alert("Please Enter Gender");
      return false;
    } else if(firstName.length == 0){
      alert("Please Enter First Name");
      return false;
    } else if(lastName.length == 0){
      alert("Please Enter Last Name");
      return false;
    }
    return true;
  }

  confirm = () => {
    if(this.checkInput()){
      console.log("Good");
      this.handleSubmit();
      //Alert.alert("Confirm", JSON.stringify(this.state));
    } else{
      console.log("Bad");
    }
  }

  handleSubmit = async () => {
    const {birthDay, gender, firstName, lastName, pid, access_info} = this.state;
    try {
      const send_data = {
          "category": "patient",
          "service": "AddPatient",
          "access_token": access_info.access_token,
          "patient": {
              pid : pid,
              first_name : firstName,
              last_name : lastName,
              birth_date : birthDay,
              gender : gender,
          }
      };
      this.setState({loading : true})
      const response = await axios.post(config.baseUrl + '/api/', 
        {"data" : send_data});
      console.log("AddPatient : ", response.data.data);
      setTimeout(() => {this.setState({loading: false})}, 1500)
      if(!response.data.err){
        this.props.navigation.goBack();
      }
    } catch (err) {
      console.log("AddPatient err : ", err)
    }
  }

  componentDidMount() {
    AsyncStorage.getItem('access_info')
    .then(value => { 
      const access_info = JSON.parse(value);
      this.setState({access_info : access_info});
    });
  }
  
  render() {
    const {birthDay, pid, firstName, lastName, loading} = this.state;
    return (
      <View style={styles.container}>
        {loading &&
           <View style={styles.loading}>
              <ActivityIndicator size='large' />
            </View>}
        <View style={styles.body}>
          <KeyboardAwareScrollView 
            resetScrollToCoords={{ x: 0, y: 0 }}
            scrollEnabled={false}>
        
            <View style={styles.patientImage}>
              {this.state.picture? 
                <Image style={styles.patientPic} source={{uri:this.state.picture.uri}} />
                :
                <Image style={styles.patientEmptyPic} source={config.images.emptyPictureImage} />}
              <View style={styles.patientPicButton}>
              <TouchableOpacity onPress={()=>this.props.navigation.navigate("newPatientCamera", {onTakePic : this.onTakePic})}>
                <Image source={config.images.quickSnapIcon} style={{width:50, height:50}}/>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.patientItem}>
              <TextInput style={styles.textInput} 
                onChangeText={(text) => {this.setState({pid: text})}} 
                value={pid}
                maxLength={8}
                autoCorrect={false}
                placeholder="PID"></TextInput>
            </View>
            <View style={styles.patientItem}>
              <TextInput style={styles.textInput} 
                onChangeText={(text) => {this.setState({firstName: text})}} 
                value={firstName}
                autoCorrect={false}
                placeholder="First Name"></TextInput>
            </View>
            <View style={styles.patientItem}>
              <TextInput style={styles.textInput} 
                onChangeText={(text) => {this.setState({lastName: text})}} 
                value={lastName}
                autoCorrect={false}
                placeholder="Last Name"></TextInput>
            </View>
            <View style={styles.patientItem}>
              <DateTimePicker
                style={{width: "100%"}}
                date={birthDay}
                mode="date"
                androidMode="default"
                placeholder="BirthDay"
                format="YYYY/MM/DD"
                minDate="1910/01/01"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: datePickerStyles.datePickerDateIcon,
                  dateInput: datePickerStyles.datePickerDateInput,
                  dateText: datePickerStyles.datePickerDateText,
                  placeholderText: datePickerStyles.datePickerPlaceholderText
                }}
                onDateChange={(date) => {this.setState({birthDay: date})}}
              />
            </View>
            <View style={{...styles.patientItem, ...{ flexDirection:"row",}}}>
              <TextInput editable={false} placeholder="Gender" />
              <CheckBox
                textStyle={{fontWeight:"100"}}
                containerStyle={{justifyContent:"center", backgroundColor:"white", borderColor : "white",}}
                title='Female'
                checked={this.state.genderFemaleChecked}
                onPress={()=>{this.setGender('F')}}
              />
              <CheckBox
                textStyle={{fontWeight:"100"}}
                containerStyle={{justifyContent:"center", backgroundColor:"white", borderColor : "white",}}
                title='Male'
                checked={this.state.genderMaleChecked}
                onPress={()=>{this.setGender('M')}}
              />
            </View>
          </KeyboardAwareScrollView>
        </View >
      <View style={styles.bottom}>
        <TouchableOpacity style={styles.confirmButton} onPress={() => this.confirm()}>
          <Text style={styles.confirmButtonText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container : {
    height:"100%", 
    flex:1,
  },
  body:{
    flex: 8,
  },
  patientImage : {
    flexDirection : "column",
  },
  patientEmptyPic: {
    flex:9,
    resizeMode: 'contain',
    width : config.styleConstants.width,
    
  },
  patientPic: {
    flex:9,
    resizeMode: 'contain',
    //backgroundColor : "black",
    height : 200,
    width : config.styleConstants.width,
    borderRadius : 200/2,
    
  },
  patientPicButton : {
    flex: 1, 
    justifyContent: 'center', 
    alignItems:"flex-end", 
    marginRight:25, 
    marginTop:-25,
  },
  patientItem : {
    height : 45,
    paddingLeft: 20,
    paddingRight: 20,   
  },
  textInput :{
    borderBottomColor : config.colors.textborderBottomColor,
    borderBottomWidth : 1,

  },

  bottom : {
    flex : 1,
  },
  confirmButton : {
    width : "95%",
    backgroundColor: config.colors.confirmButtonColor,
    padding: 10,
    margin : 10,
    borderRadius: 5,
    justifyContent : "center",
    alignSelf : "center",
  },
  confirmButtonText : {
    alignItems : "center",
    color : "white",
    textAlign : "center",
    fontSize : 18 
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
})

const datePickerStyles = StyleSheet.create({
  datePickerDateIcon:{
    position: 'absolute',
    right: 0,
    top: 4,
    marginRight: 0,
    width : 30,
    height : 30,
  },
  datePickerDateInput : {
    marginLeft: 0,
    borderTopWidth : 0,
    borderLeftWidth : 0,
    borderRightWidth : 0,
    borderBottomColor : config.colors.textborderBottomColor,
    alignItems : "flex-start"
  },
  datePickerDateText : {
    marginLeft: 5,
  },
  datePickerPlaceholderText : {
    textAlign :"left",
    marginLeft: 5,
    color : config.colors.placeholderTextColor,
  },
});