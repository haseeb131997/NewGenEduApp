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
import { View, StyleSheet, Image, TouchableOpacity, Platform } from 'react-native';
import SelectListUtils from '../../../../utils/SelectListUtils'
import AppStyles from "../../../../AppStyles/AppStyles";
import FilterSuggestionTextInput from '../../../../components/FilterSuggestionTextInput';
import SuggestionList from '../../../../components/SuggestionList';
import SearchUtils from "../../../../utils/SearchUtils";
import GeneralUtils from "../../../../utils/GeneralUtils";
import CustomDropDownPicker from '../../../../components/CustomDropDownPicker';







class MonthlyAttendanceReportFilter extends Component {
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
      <View style={[AppStyles.margin_1]}>
        <FilterSuggestionTextInput
          required={true}
          label={'Class'}
          placeholder={'Select class'}
          secureTextEntry={false}
          value={dataModel.Master.classCode}
          onFocus={() => {
            SearchUtils.functions.launchSuggestion(stateObject, '', 'class')
          }
          }
          onClear={() => {
            dataModel.Master.classCode = '';
            parentStateChange({ dataModel: dataModel })
          }}
          errorMessage={GeneralUtils.functions.getErrorMessage('field1', dataModel.Master.classCode, errorField, [], 'Class')}
        />
         <CustomDropDownPicker
          required={true}
          label={'Month'}
          stateObject={stateObject}
          items={SelectListUtils.functions.selectMaster.MonthMaster}
          value={SelectListUtils.functions.getSelectedValue(SelectListUtils.functions.selectMaster.MonthMaster, dataModel.Master.month )}
          placeholder="Select month"
          onChangeValue={(value) => {
            dataModel.Master.month = value;
            parentStateChange({ dataModel: dataModel })
          }}
          dropdownName={'monthDropdown'} 
            subHeadingRecordName = "a month"
            onClear={() => {
              dataModel.Master.month= '';
              parentStateChange({ dataModel: dataModel })
            }}
          errorMessage={GeneralUtils.functions.getErrorMessage('field2', dataModel.Master.month, errorField, [], 'Month')}

        />


        <CustomDropDownPicker
         required={true}
          label={'Year'}
          stateObject={stateObject}
          items={SelectListUtils.functions.selectMaster.YearMaster}
          value={SelectListUtils.functions.getSelectedValue(SelectListUtils.functions.selectMaster.YearMaster, dataModel.Master.year)}
          placeholder="Select year"
          onChangeValue={(value) => {
            dataModel.Master.year = value;
            parentStateChange({ dataModel: dataModel })
          }}
          dropdownName={'yearDropdown'} 
            subHeadingRecordName = "a year"
            onClear={() => {
              dataModel.Master.year= '';
              parentStateChange({ dataModel: dataModel })
            }}
          errorMessage={GeneralUtils.functions.getErrorMessage('field3', dataModel.Master.year, errorField, [], 'Year')}

        />
     

 
       
 

       

        <SuggestionList
          stateObject={stateObject}
          searchFieldName={stateObject.state.searchFieldName}
          searchText={stateObject.state.searchText}
          visible={stateObject.state.seachVisible}
          searchName={'classReport1'}
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
export default MonthlyAttendanceReportFilter;

