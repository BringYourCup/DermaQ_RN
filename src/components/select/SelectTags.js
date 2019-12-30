import React, { Component } from 'react';
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';
import reject from 'lodash/reject';
import find from 'lodash/find';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
 
export default class SelectTags extends Component {
   
  getSelectedItemsExt = optionalSelctedItems => (
    <View
      style={{
        flexDirection: 'row',
        flexWrap: 'wrap'
      }}
    >
      {this._displaySelectedItems(optionalSelctedItems)}
    </View>
  );

  _displaySelectedItems = optionalSelctedItems => {
    const fontFamily = '';
    const tagRemoveIconColor = colorPack.tagRemoveIconColor;
    const tagBorderColor = colorPack.tagBorderColor;
    const uniqueKey = 'id';
    const displayKey = 'name';
    const tagTextColor = colorPack.tagTextColor;
    const {
      selectedItems,
    } = this.props;
    const actualSelectedItems = optionalSelctedItems || selectedItems || [];

    return actualSelectedItems.map(singleSelectedItem => {
      const item = this._findItem(singleSelectedItem);
      if (!item) return null;
      if (!item[displayKey]) return null;
      return (
        <View
          style={[
            styles.selectedItem,
            {
              width: item[displayKey].length * 8 + 60,
              justifyContent: 'center',
              height: 30,
              borderColor: tagBorderColor
            }
          ]}
          key={item[uniqueKey]}
        >
          <Text
            style={[
              {
                flex: 1,
                color: tagTextColor,
                fontSize: 15
              },
              fontFamily ? { fontFamily } : {}
            ]}
            numberOfLines={1}
          >
            {item[displayKey]}
          </Text>
          <TouchableOpacity
            onPress={() => {
              this._removeItem(item);
            }}
          >
            <Icon
              name="close-circle"
              style={{
                color: tagRemoveIconColor,
                fontSize: 15,
                marginLeft: 10
              }}
            />
          </TouchableOpacity>
        </View>
      );
    });
  };
  
  _removeItem = item => {
    const uniqueKey = 'id';
    const {onSelectedItemsChange} = this.props;
    const {selectedItems} = this.props;
    const newItems = reject(
      selectedItems,
      singleItem => item[uniqueKey] === singleItem
    );
    // broadcast new selected items state to parent component
    onSelectedItemsChange(newItems);
  };
  
  
  _findItem = itemKey => {
    const uniqueKey = 'id';
    const { items, } = this.props;
    const itemList = [];

    items && items.forEach((item) => {
      itemList.push({
        id : item,
        name : item,
      })
    });
    return find(itemList, singleItem => singleItem[uniqueKey] === itemKey) || {};
  };
  
 
  render() {
    const { selectedItems } = this.props;
    const {getSelectedItemsExt} = this;
    
    return (
      <View style={{ flex: 1 }}>
        <View>
          {getSelectedItemsExt(selectedItems)}
        </View>
      </View>
    );
  }
}



const colorPack = {
  primary: '#00A5FF',
  primaryDark: '#215191',
  light: '#FFF',
  textPrimary: '#525966',
  placeholderTextColor: '#A9A9A9',
  danger: '#C62828',
  borderColor: '#e9e9e9',
  backgroundColor: '#b1b1b1',
  tagRemoveIconColor: "#cccccc",
  tagBorderColor: "#cccccc",
  tagTextColor: "#cccccc",
};


const styles = StyleSheet.create({
  selectedItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
    paddingTop: 3,
    paddingRight: 3,
    paddingBottom: 3,
    margin: 3,
    borderRadius: 20,
    borderWidth: 2,
  },
})