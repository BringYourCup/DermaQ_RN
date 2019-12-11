import React, {Component} from 'react';
import {Image, View, StyleSheet, ScrollView, TouchableOpacity} from "react-native";
import config from 'src/config';

class ImageList extends Component {

  
  render() {
    const {searchResult, handleClick } = this.props;
    return (
        <ScrollView  >
          <View style={styles.container} >
          {searchResult.image_list.map((image, i) => {
            return(
              <TouchableOpacity key={image.image_id} onPress={()=>{
                handleClick(image);
              }} >
                <Image 
                  key={image.image_id}
                  style={styles.imageThumb}
                  source ={{
                    uri : image.uri.thumbnail,
                  }}
                  />
              </TouchableOpacity>
            );
          })}
          </View>
        </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: 100 + "%",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  imageThumb: {
    width: config.styleConstants.oneThirdWidth - 10,
    height: config.styleConstants.oneThirdWidth - 10,
    margin : 5,
    borderRadius : 10,
  },
});

export default ImageList;