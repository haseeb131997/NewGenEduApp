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
import { View, StyleSheet, TouchableOpacity, LayoutAnimation, Platform, UIManager } from 'react-native';
import { Text, Divider, Caption } from 'react-native-paper';
import { w, h } from "../../../../utils/Dimensions";
import SelectListUtils from '../../../../utils/SelectListUtils'
import AppStyles from "../../../../AppStyles/AppStyles";
import { UiColor } from "../../../../theme";
import Paggination from "../../../../utils/Paggination";
import SuggestionTextInput from '../../../../components/SuggestionTextInput';
import SearchUtils from "../../../../utils/SearchUtils";
import InputText from '../../../../components/InputText';
import NewScreenDropDownPicker from '../../../../components/NewScreenDropDownPicker';
import SuggestionList from '../../../../components/SuggestionList';
import cloneDeep from 'lodash/cloneDeep';







var tableHeading = []
var periodList = []
var heading = ''

var selectedIndex = 0

class ClassTimeTableDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      selectedPeriodIndex: 0,
      selectedDay: 0
    }
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    this.changeLayout = this.changeLayout.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onSelectDay = this.onSelectDay.bind(this)
    this.postSuggestionListresultClick = this.postSuggestionListresultClick.bind(this)
  }

  changeLayout = (index) => {
    if (this.state.selectedPeriodIndex == index) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      this.setState({ selectedPeriodIndex: null });
    }
    else {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      this.setState({ selectedPeriodIndex: index });
    }

  }


  postSuggestionListresultClick(data) {
    const { stateObject } = this.props
    const { dataModel } = stateObject.state
    const dummyTimeTable = cloneDeep(dataModel)

    periodList[0].period[selectedIndex].teacherName = data.TeacherName;
    periodList[0].period[selectedIndex].teacherID = data.TeacherId;
    for (let item of dummyTimeTable.timeTable) {
      if (item.day == periodList.day) {
        item = periodList
      }
    }

  }

  delete(index) {
    const { stateObject } = this.props
    const { dataModel } = stateObject.state
    const dummyTimeTable = cloneDeep(dataModel)
    periodList[0].period[index].teacherName = "";
    periodList[0].period[index].teacherID = "";
    for (let item of dummyTimeTable.timeTable) {
      if (item.day == periodList.day) {
        item = periodList
      }
    }
    stateObject.parentStateChange({ dataModel: dataModel })

  }





  onSubmit() {
    const {
      stateObject,
    } = this.props
    stateObject.state.dataModel.timeTable[this.state.selectedDay].period[Paggination.functions.selectedIndex] = stateObject.state.periodTimingsEmptyrecord
    stateObject.parentStateChange({
      dataModel: stateObject.state.dataModel,
      secondModalVisible: false
    })
    Paggination.functions.selectedIndex = null
  }







  onSelectDay(index) {
    this.setState({
      selectedDay: index,
      selectedPeriodIndex: 0
    })
  }






  render() {
    const {
      stateObject,
      currentIndex
    } = this.props

    const { dataModel, editable, periodTimingsEmptyrecord, errorField } = stateObject.state
    const { parentStateChange, } = stateObject




    const tabHeading = ["Mon", "Tue", "Wed", "Thu", "Fri", 'Sat', "Sun",]

    if (tableHeading.length == 0) {
      for (let item of tabHeading) {
        for (let val of dataModel.timeTable)
          if (item == val.day) {
            tableHeading.push(val.day)
            // temArry.push(val)
          }
      }
    }

    periodList = dataModel.timeTable.filter(data => Number(data.dayNumber) == (this.state.selectedDay + 1))


    return (
      <View>
        <View style={AppStyles.row_in_space_around}>
          {tableHeading.map((item, index) => (
            <TouchableOpacity key={index.toString()}
              onPress={() => this.onSelectDay(index)}

              style={[AppStyles.marginTop_2, { backgroundColor: this.state.selectedDay == index ? UiColor.SKYBLUE : UiColor.WHITE }, styles.dayContainer]}>
              <Text style={{ color: this.state.selectedDay == index ? UiColor.WHITE : UiColor.SKYBLUE }}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <Divider style={AppStyles.marginTop_1} />
        <View>
          {periodList.length != 0 && periodList[0].period.map((item, index) => (
            <View key={index.toString()} style={Platform.OS === 'ios' ? { zIndex: 3000 - index } : {}} >
              <View style={[AppStyles.marginTop_2,]}>
                <View
                  style={styles.periodTimeContainer}>
                  <Text style={{ color: UiColor.SKYBLUE }}>Period {item.periodNumber}</Text>
                  <Caption style={{ color: UiColor.SKYBLUE }}>{item.startTime.hour}:{item.startTime.min} - {item.endTime.hour}:{item.endTime.min}</Caption>
                </View>
                <View style={AppStyles.marginTop_2}>
                  {/* <Subheading>{item.startTime.hour}:{item.startTime.min} - {item.endTime.hour}:{item.endTime.min}</Subheading> */}

                  <SuggestionTextInput
                    required={true}
                    editable={false}
                    label={'Teacher Name'}
                    placeholder={'Select teacher name'}
                    secureTextEntry={false}
                    value={item.teacherName}
                    onFocus={() => {
                      selectedIndex = index
                      SearchUtils.functions.launchSuggestion(stateObject, '', 'teacherName')
                    }
                    }
                    onClear={() => this.delete(index)}
                  />
                  <View style={[AppStyles.marginTop_1]}>
                    <InputText
                      required={true}
                      editable={false}
                      label={'Teacher ID'}
                      value={item.teacherID}
                    />
                  </View>
                  {console.log(item)}

                  <View>
                    <NewScreenDropDownPicker
                      editable={false}
                      required={true}
                      label={'Subject'}
                      stateObject={stateObject}
                      items={SelectListUtils.functions.selectMaster.SubjectMaster}
                      value={SelectListUtils.functions.getSelectedValue(SelectListUtils.functions.selectMaster.SubjectMaster, item.subjectID)}
                      placeholder="Select Subject"
                      onChangeValue={(value) => {
                        item.subjectID = value;
                        parentStateChange({ dataModel: dataModel })
                      }}
                      dropdownName={`subjectDropdown${index}`}
                      subHeadingRecordName="a subject"
                      onClear={() => {
                        item.subjectID = '';
                        parentStateChange({ dataModel: dataModel })
                      }}
                    // errorMessage={GeneralUtils.functions.getErrorMessage('field8', periodTimingsEmptyrecord.subjectID, errorField, [], 'Subject')}
                    />
                  </View>


                </View>
              </View>
              {(periodList.length - 1) == index && <Divider style={[AppStyles.marginVertical_1]} />}
            </View>
          ))}
        </View>
        {/* {(stateObject.state.currentOperation == "Create" || stateObject.state.currentOperation == "Modification") &&  <Text>{'\n \n \n \n \n \n \n \n \n'}</Text>} */}

        <SuggestionList
          stateObject={stateObject}
          searchFieldName={stateObject.state.searchFieldName}
          searchText={stateObject.state.searchText}
          visible={stateObject.state.seachVisible}
          searchName={'teacherPostSuggestion'}
          colHeading={['Name', 'Id',]}
          mapping={['TeacherName', 'TeacherId',]}
          postSuggestionListresultClick={this.postSuggestionListresultClick}
          SuggestionHeading={'Teacher'}
        />


      </View>
    );
  }
}

const styles = StyleSheet.create({
  listHeading: {
    width: '40%', color: UiColor.LIGHT_TEXT_COLOR
  },
  listValue: {
    width: '60%', color: UiColor.BLACK
  },
  dayContainer: {
    height: h('7.5%'), width: w('10%'), borderRadius: h('10%'), alignItems: "center", justifyContent: 'center'
  },
  periodTimeContainer: {
    backgroundColor: UiColor.LIGHT_BLUE, borderRadius: h('1%'), alignItems: "center", justifyContent: 'center', padding: h('1%')
  }
})
export default ClassTimeTableDetails;

