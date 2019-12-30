import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogButton,
} from 'react-native-popup-dialog';
import config from 'src/config';

export default class ConfirmOkDialog extends Component {

  

  componentDidMount(){
    console.log("OK Dialog componentDidMount()")
  }
  componentWillUnmount(){
    console.log("OK Dialog componentWillUnmount() : ", this.props.isVisable);
  }
  
  render() {
    const {titleText, contentText, clickYesButton, isVisable} = this.props;

    console.log("OK Confirm Dialog render() : ", isVisable);

    return (
      <View style={styles.container}>
        <Dialog
          onDismiss={() => {
            clickYesButton();
          }}
          onTouchOutside={() => {
            clickYesButton();
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
                text="Confirm"
                bordered
                onPress={() => {
                  clickYesButton();
                }}
                key="button-1"
                textStyle={{color : '#F7F7F8'}}
              />
              <View />
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