import React, {Component}  from "react";
import {View, Text, Button, StyleSheet, TouchableOpacity, ScrollView, FlatList, TextInput, ActivityIndicator, Alert} from "react-native";
import {BackIcon, MenuIcon, HeaderTitle} from 'src/components/header';
import config from 'src/config';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DateTimePicker from 'react-native-datepicker';
import AsyncStorage from '@react-native-community/async-storage';
import { SearchBar } from 'react-native-elements';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as search from 'src/modules/search';
import * as detailActions from 'src/modules/detail';
import {PatientItem} from 'src/components/patient';
import {ConfirmDialog, ConfirmOkDialog} from "src/components/dialog";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Modal from "react-native-modal";
import { DermMultiSelect, DermSingleSelect, SelectTags } from "src/components/select";
import {saveFile, prepareImage, processImage, getFormatDate, addDiagnosis} from 'src/modules/utils'
import {NavigationActions, StackActions} from 'react-navigation';       


class QuickSnapNewImage extends Component {

  constructor() {
    super();
    this.state = {
      searchValue: '',
      isFocused : false,
      searchData : [],
      isPatientListViable : false,
      selectedPatient : null,
      loading : false,
      isConfirmVisible : false,
      isConfirmOkVisible : false,

      visitDate : getFormatDate(new Date(), '/'),
      multiTagModalOpen : false,
      signleTagModalOpen : false,
      
      selectedTags : [],
      selectedType : [],

      tagItems : [],
      typeItems : [],
    }
  }

  static navigationOptions = ({ navigation }) => {
    const image=config.images.imageIcon;
    return {
      headerLeft: <BackIcon navigation={navigation}/>,
      headerTitle : <HeaderTitle image={image} title="Image Infomation" />,
      headerRight : <MenuIcon navigation={navigation}/>,
      headerStyle : {
        backgroundColor: config.colors.headerColor,
      }
    }
  };

  searchFilterFunction = text => {
    const { searchResult,} = this.props;
    this.setState({ searchValue : text });

    if(!searchResult.patient_list)
      return;

    const newData = searchResult.patient_list.filter(item => {
      console.log("item : ", item);
      const itemData = `${item.name.toUpperCase()}`;
      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
      this.setState({searchData : newData});
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
              placeholder="Search for Patients"
              onChangeText={this.searchFilterFunction}
              onSubmitEditing ={this.handleSearch}
              onFocus={this.handleFocus}
              onBlur={this.bandleBlur}
              onCancel={this.handleCancel}
              onClear={this.handleClear}
              onClearText={this.handleClearText}  
              onEndEditing={this.handleEndEditing}
              autoCorrect={false}
              value={searchValue}
            />
    );
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

  componentDidUpdate(prevProps, prevState){
    
    const {isFocused, isConfirmOkVisible,selectedPatient,searchData} = this.state;
    console.log("NewImage componentiDidUpdate isFocusd : ", prevState.isFocused, isFocused);
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
      this.setState({tagItems : this.props.itemList.tag_item_list,
        typeItems : this.props.itemList.disease_item_list,
      });
    }
    console.log("searchData : ", searchData);

    if(isConfirmOkVisible && prevState.isConfirmOkVisible != isConfirmOkVisible){
      const resetAction = StackActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'home'})
        ] });
      this.props.navigation.dispatch(resetAction);
    }
  }


  componentDidMount() {
    console.log("NewImage componentDidMount()");
    const {DetailActions, } = this.props;
    AsyncStorage.getItem('access_info')
    .then(value => { 
      const access_info = JSON.parse(value);
      this.setState({access_info : access_info});
      
        DetailActions.getItemData(access_info, 'ethnicity')
        DetailActions.getItemData(access_info.access_token, 'country')
        DetailActions.getItemData(access_info.access_token, 'skin_type')
        DetailActions.getItemData(access_info.access_token, 'tag')
        DetailActions.getItemData(access_info.access_token, 'disease')
    });
      this.subs = [
        this.props.navigation.addListener(
          "didFocus", () => {console.log("didFocus"); this.setState({isFocused: true});}),
        this.props.navigation.addListener("willBlur", () => {console.log("willBlur"); this.setState({ isFocused: false, });}),
        this.props.navigation.addListener("willFocus", () => console.log("willFocus")),
        this.props.navigation.addListener("didBlur", () => console.log("didBlur")),
      ];   
  }

  shouldComponentUpdate(nextProps){
    return true;
  }

  componentWillUnmount() {
    console.log("QuickSnapImage componentWillUnmount()");
    this.subs.forEach((sub) => {
      sub.remove();
    });
  }

  handleFocus = () => {
    this.setState({isPatientListViable : true})
  }

  handleCancel = () => {   
    this.setState({
      searchValue : "", isPatientListViable : false,
    });
  }

  handleClear = () => {   
    this.setState({
      searchValue : "", isPatientListViable : false,
    });
  }

  handleClearText = () => {
    this.setState({
      searchValue : "", isPatientListViable : false,
    });
  }

  handleBlur = () => {
    this.setState({
      searchValue : "", isPatientListViable : false,
    });
  }

  handleEndEditing = () => {   
    this.setState({
      searchValue : "", isPatientListViable : false,
    });
  }

  handleSelectPatient = (patient) => {
    this.setState({
      searchValue : "", isPatientListViable : false,
      selectedPatient : patient,
    });
  }

  handleClearPatient = () => {
    this.setState({
      searchValue : "", isPatientListViable : false,
      selectedPatient : null,
    });
  }

  multiToggleModal = () =>{
    this.setState({multiTagModalOpen : !this.state.multiTagModalOpen});
  }

  singleToggleModal = () =>{
    this.setState({singleTagModalOpen : !this.state.singleTagModalOpen});
  }

  onSelectedTagsChange = selectedTags => {
    console.log("onSelectedItemsChange : ", selectedTags);
    this.setState({ selectedTags : selectedTags });
  };

  onSelectedTypeChange = selectedType => {
    console.log("onSelectedTypeChange : ", selectedType);
    this.setState({ selectedType : selectedType});
  };

  onAddTagItem = tagItems => {
    console.log("onAddTagItem : ", tagItems);
    let newItems = [];
    tagItems.forEach((i) => {
      newItems.push(i.name);
    })
    this.setState({ tagItems : newItems });
  };

  onAddTypeItem = typeItems => {
    console.log("onAddTypeItem : ", typeItems);
    let newItems = [];
    typeItems.forEach((i) => {
      newItems.push(i.name);
    })
    this.setState({ typeItems : newItems });
  };

  importImage = () => {
    
    const {itemList, DetailActions} = this.props;
    this.setState({isConfirmVisible : false,
                  loading : true});
    const {access_info, selectedPatient, selectedTags, selectedType, visitDate} = this.state;

    let file = { 
      uri : this.props.navigation.state.params.cropImageData.path,
      name : new Date().getTime().toString() + ".jpg", 
      type: 'image/jpeg'
    };
    prepareImage(access_info.access_token, file).then((image_info) => {
      saveFile(image_info.uri.image, file).then(() => {
          processImage(access_info.access_token, image_info.image_id).then((resp) => {
              console.log('success!!', resp);
              /* 여기서 선택된 환자가 있다면 import 해야함 */
              if (selectedPatient){
                
                /*DetailActions.addItemData('disease', selectedType, itemList.disease_item_list)
                  DetailActions.addItemData('tag_list', selectedTags, itemList.tag_item_list);
                */
                
               let location_list = [];
               let image_list = [];
               location_list.push(this.props.navigation.state.params.location.three.mesh_list[0].location_name);
               image_list.push({"image_id" : image_info.image_id});
                const imageInfo ={
                  type : selectedType && selectedType[0] || '',
                  tag_list : selectedTags || [],
                  visit_date : visitDate,
                  mesh_list : this.props.navigation.state.params.location.three.mesh_list,
                  image_list : image_list,
                  patient_id : selectedPatient.patient_id,
                  location_list : location_list,
                  note : '',
                }
                console.log("IMAGE INFO : ", imageInfo)
                addDiagnosis(access_info.access_token, imageInfo)
                .then(resp => 
                  console.log(resp));
              }
              setTimeout(() => {
                this.setState({loading: false,
                              isConfirmOkVisible :  true})}, 1000)
          });
      })
    });   
  }

  importGalleyImage = () => {
    
    const {itemList, DetailActions} = this.props;
    this.setState({isConfirmVisible : false,
                  loading : true});
    const {access_info, selectedPatient, selectedTags, selectedType, visitDate} = this.state;
    if(!selectedPatient){
      alert("Patient Must be selected");
      return;
    }

    if (selectedPatient){
      /*
      DetailActions.addItemData('disease', selectedType, itemList.disease_item_list)
      DetailActions.addItemData('tag_list', selectedTags, itemList.tag_item_list);
      */
      
      let location_list = [];
      let image_list = [];
      
      this.props.navigation.state.params.selectedImageList.map(item =>{
        image_list.push({image_id : item.image_id})
      })
      const imageInfo ={
        type : selectedType && selectedType[0]|| '',
        tag_list : selectedTags || [],
        visit_date : visitDate,        
        image_list : image_list,
        patient_id : selectedPatient.patient_id,
        location_list : location_list,
        note : '',
      }
      console.log("IMAGE INFO grom Gallery : ", imageInfo);

      addDiagnosis(access_info.access_token, imageInfo)
      .then(resp => 
        console.log(resp));
      setTimeout(() => {
        this.setState({loading: false,
                      isConfirmOkVisible :  true})}, 3000)
    }
            
  }

  handleClickConfirmButton = () => {
    this.setState({isConfirmVisible : true});
  }

  handleClickNoOnConfirmDialog =  () => {
    this.setState({isConfirmVisible : false});
  }

  confirmOk = () => {
    this.setState({isConfirmOkVisible : false});
    /*
    이거 모달 안닫히고 리셋되는 문제 수정 필요 
    const resetAction = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'home'})
      ] });
    this.props.navigation.dispatch(resetAction);
      
   this.props.navigation.navigate("home");
   */
  }

  render() {
    const { isConfirmOkVisible, isConfirmVisible, loading, searchData, isPatientListViable, selectedPatient, visitDate, tagItems, typeItems, selectedTags, selectedType} = this.state;
    const { handleSelectPatient, handleClearPatient } = this;
    const location = (this.props.navigation.state.params && this.props.navigation.state.params.location) ? 
        this.props.navigation.state.params.location.three.mesh_list[0].location_name : '';
       
    const contentTextOnConfirm = selectedPatient ? 
      "Import an image for the patient you selected" : 
      "The Image will be imported to the library. You didn't select a patient.";

      const whereFrom = this.props.navigation.state.params && this.props.navigation.state.params.whereFrom ?
      this.props.navigation.state.params.whereFrom : '';

      console.log("whereFrom : ", whereFrom);
      console.log("ImageListFrom Galley : ", this.props.navigation.state.params.selectedImageList);

    console.log("QuickSnapNewImage render()");

    return (
      <View style={styles.container}>
        {/*
        <ConfirmOkDialog 
              titleText="Import Image" 
              contentText="Image Import Completed"
              clickYesButton={this.confirmOk}
              isVisable={isConfirmOkVisible}
              />
        */}
        <ConfirmDialog 
              titleText="Import Image" 
              contentText={contentTextOnConfirm}
              clickNoButton={this.handleClickNoOnConfirmDialog}
              clickYesButton={whereFrom === "Gallery" ? this.importGalleyImage : this.importImage}
              isVisable={isConfirmVisible}
              />
        <Modal 
              isVisible={loading}
              animationType={'none'}>
          <View style={styles.loading}>
            <ActivityIndicator size='large' />
          </View>
        </Modal>
        <Modal isVisible={this.state.multiTagModalOpen}
              onBackdropPress={this.multiToggleModal}
              avoidKeyboard = {true}
              style = {{ justifyContent : "flex-end", margin:0}}
        >
          <DermMultiSelect items={tagItems} selectedItems={selectedTags}
          onSelectedItemsChange={this.onSelectedTagsChange}
          onAddItem={this.onAddTagItem}
          />
        </Modal>
        <Modal isVisible={this.state.singleTagModalOpen}
              onBackdropPress={this.singleToggleModal}
              avoidKeyboard = {true}
              style = {{ justifyContent : "flex-end", margin:0}}
        >
            <DermSingleSelect items={typeItems} selectedItems={selectedType}
            onSelectedItemsChange={this.onSelectedTypeChange}
            onAddItem={this.onAddTypeItem}
            onToggleList={this.singleToggleModal}
            /> 
        </Modal>
        <View style={styles.body}>
          { selectedPatient ? 
            <View style={styles.patient}>
              <PatientItem item={selectedPatient} handleClick={()=>{}}/>
              <TouchableOpacity onPress={handleClearPatient}>
                <Text style={{fontSize :20, fontWeight:"bold"}}>X</Text>
              </TouchableOpacity>
            </View> 
            :
            <View style={{ width:"100%"}}>
              <FlatList 
                data={searchData}
                renderItem={({ item }) => (
                  isPatientListViable ? <PatientItem item={item} handleClick={handleSelectPatient}/> : null)}
                keyExtractor={item => item.patient_id}
                ItemSeparatorComponent={isPatientListViable ? this.renderSeparator : null}
                ListHeaderComponent={this.searchHeader}
                keyboardShouldPersistTaps="always"
                stickyHeaderIndices={[0]}
                //contentContainerStyle={{ paddingBottom: 50}}
              />
            </View>
          }
          <KeyboardAwareScrollView 
            resetScrollToCoords={{ x: 0, y: 0 }}
            scrollEnabled={false}>
              <View style={styles.item}>
                <TextInput style={styles.itemTitle} editable={false} placeholder="Visit Date"></TextInput>
                <DateTimePicker
                      style={styles.itemTextInput}
                      date={visitDate}
                      mode="date"
                      androidMode="default"
                      format="YYYY/MM/DD"
                      minDate="1910/01/01"
                      confirmBtnText="Confirm"
                      cancelBtnText="Cancel"
                      customStyles={{
                        dateIcon: datePickerStyles.datePickerDateIcon,
                        dateInput: datePickerStyles.datePickerDateInput,
                        dateText: datePickerStyles.datePickerDateText,
                        placeholderText: datePickerStyles.datePickerPlaceholderText,
                        
                      }}
                      onDateChange={(date) => {this.setState({visitDate: date})}}
                    />

              </View>
              <View style={styles.item2}>
                  <TextInput style={{flex : 0.5, fontSize : 16, marginBottom : -20}} editable={false} placeholder="Disease" />
                  <View style={styles.item}>
                    <TextInput style={{...styles.itemTitle, ...{}}} editable={false} placeholder="Type" />
                    <View style={{flex : 7, flexDirection:"row"}}>
                      <Text style={{flex:7}}>{selectedType && selectedType[0]}</Text>
                      <TouchableOpacity
                      onPress={() => {
                        this.singleToggleModal();
                      }} >
                      <Icon
                        style={{marginLeft : 5}}
                        name="menu-down"
                        color="#767676"
                        size={26}
                        underlayColor="#4BA6F8"
                      />
                    </TouchableOpacity>
                    </View>

                  </View>
                  <View style={styles.item}>
                    <TextInput style={styles.itemTitle} editable={false} placeholder="Location" />
                    <Text style={styles.itemTextInput}>{location}</Text>
                  </View>
              </View>
              <View style={styles.item}>
                <TextInput style={styles.itemTitle} editable={false} placeholder="Note" /> 
                <TextInput style={styles.itemTextInput} />
              </View>
              <View style={styles.item2}>
                <TextInput style={styles.itemTitle} editable={false} placeholder="Tag" /> 
                <View style={styles.item}>
                  <SelectTags selectedItems={selectedTags} items={tagItems} 
                      onSelectedItemsChange={this.onSelectedTagsChange}
                      onAddItem={this.onAddTagItem} />
                  <TouchableOpacity
                    onPress={() => {
                      this.multiToggleModal();
                    }} >
                    <Icon
                      style={{marginLeft : 5}}
                      name="menu-down"
                      color="#767676"
                      size={26}
                      underlayColor="#4BA6F8"
                    />
                  </TouchableOpacity>
                </View>
              </View>
          </KeyboardAwareScrollView>
        </View>

        <View style={styles.bottom}>
          <TouchableOpacity style={styles.confirmButton} onPress={this.handleClickConfirmButton}>
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
    flex: 9,
    margin : 10,
    flexDirection : "column",
    paddingLeft:10, 
    paddingRight: 10,
  },
  bottom : {
    flex : 1,
    backgroundColor : config.colors.confirmBackGroundColor,
    justifyContent : "center",
    alignItems : "center",
  },
  confirmButton : {
    width : "95%",
    backgroundColor: config.colors.confirmButtonColor,
    padding: 10,
    margin : 10,
    borderRadius: 5,    
  },
  confirmButtonText : {
    alignItems : "center",
    color : "white",
    textAlign : "center",
    fontSize : 18,
  },
  patient :{
    flex : 1,
    width:"100%", 
    paddingLeft:10, 
    paddingRight: 10,
    flexDirection : "row",
    justifyContent : "center",
    alignItems : "center",
  },
  item :{
    flex : 1, flexDirection : "row", width:"100%", 
    paddingLeft:10, paddingRight: 10,
    borderBottomColor : config.colors.textborderBottomColor,
    borderBottomWidth : 1,alignItems : "center",
  },

  itemTitle : {
    flex : 3,
    fontSize : 16,
  },

  item2 :{
    flex : 2.5,
    width:"100%", 
    paddingLeft:10, 
    paddingRight: 10,
    flexDirection : "column",
  },
  
  itemTextInput : {
    flex : 7, justifyContent : "center",
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
    borderBottomWidth : 0,
    //borderBottomColor : config.colors.textborderBottomColor,
    alignItems : "flex-start",
    justifyContent : "center",  
    
  },
  datePickerDateText : {
    marginLeft: 5,
    fontSize : 16,
  },
  datePickerPlaceholderText : {
    textAlign :"left",
    marginLeft: 5,
    //color : config.colors.placeholderTextColor,
  },
});

export default connect(
  (state) => ({
      itemList : state.detail.get('itemList').toJS(),
      searchStatus: state.search.get('searchStatus'),
      searchKey: state.search.get('searchKey').toJS(),
      condition: state.search.get('searchCondition'),
      searchResult: state.search.get('searchResult').toJS(),
      selectedRow: state.search.get('selectedRow').toJS(),      
  }),
  (dispatch) => ({
      DetailActions:bindActionCreators(detailActions, dispatch),
      SearchActions: bindActionCreators(search, dispatch),
  })
)(QuickSnapNewImage);
