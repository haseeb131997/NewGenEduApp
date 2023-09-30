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
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { TextInput, Card, Text, Avatar,Title,Divider } from 'react-native-paper';
import { w, h } from "../../../../utils/Dimensions";
import AppStyles from "../../../../AppStyles/AppStyles";
import InputText from '../../../../components/InputText';
import SelectListUtils from '../../../../utils/SelectListUtils'
import LabelText from '../../../../components/LabelText';




class StudentGenralDetailView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    }
  }







  render() {
    const { visible } = this.state
    const {
      stateObject
    } = this.props
    const { dataModel, editable, primaryKeyEditable, nekot,
      ivas,
      uhtuliak } = stateObject.state
    const { parentStateChange } = stateObject
    return (
      <View >

        <Title>Basic Info</Title>

        <Divider style={AppStyles.marginTop_1} />

        <LabelText
          label={'Name'}
          value={dataModel.studentName}
        />

        <LabelText
          label={'Email ID'}
          value={dataModel.email}
        />

        <LabelText
          label={'Mobile No'}
          value={dataModel.mobNo}
        />

        <LabelText
          label={'DOB'}
          value={dataModel.general.bob}
        />

        <LabelText
          label={'Gender'}
          value={SelectListUtils.functions.getSelectedValue(SelectListUtils.functions.selectMaster.GenderMaster, dataModel.general.gender)}

        />

        <LabelText
          label={'Blood group'}
          value={SelectListUtils.functions.getSelectedValue(SelectListUtils.functions.selectMaster.BloodGroupMaster,dataModel.general.bloodGroup)}

        />


        <LabelText
          label={'National ID'}
          value={dataModel.general.nationalID}

        />

        <LabelText
          label={'Existing medical details'}
          value={dataModel.emergency.existingMedicalDetails}

        />

<LabelText
         label={'Address'}
         value ={`${dataModel.general.address.addressLine1}, ${dataModel.general.address.addressLine2}, ${dataModel.general.address.addressLine3}, ${dataModel.general.address.addressLine4}, ${dataModel.general.address.addressLine5}`}
        />










      </View>
    );
  }
}

const styles = StyleSheet.create({

})
export default StudentGenralDetailView;
