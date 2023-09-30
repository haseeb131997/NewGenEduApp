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
import CustomDropDownPicker from '../../../../components/CustomDropDownPicker';
import GeneralUtils from "../../../../utils/GeneralUtils";
import FilterInputText from '../../../../components/FilterInputText';






class StudentLessonPlannerReportFilter extends Component {
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
          label={'Student Name'}
          placeholder={'Select student name'}
          secureTextEntry={false}
          value={dataModel.Master.studentName}
          onFocus={() => {
            SearchUtils.functions.launchSuggestion(stateObject, '', 'studentName')
          }
          }
          onClear={() => {
            dataModel.Master.studentName = '';
            dataModel.Master.studentID = '';
            parentStateChange({ dataModel: dataModel })
          }}
          errorMessage={GeneralUtils.functions.getErrorMessage('field1', dataModel.Master.studentName, errorField, [], 'Student Name')}

        />


        <SuggestionList
          stateObject={stateObject}
          searchFieldName={stateObject.state.searchFieldName}
          searchText={stateObject.state.searchText}
          visible={stateObject.state.seachVisible}
          searchName={'report'}
          colHeading={['Name', 'Id']}
          mapping={['StudentName', 'StudentId']}
          SuggestionHeading={'Student'}
        />
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    zIndex: 1000
  }
})
export default StudentLessonPlannerReportFilter;

