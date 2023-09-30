
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
import AppStyles from "../../../../AppStyles/AppStyles";
import SelectListUtils from '../../../../utils/SelectListUtils'
import NewScreenDropDownPicker from '../../../../components/NewScreenDropDownPicker';
import InputText from '../../../../components/InputText';






class TeacherOtherDetail extends Component {
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
      <View style={AppStyles.marginTop_2}>
        {/* <InputText
          required={false}
          editable={!editable}
          label={'National Id'}
          secureTextEntry={false}
          onChangeText={text => {
            dataModel.general.nationalID = text
            parentStateChange({ dataModel: dataModel })
          }}
          value={dataModel.general.nationalID}
          errorMessage={GeneralUtils.functions.getErrorMessage('field1', dataModel.general.nationalID, errorField, [], 'National Id')}
        /> */}

        <View >
          <NewScreenDropDownPicker
            editable={editable}
            required={false}
            label={'Blood Group'}
            stateObject={stateObject}
            items={SelectListUtils.functions.selectMaster.BloodGroupMaster}
            value={SelectListUtils.functions.getSelectedValue(SelectListUtils.functions.selectMaster.BloodGroupMaster, dataModel.general.bloodGroup)}
            placeholder="Select Blood Group"
            onChangeValue={(value) => {
              dataModel.general.bloodGroup = value;
              parentStateChange({ dataModel: dataModel })

            }}
            dropdownName={'grpDropdown'} 
            subHeadingRecordName = "a blood group"
            onClear={() => {
              dataModel.general.bloodGroup = '';
              parentStateChange({ dataModel: dataModel })
            }}
            // errorMessage={GeneralUtils.functions.getErrorMessage('field1', dataModel.general.bloodGroup, errorField, [], 'Blood Group')}
          />
        </View>

        <InputText
          required={false}
          editable={!editable}
          label={'Existing Medical Details'}
          secureTextEntry={false}
          onChangeText={text => {
            dataModel.emergency.existingMedicalDetails = text
            parentStateChange({ dataModel: dataModel })
          }}
          value={dataModel.emergency.existingMedicalDetails}
          // errorMessage={GeneralUtils.functions.getErrorMessage('field1', dataModel.emergency.existingMedicalDetails, errorField, [], 'Existing Medical Details')}
        />

        {<InputText
          required={false}
          editable={!editable}
          label={'Note'}
          secureTextEntry={false}
          onChangeText={text => {
            dataModel.note = text
            parentStateChange({ dataModel: dataModel })
          }}
          value={dataModel.note}
          multiline={true}
        // errorMessage={GeneralUtils.functions.getErrorMessage('field1', dataModel.note, errorField, [], 'Note')}
        />}




      </View>
    );
  }
}


const styles = StyleSheet.create({

})
export default TeacherOtherDetail;

