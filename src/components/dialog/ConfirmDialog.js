import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogButton,
} from 'react-native-popup-dialog';
import config from 'src/config';

export default class ConfirmDialog extends Component {

  

  componentDidMount(){
    console.log("Dialog componentDidMount()")
  }
  componentWillUnmount(){
    console.log("Dialog componentWillUnmount()")
    
  }
  
  render() {


    const {titleText, contentText, clickNoButton, clickYesButton, isVisable} = this.props;

    console.log("Confirm Dialog render() : ");
    return (
      <View style={styles.container}>
        <Dialog
          onDismiss={() => {
            clickNoButton();
          }}
          onTouchOutside={() => {
            clickNoButton();
          }}
          width={0.9}
          visible={isVisable}
          rounded
          actionsBordered
          dialogTitle={
            <DialogTitle
              title={titleText}
              style={{
                backgroundColor: '#F7F7F8',
              }}
              hasTitleBar={false}
              align="left"
            />
          }
          footer={
            <DialogFooter 
              style={{backgroundColor : config.colors.confirmButtonColor}}>
              <DialogButton
                text="NO"
                bordered
                onPress={() => {
                  clickNoButton();
                  console.log("AAAAAAAAAAAAAAAAAA");
                }}
                key="button-1"
                textStyle={{color : '#F7F7F8'}}
              />
              <DialogButton
                text="YES"
                bordered
                onPress={() => {
                  clickYesButton();
                }}
                key="button-2"
                textStyle={{color : '#F7F7F8'}}
              />
            </DialogFooter>
          }>
          <DialogContent
            style={{
              backgroundColor: '#F7F7F8'
            }}>
            <Text style={{textAlign:"center", fontSize:16}}>{contentText}</Text>
          </DialogContent>
        </Dialog>
 
      </View>
    );
  }
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: "absolute"
  },
});