
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
import { View, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { w, h } from "../../../../utils/Dimensions";
import AppStyles from "../../../../AppStyles/AppStyles";
import SelectListUtils from '../../../../utils/SelectListUtils'
import NewScreenDropDownPicker from '../../../../components/NewScreenDropDownPicker';
import GeneralUtils from "../../../../utils/GeneralUtils";
import CustomCheckBox from '../../../../components/CustomCheckBox';
import CustomLabel from '../../../../components/CustomLabel';






class EditRoleContent extends Component {
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
    const { functionsEmptyrecord, editable, primaryKeyEditable, summaryDataModel, errorField } = stateObject.state
    const { parentStateChange } = stateObject

    return (
      <View style={AppStyles.marginTop_2}>


        <View style={[AppStyles.marginTop_1]}>
          <NewScreenDropDownPicker
            tooltipReq={true}
            tooltipMsg={'Please choose the menu for which access to be granted'}
            tooltipStyle={styles.tooltipStyle}
            editable={editable}
            required={true}
            label={'Menu'}
            stateObject={stateObject}
            items={SelectListUtils.functions.selectMaster.FeatureMaster}
            value={SelectListUtils.functions.getSelectedValue(SelectListUtils.functions.selectMaster.FeatureMaster, functionsEmptyrecord.functionID)}
            placeholder="Select Menu or function"
            onChangeValue={(value) => {
              functionsEmptyrecord.functionID = value;
              parentStateChange({ functionsEmptyrecord: functionsEmptyrecord })
            }}
            dropdownName={'functionDropdown'} 
          subHeadingRecordName = "a function ID"
          onClear={() => {
            functionsEmptyrecord.functionID = '';
          parentStateChange({ functionsEmptyrecord: functionsEmptyrecord })
        }}
            errorMessage={GeneralUtils.functions.getErrorMessage('field1', functionsEmptyrecord.functionID, errorField, [], 'Function ID')}
          />
        </View>
        <CustomLabel
        tooltipReq={true}
        tooltipMsg={'Enable or disable access based on your needs'}
        tooltipStyle={styles.tooltipStyle}
         label={'Access to perform'}
         required={true}
        template={null}
      
        />

        <View>
          <View style={AppStyles.row_space_between}>
            <View style={[AppStyles.marginTop_2, AppStyles.width48]}>
              <CustomCheckBox
                label={'Create'}
                checked={functionsEmptyrecord.create}
                onPress={() => {
                  functionsEmptyrecord.create = !functionsEmptyrecord.create;
                  parentStateChange({ functionsEmptyrecord: functionsEmptyrecord })
                }}
                disabled={false}
              />
            </View>
            <View style={[AppStyles.marginTop_2, AppStyles.width48]}>
              <CustomCheckBox
                label={'View'}
                checked={functionsEmptyrecord.view}
                onPress={() => {
                  functionsEmptyrecord.view = !functionsEmptyrecord.view;
                  parentStateChange({ functionsEmptyrecord: functionsEmptyrecord })
                }}
                disabled={false}
              />
            </View>
          </View>
          <View style={AppStyles.row_space_between}>
            <View style={[AppStyles.marginTop_2, AppStyles.width48]}>
              <CustomCheckBox
                label={'Modify'}
                checked={functionsEmptyrecord.modify}
                onPress={() => {
                  functionsEmptyrecord.modify = !functionsEmptyrecord.modify;
                  parentStateChange({ functionsEmptyrecord: functionsEmptyrecord })
                }}
                disabled={false}
              />
            </View>
            <View style={[AppStyles.marginTop_2, AppStyles.width48]}>
              <CustomCheckBox
                label={'Delete'}
                checked={functionsEmptyrecord.delete}
                onPress={() => {
                  functionsEmptyrecord.delete = !functionsEmptyrecord.delete;
                  parentStateChange({ functionsEmptyrecord: functionsEmptyrecord })
                }}
                disabled={false}

              />
            </View>
          </View>
          <View style={AppStyles.row_space_between}>
            <View style={[AppStyles.marginTop_2, AppStyles.width48]}>
              <CustomCheckBox
                label={'Reject'}
                checked={functionsEmptyrecord.reject}
                onPress={() => {
                  functionsEmptyrecord.reject = !functionsEmptyrecord.reject;
                  parentStateChange({ functionsEmptyrecord: functionsEmptyrecord })
                }}
                disabled={false}
              />
            </View>
            <View style={[AppStyles.marginTop_2, AppStyles.width48]}>
              <CustomCheckBox
                label={'Authorisation'}
                checked={functionsEmptyrecord.auth}
                onPress={() => {
                  functionsEmptyrecord.auth = !functionsEmptyrecord.auth;
                  parentStateChange({ functionsEmptyrecord: functionsEmptyrecord })
                }}
                disabled={false}

              />
            </View>
          </View>
          <View style={AppStyles.marginTop_2}>
            <CustomCheckBox
              label={'Auto authorisation'}
              checked={functionsEmptyrecord.autoAuth}
              onPress={() => {
                functionsEmptyrecord.autoAuth = !functionsEmptyrecord.autoAuth;
                parentStateChange({ functionsEmptyrecord: functionsEmptyrecord })
              }}
              disabled={false}
            />
          </View>

        </View>





      </View>
    );
  }
}


const styles = StyleSheet.create({
  tooltipStyle: {
    height: h('15%'), width: w('60%')
  }
})
export default EditRoleContent;

