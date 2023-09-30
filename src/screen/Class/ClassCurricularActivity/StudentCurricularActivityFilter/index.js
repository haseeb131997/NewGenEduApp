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
import AppStyles from "../../../../AppStyles/AppStyles";
import FilterSuggestionTextInput from '../../../../components/FilterSuggestionTextInput';
import SuggestionList from '../../../../components/SuggestionList';
import SearchUtils from "../../../../utils/SearchUtils";
import GeneralUtils from "../../../../utils/GeneralUtils";
import FilterInputText from '../../../../components/FilterInputText';
import CustomDropDownPicker from '../../../../components/CustomDropDownPicker';
import SelectListUtils from '../../../../utils/SelectListUtils'






class StudentCurricularActivityFilter extends Component {
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
    const { summaryDataModel, errorField } = stateObject.state
    const { parentStateChange } = stateObject
    return (
      <View style={[AppStyles.margin_1]}>
           <FilterSuggestionTextInput
          required={true}
          label={'Class'}
          placeholder={'Select class'}
          secureTextEntry={false}
          value={summaryDataModel.filter.class}
          onFocus={() => {

            SearchUtils.functions.launchSuggestion(stateObject, '', 'class')
          }
          }
          onClear={() => {
            summaryDataModel.filter.class = '';
            parentStateChange({ summaryDataModel: summaryDataModel })
          }}
          errorMessage={GeneralUtils.functions.getErrorMessage('field1', summaryDataModel.filter.class, errorField, [], 'Class')}
        />


{(stateObject.state.userType == 'A' || stateObject.state.userType == 'T' || stateObject.state.userType == 'O') && <CustomDropDownPicker
          // required={true}
          label={'Enroll status'}
          stateObject={stateObject}
          items={SelectListUtils.functions.selectMaster.EnrollMaster}
          value={SelectListUtils.functions.getSelectedValue(SelectListUtils.functions.selectMaster.EnrollMaster, summaryDataModel.filter.enroll_status)}
          placeholder="Select enroll status"
          onChangeValue={(value) => {
            summaryDataModel.filter.enroll_status = value;
            parentStateChange({ summaryDataModel: summaryDataModel })
          }}
          dropdownName={'enrollDropdown'}
          subHeadingRecordName="a enroll status"
          onClear={() => {
            summaryDataModel.filter.enroll_status = '';
            parentStateChange({ summaryDataModel: summaryDataModel })
          }}
        />}

{(stateObject.state.userType == 'A' || stateObject.state.userType == 'T' || stateObject.state.userType == 'O') && <CustomDropDownPicker
          // required={true}
          label={'Activity type'}
          stateObject={stateObject}
          items={SelectListUtils.functions.selectMaster.ActivityTypeMaster}
          value={SelectListUtils.functions.getSelectedValue(SelectListUtils.functions.selectMaster.ActivityTypeMaster, summaryDataModel.filter.activityType)}
          placeholder="Select activity type"
          onChangeValue={(value) => {
            summaryDataModel.filter.activityType = value;
            parentStateChange({ summaryDataModel: summaryDataModel })
          }}
          dropdownName={'activityDropdown'}
          subHeadingRecordName="an activity type"
          onClear={() => {
            summaryDataModel.filter.activityType = '';
            parentStateChange({ summaryDataModel: summaryDataModel })
          }}
        />}


        <SuggestionList
          stateObject={stateObject}
          searchFieldName={stateObject.state.searchFieldName}
          searchText={stateObject.state.searchText}
          visible={stateObject.state.seachVisible}
          searchName={'classSummaryDataModel1'}
          colHeading={['Class', 'Desc','Year/Standard','Major/Section']}
          mapping={['classCode', 'classDesc','standard','section']}
          SuggestionHeading={'Class'}
        />
      </View>

    );
  }
}

const styles = StyleSheet.create({

})
export default StudentCurricularActivityFilter;

