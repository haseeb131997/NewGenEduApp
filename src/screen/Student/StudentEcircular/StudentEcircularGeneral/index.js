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
import AppStyles from "../../../../AppStyles/AppStyles";
import SearchUtils from "../../../../utils/SearchUtils";
import GeneralUtils from "../../../../utils/GeneralUtils";
import SuggestionList from '../../../../components/SuggestionList';
import SuggestionTextInput from '../../../../components/SuggestionTextInput';
import InputText from '../../../../components/InputText';
import CustomDatePicker from "../../../../components/CustomDatePicker"
import InputTextArea from '../../../../components/InputTextArea';
import { h, w } from "../../../../utils/Dimensions";












class StudentEcircularGeneral extends Component {
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


      <View >
        <InputText
          // tooltipReq={true}
          // tooltipMsg={'By default, system will provide an auto-generated Student ID that can be used. If the institute wants to assign their own student ID, then that ID can be entered replacing the auto-generated ID'}
          // tooltipStyle={styles.tooltipStyle}
          required={true}
          editable={!primaryKeyEditable}
          label={'Circular ID'}
          secureTextEntry={false}
          onChangeText={text => {
            dataModel.circularID = text
            parentStateChange({ dataModel: dataModel })
          }}
          value={dataModel.circularID}
          errorMessage={GeneralUtils.functions.getErrorMessage('field1', dataModel.circularID, errorField, [], 'Circular ID')}
        />
      </View>

      <View style={AppStyles.marginTop_1}>
        <InputText
          required={true}
          editable={!editable}
          label={'Description '}
          secureTextEntry={false}
          multiline={true}
          onChangeText={text => {
            dataModel.circularDescription = text
            parentStateChange({ dataModel: dataModel })
          }}
          value={dataModel.circularDescription}
          errorMessage={GeneralUtils.functions.getErrorMessage('field2', dataModel.circularDescription, errorField, [], 'Description ')}
        />
      </View>

      <View style={AppStyles.marginTop_1}>
        <SuggestionTextInput
          tooltipReq={true}
          tooltipMsg={'Mention the group for whom the circular is to be distributed.  '}
          tooltipStyle={styles.assigneetooltipStyle}
          required={true}
          editable={editable}
          label={'Assignee Group'}
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

        errorMessage={GeneralUtils.functions.getErrorMessage('field3', dataModel.groupID, errorField, [], 'Assignee group')}

        />

      </View>
      <View style={AppStyles.marginTop_1}>
        <InputText
          required={false}
          editable={false}
          label={'Assignee Group Description'}
          value={dataModel.groupDesc}
          multiline={true}
        />

      </View>


      <View style={AppStyles.marginTop_1}>
        <CustomDatePicker
          tooltipReq={true}
          tooltipMsg={'Specify the date on which the circular is to be issued.'}
          tooltipStyle={styles.dateTooltipStyle}
          required={true}
          editable={editable}
          label={'Circular Date'}
          placeholder={'Pick circular Date'}
          secureTextEntry={false}
          // onChangeText={text => console.log(text,'p')}
          value={dataModel.circularDate}
          format="DD-MM-YYYY"
          mode="date"
          onDateChange={value => {
            dataModel.circularDate = value;
            parentStateChange({ dataModel: dataModel })
          }}
          errorMessage={GeneralUtils.functions.getErrorMessage('field4', dataModel.circularDate, errorField, [], 'Circular Date')}
        />
      </View>


      <View style={AppStyles.marginTop_1}>
      <InputTextArea
        tooltipReq={true}
        tooltipMsg={'Enter Information for the parents/students that will be sent to the parents/student through mail/sms/ they can view in their login.'}
        tooltipStyle={styles.tooltipStyle}
        required={false}
        editable={!editable}
        label={'Instructions to Parents/Students'}
        secureTextEntry={false}
        value={dataModel.notes}
        placeholder={''}
        onChangeText={text => {
          dataModel.notes = text;
          parentStateChange({ dataModel: dataModel })
        }}

      />
      </View>




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
  tooltipStyle: {
    width: w('45%'),
    height: h('25%')

  },
  assigneetooltipStyle: {
    width: w('45%'),
    height: h('15%')

  },
  dateTooltipStyle: {
    width: w('60%'),
    height: h('10%')

  }
})
export default StudentEcircularGeneral;

