// import component
import React, { Component } from 'react';
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';
import MultiSelect from 'src/components/select/MultiSelect';

import SelectTags from 'src/components/select/SelectTags';
 
export default class DermMultiSelect extends Component {
 
  render() {
    const { selectedItems, items } = this.props;
    
    console.log("render() : ", selectedItems);
    console.log("this.multiSelect : ", this.multiSelect);
    console.log("items : ", items);

    const itemList = [];

    items && items.forEach((item) => {
      itemList.push({
        id : item,
        name : item,
      })
    });
    console.log("itemList : ", itemList)
    return (
      <View style={{ height : itemList.length? itemList.length*40+40+100: 200 }}>
        <MultiSelect
          items={itemList || []}
          uniqueKey="id"
          ref={(component) => { this.multiSelect = component }}
          onSelectedItemsChange={this.props.onSelectedItemsChange}
          selectedItems={selectedItems || []}
          selectText="Pick Items"
          searchInputPlaceholderText="Search Items..."
          altFontFamily="ProximaNova-Light"
          hideSubmitButton={true}
          selectedItemTextColor="#CCC"
          selectedItemIconColor="#CCC"
          tagRemoveIconColor= "#cccccc"
          tagBorderColor= "#cccccc"
          tagTextColor= "#cccccc"
          itemTextColor="#000"
          displayKey="name"
          searchInputStyle={{ color: '#CCC' }}
          submitButtonColor="#CCC"
          submitButtonText="Submit"
          canAddItems={true}
          onAddItem={this.props.onAddItem}
          //fixedHeight={true}  
        />
        
      </View>
    );
  }
}