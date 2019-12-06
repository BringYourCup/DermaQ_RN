import React, {Component}  from "react";
import {View, Text, Button, StyleSheet,Image ,Platform} from "react-native";
import {BackIcon, MenuIcon, HeaderTitle} from 'src/components/header';
import config from 'src/config';
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import { SearchBar } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as search from 'src/modules/search';
import {PatientList} from 'src/components/patient';


class Patient extends Component {  

  constructor() {
    super();
    this.state = {
      searchValue: '',
      isFocused: false,
    };
  }

  static navigationOptions = ({ navigation }) => {
    if(navigation.state.params && !navigation.state.params.isHeaderVisible){
      return {header : null} 
    } else {
      const image=config.images.patientIcon;
      return {
        headerLeft: <BackIcon navigation={navigation}/>,
        headerTitle : <HeaderTitle image={image} title="Patients" />,
        headerRight : <MenuIcon navigation={navigation}/>,
        headerStyle : {
          backgroundColor: config.colors.headerColor,
        },
      }
    }
  }

  updateSearch = search => {
    this.setState({ searchValue : search });
  }

  handleSearch = () =>{
    alert("Search");
    this.props.navigation.setParams({
      isHeaderVisible: true,
    });
  }

  handleFocus = () => {
   // alert("Hide Header");
    this.props.navigation.setParams({
      isHeaderVisible: false,
    });
  }

  handleCancel = () => {    
    this.props.navigation.setParams({
      isHeaderVisible: true,
    });
  }

  handleClickAddPatient = () =>{
    alert("Press Add Patient");
  }
  
  handleClickDeletePatient = () =>{
    alert("Press Delete Patient");
  }

  handleSelectPatient = (patient) => {
    alert("Select Patient ID: " + patient.patient_id);
  }


  componentDidMount() {
    console.log("Paitent componentDidMount()");
    this.subs = [
      this.props.navigation.addListener("didFocus", () => this.setState({ isFocused: true })),
      this.props.navigation.addListener("willBlur", () => this.setState({ isFocused: false }))
    ];
    AsyncStorage.getItem('access_info')
    .then(value => { 
      const access_info = JSON.parse(value);
      const { SearchActions, condition, searchKey  } = this.props;

      let order = searchKey[condition].order;
      let order_by = searchKey[condition].order_by;
      SearchActions.getMainList(access_info.access_token, 
          condition, 
          order,
          order_by,
          null, 
          null,
          null,
          null,
          null,
          );
      });
      
  }

  componentWillUnmount() {
    console.log("Paitent componentWillUnmount()");
  }

  componentDidUpdate(prevProps){
    console.log("Patient componentiDidUpdate");
  }

  render() {
    if (!this.state.isFocused) {
      
      return null;
    }
    const { searchValue } = this.state;
    const { searchStatus, 
      searchKey, 
      condition, 
      searchResult, 
      selectedRow, 
    } = this.props;

    const {handleSelectPatient} = this;

    console.log("searchResult : ", searchResult);
    
    
    return (
      <View style={styles.container}>
        
        <View style={styles.body}>
          <View style={{width:"100%"}}>
            <SearchBar  
              platform={Platform.OS === "ios" ? "ios" : "android"}
              cancelButtonTitle="Cancel"
              inputStyle={{height : 40}} 
              containerStyle={{backgroundColor:"#FBFBFB",
                borderBottomColor: 'transparent', borderTopColor: 'transparent'}} 
              inputContainerStyle={{backgroundColor : '#f5f6fa'}}
              placeholder="Search for Patients"
              onChangeText={this.updateSearch}
              onSubmitEditing ={()=>this.handleSearch()}
              onFocus         ={()=>this.handleFocus()}
              onCancel         ={()=>this.handleCancel()}
              value={searchValue}
            />
            
          </View>
          <View style={{width:"100%", paddingLeft:5, paddingRight: 5}}>
              <PatientList searchResult={searchResult} 
                          handleClick={handleSelectPatient}/>
            </View>
          <Button onPress={() => this.props.navigation.navigate('diagnosis')} title="Go to Diagnosis"/>
        </View>
        <View style={styles.bottom}>
          <View style={styles.bottomSub1}>
            
          </View>
          <View style={styles.bottomSub2}>
            <TouchableOpacity style={styles.bottomItem} onPress ={() =>{
              this.handleClickAddPatient();
            }}>
              <Image style={{width:28, height:28}} source={config.images.addIcon}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.bottomItem} onPress ={() =>{
              this.handleClickDeletePatient();
            }}>
              <Image style={{width:28, height:28, marginLeft:15}} source={config.images.trashIcon}/>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container : {
    height:"100%", 
    flex:1,
    justifyContent:"center",
    //alignItems: "center",
  },
  body:{
    flex:9,
    //justifyContent:"center",
    alignItems : "center",
    height:"100%", 
  },
  bottom:{
    flex:1,
    justifyContent:"center",
    backgroundColor: config.colors.bottomColor,
    alignItems : "center",
    color: 'white',
    flexDirection:"row"
  },
  bottomSub1:{
    flex:8,
  },
  bottomSub2:{
    flex:2,
    flexDirection:"row",
    marginRight : 15,
  },
  bottomItem:{
    //color : "white",
  },
})

export default connect(
  (state) => ({
    searchStatus: state.search.get('searchStatus'),
    searchKey: state.search.get('searchKey').toJS(),
    condition: state.search.get('searchCondition'),
    searchResult: state.search.get('searchResult').toJS(),
    selectedRow: state.search.get('selectedRow').toJS(),
}),
(dispatch) => ({
    SearchActions: bindActionCreators(search, dispatch),
})
)(Patient);