import React, {Component} from 'react';
import {FlatList, } from "react-native";
import DiagnosisItem from "./DiagnosisItem";


class DiagnosisList extends Component {

  _renderPost({item}, props) {
    const {handleClick} = props;
    return (
        <DiagnosisItem item={item} handleClick={handleClick}/>
    )
  }
  _keyExtractor(item) {
    return item.date_id;
  }
  render() {
    const {searchResult, } = this.props;
    return (
        <FlatList
          data={searchResult.date_list} 
          keyExtractor={(item) => this._keyExtractor(item)}
          renderItem={(item) => this._renderPost(item, this.props)}
          contentContainerStyle={{ paddingBottom: 100}}
           />
      
    )
  }
}

export default DiagnosisList;