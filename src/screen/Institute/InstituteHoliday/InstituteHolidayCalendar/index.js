
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


import React, { Component } from "react";
import { View, StyleSheet, Image, ScrollView } from 'react-native';
import { TextInput, Card, Text, Divider } from 'react-native-paper';
import { w, h } from "../../../../utils/Dimensions";
import { UiColor } from "../../../../theme";
import AppStyles from "../../../../AppStyles/AppStyles";
import CalendarPicker from 'react-native-calendar-picker';
import moment from "moment";
import cloneDeep from 'lodash/cloneDeep';
// import {Calendar} from 'react-native-calendars';
import ImpNotes from '../../../../components/ImpNotes';






var changeColor = '';


class InstituteHolidayCalendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      currentIndex: 1,
      selectedStartDate: new Date(`${this.props.stateObject.state.dataModel.year}-${this.props.stateObject.state.dataModel.month}-1`),
      selectedDateColor: '#000',
    }
    this.onDateChange = this.onDateChange.bind(this)
  }


  componentDidMount() {
    const { stateObject } = this.props
    const { customDatesStyles, dataModel } = stateObject.state
    var currentColor = ''
    for (let item of customDatesStyles) {
      if (moment(item.date).format('YYYY-MM-DD') == `${dataModel.year}-${dataModel.month}-01`) {
        currentColor = item.style.backgroundColor
        break
      }
    }
    this.setState({
      selectedDateColor: currentColor,
      selectedStartDate: `${dataModel.year}-${dataModel.month}-1`
    }, () => { })
  }



  onDateChange(date) {
    console.log(date)
    const { stateObject } = this.props
    const { dataModel, editable, customDatesStyles, currentOperation } = stateObject.state
    const { parentStateChange } = stateObject
    var i = 0
    var selectedDateindex = 0
    var dummyCustomDatesStyles = cloneDeep(customDatesStyles)
    var clickDate = new Date(date)
    var hol = dataModel.holiday;
    String.prototype.replaceAt = function (index, replacement) {
      return this.substr(0, index) + replacement + this.substr(index + replacement.length);
    }


    switch (hol.substr(clickDate.getDate() - 1, 1)) {
      case "F":
        hol = hol.replaceAt(clickDate.getDate() - 1, "A");
        for (let item of dummyCustomDatesStyles) {
          if (moment(item.date).format('YYYY-MM-DD') == moment(clickDate).format('YYYY-MM-DD')) {
            item.style = { backgroundColor: UiColor.SKYBLUE }
            selectedDateindex = i
            changeColor = UiColor.SKYBLUE
            break
          }
          i++
        }

        break;
      case "A":
        hol = hol.replaceAt(clickDate.getDate() - 1, "W");
        for (let item of dummyCustomDatesStyles) {
          if (moment(item.date).format('YYYY-MM-DD') == moment(clickDate).format('YYYY-MM-DD')) {
            item.style = { backgroundColor: UiColor.SUCCESS_COLOR }
            selectedDateindex = i
            changeColor = UiColor.SUCCESS_COLOR
            break
          }
          i++
        }
        break
      case "W":
        hol = hol.replaceAt(clickDate.getDate() - 1, "H");
        for (let item of dummyCustomDatesStyles) {
          if (moment(item.date).format('YYYY-MM-DD') == moment(clickDate).format('YYYY-MM-DD')) {
            item.style = { backgroundColor: UiColor.ERROR_COLOR }
            selectedDateindex = i
            changeColor = UiColor.ERROR_COLOR

            break
          }
          i++
        }


        break
      case "H":
        hol = hol.replaceAt(clickDate.getDate() - 1, "F");
        for (let item of dummyCustomDatesStyles) {
          if (moment(item.date).format('YYYY-MM-DD') == moment(clickDate).format('YYYY-MM-DD')) {
            item.style = { backgroundColor: UiColor.WARNING_COLOR }
            selectedDateindex = i
            changeColor = UiColor.WARNING_COLOR
            break
          }
          i++
        }
        break

    }

    dataModel.holiday = hol
    parentStateChange({
      //  selectedDateColor:changeColor,
      selectedDateindex: selectedDateindex,
      dataModel: dataModel,
      customDatesStyles: dummyCustomDatesStyles
    })
    this.setState({
      selectedDateColor: changeColor,
      selectedStartDate: clickDate
    })


  }











  render() {
    const {
      stateObject,
      currentIndex
    } = this.props
    const { dataModel, editable, customDatesStyles } = stateObject.state
    const { parentStateChange } = stateObject
    var initialDate = moment(`${dataModel.year}-${dataModel.month}-1`, 'YYYY-MM-DD').format('YYYY-MM-DD')
    // start SHA001
    var startDate = moment(`${dataModel.year}-${dataModel.month}-1`, 'YYYY-MM-DD')
    var endOfmonth = startDate.clone().endOf('month')
    // end SHA001


    return (
      <View >
        <CalendarPicker
          enableDateChange={!editable}
          selectedStartDate={new Date(this.state.selectedStartDate)}
          startFromMonday={true}
          previousTitle=" "
          nextTitle=" "
          restrictMonthNavigation={true}
          allowRangeSelection={false}
          allowBackwardRangeSelect={false}
          selectedDayTextColor={'#fff'}
          // selectedDayColor={this.state.selectedDateColor}
          selectedDayStyle={{ backgroundColor: this.state.selectedDateColor }}
          customDatesStyles={customDatesStyles}
          initialDate={initialDate}
          minDate={initialDate}
          maxDate={endOfmonth}
          onDateChange={(date) => this.onDateChange(date)}
        />

        <View style={AppStyles.marginTop_2}>
          <View style={AppStyles.holidayMainContainer}>
            <View style={AppStyles.workingdayContainer} />
            <Text style={[AppStyles.textColor, AppStyles.marginLeft_1]}>Working Day</Text>
          </View>

          <View style={AppStyles.holidayMainContainer}>
            <View style={AppStyles.holidayContainer} />
            <Text style={[AppStyles.textColor, AppStyles.marginLeft_1]}>Holiday</Text>
          </View>

          <View style={AppStyles.holidayMainContainer}>
            <View style={AppStyles.forenoonContainer} />
            <Text style={[AppStyles.textColor, AppStyles.marginLeft_1]}>Halfday-ForeNoon Holiday</Text>
          </View>

          <View style={AppStyles.holidayMainContainer}>
            <View style={AppStyles.afternoonContainer} />
            <Text style={[AppStyles.textColor, AppStyles.marginLeft_1]}>Halfday-AfterNoon Holiday</Text>
          </View>
        </View>

       {(stateObject.state.currentOperation == 'Create' || stateObject.state.currentOperation == 'Modification') && <ImpNotes
          isArray={false}
          message={`Click at the desired day to toggle the holiday status`}
        />}

      </View>
    );
  }
}

const styles = StyleSheet.create({
  // start SHA002
  textStyle: {

    //  fontSize:h(2)
  }
  //  end SHA002
})
export default InstituteHolidayCalendar;

