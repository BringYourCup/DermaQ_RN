import React, {Component} from 'react';
import {FlatList, View} from "react-native";
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
          data={searchResult.date_list} 
          keyExtractor={(item) => this._keyExtractor(item)}
          renderItem={(item) => this._renderPost(item, this.props)}
          contentContainerStyle={{ paddingBottom: 100}}
          ItemSeparatorComponent={this.renderSeparator}
           />
      
    )
  }
}

export default DiagnosisList;