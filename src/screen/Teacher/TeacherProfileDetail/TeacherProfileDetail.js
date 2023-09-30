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



import React from "react";
import { View, Text, Platform, Image, ScrollView } from "react-native";
import { w, h } from "../../../utils/Dimensions";
import AppHeader from "../../../components/AppHeader";
import { Provider, Portal, Card, Title, Divider } from 'react-native-paper';
import ScreenLoad from "../../../utils/ScreenLoad";
import ProfileDetail from "./ProfileDetail";
import AlertBox from '../../../components/AlertBox';
import Spinner from '../../../components/Loader';
import AppStyles from "../../../AppStyles/AppStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import apiCall from "../../../ApiCall/ActionApi";
import axios from 'axios';
import cloneDeep from 'lodash/cloneDeep';
import { Avatar } from 'react-native-elements';
import TabScreen from '../../../components/TabScreen';
import CustomTabScreen from '../../../components/CustomTabScreen';
import TeacherGenralDetail from './TeacherGenralDetail';
import TeacherAddressDetail from './TeacherAddressDetail';
import TeacherFamilyDetail from './TeacherFamilyDetail';
import TeacherOtherDetail from './TeacherOtherDetail';
import TeacherNotesDetail from './TeacherNotesDetail';
import { httpUtils } from '../../../utils/HttpUtils';
import SelectListUtils from '../../../utils/SelectListUtils'
import { UiColor } from '../../../theme';








class TeacherProfileDetail extends React.Component {
  // static onEnter() { 
  //   const c = Actions.refs.TeacherProfileDetail; c.setMount(false); }

  //   static onExit() { 
  //     const c = Actions.refs.TeacherProfileDetail; c.setUnmount(true); }
  constructor(props) {
    super(props);
    this.state = {
      // stepper state configuration
      currentStep: 0,
      currentOperation: 'ProfileDetail',
      heading: 'Teacher Profile',
      stepsLabels: [],
      headingData: {},
      //  family detail paggination state configuration
      familyDetailSelectedIndex: 1,
      familyEmptyrecord: null,
      // audit detail data model
      auditDataModel: null,

      emptyAuditDataModel: null,

      // teacher detail data model
      dataModel: null
      ,
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
      primaryKeyCols: ['teacherID'],

      // alert state configuration
      errorType: "",
      error: [{ errorCode: '', errorMessage: '', errorParam: '' }],
      showAlert: false,

      serviceName: 'TeacherProfile',
      serviceType: 'Teacher',
      summaryService: 'TeacherProfileSummary',
      summaryServiceType: 'TeacherSummaryEntity',
      // loading state ----
      isLoading: false,

      //remarks state ----
      remarks: '',

      // header orientation
      orientationValue: false,

      // profile state configuration
      nekot: '',
      ivas: '',
      uhtuliak: '',
      unMount: false,

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
      auditDataModel: null,
      emptyAuditDataModel: null,
      familyEmptyrecord: null,
    })
    ScreenLoad.functions.unLoad()
    //console.log(apiCall.functions.cancelToken,"apiCall.functions.cancelToken")
    apiCall.functions.cancelToken.cancel('Api is being canceled');
  }

  async setMount(unMount) {

    apiCall.functions.cancelToken = axios.CancelToken.source()
    const { currentOperation, heading, serviceName, } = this.state
    ScreenLoad.functions.onLoad(heading, serviceName, currentOperation)

    // emptyDataModel empty record
    var emptyDataModel = {
      teacherName: '',
      teacherID: "",
      profileImgPath: "",
      userType: "",
      general: {
        qualification: "",
        class: "",
        gender: "",
        dob: "",
        contactNo: "",
        emailID: "",
        shortName: "",
        bloodGroup: "",
        address: {
          addressLine1: "",
          addressLine2: "",
          addressLine3: "",
          addressLine4: "",
          addressLine5: ""

        }
      },
      emergency: {
        existingMedicalDetails: "",
        contactPerson: [{
          idx: '',
          cp_Name: "",
          cp_relationship: "",
          cp_occupation: "",
          cp_emailID: "",
          cp_contactNo: "",
          cp_imgPath: ""
        }]
      },
      teacherNotes: [
        {
          date: "",
          notes: "",
        }
      ]

    }



    // emptyAuditDataModel empty record
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

    // emptyAuditDataModel empty record
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

    //  familyEmptyrecord detail paggination empty record

    var familyEmptyrecord = {
      idx: '',
      cp_Name: "",
      cp_relationship: "",
      cp_occupation: "",
      cp_emailID: "",
      cp_contactNo: "",
      cp_imgPath: ""
    }






    var dummyDataModel = cloneDeep(emptyDataModel)
    var dummyAuditDataModel = cloneDeep(emptyAuditDataModel)

    var globalData = JSON.parse(await AsyncStorage.getItem('GLOBAL'))
    var apiObject = {}

    if (globalData != null) {
      dummyDataModel.teacherID = globalData.staffID
      this.setState({
        unMount: unMount,
        dataModel: dummyDataModel,
        emptyDataModel: emptyDataModel,
        auditDataModel: dummyAuditDataModel,
        emptyAuditDataModel: emptyAuditDataModel,
        familyEmptyrecord: familyEmptyrecord,
        familyDetailSelectedIndex: 1,
        currentOperation: 'ProfileDetail',
        userType: globalData.userType,
        nekot: `${globalData.userID}~${globalData.instituteID}`,
        ivas: globalData.token1,
        uhtuliak: globalData.token0
      }, () => {
        apiCall.functions.apiCallRequired = true
        apiObject = {
          // start SHA2711
          // homeInstituteID:globalData.homeInstituteID,
          // end SHA2711
          serviceName: this.state.serviceName,
          serviceType: this.state.serviceType,
          datamodel: this.state.dataModel,
          operation: 'View',
          businessEntity: [{ entityName: 'teacherID', entityValue: globalData.staffID, entityName: 'hID', entityValue: globalData.homeInstituteID }],
          audit: this.state.auditDataModel
        }
        apiCall.functions.callApi(apiObject, null, this.parentStateChange)
      })
    }
  }






  parentStateChange(object) {
    this.setState(
      object
    );

  }

  renderSwitch() {
    return ProfileDetail.functions.ProfileDetailConfig(this)
  }

  getImagePath() {
    const { dataModel, nekot,
      ivas,
      uhtuliak } = this.state


    if (typeof dataModel.profileImgPath == 'string' && dataModel.profileImgPath.includes('CohesiveUpload')) {
      return { uri: `${httpUtils.FILE_URL()}${dataModel.profileImgPath}?ivas=${ivas}&nekot=${nekot}&uhtuliak=${uhtuliak}` }
    }
    else if (typeof dataModel.profileImgPath == 'string' && dataModel.profileImgPath.includes('objectstorage')) {
      return { uri: dataModel.profileImgPath }
    }
    else {
      return httpUtils.DEFAULT_IMAGE_FILE_PATH()
    }

  }



  render() {
    const {
      currentOperation,
      isLoading,
      unMount,
      dataModel
    } = this.state
    return (unMount == false && dataModel != null) ? (
      // return (
      <Provider>
        <AppHeader
          stateObject={this}
        />
        <View style={AppStyles.subScreenContainer}>
          <ScrollView bounces showsVerticalScrollIndicator={false}>
            <View style={AppStyles.flex_one}>

              <Card style={AppStyles.margin_2}>
                <Card.Content>
                  <View>
                    <View style={[AppStyles.alignItems, AppStyles.marginTop_2]}>
                      <Avatar
                        size={AppStyles.profileAvatarSize.height}
                        rounded
                        source={this.getImagePath()}
                      />
                      <Title>{dataModel.teacherName}</Title>
                      <View style={[AppStyles.alignItems]}>
                        <Text style={[AppStyles.marginLeft_1,AppStyles.textColor]}>{SelectListUtils.functions.getSelectedValue(SelectListUtils.functions.selectMaster.StaffTypeMaster, dataModel.general.userType)} ({dataModel.teacherID})</Text>
                        {/* <Text style={[AppStyles.marginLeft_1, { color: UiColor.LIGHT_TEXT_COLOR }]}>{dataModel.general.emailID}</Text> */}
                      </View>
                    </View>
                  </View>


                </Card.Content>
                {/* <CustomTabScreen
                  tabHeading={['General', 'Family',]}
                  otherTabHeading={['Address', 'Others', 'Notes']}
                  stateObject={this}
                  stateValue={'selectedTabIndex'}
                  selectedStateValue={this.state.selectedTabIndex}
                  barColor={UiColor.WHITE}
                /> */}
                <TabScreen
                  tabHeading={['General', 'Family', 'Notes']}
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

export default TeacherProfileDetail;
