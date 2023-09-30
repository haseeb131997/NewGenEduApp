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

import NewScreenDropDownPicker from '../../../../components/NewScreenDropDownPicker';



var searchName = ""


class FeesReportFilter extends Component {
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
          // errorMessage={GeneralUtils.functions.getErrorMessage('field1', dataModel.Master.classCode, errorField, [], 'Class')}

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

<NewScreenDropDownPicker
          /*tooltipReq={true}
          tooltipMsg={'Select the required Message type for which message to be sent'}
          tooltipStyle={styles.tooltipStyle}
          editable={primaryKeyEditable}*/
          required={true}
          label={'Fee Status'}
          stateObject={stateObject}
          items={SelectListUtils.functions.selectMaster.FeeStatusMaster}
          value={SelectListUtils.functions.getSelectedValue(SelectListUtils.functions.selectMaster.FeeStatusMaster,dataModel.Master.feeStatus)}
          placeholder="Select Fee Status"
          onChangeValue={(value) => {
            dataModel.Master.feeStatus = value;
            parentStateChange({ dataModel: dataModel })

          }}
          dropdownName={'FeeStatus'}
          subHeadingRecordName="a fee  status"
          onClear={() => {
            dataModel.Master.feeStatus = '';
            parentStateChange({ dataModel: dataModel })
          }}
         
        />



        <SuggestionList
          stateObject={stateObject}
          searchFieldName={stateObject.state.searchFieldName}
          searchText={stateObject.state.searchText}
          visible={stateObject.state.seachVisible}
          searchName={searchName}
          colHeading={searchName == 'feesReport' ? ['Fees ID', 'Amount', 'Desc'] : searchName=='feeStatus' ? ['Status']:['Class', 'Desc', 'Year/Standard', 'Major/Section']}
          mapping={searchName == 'feesReport' ? ['feeID', 'amount', 'feeDescription'] : searchName=='feeStatus' ? ['feeStatus']:['classCode', 'classDesc', 'standard', 'section']}
          SuggestionHeading={searchName == 'feesReport' ? 'Fees Description' :searchName=='feeStatus' ? 'Status': 'Class'}
        />
      </View>

    );
  }
}

const styles = StyleSheet.create({

})
export default FeesReportFilter;

