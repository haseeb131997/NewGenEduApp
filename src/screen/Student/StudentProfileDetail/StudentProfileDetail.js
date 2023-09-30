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
import { w, h } from "../../../utils/Dimensions";
import  AppHeader  from "../../../components/AppHeader";
import { Provider, Portal, Card,Title } from 'react-native-paper';
import ScreenLoad from "../../../utils/ScreenLoad";
import ProfileDetail from "./ProfileDetail";
import AlertBox from '../../../components/AlertBox';
import Spinner from '../../../components/Loader';
import AppStyles from "../../../AppStyles/AppStyles";
import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from 'axios';
import cloneDeep from 'lodash/cloneDeep';
import apiCall from "../../../ApiCall/ActionApi";
import moment from "moment";
import { Avatar } from 'react-native-elements';
import { UiColor } from '../../../theme';
import { httpUtils } from '../../../utils/HttpUtils';
import SelectListUtils from '../../../utils/SelectListUtils'
import CustomTabScreen from '../../../components/CustomTabScreen';



class StudentProfileDetail extends React.Component {
  // static onEnter() { 
  //   const c = Actions.refs.StudentProfileDetail; c.setMount(false); }

  //   static onExit() { 
  //     const c = Actions.refs.StudentProfileDetail; c.setUnmount(true); }
  constructor(props) {
    super(props);
    this.state = {
      // stepper state configuration
      currentStep: 0,
      currentOperation: 'ProfileDetail',
      heading: 'Student Profile',
      stepsLabels: [],
      headingData: {},
      //  family detail paggination state configuration
      familyDetailSelectedIndex: 1,
      familyEmptyrecord: null,
       // student note state configuration
       studentNoteEmptyrecord: null,
      // audit detail data model
      auditDataModel:null,

      // emptyAuditDataModel:null, 

      // student detail data model
      dataModel: null,
      emptyDataModel:null,

      // emptyDataModel: null,
      editable: false,
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
      primaryKeyCols: ['studentID'],

      // alert state configuration
      errorType: "",
      error: [{ errorCode: '', errorMessage: '', errorParam: '' }],
      showAlert: false,

      serviceName: 'StudentProfile',
      serviceType: 'Student',
      // summaryService: 'StudentProfileSummary',
      // summaryServiceType: 'StudentSummaryEntity',
      // loading state ----
      isLoading: false,

      //remarks state ----
      remarks: '',

      // header orientation
      orientationValue: false,
      userType: '',
      // profile state configuration
      nekot: '',
      ivas: '',
      uhtuliak: '',
      unMount:false,

      activeSlideIndex:0,
      classActiveSlideIndex:0





    };
    this.parentStateChange = this.parentStateChange.bind(this)
    // this.mandatoryCheck = this.mandatoryCheck.bind(this)
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




  setUnmount (unMount){
    this.setState({
      unMount:unMount,
      dataModel:null,
      emptyDataModel:null,
      auditDataModel:null,
      emptyAuditDataModel:null,
      familyEmptyrecord:null,
      studentNoteEmptyrecord:null
    })
    ScreenLoad.functions.unLoad()
    apiCall.functions.cancelToken.cancel('Api is being canceled');
  }

  async setMount (unMount){
    apiCall.functions.cancelToken =  axios.CancelToken.source()
    const { currentOperation, heading, serviceName, } = this.state
    ScreenLoad.functions.onLoad(heading, serviceName, currentOperation)
    var emptyDataModel = {
      studentName: "",
        studentID: "",
        profileImgPath: "",
        note: "",
        mobNo: '',
        email: '',
        classes: [
          {
            classId: "",
            classDesc: "",
            startDate: "",
            endDate: ""
          },
        ],
        general: {
          class: "",
          gender: "",
          dob: "",
          bloodGroup: "",
          nationalID: "",
          address: {
            addressLine1: "",
            addressLine2: "",
            addressLine3: "",
            addressLine4: "",
            addressLine5: ""
          }
        },
        emergency:
        {
          existingMedicalDetails: ""
        },
        family: [
          {
            memberName: "",
            memberID: "",
            memberRelationship: "",
            memberOccupation: "",
            memberEmailID: "",
            memberContactNo: "",
            notificationRequired: false,
            language: "E",
            memberImgPath: ''
          }
        ],
        studentNotes:[
          {
            date: "",
            notes: "",
            check:false
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

      //  familyEmptyrecord detail paggination empty record
   
      var familyEmptyrecord = {
        memberName: "",
        memberID: "",
        memberRelationship: "",
        memberOccupation: "",
        memberEmailID: "",
        memberContactNo: "",
        notificationRequired: false,
        language: "E",
        memberImgPath: require("../../../asssets/icons/ic_profile.jpg")
      }

      //  student detail  empty record
   
      var studentNoteEmptyrecord = {
        date: moment(new Date).format('DD-MM-YYYY'),
        notes: "",
        check:false
  }

   

   
    var dummyDataModel =   cloneDeep(emptyDataModel)
    var dummyAuditDataModel =   cloneDeep(emptyAuditDataModel)
  
    var globalData = JSON.parse(await AsyncStorage.getItem('GLOBAL'))
    var apiObject = {}

    if(globalData != null){
      dummyDataModel.studentID = globalData.studentID
    this.setState({
      unMount:unMount,
      dataModel:dummyDataModel,
      emptyDataModel:emptyDataModel,
      auditDataModel:dummyAuditDataModel,
      emptyAuditDataModel:emptyAuditDataModel,
      familyEmptyrecord:familyEmptyrecord,
      studentNoteEmptyrecord:studentNoteEmptyrecord,
      familyDetailSelectedIndex:1,
      currentOperation: 'ProfileDetail',
      userType: globalData.userType,
      nekot:`${globalData.userID}~${globalData.instituteID}`,
      ivas: globalData.token1,
      uhtuliak:globalData.token0
    },()=>{
      apiCall.functions.apiCallRequired = true
      apiObject = {
        serviceName: this.state.serviceName,
        serviceType: this.state.serviceType,
        datamodel: this.state.dataModel,
        operation: 'View',
        businessEntity: [{entityName:'studentID', entityValue:globalData.studentID}],
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
    return ProfileDetail.functions.ProfileDetailStepConfig(this)
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
    return (unMount ==false && dataModel != null)? (
      <Provider>
      <AppHeader
        stateObject={this}
      />
      <View style={AppStyles.subScreenContainer}>
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
              <Title>{dataModel.studentName}</Title>
              <View style={[AppStyles.alignItems]}>
                <Text style={[AppStyles.marginLeft_1,AppStyles.textColor]}>{dataModel.studentID}</Text>
              </View>
            </View>
          </View>

          {/* {this.renderSwitch(currentOperation)} */}
        </Card.Content>

        <CustomTabScreen
      tabHeading={['General', 'Family',]}
      otherTabHeading={['Classes','Notes']}
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
    ): null;
  }
}

export default StudentProfileDetail;
