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
Change Desc: to set the dateswhitelist and datesBlacklist
Changed By : Shashank
Date:25-09-2021 
*/


/* * * Change Tag:NEW3.02
Change Desc: to set setMount and setUnMount  according to new navigation  and remove the onEnter and onExit
Changed By : Shashank
Date:17-09-2021 
*/

/* * * Change Tag:NEW3.05
Change Desc: show welcome massage instead of welcome alert
Changed By : Shashank
Date:26-09-2021 
*/



import React, { Component } from "react";
import {
  View,
  Image,
  ScrollView,
  TouchableOpacity, Platform, LayoutAnimation, UIManager,
} from "react-native";
import { UiColor } from "../../theme";
import { Portal, Provider, Card, Title, Caption, Text, Subheading, ActivityIndicator, Divider } from 'react-native-paper';
import { h, w } from "../../utils/Dimensions";
import AppHeader from "../../components/AppHeader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import apiCall from "../../ApiCall/ActionApi";
import Spinner from '../../components/Loader';
import AlertBox from '../../components/AlertBox';
import GeneralUtils from "../../utils/GeneralUtils";
import AppStyles from "../../AppStyles/AppStyles";
import TabScreen from '../../components/TabScreen';
import CustomTabScreen from '../../components/CustomTabScreen';
import moment from "moment";
import cloneDeep from 'lodash/cloneDeep';
import axios from "axios";
import Exception from '../../utils/Exception'
import Footer from '../../components/Footer';
import CustomCalendar from '../../components/CustomCalendar';
import CarouselPagination from '../../components/CarouselPagination';
import CustomDropDownPicker from '../../components/CustomDropDownPicker';
import CustomBarChart from '../../components/CustomBarChart';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CustomButtons from '../../components/CustomButtons';
import WelComeModal from '../../components/WelComeModal';
import CustomCarousel from '../../components/CustomCarousel';
import { ListItem } from 'react-native-elements';

import SelectListUtils from '../../utils/SelectListUtils'





var datesBlacklist = [];
var dateswhitelist = [];

var componentLoading = 'attendenceLoading'


var bgColor = [UiColor.LIGHT_SKYBLUE, UiColor.LIGHT_SUCCESS_COLOR, UiColor.LIGHT_ERROR_COLOR, UiColor.LIGHT_WARNING_COLOR]

class StudentDashboard extends Component {
  // static onEnter() {
  //   const c = Actions.refs.StudentDashboard;
  //   c.setMount(false);
  // }

  // static onExit() {
  //   const c = Actions.refs.StudentDashboard;
  //   c.setUnmount(true);
  // }
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      selectedTabIndex: 0,
      selectStudentIndex: 0,
      selectClassIndex: 0,
      selectSubjectIndex: 0,
      // selectedFeeIndex: 0,
      selectedFeeIndex: 0,
      dataModel: {
        userID: "",
        studentDetails: [{
          studentID: "",
          studentName: "",
          attendance: [{
            Class: "",
            classDesc: "",
            startDate: "",
            endDate: "",
            Attendance: [{
              year: "",
              month: "",
              attendanceDetails: [{
                no_OfDaysPresent: "",
                no_ofDaysAbsent: "",
                no_ofDaysLeave: "",
                workingDays: "",
                percentage: ""
              }]
            }]
          }],
          examDetails: [],
          weeklyCalender: [{
            date: moment(new Date).format('DD-MM-YYYY'),
            eventArray: [{
              eventType: "",
              key: "",
              eventAttributes: [
                {
                  attrName: "",
                  attrValue: ""
                },
                {
                  attrName: "",
                  attrValue: ""
                },
                {
                  attrName: "",
                  attrValue: ""
                }]
            }]
          }],
          feeDetails: [{
            feeId: "",
            feeDescription: "",
            Balance: "",
            feeAmount: "",
            dueDate: ""
          }]
        }]
      },

      // empty state configuration 
      emptyDataModel: {
        userID: "",
        studentDetails: [{
          studentID: "",
          studentName: "",
          attendance: [{
            Class: "",
            classDesc: "",
            startDate: "",
            endDate: "",
            Attendance: [{
              year: "",
              month: "",
              attendanceDetails: [{
                no_OfDaysPresent: "",
                no_ofDaysAbsent: "",
                no_ofDaysLeave: "",
                workingDays: "",
                percentage: ""
              }]
            }]
          }],
          examDetails: [],
          weeklyCalender: [{
            date: moment(new Date).format('DD-MM-YYYY'),
            eventArray: [{
              eventType: "",
              key: "",
              eventAttributes: [{
                attrName: "",
                attrValue: ""
              }]
            }]
          }],
          feeDetails: [{
            feeId: "",
            feeDescription: "",
            Balance: "",
            feeAmount: "",
            dueDate: "",
            status: ""
          }]
        }]
      },


      errorType: "",
      error: [{ errorCode: '', errorMessage: '', errorParam: '' }],

      userType: 'P',

      // loading state configuration
      isloading: false,
      attendenceLoading: false,
      feeLoading: false,
      calenderLoading: false,
      examLoading: false,
      dashBoardPaymentIsloading: false,
      numColumns: 2,
      orientationValue: false,
      showAlert: false,
      queData: [],
      unMount: false,

      serviceName: 'ParentDashBoard',

      payDataModel: null,
      paymentFeeId: '',
      open: false,
      value: 0,

      showWelcomeModal: false,

      selectedEventTabIndex: 0,
      select_Date: moment(),
      activeAttendanceSlideIndex: 0,
      activeExamSlideIndex: 0,

      // chart state config
      chartConfig: {
        backgroundGradientFrom: "#fff",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#fff",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        labelColor: (opacity = 0.5) => `rgba(235, 60, 100, ${opacity})`,
        useShadowColorFromDataset: false // optional
      }
    }
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    // this.orientation = this.orientation.bind(this)
    this.postApiResponse = this.postApiResponse.bind(this)
    this.parentStateChange = this.parentStateChange.bind(this)
    this.setUnmount = this.setUnmount = this.setUnmount.bind(this)
    this.setMount = this.setMount = this.setMount.bind(this)
    this.onClickPay = this.onClickPay.bind(this)
    this.selectEvent = this.selectEvent.bind(this)


  }



  // starts NEW3.02

  componentDidMount() {
    this.DashBoardCalling()
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
  // ends NEW3.02

  async setMount(unMount) {
    var userType = ''
    var globalData = JSON.parse(await AsyncStorage.getItem('GLOBAL'));
    if (globalData != null) {
      userType = globalData.userType
    }
    this.setState({
      userType: userType
    })
    if (GeneralUtils.functions.logOut) {
      GeneralUtils.functions.logOut = false
      this.setState({
        unMount: unMount,
      })
    }

    apiCall.functions.dashboardCancelToken = axios.CancelToken.source()
    if (GeneralUtils.functions.ChangeInstitute) {
      // SelectListUtils.functions.getSelectMaster()
      this.DashBoardCalling()
    }
  }





  setUnmount(unMount) {
    if (GeneralUtils.functions.logOut) {
      this.setState({
        unMount: unMount,
      })
      // apiCall.functions.dashboardCancelToken.cancel('DashBoard Api is being canceled');
    }
  }
  //  -----Load finction -----------


  // async UNSAFE_componentWillMount() {
  //   this.DashBoardCalling()
  // }

  DashBoardCalling = async () => {
    try {
      const { dataModel, emptyDataModel } = this.state
      var userId = ''
      var globalData = JSON.parse(await AsyncStorage.getItem('GLOBAL'));
      var DashboardModel = JSON.parse(await AsyncStorage.getItem('ParentDashboardModel'));
      //console.log(DashboardModel,"ParentDashboardModel")


      if (globalData != null) {
        userId = globalData.userID
      }

      var dummyDataModel = cloneDeep(dataModel)
      dummyDataModel.userID = userId
      var apiObject = {
        serviceName: 'ParentDashBoard',
        serviceType: 'Institute',
        datamodel: dummyDataModel,
        operation: 'View',
        businessEntity: [],
        audit: {}
      }

      var emptyDataModels = cloneDeep(emptyDataModel)
      /**
     |--------------------------------------------------
     | Dashboard api call
     |--------------------------------------------------
     */
      var tempDataModel
      var flag = true
      if (DashboardModel == null) {
        //  starts NEW3.05
        // Exception.functions.showFrontendError(this.parentStateChange, [{ errorCode: 'FE-VAL-049', errorMessage: '', errorParam: '' }])
        // ends NEW3.05
        this.setState({
          isloading: true,
          dataModel: emptyDataModels,
          // starts NEW3.05
          showWelcomeModal: true
          // ends NEW3.05
        })
        apiCall.functions.callApi(apiObject, this.postApiResponse, this.parentStateChange)
      }
      else {
        for (let i = 0; i < DashboardModel.length; i++) {
          if (globalData.userID == DashboardModel[i].userID && globalData.instituteID == DashboardModel[i].instituteID) {
            tempDataModel = DashboardModel[i].dataModel
            flag = false
            break
          }
        }
        if (flag) {
          //  starts NEW3.05
          // Exception.functions.showFrontendError(this.parentStateChange, [{ errorCode: 'FE-VAL-049', errorMessage: '', errorParam: '' }])
          //  end NEW3.05
          this.setState({
            isloading: true,
            dataModel: emptyDataModels,
            // starts NEW3.05
            showWelcomeModal: true
            // ends NEW3.05
          })
          apiCall.functions.callApi(apiObject, this.postApiResponse, this.parentStateChange)
        }
        else {
          this.setState({
            dataModel: tempDataModel,

          })
        }
      }
    }
    catch (err) {
      throw err
    }
    finally {
      GeneralUtils.functions.ChangeInstitute = false
    }
  }

  getbusinessEntityValue(value) {
    switch (value) {
      case 'attendenceLoading':
        return 'Attendance'

      case 'feeLoading':
        return 'Fee'

      case 'calenderLoading':
        return 'WeeklyCalendar'

      case 'examLoading':
        return 'Exam'

      default:
        return ''
    }
  }



  onClickRefreshBtn = async (loading) => {
    try {                                     // NEAI-229
      const { dataModel } = this.state
      var userId = ''
      var globalData = JSON.parse(await AsyncStorage.getItem('GLOBAL'));
      if (globalData != null) {
        userId = globalData.userID
      }
      var dummyDataModel = cloneDeep(dataModel)
      dummyDataModel.userID = userId
      var apiObject = {
        serviceName: 'ParentDashBoard',
        serviceType: 'Institute',
        datamodel: dummyDataModel,
        operation: 'View',
        businessEntity: [{
          entityName: 'dataRequest',
          entityValue: this.getbusinessEntityValue(loading)
        }],
        audit: {}
      }


      if (!this.state.isloading) {
        // start SHA01
        if (this.state.attendenceLoading || this.state.feeLoading || this.state.calenderLoading || this.state.examLoading) {
          Exception.functions.showFrontendError(this.parentStateChange, [{ errorCode: 'FE-VAL-059', errorMessage: '', errorParam: [this.getbusinessEntityValue(componentLoading)] }])
        }
        // end SHA01
        else {
          componentLoading = loading
          this.setState({
            [loading]: true
          })
          apiCall.functions.callApi(apiObject, this.postApiResponse, this.parentStateChange)
        }

      }
    }
    // start NEAI-229
    catch (err) {
      this.setState({
        [loading]: false
      })
    }
    // end NEAI-229
  }

  async resfreshDataModelStore(response) {
    var globalData = JSON.parse(await AsyncStorage.getItem('GLOBAL'));
    var DashboardModel = JSON.parse(await AsyncStorage.getItem('ParentDashboardModel'));
    for (let j = 0; j < DashboardModel.length; j++) {
      if (globalData.userID == DashboardModel[j].userID && globalData.instituteID == DashboardModel[j].instituteID) {
        DashboardModel[j].dataModel = response
        break
      }
    }
    try {
      await AsyncStorage.setItem('ParentDashboardModel', JSON.stringify(DashboardModel))
    } catch (error) {
      // Error saving data
    }
    // try {
    //   await AsyncStorage.setItem('ParentDashboardModel', JSON.stringify(dummyDataModel))
    // } catch (error) {
    //   // Error saving data
    // }
  }

  dashBoardDataModel = async function (response) {
    var value = response.header.businessEntity[0].entityValue
    var dummyDataModel = cloneDeep(this.state.dataModel)

    switch (value) {
      case "Attendance":
        var flag = true;
        var obj;
        var temp = [];
        for (let i = 0; i < response.body.studentDetails.length; i++) {
          flag = true;
          for (var loop = 0; loop < dummyDataModel.studentDetails.length; loop++) { //copy the data from response to dummyDataModel
            if (dummyDataModel.studentDetails[loop].studentID == response.body.studentDetails[i].studentID) {
              dummyDataModel.studentDetails[loop].attendance = response.body.studentDetails[i].attendance;
              flag = false;
              temp.push(response.body.studentDetails[i].studentID);
              break
            }
          }
          if (flag) { //add student if not in dummyDataModel
            obj = { studentID: "", studentName: "", attendance: [{ Class: "", classDesc: "", startDate: "", endDate: "", Attendance: [{ year: "", month: "", attendanceDetails: [{ no_OfDaysPresent: "", no_ofDaysAbsent: "", no_ofDaysLeave: "", workingDays: "", percentage: "" }] }] }], examDetails: [], weeklyCalender: [{ date: '', eventArray: [{ eventType: "", key: "", eventAttributes: [{ attrName: "", attrValue: "" }] }] }], feeDetails: [{ feeId: "", feeDescription: "", Balance: "", feeAmount: "", dueDate: "" }] };
            obj.studentID = response.body.studentDetails[i].studentID;
            obj.studentName = response.body.studentDetails[i].studentName;
            obj.attendance = response.body.studentDetails[i].attendance;
            dummyDataModel.studentDetails.push(obj);
            temp.push(response.body.studentDetails[i].studentID);
          }
        }

        //remove student if not in response
        if (temp.length != 0) {
          for (var loop = 0; loop < dummyDataModel.studentDetails.length; loop++) {
            if (!temp.includes(dummyDataModel.studentDetails[loop].studentID)) {
              dummyDataModel.studentDetails.splice(loop, 1);
            }
          }
        }

        this.setState({
          attendenceLoading: false,
          dataModel: dummyDataModel
        })
        this.resfreshDataModelStore(dummyDataModel)
        // try {
        //   await AsyncStorage.setItem('ParentDashboardModel', JSON.stringify(dummyDataModel))
        // } catch (error) {
        //   // Error saving data
        // }
        break
      case "Fee":
        var flag = true;
        var obj;
        var temp = [];
        for (let i = 0; i < response.body.studentDetails.length; i++) {
          flag = true;
          for (var loop = 0; loop < dummyDataModel.studentDetails.length; loop++) { //copy the data from response to dummyDataModel
            if (dummyDataModel.studentDetails[loop].studentID == response.body.studentDetails[i].studentID) {
              dummyDataModel.studentDetails[loop].feeDetails = response.body.studentDetails[i].feeDetails;
              flag = false;
              temp.push(response.body.studentDetails[i].studentID);
              break
            }
          }
          if (flag) { //add student if not in dummyDataModel
            obj = { studentID: "", studentName: "", attendance: [{ Class: "", classDesc: "", startDate: "", endDate: "", Attendance: [{ year: "", month: "", attendanceDetails: [{ no_OfDaysPresent: "", no_ofDaysAbsent: "", no_ofDaysLeave: "", workingDays: "", percentage: "" }] }] }], examDetails: [], weeklyCalender: [{ date: '', eventArray: [{ eventType: "", key: "", eventAttributes: [{ attrName: "", attrValue: "" }] }] }], feeDetails: [{ feeId: "", feeDescription: "", Balance: "", feeAmount: "", dueDate: "" }] };
            obj.studentID = response.body.studentDetails[i].studentID;
            obj.studentName = response.body.studentDetails[i].studentName;
            obj.feeDetails = response.body.studentDetails[i].feeDetails;
            dummyDataModel.studentDetails.push(obj);
            temp.push(response.body.studentDetails[i].studentID);
          }

          // dummyDataModel.studentDetails[i].feeDetails = response.body.studentDetails[i].feeDetails
        }

        //remove student if not in response
        if (temp.length != 0) {
          for (var loop = 0; loop < dummyDataModel.studentDetails.length; loop++) {
            if (!temp.includes(dummyDataModel.studentDetails[loop].studentID)) {
              dummyDataModel.studentDetails.splice(loop, 1);
            }
          }
        }

        this.setState({
          feeLoading: false,
          dataModel: dummyDataModel
        })
        this.resfreshDataModelStore(dummyDataModel)
        // try {
        //   await AsyncStorage.setItem('ParentDashboardModel', JSON.stringify(dummyDataModel))
        // } catch (error) {
        //   // Error saving data
        // }
        break
      case "WeeklyCalendar":
        var flag = true;
        var obj;
        var temp = [];
        for (let i = 0; i < response.body.studentDetails.length; i++) {
          flag = true;
          for (var loop = 0; loop < dummyDataModel.studentDetails.length; loop++) { //copy the data from response to dummyDataModel
            if (dummyDataModel.studentDetails[loop].studentID == response.body.studentDetails[i].studentID) {
              dummyDataModel.studentDetails[loop].weeklyCalender = response.body.studentDetails[i].weeklyCalender;
              flag = false;
              temp.push(response.body.studentDetails[i].studentID);
              break
            }
          }
          if (flag) { //add student if not in dummyDataModel
            obj = { studentID: "", studentName: "", attendance: [{ Class: "", classDesc: "", startDate: "", endDate: "", Attendance: [{ year: "", month: "", attendanceDetails: [{ no_OfDaysPresent: "", no_ofDaysAbsent: "", no_ofDaysLeave: "", workingDays: "", percentage: "" }] }] }], examDetails: [], weeklyCalender: [{ date: '', eventArray: [{ eventType: "", key: "", eventAttributes: [{ attrName: "", attrValue: "" }] }] }], feeDetails: [{ feeId: "", feeDescription: "", Balance: "", feeAmount: "", dueDate: "" }] };
            obj.studentID = response.body.studentDetails[i].studentID;
            obj.studentName = response.body.studentDetails[i].studentName;
            obj.weeklyCalender = response.body.studentDetails[i].weeklyCalender;
            dummyDataModel.studentDetails.push(obj);
            temp.push(response.body.studentDetails[i].studentID);
          }
          // dummyDataModel.studentDetails[i].weeklyCalender = response.body.studentDetails[i].weeklyCalender
        }
        //remove student if not in response
        if (temp.length != 0) {
          for (var loop = 0; loop < dummyDataModel.studentDetails.length; loop++) {
            if (!temp.includes(dummyDataModel.studentDetails[loop].studentID)) {
              dummyDataModel.studentDetails.splice(loop, 1);
            }
          }
        }
        this.setState({
          calenderLoading: false,
          dataModel: dummyDataModel
        })
        this.resfreshDataModelStore(dummyDataModel)
        // try {
        //   await AsyncStorage.setItem('ParentDashboardModel', JSON.stringify(dummyDataModel))
        // } catch (error) {
        //   // Error saving data
        // }
        break
      case "Exam":
        var flag = true;
        var obj;
        var temp = [];
        for (let i = 0; i < response.body.studentDetails.length; i++) {
          flag = true;
          for (var loop = 0; loop < dummyDataModel.studentDetails.length; loop++) { //copy the data from response to dummyDataModel
            if (dummyDataModel.studentDetails[loop].studentID == response.body.studentDetails[i].studentID) {
              dummyDataModel.studentDetails[loop].examDetails = response.body.studentDetails[i].examDetails;
              flag = false;
              temp.push(response.body.studentDetails[i].studentID);
              break
            }
          }
          if (flag) { //add student if not in dummyDataModel
            obj = { studentID: "", studentName: "", attendance: [{ Class: "", classDesc: "", startDate: "", endDate: "", Attendance: [{ year: "", month: "", attendanceDetails: [{ no_OfDaysPresent: "", no_ofDaysAbsent: "", no_ofDaysLeave: "", workingDays: "", percentage: "" }] }] }], examDetails: [], weeklyCalender: [{ date: '', eventArray: [{ eventType: "", key: "", eventAttributes: [{ attrName: "", attrValue: "" }] }] }], feeDetails: [{ feeId: "", feeDescription: "", Balance: "", feeAmount: "", dueDate: "" }] };
            obj.studentID = response.body.studentDetails[i].studentID;
            obj.studentName = response.body.studentDetails[i].studentName;
            obj.examDetails = response.body.studentDetails[i].examDetails;
            dummyDataModel.studentDetails.push(obj);
            temp.push(response.body.studentDetails[i].studentID);
          }
          // dummyDataModel.studentDetails[i].examDetails = response.body.studentDetails[i].examDetails
        }
        this.setState({
          examLoading: false,
          dataModel: dummyDataModel
        })
        this.resfreshDataModelStore(dummyDataModel)
        // try {
        //   await AsyncStorage.setItem('ParentDashboardModel', JSON.stringify(dummyDataModel))
        // } catch (error) {
        //   // Error saving data
        // }
        break
    }
    // return true
  }


  DashboardStored = async function (response, header) {
    var DashboardData = JSON.parse(await AsyncStorage.getItem('ParentDashboardModel'));
    var tempArray = []
    if (DashboardData != null) {
      tempArray = DashboardData
      if (tempArray.length < 3) {
        tempArray.push({
          userID: header.userID,
          instituteID: header.instituteID,
          dataModel: response
        })
      }
      else {
        //array  shiftting
        tempArray[0] = cloneDeep(tempArray[1])
        tempArray[1] = cloneDeep(tempArray[2])
        tempArray[2] = {
          userID: header.userID,
          instituteID: header.instituteID,
          dataModel: response
        }
      }
    } else {
      tempArray.push({
        userID: header.userID,
        instituteID: header.instituteID,
        dataModel: response
      })
    }
    try {
      await AsyncStorage.setItem('ParentDashboardModel', JSON.stringify(tempArray))
    } catch (error) {
      // Error saving data
    }
  }



  async postApiResponse(responseData) {
    if (!this.state.unMount) {
      await apiCall.functions.clearServiceToken('ParentDashBoard')
      if (typeof responseData.header != 'undefined') {
        if (typeof responseData.header.status != 'undefined' && responseData.header.status != null && responseData.header.status == 'success') {
          datesBlacklist = [];
          dateswhitelist = [];
          if (responseData.header.businessEntity.length != 0) {
            this.dashBoardDataModel(responseData)
          }
          else {
            this.setState({
              dataModel: responseData.body,
              isloading: false
            })
            this.DashboardStored(responseData.body, responseData.header)
            // try {
            //   await AsyncStorage.setItem('ParentDashboardModel', JSON.stringify(responseData.body))
            // } catch (error) {
            //   // Error saving data
            // }
          }
        }
        else if (typeof responseData.header.status != 'undefined' && responseData.header.status != null && responseData.header.status == 'error') {
          // starts NEAI-266
          // this.setState({
          //   isloading: false,
          //   [componentLoading]: false,
          //   error: responseData.error,
          //   errorType: 'BE',
          //   showAlert: true
          // })
          if (this.state.isloading) {
            this.setState({
              isloading: false,
              [componentLoading]: false,
              // error: responseData.error,
              // errorType: 'BE',
              // showAlert: true
            })
          }
          else {
            this.setState({
              isloading: false,
              [componentLoading]: false,
              error: responseData.error,
              errorType: 'BE',
              showAlert: true
            })
          }
          // ends NEAI-266
        }
      }
      else if (responseData.status == 'error') {
        //console.log(responseData, "else if")
        // starts NEAI-266
        // this.setState({
        //   isloading: false,
        //   [componentLoading]: false,
        //   error: responseData.error,
        //   errorType: 'BE',
        //   showAlert: true
        // })
        if (this.state.isloading) {
          this.setState({
            isloading: false,
            [componentLoading]: false,
            // error: responseData.error,
            // errorType: 'BE',
            // showAlert: true
          })
        }
        else {
          this.setState({
            isloading: false,
            [componentLoading]: false,
            error: responseData.error,
            errorType: 'BE',
            showAlert: true
          })
        }
        // ends NEAI-266
      }

    }
  }







  // changeLayout = () => {
  //   LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  //   this.setState({ expanded: !this.state.expanded });
  // }




  // orientation = () => {
  //   if (this.state.orientationValue == false) {
  //     this.setState({
  //       orientationValue: true
  //     })

  //   }
  //   else {
  //     this.setState({
  //       orientationValue: false
  //     })
  //   }
  // }

  parentStateChange(object) {
    this.setState(
      object
    );

  }

  // start SHA003
  onClickPay(currentInd) {
    try {                                    // NEAI-229
      const { dataModel, selectStudentIndex } = this.state
      var dashBoardPayDataModel = {
        studentID: dataModel.studentDetails[selectStudentIndex].studentID,
        studentName: dataModel.studentDetails[selectStudentIndex].studentName,
        feeID: dataModel.studentDetails[selectStudentIndex].feeDetails[currentInd].feeId,
        feeDescription: dataModel.studentDetails[selectStudentIndex].feeDetails[currentInd].feeDescription,
        amount: dataModel.studentDetails[selectStudentIndex].feeDetails[currentInd].feeAmount,
        dueDate: dataModel.studentDetails[selectStudentIndex].feeDetails[currentInd].dueDate,
        status: "",
        feePaid: "",
        outStanding: dataModel.studentDetails[selectStudentIndex].feeDetails[currentInd].Balance,
        paidDate: "",
        feeBreakup: [{
          check: false,
          componentName: "",
          amount: ""
        }]
      };
      if (this.state.isloading) {
        Exception.functions.showFrontendError(this.parentStateChange, [{ errorCode: 'FE-VAL-067', errorMessage: '', errorParam: '' }])
        return false
      }
      if (this.state.feeLoading) {
        Exception.functions.showFrontendError(this.parentStateChange, [{ errorCode: 'FE-VAL-068', errorMessage: '', errorParam: '' }])
        return false
      }
      else {
        this.setState({
          paymentFeeId: dataModel.studentDetails[selectStudentIndex].feeDetails[currentInd].feeId,
          dashBoardPaymentIsloading: true,
          selectedFeeIndex: currentInd
        })
        // start NEAI-170
        apiCall.functions.cancelToken = apiCall.functions.dashboardCancelToken
        // end NEAI-170


        GeneralUtils.functions.pay(this, dashBoardPayDataModel)
      }

    }
    //  start NEAI-229
    catch (err) {
      this.setState({
        dashBoardPaymentIsloading: false,
      })
    }
    // end NEAI-229

  }
  // end SHA003



  selectEvent = (date) => {
    const { dataModel,selectStudentIndex } = this.state

    var selectedDate = moment(date).format('DD-MM-YYYY')
    var index;
    if (typeof dataModel!='undefined' && typeof dataModel.weeklyCalender!='undefined')
    {
      dataModel.studentDetails[selectStudentIndex].weeklyCalender.findIndex(function (entry, i) {
      if (entry.date == selectedDate) {
        index = i;
        return true;
      }
    });
    this.setState({
      select_Date: date,
      selectedEventTabIndex: index
    })
  }
  else
  {
    this.setState({
      select_Date: date,
      //selectedEventTabIndex: index
    })
  }
  }

  changeLayout = (index) => {
    if (this.state.selectedFeeIndex == index) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      this.setState({ expanded: !this.state.expanded, selectedFeeIndex: null });
    }
    else {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      this.setState({ expanded: !this.state.expanded, selectedFeeIndex: index });
    }

  }



  _attendanceDetailItem = ({ item, index }) => {
    return (
      <View key={index.toString()}>
        <Title>{item.month}-{item.year.slice(-2)}</Title>
        <ListItem >
          <Image resizeMode='contain' style={[AppStyles.inactiveMoreIcon, AppStyles.voiletImgColor]}
            source={require('./../../asssets/icons/com006.png')}
          />
          <ListItem.Content>
            <Text style={AppStyles.textColor}>Total working days</Text>
          </ListItem.Content>
          <Text>{item.attendanceDetails[0].workingDays}</Text>
        </ListItem>
        <ListItem >
          <Image resizeMode='contain' style={[AppStyles.inactiveMoreIcon, AppStyles.succusImgColor]}
            source={require('./../../asssets/icons/com006.png')}
          />
          <ListItem.Content>
            <Text style={AppStyles.textColor}>Present</Text>
          </ListItem.Content>
          <Text>{item.attendanceDetails[0].no_OfDaysPresent}</Text>
        </ListItem>

        <ListItem >
          <Image resizeMode='contain' style={[AppStyles.inactiveMoreIcon, AppStyles.errorImgColor]}
            source={require('./../../asssets/icons/com006.png')}
          />
          <ListItem.Content>
            <Text style={AppStyles.textColor}>Absent</Text>
          </ListItem.Content>
          <Text>{item.attendanceDetails[0].no_ofDaysAbsent}</Text>
        </ListItem>
        <ListItem >
          <Image resizeMode='contain' style={[AppStyles.inactiveMoreIcon, AppStyles.primaryImgColor]}
            source={require('./../../asssets/icons/com006.png')}
          />
          <ListItem.Content>
            <Text style={AppStyles.textColor}>Leave</Text>
          </ListItem.Content>
          <Text>{item.attendanceDetails[0].no_ofDaysLeave}</Text>
        </ListItem>
      </View>
    )
  }

  _examDetailItem = ({ item, index }) => {
    return (
      <View key={index.toString()}>
        <Title>{item.examDescription}</Title>
        <ListItem >
          <Image resizeMode='contain' style={[AppStyles.inactiveMoreIcon, AppStyles.voiletImgColor]}
            source={require('./../../asssets/icons/com006.png')}
          />
          <ListItem.Content>
            <Text style={AppStyles.textColor}>Exam code</Text>
          </ListItem.Content>
          <Text>{item.exam}</Text>
        </ListItem>
        <ListItem >
          <Image resizeMode='contain' style={[AppStyles.inactiveMoreIcon, AppStyles.succusImgColor]}
            source={require('./../../asssets/icons/com006.png')}
          />
          <ListItem.Content>
            <Text style={AppStyles.textColor}>Subject Name</Text>
          </ListItem.Content>
          <Text>{item.subjectName}</Text>
        </ListItem>

        <ListItem>
          <Image resizeMode='contain' style={[AppStyles.inactiveMoreIcon, AppStyles.errorImgColor]}
            source={require('./../../asssets/icons/com006.png')}
          />
          <ListItem.Content>
            <Text style={AppStyles.textColor}>Mark</Text>
          </ListItem.Content>
          <Text>{item.mark}</Text>
        </ListItem>
      </View>
    )
  }


  getSelectedValue = (master, value) => {
    for (let item of master) {
      if (value == item.value) {
        return item.label
      }
    }

  }





  render() {
    const { dataModel, isloading, selectedTabIndex, selectStudentIndex, selectClassIndex, selectSubjectIndex, unMount, attendenceLoading,
      feeLoading,
      calenderLoading,
      examLoading, emptyDataModel, open, value, selectedEventTabIndex } = this.state



    var dummyEmptyDataModel = cloneDeep(emptyDataModel)
    ////console.log(dataModel, "dataModel")
    var labels = []
    var datasets = []
    var subjectLabels = []
    var subjectDatasets = []
    var tabheading = []
    var studentDropDownData = []
    var i = 0
    var classDropDownData = []
    var ind = 0
    var subjectDropDownData = []
    var subInd = 0
    var mapData = new Map()
    var examDetails = []
    var data = {}
    var examDetailsdata = {}

    if (unMount == false) {

      if (dataModel.studentDetails.length == 0) {
        dataModel.studentDetails = dummyEmptyDataModel.studentDetails
      }

      if (dataModel.studentDetails[selectStudentIndex].attendance.length == 0) {
        dataModel.studentDetails[selectStudentIndex].attendance = dummyEmptyDataModel.studentDetails[0].attendance
      }

      if (dataModel.studentDetails[selectStudentIndex].attendance[selectClassIndex].Attendance.length == 0) {
        dataModel.studentDetails[selectStudentIndex].attendance[selectClassIndex].Attendance = dummyEmptyDataModel.studentDetails[0].attendance[0].Attendance
      }

      for (let item of dataModel.studentDetails[selectStudentIndex].attendance[selectClassIndex].Attendance) {
        labels.push(`${item.month}-${item.year.slice(-2)}`)
        datasets.push(Number(item.attendanceDetails[0].percentage))
      }

      data = {
        labels: labels,
        datasets: [
          {
            data: datasets
          }
        ]
      };

      if (dataModel.studentDetails[selectStudentIndex].weeklyCalender.length == 0) {
        dataModel.studentDetails[selectStudentIndex].weeklyCalender = dummyEmptyDataModel.studentDetails[0].weeklyCalender
      }

      for (let item of dataModel.studentDetails[selectStudentIndex].weeklyCalender) {
        tabheading.push(`${item.date} ${GeneralUtils.functions.getDayName(item.date) != undefined && GeneralUtils.functions.getDayName(item.date)}`)
      }
      for (let item of dataModel.studentDetails) {
        studentDropDownData.push({
          // value: item.studentName,
          // id: i
          label: item.studentName,
          value: i
        })
        i++
      }



      for (let item of dataModel.studentDetails[selectStudentIndex].attendance) {
        classDropDownData.push({
          // value: item.Class,
          // id: i
          label: item.Class,
          value: ind
        })
        ind++
      }



      if (dataModel.studentDetails[selectStudentIndex].examDetails.length == 0) {
        dataModel.studentDetails[selectStudentIndex].examDetails = dummyEmptyDataModel.studentDetails[0].examDetails
      }

      for (let item of dataModel.studentDetails[selectStudentIndex].examDetails) {
        mapData.set(item.subjectID, item.subjectName)
      }



      for (let [key, value] of mapData.entries()) {
        subjectDropDownData.push({
          // value: value,
          // id: key
          label: value,
          value: subInd,
          id: key
        })
        subInd++
      }

      for (let item of dataModel.studentDetails[selectStudentIndex].examDetails) {
        if (subjectDropDownData[selectSubjectIndex].id == item.subjectID) {
          subjectLabels.push(item.exam)
          subjectDatasets.push(Number(item.mark))
          examDetails.push(item)
        }
      }

      examDetailsdata = {
        labels: subjectLabels,
        datasets: [
          {
            data: subjectDatasets
          }
        ]
      };

      // starts NEW3.01
      //var datesBlacklist = [];
     // var dateswhitelist = [];
      var customDatesStyle = []
      var dataModelDate = []
      for (let i = 0; i < dataModel.studentDetails[selectStudentIndex].weeklyCalender.length; i++) {
        dataModelDate.push(dataModel.studentDetails[selectStudentIndex].weeklyCalender[i].date)
      }



      var lastDate = dataModel.studentDetails[selectStudentIndex].weeklyCalender[dataModel.studentDetails[selectStudentIndex].weeklyCalender.length - 1]
      var startDate = moment(dataModel.studentDetails[selectStudentIndex].weeklyCalender[0].date, 'DD-MM-YYYY')
      var enddate = moment(lastDate.date, 'DD-MM-YYYY')
      var Difference_In_date = moment.duration(enddate.diff(startDate)).asDays() + 1;
      var new_date = startDate
      for (var i = 0; i < Difference_In_date; i++) {
        new_date = moment(dataModelDate[0], 'DD-MM-YYYY').add(i, 'days').format('DD-MM-YYYY');
        if (dataModelDate.indexOf(new_date) !== -1) {
          dateswhitelist.push(moment(new_date, "DD-MM-YYYY"))
        }
        else {
          datesBlacklist.push(moment(new_date, "DD-MM-YYYY"))
        }
      }

      // ends NEW3.01



    }




    // {this.state.userType == "P" &&




    return unMount == false ? (
      <Provider>
        <View style={AppStyles.mainContainer}>
          <AppHeader
            stateObject={this}
          />
          <View style={AppStyles.container}>
            {/* <Card.Title title="Dashboard" subtitle="Menu / Dashboard" /> */}


          {(this.state.userType == "P" && studentDropDownData.length > 1) &&  <View style={[AppStyles.parentDashBoardDropDownStyle,AppStyles.marginBottom_2]}>

              <View style={[AppStyles.marginHorizontal_1]}>
                <View style={AppStyles.marginTop_1}>
                  <CustomDropDownPicker
                    labelStyleStatus={true}
                    label={'Select student dashboard'}
                    stateObject={this}
                    items={studentDropDownData}
                    value={this.getSelectedValue(studentDropDownData, selectStudentIndex)}
                    placeholder="Select Student"
                    // stateIndexName={'selectStudentIndex'}
                    onChangeValue={(value) => {
                      this.setState({ selectStudentIndex: value })
                    }}
                    dropdownName={'studentDropdown'}
                    subHeadingRecordName="a student"
                    onClear={() => {
                      this.state.selectStudentIndex = 0;
                      this.setState({ selectStudentIndex: this.state.selectStudentIndex })
                    }}
                  />
                </View>

              </View>


            </View>}



            <View style={[AppStyles.row_space_between, AppStyles.alignItems]}>
              <View>
               {<Title>Dashboard for {this.getSelectedValue(studentDropDownData, selectStudentIndex)}</Title>}
              </View>
              {isloading && <ActivityIndicator color={AppStyles.ActivityIndicatorStyle.color} animating={isloading} />}
            </View>
            
            <Caption>Menu / Dashboard</Caption>

            {/* {(this.state.userType == "P" && studentDropDownData.length > 1) ?
              <Card style={AppStyles.topHeader}>
                <Card.Content>
                  <View style={[AppStyles.flexDirectionRow]}>
                    <View style={AppStyles.selectStudentHeading}>
                      <Subheading style={AppStyles.selectStudentTextStyle}>Select Student</Subheading>
                    </View>
                  </View>
                </Card.Content >
                <CustomDropDownPicker
                  stateObject={this}
                  items={studentDropDownData}
                  value={this.getSelectedValue(studentDropDownData, selectStudentIndex)}
                  placeholder="Select Student"
                  onChangeValue={(value) => {
                    this.setState({ selectStudentIndex: value })
                  }}

                  dropdownName={'studentDropdown'}
                  subHeadingRecordName="a student"
                  onClear={() => {
                    this.state.selectStudentIndex = 0;
                    this.setState({ selectStudentIndex: this.state.selectStudentIndex })
                  }}
                />
                <CustomTabScreen
                  tabHeading={['Attendance', 'Fees']}
                  otherTabHeading={['Weekly Events', 'Exam Insights']}
                  stateObject={this}
                  stateValue={'selectedTabIndex'}
                  selectedStateValue={selectedTabIndex}
                  barColor={UiColor.WHITE}
                />
              </Card>
              :
              <CustomTabScreen
                tabHeading={['Attendance', 'Fees']}
                otherTabHeading={['Weekly Events', 'Exam Insights']}
                stateObject={this}
                stateValue={'selectedTabIndex'}
                selectedStateValue={selectedTabIndex}
                barColor={UiColor.APP_BACKGROUND}
              />} */}


             
              <CustomTabScreen
                tabHeading={['Attendance', 'Fees']}
                otherTabHeading={['Weekly Events', 'Exam Insights']}
                stateObject={this}
                stateValue={'selectedTabIndex'}
                selectedStateValue={selectedTabIndex}
                barColor={UiColor.APP_BACKGROUND}
              />

            <Divider />
            <ScrollView
              nestedScrollEnabled={true}
              bounces={false}
              showsVerticalScrollIndicator={false}
              ref='_scrollView'
              onContentSizeChange={() => { this.refs._scrollView.scrollTo({ x: 0, y: 0, animated: true }); }}
            >
              <View style={AppStyles.minHeight}>
                {selectedTabIndex == 0 && <View>
                  <View style={AppStyles.marginTop_2}>
                    <Card>
                      <Card.Content >
                        <View style={[AppStyles.row_space_between, AppStyles.alignItems]}>
                          <View>
                            <Title>Attendance</Title>
                          </View>
                          {attendenceLoading ? <ActivityIndicator color={AppStyles.ActivityIndicatorStyle.color} animating={attendenceLoading} />
                            : <TouchableOpacity
                              onPress={() => this.onClickRefreshBtn('attendenceLoading')}
                              style={AppStyles.refresh_btn}>
                              <Image
                                resizeMode="contain"
                                source={require("../../asssets/icons/refresh.png")}
                                style={AppStyles.refreshIcn}
                              />
                            </TouchableOpacity>}
                        </View>
                      </Card.Content>



                      <CustomDropDownPicker
                        stateObject={this}
                        items={classDropDownData}
                        // value={GeneralUtils.functions.getSelectedIndex(dataModel.studentDetails[selectStudentIndex].attendance, 'Class', dataModel.studentDetails[selectStudentIndex].attendance[selectClassIndex].Class)}
                        value={this.getSelectedValue(classDropDownData, GeneralUtils.functions.getSelectedIndex(dataModel.studentDetails[selectStudentIndex].attendance, 'Class', dataModel.studentDetails[selectStudentIndex].attendance[selectClassIndex].Class))}
                        placeholder="Select Class"
                        // stateIndexName={'selectClassIndex'}
                        onChangeValue={(value) => {
                          this.setState({ selectClassIndex: value })
                        }}
                        dropdownName={'classDropdown'}
                        subHeadingRecordName="a class"
                        onClear={() => {
                          this.state.selectClassIndex = 0;
                          this.setState({ selectClassIndex: this.state.selectClassIndex })
                        }}
                      />
                      <Card.Content >
                        <CustomBarChart
                          data={data}
                        />
                      </Card.Content>
                      {/* <Divider /> */}
                      {/* <Card.Content >
                        <View style={AppStyles.marginTop_2}>
                          <Subheading style={AppStyles.textColor}>Month wise details</Subheading>
                        </View>

                        {dataModel.studentDetails[selectStudentIndex].attendance[selectClassIndex].Attendance.map((item, index) => (
                          <View key={index.toString()} style={[AppStyles.eventContainer, { borderLeftColor: GeneralUtils.functions._getRandomColor(index) }]}>
                            <View style={[]}>
                              <Subheading>{item.month}-{item.year.slice(-2)}</Subheading>
                              <View style={[AppStyles.flexDirectionRow, AppStyles.marginTop_1]}>
                                <Text style={AppStyles.attrNameStyle}>Working Days</Text>
                                <Text style={AppStyles.attrValueStyle}>{item.attendanceDetails[0].workingDays}</Text>
                              </View>
                              <View style={[AppStyles.flexDirectionRow, AppStyles.marginTop_1]}>
                                <Text style={AppStyles.attrNameStyle}>Present</Text>
                                <Text style={AppStyles.presentValueStyle}>{item.attendanceDetails[0].no_OfDaysPresent}</Text>
                              </View>
                              <View style={[AppStyles.flexDirectionRow, AppStyles.marginTop_1]}>
                                <Text style={AppStyles.attrNameStyle}>Absent</Text>
                                <Text style={AppStyles.absentValueStyle}>{item.attendanceDetails[0].no_ofDaysAbsent}</Text>
                              </View>
                              <View style={[AppStyles.flexDirectionRow, AppStyles.marginTop_1]}>
                                <Text style={AppStyles.attrNameStyle}>Leave</Text>
                                <Text style={AppStyles.leaveValueStyle}>{item.attendanceDetails[0].no_ofDaysLeave}</Text>
                              </View>
                            </View>
                          </View>))
                        }
                      </Card.Content> */}
                    </Card>
                    <View style={AppStyles.marginTop_2}>
                      <Card>
                        <Card.Content >
                          <View >
                            <Subheading style={AppStyles.textColor}>Month wise details</Subheading>
                          </View>


                          <CustomCarousel
                            stateObject={this}
                            data={dataModel.studentDetails[selectStudentIndex].attendance[selectClassIndex].Attendance}
                            renderItem={this._attendanceDetailItem}
                            activeSlideIndexStateName={'activeAttendanceSlideIndex'}
                            activeSlideIndex={this.state.activeAttendanceSlideIndex}
                          />


                        </Card.Content>
                      </Card>
                    </View>
                  </View>
                </View>}


                {selectedTabIndex == 1 &&
                  <View style={AppStyles.marginTop_2}>
                    <Card>
                      <Card.Content >
                        <View style={[AppStyles.row_space_between, AppStyles.alignItems]}>
                          <View>
                            <Title>Fee</Title>
                          </View>

                          {feeLoading ? <ActivityIndicator color={AppStyles.ActivityIndicatorStyle.color} animating={feeLoading} />
                            : <TouchableOpacity
                              onPress={() => this.onClickRefreshBtn('feeLoading')}
                              style={AppStyles.refresh_btn}>
                              <Image
                                resizeMode="contain"
                                source={require("../../asssets/icons/refresh.png")}
                                style={AppStyles.refreshIcn}
                              />
                            </TouchableOpacity>}
                        </View>
                      </Card.Content>

                      <Card.Content>
                        {dataModel.studentDetails[selectStudentIndex].feeDetails.map((item, index) => (
                          <View key={index.toString()} style={AppStyles.marginTop_2}>
                            <View style={[AppStyles.row_space_between, AppStyles.alignItems]}>
                              <TouchableOpacity onPress={() => this.changeLayout(index)} style={[AppStyles.flexDirectionRow, AppStyles.alignItems]}>
                                <MaterialIcons name={this.state.selectedFeeIndex != index ? "navigate-next" : "keyboard-arrow-down"} size={AppStyles.iconSize.height} color={UiColor.LIGHT_TEXT_COLOR} />
                                <View style={[AppStyles.marginLeft_1, AppStyles.width70]}>
                                  <View style={[AppStyles.flexDirectionRow, AppStyles.alignItems]}>
                                    <Text style={[AppStyles.bold_400]}>{item.feeDescription}</Text>
                                    <Caption style={item.status == 'Paid' ? AppStyles.paidStatusStyle : AppStyles.notPaidStatusStyle}>{item.status}</Caption>
                                  </View>
                                  <Caption style={{ color: UiColor.LIGHT_TEXT_COLOR }}>Date {item.dueDate}, {item.feeAmount} </Caption>
                                </View>
                              </TouchableOpacity>

                              {(item.status == 'Not Paid' || item.status.includes('failed')) && <TouchableOpacity onPress={() => this.onClickPay(index)} style={AppStyles.payBtnContainer}>
                                <Text style={AppStyles.payTextStyle}>Pay</Text>
                              </TouchableOpacity>}
                            </View>

                            <View style={[{ height: this.state.selectedFeeIndex == index ? null : 0, overflow: 'hidden', }]}>
                              <View style={[AppStyles.flexDirectionRow, AppStyles.marginTop_3, AppStyles.marginLeft_4]}>
                                <Text style={AppStyles.attrNameStyle}>Fee ID</Text>
                                <Text style={AppStyles.normalValueStyle}>{item.feeId}</Text>
                              </View>
                              <View style={[AppStyles.flexDirectionRow, AppStyles.marginTop_3, AppStyles.marginLeft_4]}>
                                <Text style={AppStyles.attrNameStyle}>Fee Amount</Text>
                                <Text style={AppStyles.normalValueStyle}>{item.feeAmount}</Text>
                              </View>
                              <View style={[AppStyles.flexDirectionRow, AppStyles.marginTop_3, AppStyles.marginLeft_4]}>
                                <Text style={AppStyles.attrNameStyle}>Amount Paid</Text>
                                <Text style={AppStyles.normalValueStyle}>{item.amountPaid}</Text>
                              </View>
                              <View style={[AppStyles.flexDirectionRow, AppStyles.marginTop_3, AppStyles.marginLeft_4]}>
                                <Text style={AppStyles.attrNameStyle}>Balance Amount to be paid</Text>
                                <Text style={AppStyles.normalValueStyle}>{item.Balance}</Text>
                              </View>
                              <View style={[AppStyles.flexDirectionRow, AppStyles.marginTop_3, AppStyles.marginLeft_4]}>
                                <Text style={AppStyles.attrNameStyle}>Due Date</Text>
                                <Text style={AppStyles.normalValueStyle}>{item.dueDate}</Text>
                              </View>
                            </View>
                            <Divider style={AppStyles.marginVertical_2} />
                          </View>))
                        }

                      </Card.Content>
                    </Card>
                  </View>

                }



                {selectedTabIndex == 2 && <View style={AppStyles.marginTop_2}>
                  <Card>
                    <Card.Content >
                      <View style={[AppStyles.row_space_between, AppStyles.alignItems]}>
                        <View>
                          <Title>Weekly Schedule</Title>
                          {/* <Caption>{'Schedule'}</Caption> */}
                        </View>

                        {calenderLoading ? <ActivityIndicator color={AppStyles.ActivityIndicatorStyle.color} animating={calenderLoading} />
                          : <TouchableOpacity
                            onPress={() => this.onClickRefreshBtn('calenderLoading')}
                            style={AppStyles.refresh_btn}>
                            <Image
                              resizeMode="contain"
                              source={require("../../asssets/icons/refresh.png")}
                              style={AppStyles.refreshIcn}
                            />
                          </TouchableOpacity>}
                      </View>
                    </Card.Content>
                    <CustomCalendar
                      onDateSelected={date => {
                        this.selectEvent(date)
                      }}
                      maxDate={enddate}
                      minDate={startDate}
                      startingDate={startDate}
                      datesBlacklist={datesBlacklist}
                      dateswhitelist={dateswhitelist}
                    />

                    <Card.Content >
                    {(typeof dataModel.studentDetails[selectStudentIndex].weeklyCalender[selectedEventTabIndex]!=='undefined' && typeof dataModel.studentDetails[selectStudentIndex].weeklyCalender[selectedEventTabIndex].eventArray!== 'undefined' && dataModel.studentDetails[selectStudentIndex].weeklyCalender[selectedEventTabIndex].eventArray.length>0) &&
                      dataModel.studentDetails[selectStudentIndex].weeklyCalender[selectedEventTabIndex].eventArray.map((item, index) => (
                        <View key={index.toString()} style={[AppStyles.eventContainer, { borderLeftColor: GeneralUtils.functions._getRandomColor(index) }]}>
                          <View ><Title>{item.eventType}</Title></View>
                          {item.eventAttributes.map((l, i) => (
                            <View key={i.toString()} style={[AppStyles.flexDirectionRow, AppStyles.marginTop_1]}>
                              <Text style={AppStyles.attrNameStyle}>{l.attrName}</Text>
                              <Text style={AppStyles.attrValueStyle}>{l.attrValue}</Text>
                            </View>))
                          }
                        </View>))
                      }
                      {(typeof dataModel.studentDetails[selectStudentIndex].weeklyCalender[selectedEventTabIndex] == 'undefined' || typeof dataModel.studentDetails[selectStudentIndex].weeklyCalender[selectedEventTabIndex].eventArray =='undefined' ||dataModel.studentDetails[selectStudentIndex].weeklyCalender[selectedEventTabIndex].eventArray.length==0) && (
                      <View style={[AppStyles.alignItems, AppStyles.marginTop_3]}><Caption>No events scheduled for this date</Caption></View>)
                    }
                    </Card.Content >
                  </Card>
                </View>}


                {selectedTabIndex == 3 && <View>
                  <View style={AppStyles.marginTop_2}>
                    <Card>
                      <Card.Content >
                        <View style={[AppStyles.row_space_between, AppStyles.alignItems]}>
                          <View>
                            <Title>Exam</Title>
                          </View>
                          {examLoading ? <ActivityIndicator color={AppStyles.ActivityIndicatorStyle.color} animating={examLoading} />
                            : <TouchableOpacity
                              onPress={() => this.onClickRefreshBtn('examLoading')}
                              style={AppStyles.refresh_btn}>
                              <Image
                                resizeMode="contain"
                                source={require("../../asssets/icons/refresh.png")}
                                style={AppStyles.refreshIcn}
                              />
                            </TouchableOpacity>}
                        </View>
                        {/* this.getSelectedValue(studentDropDownData,selectStudentIndex) */}

                      </Card.Content>
                      <CustomDropDownPicker
                        stateObject={this}
                        items={subjectDropDownData}
                        // value={subjectDropDownData.length != 0 ? GeneralUtils.functions.getSelectedIndex(subjectDropDownData, 'value', subjectDropDownData[selectSubjectIndex].value) : null}
                        value={this.getSelectedValue(subjectDropDownData, subjectDropDownData.length != 0 ? GeneralUtils.functions.getSelectedIndex(subjectDropDownData, 'value', subjectDropDownData[selectSubjectIndex].value) : null)}
                        placeholder="Select Subject"
                        // stateIndexName={'selectSubjectIndex'}
                        onChangeValue={(value) => {
                          this.setState({ selectSubjectIndex: value })
                        }}
                        dropdownName={'subjectDropdown'}
                        subHeadingRecordName="a subject"
                        onClear={() => {
                          this.state.selectSubjectIndex = 0;
                          this.setState({ selectSubjectIndex: this.state.selectSubjectIndex })
                        }}
                      />
                      <Card.Content >
                        <CustomBarChart
                          data={examDetailsdata}
                        />
                      </Card.Content>
                      {/* <Card.Content >
                        {examDetails.map((item, index) => (
                          <View key={index.toString()} style={[AppStyles.eventContainer, { borderLeftColor: GeneralUtils.functions._getRandomColor(index) }]}>
                            <View style={[]}>
                              <Subheading>{item.exam}</Subheading>
                              <View style={[AppStyles.flexDirectionRow, AppStyles.marginTop_1]}>
                                <Text style={AppStyles.attrNameStyle}>Exam Desc</Text>
                                <Text style={AppStyles.normalValueStyle}>{item.examDescription}</Text>
                              </View>
                              <View style={[AppStyles.flexDirectionRow, AppStyles.marginTop_1]}>
                                <Text style={AppStyles.attrNameStyle}>Subject Name</Text>
                                <Text style={AppStyles.normalValueStyle}>{item.subjectName}</Text>
                              </View>
                              <View style={[AppStyles.flexDirectionRow, AppStyles.marginTop_1]}>
                                <Text style={AppStyles.attrNameStyle}>Mark</Text>
                                <Text style={AppStyles.normalValueStyle}>{item.mark}</Text>
                              </View>
                            </View>
                          </View>))
                        }
                      </Card.Content> */}
                    </Card>
                    <View style={AppStyles.marginTop_2}>
                      <Card>
                        <Card.Content>
                          <View >
                            <Subheading style={AppStyles.textColor}>Exam details</Subheading>
                          </View>

                          <CustomCarousel
                            stateObject={this}
                            data={examDetails}
                            renderItem={this._examDetailItem}
                            activeSlideIndexStateName={'activeExamSlideIndex'}
                            activeSlideIndex={this.state.activeExamSlideIndex}
                          />



                        </Card.Content>
                      </Card>
                    </View>

                  </View>
                </View>}



              </View>
              <Divider style={AppStyles.marginTop_2} />
              <Footer />


            </ScrollView>
          </View>
          <AlertBox
            stateObject={this}
          />
          <WelComeModal
            stateObject={this}
          />


        </View>

      </Provider>
    ) : null;




  }

  // studentDropDown (){
  //   return(
  //     <View style={styles.container}>

  //     <Card style={[AppStyles.marginHorizontal_1]}>
  //     <CustomDropDownPicker
  //                 stateObject={this}
  //                 items={studentDropDownData}
  //                 value={this.getSelectedValue(studentDropDownData, selectStudentIndex)}
  //                 placeholder="Select Student"
  //                 // stateIndexName={'selectStudentIndex'}
  //                 onChangeValue={(value) => {
  //                   this.setState({ selectStudentIndex: value })
  //                 }}

  //                 dropdownName={'studentDropdown'}
  //                 subHeadingRecordName="a student"
  //                 onClear={() => {
  //                   this.state.selectStudentIndex = 0;
  //                   this.setState({ selectStudentIndex: this.state.selectStudentIndex })
  //                 }}
  //               />

  //     </Card>


  //   </View>
  //   )
  // }

}




export default StudentDashboard;
