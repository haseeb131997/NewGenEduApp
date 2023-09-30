
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
import { View, StyleSheet, Platform, } from 'react-native';
import { TextInput, Text } from 'react-native-paper';
import { w, h } from "../../../../utils/Dimensions";
import AppStyles from "../../../../AppStyles/AppStyles";
import SelectListUtils from '../../../../utils/SelectListUtils'
import { UiColor } from "../../../../theme";
import CustomDatePicker from "../../../../components/CustomDatePicker"
import NewScreenDropDownPicker from '../../../../components/NewScreenDropDownPicker';
import InputTextArea from '../../../../components/InputTextArea';
import GeneralUtils from "../../../../utils/GeneralUtils";
import SuggestionTextInput from '../../../../components/SuggestionTextInput';
import SuggestionList from '../../../../components/SuggestionList';
import SearchUtils from "../../../../utils/SearchUtils";
import CustomRadioButton from '../../../../components/CustomRadioButton';
import CustomLabel from '../../../../components/CustomLabel';






class InstituteHolidayGeneral extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    }
  }


  chooseOptions(type) {
    const {
      stateObject
    } = this.props

    const { dataModel } = stateObject.state
    if (type == 'allClass') {
      dataModel.classCode = 'ALL';
      dataModel.classDesc = 'ALL';
      stateObject.parentStateChange({
        selectOption: type,
        dataModel: dataModel
      })
    }
    else if (type == 'class') {
      dataModel.classCode = '';
      dataModel.classDesc = '';
      stateObject.parentStateChange({
        selectOption: type,
        dataModel: dataModel
      })


    }


  }


  render() {
    const {
      stateObject
    } = this.props
    const { dataModel, editable, primaryKeyEditable, summaryDataModel, errorField } = stateObject.state
    const { parentStateChange } = stateObject


    if (stateObject.state.currentOperation == 'Modification') {
      if (dataModel.classCode == 'ALL') {
        stateObject.state.selectOption = 'allClass'
      }
      else {
        stateObject.state.selectOption = 'class'
      }

    }

    return (
      <View >
        {stateObject.state.currentOperation == 'Create' ? <View>
          <View style={[AppStyles.marginTop_2]}>
            <NewScreenDropDownPicker
              editable={primaryKeyEditable}
              required={true}
              label={'Month'}
              stateObject={stateObject}
              items={SelectListUtils.functions.selectMaster.MonthMaster}
              value={SelectListUtils.functions.getSelectedValue(SelectListUtils.functions.selectMaster.MonthMaster, dataModel.month)}
              placeholder="Select Month"
              onChangeValue={(value) => {
                dataModel.month = value;
                parentStateChange({ dataModel: dataModel })

              }}
              dropdownName={'monthDropdown'}
              subHeadingRecordName="a month"
              onClear={() => {
                dataModel.month = '';
                parentStateChange({ dataModel: dataModel })
              }}
              errorMessage={GeneralUtils.functions.getErrorMessage('field1', dataModel.month, errorField, [], 'Month')}
            />
          </View>

          <View style={[AppStyles.marginTop_1]}>
            <NewScreenDropDownPicker
              editable={primaryKeyEditable}
              required={true}
              label={'Year'}
              stateObject={stateObject}
              items={SelectListUtils.functions.selectMaster.YearMaster}
              value={SelectListUtils.functions.getSelectedValue(SelectListUtils.functions.selectMaster.YearMaster, dataModel.year)}
              placeholder="Select Year"
              onChangeValue={(value) => {
                dataModel.year = value;
                parentStateChange({ dataModel: dataModel })

              }}
              dropdownName={'yearDropdown'}
              subHeadingRecordName="a year"
              onClear={() => {
                dataModel.year = '';
                parentStateChange({ dataModel: dataModel })
              }}
              errorMessage={GeneralUtils.functions.getErrorMessage('field2', dataModel.year, errorField, [], 'Year')}
            />
          </View>


          <CustomLabel
            label={'Do you want this holiday to be applicable for all the classes in your Institute?'}
            required={true}
            //  tooltipReq={}
            //  tooltipMsg={}
            //  tooltipStyle={}
            template={
              <View style={AppStyles.marginTop_2} >
                <CustomRadioButton
                  label={'Yes, apply this holiday to all the classes in my Institute.'}
                  onPress={() => this.chooseOptions('allClass')}
                  checked={stateObject.state.selectOption == 'allClass' ? true : false}
                  disabled={false}

                />

                <CustomRadioButton
                  label={'No, I want this holiday to be applicable to a specific class.'}
                  onPress={() => this.chooseOptions('class')}
                  checked={stateObject.state.selectOption == 'class' ? true : false}
                  disabled={false}
                />

              </View>
            }
            errorMessage={GeneralUtils.functions.getErrorMessage('field4', stateObject.state.selectOption, errorField, [], 'Select anyone')}
          />




          {stateObject.state.selectOption == 'class' && <View style={AppStyles.marginTop_2}>
            <SuggestionTextInput
              tooltipReq={true}
              tooltipMsg={'By default, holidays are maintained for all classes of an institute. If you want to maintain holiday for a specific class, select the required class.'}
              tooltipStyle={styles.tooltipStyle}
              required={true}
              editable={primaryKeyEditable}
              label={'Class'}
              placeholder={'Select class'}
              secureTextEntry={false}
              value={dataModel.classCode}
              onFocus={() => SearchUtils.functions.launchSuggestion(stateObject, '', 'class')}
              onClear={() => {
                dataModel.classCode = '';
                dataModel.classDesc = '';
                parentStateChange({ dataModel: dataModel })
              }}
              errorMessage={GeneralUtils.functions.getErrorMessage('field3', dataModel.classCode, errorField, [], 'Class')}

            /></View>}

          <SuggestionList
            stateObject={stateObject}
            searchFieldName={stateObject.state.searchFieldName}
            searchText={stateObject.state.searchText}
            visible={stateObject.state.seachVisible}
            searchName={'classCodeDataModel'}
            colHeading={['Class', 'Desc', 'Year/Standard', 'Major/Section']}
            mapping={['classCode', 'classDesc', 'standard', 'section']}
            SuggestionHeading={'Class'}

          />
        </View> : <View style={[AppStyles.dashContainer, AppStyles.marginTop_3]}>
          {/* <Subheading >{rowData.month}</Subheading> */}
          <Text style={AppStyles.holidayInstructionStyle}> {dataModel.classCode == 'ALL' ? 'Holiday is applicable for all the classes in the Institute' : `Holiday is applicable for the class ${dataModel.classDesc}`}</Text>
        </View>}



      </View>
    );
  }
}


const styles = StyleSheet.create({
  tooltipStyle: {
    height: h('25%'), width: w('60%')
  }
})
export default InstituteHolidayGeneral;

