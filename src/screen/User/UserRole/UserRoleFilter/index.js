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
import CustomDropDownPicker from '../../../../components/CustomDropDownPicker';
import SuggestionList from '../../../../components/SuggestionList';
import FilterSuggestionTextInput from '../../../../components/FilterSuggestionTextInput';
import SearchUtils from "../../../../utils/SearchUtils";





class UserRoleFilter extends Component {
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
    const { summaryDataModel, editable } = stateObject.state
    const { parentStateChange } = stateObject
    return (
      <View style={[AppStyles.margin_1,Platform.OS === 'ios' && AppStyles.zIndex_1000]}>
       
       <FilterSuggestionTextInput
        required={false}
        editable={editable}
        label={'Role ID'}
        placeholder={'Select role ID'}
        secureTextEntry={false}
        value={summaryDataModel.filter.roleID}
        onFocus={() => {
          SearchUtils.functions.launchSuggestion(stateObject, '', 'roleID')
        }
        }
        onClear={() => {
          summaryDataModel.filter.roleID = '';
          parentStateChange({ summaryDataModel: summaryDataModel })
        }}
      />

        <View style={[AppStyles.marginTop_1]}>
          <CustomDropDownPicker
            stateObject={stateObject}
            label={'Select Approval status'}
            items={SelectListUtils.functions.selectMaster.AuthStatusMaster}
            value={SelectListUtils.functions.getSelectedValue(SelectListUtils.functions.selectMaster.AuthStatusMaster, summaryDataModel.filter.authStat)}
            placeholder="Select Approval status"
            onChangeValue={(value) => {
              summaryDataModel.filter.authStat = value;
              parentStateChange({ summaryDataModel: summaryDataModel })
            }}
            dropdownName={'authDropdown'} 
            subHeadingRecordName = "an approval status"
            onClear={() => {
            summaryDataModel.filter.authStat = '';
            parentStateChange({ summaryDataModel: summaryDataModel })
          }}
          />
        </View>


        <SuggestionList
        stateObject={stateObject}
        searchFieldName={stateObject.state.searchFieldName}
        searchText={stateObject.state.searchText}
        visible={stateObject.state.seachVisible}
        searchName={'roleSummaryDataModel'}
        colHeading={['Role ID', 'Description',]}
        mapping={['roleID', 'roleDescription',]}
        SuggestionHeading={'Role ID'}
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
export default UserRoleFilter;

