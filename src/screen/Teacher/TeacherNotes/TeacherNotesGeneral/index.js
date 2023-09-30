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
import { Text, RadioButton, Subheading, Caption } from 'react-native-paper';
import AppStyles from "../../../../AppStyles/AppStyles";
import SearchUtils from "../../../../utils/SearchUtils";
import GeneralUtils from "../../../../utils/GeneralUtils";
import SuggestionList from '../../../../components/SuggestionList';
import SuggestionTextInput from '../../../../components/SuggestionTextInput';
import InputText from '../../../../components/InputText';
import CustomDatePicker from "../../../../components/CustomDatePicker"
import CustomRadioButton from '../../../../components/CustomRadioButton';
import CustomLabel from '../../../../components/CustomLabel';
import NewScreenDropDownPicker from '../../../../components/NewScreenDropDownPicker';
import SelectListUtils from '../../../../utils/SelectListUtils'







var searchName = 'TeacherDataModel';



class TeacherNotesGeneral extends Component {
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


    if (stateObject.state.currentOperation == 'Modification') {

      if (dataModel.fromNoon == 'D' && dataModel.toNoon == 'D') {
        stateObject.state.selectOption = 'fullDay'
      }
      else if (dataModel.fromNoon == 'F' && dataModel.toNoon == 'F') {
        stateObject.state.selectOption = 'halfDay'
      }
      else if (dataModel.fromNoon == 'A' && dataModel.toNoon == 'A') {
        stateObject.state.selectOption = 'halfDay'
      }

    }




    return (<View style={[AppStyles.marginTop_2]}>






      <View style={AppStyles.marginTop_2}>
        <InputText
          // tooltipReq={true}
          // tooltipMsg={'By default, system will provide an auto-generated Student ID that can be used. If the institute wants to assign their own student ID, then that ID can be entered replacing the auto-generated ID'}
          // tooltipStyle={styles.tooltipStyle}
          required={true}
          editable={!primaryKeyEditable}
          label={'Notes ID'}
          secureTextEntry={false}
          onChangeText={text => {
            dataModel.notesID = text
            parentStateChange({ dataModel: dataModel })
          }}
          value={dataModel.notesID}
          errorMessage={GeneralUtils.functions.getErrorMessage('field1', dataModel.notesID, errorField, [], 'Notes ID')}
        />
      </View>


      <View style={[AppStyles.zIndex_2000, AppStyles.marginTop_1]}>
        <SuggestionTextInput
          tooltipReq={true}
          tooltipMsg={'Mention the teacher name for whom the notes are to be created.'}
          // tooltipStyle={styles.tooltipStyle}
          required={true}
          editable={editable}
          label={'Staff Name'}
          placeholder={'Select teacher name'}
          secureTextEntry={false}
          value={dataModel.teacherName}
          onFocus={() => {
            searchName = 'TeacherDataModel';
            //  if(dataModel.teacherName == null || dataModel.teacherName == '' ){
            SearchUtils.functions.launchSuggestion(stateObject, '', 'teacherName')
            //  }
          }
          }
          onClear={() => {
            dataModel.teacherName = '';
            dataModel.teacherID = '';
            parentStateChange({ dataModel: dataModel })
          }}

          errorMessage={GeneralUtils.functions.getErrorMessage('field2', dataModel.teacherName, errorField, [], 'Staff Name')}
        />

      </View>
      <View style={[AppStyles.marginTop_1]}>
        <InputText
          required={true}
          editable={false}
          label={'Staff ID'}
          value={dataModel.teacherID}
        />

      </View>

      <CustomDatePicker
        tooltipReq={true}
        tooltipMsg={'Mention the date on which the notes have been created.'}
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


      <NewScreenDropDownPicker
        editable={primaryKeyEditable}
        required={true}
        label={'Subject'}
        stateObject={stateObject}
        items={SelectListUtils.functions.selectMaster.SubjectMaster}
        value={SelectListUtils.functions.getSelectedValue(SelectListUtils.functions.selectMaster.SubjectMaster, dataModel.subjectID)}
        placeholder="Select Subject"
        onChangeValue={(value) => {
          dataModel.subjectID = value;
          dataModel.subjectName = SelectListUtils.functions.getSelectedValue(SelectListUtils.functions.selectMaster.SubjectMaster, dataModel.subjectID);
          parentStateChange({ dataModel: dataModel })

        }}
        dropdownName={'subjectDropdown'}
        subHeadingRecordName="a subject"
        onClear={() => {
          dataModel.subjectID = '';
          dataModel.subjectName='';
          parentStateChange({ dataModel: dataModel })
        }}
        errorMessage={GeneralUtils.functions.getErrorMessage('field4', dataModel.subjectID, errorField, [], 'Subject')}
      />



      <View style={[AppStyles.marginTop_1]}>
        <SuggestionTextInput
          tooltipReq={false}
          // tooltipMsg={'Mention the year/standard for which the study materials are to be uploaded.'}
          // tooltipStyle={styles.tooltipStyle}
          required={true}
          editable={editable}
          label={'Year/Standard'}
          placeholder={'Select Year/Standard'}
          secureTextEntry={false}
          value={dataModel.standard}
          onFocus={() => {
            searchName = 'standardDataModel';
            SearchUtils.functions.launchSuggestion(stateObject, '', 'standard')

          }
          }
        
          onClear={() => {
            dataModel.standard = '';
            parentStateChange({ dataModel: dataModel })
          }}
          errorMessage={GeneralUtils.functions.getErrorMessage('field5', dataModel.standard, errorField, [], 'Year/Standard')}
        />
      </View>




      <SuggestionList
        stateObject={stateObject}
        searchFieldName={stateObject.state.searchFieldName}
        searchText={stateObject.state.searchText}
        visible={stateObject.state.seachVisible}
        searchName={searchName}
        colHeading={searchName == 'TeacherDataModel' ? ['Name', 'Id',] : ['Year/Standard']}
        mapping={searchName == 'TeacherDataModel' ? ['TeacherName', 'TeacherId',] : ['standard']}
        SuggestionHeading={searchName == 'TeacherDataModel' ? 'Staff' : 'Year/Standard'}
      />
    </View>
    );
  }
}


const styles = StyleSheet.create({

})
export default TeacherNotesGeneral;

