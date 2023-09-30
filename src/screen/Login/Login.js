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
Change Desc: pass the 'this' state for to navigate the screen.
Changed By : Shashank
Date:17-09-2021 
*/

/* * * Change Tag:NEW3.03
Change Desc: not show alert in frontend.
Changed By : Shashank
Date:17-09-2021 
*/

/* * * Change Tag:3.0 UI/UX
Change Desc:  Mobile :-  change case for create default
Changed By : Shashank
Date:10-10-2021 
*/





// import React, { useState, useEffect } from "react";
import React, { Component } from "react";
import {
  View,
  Image,
  Linking,
  TouchableOpacity, ToastAndroid, Platform, SafeAreaView, ScrollView
} from "react-native";
import { w, h } from "../../utils/Dimensions";
import { Card, Text, Portal, Provider, Title, Subheading } from 'react-native-paper';
import { UiColor } from "../../theme";
import apiCall from "../../ApiCall/ActionApi";
import Spinner from '../../components/Loader';
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppStyles from "../../AppStyles/AppStyles";
import InputText from '../../components/InputText';
import Exception from '../../utils/Exception'
import SelectListUtils from "../../utils/SelectListUtils";
import GeneralUtils from "../../utils/GeneralUtils";
import axios from "axios";
import cloneDeep from 'lodash/cloneDeep';
import AlertBox from '../../components/AlertBox';
import CustomButtons from '../../components/CustomButtons';
// import Validator from '../../utils/Validator'
// import ExceptionArray from '../../utils/Exception.json'
import DrawerListUtils from "../../utils/DrawerListUtils";
import CustomCacheMemory from "../../utils/CustomCacheMemory";














class Login extends Component {
  // starts NEW3.01
  // static onEnter() {
  //   const c = Actions.refs.Login;
  //   c.setMount(false);
  // }

  // static onExit() {
  //   const c = Actions.refs.Login;
  //   c.setUnmount(true);
  // }
  // ends NEW3.01
  constructor(props) {
    super(props);
    this.state = {
      dataModel: {
        userID: '',
        password: '',
      },
      // dataModel:{
      //   userID: 'ptlyix1njf@just4fun.me',
      //   password: 'Pasword123',
      // },
      apiStatus: '',
      loading: false,
      showAlert: false,
      // error: [{ errorCode: '', errorMessage: '', errorParam: '' }],
      error: [{ errorCode: '', errorMessage: '', errorParam: '' }],
      errorType: "",
      isLoading: false,
      isLoginData: {},
      errorField: [],

      errorEmailStatus: false,
      errorPasswordStatus: false,
      validateStatus: false
    }
    this.postApiResponse = this.postApiResponse.bind(this)
    this.parentStateChange = this.parentStateChange.bind(this)
    this.setUnmount = this.setUnmount = this.setUnmount.bind(this)
    this.setMount = this.setMount = this.setMount.bind(this)
    // SelectListUtils.functions.getSelectMaster = SelectListUtils.functions.getSelectMaster
  }



  // starts NEW3.01
  // componentWillMount() {
  //   this._unsubscribe = this.props.navigation.addListener('focus', () => {
  //     this.setMount(false)
  //   });
  // }
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

  async setMount() {
    try {
      // SelectListUtils.functions.abortController = new AbortController()
      apiCall.functions.loginCancelToken = axios.CancelToken.source()
      // start NEAI-276
      const value = await AsyncStorage.getItem('userID');
      var dummyDataModel = cloneDeep(this.state.dataModel)
      if (value !== null) {
        dummyDataModel.userID = value
        this.setState({
          dataModel: dummyDataModel
        })
      }
      // end NEAI-276
    } catch (error) {
      // Error retrieving data
    }

  }



  setUnmount() {
    apiCall.functions.loginCancelToken.cancel('Login Api is being canceled');
  }

  mandatoryCheck = () => {
    try {
      this.state.errorField = []
      var mandatoryCheckError = false;
      const { dataModel, error } = this.state
      if (dataModel.userID == '' || dataModel.userID == null) {
        mandatoryCheckError = true
        this.state.errorField.push('field1')
      }
      if (dataModel.password == '' || dataModel.password == null) {
        mandatoryCheckError = true
        this.state.errorField.push('field2')
      }
    }
    catch (err) {
    }
    if (mandatoryCheckError) {
      Exception.functions.showFrontendError(this.parentStateChange, [{ errorCode: 'FE-VAL-080', errorMessage: '', errorParam: '' }])
      return false
    }
    else {
      return true
    }

  }



  validation = () => {
    try {          // NEAI-229
      const { dataModel, error } = this.state
      // var dummyModel = cloneDeep(dataModel)
      // dummyModel.userID = dataModel.userID.toLowerCase()



      var apiObject = {
        serviceName: 'LoginAuthenticate',
        serviceType: 'App',
        datamodel: dataModel,
        operation: null,
        businessEntity: null,
        audit: null,
      }
      // if (dataModel.userID == "") {
      //   Exception.functions.showFrontendError(this.parentStateChange, [{ errorCode: 'FE-VAL-039', errorMessage: '', errorParam: ''}])
      // } else if (dataModel.password == "") {
      //   Exception.functions.showFrontendError(this.parentStateChange, [{ errorCode: 'FE-VAL-040', errorMessage: '', errorParam: '' }])
      // } 
      // else {
      //   apiCall.functions.callApi(apiObject, this.postApiResponse, this.parentStateChange)
      // }
      if (this.mandatoryCheck()) {
        apiCall.functions.callApi(apiObject, this.postApiResponse, this.parentStateChange)
      }
    }
    // start NEAI-229
    catch (err) {
      this.setState({
        isLoading: false
      })
    }
    // end NEAI-229
  };


  // starts 3.0 UI/UX

  getDrawerList = (userType) => {
    switch (userType) {
      case 'A':
        return DrawerListUtils.functions.AdminDraweList
        break
      case 'O':
        return DrawerListUtils.functions.StaffDraweList
        break
      case 'T':
        return DrawerListUtils.functions.TeacherDraweList
        break
      case 'S':
        return DrawerListUtils.functions.ParentDraweList
        break
      case 'P':
        return DrawerListUtils.functions.ParentDraweList
        break
    }
  }
  // ends 3.0 UI/UX


  async postApiResponse(responseData) {
    console.log(responseData, "login Response")
    if (responseData.status == 'success') {
      //console.log(responseData,"getting data")
      var global = {
        language: responseData.language,
        plan: responseData.plan,
        token0: responseData.token0,
        token1: responseData.token1,
        token2: responseData.token2,
        userType: responseData.userType,
        emailId: responseData.emailId,
        mobileNo: responseData.mobileNo,
        userName: responseData.userName,
        staffID: responseData.staffID,
        studentID: responseData.studentID,
        profileImagePath: responseData.profileImagePath,
        logoImagePath: responseData.logoImagePath,
        userID: responseData.token2.split('~')[0],
        instituteID: responseData.token2.split('~')[1],
        instituteName: responseData.token2.split('~')[2],
        currencyCode: responseData.currencyCode,
        homeInstituteID: responseData.token2.split('~')[1]
      }
      try {
        await AsyncStorage.setItem('GLOBAL', JSON.stringify(global))
      } catch (error) {
        // Error saving data
      }
      GeneralUtils.functions.globalHeadarData = {
        instituteName:responseData.token2.split('~')[2],
        logoImagePath:responseData.logoImagePath,
        token1:responseData.token1,
        userID:responseData.token2.split('~')[0],
        instituteID:responseData.token2.split('~')[1],
        token0: responseData.token0,
        profileImagePath:responseData.profileImagePath,
        userName:responseData.userName,
        emailId:responseData.emailId
      }
      
     try{
      CustomCacheMemory.functions.loadCacheFromLocalStorage()
     }
     catch(err){
      console.log("err at loading cache : "+err);
     }
     

      await AsyncStorage.removeItem('Rst')
      // starts NEAI-294
      await AsyncStorage.removeItem('selectBox')
      // ends NEAI-294
      // start NEAI-175
      await AsyncStorage.getAllKeys()
        .then(keys => {
          for (let item of keys) {
            if (item.includes('SearchService')) {
              AsyncStorage.removeItem(item)
            }
          }
        }
        )

      apiCall.functions.selectMasterCancelToken = axios.CancelToken.source()


      SelectListUtils.functions.getSelectMaster()
      await AsyncStorage.setItem('userID', this.state.dataModel.userID)
      var dummyDataModel = cloneDeep(this.state.dataModel)
      dummyDataModel.password = ""
     
      GeneralUtils.functions.drawerList = this.getDrawerList(responseData.userType)
      


      this.setState({
        dataModel: dummyDataModel,
        isLoading: false
      }, () => {
        // starts  NEW3.02
        // GeneralUtils.functions.goToDashboardScreen(responseData.userType)
        GeneralUtils.functions.goToDashboardScreen(responseData.userType, this)
        // ends NEW3.02
      })

      

    }
  }

  parentStateChange(object) {
    this.setState(
      object
    );

  }



  render() {
    const { dataModel, isLoading,errorField } = this.state
    const link = {
      terms_conditionLink: 'https://ibdtechnologies.com/html/Terms.html',
      policyLink: "https://ibdtechnologies.com/html/Legal.html",
      cookieLink: "https://ibdtechnologies.com/html/cookies.html",
      aboutLink:"https://newgeneducationapp.com/",
      supportLink:"https://newgeneducationapp.com/support.html"
    }

    return (
      <SafeAreaView style={AppStyles.loginMainContainer}>
        <ScrollView bounces>
          <View style={[{ backgroundColor: UiColor.SKYBLUE },]}>
            <View style={[AppStyles.loginHeader, AppStyles.alignItems]}>
              <Image
                resizeMode="contain"
                style={[AppStyles.loginAppIcon]}
                source={require('./../../asssets/app-icon.png')}
              />
              <Title style={[AppStyles.signInToStyle]}>Sign In to</Title>
              <Title style={[AppStyles.signInToStyle]}>NewGenEducationApp</Title>
              {/* <Text style={[{ color: UiColor.WHITE, fontWeight: 'bold', textAlign: 'center' }, AppStyles.marginTop_2]}>
                Creating a community for the Institutes where learners gain a passport to the world
              </Text> */}
            </View>

            <View style={AppStyles.loginContainer}>
              <View style={AppStyles.margin}>
                <InputText
                  //  tooltipReq={true}
                  //  required={true}
                  //  tooltipMsg={'Please enter Email/Mobile No.'}
                  fieldID={'field1'}
                  label={'Email/Mobile No.'}
                  secureTextEntry={false}
                  onChangeText={text =>{ 
                    dataModel.userID = text
                  this.setState({ dataModel:dataModel })
                  // Validator.functions.emailNumberValidator(text)
                 }}
                  value={dataModel.userID}
                  // errorMessage={GeneralUtils.functions.getErrorMessage('field1',dataModel.userID,errorField,'requiredWithData','FE-VAL-039','The value is not a valid email/mobile number')}
                  errorMessage={GeneralUtils.functions.getErrorMessage('field1',dataModel.userID,errorField,['emailandNumber'],'Email/Mobile No.')}
                />
                {/* fieldID, fieldValue, errorField, Validationtype,errorCode */}
                <View style={AppStyles.marginTop_3}>
                  <InputText
                    fieldID={'field2'}
                    label={'Password'}
                    label2={'Forgot Password ?'}
                    secureTextEntry={true}
                    onChangeText={text =>{ 
                      dataModel.password = text
                    this.setState({ dataModel:dataModel })
                   }}
                    value={dataModel.password}
                    lable2OnPress={() => this.props.navigation.navigate("ForgotPassword")}
                    // errorMessage={GeneralUtils.functions.getErrorMessage('field2',dataModel.password,errorField,'required','FE-VAL-040','')}
                    errorMessage={GeneralUtils.functions.getErrorMessage('field2',dataModel.password,errorField,[],'Password')}

                  />
                </View>
                <View style={[AppStyles.marginTop_2, AppStyles.policyContainer]}>
                  <Text style={AppStyles.policyTextStyle}>By clicking Sign In, you agree to our <Text style={AppStyles.policyTextLinkStyle} onPress={() => Linking.openURL(link.terms_conditionLink)} >Terms of Use Policy</Text>. Learn how we collect, use and share your data in our <Text style={AppStyles.policyTextLinkStyle} onPress={() => Linking.openURL(link.policyLink)} >Privacy Policy</Text> and how we use cookies and similar technology in our <Text style={AppStyles.policyTextLinkStyle} onPress={() => Linking.openURL(link.cookieLink)} >Cookie Policy</Text>. You may receive SMS/Email/Push notifications from us and can opt out at any time by contacting Institute.</Text>
                </View>
              </View>

              <View style={AppStyles.alignItems}>
                <CustomButtons
                  onPress={() => this.validation()}
                  title="Sign In"
                  titleStyle={AppStyles.signInTextStyle}
                  containerStyle={AppStyles.signInContainer}
                  buttonStyle={{ backgroundColor: UiColor.SKYBLUE }}
                />
              </View>

              <View style={[AppStyles.alignItems, AppStyles.marginVertical_5]}>
                <View style={AppStyles.flexDirectionRow}>
                  <Text style={AppStyles.aboutText} onPress={() => Linking.openURL(link.aboutLink)}>About</Text>
                  <Text style={AppStyles.supportText} onPress={() => Linking.openURL(link.supportLink)}>Support</Text>
                </View>
                <View style={AppStyles.marginTop_1}>
                  <Text style={{ color: UiColor.DRAK_GRAY_COLOR }} >©2021 IBD Technologies</Text>
                </View>
              </View>
            </View>
          </View>





        </ScrollView>
        <AlertBox
          stateObject={this}
        />

        {isLoading &&
          <Spinner loading={isLoading} />
        }
      </SafeAreaView>
    );
  }
}


export default Login;