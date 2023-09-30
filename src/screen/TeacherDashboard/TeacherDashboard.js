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
import { Portal, Provider, Card, Title, Caption, Text, ProgressBar, ActivityIndicator, Divider, Subheading, } from 'react-native-paper';
import { h, w } from "../../utils/Dimensions";
import AppHeader from "../../components/AppHeader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import apiCall from "../../ApiCall/ActionApi";
import Spinner from '../../components/Loader';
import AlertBox from '../../components/AlertBox';
import GeneralUtils from "../../utils/GeneralUtils";
import AppStyles from "../../AppStyles/AppStyles";
import TabScreen from '../../components/TabScreen';
import moment from "moment";
import cloneDeep from 'lodash/cloneDeep';
import axios from "axios";
import { LineChart, BarChart, } from "react-native-chart-kit";
import Exception from '../../utils/Exception'
import Footer from '../../components/Footer';
import CustomCalendar from '../../components/CustomCalendar';
import WelComeModal from '../../components/WelComeModal';
import { ListItem } from 'react-native-elements';
import CustomCarousel from '../../components/CustomCarousel';
import { Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width;


var datesBlacklist = [];
var dateswhitelist = [];
var componentLoading = 'attendenceLoading'
class TeacherDashboard extends Component {
  // static onEnter() {
  //   const c = Actions.refs.TeacherDashboard;
  //   c.setMount(false);
  // }

  // static onExit() {
  //   const c = Actions.refs.TeacherDashboard;
  //   c.setUnmount(true);
  // }
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      selectedTabIndex: 0,
      dataModel: {
        userID: "",
        selfAttendance: [
          {
            year: "",
            month: "",
            attendanceDetails: [
              {
                no_OfDaysPresent: "",
                no_ofDaysLeave: "",
                workingDays: "",
                percentage: ""
              }
            ]
          },
        ],
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
        userID: "",
        selfAttendance: [
          {
            year: "",
            month: "",
            attendanceDetails: [
              {
                no_OfDaysPresent: "",
                no_ofDaysLeave: "",
                workingDays: "",
                percentage: ""
              }
            ]
          },
        ],
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
      calenderLoading: false,

      numColumns: 2,
      orientationValue: false,
      showAlert: false,
      queData: [],
      unMount: false,

      // 
      select_Date: moment(),
      selectedEventTabIndex: 0,
      showWelcomeModal: false,
      activeAttendanceSlideIndex: 0,
      // 
      chartConfig: {
        backgroundGradientFrom: "#fff",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#fff",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        labelColor: (opacity = 0.5) => `rgba(235, 60, 100, ${opacity})`,
        // strokeWidth: 3, // optional, default 3
        // barPercentage: 0.5,
        useShadowColorFromDataset: false // optional

      },
    
    }
    this.postApiResponse = this.postApiResponse.bind(this)
    this.parentStateChange = this.parentStateChange.bind(this)
    this.setUnmount = this.setUnmount = this.setUnmount.bind(this)
    this.setMount = this.setMount = this.setMount.bind(this)

  }


  // starts NEW3.01
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

  //  -----Load finction -----------

  DashBoardCalling = async () => {
    try {
      const { dataModel, emptyDataModel } = this.state
      var userId = ''
      var globalData = JSON.parse(await AsyncStorage.getItem('GLOBAL'));
      var DashboardModel = JSON.parse(await AsyncStorage.getItem('TeacherDashboardModel'));

      if (globalData != null) {
        userId = globalData.userID
      }

      var dummyDataModel = cloneDeep(dataModel)
      dummyDataModel.userID = userId
      var apiObject = {
        serviceName: 'TeacherDashBoard',
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
      case 'calenderLoading':
        return 'WeeklyCalendar'
      default:
        return ''
    }
  }



  onClickRefreshBtn = async (loading) => {
    try {
      const { dataModel } = this.state
      var userId = ''
      var globalData = JSON.parse(await AsyncStorage.getItem('GLOBAL'));
      if (globalData != null) {
        userId = globalData.userID
      }

      var dummyDataModel = cloneDeep(dataModel)
      dummyDataModel.userID = userId
      var apiObject = {
        serviceName: 'TeacherDashBoard',
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
        if (this.state.attendenceLoading || this.state.calenderLoading) {
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
    var DashboardModel = JSON.parse(await AsyncStorage.getItem('TeacherDashboardModel'));
    for (let j = 0; j < DashboardModel.length; j++) {
      if (globalData.userID == DashboardModel[j].userID && globalData.instituteID == DashboardModel[j].instituteID) {
        DashboardModel[j].dataModel = response
        break
      }
    }
    try {
      await AsyncStorage.setItem('TeacherDashboardModel', JSON.stringify(DashboardModel))
    } catch (error) {
      // Error saving data
    }


  }

  dashBoardDataModel = async function (response) {
    var value = response.header.businessEntity[0].entityValue
    var dummyDataModel = cloneDeep(this.state.dataModel)
    switch (value) {
      case "Attendance":
        dummyDataModel.selfAttendance = response.body.selfAttendance
        this.setState({
          attendenceLoading: false,
          dataModel: dummyDataModel
        })
        this.resfreshDataModelStore(dummyDataModel)
        break

      case "WeeklyCalendar":
        dummyDataModel.weeklyCalender = response.body.weeklyCalender
        this.setState({
          calenderLoading: false,
          dataModel: dummyDataModel
        })
        this.resfreshDataModelStore(dummyDataModel)
        break
    }
    // return true
  }

  DashboardStored = async function (response, header) {
    var DashboardData = JSON.parse(await AsyncStorage.getItem('TeacherDashboardModel'));
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
      await AsyncStorage.setItem('TeacherDashboardModel', JSON.stringify(tempArray))
    } catch (error) {
      // Error saving data
    }
  }


  async postApiResponse(responseData) {
    if (!this.state.unMount) {
      await apiCall.functions.clearServiceToken('TeacherDashboard')
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
            //   await AsyncStorage.setItem('TeacherDashboardModel', JSON.stringify(responseData.body))
            // } catch (error) {
            //   // Error saving data
            // }
          }
        }
        else if (typeof responseData.header.status != 'undefined' && responseData.header.status != null && responseData.header.status == 'error') {

          if (this.state.isloading) {
            this.setState({
              isloading: false,
              [componentLoading]: false,

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

        }
      }
      else if (responseData.status == 'error') {

        if (this.state.isloading) {
          this.setState({
            isloading: false,
            [componentLoading]: false,

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

      }
    }
  }






  // changeLayout = () => {
  //   LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  //   this.setState({ expanded: !this.state.expanded });
  // }




  parentStateChange(object) {
    this.setState(
      object
    );

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
        // return true;
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
  
  


  _attendanceDetailItem = ({ item, index }) => {
    return (

      <View key={index.toString()}>
        <Title>{GeneralUtils.functions.getMonthName(item.month) != undefined ? `${GeneralUtils.functions.getMonthName(item.month)}-${item.year.slice(-2)}` : ''}</Title>
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
          <Text>{item.attendanceDetails[0].no_ofDaysLeave}</Text>
        </ListItem>
      </View>
    )
  }



  render() {
    const { dataModel, isloading, selectedTabIndex, unMount, attendenceLoading, calenderLoading, selectedEventTabIndex } = this.state
    var labels = []
    var datasets = []
    var tabheading = []
    var data = {}
    if (unMount == false) {
      for (let item of dataModel.selfAttendance) {
        labels.push(GeneralUtils.functions.getMonthName(item.month) != undefined ? `${GeneralUtils.functions.getMonthName(item.month)}-${item.year.slice(-2)}` : '')
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
      // for (let item of dataModel.weeklyCalender) {
      //   tabheading.push(`${item.date} ${GeneralUtils.functions.getDayName(item.date) != undefined && GeneralUtils.functions.getDayName(item.date)}`)
      // }


     
      //var customDatesStyle = []
      var dataModelDate = []
      for (let i = 0; i < dataModel.weeklyCalender.length; i++) {
        dataModelDate.push(dataModel.weeklyCalender[i].date)
      }
console.log('dataModel.weeklyCalender',dataModel.weeklyCalender)
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
    console.log('startDate',startDate)
    console.log('enddate',enddate)
    


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

          <TabScreen
            tabHeading={['Attendance', 'Weekly Events']}
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
                    <Card.Content >
                    <ScrollView horizontal={true}> 
                      <BarChart
                        // style={graphStyle}
                        data={data}
                       // width={AppStyles.barChartWidth.width}
                       width={screenWidth}
                        height={AppStyles.barChartHeight.height}
                        yAxisSuffix="%"
                        fromZero={true}
                        chartConfig={this.state.chartConfig}
                        verticalLabelRotation={28}
                        showValuesOnTopOfBars={true}
                      />
                     </ScrollView> 
                    </Card.Content>
                    {/* <Divider /> */}
                    {/* <Card.Content >
                      {dataModel.selfAttendance.map((item, index) => (
                        <View key={index.toString()} style={[AppStyles.eventContainer, { borderLeftColor: GeneralUtils.functions._getRandomColor(index) }]}>
                          <View style={[]}>
                            <Subheading>{GeneralUtils.functions.getMonthName(item.month) != undefined ? `${GeneralUtils.functions.getMonthName(item.month)}-${item.year.slice(-2)}` : ''}</Subheading>
                            <View style={[AppStyles.flexDirectionRow, AppStyles.marginTop_1]}>
                              <Text style={AppStyles.attrNameStyle}>Working Days</Text>
                              <Text style={AppStyles.attrValueStyle}>{item.attendanceDetails[0].workingDays}</Text>
                            </View>
                            <View style={[AppStyles.flexDirectionRow, AppStyles.marginTop_1]}>
                              <Text style={AppStyles.attrNameStyle}>Present</Text>
                              <Text style={AppStyles.presentValueStyle}>{item.attendanceDetails[0].no_OfDaysPresent}</Text>
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
                      <Card.Content>
                        <View >
                          <Subheading style={AppStyles.textColor}>Month wise details</Subheading>
                        </View>

                        <CustomCarousel
                          stateObject={this}
                          data={dataModel.selfAttendance}
                          renderItem={this._attendanceDetailItem}
                          activeSlideIndexStateName={'activeAttendanceSlideIndex'}
                          activeSlideIndex={this.state.activeAttendanceSlideIndex}
                        />


                      </Card.Content>
                    </Card>

                  </View>

                </View>

              </View>}
              {selectedTabIndex == 1 && <View style={AppStyles.marginTop_2}>
                <Card>
                  <Card.Content >
                    <View style={[AppStyles.row_space_between, AppStyles.alignItems]}>
                      <View>
                        <Title>Weekly</Title>
                        <Caption>{'Schedule'}</Caption>
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
                    selectedDate={this.state.select_Date}
                    maxDate={enddate}
                    minDate={startDate}
                    startingDate={startDate}
                    datesBlacklist={datesBlacklist}
                    dateswhitelist={dateswhitelist}
                  />

                  <Card.Content >
                    {(typeof dataModel.weeklyCalender[selectedEventTabIndex]!=='undefined' && typeof dataModel.weeklyCalender[selectedEventTabIndex].eventArray!== 'undefined' && dataModel.weeklyCalender[selectedEventTabIndex].eventArray.length>0) && dataModel.weeklyCalender[selectedEventTabIndex].eventArray.map((item, index) => (
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

       {(typeof dataModel.weeklyCalender[selectedEventTabIndex] == 'undefined' || typeof dataModel.weeklyCalender[selectedEventTabIndex].eventArray =='undefined' ||dataModel.weeklyCalender[selectedEventTabIndex].eventArray.length==0) && (
                      <View style={[AppStyles.alignItems, AppStyles.marginTop_3]}><Caption>No events scheduled for this date</Caption></View>)
                    }
                  </Card.Content >
                </Card>
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
        {/* {isLoading &&
  <Spinner loading={isLoading} />
} */}

      </View>
    </Provider>
    ) : null;
  }
}



export default TeacherDashboard;

