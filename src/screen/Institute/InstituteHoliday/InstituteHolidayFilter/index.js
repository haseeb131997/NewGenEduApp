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
import { w, h } from "../../../../utils/Dimensions";
import SelectListUtils from '../../../../utils/SelectListUtils'
import AppStyles from "../../../../AppStyles/AppStyles";
import CustomDropDownPicker from '../../../../components/CustomDropDownPicker';






class InstituteHolidayFilter extends Component {
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
      <View style={[AppStyles.margin_1]}>
   
          <CustomDropDownPicker
            label={'Select Month'}
            stateObject={stateObject}
            items={SelectListUtils.functions.selectMaster.MonthMaster}
            value={SelectListUtils.functions.getSelectedValue(SelectListUtils.functions.selectMaster.MonthMaster, summaryDataModel.filter.month)}
            placeholder="Select Month"
            onChangeValue={(value) => {
              summaryDataModel.filter.month = value;
              parentStateChange({ summaryDataModel: summaryDataModel })
            }}
            dropdownName={'monthDropdown'} 
            subHeadingRecordName = "a month"
            onClear={() => {
              summaryDataModel.filter.month = '';
              parentStateChange({ summaryDataModel: summaryDataModel })
            }}
          />
     
          <CustomDropDownPicker
            label={'Select year'}
            stateObject={stateObject}
            items={SelectListUtils.functions.selectMaster.YearMaster}
            value={SelectListUtils.functions.getSelectedValue(SelectListUtils.functions.selectMaster.YearMaster, summaryDataModel.filter.year)}
            placeholder="Select year"
            onChangeValue={(value) => {
              summaryDataModel.filter.year = value;
              parentStateChange({ summaryDataModel: summaryDataModel })
            }}
            dropdownName={'yearDropdown'} 
            subHeadingRecordName = "a year"
            onClear={() => {
              summaryDataModel.filter.year = '';
              parentStateChange({ summaryDataModel: summaryDataModel })
            }}
          />
   
          {(stateObject.state.userType == 'A' || stateObject.state.userType == 'O' || stateObject.state.userType == 'T') && <CustomDropDownPicker
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
          />}
     
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    zIndex: 1000
  }
})
export default InstituteHolidayFilter;

