import React, {Component}  from "react";
import {View, Text, Button, StyleSheet,Image ,Platform, FlatList,SafeAreaView } from "react-native";
import {BackIcon, MenuIcon, HeaderTitle} from 'src/components/header';
import config from 'src/config';
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import { SearchBar } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as search from 'src/modules/search';
import {PatientEditItem, PatientItem} from 'src/components/patient';
import axios from 'axios';
import {ConfirmDialog} from "src/components/dialog";



class Patient extends Component {  

  constructor() {
    super();
    this.state = {
      searchValue: '',
      isFocused: false,
      searchData : [],
      refreshing: false,
      selectedPatient : [],
      access_info : null,

      isDeletable : false,
      isEditable : false,
      isDeleteConfirm : false,
    };
  }

  static navigationOptions = ({ navigation }) => {
    console.log("navigationOptions");
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

  searchFilterFunction = text => {
    const { searchResult,} = this.props;
    this.setState({ searchValue : text });

    const newData = searchResult.patient_list.filter(item => {
      console.log("item : ", item);
      const itemData = `${item.name.toUpperCase()}`;
      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
      this.setState({searchData : newData});
  }
  

  handleSearch = () =>{
    //alert("Search");
    console.log("handleSearch");
    this.props.navigation.setParams({
      isHeaderVisible: true,
    });
  }

  handleFocus = () => {
   // alert("Hide Header");
   console.log("handleFocus");
   /* left arrow 눌렀을 때 헤더 표시하는 기능은 차후에 추가하자
      일단은 무조건 헤더가 보이게 */
    this.props.navigation.setParams({
      isHeaderVisible: true,
    });
  }
  handleClearText(){
    console.log("handleOnClearText");
    this.setState({searchValue: ''});
  }

  handleCancel = () => {   
    console.log("handleCancel");
    this.setState({
      searchValue : ""
    });
    this.props.navigation.setParams({
      isHeaderVisible: true,
    });
  }

  handleClear = () => {   
    console.log("handleClear");
    this.setState({
      searchValue : ""
    });
    this.props.navigation.setParams({
      isHeaderVisible: true,
    });
  }

  /* ICON CLICK 관련 함수 */
  handleClickAddPatientIcon = () =>{
    this.props.navigation.navigate('newPatient',
    { patient : null,
      title : "New Patient"
    });
  }
  handleClickDeletePatientIcon = () =>{
    this.setState({isDeletable : true});
  }
  handleClickQuickSnapIcon = () =>{
    alert("Press Quick Snap");
  }
  handleClickEditPatientIcon = () => {
    this.setState({isEditable : true});
  }

  /* 동작 관련 함수 */
  handleSelectEditPatient = (patient) => {
    this.props.navigation.navigate('newPatient', 
      { patient : patient,
        title : "Edit Patient Info"
      });
  }

  /* 삭제 버튼 눌렀을 때 함수 */
  handleClickDeleteButton =  () => {
    //alert(JSON.stringify(this.state.selectedPatient));
    this.setState({isDeleteConfirm : true});
  }
  handleClickNoOnDeleteConfirmButton =  () => {
    //alert(JSON.stringify(this.state.selectedPatient));
    this.setState({isDeleteConfirm : false});
  }

  deletePatient = () => {
    const { access_info, selectedPatient }= this.state; 
    try {
      const arr = [...selectedPatient];
      arr.forEach( async item => {
        const send_data = {
            "category": "patient",
            "service": "DeletePatient",
            "access_token": access_info.access_token,
            "patient_id" : item,
        };
        const response = await axios.post(config.baseUrl + '/api/', 
          {"data" : send_data});
          if(response.data.err){
            throw new Error(response.data.err);
          }
      });
      this.onRefresh();
      this.setState({isDeletable : false, isDeleteConfirm : false});
    } catch (err) {
      console.log("DeletePatient err : ", err)
    }
  }

  handleSelectDeletePatient = (id, operation ) => {
    let arr = [...this.state.selectedPatient];
    if(operation =="add"){
      arr.push(id)
    } else {
      const idx = arr.indexOf(id);
      if(idx > -1) arr.splice(idx, 1);
    }
    this.setState({selectedPatient : arr});
  }


  /* 취소 버튼 눌렀을 때 함수 */
  handleClickCancelButton = () => {
    this.setState({
      isEditable : false,
      isDeletable : false,
      selectedPatient : []});
  }

  /* 환자 리스트에서 환자 선택했을 때 함수 */
  handleSelectPatient = (patient) => {
    //alert("Select Patient ID: " + patient.patient_id);
    this.setState({
      searchValue : ""
    });
    this.search.clear();
    this.props.navigation.navigate('diagnosis', {
      patient : patient
    })
    
  }

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '86%',
          backgroundColor: '#CED0CE',
          marginLeft: '14%',
        }}
      />
    );
  }

  componentDidMount() {
    console.log("Paitent componentDidMount()");
    AsyncStorage.getItem('access_info')
    .then(value => { 
      const access_info = JSON.parse(value);
      this.setState({access_info : access_info});
    });
      this.subs = [
        this.props.navigation.addListener(
          "didFocus", () => {console.log("didFocus"); this.setState({ isFocused: true, isDeletable: false, isEditable:false });}),
        this.props.navigation.addListener("willBlur", () => {console.log("willBlur"); this.setState({ isFocused: false, isDeletable: false, isEditable:false });}),
        this.props.navigation.addListener("willFocus", () => console.log("willFocus")),
        this.props.navigation.addListener("didBlur", () => console.log("didBlur")),
      ];
  }

  componentWillUnmount() {
    console.log("Paitent componentWillUnmount()");
    this.subs.forEach((sub) => {
      sub.remove();
    });
  }

  componentDidUpdate(prevProps, prevState){
    console.log("Patient componentiDidUpdate");
    const {isFocused} = this.state;
    if(prevState.isFocused != isFocused && isFocused){
        AsyncStorage.getItem('access_info')
      .then(value => { 
        console.log("value, ", value);
        const access_info = JSON.parse(value);
        console.log("access_info : ", access_info);
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
            )
        });
    }
    
    if(prevProps.searchResult.patient_list != this.props.searchResult.patient_list){
      this.setState({searchData : this.props.searchResult.patient_list});
    }
    console.log("searchData : ", this.state.searchData);
  }
  onRefresh = () => {
    AsyncStorage.getItem('access_info')
      .then(value => { 
        console.log("value, ", value);
        const access_info = JSON.parse(value);
        console.log("access_info : ", access_info);
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
            )
        });
  }

  searchHeader = () => {
    const { searchValue } = this.state;
    return (
      <SearchBar  
              ref={search => this.search = search}
              platform={Platform.OS === "ios" ? "ios" : "android"}
              cancelButtonTitle="Cancel"
              inputStyle={{height : 40}} 
              containerStyle={{backgroundColor:"#FBFBFB",
                borderBottomColor: 'transparent', borderTopColor: 'transparent'}} 
              inputContainerStyle={{backgroundColor : '#f5f6fa'}}
              placeholder="Search for Patients"
              onChangeText={this.searchFilterFunction}
              onSubmitEditing ={this.handleSearch}
              onFocus={this.handleFocus}
              onCancel={this.handleCancel}
              onClear={this.handleClear}
              onClearText={this.handleClearText}  
              autoCorrect={false}
              value={searchValue}
            />
    );
  }

  
  render() {

    console.log("Patient render() : ", this.state.isDeleteConfirm)
    const { searchData, refreshing, isEditable, isDeletable, isDeleteConfirm} = this.state;
    const {handleSelectPatient, handleSelectEditPatient, handleSelectDeletePatient} = this;
    let renderItem;
    if(isEditable){
      renderItem = ({ item }) => (
        <PatientEditItem item={item} isEditable={true} isDeletable={false} handleClick={handleSelectEditPatient}/>)
    } else if(isDeletable){
      renderItem = ({ item }) => (
        <PatientEditItem item={item} isEditable={false} isDeletable={true} handleClick={handleSelectDeletePatient}/>)
    } else {
      renderItem = ({ item }) => (
        <PatientItem item={item} handleClick={handleSelectPatient}/>)
    }

    return (
      <View style={styles.container}>     
          <ConfirmDialog 
              titleText="Delete Patient" 
              contentText="Delete Patient Information?"
              clickNoButton={this.handleClickNoOnDeleteConfirmButton}
              clickYesButton={this.deletePatient}
              isVisable={isDeleteConfirm}
              />
        <SafeAreaView  style={styles.body} >
           <View style={{ width:"100%"}}>
            <FlatList
              data={searchData}
              renderItem={renderItem}
              keyExtractor={item => item.patient_id}
              ItemSeparatorComponent={this.renderSeparator}
              ListHeaderComponent={this.searchHeader}
              stickyHeaderIndices={[0]}
              refreshing={refreshing}
              onRefresh={this.onRefresh}
              keyboardShouldPersistTaps="always"
              
              
              //contentContainerStyle={{ paddingBottom: 50}}
            />
            
          </View>
        </SafeAreaView >
        {isEditable &&
          <View style={styles.bottomCancel}>
            <TouchableOpacity style={styles.cancelButton} onPress={() => this.handleClickCancelButton()}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          </View>
        }
        {isDeletable &&
          <View style={styles.bottomDelete}>
            <View style={styles.bottomDeleteSub1}>
              <TouchableOpacity style={styles.cancelButton} onPress={() => this.handleClickCancelButton()}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.bottomDeleteSub1}>
              <TouchableOpacity style={styles.deleteButton} onPress={() => this.handleClickDeleteButton()}>
                  <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        }
        {!isEditable && !isDeletable &&
          <View style={styles.bottom}>
            <View style={styles.bottomSub1}>
              <TouchableOpacity style={styles.bottomItem} onPress ={() =>{
                  this.handleClickQuickSnapIcon();
                }}>
                  <Image style={{width:45, height:45}} source={config.images.quickSnapIcon}/>
                </TouchableOpacity>        
            </View>
            <View style={styles.bottomSub2}>
              <TouchableOpacity style={styles.bottomItem} onPress ={() =>{
                this.handleClickAddPatientIcon();
              }}>
                <Image style={{width:45, height:45}} source={config.images.addIcon}/>
              </TouchableOpacity>
              <TouchableOpacity style={styles.bottomItem} onPress ={() =>{
                this.handleClickEditPatientIcon();
              }}>
                <Image style={{width:45, height:45, marginLeft:10}} source={config.images.editIcon}/>
              </TouchableOpacity>
              <TouchableOpacity style={styles.bottomItem} onPress ={() =>{
                this.handleClickDeletePatientIcon();
              }}>
                <Image style={{width:45, height:45, marginLeft:10}} source={config.images.trashIcon}/>
              </TouchableOpacity>
            </View>
          </View>
        }
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
    //alignItems : "center",
    height:"100%", 
  },
  bottom:{
    flex:1,
    backgroundColor: config.colors.bottomColor,
    alignItems : "center",
    color: 'white',
    flexDirection:"row",
    position: 'absolute',
    bottom : 0,
    
  },
  bottomSub1:{
    flex:5,
    marginLeft : 5
    
  },
  bottomSub2:{
    flex:5,
    flexDirection:"row",
    justifyContent : "space-around",
    marginRight:5,
    marginLeft:5,
    
  },
  bottomItem:{
    //color : "white",
  },
  bottomCancel:{
    flex:1,
    backgroundColor : config.colors.confirmBackGroundColor,
    justifyContent : "center",
  },
  bottomDelete:{
    flex:1,
    backgroundColor : config.colors.confirmBackGroundColor,
    flexDirection : "row"
  },
  bottomDeleteSub1 :{
    flex:1,
    justifyContent : "center",
  },
  cancelButton : {
    width : "95%",
    backgroundColor: config.colors.confirmButtonColor,
    padding: 10,
    margin : 10,
    borderRadius: 5,
    justifyContent : "center",
    alignSelf : "center",
  },
  cancelButtonText : {
    alignItems : "center",
    color : "white",
    textAlign : "center",
    fontSize : 18 
  },
  deleteButton : {
    width : "95%",
    backgroundColor: config.colors.confirmButtonColor,
    padding: 10,
    margin : 10,
    borderRadius: 5,
    justifyContent : "center",
    alignSelf : "center",
    
  },
  deleteButtonText : {
    alignItems : "center",
    color : "white",
    textAlign : "center",
    fontSize : 18,
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