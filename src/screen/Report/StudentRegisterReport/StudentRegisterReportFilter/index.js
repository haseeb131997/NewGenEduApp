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








class StudentRegisterReportFilter extends Component {
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

        <CustomDropDownPicker
          required={true}
          label={'Academic Year'}
          stateObject={stateObject}
          items={SelectListUtils.functions.selectMaster.YearMaster}
          value={SelectListUtils.functions.getSelectedValue(SelectListUtils.functions.selectMaster.YearMaster, dataModel.Master.studentStatus)}
          placeholder="Select academic year"
          onChangeValue={(value) => {
            dataModel.Master.studentStatus = value;
            parentStateChange({ dataModel: dataModel })
          }}
          dropdownName={'yearDropdown'}
          subHeadingRecordName="an academic year'"
          onClear={() => {
            dataModel.Master.studentStatus = '';
            parentStateChange({ dataModel: dataModel })
          }}
          errorMessage={GeneralUtils.functions.getErrorMessage('field1', dataModel.Master.studentStatus, errorField, [], 'Academic Year')}
        />

        <FilterSuggestionTextInput
          required={false}
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
            dataModel.Master.stdSec = "";
            dataModel.Master.class = "";
            parentStateChange({ dataModel: dataModel })
          }}
          // errorMessage={GeneralUtils.functions.getErrorMessage('field2', dataModel.Master.classCode, errorField, [], 'Class')}

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
export default StudentRegisterReportFilter;

