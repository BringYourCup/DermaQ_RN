// import component
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import MultiSelect from 'src/components/select/MultiSelect';
import config from 'src/config';


export default class DermSingleSelect extends Component {
 
  render() {
    const { selectedItems, items } = this.props;
    
    console.log("render() : ", selectedItems);
    console.log("this.multiSelect : ", this.multiSelect);
    console.log("items : ", items);
    console.log("DermSingleSelect selectedItems : ", selectedItems);
    const itemList = [];

    items && items.forEach((item) => {
      itemList.push({
        id : item,
        name : item,
      })
    });
    console.log("itemList : ", itemList)
    return (
      <View style={{ height : itemList.length? itemList.length*40+40: 200 }}>
        <MultiSelect
          single
          hideTags
          items={itemList || []}
          uniqueKey="id"
          ref={(component) => { this.multiSelect = component }}
          onSelectedItemsChange={this.props.onSelectedItemsChange}
          selectedItems={selectedItems || []}
          selectText={selectedItems.length === 0 ? "Employee's Role" : selectedItems[0]}
          searchInputPlaceholderText="Search Items..."
          altFontFamily="ProximaNova-Light"
          selectedItemTextColor="#CCC"
          selectedItemIconColor="#CCC"
          itemTextColor="#000"
          displayKey="name"
          searchInputStyle={{ color: '#CCC' }}
          canAddItems={true}
          onAddItem={this.props.onAddItem}
          onToggleList={this.props.onToggleList}
          
        />
        <View>
          {/*this.multiSelect && this.multiSelect.getSelectedItemsExt(selectedItems)*/}
          {/*getSelectedItemsExt(selectedItems)*/}
          
        </View>
      </View>
    );
  }
}

