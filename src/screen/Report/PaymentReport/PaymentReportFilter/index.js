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
import FilterCustomDatePicker from "../../../../components/FilterCustomDatePicker"






var searchName = ""


class PaymentReportFilter extends Component {
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

       

        <FilterCustomDatePicker
          required={true}
          label={'From Date'}
          placeholder={'Pick from date'}
          secureTextEntry={false}
          value={dataModel.Master.fromDate}
          format="DD-MM-YYYY"
          mode="date"
          onDateChange={value => {
            dataModel.Master.fromDate = value;
            parentStateChange({ dataModel: dataModel })
          }}
          errorMessage={GeneralUtils.functions.getErrorMessage('field2', dataModel.Master.fromDate, errorField, [], 'From Date')}
        />

        <FilterCustomDatePicker
          required={true}
          label={'To Date'}
          placeholder={'Pick to date'}
          secureTextEntry={false}
          value={dataModel.Master.toDate}
          format="DD-MM-YYYY"
          mode="date"
          onDateChange={value => {
            dataModel.Master.toDate = value;
            parentStateChange({ dataModel: dataModel })
          }}
          errorMessage={GeneralUtils.functions.getErrorMessage('field3', dataModel.Master.toDate, errorField, [], 'To Date')}
        />

<FilterSuggestionTextInput
          required={false}
          label={'Class'}
          placeholder={'Select class'}
          secureTextEntry={false}
          value={dataModel.Master.classCode}
          onFocus={() => {
            searchName = "classReport1"
            SearchUtils.functions.launchSuggestion(stateObject, '', 'class')
          }
          }
          onClear={() => {
            dataModel.Master.classCode = '';
            dataModel.Master.stdSec = "";
            dataModel.Master.class = "";
            parentStateChange({ dataModel: dataModel })
          }}
          errorMessage={GeneralUtils.functions.getErrorMessage('field1', dataModel.Master.classCode, errorField, [], 'Class')}

        />

        <FilterSuggestionTextInput
          required={false}
          label={'Fees Description'}
          placeholder={'Select fees description'}
          secureTextEntry={false}
          value={dataModel.Master.feeDescription}
          onFocus={() => {
            searchName = "feesReport"
            SearchUtils.functions.launchSuggestion(stateObject, '', 'feeID')
          }
          }
          onClear={() => {
            dataModel.Master.feeDescription = '';
            dataModel.Master.feeID = "";
            parentStateChange({ dataModel: dataModel })
          }}
          // errorMessage={GeneralUtils.functions.getErrorMessage('field2', dataModel.Master.feeDescription, errorField, [], 'Fees Description')}

        />





        <SuggestionList
          stateObject={stateObject}
          searchFieldName={stateObject.state.searchFieldName}
          searchText={stateObject.state.searchText}
          visible={stateObject.state.seachVisible}
          searchName={searchName}
          colHeading={searchName == 'feesReport' ? ['Fees ID', 'Amount', 'Desc'] : ['Class', 'Desc', 'Year/Standard', 'Major/Section']}
          mapping={searchName == 'feesReport' ? ['feeID', 'amount', 'feeDescription'] : ['classCode', 'classDesc', 'standard', 'section']}
          SuggestionHeading={searchName == 'feesReport' ? 'Fees Description' : 'Class'}
        />
      </View>

    );
  }
}

const styles = StyleSheet.create({

})
export default PaymentReportFilter;

