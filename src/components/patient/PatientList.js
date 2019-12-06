import React, {Component} from 'react';
import {FlatList, } from "react-native";
import PatientItem from "./PatientItem";


class PatientList extends Component {

  _renderPost({item}, props) {
    const {handleClick} = props;
    return (
        <PatientItem item={item} handleClick={handleClick}/>
    )
  }
  _keyExtractor(item) {
    return item.patient_id;
  }
  render() {
    const {searchResult, } = this.props;
    return (
        <FlatList
          data={searchResult.patient_list} 
          keyExtractor={(item) => this._keyExtractor(item)}
          renderItem={(item) => this._renderPost(item, this.props)}
          contentContainerStyle={{ paddingBottom: 100}}
           />
      
    )
  }
}

export default PatientList;