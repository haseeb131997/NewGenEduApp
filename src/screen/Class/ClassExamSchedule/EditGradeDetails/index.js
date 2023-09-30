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
import { View, StyleSheet} from 'react-native';

import InputText from '../../../../components/InputText';
import GeneralUtils from "../../../../utils/GeneralUtils";








class EditGradeDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      // currentIndex: 1,
    }
  

  }


 



  // var GradeDetailsemptyrecord = {
  // idx: "",
  //       subjectID: "",
  //       grade: "",
  //       from: "",
  //       to: ""
  // }


  render() {
    const {
      stateObject,
      currentIndex
    } = this.props

    const { dataModel, editable, errorField, GradeDetailsemptyrecord } = stateObject.state
    const { parentStateChange } = stateObject
   
    return (
      <View>
        {/* <View style={Platform.OS === 'ios' ? AppStyles.zIndex_1000 : {}}>
          <NewScreenDropDownPicker
            editable={editable}
            required={true}
            label={'Subject'}
            stateObject={stateObject}
            items={SelectListUtils.functions.selectMaster.SubjectMaster}
            value={GradeDetailsemptyrecord.subjectID}
            placeholder="Select Subject"
            zIndex={1000}
            onChangeValue={(value) => {
              GradeDetailsemptyrecord.subjectID = value;
              parentStateChange({ GradeDetailsemptyrecord: GradeDetailsemptyrecord })

            }}
            errorMessage={GeneralUtils.functions.getErrorMessage('field8', GradeDetailsemptyrecord.subjectID, errorField, [], 'Subject')}
          />
        </View> */}


        <InputText
          required={true}
          label={'Grade'}
          secureTextEntry={false}
          onChangeText={text => {
            GradeDetailsemptyrecord.grade = text
            parentStateChange({ GradeDetailsemptyrecord: GradeDetailsemptyrecord })
          }}
          value={GradeDetailsemptyrecord.grade}
          errorMessage={GeneralUtils.functions.getErrorMessage('field9', GradeDetailsemptyrecord.grade, errorField, [], 'Grade')}
        />


        <InputText
          required={true}
          label={'From Mark/Score'}
          keyboardType='numeric'
          secureTextEntry={false}
          onChangeText={text => {
            GradeDetailsemptyrecord.from = text
            parentStateChange({ GradeDetailsemptyrecord: GradeDetailsemptyrecord })
          }}
          value={GradeDetailsemptyrecord.from}
          errorMessage={GeneralUtils.functions.getErrorMessage('field10', GradeDetailsemptyrecord.from, errorField, [], 'From Mark/Score')}
        />

        <InputText
          required={true}
          label={'To Mark/Score'}
          keyboardType='numeric'
          secureTextEntry={false}
          onChangeText={text => {
            GradeDetailsemptyrecord.to = text
            parentStateChange({ GradeDetailsemptyrecord: GradeDetailsemptyrecord })
          }}
          value={GradeDetailsemptyrecord.to}
          errorMessage={GeneralUtils.functions.getErrorMessage('field11', GradeDetailsemptyrecord.to, errorField, [], 'To Mark/Score')}
        />




      </View>
    );
  }
}

const styles = StyleSheet.create({

})
export default EditGradeDetails;

