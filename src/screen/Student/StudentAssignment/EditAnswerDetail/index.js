
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
import { View, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-paper';
import { w, h } from "../../../../utils/Dimensions";
import AppStyles from "../../../../AppStyles/AppStyles";
import InputTextArea from '../../../../components/InputTextArea';

import GeneralUtils from "../../../../utils/GeneralUtils";







class EditAnswerDetail extends Component {
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
    const { questionsEmptyrecord, editable, primaryKeyEditable, summaryDataModel, errorField } = stateObject.state
    const { parentStateChange } = stateObject

    return (
      <View style={AppStyles.marginTop_2}>

        <InputTextArea
           required={true}
          label={'Answer'}
          secureTextEntry={false}
          value={questionsEmptyrecord.answer}
          placeholder={'Student can write a answer of question here..'}
          onChangeText={text => {
            questionsEmptyrecord.answer = text;
            parentStateChange({ questionsEmptyrecord: questionsEmptyrecord })
          }}
          errorMessage={GeneralUtils.functions.getErrorMessage('field1',questionsEmptyrecord.answer , errorField, [], 'Answer')}
        />


      </View>
    );
  }
}


const styles = StyleSheet.create({

})
export default EditAnswerDetail;

