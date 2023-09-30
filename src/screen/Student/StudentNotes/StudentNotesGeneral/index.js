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
//import { Text, RadioButton, Subheading, Caption } from 'react-native-paper';
import AppStyles from "../../../../AppStyles/AppStyles";
import SearchUtils from "../../../../utils/SearchUtils";
import GeneralUtils from "../../../../utils/GeneralUtils";
import SuggestionList from '../../../../components/SuggestionList';
import SuggestionTextInput from '../../../../components/SuggestionTextInput';
import InputText from '../../../../components/InputText';
import CustomDatePicker from "../../../../components/CustomDatePicker"
//import CustomRadioButton from '../../../../components/CustomRadioButton';
//import CustomLabel from '../../../../components/CustomLabel';
import NewScreenDropDownPicker from '../../../../components/NewScreenDropDownPicker';
import SelectListUtils from '../../../../utils/SelectListUtils'
import { w, h } from "../../../../utils/Dimensions";






var searchName = 'TeacherDataModel';



class StudentNotesGeneral extends Component {
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






      <View style={AppStyles.marginTop_2}>
        <InputText
          tooltipReq={true}
          tooltipMsg={'By default, system will provide an auto-generated ID that can be used for reference. If you want to assign your  own reference, then that reference can be entered replacing the auto-generated ID'}
          tooltipStyle={styles.tooltipStyle}
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


      <SuggestionTextInput
        // tooltipReq={true}
        // tooltipMsg={'Mention the teacher incharge for this class.'}
        // tooltipStyle={styles.tooltipStyle}
        required={true}
        editable={primaryKeyEditable}
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

        errorMessage={GeneralUtils.functions.getErrorMessage('field3', dataModel.studentName, errorField, [], 'Student Name')}
      />
      <InputText
        required={false}
        editable={false}
        label={'Student ID'}
        value={dataModel.studentID}
      />

      <CustomDatePicker
        tooltipReq={true}
        tooltipMsg={'Specify the date of the note being taken'}
        tooltipStyle={styles.tooltipStyle}
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
      tooltipReq={true}
      tooltipMsg={'Specify the subject'}
      tooltipStyle={styles.tooltipStyle}
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



      {/* <View style={[AppStyles.marginTop_1]}>
        <SuggestionTextInput
          tooltipReq={false}
          tooltipMsg={'Mention the year/standard for which the study materials are to be uploaded.'}
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
      </View> */}




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
  tooltipStyle: {
    height: h('15%'), width: w('60%')
  }

})
export default StudentNotesGeneral;

