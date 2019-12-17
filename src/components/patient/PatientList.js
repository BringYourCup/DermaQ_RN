import React, {Component} from 'react';
import {FlatList, View} from "react-native";
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
  render() {
    const {searchResult, } = this.props;
    return (
        <FlatList
          data={searchResult.patient_list} 
          keyExtractor={(item) => this._keyExtractor(item)}
          renderItem={(item) => this._renderPost(item, this.props)}
          contentContainerStyle={{ paddingBottom: 100, }}
          ItemSeparatorComponent={this.renderSeparator}
          
           />
      
    )
  }
}

export default PatientList;