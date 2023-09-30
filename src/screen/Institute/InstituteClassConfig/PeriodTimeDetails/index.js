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
import { View, StyleSheet, Image, TouchableWithoutFeedback, ScrollView,Platform } from 'react-native';
import SelectListUtils from '../../../../utils/SelectListUtils'
import AppStyles from "../../../../AppStyles/AppStyles";
import InputText from '../../../../components/InputText';
import GeneralUtils from "../../../../utils/GeneralUtils";
import NewScreenDropDownPicker from '../../../../components/NewScreenDropDownPicker';
import CustomTimePicker from "../../../../components/CustomTimePicker"
import SubScreenUtils from "../../../../utils/SubScreenUtils";








class InstituteClassConfigPeriod extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      // currentIndex: 1,
    }
  }


  // var periodTimingsEmptyrecord = {
  //   idx:"",
  //   class:"",
  //   periodNumber:"",
  //   noon:"",
  //   startTime:{
  //     hour:"",
  //     min:""
  //   },
  //   endTime:{
  //     hour:"",
  //     min:""
  //   }
  // }


  render() {
    const {
      stateObject,
      currentIndex
    } = this.props

    const { dataModel, editable, errorField,periodTimingsEmptyrecord } = stateObject.state
    const { parentStateChange } = stateObject
    var currentInd = 0
    if (currentIndex >= 1) {
      currentInd = currentIndex - 1
    }


    return (
      <View>
        <InputText
          required={true}
          editable={!editable}
          label={'Period number'}
          secureTextEntry={false}
          onChangeText={text => {
            periodTimingsEmptyrecord.periodNumber = text
            parentStateChange({ periodTimingsEmptyrecord: periodTimingsEmptyrecord })
          }}
          value={periodTimingsEmptyrecord.periodNumber}
          errorMessage={GeneralUtils.functions.getErrorMessage('field7', periodTimingsEmptyrecord.periodNumber, errorField, [], 'Period number')}
        />
        <View >
          <NewScreenDropDownPicker
            editable={editable}
            required={true}
            label={'Noon'}
            stateObject={stateObject}
            items={SelectListUtils.functions.selectMaster.AttendanceNoonMaster}
            value={SelectListUtils.functions.getSelectedValue(SelectListUtils.functions.selectMaster.AttendanceNoonMaster,periodTimingsEmptyrecord.noon)}
            placeholder="Select Noon"

            onChangeValue={(value) => {
              periodTimingsEmptyrecord.noon = value;
              parentStateChange({ periodTimingsEmptyrecord: periodTimingsEmptyrecord })

            }}
            dropdownName={'noonDropdown'} 
            subHeadingRecordName = "a noon"
            onClear={() => {
              periodTimingsEmptyrecord.noon = '';
              parentStateChange({ periodTimingsEmptyrecord: periodTimingsEmptyrecord })
            }}
            errorMessage={GeneralUtils.functions.getErrorMessage('field8', periodTimingsEmptyrecord.noon, errorField, [], 'Noon')}
          />
        </View>

        <View style={AppStyles.marginTop_1}>

          <CustomTimePicker
            required={true}
            editable={editable}
            label={'Start Time'}
            placeholder={'Pick start time'}
            secureTextEntry={false}
            value={SubScreenUtils.functions.getTimeValue(periodTimingsEmptyrecord.startTime.hour,periodTimingsEmptyrecord.startTime.min)}
            mode="time"
            onDateChange={value => {
              
              periodTimingsEmptyrecord.startTime.hour = SubScreenUtils.functions.setTimeValue(value).hour;
              periodTimingsEmptyrecord.startTime.min = SubScreenUtils.functions.setTimeValue(value).min;
              parentStateChange({ periodTimingsEmptyrecord: periodTimingsEmptyrecord })
            }}
            errorMessage={GeneralUtils.functions.getErrorMessage('field9',  periodTimingsEmptyrecord.startTime.hour, errorField, [], 'Start Time')}
            is24Hour={true}
          />
        </View>

        <View style={AppStyles.marginTop_1}>
          <CustomTimePicker
            required={true}
            editable={editable}
            label={'End Time'}
            placeholder={'Pick end time'}
            secureTextEntry={false}
            value={SubScreenUtils.functions.getTimeValue(periodTimingsEmptyrecord.endTime.hour,periodTimingsEmptyrecord.endTime.min)}
            mode="time"
            onDateChange={value => {
              periodTimingsEmptyrecord.endTime.hour = SubScreenUtils.functions.setTimeValue(value).hour;
              periodTimingsEmptyrecord.endTime.min = SubScreenUtils.functions.setTimeValue(value).min;
              parentStateChange({ periodTimingsEmptyrecord: periodTimingsEmptyrecord })
            }}
            errorMessage={GeneralUtils.functions.getErrorMessage('field10', periodTimingsEmptyrecord.endTime.hour, errorField, [], 'End Time')}
            is24Hour={true}
          />
        </View>







        {/* <TextInput
         disabled={!editable}
          label={'Period Number *'}
          mode='flat'
          keyboardType='numeric'
          theme={{ colors: { primary: '#2C87D7', } }}
          value={dataModel.periodTimings[currentInd].periodNumber}
          onChangeText={text => {
            dataModel.periodTimings[currentInd].periodNumber = text;
            parentStateChange({ dataModel: dataModel })
          }}
          style={[AppStyles.textInput, AppStyles.marginTop_2]}
        />


        <View style={[{ flexDirection: 'row' }, AppStyles.marginTop_2]}>
          {editable ? <View style={AppStyles.viewBottomLine}>
            <Dropdown
              value={dataModel.periodTimings[currentInd].startTime.hour}
              containerStyle={AppStyles.smallDropdownStyle}
              inputContainerStyle={AppStyles.dropdownInputStyle}
              label='Start Hour *'               // SHA001

              data={SelectListUtils.functions.selectMaster.HourMaster}
              onChangeText={(value, index, data) => {
                dataModel.periodTimings[currentInd].startTime.hour = value;
                parentStateChange({ dataModel: dataModel })
              }}

            />
          </View> :
            <TextInput
              disabled={true}
              // label={'Start Time in Hour *'}
              label='Start Hour *'               // SHA001
              mode='flat'
              theme={{ colors: { primary: '#2C87D7', } }}
              value={dataModel.periodTimings[currentInd].startTime.hour}
              style={[AppStyles.smallTextInput]}
            />}
          {editable ? <View style={AppStyles.viewBottomLine}>
            <Dropdown
              // disabled={!editable}
              value={dataModel.periodTimings[currentInd].startTime.min}
              containerStyle={AppStyles.smallDropdownStyle}
              inputContainerStyle={AppStyles.dropdownInputStyle}
              // label='Start Time in Min *'
              label='Start Min *'                //   SHA001
              // start SHA002
            // fontSize={h(2.5)}
            // start SHA002
              data={SelectListUtils.functions.selectMaster.MinMaster}
              onChangeText={(value, index, data) => {
                dataModel.periodTimings[currentInd].startTime.min = value;
                parentStateChange({ dataModel: dataModel })
              }}

            />
          </View> :
            <TextInput
              disabled={true}
              // label={'Start Time in Min *'}
              label='Start Min *'                //   SHA001
              mode='flat'
              theme={{ colors: { primary: '#2C87D7', } }}
              value={dataModel.periodTimings[currentInd].startTime.min}
              style={[AppStyles.smallTextInput,]}
            />}
        </View>

        <View style={[{ flexDirection: 'row' }, AppStyles.marginTop_2]}>
          {editable ? <View style={AppStyles.viewBottomLine}>
            <Dropdown
              // disabled={!editable}
              value={dataModel.periodTimings[currentInd].endTime.hour}
              containerStyle={AppStyles.smallDropdownStyle}
              inputContainerStyle={AppStyles.dropdownInputStyle}
              // label='End Time in Hour *'
              label='End Hour *'                  //  SHA001
              // start SHA002
            // fontSize={h(2.5)}
            // start SHA002
              data={SelectListUtils.functions.selectMaster.HourMaster}
              onChangeText={(value, index, data) => {
                dataModel.periodTimings[currentInd].endTime.hour = value;
                parentStateChange({ dataModel: dataModel })
              }}

            />
          </View> :
            <TextInput
              disabled={true}
              // label={'End Time in Hour *'}
              label='End Hour *'                  //  SHA001
              mode='flat'
              theme={{ colors: { primary: '#2C87D7', } }}
              value={dataModel.periodTimings[currentInd].endTime.hour}

              style={[AppStyles.smallTextInput]}
            />}
          {editable ? <View style={AppStyles.viewBottomLine}>
            <Dropdown
              // disabled={!editable}
              value={dataModel.periodTimings[currentInd].endTime.min}
              containerStyle={AppStyles.smallDropdownStyle}
              inputContainerStyle={AppStyles.dropdownInputStyle}
              // label='End Time in Min *'
              label='End Min *'              // SHA001
        
              data={SelectListUtils.functions.selectMaster.MinMaster}
              onChangeText={(value, index, data) => {
                dataModel.periodTimings[currentInd].endTime.min = value;
                parentStateChange({ dataModel: dataModel })
              }}

            />
          </View> :
            <TextInput
              disabled={true}
              // label={'End Time in Min *'}
              label='End Min *'              // SHA001
              mode='flat'
              theme={{ colors: { primary: '#2C87D7', } }}
              value={dataModel.periodTimings[currentInd].endTime.min}
              style={[AppStyles.smallTextInput,]}
            />}
        </View>


        {editable ? <View style={AppStyles.viewBottomLine}>
          <Dropdown
            // disabled={!editable}
            value={SelectListUtils.functions.getSelectedValue(SelectListUtils.functions.selectMaster.AttendanceNoonMaster, dataModel.periodTimings[currentInd].noon)}
            containerStyle={AppStyles.dropdownStyle}
            inputContainerStyle={AppStyles.dropdownInputStyle}
            label='Select Noon *'
        
            data={SelectListUtils.functions.selectMaster.AttendanceNoonMaster}
            onChangeText={(value, index, data) => {
              dataModel.periodTimings[currentInd].noon = data[index].id;
              parentStateChange({ dataModel: dataModel })
            }}

          />
        </View> : <TextInput
            disabled ={true}
            label={'Noon *'}
            mode='flat'
            theme={{ colors: { primary: '#2C87D7', } }}
            value={SelectListUtils.functions.getSelectedValue(SelectListUtils.functions.selectMaster.AttendanceNoonMaster, dataModel.periodTimings[currentInd].noon)}
            style={[AppStyles.textInput, AppStyles.marginTop_2]}
          />} */}


      </View>
    );
  }
}

const styles = StyleSheet.create({

})
export default InstituteClassConfigPeriod;

