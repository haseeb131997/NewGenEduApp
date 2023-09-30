
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

import React from "react";
import { View, Text, Platform } from "react-native";
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { w, h } from "../../../utils/Dimensions";
import AppHeader from "../../../components/AppHeader";
import { Provider, Portal, Card, Title } from 'react-native-paper';
import ScreenLoad from "../../../utils/ScreenLoad";
import ProfileDetail from "./ProfileDetail";
import AlertBox from '../../../components/AlertBox';
import Spinner from '../../../components/Loader';
import AppStyles from "../../../AppStyles/AppStyles";
import apiCall from "../../../ApiCall/ActionApi";
import axios from 'axios';
import cloneDeep from 'lodash/cloneDeep';
import { httpUtils } from '../../../utils/HttpUtils';
import { Avatar } from 'react-native-elements';
import { UiColor } from '../../../theme';
import SelectListUtils from '../../../utils/SelectListUtils'
import TabScreen from '../../../components/TabScreen';









class UserProfileDetail extends React.Component {
  // static onEnter() { 
  //   const c = Actions.refs.UserProfileDetail; c.setMount(false); }

  //   static onExit() { 
  //     const c = Actions.refs.UserProfileDetail; c.setUnmount(true); }
  constructor(props) {
    super(props);
    this.state = {
      // stepper state configuration
      currentStep: 0,
      currentOperation: 'Default',
      heading: 'User Profile',
      stepsLabels: [],
      headingData: {},
      //  parent detail paggination state configuration
      parentSelectedIndex: 1,
      parentEmptyrecord: null,


      // audit detail data model
      auditDataModel: null,

      emptyAuditDataModel: null,

      // st detail data model
      dataModel: null,

      emptyDataModel: null,
      editable: false,
      primaryKeyEditable: false,
      // tab state configuration
      selectedTabIndex: 0,

      // search state configuration
      seachVisible: false,
      searchFieldName: '',
      searchText: '',
      searchIsLoading: false,
      // summaryResult state configuration
      summaryResult: [],
      // SummaryResultselectedrecord:'',
      primaryKeyCols: ['userID'],

      // alert state configuration
      errorType: "",
      error: [{ errorCode: '', errorMessage: '', errorParam: '' }],
      showAlert: false,

      serviceName: 'UserProfile',
      serviceType: 'User',
      summaryService: 'UserProfileSummary',
      summaryServiceType: 'UserSummaryEntity',
      // loading state ----
      isLoading: false,

      //remarks state ----
      remarks: '',
      // header orientation
      orientationValue: false,
      unMount: false,
      // img confg
      nekot: '',
      ivas: '',
      uhtuliak: '',
      profileImgPath: '',
      activeSlideIndex: 0

    };
    this.parentStateChange = this.parentStateChange.bind(this)
    this.setUnmount = this.setUnmount.bind(this)
    this.setMount = this.setMount.bind(this)
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
      dataModel: null,
      emptyDataModel: null,
      summaryDataModel: null,
      emptySummaryDataModel: null,
      auditDataModel: null,
      emptyAuditDataModel: null,
      parentEmptyrecord: null,


    })
    ScreenLoad.functions.unLoad()
    //console.log(apiCall.functions.cancelToken,"apiCall.functions.cancelToken")
    apiCall.functions.cancelToken.cancel('Api is being canceled');
  }


  async setMount(unMount) {
    var apiObject = {}
    const { currentOperation, heading, serviceName } = this.state
    ScreenLoad.functions.onLoad(heading, serviceName, currentOperation)
    apiCall.functions.cancelToken = axios.CancelToken.source()
    var emptyDataModel = {
      userName: "",
      userID: "",
      instituteName: "",
      instituteID: "",
      emailID: "",
      mobileNo: "",
      password: "",
      expiryDate: "",
      userType: "",
      teacherID: "",
      teacherName: "",
      studentID: "",
      studentName: "",
      status: "",
      parentRoleMapping: [{
        roleID: "",
        studentName: "",
        studentID: "",
        instituteName: "",
        instituteID: "",
        idx: ""
      }],
      studentClassRoleMapping: [{
        idx: "",
        roleID: "",
        class: "",
        instituteName: "",
        instituteID: ""
      }],
      teacherRoleMapping: [{
        idx: "",
        roleID: "",
        instituteID: "",
        instituteName: "",
        teacherID: "",
        teacherName: ""
      }],
      instituteRoleMapping: [{
        idx: "",
        roleID: "",
        instituteID: "",
        instituteName: ""
      }]
    }



    var emptyAuditDataModel = {
      MakerID: "",
      AuthStat: "",
      MakerRemarks: "",
      CheckerRemarks: "",
      MakerDtStamp: "",
      CheckerDtStamp: "",
      CheckerID: "",
      Version: "",
      RecordStat: "Open"
    }

    //  parent detail paggination state configuration

    var parentEmptyrecord = {
      roleID: "",
      studentName: "",
      studentID: "",
      instituteName: "",
      instituteID: "",
      idx: ""
    }



    var dummyDataModel = cloneDeep(emptyDataModel)
    var dummyAuditDataModel = cloneDeep(emptyAuditDataModel)

    var globalData = JSON.parse(await AsyncStorage.getItem('GLOBAL'));
    console.log(globalData, "globalData")
    if (globalData != null) {
      dummyDataModel.userID = globalData.userID
      this.setState({
        unMount: unMount,
        dataModel: dummyDataModel,
        emptyDataModel: emptyDataModel,
        auditDataModel: dummyAuditDataModel,
        emptyAuditDataModel: emptyAuditDataModel,
        parentEmptyrecord: parentEmptyrecord,
        currentStep: 0,
        parentSelectedIndex: 1,
        classSelectedIndex: 1,
        teacherSelectedIndex: 1,
        instituteSelectedIndex: 1,
        currentOperation: 'Default',

        nekot: `${globalData.userID}~${globalData.instituteID}`,
        ivas: globalData.token1,
        uhtuliak: globalData.token0,
        profileImgPath: globalData.profileImagePath,


      }, () => {
        apiCall.functions.apiCallRequired = true
        apiObject = {
          serviceName: this.state.serviceName,
          serviceType: this.state.serviceType,
          datamodel: this.state.dataModel,
          operation: 'View',
          businessEntity: [{ entityName: 'userID', entityValue: globalData.userID }],
          audit: this.state.auditDataModel
        }
        apiCall.functions.callApi(apiObject, null, this.parentStateChange)
      })
    }
  }


  getImagePath() {
    const { dataModel, nekot,
      ivas,
      uhtuliak, profileImgPath } = this.state


    if (typeof profileImgPath == 'string' && profileImgPath.includes('CohesiveUpload')) {
      return { uri: `${httpUtils.FILE_URL()}${profileImgPath}?ivas=${ivas}&nekot=${nekot}&uhtuliak=${uhtuliak}` }
    }
    else if (typeof profileImgPath == 'string' && profileImgPath.includes('objectstorage')) {
      return { uri: profileImgPath }
    }
    else {
      return httpUtils.DEFAULT_IMAGE_FILE_PATH()
    }
    // return httpUtils.DEFAULT_IMAGE_FILE_PATH()

  }






  parentStateChange(object) {
    this.setState(
      object
    );

  }

  renderSwitch() {
    return ProfileDetail.functions.ProfileDetailConfig(this)
  }



  render() {
    const {
      currentOperation,
      isLoading,
      dataModel,
      unMount
    } = this.state
    console.log(dataModel, "dataModel")

    return (unMount == false && dataModel != null) ? (
      // return  (
      <Provider>

        <View style={AppStyles.subScreenContainer}>
          <AppHeader
            stateObject={this}
          />
          <ScrollView bounces showsVerticalScrollIndicator={false}>
            <View style={AppStyles.flex_one}>

              <Card style={AppStyles.margin_2}>
                <Card.Content >
                  <View >
                    <View style={AppStyles.alignItems}>
                      <Avatar
                        size={AppStyles.profileAvatarSize.height}
                        rounded
                        source={this.getImagePath()}
                      />
                      <Title>{dataModel.userName}</Title>
                      <View style={[AppStyles.alignItems]}>
                        <Text style={[AppStyles.marginLeft_1, { color: UiColor.LIGHT_TEXT_COLOR }]}>{SelectListUtils.functions.getSelectedValue(SelectListUtils.functions.selectMaster.UserTypeMaster, dataModel.userType)} ({dataModel.userID})</Text>
                      </View>
                    </View>
                  </View>
                  {/* 
            {this.renderSwitch(currentOperation)} */}
                </Card.Content>
                <TabScreen
                  tabHeading={['General', 'Children']}
                  stateObject={this}
                  stateValue={'selectedTabIndex'}
                  selectedStateValue={this.state.selectedTabIndex}
                  barColor={UiColor.WHITE}
                />
              </Card>
              <Card style={[AppStyles.marginRight_2, AppStyles.marginLeft_2, AppStyles.marginBottom_2]}>
                <Card.Content>
                  {this.renderSwitch(currentOperation)}
                </Card.Content>
              </Card>
            </View>
          </ScrollView>
          <AlertBox
            stateObject={this}
          />

          {isLoading &&
            <Spinner loading={isLoading} />
          }
        </View>
      </Provider>
    ) : null
  }
}

export default UserProfileDetail;
