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
import { View, StyleSheet,  } from 'react-native';
import { w, h } from "../../../../utils/Dimensions";
import AppStyles from "../../../../AppStyles/AppStyles";
import SearchUtils from "../../../../utils/SearchUtils";
import InputText from '../../../../components/InputText';
import GeneralUtils from "../../../../utils/GeneralUtils";
import SuggestionList from '../../../../components/SuggestionList';
import SuggestionTextInput from '../../../../components/SuggestionTextInput';
import CustomDatePicker from "../../../../components/CustomDatePicker"










class ClassStudentRegisterGeneral extends Component {
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

    return (<View style={AppStyles.marginTop_2}>
      <InputText
        required={true}
        editable={!primaryKeyEditable}
        label={'Register ID'}
        secureTextEntry={false}
        onChangeText={text => {
          dataModel.registerID = text
          parentStateChange({ dataModel: dataModel })
        }}
        value={dataModel.registerID}
        errorMessage={GeneralUtils.functions.getErrorMessage('field1', dataModel.registerID, errorField, [], 'Register ID')}
      />

      <SuggestionTextInput
        tooltipReq={true}
        tooltipMsg={'Mention the class for which the student register is to be created.'}
        // tooltipStyle={styles.tooltipStyle}
        required={true}
        editable={primaryKeyEditable}
        label={'Class'}
        placeholder={'Select class'}
        secureTextEntry={false}
        value={dataModel.class}
        onFocus={() => SearchUtils.functions.launchSuggestion(stateObject, '', 'class')}
        onClear={() => {
          dataModel.class = '';
          dataModel.classDesc = '';
          parentStateChange({ dataModel: dataModel })
        }}
        errorMessage={GeneralUtils.functions.getErrorMessage('field2', dataModel.class, errorField, [], 'Class')}
      />

      <View style={AppStyles.marginTop_1}>
        <CustomDatePicker
          tooltipReq={true}
          tooltipMsg={'Specify the starting date of the course period.'}
          required={true}
          editable={editable}
          label={'Start Date'}
          placeholder={'Pick start date'}
          secureTextEntry={false}
          // onChangeText={text => console.log(text,'p')}
          value={dataModel.startDate}
          format="DD-MM-YYYY"
          mode="date"
          onDateChange={value => {
            dataModel.startDate = value;
            parentStateChange({ dataModel: dataModel })
          }}
          errorMessage={GeneralUtils.functions.getErrorMessage('field3', dataModel.startDate, errorField, [], 'Start Date')}
        />
      </View>
      <View style={AppStyles.marginTop_1}>
        <CustomDatePicker
          tooltipReq={true}
          tooltipMsg={'Specify the ending date of the course period.'}
          required={true}
          editable={editable}
          label={'End Date'}
          placeholder={'Pick end date'}
          secureTextEntry={false}
          // onChangeText={text => console.log(text,'p')}
          value={dataModel.endDate}
          onDateChange={value => {
            dataModel.endDate = value;
            parentStateChange({ dataModel: dataModel })
          }}
          errorMessage={GeneralUtils.functions.getErrorMessage('field4', dataModel.endDate, errorField, [], 'End Date')}

        />

      </View>

      <SuggestionList
        stateObject={stateObject}
        searchFieldName={stateObject.state.searchFieldName}
        searchText={stateObject.state.searchText}
        visible={stateObject.state.seachVisible}
        searchName={'classDataModel'}
        colHeading={['Class', 'Desc', 'Year/Standard', 'Major/Section']}
        mapping={['classCode', 'classDesc', 'standard', 'section']}
        SuggestionHeading={'Class'}

      />


    </View>
    );
  }
}


const styles = StyleSheet.create({

})
export default ClassStudentRegisterGeneral;

