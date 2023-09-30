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
import { View, StyleSheet, } from 'react-native';
import AppStyles from "../../../../AppStyles/AppStyles";
import InputText from '../../../../components/InputText';
import CustomDatePicker from "../../../../components/CustomDatePicker"
import InputTextArea from '../../../../components/InputTextArea';
import LabelText from '../../../../components/LabelText';
import ImpNotes from '../../../../components/ImpNotes';






class TeacherInstituteFieldDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    }

  }
















  render() {
    const { stateObject } = this.props
    const { dataModel, editable } = stateObject.state
    const { parentStateChange } = stateObject


    dataModel.instituteFields.sort(function (a, b) {
      return a.fieldID - b.fieldID
    });

    return (
      <View >
        {dataModel.instituteFields.length != 0 ? dataModel.instituteFields.map((item, index) => (
          (stateObject.state.currentOperation == 'Create' || stateObject.state.currentOperation == 'Modification') ? <View style={AppStyles.marginTop_1} key={index.toString()}>
            {item.fieldType == "N" && <InputText
              required={true}
              label={item.fieldName}
              secureTextEntry={false}
              keyboardType='numeric'
              onChangeText={text => {
                item.fieldValue = text
                parentStateChange({ dataModel: dataModel })
              }}
              value={item.fieldValue}
            />}


            {item.fieldType == "D" && <CustomDatePicker
              required={true}
              label={item.fieldName}
              placeholder={`Pick ${item.fieldName}`}
              secureTextEntry={false}
              value={item.fieldValue}
              format="DD-MM-YYYY"
              mode="date"
              onDateChange={value => {
                item.fieldValue = value;
                parentStateChange({ dataModel: dataModel })
              }}
            />}
            {item.fieldType == "T" && <InputTextArea
              required={true}
              label={item.fieldName}
              secureTextEntry={false}
              value={item.fieldValue}
              // placeholder={'Teacher can enter instruction for Parents/Students'}
              onChangeText={text => {
                item.fieldValue = text;
                parentStateChange({ dataModel: dataModel })
              }}
            />}
          </View> : <View key={index.toString()}>
            <LabelText
              label={item.fieldName}
              value={item.fieldValue}
            /></View>
        )) :
          <View>
            {stateObject.state.currentOperation == 'Create' ? <ImpNotes
              isArray={false}
              message={`Sorry, It looks like Institute has not defined any customized fields yet. Please continue.`}
            /> : <ImpNotes
              isArray={false}
              message={`Sorry, It looks like Institute has not defined any customized fields yet.`}
            />}

          </View>
        }

      </View>

    );
  }
}

const styles = StyleSheet.create({
})
export default TeacherInstituteFieldDetail;
