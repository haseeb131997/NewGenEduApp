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
import NewScreenDropDownPicker from '../../../../components/NewScreenDropDownPicker';
import SuggestionList from '../../../../components/SuggestionList';
import SuggestionTextInput from '../../../../components/SuggestionTextInput';
import InputText from '../../../../components/InputText';
import { w } from "../../../../utils/Dimensions";










class StudyMaterialGeneral extends Component {
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
        // tooltipReq={true}
        // tooltipMsg={'By default, system will provide an auto-generated Student ID that can be used. If the institute wants to assign their own student ID, then that ID can be entered replacing the auto-generated ID'}
        // tooltipStyle={styles.tooltipStyle}
        required={true}
        editable={!primaryKeyEditable}
        label={'Material ID'}
        secureTextEntry={false}
        onChangeText={text => {
          dataModel.materialID = text
          parentStateChange({ dataModel: dataModel })
        }}
        value={dataModel.materialID}
        errorMessage={GeneralUtils.functions.getErrorMessage('field1', dataModel.materialID, errorField, [], 'Material ID')}
      />

      <InputText
        tooltipReq={true}
        tooltipMsg={'Enter the description about the study material.'}
        tooltipStyle={styles.tooltipStyle}
        required={true}
        editable={!editable}
        label={'Material Description'}
        secureTextEntry={false}
        multiline={true}
        onChangeText={text => {
          dataModel.materialDescription = text
          parentStateChange({ dataModel: dataModel })
        }}
        value={dataModel.materialDescription}
        errorMessage={GeneralUtils.functions.getErrorMessage('field2', dataModel.materialDescription, errorField, [], 'Material Description')}
      />







      <View style={[AppStyles.marginTop_1]}>
        <SuggestionTextInput
          tooltipReq={true}
          tooltipMsg={'Mention the year/standard for which the study materials are to be uploaded.'}
          // tooltipStyle={styles.tooltipStyle}
          required={true}
          editable={editable}
          label={'Year/Standard'}
          placeholder={'Select Year/Standard'}
          secureTextEntry={false}
          value={dataModel.standard}
          onFocus={() => {
            //  if(dataModel.standard == null || dataModel.standard == '' ){
            SearchUtils.functions.launchSuggestion(stateObject, '', 'standard')
            //  }
          }
          }
          onClear={() => {
            dataModel.standard = '';
            parentStateChange({ dataModel: dataModel })
          }}
          errorMessage={GeneralUtils.functions.getErrorMessage('field3', dataModel.standard, errorField, [], 'Year/Standard')}
        />
      </View>



      <View style={[AppStyles.marginTop_2]}>
        <NewScreenDropDownPicker
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
            dataModel.subjectID = '';
            dataModel.subjectName = '';
          parentStateChange({ dataModel: dataModel })
        }}
          errorMessage={GeneralUtils.functions.getErrorMessage('field4', dataModel.subjectID, errorField, [], 'Subject')}
        />
      </View>


      <InputText
        tooltipReq={true}
        tooltipMsg={'Enter the Lesson/Unit number.'}
        // tooltipStyle={styles.tooltipStyle}
        required={true}
        editable={!editable}
        label={'Unit/Lesson'}
        secureTextEntry={false}
        onChangeText={text => {
          dataModel.lesson = text
          parentStateChange({ dataModel: dataModel })
        }}
        value={dataModel.lesson}
        errorMessage={GeneralUtils.functions.getErrorMessage('field5', dataModel.lesson, errorField, [], 'Unit/Lesson')}
      />

      <InputText
        tooltipReq={true}
        tooltipMsg={'Enter any content section of the lesson.'}
        // tooltipStyle={styles.tooltipStyle}
        required={false}
        editable={!editable}
        label={'Heading'}
        secureTextEntry={false}
        onChangeText={text => {
          dataModel.heading = text
          parentStateChange({ dataModel: dataModel })
        }}
        value={dataModel.heading}
      
      />

      <InputText
        tooltipReq={true}
        tooltipMsg={'Enter any sub-content section of the lesson.'}
        // tooltipStyle={styles.tooltipStyle}
        required={false}
        editable={!editable}
        label={'Sub Heading'}
        secureTextEntry={false}
        onChangeText={text => {
          dataModel.subHeading = text
          parentStateChange({ dataModel: dataModel })
        }}
        value={dataModel.subHeading}
     
      />




      {/* {stateObject.state.currentOperation == "Create" &&  <Text>{'\n \n \n \n \n \n \n \n \n \n'}</Text>} */}






      <SuggestionList
        stateObject={stateObject}
        searchFieldName={stateObject.state.searchFieldName}
        searchText={stateObject.state.searchText}
        visible={stateObject.state.seachVisible}
        searchName={'standardDataModel'}
        colHeading={['Year/Standard']}
        mapping={['standard']}
        SuggestionHeading={'Standard'}
      />

    </View>
    );
  }
}


const styles = StyleSheet.create({
  tooltipStyle:{
    width:w('50%')
  }
})
export default StudyMaterialGeneral;

