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
import { Card } from 'react-native-paper';
import AppStyles from "../../../../AppStyles/AppStyles";
//import SelectListUtils from '../../../../utils/SelectListUtils'
import GeneralUtils from "../../../../utils/GeneralUtils";
//import NewScreenDropDownPicker from '../../../../components/NewScreenDropDownPicker';
import CustomDatePicker from "../../../../components/CustomDatePicker"
//import { h, w } from "../../../../utils/Dimensions";
import CustomTimePicker from "../../../../components/CustomTimePicker"
import SubScreenUtils from "../../../../utils/SubScreenUtils";
//import CustomCheckBox from '../../../../components/CustomCheckBox';
import InputTextArea from '../../../../components/InputTextArea';
import LabelText from '../../../../components/LabelText';








class OnlineParentMeetingTiming extends Component {
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



    return (stateObject.state.currentOperation == 'Create' || stateObject.state.currentOperation == 'Modification') ? (<View style={[AppStyles.marginTop_2]}>
      <CustomDatePicker
        tooltipReq={true}
        tooltipMsg={'Specify the Meeting date'}
        // tooltipMsg={'Specify the date for which the attendance is to be taken.'}
        // tooltipStyle={styles.tooltipStyle}
        required={true}
        editable={editable}
        label={'Date'}
        placeholder={'Pick date'}
        secureTextEntry={false}
        // onChangeText={text => console.log(text,'p')}
        value={dataModel.date}
        format="DD-MM-YYYY"
        mode="date"
        onDateChange={value => {
          dataModel.date = value;
          parentStateChange({ dataModel: dataModel })
        }}
        errorMessage={GeneralUtils.functions.getErrorMessage('field4', dataModel.date, errorField, [], 'Date')}
      />


      <CustomTimePicker
       tooltipReq={true}
       tooltipMsg={'Specify the Meeting start time'}
        required={true}
        editable={editable}
        label={'Starting Time'}
        placeholder={'Pick starting time'}
        secureTextEntry={false}
        value={SubScreenUtils.functions.getTimeValue(dataModel.startTimeHour, dataModel.startTimeMin)}
        mode="time"
        onDateChange={value => {
          dataModel.startTimeHour = SubScreenUtils.functions.setTimeValue(value).hour;
          dataModel.startTimeMin = SubScreenUtils.functions.setTimeValue(value).min;
          parentStateChange({ dataModel: dataModel })
        }}
        errorMessage={GeneralUtils.functions.getErrorMessage('field5', dataModel.startTimeHour, errorField, [], 'Start Time')}
        is24Hour={true}
      />

{/*
      <NewScreenDropDownPicker
        editable={editable}
        required={true}
        label={'Duration Min'}
        stateObject={stateObject}
        items={SelectListUtils.functions.selectMaster.MinMaster}
        value={SelectListUtils.functions.getSelectedValue(SelectListUtils.functions.selectMaster.MinMaster, dataModel.duration)}
        placeholder="Select duration"
        onChangeValue={(value) => {
          dataModel.duration = value;
          parentStateChange({ dataModel: dataModel })

        }}
        dropdownName={'durationDropdown'}
        subHeadingRecordName="a duration"
        onClear={() => {
          dataModel.duration = '';
          parentStateChange({ dataModel: dataModel })
        }}
        errorMessage={GeneralUtils.functions.getErrorMessage('field6', dataModel.duration, errorField, [], 'Duration Min')}
      />
 */
<CustomTimePicker
      tooltipReq={true}
      tooltipMsg={'Specify the Meeting End time'}
        required={true}
        editable={editable}
        label={'End Time'}
        placeholder={'Pick End time'}
        secureTextEntry={false}
        value={SubScreenUtils.functions.getTimeValue(dataModel.endTimeHour, dataModel.endTimeMin)}
        mode="time"
        onDateChange={value => {
          dataModel.endTimeHour = SubScreenUtils.functions.setTimeValue(value).hour;
          dataModel.endTimeMin = SubScreenUtils.functions.setTimeValue(value).min;
          parentStateChange({ dataModel: dataModel })
        }}
        errorMessage={GeneralUtils.functions.getErrorMessage('field6', dataModel.endTimeHour, errorField, [], 'End Time')}
        is24Hour={true}
      />
      }

     


    

       <InputTextArea
        tooltipReq={true}
        tooltipMsg={'Use your Zoom or Microsoft teams account or any other video app to create a meeting for this classroom. Then enter the meeting URL here.'}
        required={true}
        editable={!editable}
          label={'Meeting link'}
          secureTextEntry={false}
          value={dataModel.zoomTeamsLink}
          placeholder={'Enter meeting link'}
          onChangeText={text => {
            dataModel.zoomTeamsLink = text
            parentStateChange({ dataModel: dataModel })
          }}
          errorMessage={GeneralUtils.functions.getErrorMessage('field7', dataModel.zoomTeamsLink, errorField, [], 'Zoom or Microsoft Teams meeting link')}

        />

      {/* <View style={AppStyles.marginTop_2}>
        <CustomCheckBox
          label={'SMS Notification Required'}
          onPress={() => {
            dataModel.smsNotification = !dataModel.smsNotification;
            parentStateChange({ dataModel: dataModel })
          }}
          checked={dataModel.smsNotification ? true : false}
          disabled={editable}
        />
      </View>

      <View style={AppStyles.marginTop_2}>
        <CustomCheckBox
          label={'E-mail Notification Required'}
          onPress={() => {
            dataModel.emailNotification = !dataModel.emailNotification;
            parentStateChange({ dataModel: dataModel })
          }}
          checked={dataModel.emailNotification ? true : false}
          disabled={editable}
        />
      </View> */}



    </View>
    ) : (<View>
      <Card.Content>
        <LabelText
          label={'Date'}
          value={dataModel.date}
        />
        <LabelText
          label={'Starting Time'}
          value={SubScreenUtils.functions.getTimeValue(dataModel.startTimeHour, dataModel.startTimeMin)}
        />
        <LabelText
          label={'Duration Min'}
          value={dataModel.duration}
        />
        <LabelText
          label={'Meeting link'}
          value={dataModel.zoomTeamsLink}
        />

        {/* <View style={AppStyles.marginTop_2}>
          <CustomCheckBox
            label={'SMS Notification Required'}
            checked={dataModel.smsNotification ? true : false}
            disabled={editable}
          />
        </View>

        <View style={AppStyles.marginTop_2}>
          <CustomCheckBox
            label={'E-mail Notification Required'}
            checked={dataModel.emailNotification ? true : false}
            disabled={editable}
          />
        </View> */}
      </Card.Content>
    </View>);
  }
}


const styles = StyleSheet.create({

})
export default OnlineParentMeetingTiming;

