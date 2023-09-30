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

/* * * Change Tag:SHA001
 Change Desc: add property for iPad and Tablet style in dropdown
 Changed By : Shashank
 Date:22-12-2020 
 */

import React, { Component } from "react";
import { View, StyleSheet, Platform } from 'react-native';
import { Text } from 'react-native-paper';
import AppStyles from "../../../../AppStyles/AppStyles";
import SelectListUtils from '../../../../utils/SelectListUtils'
import SearchUtils from "../../../../utils/SearchUtils";
import GeneralUtils from "../../../../utils/GeneralUtils";
import NewScreenDropDownPicker from '../../../../components/NewScreenDropDownPicker';
import SuggestionList from '../../../../components/SuggestionList';
import SuggestionTextInput from '../../../../components/SuggestionTextInput';
import InputText from '../../../../components/InputText';
import CustomDatePicker from "../../../../components/CustomDatePicker"
import AmountInputText from "../../../../components/AmountInputText"











class InstituteFeePaymentGeneral extends Component {
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
    const { dataModel, editable, primaryKeyEditable, errorField } = stateObject.state
    const { parentStateChange } = stateObject





    return (<View style={[AppStyles.marginTop_2]}>

      <InputText
        // tooltipReq={true}
        // tooltipMsg={'By default, system will provide an auto-generated Student ID that can be used. If the institute wants to assign their own student ID, then that ID can be entered replacing the auto-generated ID'}
        // tooltipStyle={styles.tooltipStyle}
        required={true}
        editable={!primaryKeyEditable}
        label={'Payment ID'}
        secureTextEntry={false}
        onChangeText={text => {
          dataModel.paymentID = text
          parentStateChange({ dataModel: dataModel })
        }}
        value={dataModel.paymentID}
        errorMessage={GeneralUtils.functions.getErrorMessage('field1', dataModel.paymentID, errorField, [], 'Payment ID')}
      />

      <CustomDatePicker
        // tooltipReq={true}
        // tooltipMsg={'Specify the final date by which the assignment is supposed to be done.'}
        // tooltipStyle={styles.tooltipStyle}
        required={true}
        editable={primaryKeyEditable}
        label={'Date'}
        placeholder={'Pick date'}
        secureTextEntry={false}
        value={dataModel.paymentDate}
        format="DD-MM-YYYY"
        mode="date"
        onDateChange={value => {
          dataModel.paymentDate = value;
          parentStateChange({ dataModel: dataModel })
        }}
        errorMessage={GeneralUtils.functions.getErrorMessage('field2', dataModel.paymentDate, errorField, [], 'Date')}
      />


      <SuggestionTextInput
        // tooltipReq={true}
        // tooltipMsg={'Mention the teacher incharge for this class.'}
        // tooltipStyle={styles.tooltipStyle}
        required={true}
        editable={primaryKeyEditable}
        label={'Student Name'}
        placeholder={'Select student name'}
        secureTextEntry={false}
        value={dataModel.studentName}
        onFocus={() => {
          //  if(dataModel.studentName == null || dataModel.studentName == '' ){
          SearchUtils.functions.launchSuggestion(stateObject, '', 'studentName')
          //  }
        }
        }
        onClear={() => {
          dataModel.studentName = '';
          dataModel.studentID = '';
          parentStateChange({ dataModel: dataModel })
        }}

        errorMessage={GeneralUtils.functions.getErrorMessage('field3', dataModel.studentName, errorField, [], 'Student Name')}
      />
      <InputText
        required={false}
        editable={false}
        label={'Student ID'}
        value={dataModel.studentID}
      />


      <View>
        <NewScreenDropDownPicker
          editable={editable}
          required={true}
          label={'Payment Mode'}
          stateObject={stateObject}
          items={SelectListUtils.functions.selectMaster.PayMentMaster}
          value={SelectListUtils.functions.getSelectedValue(SelectListUtils.functions.selectMaster.PayMentMaster, dataModel.paymentMode)}
          placeholder="Select payment mode"
          onChangeValue={(value) => {
            dataModel.paymentMode = value;
            parentStateChange({ dataModel: dataModel })

          }}
          dropdownName={'paymentDropdown'}
          subHeadingRecordName="a payment mode"
          onClear={() => {
            dataModel.paymentMode = '';
            parentStateChange({ dataModel: dataModel })
          }}

          errorMessage={GeneralUtils.functions.getErrorMessage('field4', dataModel.paymentMode, errorField, [], 'Payment Mode')}
        />
      </View>
      {/* <View style={AppStyles.marginTop_1}>
        <AmountInputText
    
          currencyCode={stateObject.state.currencyCode}
          required={true}
          editable={!editable}
          label={'Amount'}
          secureTextEntry={false}
          onChangeText={text => {
            dataModel.amount = text
            parentStateChange({ dataModel: dataModel })
          }}
          value={dataModel.amount}
          errorMessage={GeneralUtils.functions.getErrorMessage('field4', dataModel.amount, errorField, [], 'Amount')}
        />
      </View> */}



      <SuggestionList
        stateObject={stateObject}
        searchFieldName={stateObject.state.searchFieldName}
        searchText={stateObject.state.searchText}
        visible={stateObject.state.seachVisible}
        searchName={'ReadOnly'}
        colHeading={['Name', 'Id']}
        mapping={['StudentName', 'StudentId']}
        SuggestionHeading={'Student'}
      />

    </View>
    );
  }
}


const styles = StyleSheet.create({

})
export default InstituteFeePaymentGeneral;

