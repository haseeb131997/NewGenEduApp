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
import GeneralUtils from "../../../../utils/GeneralUtils";
import NewScreenDropDownPicker from '../../../../components/NewScreenDropDownPicker';
import InputText from '../../../../components/InputText';
import { h, w } from "../../../../utils/Dimensions";

import SuggestionList from '../../../../components/SuggestionList';
import SuggestionTextInput from '../../../../components/SuggestionTextInput';

import SearchUtils from "../../../../utils/SearchUtils";








class QuestionPaperConfigGeneral extends Component {
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
        label={'Question Paper ID'}
        secureTextEntry={false}
        onChangeText={text => {
          dataModel.questionPaperId = text
          parentStateChange({ dataModel: dataModel })
        }}
        value={dataModel.questionPaperId}
        errorMessage={GeneralUtils.functions.getErrorMessage('field1', dataModel.questionPaperId, errorField, [], 'Question Paper ID')}
      />

      <InputText
        // tooltipReq={true}
        // tooltipMsg={'Enter the description about the video.'}
        required={true}
        editable={!editable}
        label={'Description'}
        secureTextEntry={false}
        multiline={true}
        onChangeText={text => {
          dataModel.description = text
          parentStateChange({ dataModel: dataModel })
        }}
        value={dataModel.description}
        errorMessage={GeneralUtils.functions.getErrorMessage('field2', dataModel.description, errorField, [], 'Description')}
      />


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
        subHeadingRecordName="a subject"
        onClear={() => {
          dataModel.subjectID = '';
          dataModel.subjectName = '';
          parentStateChange({ dataModel: dataModel })
        }}
        errorMessage={GeneralUtils.functions.getErrorMessage('field4', dataModel.subjectID, errorField, [], 'Subject')}
      />


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
  typetooltipStyle: {
    width: w('65%'),
    height: h('15%')
  },
  grptooltipStyle: {
    width: w('60%'),
    height: h('15%')
  }
})
export default QuestionPaperConfigGeneral;

