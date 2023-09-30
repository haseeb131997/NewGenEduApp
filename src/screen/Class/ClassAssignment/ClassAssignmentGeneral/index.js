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
import SelectListUtils from '../../../../utils/SelectListUtils'
import SearchUtils from "../../../../utils/SearchUtils";
import GeneralUtils from "../../../../utils/GeneralUtils";
// import NewScreenDropDownPicker from '../../../../components/NewScreenDropDownPicker';
import SuggestionList from '../../../../components/SuggestionList';
import SuggestionTextInput from '../../../../components/SuggestionTextInput';
import NewScreenDropDownPicker from '../../../../components/NewScreenDropDownPicker';
import CustomDatePicker from "../../../../components/CustomDatePicker"
import InputText from '../../../../components/InputText';











class ClassAssignmentGeneral extends Component {
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
      <InputText
        required={true}
        editable={!primaryKeyEditable}
        label={'Assignment ID'}
        secureTextEntry={false}
        onChangeText={text => {
          dataModel.assignmentID = text
          parentStateChange({ dataModel: dataModel })
        }}
        value={dataModel.assignmentID}
        errorMessage={GeneralUtils.functions.getErrorMessage('field1', dataModel.assignmentID, errorField, [], 'Assignment ID')}
      />


      <View style={AppStyles.marginTop_1}>
        <InputText
          required={true}
          editable={!editable}
          label={'Assignment Description '}
          secureTextEntry={false}
          multiline={true}
          onChangeText={text => {
            dataModel.assignmentDescription = text
            parentStateChange({ dataModel: dataModel })
          }}
          value={dataModel.assignmentDescription}
          errorMessage={GeneralUtils.functions.getErrorMessage('field2', dataModel.assignmentDescription, errorField, [], 'Assignment Description ')}
        />
      </View>




      <View style={[AppStyles.marginTop_1]}>
        <SuggestionTextInput
          tooltipReq={true}
          tooltipMsg={'Mention the class for which the assignment is to be assigned.'}
          // tooltipStyle={styles.tooltipStyle}
          required={true}
          editable={primaryKeyEditable}
          label={'Class'}
          placeholder={'Select class'}
          secureTextEntry={false}
          value={dataModel.classID}
          onFocus={() => {
            //  if(dataModel.classID == null || dataModel.classID == '' ){
            SearchUtils.functions.launchSuggestion(stateObject, '', 'class')
            //  }
          }
          }
          onClear={() => {
            dataModel.classID = '';
            dataModel.classDescription = '';
            parentStateChange({ dataModel: dataModel })
          }}
          errorMessage={GeneralUtils.functions.getErrorMessage('field3', dataModel.classID, errorField, [], 'Class')}
        />
      </View>


      <View style={[AppStyles.marginTop_1]}>
        <NewScreenDropDownPicker
          stateObject={stateObject}
          editable={editable}
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
            subHeadingRecordName = "a subject"
            onClear={() => {
              dataModel.subjectID= '';
              dataModel.subjectName =  '';
              parentStateChange({ dataModel: dataModel })
            }}
          errorMessage={GeneralUtils.functions.getErrorMessage('field4', dataModel.subjectID, errorField, [], 'Subject')}
        />
      </View>


      {/* <View style={[AppStyles.marginTop_1, Platform.OS === 'ios' && AppStyles.zIndex_2000]}>
        <NewScreenDropDownPicker
          editable={editable}
          required={true}
          label={'Subject'}
          stateObject={stateObject}
          items={SelectListUtils.functions.selectMaster.SubjectMaster}
          value={dataModel.subjectID}
          placeholder="Select Subject"
          zIndex={2000}
          zIndexInverse={1000}
          onChangeValue={(value) => {
            dataModel.subjectID = value;
            parentStateChange({ dataModel: dataModel })

          }}
          errorMessage={GeneralUtils.functions.getErrorMessage('field4', dataModel.subjectID, errorField, [], 'Subject')}
        />
      </View> */}
      <View style={[AppStyles.marginTop_1, Platform.OS === 'ios' && AppStyles.zIndex_1000]}>
        <NewScreenDropDownPicker
          editable={primaryKeyEditable}
          required={true}
          label={'Type'}
          stateObject={stateObject}
          items={SelectListUtils.functions.selectMaster.AssignmentTypesMaster}
          value={SelectListUtils.functions.getSelectedValue(SelectListUtils.functions.selectMaster.AssignmentTypesMaster, dataModel.type)}
          placeholder="Select Type"
          onChangeValue={(value) => {
            dataModel.type = value;
            parentStateChange({ dataModel: dataModel })
          }}
          dropdownName={'typeDropdown'} 
            subHeadingRecordName = "a type"
            onClear={() => {
              dataModel.type= '';
              parentStateChange({ dataModel: dataModel })
            }}
          errorMessage={GeneralUtils.functions.getErrorMessage('field5', dataModel.type, errorField, [], 'Type')}
        />
      </View>


      <View style={AppStyles.marginTop_1}>
        <CustomDatePicker
          tooltipReq={true}
          tooltipMsg={'Specify the final date by which the assignment is supposed to be done.'}
          // tooltipStyle={styles.tooltipStyle}
          required={true}
          editable={editable}
          label={'Due Date'}
          placeholder={'Pick due date'}
          secureTextEntry={false}
          // onChangeText={text => console.log(text,'p')}
          value={dataModel.dueDate}
          format="DD-MM-YYYY"
          mode="date"
          onDateChange={value => {
            dataModel.dueDate = value;
            parentStateChange({ dataModel: dataModel })
          }}
          errorMessage={GeneralUtils.functions.getErrorMessage('field6', dataModel.dueDate, errorField, [], 'Due Date')}
        />
      </View>










      <SuggestionList
        stateObject={stateObject}
        searchFieldName={stateObject.state.searchFieldName}
        searchText={stateObject.state.searchText}
        visible={stateObject.state.seachVisible}
        searchName={'classIdDataModel'}
        colHeading={['Class', 'Desc', 'Year/Standard', 'Major/Section']}
        mapping={['classCode', 'classDesc', 'standard', 'section']}
        SuggestionHeading={'Class'}
      />

    </View>
    );
  }
}


const styles = StyleSheet.create({

})
export default ClassAssignmentGeneral;

