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
import { TextInput, Card, Text, Avatar,Title, Subheading, Divider } from 'react-native-paper';
import { w, h } from "../../../../utils/Dimensions";
import AppStyles from "../../../../AppStyles/AppStyles";
import InputText from '../../../../components/InputText';
import SelectListUtils from '../../../../utils/SelectListUtils'
import { UiColor } from "../../../../theme";
import LabelText from '../../../../components/LabelText';



class TeacherGenralDetail extends Component {
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
    const { dataModel, editable} = stateObject.state
    const { parentStateChange } = stateObject
    return (
    <View>
    <Title>Basic Info</Title>

    <Divider style={AppStyles.marginTop_1}/>

        <LabelText
         label={'Email'}
         value ={dataModel.general.emailID}
        />
         <LabelText
         label={'Mobile No'}
         value ={dataModel.general.contactNo}
        />

       <LabelText
         label={'Qualification'}
         value ={dataModel.general.qualification}
        />

       <LabelText
         label={'DOB'}
         value ={dataModel.general.dob}
        />

       <LabelText
         label={'Gender'}
         value ={SelectListUtils.functions.getSelectedValue(SelectListUtils.functions.selectMaster.GenderMaster, dataModel.general.gender)}
        />

       <LabelText
         label={'Class'}
         value ={dataModel.general.class}
        />

       <LabelText
         label={'Blood Group'}
         value ={SelectListUtils.functions.getSelectedValue(SelectListUtils.functions.selectMaster.BloodGroupMaster,dataModel.general.bloodGroup)}
        />

        <LabelText
         label={'Existing medical details'}
         value ={dataModel.emergency.existingMedicalDetails}
        />

       <LabelText
         label={'Address'}
         value ={`${dataModel.general.address.addressLine1}, ${dataModel.general.address.addressLine2}, ${dataModel.general.address.addressLine3}, ${dataModel.general.address.addressLine4}, ${dataModel.general.address.addressline5}`}
        />
        
        
        







      </View>
    );
  }
}

const styles = StyleSheet.create({

})
export default TeacherGenralDetail;
