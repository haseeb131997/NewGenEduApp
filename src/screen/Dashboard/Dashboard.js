
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
Change Desc: no used here more and less button
Changed By : Shashank
Date:17-09-2021 
*/

/* * * Change Tag:NEW3.03
Change Desc: tabHeading use to show the date in tab, now that  is not used
Changed By : Shashank
Date:17-09-2021 
*/

/* * * Change Tag:NEW3.04
Change Desc: convetSummaryResultToTableData function  is not used because approval queue ui is changes
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
  StyleSheet,

} from "react-native";
import {  ListItem } from 'react-native-elements';
import AppStyles from "../../AppStyles/AppStyles";
import { h, w } from "../../utils/Dimensions";
import { Caption, Text, Card, Title, Divider, ActivityIndicator, Provider ,Subheading} from 'react-native-paper';
import AppHeader from "../../components/AppHeader";
//import Carousel, { Pagination } from 'react-native-snap-carousel';
import moment from 'moment';
import { UiColor } from '../../theme';
import axios from "axios";
import Exception from '../../utils/Exception'
import cloneDeep from 'lodash/cloneDeep';
import GeneralUtils from "../../utils/GeneralUtils";
import AlertBox from '../../components/AlertBox';
import apiCall from "../../ApiCall/ActionApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ListView from '../../components/ListView';
import CarouselPagination from '../../components/CarouselPagination';
import Footer from '../../components/Footer';
import CustomCalendar from '../../components/CustomCalendar';
import CustomPieChart from '../../components/CustomPieChart';
import WelComeModal from '../../components/WelComeModal';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomTabScreen from '../../components/CustomTabScreen';
import CustomCarousel from '../../components/CustomCarousel';
//import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

var datesBlacklist = [];
var dateswhitelist = [];

var componentLoading = 'attendenceLoading'

class Dashboard extends Component {
  // starts NEW3.01
  // static onEnter() {
  //   // const c = Actions.refs.Dashboard;
  //   // c.setMount(false);
  // }

  // static onExit() {
  //   const c = Actions.refs.Dashboard;
  //   c.setUnmount(true);
  // }
  // ends NEW3.01
  constructor(props) {
    super(props);
    this.state = {
      isloading: false,
      // dataModel state config
      dataModel: {
        userID: '',
        pendingQueueMaster: [{ service: '', count: '', operation: '' }],
        institutFeeDetails:
          [
            {
              feeType: "",
              totalFee: '',
              overDueAmount: '',
              pendingAmount: '',
              collectedAmount: ''
            },

          ],
        totalTeachers: 0,
        teacherAttendance: 0,
        totalStudents: 0,
        studentAttendance: 0,
        smsLimit: "",
        currentSMSBalance: "",
        emailLimit: '',
        currentEmailBalance: '',
        weeklyCalender: [
          {
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
                }
              ]
            },
            ]
          },
        ]
      },

      emptyDataModel: {
        userID: '',
        pendingQueueMaster: [{ service: '', count: '', operation: '' }],
        institutFeeDetails:
          [
            {
              feeType: "",
              totalFee: '',
              overDueAmount: '',
              pendingAmount: '',
              collectedAmount: ''
            },

          ],
        totalTeachers: 0,
        teacherAttendance: 0,
        totalStudents: 0,
        studentAttendance: 0,
        smsLimit: "",
        currentSMSBalance: "",
        emailLimit: '',
        currentEmailBalance: '',
        weeklyCalender: [
          {
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
                }
              ]
            },
            ]
          },
        ]
      },

      // error_code: "",
      errorType: "",
      error: [{ errorCode: '', errorMessage: '', errorParam: '' }],

      // loading state configuration
      isloading: false,
      attendenceLoading: false,
      feeLoading: false,
      calenderLoading: false,
      queueLoading: false,
      notificationLoading: false,
      queData: [],
      showAlert: false,
      currencyCode: "",
      unMount: false,


      selectedTabIndex: 0,
      selectedEventTabIndex: 0,
      activeFeesSlideIndex: 0,
      select_Date: moment(),

      showWelcomeModal: false,

      // chart state config
      chartConfig: {
        backgroundGradientFrom: "yellow",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#fff",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        // labelColor: (opacity = 0.5) => `rgba(235, 60, 100, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
      },



    }
    this.parentStateChange = this.parentStateChange.bind(this)
    this.postApiResponse = this.postApiResponse.bind(this)
    this.parentStateChange = this.parentStateChange.bind(this)
    this.setUnmount = this.setUnmount = this.setUnmount.bind(this)
    this.setMount = this.setMount = this.setMount.bind(this)
    this.DashBoardCalling = this.DashBoardCalling.bind(this)
    this.selectEvent = this.selectEvent.bind(this)

  }
  // starts NEW3.01
  // componentWillMount() {
  //   // this.setState({
  //   //   dataModel:TestingDataModel
  //   // })
  //   this.DashBoardCalling()
  //   this._unsubscribe = this.props.navigation.addListener('focus', () => {
  //     this.setMount(false)
  //   });
  // }

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
  // ends NEW3.01



  setMount(unMount) {
    console.log(unMount, "dashBoard Mount")
    if (GeneralUtils.functions.logOut) {
      GeneralUtils.functions.logOut = false
      this.setState({
        unMount: unMount,
      })
    }
    apiCall.functions.dashboardCancelToken = axios.CancelToken.source()

    if (GeneralUtils.functions.ChangeInstitute) {
      this.DashBoardCalling()
    }

  }

  setUnmount(unMount) {

    if (GeneralUtils.functions.logOut) {
      this.setState({
        unMount: unMount,
      })
    }
  }



  DashBoardCalling = async () => {
    try {
      if (!this.state.unMount) {
        var currencyCode
        const { dataModel, emptyDataModel } = this.state
        var userId = ''
        var globalData = JSON.parse(await AsyncStorage.getItem('GLOBAL'));
        var DashboardModel = JSON.parse(await AsyncStorage.getItem('DashboardModel'));
        if (globalData != null) {
          currencyCode = globalData.currencyCode
          userId = globalData.userID
        }
        var dummyDataModel = cloneDeep(dataModel)
        dummyDataModel.userID = userId
        var apiObject = {
          serviceName: 'DashBoardService',
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
        var queData
        var tempDataModel
        var flag = true
        if (DashboardModel == null) {
          // starts NEW3.05
          // Exception.functions.showFrontendError(this.parentStateChange, [{ errorCode: 'FE-VAL-049', errorMessage: '', errorParam: '' }])
          // ends  NEW3.05     
          this.setState({
            isloading: true,
            currencyCode: currencyCode,
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

              queData = await this.convetSummaryResultToTableData(DashboardModel[i].dataModel.pendingQueueMaster)

              tempDataModel = DashboardModel[i].dataModel
              flag = false
              break
            }
          }
          if (flag) {
            // starts NEW3.05
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
            this.setState({
              queData: queData,
              dataModel: tempDataModel,
              currencyCode: currencyCode
            })
          }
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
        return 'FEE'

      case 'calenderLoading':
        return 'Weekly Calender'

      case 'queueLoading':
        return 'Queue'

      case 'notificationLoading':
        return 'SMS'

      default:
        return ''
    }
  }



  onClickRefreshBtn = async (loading) => {
    try {                         // NEAI-229
      const { dataModel } = this.state
      var userId = ''
      var globalData = JSON.parse(await AsyncStorage.getItem('GLOBAL'));
      if (globalData != null) {
        userId = globalData.userID
      }
      var dummyDataModel = cloneDeep(dataModel)
      dummyDataModel.userID = userId
      var apiObject = {
        serviceName: 'DashBoardService',
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
        if (this.state.attendenceLoading || this.state.feeLoading || this.state.calenderLoading || this.state.queueLoading || this.state.notificationLoading) {
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
    var DashboardModel = JSON.parse(await AsyncStorage.getItem('DashboardModel'));
    for (let j = 0; j < DashboardModel.length; j++) {
      if (globalData.userID == DashboardModel[j].userID && globalData.instituteID == DashboardModel[j].instituteID) {
        DashboardModel[j].dataModel = response
        break
      }
    }
    try {
      await AsyncStorage.setItem('DashboardModel', JSON.stringify(DashboardModel))
    } catch (error) {
      // Error saving data
    }

    // try {
    //   await AsyncStorage.setItem('DashboardModel', JSON.stringify(dummyDataModel))
    // } catch (error) {
    //   // Error saving data
    // }

  }



  dashBoardDataModel = async function (response) {
    var value = response.header.businessEntity[0].entityValue
    var dummyDataModel = cloneDeep(this.state.dataModel)
    var queData
    var emptyInstitutFeeDetails = [
      {
        feeType: "",
        totalFee: '',
        overDueAmount: '',
        pendingAmount: '',
        collectedAmount: ''
      },
    ]
    switch (value) {
      case "Attendance":
        dummyDataModel.totalTeachers = response.body.totalTeachers
        dummyDataModel.teacherAttendance = response.body.teacherAttendance
        dummyDataModel.totalStudents = response.body.totalStudents
        dummyDataModel.studentAttendance = response.body.studentAttendance
        this.setState({
          attendenceLoading: false,
          dataModel: dummyDataModel
        })
        this.resfreshDataModelStore(dummyDataModel)
        break
      case "Queue":

        queData = await this.convetSummaryResultToTableData(response.body.pendingQueueMaster)

        dummyDataModel.pendingQueueMaster = response.body.pendingQueueMaster
        this.setState({
          queueLoading: false,

          queData: queData,

          dataModel: dummyDataModel
        })
        this.resfreshDataModelStore(dummyDataModel)
        break
      case "FEE":
        if (typeof response.body.institutFeeDetails == 'undefined' || response.body.institutFeeDetails.length == 0) {
          dummyDataModel.institutFeeDetails = emptyInstitutFeeDetails
          this.setState({
            feeLoading: false,
            dataModel: dummyDataModel
          })
          this.resfreshDataModelStore(dummyDataModel)
        }
        else {
          dummyDataModel.institutFeeDetails = response.body.institutFeeDetails
          this.setState({
            feeLoading: false,
            dataModel: dummyDataModel
          })
          this.resfreshDataModelStore(dummyDataModel)
        }

        break
      case "Weekly Calender":
        dummyDataModel.weeklyCalender = response.body.weeklyCalender
        this.setState({
          calenderLoading: false,
          dataModel: dummyDataModel
        })
        this.resfreshDataModelStore(dummyDataModel)
        break
      case "SMS":
        dummyDataModel.smsLimit = response.body.smsLimit
        dummyDataModel.currentSMSBalance = response.body.currentSMSBalance
        dummyDataModel.emailLimit = response.body.emailLimit
        dummyDataModel.currentEmailBalance = response.body.currentEmailBalance
        this.setState({
          notificationLoading: false,
          dataModel: dummyDataModel
        })
        this.resfreshDataModelStore(dummyDataModel)
        break
    }
    // return true
  }

  DashboardStored = async function (response, header) {
    var DashboardData = JSON.parse(await AsyncStorage.getItem('DashboardModel'));
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
      await AsyncStorage.setItem('DashboardModel', JSON.stringify(tempArray))
    } catch (error) {
      // Error saving data
    }
  }




  async postApiResponse(responseData) {
    //console.log(responseData, "dashBoard responseData")
    if (!this.state.unMount) {
      var response
      var queData
      var emptyInstitutFeeDetails = [
        {
          feeType: "",
          totalFee: '',
          overDueAmount: '',
          pendingAmount: '',
          collectedAmount: ''
        },
      ]
      await apiCall.functions.clearServiceToken('DashBoard')
      if (typeof responseData.header != 'undefined') {
        if (typeof responseData.header.status != 'undefined' && responseData.header.status != null && responseData.header.status == 'success') {
           datesBlacklist = [];
           dateswhitelist = [];
          if (responseData.header.businessEntity.length != 0) {
            this.dashBoardDataModel(responseData)
          }
          else {
            if (typeof responseData.body.institutFeeDetails == 'undefined' || responseData.body.institutFeeDetails.length == 0) {
              response = Object.assign({}, responseData.body)
              response.institutFeeDetails = emptyInstitutFeeDetails

              queData = await this.convetSummaryResultToTableData(response.pendingQueueMaster)

              this.setState({
                queData: queData,
                dataModel: response,
                isloading: false
              })
              this.DashboardStored(response, responseData.header)
            }
            else {

              queData = await this.convetSummaryResultToTableData(responseData.body.pendingQueueMaster)

              this.setState({
                queData: queData,
                dataModel: responseData.body,
                isloading: false
              })
              this.DashboardStored(responseData.body, responseData.header)
            }
          }

        }
        else if (typeof responseData.header.status != 'undefined' && responseData.header.status != null && responseData.header.status == 'error') {
          // starts NEAI2-266
          // this.setState({
          //    showAlert: true,
          //   isloading: false,
          //   [componentLoading]: false,
          //   error: responseData.error,
          //   errorType: 'BE',
          // })
          if (this.state.isloading) {
            this.setState({
              // showAlert: false,
              isloading: false,
              [componentLoading]: false,
              //  error: responseData.error,
              //  errorType: 'BE',
              //  error: [{ errorCode: '', errorMessage: '', errorParam: '' }],
              //  errorType: '',
            })
          }
          else {
            this.setState({
              showAlert: true,
              isloading: false,
              [componentLoading]: false,
              error: responseData.error,
              errorType: 'BE',
            })
          }
          // ends NEAI2-266
        }
      }

      else if (responseData.status == 'error') {
        // starts NEAI2-266
        //console.log(responseData, "else if")
        // this.setState({
        //    showAlert: true,
        //   isloading: false,
        //   [componentLoading]: false,
        //   error: responseData.error,
        //   errorType: 'BE',
        // })
        if (this.state.isloading) {
          this.setState({
            // showAlert: false,
            isloading: false,
            [componentLoading]: false,
            //  error: responseData.error,
            //  errorType: 'BE',
            //  error: [{ errorCode: '', errorMessage: '', errorParam: '' }],
            //  errorType: '',
          })
        }
        else {
          this.setState({
            showAlert: true,
            isloading: false,
            [componentLoading]: false,
            error: responseData.error,
            errorType: 'BE',
          })
        }
        // ends NEAI2-266
      }

    }
  }



  // convetSummaryResultToTableData(data) {
  //   var tableData = []
  //   for (let item of data) {
  //     rowdata = []
  //     rowdata.push(item.service)
  //     rowdata.push(item.operation)
  //     rowdata.push(item.count)
  //     tableData.push(rowdata);
  //   }
  //   return tableData

  // }
  convetSummaryResultToTableData(data) {
    var tableData = []
    if (data.length > 10) {
      for (let i = 0; i < 5; i++) {
        tableData.push(data[i])
      }
      return tableData
    }
    else {
      return data
    }
  }






  parentStateChange(object) {
    this.setState(
      object
    );
  }

  // starts NEW3.02
  // changefeeLayout = () => {
  //   LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  //   this.setState({ expandedfee: !this.state.expandedfee });
  // }

  // changeAttendenceLayout = () => {
  //   LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  //   this.setState({ expandedAttendence: !this.state.expandedAttendence });
  // }

  // changeQueueLayout = () => {
  //   LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  //   this.setState({ expandedQueue: !this.state.expandedQueue });
  // }
  // ends NEW3.02


  parentStateChange(object) {
    this.setState(
      object
    );
  }


  _feeDetailItem = ({ item, index }) => {
    const { currencyCode } = this.state
    return (
      <View key={index.toString()}  >
        <Card.Title title={item.feeType} />
        <Card.Content >
          <ListItem >
          <Image resizeMode='contain' style={[AppStyles.inactiveMoreIcon, AppStyles.voiletImgColor]}
                          source={require('./../../asssets/icons/fin003.png')}
                        />
            <ListItem.Content>

          <Text style={AppStyles.textColor}>Total fee</Text>
            </ListItem.Content>
          <View>
          <Text>{item.totalFee}</Text>
          <Caption style={AppStyles.currentTextStyle}>{currencyCode}</Caption>
          </View>

          </ListItem>
          <ListItem >
          <Image resizeMode='contain' style={[AppStyles.inactiveMoreIcon, AppStyles.primaryImgColor]}
                          source={require('./../../asssets/icons/gen037.png')}
                        />
            <ListItem.Content>
              <Text style={{ color: UiColor.LIGHT_TEXT_COLOR }}>Received</Text>
            </ListItem.Content>
            <View>
            <Text>{item.collectedAmount}</Text>
            <Caption style={AppStyles.currentTextStyle}>{currencyCode}</Caption>
          </View>
          </ListItem>
      
          <ListItem >
          <Image resizeMode='contain' style={[AppStyles.inactiveMoreIcon, AppStyles.errorImgColor]}
                          source={require('./../../asssets/icons/abs019.png')}
                        />
            <ListItem.Content>
              <Text style={{ color: UiColor.LIGHT_TEXT_COLOR }}>Pending</Text>
            </ListItem.Content>
            <View>
            <Text>{item.pendingAmount}</Text>
            <Caption style={AppStyles.currentTextStyle}>{currencyCode}</Caption>
            </View>
          </ListItem>
      
          <ListItem >
          <Image resizeMode='contain' style={[AppStyles.inactiveMoreIcon, AppStyles.errorImgColor]}
                          source={require('./../../asssets/icons/gen044.png')}
                        />
            <ListItem.Content>
              <Text style={{ color: UiColor.LIGHT_TEXT_COLOR }}>Overdue</Text>
            </ListItem.Content>
            <View>
            <Text>{item.overDueAmount}</Text>
            <Caption style={AppStyles.currentTextStyle}>{currencyCode}</Caption>
            </View>
          </ListItem>
          <Divider />
        </Card.Content>
      </View>
    );
  }

  get pagination() {
    const { activeFeesSlideIndex, dataModel } = this.state;
    return (
      <CarouselPagination
        dotsLength={dataModel.institutFeeDetails.length}
        activeDotIndex={activeFeesSlideIndex}
      />
    );
  }


  getPercentage(partialValue, totalValue) {
    if (totalValue != 0) {
      return (100 * partialValue) / totalValue;
    }
    else {
      return 0
    }

  }

  onClickViewAll() {
    const { dataModel } = this.state
    this.setState({
      queData: dataModel.pendingQueueMaster
    })
  }


  selectEvent = (date) => {
    const { dataModel } = this.state

    var selectedDate = moment(date).format('DD-MM-YYYY')
    var index;
    if (typeof dataModel!='undefined' && typeof dataModel.weeklyCalender!='undefined')
    {
    dataModel.weeklyCalender.findIndex(function (entry, i) {
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

  render() {
    const { dataModel, chartConfig, selectedTabIndex, isloading, attendenceLoading, feeLoading, calenderLoading, queueLoading, notificationLoading, unMount, selectedEventTabIndex } = this.state
    var totalFee = 0
    var totalOverDueAmount = 0
    var totalPendingAmount = 0
    var totalCollectedAmount = 0
    var feeData = []
    var teacherPresent = 0
    var studentPresent = 0
    var studentAttendenceData = []
    var teacherAttendenceData = []
    var tabheading = []

    if (unMount == false) {
      //  fee rendering logic
      for (let item of dataModel.institutFeeDetails) {
        totalFee = Number(item.totalFee.replace(/\,/g, '')) + totalFee
        totalOverDueAmount = Number(item.overDueAmount.replace(/\,/g, '')) + totalOverDueAmount
        totalPendingAmount = Number(item.pendingAmount.replace(/\,/g, '')) + totalPendingAmount
        totalCollectedAmount = Number(item.collectedAmount.replace(/\,/g, '')) + totalCollectedAmount
      }

      feeData = [
        {
          name: "% Received",
          amount: Math.round(this.getPercentage(totalCollectedAmount, totalFee)),
          color: UiColor.SUCCESS_COLOR,
          legendFontColor: UiColor.LIGHT_TEXT_COLOR,

        },
        {
          name: "% Pending",
          amount: Math.round(this.getPercentage(totalPendingAmount, totalFee)),

          color: UiColor.SKYBLUE,
          legendFontColor: UiColor.LIGHT_TEXT_COLOR,

        },
        {
          name: "% Overdue",
          amount: Math.round(this.getPercentage(totalOverDueAmount, totalFee)),
          color: UiColor.ERROR_COLOR,
          legendFontColor: UiColor.LIGHT_TEXT_COLOR,

        },
      ];

      // attendance rendering logic
      teacherPresent = Number(dataModel.totalTeachers) - Number(dataModel.teacherAttendance)
      studentPresent = Number(dataModel.totalStudents) - Number(dataModel.studentAttendance)

      studentAttendenceData = [
        {
          name: "% Present",
          attendence: Math.round(this.getPercentage(studentPresent, Number(dataModel.totalStudents))),
          color: UiColor.SUCCESS_COLOR,
          legendFontColor: UiColor.LIGHT_TEXT_COLOR,

        },
        {
          name: "% Leave",
          attendence: Math.round(this.getPercentage(Number(dataModel.studentAttendance), Number(dataModel.totalStudents))),
          color: UiColor.ERROR_COLOR,
          legendFontColor: UiColor.LIGHT_TEXT_COLOR,
        },
      ];

      teacherAttendenceData = [
        {
          name: "% Present",
          attendence: Math.round(this.getPercentage(teacherPresent, Number(dataModel.totalTeachers))),
          color: UiColor.SUCCESS_COLOR,
          legendFontColor: UiColor.LIGHT_TEXT_COLOR,
        },
        {
          name: "% Leave",
          attendence: Math.round(this.getPercentage(Number(dataModel.teacherAttendance), Number(dataModel.totalTeachers))),
          color: UiColor.ERROR_COLOR,
          legendFontColor: UiColor.LIGHT_TEXT_COLOR,
        },
      ];


      //  starts NEW3.03
      // var tabheading = []
      // for (let item of dataModel.weeklyCalender) {
      //   tabheading.push(`${item.date} ${GeneralUtils.functions.getDayName(item.date) != undefined && GeneralUtils.functions.getDayName(item.date)}`)
      // }
      // ends NEW3.03


      //var datesBlacklist = [];
      //var dateswhitelist = [];
      var customDatesStyle = []
      var dataModelDate = []
      for (let i = 0; i < dataModel.weeklyCalender.length; i++) {
        dataModelDate.push(dataModel.weeklyCalender[i].date)
      }



      var lastDate = dataModel.weeklyCalender[dataModel.weeklyCalender.length - 1]
      var startDate = moment(dataModel.weeklyCalender[0].date, 'DD-MM-YYYY')
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
      
    }

    console.log(this.state.dataModel)
    return unMount == false ? (<Provider>
      <View style={AppStyles.mainContainer}>
        <AppHeader
          
          stateObject={this}
        />
        <View style={AppStyles.container}>
          {/* <Card.Title title="Dashboard" subtitle="Menu / Dashboard" /> */}

          <View style={[AppStyles.row_space_between, AppStyles.alignItems]}>
            <View>
              <Title>Dashboard</Title>
            </View>
            {isloading && <ActivityIndicator color={AppStyles.ActivityIndicatorStyle.color} animating={isloading} />}
          </View>
          <Caption>Menu / Dashboard</Caption>



          {/* <TabScreen
            tabHeading={['Attendance', 'Fee', 'Weekly Events', 'Approval Queue']}
            stateObject={this}
            stateValue={'selectedTabIndex'}
            selectedStateValue={selectedTabIndex}
            barColor={UiColor.APP_BACKGROUND}

          /> */}

          <CustomTabScreen
            tabHeading={['Attendance', 'Fees']}
            otherTabHeading={['Weekly Events', 'Approval Queue']}
            stateObject={this}
            stateValue={'selectedTabIndex'}
            selectedStateValue={selectedTabIndex}
            barColor={UiColor.APP_BACKGROUND}
          />


          <Divider />
          <ScrollView
            onStartShouldSetResponder={() => true}
            bounces={false}
            showsVerticalScrollIndicator={false}
            ref='_scrollView'
            onContentSizeChange={() => { this.refs._scrollView.scrollTo({ x: 0, y: 0, animated: true }); }}
          >
            <View style={AppStyles.minHeight}>
              {selectedTabIndex == 0 && <View>
                <View style={AppStyles.marginTop_2}>
                  <Card>
                    {/* <Card.Title title="Student" subtitle="Attendance" /> */}
                    <Card.Content >
                      <View style={[AppStyles.row_space_between, AppStyles.alignItems]}>
                        <View>
                          <Title>Student Today Attendance</Title>
                        
                        </View>

                        {attendenceLoading ? <ActivityIndicator color={AppStyles.ActivityIndicatorStyle.color} animating={attendenceLoading} />
                          :
                          //  <TouchableOpacity
                          //   onPress={() => this.onClickRefreshBtn('attendenceLoading')}
                          //   style={AppStyles.refresh_btn}>
                          //   <Image
                          //     resizeMode="contain"
                          //     source={require("../../asssets/icons/refresh.png")}
                          //     style={AppStyles.refreshIcn}
                          //   />
                          // </TouchableOpacity>
                          //<SimpleLineIcons  onPress={() => this.onClickRefreshBtn('attendenceLoading')}
                           //name="refresh" size={AppStyles.iconSize.height} color={AppStyles.inactiveMoreIcon.tintColor} /> 
<MaterialCommunityIcons onPress={() => this.onClickRefreshBtn('attendenceLoading')}
                name="refresh" size={styles.iconSize.height} color={AppStyles.inactiveMoreIcon.tintColor} /> 


                           
                          }
                      </View>
                        <Caption style={AppStyles.textColor}>{'Click refresh icon to see the latest student attendance info'}</Caption>
                    </Card.Content>
                    <CustomPieChart
                      data={studentAttendenceData}
                      accessor="attendence"
                    />
                    <Card.Content >
                      {/* <Divider /> */}
                      <ListItem >
                        <Image resizeMode='contain' style={[AppStyles.inactiveMoreIcon, AppStyles.succusImgColor]}
                          source={require('./../../asssets/icons/com006.png')}
                        />
                        <ListItem.Content>
                          <Text style={AppStyles.textColor}>Total no of students</Text>
                        </ListItem.Content>
                        <Text>{dataModel.totalStudents}</Text>
                      </ListItem>
                      {/* <Divider /> */}
                      <ListItem >
                        <Image resizeMode='contain' style={[AppStyles.inactiveMoreIcon, AppStyles.errorImgColor]}
                          source={require('./../../asssets/icons/com006.png')}
                        />

                        <ListItem.Content>
                          <Text style={AppStyles.textColor}>No of students leave taken today</Text>
                        </ListItem.Content>
                        <Text>{dataModel.studentAttendance}</Text>
                      </ListItem>
                      {/* <Divider /> */}
                    </Card.Content>
                  </Card>
                </View>
                <View style={AppStyles.marginTop_2}>
                  <Card>
                    {/* <Card.Title title="Staff" subtitle="Attendance" /> */}
                    <Card.Content >

                      <View style={[AppStyles.row_space_between, AppStyles.alignItems]}>
                        <View>
                          <Title>Staff Today Attendance</Title>
                         
                        </View>

                        {attendenceLoading ? <ActivityIndicator color={AppStyles.ActivityIndicatorStyle.color} animating={attendenceLoading} />
                          : 
                          // <TouchableOpacity
                          //   onPress={() => this.onClickRefreshBtn('attendenceLoading')}
                          //   style={AppStyles.refresh_btn}>
                          //   <Image
                          //     resizeMode="contain"
                          //     source={require("../../asssets/icons/refresh.png")}
                          //     style={AppStyles.refreshIcn}
                          //   />
                          // </TouchableOpacity>
                          //<SimpleLineIcons  onPress={() => this.onClickRefreshBtn('attendenceLoading')}
                          //name="refresh" size={AppStyles.iconSize.height} color={AppStyles.inactiveMoreIcon.tintColor} /> 
                          <MaterialCommunityIcons onPress={() => this.onClickRefreshBtn('attendenceLoading')}
                name="refresh" size={styles.iconSize.height} color={AppStyles.inactiveMoreIcon.tintColor} /> 
                          }
                      </View>
                       <Caption style={AppStyles.textColor}>{'Click refresh icon to see the latest staff attendance info'}</Caption>
                    </Card.Content>
                    <CustomPieChart
                      data={teacherAttendenceData}
                      accessor="attendence"
                    />

                    <Card.Content >
                 
                      <ListItem >
                      <Image resizeMode='contain' style={[AppStyles.inactiveMoreIcon, AppStyles.succusImgColor]}
                          source={require('./../../asssets/icons/com006.png')}
                        />
                        <ListItem.Content>
                          {/* <ListItem.Title style={{ color: '#B5B5C3'}}>Total no of students</ListItem.Title> */}
                          <Text style={AppStyles.textColor}>Total no of staffs</Text>
                        </ListItem.Content>
                        <Text>{dataModel.totalTeachers}</Text>

                      </ListItem>
          
                      <ListItem >
                      
                      <Image resizeMode='contain' style={[AppStyles.inactiveMoreIcon, AppStyles.errorImgColor]}
                          source={require('./../../asssets/icons/com006.png')}
                        />
            
                        <ListItem.Content>
                          <Text style={AppStyles.textColor}>No of staffs leave taken today</Text>
                        </ListItem.Content>
                        <Text>{dataModel.teacherAttendance}</Text>
                      </ListItem>

                    </Card.Content>

                  </Card>
                </View>
              </View>}


              {selectedTabIndex == 1 && <View>
                <View style={AppStyles.marginTop_2}>
                  <Card>
                    {/* <Card.Title title="Overview" /> */}
                    <Card.Content >
                      <View style={[AppStyles.row_space_between, AppStyles.alignItems]}>
                        <View>
                          <Title>Overview</Title>
                          {/* <Caption>{'Fee'}</Caption> */}
                        </View>

                        {feeLoading ? <ActivityIndicator color={AppStyles.ActivityIndicatorStyle.color} animating={feeLoading} />
                          :
                          // <TouchableOpacity
                          //   onPress={() => this.onClickRefreshBtn('feeLoading')}
                          //   style={AppStyles.refresh_btn}>
                          //   <Image
                          //     resizeMode="contain"
                          //     source={require("../../asssets/icons/refresh.png")}
                          //     style={AppStyles.refreshIcn}
                          //   />
                          // </TouchableOpacity>
                          //<SimpleLineIcons  onPress={() => this.onClickRefreshBtn('feeLoading')}
                          //name="refresh" size={AppStyles.iconSize.height} color={AppStyles.inactiveMoreIcon.tintColor} /> 
                          <MaterialCommunityIcons onPress={() => this.onClickRefreshBtn('feeLoading')}
                name="refresh" size={styles.iconSize.height} color={AppStyles.inactiveMoreIcon.tintColor} /> 
                          }
                      </View>
                    </Card.Content>
                    <CustomPieChart
                      data={feeData}
                      accessor="amount"
                    />

                  </Card>
                </View>

                <View style={AppStyles.marginTop_2}>
                  <Card>
                  <Card.Content>
                    {/*{this.pagination}
                    <Carousel
                      ref={(c) => { this._carousel = c; }}
                      data={dataModel.institutFeeDetails}
                      //autoplay
                      //loop
                      renderItem={this._feeDetailItem}
                      sliderWidth={AppStyles.carouselWidth.width}
                      itemWidth={AppStyles.carouselWidth.width}
                      onSnapToItem={(index) => this.setState({ activeFeesSlideIndex: index })}
                    />*/}
                       <View >
                          <Subheading style={AppStyles.textColor}>Fees Breakup</Subheading>
                        </View>

                        <CustomCarousel
                          stateObject={this}
                          data={dataModel.institutFeeDetails}
                          renderItem={this._feeDetailItem}
                          activeSlideIndexStateName={'activeFeesSlideIndex'}
                          activeSlideIndex={this.state.activeFeesSlideIndex}
                        />
                     </Card.Content>
                  </Card>
                </View>
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
                        : 
                        // <TouchableOpacity
                        //   onPress={() => this.onClickRefreshBtn('calenderLoading')}
                        //   style={AppStyles.refresh_btn}>
                        //   <Image
                        //     resizeMode="contain"
                        //     source={require("../../asssets/icons/refresh.png")}
                        //     style={AppStyles.refreshIcn}
                        //   />
                        // </TouchableOpacity>
                        //<SimpleLineIcons  onPress={() => this.onClickRefreshBtn('calenderLoading')}
                        //name="refresh" size={AppStyles.iconSize.height} color={AppStyles.inactiveMoreIcon.tintColor} /> 
                        <MaterialCommunityIcons onPress={() => this.onClickRefreshBtn('calenderLoading')}
                name="refresh" size={styles.iconSize.height} color={AppStyles.inactiveMoreIcon.tintColor} /> 
                        }
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

                  <Card.Content>
                    {dataModel.weeklyCalender[selectedEventTabIndex].eventArray.length != 0 ? dataModel.weeklyCalender[selectedEventTabIndex].eventArray.map((item, index) => (
                      <View key={index.toString()} style={[AppStyles.eventContainer, { borderLeftColor: GeneralUtils.functions._getRandomColor(index) }]}>
                        <View ><Title>{item.eventType}</Title></View>
                        {item.eventAttributes.map((l, i) => (
                          <View key={i.toString()} style={[AppStyles.flexDirectionRow, AppStyles.marginTop_1]}>
                            <Text style={AppStyles.attrNameStyle}>{l.attrName}</Text>
                            <Text style={AppStyles.attrValueStyle}>{l.attrValue}</Text>
                          </View>))
                        }
                      </View>))
                      : <View style={[AppStyles.alignItems, AppStyles.marginTop_3]}><Caption>No events scheduled for this date</Caption></View>}
                  </Card.Content >
                </Card>
              </View>}


              {selectedTabIndex == 3 && <View>
                <View style={AppStyles.marginTop_2}>
                  <Card>
                    <Card.Content >
                      {/* <Card.Title title="Approval" subtitle={`Total ${dataModel.pendingQueueMaster.length} tasks in pending queue`} /> */}
                      <View style={[AppStyles.row_space_between, AppStyles.alignItems]}>
                        <View style={[AppStyles.width85]}>
                          <Title>Operations pending for approval</Title>
                        </View>
                        <View style={AppStyles.marginLeft_2}>
                          {queueLoading ? <ActivityIndicator color={AppStyles.ActivityIndicatorStyle.color} animating={queueLoading} />
                            : 
                            // <TouchableOpacity
                            //   onPress={() => this.onClickRefreshBtn('queueLoading')}
                            //   style={AppStyles.refresh_btn}>
                            //   <Image
                            //     resizeMode="contain"
                            //     source={require("../../asssets/icons/refresh.png")}
                            //     style={AppStyles.refreshIcn}
                            //   />
                            // </TouchableOpacity>
                            //<SimpleLineIcons  onPress={() => this.onClickRefreshBtn('queueLoading')}
                            //name="refresh" size={AppStyles.iconSize.height} color={AppStyles.inactiveMoreIcon.tintColor} /> 
                            <MaterialCommunityIcons onPress={() => this.onClickRefreshBtn('queueLoading')}
                name="refresh" size={styles.iconSize.height} color={AppStyles.inactiveMoreIcon.tintColor} /> 
                            }
                        </View>
                      </View>
                      <Caption>{`Total ${dataModel.pendingQueueMaster.length} operations pending`}</Caption>


                    </Card.Content >
                    <Card.Content>
                      <ListView
                        mapValue1={['service']}
                        mapValue2={['operation']}
                        mapValue3={['count']}
                        // stateArray={this.state.queData}
                        stateArray={dataModel.pendingQueueMaster}
                      />
                    </Card.Content >
                  </Card>
                </View>
              </View>
              }
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
        {/* {isLoading &&
    <Spinner loading={isLoading} />
  } */}

      </View>
      {/* </TouchableWithoutFeedback> */}
    </Provider>
    ) : null
  }
}
const styles = StyleSheet.create({
  
  
  iconSize:{
    height:h('4%')
  }
})


export default Dashboard;


