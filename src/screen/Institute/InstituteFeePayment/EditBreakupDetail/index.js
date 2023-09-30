
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
import { View, StyleSheet, Platform,TouchableOpacity } from 'react-native';
import AppStyles from "../../../../AppStyles/AppStyles";
import GeneralUtils from "../../../../utils/GeneralUtils";

import InputText from '../../../../components/InputText';

import AmountInputText from "../../../../components/AmountInputText"









class EditBreakupDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    }
 

  }


 







  render() {
    const {
      stateObject
    } = this.props
    const { feeBreakupEmptyrecord, editable, primaryKeyEditable, summaryDataModel, errorField } = stateObject.state
    const { parentStateChange } = stateObject

    return (
      <View style={AppStyles.marginTop_2}>
          <InputText
          required={true}
          label={'Component Name'}
          secureTextEntry={false}
          onChangeText={text => {
            feeBreakupEmptyrecord.componentName = text
            parentStateChange({ feeBreakupEmptyrecord: feeBreakupEmptyrecord })
          }}
          value={feeBreakupEmptyrecord.componentName}
          errorMessage={GeneralUtils.functions.getErrorMessage('field1', feeBreakupEmptyrecord.componentName, errorField, [], 'Component Name')}
        />

       <AmountInputText
        // tooltipReq={true}
        // tooltipMsg={'By default, system will provide an auto-generated Student ID that can be used. If the institute wants to assign their own student ID, then that ID can be entered replacing the auto-generated ID'}
        // tooltipStyle={styles.tooltipStyle}
        currencyCode={stateObject.state.currencyCode}
        required={true}
        label={'Amount'}
        secureTextEntry={false}
        onChangeText={text => {
          feeBreakupEmptyrecord.amount = text
          parentStateChange({ feeBreakupEmptyrecord: feeBreakupEmptyrecord })
        }}
        value={feeBreakupEmptyrecord.amount}
        errorMessage={GeneralUtils.functions.getErrorMessage('field2', feeBreakupEmptyrecord.amount, errorField, [], 'Amount')}
      />

      </View>
    );
  }
}


const styles = StyleSheet.create({

})
export default EditBreakupDetail;

