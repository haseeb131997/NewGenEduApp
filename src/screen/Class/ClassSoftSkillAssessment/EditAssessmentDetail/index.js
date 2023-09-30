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
import { View, StyleSheet, Image, TouchableWithoutFeedback, ScrollView, Platform } from 'react-native';
import { Title ,Subheading,Text} from 'react-native-paper';
import { w, h } from "../../../../utils/Dimensions";
import AppStyles from "../../../../AppStyles/AppStyles";
import InputText from '../../../../components/InputText';
import NewScreenDropDownPicker from '../../../../components/NewScreenDropDownPicker';
import SelectListUtils from '../../../../utils/SelectListUtils'











class EditAssessmentDetail extends Component {
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

    const { dataModel, editable, errorField, assessmentEmptyRecord } = stateObject.state
    const { parentStateChange } = stateObject

    return (
      <View>
       


          <View>
            <Subheading style={[AppStyles.payTextStyle,]}>{assessmentEmptyRecord.studentName}</Subheading>
          </View>

          {<View style={AppStyles.marginTop_2}>
            {assessmentEmptyRecord.skills.map((data, index1) => (
              <View key={index1.toString()} >
                <Subheading style={AppStyles.bold_600}>{data.skillName}</Subheading>
                <View style={[AppStyles.marginTop_2,]}>
                  <NewScreenDropDownPicker
                    label={'Rating'}
                    stateObject={stateObject}
                    items={SelectListUtils.functions.selectMaster.CategoryMaster}
                    value={SelectListUtils.functions.getSelectedValue(SelectListUtils.functions.selectMaster.CategoryMaster, data.category)}
                    placeholder="Select Rating"
                    onChangeValue={(value) => {
                      data.category = value;
                      parentStateChange({ assessmentEmptyRecord: assessmentEmptyRecord })

                    }}
                    dropdownName={'ratingDropdown'} 
                    subHeadingRecordName = "a rating"
                    onClear={() => {
                      data.category= '';
                      parentStateChange({ assessmentEmptyRecord: assessmentEmptyRecord })
                    }}
                  />
                </View>

                <InputText
                  required={false}
                  // editable={false}
                  label={'Teacher feedback'}
                  secureTextEntry={false}
                  multiline={true}
                  onChangeText={text => {
                    data.teacherFeedback = text
                    parentStateChange({ assessmentEmptyRecord: assessmentEmptyRecord })
                  }}
                  value={data.teacherFeedback}
                />
              </View>
            ))}
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
export default EditAssessmentDetail;

