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
import { Subheading } from 'react-native-paper';
import { w, h } from "../../../../utils/Dimensions";
import InputText from '../../../../components/InputText';
import GeneralUtils from "../../../../utils/GeneralUtils";









class EditExamScheduleDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      // currentIndex: 1,
    }
   

  }





  render() {
    const {
      stateObject,
      currentIndex
    } = this.props

    const { dataModel, editable, errorField,softSkillsEmptyrecord } = stateObject.state
    const { parentStateChange } = stateObject
   

    return (
      <View>
  
      <InputText
          required={true}
          label={'Soft Skill Name'}
          secureTextEntry={false}
          onChangeText={text => {
            softSkillsEmptyrecord.softSkillName = text
            parentStateChange({ softSkillsEmptyrecord: softSkillsEmptyrecord })
          }}
          value={softSkillsEmptyrecord.softSkillName}
          // multiline={true}
        errorMessage={GeneralUtils.functions.getErrorMessage('field12', softSkillsEmptyrecord.softSkillName, errorField, [], 'Soft Skill Name')}
        />



    





      </View>
    );
  }
}

const styles = StyleSheet.create({

})
export default EditExamScheduleDetails;

