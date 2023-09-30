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
import { View, StyleSheet, TextInput, TouchableOpacity, Platform } from 'react-native';
//import SelectListUtils from '../../../../utils/SelectListUtils'
//import AppStyles from "../../../../AppStyles/AppStyles";
//import FilterSuggestionTextInput from '../../../../components/FilterSuggestionTextInput';
//import SuggestionList from '../../../../components/SuggestionList';
//import SearchUtils from "../../../../utils/SearchUtils";
import GeneralUtils from "../../../../utils/GeneralUtils";
import ExamSuggestion from "../../../../components/ExamSuggestion";
//import CustomDropDownPicker from '../../../../components/CustomDropDownPicker';
//import Text from '../../../../components/LabelText';

var searchName = 'class'

class MarkRegisterReportFilter extends Component {
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
    const { dataModel, errorField } = stateObject.state
    const { parentStateChange } = stateObject
    return (
      
        <View style={styles.container}>
        <ExamSuggestion
        required={true} 
        editable={true}
        stateObject= {stateObject} 
        classCode={"classCode"} 
        classDescription="classDescription" 
        examID='exam'
        examDescription='examDescription'
        compType='Report'
        errorMessage={GeneralUtils.functions.getErrorMessage('field2', dataModel.Master.exam, errorField, [], 'Exam')}
        />
        </View>
        /*<View style={[AppStyles.margin_1]}>
      <FilterSuggestionTextInput
          required={true}
          label={'Exam'}
          placeholder={'Select Exam'}
          secureTextEntry={false}
          value={dataModel.Master.examDescription}
          onFocus={() => {
            searchName='ExamSearchReport'
              SearchUtils.functions.launchSuggestion(stateObject, '', 'ExamSearch')
          }
          }
          onClear={() => {
            dataModel.Master.exam = '';
            dataModel.Master.examDescription = '';
            dataModel.Master.classCode = '';
            dataModel.Master.classDescription = '';
            
            parentStateChange({ dataModel: dataModel })
          }}
          errorMessage={GeneralUtils.functions.getErrorMessage('field2', dataModel.Master.exam, errorField, [], 'Exam')}
        />
        
      
            
              <Text style={[styles.labelStyle,AppStyles.marginLeft_1]}>
                Class
                </Text>
               <View style={[styles.inputView, AppStyles.marginTop_1]}>
          
            <TextInput
              autoCapitalize='none'
              value={dataModel.Master.classDescription}
              secureTextEntry={false}
              // onChangeText={text => onChangeText(text)}
              style={styles.inputs}
              editable={false}
              //placeholder={placeholder}
              pointerEvents="none"
            />
            </View>
       {/*<CustomDropDownPicker
          required={true}
          label={'Exam'}
          stateObject={stateObject}
          items={SelectListUtils.functions.selectMaster.ExamMaster}
          value={SelectListUtils.functions.getSelectedValue(SelectListUtils.functions.selectMaster.ExamMaster, dataModel.Master.exam)}
          placeholder="Select Exam"
          onChangeValue={(value) => {
            dataModel.Master.exam = value;
            parentStateChange({ dataModel: dataModel })

          }}
          dropdownName={'examDropdown'} 
          subHeadingRecordName = "an exam"
          onClear={() => {
            dataModel.Master.exam= '';
            parentStateChange({ dataModel: dataModel })
          }}
          errorMessage={GeneralUtils.functions.getErrorMessage('field2', dataModel.Master.exam, errorField, [], 'Exam')}

        />
         
        <SuggestionList
          stateObject={stateObject}
          searchFieldName={stateObject.state.searchFieldName}
          searchText={stateObject.state.searchText}
          visible={stateObject.state.seachVisible}
          searchName={searchName}
          colHeading={searchName == 'classReport1' ? ['Class', 'Desc', 'Year/Standard', 'Major/Section'] : ['Exam','Class Desc','Start Date','End Date']}
          mapping={searchName == 'classReport1' ? ['classCode', 'classDesc','standard', 'section'] : ['examDescription','classDescription','startDate','endDate']}
          SuggestionHeading={searchName == 'classReport1' ? 'Class' : 'Exam'}
         
        />
      </View>*/

    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
 /* inputs: {
    flex: 1,
    color: UiColor.DRAK_GRAY_COLOR,
    paddingHorizontal: 5,

  },
  inputView: {
    width: '100%',
    height: h('6%'),
    backgroundColor: UiColor.WHITE,
    borderRadius: 6,
    paddingHorizontal: 10,
    display: 'flex',
    flexDirection: 'row'
  },
  labelStyle: {
    // marginLeft:h('1%'),
    fontWeight: '400'
  },*/
})
export default MarkRegisterReportFilter;

