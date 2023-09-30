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
import { h,w } from "../../../../utils/Dimensions";











class InstituteFeeManagementGeneral extends Component {
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
        label={'Fee ID'}
        secureTextEntry={false}
        onChangeText={text => {
          dataModel.feeID = text
          parentStateChange({ dataModel: dataModel })
        }}
        value={dataModel.feeID}
        errorMessage={GeneralUtils.functions.getErrorMessage('field1', dataModel.feeID, errorField, [], 'Fee ID')}
      />

      <InputText
        // tooltipReq={true}
        // tooltipMsg={'Enter the description about the video.'}
        required={true}
        editable={!editable}
        label={'Fee Description'}
        secureTextEntry={false}
        multiline={true}
        onChangeText={text => {
          dataModel.feeDescription = text
          parentStateChange({ dataModel: dataModel })
        }}
        value={dataModel.feeDescription}
        errorMessage={GeneralUtils.functions.getErrorMessage('field2', dataModel.feeDescription, errorField, [], 'Fee description')}
      />


        <NewScreenDropDownPicker
          tooltipReq={true}
        tooltipMsg={'Select the appropriate fee type (like tution, events, exams,etc.) for which the fee is to be collected.'}
        tooltipStyle={styles.typetooltipStyle}
          editable={editable}
          required={true}
          label={'Fee Type'}
          stateObject={stateObject}
          items={SelectListUtils.functions.selectMaster.FeeMaster}
          value={SelectListUtils.functions.getSelectedValue(SelectListUtils.functions.selectMaster.FeeMaster, dataModel.feeType)}
          placeholder="Select Fee Type"
          onChangeValue={(value) => {
            dataModel.feeType = value;
            parentStateChange({ dataModel: dataModel })

          }}
          dropdownName={'typeDropdown'} 
          subHeadingRecordName = "a type"
          onClear={() => {
            dataModel.feeType= '';
          parentStateChange({ dataModel: dataModel })
        }}

          errorMessage={GeneralUtils.functions.getErrorMessage('field3', dataModel.feeType, errorField, [], 'Fee type')}
        />
  

      <AmountInputText
        // tooltipReq={true}
        // tooltipMsg={'By default, system will provide an auto-generated Student ID that can be used. If the institute wants to assign their own student ID, then that ID can be entered replacing the auto-generated ID'}
        // tooltipStyle={styles.tooltipStyle}
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

        <SuggestionTextInput
          tooltipReq={true}
          tooltipMsg={'Mention the class/group for whom the fee structure is to be created.'}
          tooltipStyle={styles.grptooltipStyle}
          required={true}
          editable={editable}
          label={'Assignee group'}
          placeholder={'Select assignee group'}
          secureTextEntry={false}
          value={dataModel.groupID}
          onFocus={() => {
            //  if(dataModel.groupID == null || dataModel.groupID == '' ){
            SearchUtils.functions.launchSuggestion(stateObject, '', 'groupId')
            //  }
          }
          }
          onClear={() => {
            dataModel.groupID = '';
            dataModel.groupDesc = '';
            parentStateChange({ dataModel: dataModel })
          }}

          errorMessage={GeneralUtils.functions.getErrorMessage('field5', dataModel.groupID, errorField, [], 'Assignee group')}

        />

        <InputText
          required={false}
          editable={false}
          label={'Assignee Group Description'}
          value={dataModel.groupDesc}
          multiline={true}
        />

 

      {/* <View style={AppStyles.marginTop_1}> */}

        <CustomDatePicker
          tooltipReq={true}
          tooltipMsg={'Specify the final date by which the fee is to be paid.'}
          // tooltipStyle={styles.tooltipStyle}
          required={true}
          editable={editable}
          label={'Due Date'}
          placeholder={'Pick due date'}
          secureTextEntry={false}
          // onChangeText={text => console.log(text,'p')}
          value={dataModel.dueDate}
          format="DD-MM-YYYY"
          mode="date"
          onDateChange={value => {
            dataModel.dueDate = value;
            parentStateChange({ dataModel: dataModel })
          }}
          errorMessage={GeneralUtils.functions.getErrorMessage('field6', dataModel.dueDate, errorField, [], 'Due Date')}
        />
      {/* </View> */}



      {/* {stateObject.state.currentOperation == "Create" && <Text>{'\n \n \n \n \n \n \n \n \n \n'}</Text>} */}






      <SuggestionList
        stateObject={stateObject}
        searchFieldName={stateObject.state.searchFieldName}
        searchText={stateObject.state.searchText}
        visible={stateObject.state.seachVisible}
        searchName={'groupId'}
        colHeading={['Group ID', 'Description',]}
        mapping={['groupID', 'groupDescription',]}
        SuggestionHeading={'Assignee group'}
      />

    </View>
    );
  }
}


const styles = StyleSheet.create({
typetooltipStyle:{
  width:w('65%'),
  height:h('15%')
},
grptooltipStyle:{
  width:w('60%'),
  height:h('15%')
}
})
export default InstituteFeeManagementGeneral;

