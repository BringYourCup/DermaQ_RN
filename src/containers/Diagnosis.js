import React, {Component}  from "react";
import {View, Text, Button, StyleSheet, } from "react-native";
import {BackIcon, MenuIcon, HeaderTitle} from 'src/components/header';
import config from 'src/config';
import AsyncStorage from '@react-native-community/async-storage';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as search from 'src/modules/search';
import { PatientItem } from "src/components/patient";
import { DiagnosisList } from "src/components/diagnosis";

class Diagnosis extends Component {
  static navigationOptions = ({ navigation }) => {
    const image=config.images.diagnosisIcon;
    return {
      headerLeft: <BackIcon navigation={navigation}/>,
      headerTitle : <HeaderTitle image={image} title="Diagnosis" />,
      headerRight : <MenuIcon navigation={navigation}/>,
      headerStyle : {
        backgroundColor: config.colors.headerColor,
      }
    }
  };

  componentDidMount() {
    console.log("Diagnosis componentDidMount()");
    
    AsyncStorage.getItem('access_info')
    .then(value => { 
      const access_info = JSON.parse(value);
      const { SearchActions, condition, searchKey  } = this.props;
      const {patient} = this.props.navigation.state.params;

      console.log("patient_id : ", patient);

      let order = searchKey[condition].order;
      let order_by = searchKey[condition].order_by;
      SearchActions.getMainList(access_info.access_token, 
          "date", 
          order,
          order_by,
          { patient_id : patient.patient_id}, 
          null,
          null,
          null,
          null,
          );
      });
  }

  componentDidUpdate() {
    console.log("Diagnosis componentDidUpdate()");
  }

  handleSelectDiagnosis = (diagnosis) => {
    //alert("Select Patient ID: " + patient.patient_id);
    const {patient} = this.props.navigation.state.params;
    this.props.navigation.navigate('images', {
      diagnosis : diagnosis,
      patient : patient,
    })
  }

  render() {
    const { navigation, searchResult } = this.props;
    const {handleSelectDiagnosis} = this;
    const {patient} = navigation.state.params;
    console.log("Diagnosis : ", searchResult)
    return (
      <View style={styles.container}>
        <View style={styles.patient_info}>
          <PatientItem item={patient} handleClick={null}/>
        </View>
        <View style={styles.diagnosis_info}>
          <DiagnosisList searchResult={searchResult} handleClick={handleSelectDiagnosis}/>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container : {
    height:"100%", 
    flex:1,
    paddingTop : 10,
    paddingBottom : 10,
    flexDirection : "column",
    justifyContent : "center",
    //alignItems: "center",
    
  },
  patient_info :{
    flex : 1,
    width:"100%", 
    paddingLeft:10, 
    paddingRight: 10
  },
  diagnosis_info : {
    flex : 9,
    height:"100%",
    width:"100%",  
    
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
)(Diagnosis);