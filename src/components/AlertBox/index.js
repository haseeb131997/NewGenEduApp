
/*
 * * Â© Copyright 2017-2020 IBD Tecnologies Private Limited.
 * *                       3/506 Kannadhsan Street ,ShanmugaNagar,Porur
 * *                       Chennai - 600125.
 * *                       India
 * *
 * * This source is part of the General Framework and is copyrighted by
 * * IBD Technologies Private Limited.
 * *
 * * All rights reserved.  No part of this work may be reproduced, stored in a
 * * retrieval system, adopted or transmitted in any form or by any means,
 * * electronic, mechanical, photographic, graphic, optic recording or otherwise,
 * * translated in any language or computer language, without the prior written
 * * permission of IBD Technologies Private Limited.
 /**/
/**/
/**/

/* * * Change Tag:NEW3.01
Change Desc: pass the 'stateObject' state for to navigate the screen.
Changed By : Shashank
Date:19-09-2021 
*/

/* * * Change Tag:NEW3.02
Change Desc: remove the router flex .
Changed By : Shashank
Date:19-09-2021 
*/

/* * * Change Tag: 3.0 UI/UX
Change Desc: Initial  summary error handling .
Changed By : Shashank
Date:23-10-2021 
*/


import React, { Component } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Text, List, Modal, Portal, Title, Dialog, Caption } from 'react-native-paper';
import { w, h } from "../../utils/Dimensions";
import Exception from "../../utils/Exception.json";
// import { Actions } from 'react-native-router-flux';
import AsyncStorage from "@react-native-async-storage/async-storage";
import GeneralUtils from "../../utils/GeneralUtils";
import AppStyles from '../../AppStyles/AppStyles';
import { Button } from 'react-native-elements';
import { UiColor } from "../../theme";
import apiCall from "../../ApiCall/ActionApi";
import { ScrollView } from 'react-native-gesture-handler';
import SubScreenUtils from "../../utils/SubScreenUtils";




class AlertBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    }
    this.alertOkClick = this.alertOkClick.bind(this)
  }

  async alertOkClick() {
    const { stateObject, } = this.props
    const { error, serviceName } = stateObject.state
    var userType = ''
    var globalData = JSON.parse(await AsyncStorage.getItem('GLOBAL'));
    console.log('apiCall.functions.fromLoading inside alert',apiCall.functions.fromLoading)  
    //console.log(error, "error")
    //console.log( 'stateobject inside alert ',stateObject.state);

    if (globalData != null) {
      userType = globalData.userType
    }


    if (error != null && error != undefined) {
      if (error[0].errorCode == 'BS_VAL_101' || error[0].errorCode == 'BS_VAL_103') {
        AsyncStorage.removeItem('Rst')
        // starts NEW3.01
        // GeneralUtils.functions.goToDashboardScreen(userType)
        GeneralUtils.functions.goToDashboardScreen(userType, stateObject)
        // ends NEW3.01
        stateObject.parentStateChange({
          showAlert: false
        })
      }
      else if (error[0].errorCode == 'BS_VAL_026') {
        

        AsyncStorage.removeItem('Rst')
        stateObject.parentStateChange({
          showAlert: false
        })
        //Rajfix001 starts
        if (apiCall.functions.fromLoading)
        {
           GeneralUtils.functions.goToDashboardScreen(userType, stateObject)
           apiCall.functions.fromLoading = false
        }
         //Rajfix001 ends
      }
      else if (error[0].errorCode == 'BS_VAL_100') {
        stateObject.parentStateChange({
          showAlert: false
        })
        GeneralUtils.functions.logOutBtn(stateObject)
      }
      else if (error[0].errorCode == 'FE-VAL-031') {
        stateObject.parentStateChange({
          showAlert: false
        })
        // starts NEW3.01
        // GeneralUtils.functions.goToDashboardScreen(userType)
        GeneralUtils.functions.goToDashboardScreen(userType, stateObject)
        // ends NEW3.01
      }
      else if (error[0].errorCode == 'FE-VAL-052') {
        stateObject.parentStateChange({
          showAlert: false
        })
        // starts NEW3.01
        // GeneralUtils.functions.goToDashboardScreen(userType)
        GeneralUtils.functions.goToDashboardScreen(userType, stateObject)
        // ends NEW3.01
      }
      // starts NEW3.02
      // else if (error[0].errorCode == 'network error!' && !Actions.currentScene.includes('Dashboard') && !Actions.currentScene.includes('Login')) {
      else if (error[0].errorCode == 'network error!' && !stateObject.props.route.name.includes('Dashboard') && !stateObject.props.route.name.includes('Login')) {
        // ends NEW3.02
        AsyncStorage.removeItem('Rst')
        // starts NEW3.01
        // GeneralUtils.functions.goToDashboardScreen(userType)
        GeneralUtils.functions.goToDashboardScreen(userType, stateObject)
        // ends NEW3.01
        stateObject.parentStateChange({
          showAlert: false
        })
      }
      else if (error[0].errorCode == 'FE-VAL-063') {
        GeneralUtils.functions.goToStripe = true
        stateObject.parentStateChange({
          showAlert: false,
          showStripeModel:true,
          isLoading: true
        })
      }
      else if (error[0].errorCode == 'FE-VAL-048') {
        GeneralUtils.functions.logOutBtn(stateObject)
      }
      else if (error[0].errorCode == 'FE-VAL-075' || error[0].errorCode == 'FE-VAL-076') {
        stateObject.parentStateChange({
          showAlert: false,
          showComment: false,
          actionType: "",
          postMessage: ""
        })
      }
      else if (error[0].errorCode == 'FE-VAL-104') {
      
        SubScreenUtils.functions.closeModal(stateObject)
        GeneralUtils.functions.unSaveBtnStatus = false
      }
      // starts 3.0 UI/UX
      else if (apiCall.functions.fromLoading) {
        stateObject.parentStateChange({
          showAlert: false
        })
        // starts NEW3.01
        // GeneralUtils.functions.goToDashboardScreen(userType)
        GeneralUtils.functions.goToDashboardScreen(userType, stateObject)
        // ends NEW3.01
        apiCall.functions.fromLoading = false
      }
      // end 3.0 UI/UX
      else {
        stateObject.parentStateChange({
          showAlert: false
        })
      }
    }
  }


  returnBtn(){
    const { stateObject } = this.props
  
    stateObject.parentStateChange({
      showAlert: false
    })
    GeneralUtils.functions.unSaveBtnStatus = false
  }


  render() {
    const { stateObject } = this.props
    const { showAlert } = stateObject.state
    var errortype = stateObject.state.errorType
    var error_message = stateObject.state.error
    var colorCode = ""
    var header = ""
    var error_messages;
    var error_type;

    var error_image;

    if (errortype == 'FE') {
      for (let value of error_message) {
        if (value.errorMessage == '' || value.errorMessage == null) {
          for (let item of Exception) {
            if (item.error_code == value.errorCode) {
              value.errorMessage = item.errorMessage
              if (value.errorParam != undefined && value.errorParam != '') {
                for (var i = 0; i < value.errorParam.length; i++) {
                  value.errorMessage = value.errorMessage.replace('$' + (i + 1), value.errorParam[i])
                }
              }
              value.errorType = item.error_type
            }
          }
        }
      }
      for (let value of error_message) {
        if (value.errorType == 'E') {
          error_type = 'E'
          break;
        }
        else {
          error_type = value.errorType
        }

      }
      error_messages = error_message

    }
    else {
      error_messages = error_message
      error_type = 'E';
    }





    // if (error_type == 'W') {
    //   colorCode = "#FFCC00"
    //   header = "Warning!"
    // }
    // if (error_type == 'E') {
    //   colorCode = "#ED4233"
    //   header = "Error!"
    // }
    // if (error_type == 'S') {
    //   colorCode = "#2C87D7"
    //   header = "Info!"
    // }
    // if (error_type == 'I') {
    //   colorCode = "#4CA746"
    //   header = "Success!"
    // }

    if (error_type == 'W') {
      colorCode = UiColor.WARNING_COLOR
      header = "Warning!"
      error_image = require('../../asssets/icons/exclamation.png')
    }
    if (error_type == 'E') {
      colorCode = UiColor.ERROR_COLOR
      header = "Error!"
      error_image = require('../../asssets/icons/error.png')
    }
    if (error_type == 'S') {
      colorCode = UiColor.INFO_COLOR
      header = "Info!"
      error_image = require('../../asssets/icons/info.png')
    }
    if (error_type == 'I') {
      colorCode = UiColor.SUCCESS_COLOR
      header = "Success!"
      error_image = require('../../asssets/icons/check.png')
    }



    var visible = false
    for (let item of error_messages) {
      if (item.errorMessage != null && item.errorMessage != '') {
        visible = true
      }
    }

    return visible && (
      <Dialog
        visible={showAlert}
      // style={styles.dialog_Container} 
      >
       {/* <View > */}
       <ScrollView showsVerticalScrollIndicator={false}>
          <Dialog.Content>
            <View style={[AppStyles.alignItems, AppStyles.marginTop_2]}>
              <Image
                style={{ tintColor: colorCode }}
                source={error_image}
              />
              <View style={styles.content_Style}> 
              {/*  <ScrollView showsVerticalScrollIndicator={false}>*/}
                {error_messages && error_messages.map((data, index) => {
                  return (
                    <Text key={index} style={styles.textStyle}>{data.errorMessage}</Text>
                  )
                })}
              {/*</ScrollView>*/}
              </View>
            </View>
          </Dialog.Content>
          <Dialog.Content>

          {/* <View style={AppStyles.alignItems}>
              <Button
                onPress={() => this.alertOkClick()}
                // title="Ok, got it!"
                title={<Text style={[styles.titleStyle]}>{'Ok, got it!'}</Text>}
                titleStyle={{}}
                // containerStyle={{ minWidth: h('17%'), color: UiColor.SKYBLUE }}
                // buttonStyle={{ backgroundColor: UiColor.LIGHT_SKYBLUE }}
                buttonStyle={{ backgroundColor: UiColor.SKYBLUE }}
              />
            </View> */}
          

           {!GeneralUtils.functions.unSaveBtnStatus ? <View style={AppStyles.alignItems}>
              <Button
                onPress={() => this.alertOkClick()}
                // title="Ok, got it!"
                title={<Text style={[styles.titleStyle]}>{'Ok, got it!'}</Text>}
                titleStyle={{}}
                // containerStyle={{ minWidth: h('17%'), color: UiColor.SKYBLUE }}
                // buttonStyle={{ backgroundColor: UiColor.LIGHT_SKYBLUE }}
                buttonStyle={{ backgroundColor: UiColor.SKYBLUE }}
              />
            </View> : <View style={[AppStyles.alignSelf, AppStyles.flexDirectionRow]}>
              <Button
                onPress={() => this.alertOkClick()}
                title={<Text style={[styles.titleStyle]}>{'Yes, close it!'}</Text>}
                titleStyle={{}}
                buttonStyle={{ backgroundColor: UiColor.SKYBLUE }}
              />

              <View style={AppStyles.marginLeft_2}>
                <Button
                  onPress={() => this.returnBtn()}
                  title={<Text>{'No, return'}</Text>}
                  buttonStyle={{ backgroundColor: UiColor.LIGHT_SKYBLUE }}
                />
              </View>
            </View>}


          </Dialog.Content>
        {/*</View> */}
        </ScrollView>

      </Dialog>
    );
  }
}


const styles = StyleSheet.create({
  main_Container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00000090'
  },
  content_Style: {
    // maxHeight:h('35%'),
    // minHeight:h('10%')
  },
  Alert_Main_View: {
    backgroundColor: "#fff",
    height: h(30),
    width: w(80),
    borderRadius: h(1),
  },
  headerContainer: {
    // width: w(80),
    height: h(7),
    borderTopStartRadius: h(.5),
    borderTopEndRadius: h(.5),
    justifyContent: 'center'
  },

  textStyle: {
    color: '#000',
    marginTop: h(1.5),
    textAlign: 'center'
  },
  textHeadig: {
    marginLeft: h(2),
    color: '#fff',
  },
  btnContentStyle: {
    height: h(6),
    width: w(15),
  },
  titleStyle: {
    color: UiColor.WHITE,
    // marginHorizontal:h('1%')
  }



})

export default AlertBox



