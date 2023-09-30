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
import { Title } from 'react-native-paper';
import { w, h } from "../../../../utils/Dimensions";
import AppStyles from "../../../../AppStyles/AppStyles";
import InputText from '../../../../components/InputText';









class EditAssessmentDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      // currentIndex: 1,
    }
    this.postSuggestionListresultClick = this.postSuggestionListresultClick.bind(this)

  }


  postSuggestionListresultClick(data) {
    const { stateObject } = this.props
    const { dataModel, Subjectschedulesemptyrecord } = stateObject.state
    const { parentStateChange } = stateObject
    Subjectschedulesemptyrecord.hall = data.classCode;
    parentStateChange({ Subjectschedulesemptyrecord: stateObject.state.Subjectschedulesemptyrecord })
  }



 

  render() {
    const {
      stateObject,
      currentIndex
    } = this.props

    const { dataModel, editable, errorField,assessmentEmptyRecord } = stateObject.state
    const { parentStateChange } = stateObject
   
    return (
      <View>
       <View style={{}}>
                <View>
                <Title style={AppStyles.payTextStyle}>{assessmentEmptyRecord.studentName}</Title>
                </View>
               <View style={AppStyles.marginTop_2}>
                    <InputText
                     tooltipReq={true}
                     tooltipMsg={'Mark can be any value between 0 to 100'}
                     // tooltipStyle={styles.tooltipStyle}
                      required={false}
                      // editable={false}
                      label={'Mark'}
                      secureTextEntry={false}
                      keyboardType={'numeric'}
                      onChangeText={text => {
                        assessmentEmptyRecord.mark = text
                        parentStateChange({ assessmentEmptyRecord: assessmentEmptyRecord })
                      }}
                      value={assessmentEmptyRecord.mark}
                    />

                    <InputText
                      required={false}
                      // editable={false}
                      label={'Teacher feedback'}
                      secureTextEntry={false}
                      multiline={true}
                      onChangeText={text => {
                        assessmentEmptyRecord.teacherFeedback = text
                        parentStateChange({ assessmentEmptyRecord: assessmentEmptyRecord })
                      }}
                      value={assessmentEmptyRecord.teacherFeedback}
                    />
                </View>
               


              </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tooltipStyle:{
     height:h('15%'),width:w('50%'),
  }
})
export default EditAssessmentDetail;

