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
import { w, h } from "../../../../utils/Dimensions";
import SelectListUtils from '../../../../utils/SelectListUtils'
import LabelText from '../../../../components/LabelText';




class TeacherGenralDetailView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    }
  }



checkBlankAddress (value){
  if(value != ''){
   return ','
  }
  else{
    return ''
  }
}



  render() {
    const { visible } = this.state
    const {
      stateObject
    } = this.props
    const { dataModel, } = stateObject.state
   

    return (
      <View >

        {/* <Title>Basic Info</Title> */}

        {/* <Divider style={AppStyles.marginTop_1} /> */}
        <View style={styles.container} />
        <LabelText
          label={'Name'}
          value={dataModel.teacherName}
        />

        <LabelText
          label={'Email ID'}
          value={dataModel.general.emailID}
        />

        <LabelText
          label={'Mobile No'}
          value={dataModel.general.contactNo}
        />

        <LabelText
          label={'DOB'}
          value={dataModel.general.dob}
        />

        <LabelText
          label={'Gender'}
          value={SelectListUtils.functions.getSelectedValue(SelectListUtils.functions.selectMaster.GenderMaster, dataModel.general.gender)}

        />

        <LabelText
          label={'Blood group'}
          value={SelectListUtils.functions.getSelectedValue(SelectListUtils.functions.selectMaster.BloodGroupMaster, dataModel.general.bloodGroup)}

        />


        {/* <LabelText
          label={'National ID'}
          value={dataModel.general.nationalID}

        /> */}

        <LabelText
          label={'Existing medical details'}
          value={dataModel.emergency.existingMedicalDetails}

        />

        <LabelText
          label={'Address'}
          value={`${dataModel.general.address.addressLine1}${this.checkBlankAddress(dataModel.general.address.addressLine2)} ${dataModel.general.address.addressLine2}${this.checkBlankAddress(dataModel.general.address.addressLine3)} ${dataModel.general.address.addressLine3}${this.checkBlankAddress(dataModel.general.address.addressLine4)} ${dataModel.general.address.addressLine4}${this.checkBlankAddress(dataModel.general.address.addressline5)} ${dataModel.general.address.addressline5}`}
        />










      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: h('-2%')
  }
})
export default TeacherGenralDetailView;
