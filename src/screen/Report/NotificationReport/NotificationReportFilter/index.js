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
import SelectListUtils from '../../../../utils/SelectListUtils'
import AppStyles from "../../../../AppStyles/AppStyles";
import FilterSuggestionTextInput from '../../../../components/FilterSuggestionTextInput';
import SuggestionList from '../../../../components/SuggestionList';
import SearchUtils from "../../../../utils/SearchUtils";
import GeneralUtils from "../../../../utils/GeneralUtils";
import CustomDropDownPicker from '../../../../components/CustomDropDownPicker';
import FilterCustomDatePicker from "../../../../components/FilterCustomDatePicker"






var searchName = ""


class NotificationReportFilter extends Component {
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
    const { dataModel, errorField } = stateObject.state
    const { parentStateChange } = stateObject
    return (
      <View style={[AppStyles.margin_1]}>


      


        <FilterCustomDatePicker
          required={true}
          label={'From Date'}
          placeholder={'Pick from date'}
          secureTextEntry={false}
          value={dataModel.Master.fromDate}
          format="DD-MM-YYYY"
          mode="date"
          onDateChange={value => {
            dataModel.Master.fromDate = value;
            parentStateChange({ dataModel: dataModel })
          }}
          errorMessage={GeneralUtils.functions.getErrorMessage('field2', dataModel.Master.fromDate, errorField, [], 'From Date')}
        />

        <FilterCustomDatePicker
          required={true}
          label={'To Date'}
          placeholder={'Pick to date'}
          secureTextEntry={false}
          value={dataModel.Master.toDate}
          format="DD-MM-YYYY"
          mode="date"
          onDateChange={value => {
            dataModel.Master.toDate = value;
            parentStateChange({ dataModel: dataModel })
          }}
          errorMessage={GeneralUtils.functions.getErrorMessage('field3', dataModel.Master.toDate, errorField, [], 'To Date')}
        />


<CustomDropDownPicker
          required={false}
          label={'Notification Type'}
          stateObject={stateObject}
          items={SelectListUtils.functions.selectMaster.NotificationMaster}
          value={SelectListUtils.functions.getSelectedValue(SelectListUtils.functions.selectMaster.NotificationMaster, dataModel.Master.notificationType)}
          placeholder="Select notification type"
          onChangeValue={(value) => {
            dataModel.Master.notificationType = value;
            parentStateChange({ dataModel: dataModel })
          }}
          dropdownName={'notificationDropdown'}
          subHeadingRecordName="a notification type"
          onClear={() => {
            dataModel.Master.notificationType = '';
            parentStateChange({ dataModel: dataModel })
          }}
          // errorMessage={GeneralUtils.functions.getErrorMessage('field1', dataModel.Master.notificationType, errorField, [], 'Notification Type')}
        />


         <CustomDropDownPicker
          required={false}
          label={'Channel'}
          stateObject={stateObject}
          items={SelectListUtils.functions.selectMaster.MediaCommunication}
          value={SelectListUtils.functions.getSelectedValue(SelectListUtils.functions.selectMaster.MediaCommunication, dataModel.Master.channel)}
          placeholder="Select channel"
          onChangeValue={(value) => {
            dataModel.Master.channel = value;
            parentStateChange({ dataModel: dataModel })
          }}
          dropdownName={'channelDropdown'}
          subHeadingRecordName="a channel"
          onClear={() => {
            dataModel.Master.channel = '';
            parentStateChange({ dataModel: dataModel })
          }}
         
        />

       <CustomDropDownPicker
          required={false}
          label={'Notification status'}
          stateObject={stateObject}
          items={SelectListUtils.functions.selectMaster.NotificationStatusMaster}
          value={SelectListUtils.functions.getSelectedValue(SelectListUtils.functions.selectMaster.NotificationStatusMaster, dataModel.Master.notificationStatus)}
          placeholder="Select notification status"
          onChangeValue={(value) => {
            dataModel.Master.notificationStatus = value;
            parentStateChange({ dataModel: dataModel })
          }}
          dropdownName={'notificationStatusDropdown'}
          subHeadingRecordName="a notification status'"
          onClear={() => {
            dataModel.Master.notificationStatus = '';
            parentStateChange({ dataModel: dataModel })
          }}
         
        />








      </View>

    );
  }
}

const styles = StyleSheet.create({

})
export default NotificationReportFilter;

