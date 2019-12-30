
import React, { Component } from 'react';
import {NavigationActions, StackActions} from 'react-navigation';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import {DrawerItems, DrawerActions} from "react-navigation-drawer";
import config from 'src/config';

export default class DrawContentComponent extends Component {

    navigateToScreen = ( {route, focus} ) =>{
       
        console.log("navigateToScreen : ", route, focus);
        /*
        const navigateAction = NavigationActions.navigate({
            routeName: route.routeName
        });
        */
       /* 일단 동작하는거 같긴한데 정확한지 잘 모르겠음 */
       const navigateAction = StackActions.reset({
        index: 0,
        key : route.key,
        actions: [
        NavigationActions.navigate({ routeName: route.routes[0].routeName})
        ]
    })
        
        this.props.navigation.dispatch(navigateAction);
    }

  render() {
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Image source={config.images.profileIcon} style={{marginLeft: 10, width :50, height :50}}/>
                <Text style={styles.headerText}>Dr. Kim</Text>
            </View>
            <View style={styles.screenContainer}>
                <DrawerItems {...this.props} 
                onItemPress={this.navigateToScreen.bind(this)}/>
            </View>
            <View style={styles.tailContainer}>
                <View style={styles.tailItem1}></View>
                <TouchableOpacity style={styles.tailItem2} onPress={() => {
                        const closeDrawerAction = DrawerActions.closeDrawer();
                        this.props.navigation.dispatch(closeDrawerAction)}}>
                    <Image source={config.images.drawerBackIcon} style={{width :30, height :30}}/>
                </TouchableOpacity>
            </View>
        </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex : 1,
    },
    headerContainer: {
        flex : 2,
        flexDirection : 'row',
        padding : 10,
        alignItems: 'center',
        width :"100%",
        backgroundColor : config.colors.headerColor,
        
    },
    headerText: {
        fontSize: 20,
        marginLeft: 10, 
        color : "white",
    },
    screenContainer: { 
        width: '100%',
        flex : 6,
    },
    tailContainer: { 
        padding : 20,
        width: '100%',
        flex : 2,
        justifyContent: 'center',
        
        flexDirection : 'row',
    },
    tailItem1:{
        flex : 8,
    },
    tailItem2:{
        flex : 2,
        alignItems : "center",
        justifyContent: 'center',
    },
});