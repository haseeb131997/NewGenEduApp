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
import FilterCustomDatePicker from "../../../../components/FilterCustomDatePicker"








class TeacherSubstituteReportFilter extends Component {
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
          label={'Staff Name'}
          placeholder={'Select staff name'}
          secureTextEntry={false}
          value={dataModel.Master.teacherName}
          onFocus={() => {
            SearchUtils.functions.launchSuggestion(stateObject, '', 'teacherName')
          }
          }
          onClear={() => {
            dataModel.Master.teacherName = '';
            dataModel.Master.teacherID = '';
            parentStateChange({ dataModel: dataModel })
          }}
          errorMessage={GeneralUtils.functions.getErrorMessage('field1', dataModel.Master.teacherName, errorField, [], 'Staff Name')}

        />

       <FilterCustomDatePicker
          required={true}
          label={'Date'}
          placeholder={'Pick date'}
          secureTextEntry={false}
          value={dataModel.Master.date}
          format="DD-MM-YYYY"
          mode="date"
          onDateChange={value => {
            dataModel.Master.date = value;
            parentStateChange({ dataModel: dataModel })
          }}
          errorMessage={GeneralUtils.functions.getErrorMessage('field2', dataModel.Master.date, errorField, [], 'Date')}
        />


        <SuggestionList
          stateObject={stateObject}
          searchFieldName={stateObject.state.searchFieldName}
          searchText={stateObject.state.searchText}
          visible={stateObject.state.seachVisible}
          searchName={'teacherReport'}
          colHeading={['Name', 'Id']}
          mapping={['TeacherName', 'TeacherId']}
          SuggestionHeading={'Staff'}
        />
      </View>

    );
  }
}

const styles = StyleSheet.create({

})
export default TeacherSubstituteReportFilter;

