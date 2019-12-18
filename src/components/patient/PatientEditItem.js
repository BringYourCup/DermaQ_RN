import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from "react-native";
import config from 'src/config';



class PatientEditItem extends Component {
  constructor() {
    super();
    
  }

  state = {
    selectedPatient : '',
  }

 getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
  }

  selectEditPatient = (item) => {
    this.editPatient(item);
  }

  editPatient = (item) => {
    this.setState({selectedPatient : []})
    this.props.handleClick(item);
  }

  selectDeletePatient = (item) => {
    /* 이미 선택되어 있다면 선택에서 뺀다. */
    console.log("state : ", this.state.selectedPatient);
    if(this.isSeletedPatient(item)){
      this.setState({selectedPatient: ''});
      this.props.handleClick(item.patient_id, "del");
      return;
    }
    this.setState({selectedPatient: item.patient_id});
    this.props.handleClick(item.patient_id, "add");
  }
  componentDidMount(){
    console.log("PatientEditItem componenetDidMount()")
  }

  isSeletedPatient = (item) => {
    if(this.state.selectedPatient == item.patient_id){
      return true; 
    }
    return false;
  }
  render() {
    const {item, isEditable, isDeletable, } = this.props;
    return (
      <View style={styles.container}>
          <View style={styles.bodyLeft}>
            <Image source={config.images.patientEmptyImage} resizeMode="contain"
            style={{width : 25, height : 25}}/>
          </View>
          
          <TouchableOpacity style={styles.bodyMiddle}>
              <View style={styles.patientName}>
                <Text style={styles.textStyle}>{item.name}</Text>
              </View>
              <View style={styles.patientInfo}>
                <View style={styles.patientAge}>
                  <Text style={styles.textStyle}>{"M"} {"(" + this.getAge(item.birth_date) + ")"}</Text>
                </View>
                <View style={styles.patientBirth}>
                  <Text style={styles.textStyle}>{" / "} {item.birth_date}</Text>
                </View>
              </View>
          </TouchableOpacity>
          <View style={styles.bodyRight}>
            {isEditable &&
              <TouchableOpacity style={styles.circle} onPress={() => this.selectEditPatient(item)}>
              </TouchableOpacity>}
            {isDeletable &&
              <TouchableOpacity style={styles.circle} onPress={() => this.selectDeletePatient(item)}>
                  { this.isSeletedPatient(item) && (<View style={styles.checkedCircle} />) }
              </TouchableOpacity>
            }
          </View>
      </View>)
  }
}

const styles = StyleSheet.create({
  container : {
    width: "100%",
    flex:1,
    height : 50,
    justifyContent:"center",
    flexDirection : "row",
    paddingBottom:5,
    paddingTop:5,
    
  },
  textStyle: {
    fontFamily : "Arial",
  },
  bodyLeft : {
    flex : 2,
    justifyContent:"center",
    alignItems: "center",
  },
  bodyMiddle : {
    flex : 8,
    justifyContent:"center",
    flexDirection : "column",
  },
  patientName:{
    flex : 1,
  },
  patientInfo :{
    flex : 1,
    flexDirection : "row",
  },
  patientAge : {
    flex : 3,
  },
  patientBirth : {
    flex : 7,
  },
  bodyRight : {
    flex : 2,
    justifyContent:"center",
    alignItems:"center"
  },
  circle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ACACAC',
    alignItems: 'center',
    justifyContent: 'center',
},
checkedCircle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#794F9B',
},
});
export default PatientEditItem;