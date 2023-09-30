
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
Change Desc: to set setMount and setUnMount  according to new navigation  and remove the onEnter and onExit
Changed By : Shashank
Date:17-09-2021 
*/

/* * * Change Tag:NEW3.02
Change Desc: reset currentElemnet for new screen
Changed By : Shashank
Date:19-09-2021 
*/




// import React, { useState, useEffect } from "react";
import React, { Component } from "react";
import {
  View,
  Image,
  TouchableOpacity, Platform,
} from "react-native";
//import { httpUtils } from '../../utils/HttpUtils';
//import { w, h, } from "../../utils/Dimensions";
import { Text, Portal, Provider, Divider, Title } from 'react-native-paper';
import { UiColor } from "../../theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AlertBox from '../../components/AlertBox';
import apiCall from "../../ApiCall/ActionApi";
import Spinner from '../../components/Loader';
import AppStyles from "../../AppStyles/AppStyles";
import Exception from '../../utils/Exception'
import axios from "axios";
import GeneralUtils from "../../utils/GeneralUtils";
import InputText from '../../components/InputText';
import CustomButtons from '../../components/CustomButtons';
import AppHeader from "../../components/AppHeader";











// var text = "Please Enter New Password and Press Submit"
var text = "Please Enter Password and Press Submit"

var apiError = false


class ChangePassword extends Component {
  // static onEnter() { 
  //   const c = Actions.refs.ChangePassword; c.setMount(false); }

  //   static onExit() { 
  //     const c = Actions.refs.ChangePassword; c.setUnmount(true); }
  constructor(props) {
    super(props);
    this.state = {
      dataModel: null,
      newConfirmPwd: '',
      operation: 'ChangePwdFromMainPage',
      currentElemnet: 1,
      instruction: text,
      error: [{ errorCode: '', errorMessage: '', errorParam: '' }],
      errorType: "",
      isLoading: false,
      token: '',
      showAlert: false,
      auditDataModel: {},
      unMount: false
    }
    this.onChange = this.onChange.bind(this)
    this.fnHitBackend = this.fnHitBackend.bind(this)
    this.parentStateChange = this.parentStateChange.bind(this)
    this.setUnmount = this.setUnmount.bind(this)
    this.setMount = this.setMount.bind(this)
    this.closeClick = this.closeClick.bind(this)
  }
  
  // starts NEW3.01
  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.setMount(false)
    });
    this._unsubscribe = this.props.navigation.addListener('blur', () => {
      this.setUnmount(true)
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }
  // ends NEW3.01


  setUnmount(unMount) {
    this.setState({
      unMount: unMount,
    })
    apiCall.functions.cancelToken.cancel('Api is being canceled');
  }

  setUnmount(unMount) {
    this.setState({
      unMount: unMount,
      dataModel: null,
    })
    apiCall.functions.cancelToken.cancel('Api is being canceled');
  }

  async setMount(unMount) {
    var dataModel = {
      mobile: "",
      newPwd: "",
      OTP: "",
      newConfirmPwd: ''
    }
    this.setState({
      unMount: unMount,
      dataModel: dataModel,
      // starts NEW3.02
      currentElemnet: 1
      // ends NEW3.02
    })
    apiCall.functions.cancelToken = axios.CancelToken.source()
  }


  fnHitBackend = async () => {
    try {
      const { dataModel, operation, auditDataModel } = this.state
      var apiObject = {}
      var globalData = JSON.parse(await AsyncStorage.getItem('GLOBAL'));
      if (globalData != null) {
        apiCall.functions.apiCallRequired = true
        apiObject = {
          serviceName: 'ChangePwd',
          serviceType: 'User',
          datamodel: dataModel,
          operation: operation,
          businessEntity: [{ entityName: 'mobile', entityValue: globalData.userID }],
          audit: auditDataModel
        }
        await apiCall.functions.callApi(apiObject, null, this.parentStateChange)
      }
    }
    //  start NEAI-229
    catch (err) {
      this.setState({
        isLoading: false
      })
    }
    //  end NEAI-229
  }

  validation = () => {
    const { dataModel, error } = this.state

    if (dataModel.newPwd == "" || dataModel.newPwd == null) {
      Exception.functions.showFrontendError(this.parentStateChange, [{ errorCode: 'FE-VAL-001', errorMessage: '', errorParam: ['New password'] }])
      return false;
    } else if (dataModel.newConfirmPwd == "" || dataModel.newConfirmPwd == null) {
      Exception.functions.showFrontendError(this.parentStateChange, [{ errorCode: 'FE-VAL-001', errorMessage: '', errorParam: ['Confirm password'] }])
      return false;

    } else {
      this.onChange()
    }
  };

  async onChange() {
    const { currentElemnet } = this.state
    switch (currentElemnet) {
      case 1:
        await this.fnHitBackend(this)
        if (!apiCall.functions.apiError) {
          this.setState({
            currentElemnet: currentElemnet + 1,
            instruction: 'Password is changed, Please login again'

          })
        }
        break
    }
  }


  goTOLogin = async () => {
    // GeneralUtils.functions.logOutBtn()
    GeneralUtils.functions.logOutBtn(this)
  }


  parentStateChange(object) {
    this.setState(
      object
    );
  }

  async closeClick() {
    var userType = ''
    var globalData = JSON.parse(await AsyncStorage.getItem('GLOBAL'));
    if (globalData != null) {
      userType = globalData.userType
    }
    // GeneralUtils.functions.goToDashboardScreen(userType)
    GeneralUtils.functions.goToDashboardScreen(userType,this)
  }



  render() {
    const { isLoading, instruction, currentElemnet, dataModel, unMount } = this.state
    return (unMount == false && dataModel != null) ? (
      // return  (
      <Provider>
        <View>
        <AppHeader 
        stateObject={this}
        />
          <View style={[{ backgroundColor: UiColor.SKYBLUE }]}>
            <View style={[AppStyles.loginHeader, AppStyles.alignItems,]}>
              <Image
                resizeMode="contain"
                style={[AppStyles.appLogo, AppStyles.marginTop_3]}
                source={require('./../../asssets/logo04.png')}
              />
              {/* <Title style={[AppStyles.signInToStyle]}>NewGenEducationApp</Title> */}

              <View style={AppStyles.imgContainer}>
                <Image
                  resizeMode="contain"
                  style={AppStyles.forgotIllustrationImg}
                  source={{ uri: 'https://preview.keenthemes.com/craft/assets/media/illustrations/sigma-1/17.png' }}
                />
              </View>

            </View>
            <View style={[AppStyles.loginContainer,AppStyles.height100]}>
              <View style={[AppStyles.margin]}>
                <View style={AppStyles.alignItems}>
                  {currentElemnet != 2 && <Title>Setup New Password ?</Title>}
                  {currentElemnet == 2 && <View style={AppStyles.forgotImgcontainer}>
                    <Image
                      style={{ tintColor: UiColor.SUCCESS_COLOR }}
                      source={require('./../../asssets/icons/check.png')}
                    />
                  </View>}

                  <Text style={{ color: UiColor.LIGHT_TEXT_COLOR, textAlign: 'center' }}>{this.state.instruction}</Text>
                </View>



                {currentElemnet == 1 ? <View>
                
                  <View style={AppStyles.marginTop_3}>
                    <InputText
                      label={'Password'}
                      secureTextEntry={true}
                      onChangeText={text => {
                        dataModel.newPwd = text;
                        this.setState({ dataModel: dataModel })
                      }}
                      value={dataModel.newPwd}
                    />
                  </View>
                  <View style={AppStyles.marginTop_3}>
                    <InputText
                      label={'Confirm Password'}
                      secureTextEntry={true}
                      onChangeText={text => {
                        dataModel.newConfirmPwd = text;
                        this.setState({ dataModel: dataModel })
                      }}
                      value={dataModel.newConfirmPwd}
                    />
                  </View>
              
                </View> : null}


              </View>

              <View style={[AppStyles.alignItems]}>
              <View style={AppStyles.flexDirectionRow}>
                <CustomButtons
                  onPress={currentElemnet == 2 ? this.goTOLogin : this.validation}
                  title={currentElemnet != 2 ? 'Submit' : 'Ok, got it!'}
                  titleStyle={AppStyles.signInTextStyle}
                  containerStyle={AppStyles.signInContainer}
                  buttonStyle={AppStyles.commonButtonStyle}
                />

                  {currentElemnet == 1 ? <View style={AppStyles.marginLeft_2}>

                <CustomButtons
                  onPress={this.closeClick}
                  title={'Cancel'}
                  titleStyle={AppStyles.signInTextStyle}
                  containerStyle={AppStyles.signInContainer}
                  buttonStyle={AppStyles.commonButtonStyle}
                />
              
                </View> : null}
                </View>
              </View>

              <View style={[AppStyles.alignItems, AppStyles.marginVertical_5]}>
                <View style={AppStyles.flexDirectionRow}>
                  <Text style={AppStyles.aboutText}>About</Text>
                  <Text style={AppStyles.supportText}>Support</Text>
                </View>
                <View style={AppStyles.marginTop_1}>
                  <Text style={{ color: UiColor.DRAK_GRAY_COLOR }} >©2021 IBD Technologies</Text>
                </View>
              </View>

            </View>
          </View>
          <AlertBox
            stateObject={this}
          />
          {isLoading &&
            <Spinner loading={isLoading} />
          }
        </View>
      </Provider>
    ) :null
  }
}


export default ChangePassword;