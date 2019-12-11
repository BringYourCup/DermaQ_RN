import React, {Component}  from "react";
import {View, Text, Button, StyleSheet,Image ,Platform, FlatList} from "react-native";
import {BackIcon, MenuIcon, HeaderTitle} from 'src/components/header';
import config from 'src/config';
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import { SearchBar } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as search from 'src/modules/search';
import {PatientList, PatientItem} from 'src/components/patient';


class Patient extends Component {  

  constructor() {
    super();
    this.state = {
      searchValue: '',
      isFocused: false,
      searchData : []
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

  handleClickAddPatient = () =>{
    this.props.navigation.navigate('newPatient');
  }
  
  handleClickDeletePatient = () =>{
    alert("Press Delete Patient");
  }

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
    /*
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
      */
      this.subs = [
        this.props.navigation.addListener("didFocus", () => {console.log("didFocus"); this.setState({ isFocused: true });}),
        this.props.navigation.addListener("willBlur", () => {console.log("willBlur"); this.setState({ isFocused: false });}),
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
            )
        });
        
    }
    if(prevProps.searchResult.patient_list != this.props.searchResult.patient_list){
      this.setState({searchData : this.props.searchResult.patient_list});
    }
    console.log("searchData : ", this.state.searchData);
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

  handleClearText(){
    console.log("handleOnClearText");
    this.setState({searchValue: ''});
  }
  render() {

    const { searchData } = this.state;
    const {handleSelectPatient} = this;

    return (
      <View style={styles.container}>        
        <View style={styles.body}>
          {/*
          <View style={{width:"100%"}}>
            <SearchBar  
              platform={Platform.OS === "ios" ? "ios" : "android"}
              cancelButtonTitle="Cancel"
              inputStyle={{height : 40}} 
              containerStyle={{backgroundColor:"#FBFBFB",
                borderBottomColor: 'transparent', borderTopColor: 'transparent'}} 
              inputContainerStyle={{backgroundColor : '#f5f6fa'}}
              placeholder="Search for Patients"
              onChangeText={this.searchFilterFunction}
              onSubmitEditing ={()=>this.handleSearch()}
              onFocus         ={()=>this.handleFocus()}
              onCancel         ={()=>this.handleCancel()}
              value={searchValue}
            />
          </View>
          */}
           <View style={{ width:"100%"}}>
            <FlatList
              data={searchData}
              renderItem={({ item }) => (
                <PatientItem item={item} handleClick={handleSelectPatient}/>
              )}
              keyExtractor={item => item.patient_id}
              ItemSeparatorComponent={this.renderSeparator}
              ListHeaderComponent={this.searchHeader}
              stickyHeaderIndices={[0]}
              //contentContainerStyle={{ paddingBottom: 50}}
            />
          </View>
          {/*
          <View style={{width:"100%", paddingLeft:5, paddingRight: 5}}>
              <PatientList searchResult={searchResult} 
                          handleClick={handleSelectPatient}/>
            </View>
          */}
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