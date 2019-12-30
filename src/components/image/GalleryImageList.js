import React, {Component} from 'react';
import {Image, View, StyleSheet, Text, TouchableOpacity} from "react-native";
import config from 'src/config';

class GalleryImageList extends Component {

  
  render() {
    const {imageList, handleClick, isDisplayCheck, selelctedImageList } = this.props;

    
    
    return (
      <View style={{flex:1, flexDirection:"column",}}>
          <Text style={{color: "#00a5bd", borderRadius:5, fontSize : 14, alignSelf: 'flex-start', margin : 5,backgroundColor:'#e0f4f7'}}> {'  ' + imageList[0].upload_time.substring(0,10)+ '  '}</Text>
          <View style={styles.container} >
            
          {imageList.map((image) => {

            let checked = selelctedImageList.findIndex((arrItem) => {
              return arrItem.image_id === image.image_id
            });
            
            if (checked >= 0) {
              checked = true;
            }
            else 
              checked = false;

            return(
              <TouchableOpacity style={{position : "relative"}} key={image.image_id} onPress={()=>{
                isDisplayCheck ? handleClick(image, checked) : null
                }}>
                <Image 
                  style={styles.imageThumb}
                  source ={{
                    uri : image.uri.thumbnail,
                  }}
                  />
                  {isDisplayCheck && !checked &&
                    <Image 
                      style={styles.checkButton}
                      source ={config.images.checkNoImage}
                    />}

                  {isDisplayCheck && checked &&
                    <Image 
                      style={styles.checkButton}
                      source ={config.images.checkYesImage}
                    />}
              </TouchableOpacity>
            );
          })}
          </View>
      </View>
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
  checkButton : {
    position : "absolute",
    left : config.styleConstants.oneThirdWidth - 45,
    top : config.styleConstants.oneThirdWidth - 45,
  }
});

export default GalleryImageList;