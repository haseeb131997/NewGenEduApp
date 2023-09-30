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

/* * * Change Tag:SHA001
 Change Desc: add property for iPad and Tablet style in dropdown
 Changed By : Shashank
 Date:22-12-2020 
 */

import React, { Component } from "react";
import { View, StyleSheet, Platform } from 'react-native';
import { Text } from 'react-native-paper';
import AppStyles from "../../../../AppStyles/AppStyles";
import SearchUtils from "../../../../utils/SearchUtils";
import GeneralUtils from "../../../../utils/GeneralUtils";
import SuggestionList from '../../../../components/SuggestionList';
import SuggestionTextInput from '../../../../components/SuggestionTextInput';
import CustomDatePicker from "../../../../components/CustomDatePicker"
import InputText from '../../../../components/InputText';











class StudentLessonPlannerGeneral extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    }
  }






  render() {
    const {
      stateObject
    } = this.props
    const { dataModel, editable, primaryKeyEditable, errorField } = stateObject.state
    const { parentStateChange } = stateObject




    return (<View style={[AppStyles.marginTop_2]}>



      <View style={[AppStyles.zIndex_2000, AppStyles.marginTop_1]}>


        <SuggestionTextInput
          // tooltipReq={true}
          // tooltipMsg={'Mention the teacher incharge for this class.'}
          // tooltipStyle={styles.tooltipStyle}
          required={true}
          editable={editable}
          label={'Student Name'}
          placeholder={'Select student name'}
          secureTextEntry={false}
          value={dataModel.studentName}
          onFocus={() => {
            //  if(dataModel.studentName == null || dataModel.studentName == '' ){
            SearchUtils.functions.launchSuggestion(stateObject, '', 'studentName')
            //  }
          }
          }
          onClear={() => {
            dataModel.studentName = '';
            dataModel.studentID = '';
            parentStateChange({ dataModel: dataModel })
          }}
          errorMessage={GeneralUtils.functions.getErrorMessage('field1', dataModel.studentName, errorField, [], 'Student Name')}
        />

      </View>
      <View style={[AppStyles.marginTop_1]}>
        <InputText
          required={true}
          editable={false}
          label={'Student ID'}
          value={dataModel.studentID}
          errorMessage={GeneralUtils.functions.getErrorMessage('field2', dataModel.studentID, errorField, [], 'Student ID')}
        />

      </View>


      <View style={AppStyles.marginTop_1}>

        <CustomDatePicker
          // tooltipReq={true}
          // tooltipMsg={'Specify the starting date of the academic year'}
          // tooltipStyle={styles.tooltipStyle}
          required={true}
          editable={editable}
          label={'Date'}
          placeholder={'Pick date'}
          secureTextEntry={false}
          // onChangeText={text => console.log(text,'p')}
          value={dataModel.date}
          format="DD-MM-YYYY"
          mode="date"
          onDateChange={value => {
            dataModel.date = value;
            parentStateChange({ dataModel: dataModel })
          }}
          errorMessage={GeneralUtils.functions.getErrorMessage('field3', dataModel.date, errorField, [], 'Date')}
        />
      </View>




      <InputText
        // tooltipReq={true}
        // tooltipMsg={'By default, system will provide an auto-generated Student ID that can be used. If the institute wants to assign their own student ID, then that ID can be entered replacing the auto-generated ID'}
        tooltipStyle={styles.tooltipStyle}
        required={true}
        editable={!primaryKeyEditable}
        label={'Plan ID'}
        secureTextEntry={false}
        onChangeText={text => {
          dataModel.planID = text
          parentStateChange({ dataModel: dataModel })
        }}
        value={dataModel.planID}
        errorMessage={GeneralUtils.functions.getErrorMessage('field4', dataModel.planID, errorField, [], 'Plan ID')}
      />







      <SuggestionList
        stateObject={stateObject}
        searchFieldName={stateObject.state.searchFieldName}
        searchText={stateObject.state.searchText}
        visible={stateObject.state.seachVisible}
        searchName={'ReadOnly'}
        colHeading={['Name', 'Id']}
        mapping={['StudentName', 'StudentId']}
        SuggestionHeading={'Student'}
      />

    </View>
    );
  }
}


const styles = StyleSheet.create({

})
export default StudentLessonPlannerGeneral;

