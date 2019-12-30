import React, {Component} from 'react';
import {ScrollView, View, Text, StyleSheet, Image} from 'react-native';
import {BackIcon, MenuIcon, HeaderTitle} from 'src/components/header';
import config from 'src/config';
import AsyncStorage from '@react-native-community/async-storage';
import {strncmp} from 'src/modules/utils';
import { GalleryImageList } from 'src/components/image';
import { TouchableOpacity, } from "react-native-gesture-handler";

export default class Gallery extends Component {

  constructor() {
    super();
    this.state = {
      access_info : null,
      image_list : [],
      isExportable : false,
      isDisplayCheck : false,
      selected_image_list : [],
    }
  }
  static navigationOptions = ({ navigation }) => {
    const image=config.images.galleryIcon;
    return {
      headerLeft: <BackIcon navigation={navigation}/>,
      headerTitle : <HeaderTitle image={image} title="Gallery" />,
      headerRight : <MenuIcon navigation={navigation}/>,
      headerStyle : {
        backgroundColor: config.colors.headerColor,
      }
    }
  };

  componentDidMount() {
    console.log("Gallery componentDidMount()");
    
    AsyncStorage.getItem('access_info')
    .then(value => { 
      const access_info = JSON.parse(value);
      this.setState({access_info : access_info});
      
        fetch(config.baseUrl + '/api/', {
            method: 'post',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                "data": {
                    "category": "image",
                    "service": "GetLibraryImages",
                    access_token: access_info.access_token,
                    skip: 0,
                    limit: 0,
                }
            })
        })
        .then(res => res.json())
        .then(json => {
          console.log("json : ", json);
            if (json.data) {
                const sort_list = json.data.image_list;

                let date_map = [[],];
                let date_index = 0;
                for (let i = 0; i < sort_list.length; i++) {
                    let item = sort_list[i];
                    if (i > 0 && strncmp(item.upload_time, sort_list[i-1].upload_time, 10)) {
                        date_map.push([]);
                        date_index++;
                    }
                    date_map[date_index].push(item);
                }
            
                this.setState({
                    image_list: date_map,
                })
            }
        })
        .catch(err => console.log(err));
    })
  }

  handleClickQuickSnapIcon = () => {

  }

  handleClickApplyButton = () => {
    this.props.navigation.navigate("galleryNewImage",
    {
      selectedImageList : this.state.selected_image_list,
      whereFrom : "Gallery"
    });
  }

  handleClickApplyIcon = () => {
    this.setState({isExportable : true,
      isDisplayCheck : !this.state.isDisplayCheck,
    });
  }
  handleClickCancelButton = () => {
    this.setState({isExportable : false,
                    isDisplayCheck : false,
                    selected_image_list : []});
  }

  handleSelectedImage = (image, checked) => {
    let image_list = [...this.state.selected_image_list];
    if(checked){
      let ind = image_list.findIndex(function(el){ return el.image_id === image.image_id})
      if(ind !== -1){
        image_list.splice(ind, 1);
      }
    } else {
      image_list.push(image);
    }
    this.setState({
      selected_image_list : image_list
    });
  }

  render() {
    const {image_list, isExportable, isDisplayCheck, selected_image_list}  = this.state;
    
    console.log("image_list : ", image_list);
    console.log("selected_image_list : ", selected_image_list);

    let result = image_list.map(images => {
      return (
        <GalleryImageList 
          key={'galleryImageIList' + images[0].upload_time.substring(0,10)}
          imageList={images}
          selelctedImageList={selected_image_list}
          isDisplayCheck={isDisplayCheck}
          handleClick={this.handleSelectedImage}
          />
      )
    })
    return (
      <View style={styles.container}>
        <View style={styles.body}>
          <ScrollView >
            {result}
          </ScrollView>
        </View>
        {isExportable ?
        <View style={styles.bottomApply}>
          <View style={styles.bottomApplySub1}>
            <TouchableOpacity style={styles.cancelButton} onPress={() => this.handleClickCancelButton()}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.bottomApplySub1}>
            <TouchableOpacity style={styles.applyButton} onPress={() => this.handleClickApplyButton()}>
                <Text style={styles.applyButtonText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
        : <View style={styles.bottom}>
          <View style={styles.bottomSub1}>
            <TouchableOpacity style={styles.bottomItem} onPress ={() =>{
                this.handleClickQuickSnapIcon();
              }}>
                <Image style={{width:45, height:45}} source={config.images.quickSnapIcon}/>
              </TouchableOpacity>        
          </View>
          <View style={styles.bottomSub2}>
            <TouchableOpacity style={styles.bottomItem} onPress ={() =>{
              this.handleClickApplyIcon();
            }}>
              <Image style={{width:45, height:45, marginLeft:10}} source={config.images.exportImage}/>
            </TouchableOpacity>
          </View>
        </View>}

      </View>
      );
    }
}

const styles = StyleSheet.create({
  container : {
    height:"100%", 
    flex:1,
  },
  body:{
    flex:9,
  },
  bottom:{
    flex:1,
    backgroundColor: config.colors.bottomColor,
    alignItems : "center",
    color: 'white',
    flexDirection:"row",
  },
  bottomSub1:{
    flex:5,
    marginLeft : 5
    
  },
  bottomSub2:{
    flex:5,
    alignItems:"flex-end",
    marginRight:5,
    
  },
  bottomItem:{
    //color : "white",
  },
  bottomApply:{
    flex:1,
    backgroundColor : config.colors.confirmBackGroundColor,
    flexDirection : "row"
  },
  bottomApplySub1 :{
    flex:1,
    justifyContent : "center",
  },
  cancelButton : {
    width : "95%",
    backgroundColor: config.colors.confirmButtonColor,
    padding: 10,
    margin : 10,
    borderRadius: 5,
    justifyContent : "center",
    alignSelf : "center",
  },
  cancelButtonText : {
    alignItems : "center",
    color : "white",
    textAlign : "center",
    fontSize : 18 
  },
  applyButton : {
    width : "95%",
    backgroundColor: config.colors.confirmButtonColor,
    padding: 10,
    margin : 10,
    borderRadius: 5,
    justifyContent : "center",
    alignSelf : "center",
    
  },
  applyButtonText : {
    alignItems : "center",
    color : "white",
    textAlign : "center",
    fontSize : 18,
  },
  
});