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
import { View, StyleSheet,  } from 'react-native';
// import { Title, Subheading, Text } from 'react-native-paper';
import { w, h } from "../../../../utils/Dimensions";
import AppStyles from "../../../../AppStyles/AppStyles";
import InputText from '../../../../components/InputText';
import NewScreenDropDownPicker from '../../../../components/NewScreenDropDownPicker';
import GeneralUtils from "../../../../utils/GeneralUtils";
import CustomCheckBox from '../../../../components/CustomCheckBox';
import SelectListUtils from '../../../../utils/SelectListUtils'









class EditLessonDetail extends Component {
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

    const { dataModel, editable, errorField, planDetailEmptyrecord } = stateObject.state
    const { parentStateChange } = stateObject

    return (
      <View>
      {!GeneralUtils.functions.showCompletion && <View>

        <NewScreenDropDownPicker
          stateObject={stateObject}
          editable={editable}
          required={true}
          label={'Subject'}
          stateObject={stateObject}
          items={SelectListUtils.functions.selectMaster.SubjectMaster}
          value={SelectListUtils.functions.getSelectedValue(SelectListUtils.functions.selectMaster.SubjectMaster, planDetailEmptyrecord.subjectID)}
          placeholder="Select Subject"
          onChangeValue={(value) => {
            planDetailEmptyrecord.subjectID = value;
            parentStateChange({ planDetailEmptyrecord: planDetailEmptyrecord })
          }}
          dropdownName={'subjectDropdown'} 
            subHeadingRecordName = "a subject"
            onClear={() => {
              planDetailEmptyrecord.subjectID= '';
              parentStateChange({ planDetailEmptyrecord: planDetailEmptyrecord })
            }}
          errorMessage={GeneralUtils.functions.getErrorMessage('field1', planDetailEmptyrecord.subjectID, errorField, [], 'Subject')}
        />

      <InputText
          required={true}
          // editable={false}
          label={'Unit/Lesson'}
          secureTextEntry={false}

          onChangeText={text => {
            planDetailEmptyrecord.lesson = text
            parentStateChange({ planDetailEmptyrecord: planDetailEmptyrecord })
          }}
          value={planDetailEmptyrecord.lesson}
          errorMessage={GeneralUtils.functions.getErrorMessage('field2', planDetailEmptyrecord.lesson, errorField, [], 'Unit/Lesson')}
        />
        <InputText
          required={false}
          // editable={false}
          label={'Heading'}
          secureTextEntry={false}

          onChangeText={text => {
            planDetailEmptyrecord.heading = text
            parentStateChange({ planDetailEmptyrecord: planDetailEmptyrecord })
          }}
          value={planDetailEmptyrecord.heading}
        />



        <InputText
          required={false}
          // editable={false}
          label={'Sub Heading'}
          secureTextEntry={false}

          onChangeText={text => {
            planDetailEmptyrecord.subHeading = text
            parentStateChange({ planDetailEmptyrecord: planDetailEmptyrecord })
          }}
          value={planDetailEmptyrecord.subHeading}


        />
        <InputText
          required={false}
          // editable={false}
          label={'Remark/Comments'}
          secureTextEntry={false}
          multiline={true}
          onChangeText={text => {
            planDetailEmptyrecord.remarks = text
            parentStateChange({ planDetailEmptyrecord: planDetailEmptyrecord })
          }}
          value={planDetailEmptyrecord.remarks}
        />

        {stateObject.state.currentOperation == "Modification" && <View style={AppStyles.marginTop_2}>
          <CustomCheckBox

            label={'Completion status'}
            onPress={() => {

              if (planDetailEmptyrecord.status == 'N') {
                planDetailEmptyrecord.status = 'C'
              }
              else {
                planDetailEmptyrecord.status = 'N'
              }

              parentStateChange({ planDetailEmptyrecord: planDetailEmptyrecord })
            }}
            checked={planDetailEmptyrecord.status == 'N' ? false : true}
            disabled={false}

          />
        </View>}
      </View>}

      {(stateObject.state.currentOperation == "Modification" && GeneralUtils.functions.showCompletion) &&<View style={AppStyles.marginTop_2}>
          <CustomCheckBox

            label={'Completion status'}
            onPress={() => {

              if (planDetailEmptyrecord.status == 'N') {
                planDetailEmptyrecord.status = 'C'
              }
              else {
                planDetailEmptyrecord.status = 'N'
              }

              parentStateChange({ planDetailEmptyrecord: planDetailEmptyrecord })
            }}
            checked={planDetailEmptyrecord.status == 'N' ? false : true}
            disabled={false}

          />
        </View>}

      </View>
    );
  }
}

const styles = StyleSheet.create({
  tooltipStyle: {
    height: h('15%'), width: w('50%'),
  }
})
export default EditLessonDetail;

