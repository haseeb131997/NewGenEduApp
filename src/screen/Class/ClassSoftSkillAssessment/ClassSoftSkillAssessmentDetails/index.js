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
import { View, StyleSheet, Image, TouchableOpacity, ScrollView, LayoutAnimation, Platform, UIManager } from 'react-native';
import { TextInput, Title, Text, Subheading, Divider, Caption } from 'react-native-paper';
import AppStyles from "../../../../AppStyles/AppStyles";
import { UiColor } from "../../../../theme";
import InputText from '../../../../components/InputText';
import SecondModal from '../../../../components/SecondModal';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EditAssessmentDetail from '../EditAssessmentDetail';
import Paggination from "../../../../utils/Paggination";
import NewScreenDropDownPicker from '../../../../components/NewScreenDropDownPicker';
import SelectListUtils from '../../../../utils/SelectListUtils'
import GeneralUtils from "../../../../utils/GeneralUtils";
import { h, w } from '../../../../utils/Dimensions';










class ClassSoftSkillAssessmentDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    }
    this.onSubmit = this.onSubmit.bind(this)
    this.onEdit = this.onEdit.bind(this)
  }

  onSubmit() {
    Paggination.functions.editModalone = true
    const {
      stateObject,
    } = this.props
    const { assessmentEmptyRecord } = stateObject.state
    Paggination.functions.addAndedit(stateObject, 'studentSkills', assessmentEmptyRecord)
  }


  onEdit(item, index) {
    Paggination.functions.editModalone = true
    const { stateObject } = this.props
    Paggination.functions.edit(stateObject, 'assessmentEmptyRecord', item, index)
  }




  render() {
    const {
      stateObject,
      currentIndex
    } = this.props

    const { dataModel, editable, errorField } = stateObject.state
    const { parentStateChange, } = stateObject


    console.log(dataModel.studentSkills,"dataModel.studentSkills")


    return (
      <View>
        <View>
          {dataModel.studentSkills.map((item, index) => (
            <View key={index.toString()} >
              <View style={[AppStyles.marginTop_2, AppStyles.viewBottomLine, { paddingBottom: h('2%') }]}>
                <View style={[AppStyles.row_space_between]}>
                  <View>
                    <Title style={[AppStyles.payTextStyle,]}>{index + 1}. {item.studentName}</Title>
                  </View>
                  {(stateObject.state.currentOperation == 'Modification') &&
                    <AntDesign onPress={() => this.onEdit(item, index)}
                      name="edit" size={AppStyles.iconSize.height} color={AppStyles.inactiveMoreIcon.tintColor} />}
                </View>
                {stateObject.state.currentOperation == 'Create' ? <View style={AppStyles.marginTop_2}>
                  {item.skills.map((data, index1) => (
                    <View key={index1.toString()}  >
                      <Subheading style={[AppStyles.bold_600]}>{'\u2022'} {data.skillName}</Subheading>
                      <View style={[AppStyles.marginTop_2, AppStyles.marginLeft_2]}>
                        <NewScreenDropDownPicker
                          label={'Rating'}
                          stateObject={stateObject}
                          items={SelectListUtils.functions.selectMaster.CategoryMaster}
                          value={SelectListUtils.functions.getSelectedValue(SelectListUtils.functions.selectMaster.CategoryMaster, data.category)}
                          placeholder="Select Rating"
                          onChangeValue={(value) => {
                            data.category = value;
                            parentStateChange({ dataModel: dataModel })

                          }}
                          dropdownName={`ratingDropdown${index}${index1}`}
                          subHeadingRecordName="a rating"
                          onClear={() => {
                            data.category = '';
                            parentStateChange({ dataModel: dataModel })
                          }}
                        />
                      </View>
                      <View style={AppStyles.marginLeft_2}>
                        <InputText
                          required={false}
                          // editable={false}
                          label={'Teacher feedback'}
                          secureTextEntry={false}
                          multiline={true}
                          onChangeText={text => {
                            data.teacherFeedback = text
                            parentStateChange({ dataModel: dataModel })
                          }}
                          value={data.teacherFeedback}
                        />
                      </View>
                    </View>
                  ))}
                </View> : <View>
                  {item.skills.map((data, index1) => (
                    <View key={index1.toString()}>

                      <Subheading style={[AppStyles.bold_600, AppStyles.marginTop_2]}>{'\u2022'} {data.skillName}</Subheading>

                      <View style={AppStyles.marginLeft_2}>
                        <View style={AppStyles.marginTop_1}>
                          <Caption style={[AppStyles.textColor,]}>Rating</Caption>
                          <Text>{SelectListUtils.functions.getSelectedValue(SelectListUtils.functions.selectMaster.CategoryMaster, data.category)}</Text>
                        </View>
                        <View style={AppStyles.marginTop_1}>
                          <Caption style={[AppStyles.textColor,]}>Teacher feedback</Caption>
                          <Text>{data.teacherFeedback}</Text>
                        </View>
                      </View>
                    </View>
                  ))}
                </View>}
                {/* <Divider style={[AppStyles.marginVertical_1]} /> */}
              </View>

            </View>
          ))}
        </View>

        {Paggination.functions.editModalone && <SecondModal
          templates={<EditAssessmentDetail stateObject={stateObject} />}
          stateObject={stateObject}
          title={'Edit'}
          subTitle={'Assessment'}
          onSubmit={() => this.onSubmit()}
        />}

        {stateObject.state.currentOperation == "Create" && <Text>{'\n \n'}</Text>}

      </View>
    );
  }
}

const styles = StyleSheet.create({

})
export default ClassSoftSkillAssessmentDetails;

