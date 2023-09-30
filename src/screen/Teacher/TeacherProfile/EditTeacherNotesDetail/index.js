
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
import { View, StyleSheet } from 'react-native';
import { Avatar, Title } from 'react-native-paper';
import AppStyles from "../../../../AppStyles/AppStyles";
import InputTextArea from '../../../../components/InputTextArea';










class EditTeacherNotesDetail extends Component {
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
    const { teacherNoteEmptyrecord} = stateObject.state
    const { parentStateChange } = stateObject

    return (
      <View style={AppStyles.marginTop_2}>

        <Title>{teacherNoteEmptyrecord.date}</Title>

        <InputTextArea
          label={''}
          secureTextEntry={false}
          value={teacherNoteEmptyrecord.notes}
          placeholder={'Enter notes'}
          onChangeText={text => {
            teacherNoteEmptyrecord.notes = text
            parentStateChange({ teacherNoteEmptyrecord: teacherNoteEmptyrecord })
          }}

        />
      </View>
    );
  }
}


const styles = StyleSheet.create({

})
export default EditTeacherNotesDetail;

