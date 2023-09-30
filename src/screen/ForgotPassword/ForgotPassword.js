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




// import React, { useState, useEffect } from "react";
import React, { Component } from "react";
import {
  View,
  Image, SafeAreaView, ScrollView
} from "react-native";
import { httpUtils } from '../../utils/HttpUtils';
import { w, h, } from "../../utils/Dimensions";
import { Subheading, Text, Title, } from 'react-native-paper';
import { UiColor } from "../../theme";
import AlertBox from '../../components/AlertBox';
import Spinner from '../../components/Loader';
import AppStyles from "../../AppStyles/AppStyles";
import Exception from '../../utils/Exception'
import axios from "axios";
import InputText from '../../components/InputText';
import { Button } from 'react-native-elements';










// var text = "Enter your email address or Mobile Number that you used to login. We'll send you an OTP to authenticate reseting password"

var text = "Enter your email/mobile no. to reset your password. We'll send you an OTP to authenticate reseting password"
var apiError = false

// var header = {}

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataModel: {
        mobile: "",
        newPwd: "",
        newConfirmPwd: "",
        OTP: "",
      },
      operation: 'ValidateMobile',
      currentElemnet: 1,
      // currentElemnet: 4,
      instruction: text,
      error: [{ errorCode: '', errorMessage: '', errorParam: '' }],
      errorType: "",
      isLoading: false,
      token: '',
      showAlert: false
    }
    this.onChange = this.onChange.bind(this)
    this.fnHitBackend = this.fnHitBackend.bind(this)
    this.parentStateChange = this.parentStateChange.bind(this)
    this.resendBtn = this.resendBtn.bind(this)
  }



  fnHitBackend = async (stateObject) => {
    // fn_show_spinner();
    try {
      const { dataModel, operation, token, currentElemnet } = this.state
      //  const {stateObject} = this
      var businessEntity = [{
        entityName: "mobile",
        entityValue: dataModel.mobile
      }]
      var header = {
        msgID: "",
        source: 'NewGenEducationMobile',
        service: 'ChangePwd',
        operation: operation,
        businessEntity: businessEntity,
        status: "",
        key: "",
        instituteID: '',
        userID: dataModel.mobile,
        token: token,

      }
      var request = {
        header: header,
        body: dataModel,
        error: null,
        audit: null,
      }


      //console.log(request,"api request")
      stateObject.parentStateChange({
        isLoading: true,
      })

      await axios({
        method: "put",
        url: httpUtils.getURL('Institute', 'ChangePwd'),
        data: request,
      })
        .then(response => {
          //console.log(response,"response of forgot pasword")
          stateObject.parentStateChange({
            isLoading: false,
          })

          if (response.data.header.status == 'success') {
            apiError = false
          }
          else {
            Exception.functions.showBackendError(stateObject, response.data.error)
            apiError = true
          }
        })
        .catch(function (error) {
          //console.log(error,"error new")
          stateObject.parentStateChange({
            isLoading: false,
          })
          var res = {
            status: 'error',
            error: [{
              errorCode: error.response.status,
              errorMessage: error.response.data.replace(/(<([^>]+)>)/ig, '')
            }]
          }
          Exception.functions.showBackendError(stateObject, res.error)
          apiError = true

        });

      return true

    }
    catch (err) {
      apiError = true
      stateObject.parentStateChange({
        isLoading: false,
      })
      Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-072', errorMessage: '', errorParam: "" }])
      return true
    }
  }




  async onChange() {
    const { currentElemnet, dataModel } = this.state
    switch (currentElemnet) {
      case 1:
        // start NEAI-173
        if (dataModel.mobile == "") {
          Exception.functions.showFrontendError(this.parentStateChange, [{ errorCode: 'FE-VAL-001', errorMessage: '', errorParam: ['Email/Mobile No'] }])
          return false;
        }
        // end NEAI-173
        await this.fnHitBackend(this)
        if (!apiError) {
          this.setState({
            currentElemnet: currentElemnet + 1,
            instruction: 'If we have an account for the Mobile Number/email you provided, we have sent a OTP to reset your password. Please enter the OTP and press submit',
            operation: 'ValidateOTP',
          })
        }
        break
      case 2:
        // start NEAI-173
        if (dataModel.OTP == "") {
          Exception.functions.showFrontendError(this.parentStateChange, [{ errorCode: 'FE-VAL-001', errorMessage: '', errorParam: ['OTP'] }])
          return false;
        }
        // end NEAI-173
        await this.fnHitBackend(this)
        if (!apiError) {
          this.setState({
            currentElemnet: currentElemnet + 1,
            instruction: 'Please enter new password and press submit',
            operation: 'ChangePwd',
          })
        }
        break
      case 3:
        // start NEAI-173
        if (dataModel.newPwd == "") {
          Exception.functions.showFrontendError(this.parentStateChange, [{ errorCode: 'FE-VAL-001', errorMessage: '', errorParam: ['new password'] }])
          return false;
        }
        if (dataModel.newConfirmPwd == "") {
          Exception.functions.showFrontendError(this.parentStateChange, [{ errorCode: 'FE-VAL-073', errorMessage: '', errorParam: ['new password'] }])
          return false;
        }
        // end NEAI-173
        await this.fnHitBackend(this)
        if (!apiError) {
          this.setState({
            currentElemnet: currentElemnet + 1,
            instruction: 'Password is changed, Please Sign In again'

          })
        }
        break
      // case 4:
      //   this.setState({
      //     instruction: 'Password is changed, Please login again'
      //   })
      //   break

    }
  }
  resendBtn() {
    this.setState({
      operation: 'ValidateMobile',
    }, () => {
      this.fnHitBackend(this)
    })
  }



  goToLogin() {
    this.setState({
      currentElemnet: 1
    })
    // Actions.Login()
    this.props.navigation.navigate('Login')
  }



  parentStateChange(object) {
    this.setState(
      object
    );
  }




  render() {
    const { isLoading, instruction, currentElemnet, dataModel } = this.state
    return (
      <SafeAreaView style={AppStyles.loginMainContainer}>

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
          <View style={[AppStyles.loginContainer]}>
            <View style={[AppStyles.margin]}>
              <View style={AppStyles.alignItems}>
                {currentElemnet != 4 && <Title>Forgot Password ?</Title>}
                {currentElemnet == 4 && <View style={AppStyles.forgotImgcontainer}>
                  <Image
                    style={{ tintColor: UiColor.SUCCESS_COLOR }}
                    source={require('./../../asssets/icons/check.png')}
                  />
                </View>}

                <Text style={{ color: UiColor.LIGHT_TEXT_COLOR, textAlign: 'center' }}>{this.state.instruction}</Text>
              </View>

              {currentElemnet == 1 ? <View style={AppStyles.marginTop_3}>
                <InputText
                  label={'Email/Mobile No.'}
                  secureTextEntry={false}
                  onChangeText={text => {
                    dataModel.mobile = text;
                    this.setState({ dataModel: dataModel })
                  }}
                  value={dataModel.mobile}

                />
              </View> : null}
              {currentElemnet == 2 ? <View style={AppStyles.marginTop_3}>
                <InputText
                  label={'Enter OTP sent'}
                  secureTextEntry={false}
                  onChangeText={text => {
                    dataModel.OTP = text;
                    this.setState({ dataModel: dataModel })
                  }}
                  value={dataModel.OTP}

                />
              </View> : null}

              {currentElemnet == 3 ? <View>
                <View style={AppStyles.marginTop_3}>
                  <InputText
                    label={'Enter new password'}
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
                    label={'Reenter new password'}
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

                {currentElemnet == 2 ? <Button
                  onPress={this.resendBtn}
                  title={'Resend'}
                  titleStyle={AppStyles.signInTextStyle}
                  containerStyle={AppStyles.signInContainer}
                  buttonStyle={AppStyles.commonButtonStyle}
                /> : null}
                <View style={AppStyles.marginLeft_2}>
                  <Button

                    onPress={currentElemnet == 4 ? () => this.goToLogin() : this.onChange}
                    title={currentElemnet != 4 ? 'Submit' : 'Ok, got it!'}
                    titleStyle={AppStyles.signInTextStyle}
                    containerStyle={AppStyles.signInContainer}
                    buttonStyle={AppStyles.commonButtonStyle}
                  />
                </View>
                {currentElemnet == 1 ? <View style={AppStyles.marginLeft_2}>
                  <Button
                    onPress={() => this.props.navigation.navigate('Login')}
                    title="Cancel"
                    titleStyle={AppStyles.signInTextStyle}
                    containerStyle={AppStyles.signInContainer}
                    buttonStyle={AppStyles.commonButtonStyle}
                  />
                </View> : null}

              </View>
            </View>

            <View style={[AppStyles.alignItems,AppStyles.marginVertical_5]}>
              {/*<View style={AppStyles.flexDirectionRow}>
                <Text style={AppStyles.aboutText}>About</Text>
                <Text style={AppStyles.supportText}>Support</Text>
                </View>*/}
              <View style={AppStyles.marginTop_1}>
                <Text style={{ color: UiColor.SKYBLUE }} onPress={() => this.props.navigation.navigate('Login')} >Back to Login</Text>
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
      </SafeAreaView>
    );
  }
}


export default ForgotPassword;