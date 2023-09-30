
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
import { View, StyleSheet, Platform,TouchableOpacity } from 'react-native';
import { Avatar, Title } from 'react-native-paper';
import { w, h } from "../../../../utils/Dimensions";
import AppStyles from "../../../../AppStyles/AppStyles";
import InputTextArea from '../../../../components/InputTextArea';
import GeneralUtils from "../../../../utils/GeneralUtils";










class EditStudenNotesDetail extends Component {
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
    const { studentNoteEmptyrecord, editable, primaryKeyEditable, summaryDataModel, errorField } = stateObject.state
    const { parentStateChange } = stateObject

    return (
      <View style={AppStyles.marginTop_2}>

        <Title>{studentNoteEmptyrecord.date}</Title>

        <InputTextArea
          label={''}
          secureTextEntry={false}
          value={studentNoteEmptyrecord.notes}
          placeholder={'Enter notes'}
          onChangeText={text => {
            studentNoteEmptyrecord.notes = text
            parentStateChange({ studentNoteEmptyrecord: studentNoteEmptyrecord })
          }}
          errorMessage={GeneralUtils.functions.getErrorMessage('field1', studentNoteEmptyrecord.notes, errorField, [], 'Notes')}
        />
      </View>
    );
  }
}


const styles = StyleSheet.create({

})
export default EditStudenNotesDetail;

