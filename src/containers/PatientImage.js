import React, {Component}  from "react";
import {View, Text, Image, StyleSheet, TouchableOpacity} from "react-native";
import {BackIcon, MenuIcon, HeaderTitle} from 'src/components/header';
import config from 'src/config';
import AsyncStorage from '@react-native-community/async-storage';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as search from 'src/modules/search';
import { PatientItem } from "src/components/patient";
import { ImageItem } from "src/components/image";


class PatientImage extends Component {
  static navigationOptions = ({ navigation }) => {
    const image=config.images.imageIcon;
    return {
      headerLeft: <BackIcon navigation={navigation}/>,
      headerTitle : <HeaderTitle image={image} title="Image" />,
      headerRight : <MenuIcon navigation={navigation}/>,
      headerStyle : {
        backgroundColor: config.colors.headerColor,
      }
    }
  };

  componentDidMount() {
    console.log("Image componentDidMount()");
    /*    
    AsyncStorage.getItem('access_info')
    .then(value => { 
      const access_info = JSON.parse(value);
      const { SearchActions, condition, searchKey  } = this.props;
      const {diagnosis} = this.props.navigation.state.params;

      console.log("diagnosis_id : ", diagnosis);

      let order = searchKey[condition].order;
      let order_by = searchKey[condition].order_by;
      SearchActions.getMainList(access_info.access_token, 
          "image", 
          order,
          order_by,
          { patient_id : patient.patient_id}, 
          null,
          null,
          null,
          null,
          );
      });
    */
  }
  componentDidUpdate() {
    console.log("Image componentDidUpdate()");
  }

  handleSelectimage = (image) => {
    alert("Select Image ID: " + image.image_id);
    /*
    this.props.navigation.navigate('image', {
      image : image
    })
    */
  }

  handleClickDeleteImage = () =>{
    alert("Press Delete Imge");
  }
  
  handleClickQuickSnap = () =>{
    alert("Press Quick Snap");
  }


  render() {
    const { navigation, searchResult } = this.props;
    const {handleSelectimage} = this;
    const {image, patient, diagnosis} = navigation.state.params;


    console.log('Patient Image : ', image);
    console.log('Patient Diagnosis : ', diagnosis);
    console.log('Patient Patient : ', patient);


    const location_list = image.location_list ? image.location_list.join(' /  ')  : ' '; 
    const image_info = `${diagnosis.visit_date} / ${diagnosis.diagnosis.type}  / ${location_list}`;
    const tag_list = [...new Set(image.tag_list)];
    return (
      <View style={styles.container}>
        <View style={styles.patient_info}>
          <PatientItem item={patient} handleClick={()=>null}/>
        </View>
        <View style={styles.image_list}>
          <ImageItem item={image} handleClick={null}/>
        </View>
        <View style={styles.image_info}>
          <Text>{image_info}</Text>
          <View style={styles.tag_info}>
            {tag_list.map((tag, i) => {
              return (
                <View key={tag} style={{ alignItems : "center", paddingLeft : 5, paddingRight : 5, marginRight:10, borderRadius : 10,  backgroundColor:config.colors.tagBackGroundColor}}> 
                  <Text style={{color:"white"}}  key={tag}>{tag}</Text>
                </View>
              );
            })}
          </View>
        </View>
        <View style={styles.bottom}>  
        {/*
          <View style={styles.bottomSub1}>
            <TouchableOpacity style={styles.bottomItem} onPress ={() =>{
              this.handleClickDeleteImage();
            }}>
              <Image style={{width:28, height:28, marginLeft:15}} source={config.images.trashIcon}/>
            </TouchableOpacity>
          </View>
          <View style={styles.bottomSub2}>
          </View>
          */}
          <View style={styles.bottomSub1}>
            <TouchableOpacity style={styles.bottomItem} onPress ={() =>{
              this.handleClickQuickSnap();
            }}>
              <Image style={{width:45, height:45}} source={config.images.quickSnapIcon}/>
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
    flexDirection : "column",
    justifyContent : "center",
    //alignItems: "center",
  },
  patient_info :{
    flex : 1,
    width:"100%", 
    //paddingLeft:10, 
    //paddingRight: 10,
    
  },
  image_list : {
    flex : 6,
    //height:"100%",
    width:"100%", 
    
  },
  image_info : {
    flex : 2,
    height:"100%",
    width:"100%",  
    //marginTop : 10,
    paddingTop : 10,
    paddingLeft : 10,
    backgroundColor: config.colors.bottomBackGroundColor,
  },
  bottom:{
    flex:1,
    height : "100%",
    width:"100%", 
    justifyContent:"center",
    backgroundColor: config.colors.bottomColor,
    alignItems : "center",
    color: 'white',
    flexDirection:"row",
    
  },
  bottomSub1:{
    flex:2,
    marginLeft : 5
  },
  bottomSub2:{
    flex:6,
  },
  bottomSub3:{
    flex:2,
    
    alignItems:"flex-end"
    //marginRight : 15,
  },
  bottomItem:{
    //color : "white",
  },
  tag_info:{
    flexDirection:"row",
    marginTop : 10,
    height :20,
  }
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
)(PatientImage);