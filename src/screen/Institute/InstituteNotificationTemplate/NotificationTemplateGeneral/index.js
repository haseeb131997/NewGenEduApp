
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
import { View, StyleSheet, Platform } from 'react-native';
import { w, h } from "../../../../utils/Dimensions";
import SelectListUtils from '../../../../utils/SelectListUtils'
import NewScreenDropDownPicker from '../../../../components/NewScreenDropDownPicker';
import GeneralUtils from "../../../../utils/GeneralUtils";
import InputText from '../../../../components/InputText';
import AppStyles from "../../../../AppStyles/AppStyles";







class NotificationTemplateGeneral extends Component {
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
    const { dataModel, editable, primaryKeyEditable, summaryDataModel, errorField } = stateObject.state
    const { parentStateChange } = stateObject

    return (
      <View style={AppStyles.marginTop_1}>
        <InputText
          tooltipReq={false}
          // tooltipMsg={'By default, system will provide an auto-generated Student ID that can be used. If the institute wants to assign their own student ID, then that ID can be entered replacing the auto-generated ID'}
          // tooltipStyle={styles.tooltipStyle}
          required={true}
          editable={!primaryKeyEditable}
          label={'Template ID'}
          secureTextEntry={false}
          onChangeText={text => {
            dataModel.templateID = text
            parentStateChange({ dataModel: dataModel })
          }}
          value={dataModel.templateID}
          errorMessage={GeneralUtils.functions.getErrorMessage('field1', dataModel.templateID, errorField, [], 'Template ID')}
        />


        <InputText
          tooltipReq={false}
          // tooltipMsg={'Enter the description about the study material.'}
          // tooltipStyle={styles.tooltipStyle}
          required={true}
          editable={!editable}
          label={'Template Description'}
          secureTextEntry={false}
          multiline={true}
          onChangeText={text => {
            dataModel.templateDescription = text
            parentStateChange({ dataModel: dataModel })
          }}
          value={dataModel.templateDescription}
          errorMessage={GeneralUtils.functions.getErrorMessage('field2', dataModel.templateDescription, errorField, [], 'Template Description')}
        />


        <NewScreenDropDownPicker
          tooltipReq={true}
          tooltipMsg={'Select the message type'}
          tooltipStyle={styles.tooltipStyle}
          editable={primaryKeyEditable}
          required={true}
          label={'Message type'}
          stateObject={stateObject}
          items={SelectListUtils.functions.selectMaster.NotificationMaster}
          value={SelectListUtils.functions.getSelectedValue(SelectListUtils.functions.selectMaster.NotificationMaster, dataModel.messageType)}
          placeholder="Select message type"
          onChangeValue={(value) => {
            dataModel.messageType = value;
            parentStateChange({ dataModel: dataModel })

          }}
          dropdownName={'messageTypeDropdown'}
          subHeadingRecordName="a message type"
          onClear={() => {
            dataModel.messageType = '';
            parentStateChange({ dataModel: dataModel })
          }}
          errorMessage={GeneralUtils.functions.getErrorMessage('field3', dataModel.messageType, errorField, [], 'Message type')}
        />

        <NewScreenDropDownPicker
          tooltipReq={false}
          tooltipMsg={'Select the required channel on which message to be sent'}
          tooltipStyle={styles.tooltipStyle}
          editable={primaryKeyEditable}
          required={true}
          label={'Channel'}
          stateObject={stateObject}
          items={SelectListUtils.functions.selectMaster.MediaCommunication}
          value={SelectListUtils.functions.getSelectedValue(SelectListUtils.functions.selectMaster.MediaCommunication, dataModel.channel)}
          placeholder="Select channel"
          onChangeValue={(value) => {
            dataModel.channel = value;
            parentStateChange({ dataModel: dataModel })

          }}
          dropdownName={'channelDropDown'}
          subHeadingRecordName="a channel"
          onClear={() => {
            dataModel.channel = '';
            parentStateChange({ dataModel: dataModel })
          }}
          errorMessage={GeneralUtils.functions.getErrorMessage('field4', dataModel.channel, errorField, [], 'Channel')}
        />

        <NewScreenDropDownPicker
          tooltipReq={true}
          tooltipMsg={'Select the desired language(English/local) for the notification template so that parent/staff can view messages in that particular language.'}
          tooltipStyle={styles.lantooltipStyle}
          editable={primaryKeyEditable}
          required={true}
          label={'Language'}
          stateObject={stateObject}
          items={SelectListUtils.functions.selectMaster.LanguageMaster}
          value={SelectListUtils.functions.getSelectedValue(SelectListUtils.functions.selectMaster.LanguageMaster, dataModel.language)}
          placeholder="Select language"
          onChangeValue={(value) => {
            dataModel.language = value;
            parentStateChange({ dataModel: dataModel })

          }}
          dropdownName={'languageDropDown'}
          subHeadingRecordName="a language"
          onClear={() => {
            dataModel.language = '';
            parentStateChange({ dataModel: dataModel })
          }}
          errorMessage={GeneralUtils.functions.getErrorMessage('field5', dataModel.language, errorField, [], 'Language')}
        />



      </View>
    );
  }
}


const styles = StyleSheet.create({
  tooltipStyle: {
    height: h('10%'), width: w('65%')
  },
  lantooltipStyle: {
    height: h('20%'), width: w('65%')
  }
})
export default NotificationTemplateGeneral;

