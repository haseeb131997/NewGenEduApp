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
import { View, StyleSheet, Image, TouchableOpacity, LayoutAnimation, UIManager } from 'react-native';
import { TextInput, Caption, Text, Title, Divider, Subheading } from 'react-native-paper';
import SelectListUtils from '../../../../utils/SelectListUtils'
import AppStyles from "../../../../AppStyles/AppStyles";
import { Avatar } from 'react-native-elements';
import GeneralUtils from "../../../../utils/GeneralUtils"
import CustomButtons from '../../../../components/CustomButtons';
import SecondModal from '../../../../components/SecondModal';
import EditLessonDetail from '../EditLessonDetail';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Paggination from "../../../../utils/Paggination";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Exception from '../../../../utils/Exception'
import ImpNotes from '../../../../components/ImpNotes';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { UiColor } from "../../../../theme";
import CustomSwitch from '../../../../components/CustomSwitch';




class StudentLessonPlannerPlanDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      selectedFamilyIndex: 0
    }
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    this.changeLayout = this.changeLayout.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onClickNew = this.onClickNew.bind(this)
    this.onEdit = this.onEdit.bind(this)
    this.onDelete = this.onDelete.bind(this)

  }



  changeLayout = (index) => {
    if (this.state.selectedFamilyIndex == index) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      this.setState({ selectedFamilyIndex: null });
    }
    else {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      this.setState({ selectedFamilyIndex: index });
    }

  }



  Mandatory = function () {
    const {
      stateObject,
    } = this.props
    const { planDetailEmptyrecord } = stateObject.state

    stateObject.state.errorField = []
    var mandatoryCheckError = false;

    if (planDetailEmptyrecord.subjectID == '' || planDetailEmptyrecord.subjectID == null) {
      mandatoryCheckError = true
      stateObject.state.errorField.push('field1')
    }
    if (planDetailEmptyrecord.lesson == '' || planDetailEmptyrecord.lesson == null) {
      mandatoryCheckError = true
      stateObject.state.errorField.push('field2')
    }

    if (mandatoryCheckError) {
      Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-080', errorMessage: '', errorParam: '' }])
      return false
    }
    else {
      return true
    }

    // return true
  }



  onSubmit() {
    Paggination.functions.editModalone = true
    const {
      stateObject,
    } = this.props
    const { planDetailEmptyrecord } = stateObject.state

    if (this.Mandatory()) {
      Paggination.functions.addAndedit(stateObject, 'planDetails', planDetailEmptyrecord)
    }
  }


  onClickNew() {
    Paggination.functions.editModalone = true
    const { stateObject } = this.props
    var emptyRecord = {
      subjectID: "",
      lesson: "",
      heading: "",
      subHeading: "",
      status: "N",
      percentageOfCompletion: "",
      remarks: ""
    }

    Paggination.functions.onClickNew(stateObject, 'planDetailEmptyrecord', emptyRecord)
  }

  onEdit(item, index) {
    Paggination.functions.editModalone = true
    const { stateObject } = this.props
    Paggination.functions.edit(stateObject, 'planDetailEmptyrecord', item, index)
  }

  onDelete(index) {
    Paggination.functions.editModalone = true
    const { stateObject } = this.props
    Paggination.functions.delete(stateObject, 'planDetails', index)
  }








  render() {
    const { stateObject, currentIndex } = this.props
    const { dataModel, editable, planDetailEmptyrecord } = stateObject.state
    const { parentStateChange } = stateObject

    return (
      <View>

        {(stateObject.state.currentOperation == 'Create') && <View style={[AppStyles.row_space_between]}>
          <Subheading style={AppStyles.bold_600}>{stateObject.state.createStepsHeading[1]}</Subheading>
          {dataModel.planDetails.length != 0 && <CustomButtons
            onPress={() => this.onClickNew()}
            title={'Add'}
            containerStyle={AppStyles.signInContainer}
            titleStyle={AppStyles.btnTextStyle}
            buttonStyle={{ backgroundColor: UiColor.LIGHT_SKYBLUE }}
            icon={
              <Ionicons
                name="add"
                size={AppStyles.addIconSize.height}
                color={UiColor.SKYBLUE}
                style={AppStyles.addIconStyle}
              />
            }
          />}
        </View>}
        {((stateObject.state.currentOperation == 'Create' || stateObject.state.currentOperation == 'Modification') && dataModel.planDetails.length == 0) && <View style={AppStyles.marginTop_2}>
          <CustomButtons
            onPress={() => this.onClickNew()}
            title={`Add plan`}
            containerStyle={AppStyles.signInContainer}
            titleStyle={AppStyles.btnTextStyle}
            buttonStyle={{ backgroundColor: UiColor.LIGHT_SKYBLUE }}
            icon={
              <Ionicons
                name="add"
                size={AppStyles.addIconSize.height}
                color={UiColor.SKYBLUE}
                style={AppStyles.addIconStyle}
              />
            }
          />
        </View>}

        {(stateObject.state.currentOperation == 'Modification' && dataModel.planDetails.length != 0 && !GeneralUtils.functions.showCompletion) && <View style={[AppStyles.flex_End, AppStyles.marginTop_1]}>
          <CustomButtons
            onPress={() => this.onClickNew()}
            title={'Add'}
            containerStyle={AppStyles.signInContainer}
            titleStyle={AppStyles.btnTextStyle}
            buttonStyle={{ backgroundColor: UiColor.LIGHT_SKYBLUE }}
            icon={
              <Ionicons
                name="add"
                size={AppStyles.addIconSize.height}
                color={UiColor.SKYBLUE}
                style={AppStyles.addIconStyle}
              />
            }
          />
        </View>}


        {(dataModel.planDetails == 0 && (stateObject.state.currentOperation == 'Create' || stateObject.state.currentOperation == 'Modification')) && <ImpNotes
          isArray={false}
          message={`Click "Add plan" button to add lesson plan for this day.`}
        />}

        <View style={[AppStyles.marginTop_2]}>
          {dataModel.planDetails.map((item, index) => (
            <View key={index.toString()} style={[AppStyles.marginTop_3]}>
              <TouchableOpacity onPress={() => this.changeLayout(index)} style={[AppStyles.flexDirectionRow, AppStyles.alignItems,]}>
                <MaterialIcons name={this.state.selectedFamilyIndex != index ? "navigate-next" : "keyboard-arrow-down"} size={AppStyles.iconSize.height} color={UiColor.LIGHT_TEXT_COLOR} />
                <View style={[AppStyles.flex_one, AppStyles.marginLeft_1]}>
                  <Text style={[AppStyles.bold_400, AppStyles.textColor]}>Subject: <Text style={[AppStyles.bold_400]}>{SelectListUtils.functions.getSelectedValue(SelectListUtils.functions.selectMaster.SubjectMaster, item.subjectID)}</Text></Text>
                  <Text style={[AppStyles.bold_400, AppStyles.textColor]}>Unit/Lesson: <Text style={[AppStyles.bold_400]}>{item.lesson}</Text></Text>

                </View>


                {(!GeneralUtils.functions.showCompletion && (stateObject.state.currentOperation == 'Create' || stateObject.state.currentOperation == 'Modification')) && <View style={[AppStyles.flexDirectionRow]}>
                  <AntDesign onPress={() => this.onEdit(item, index)}
                    name="edit" size={AppStyles.iconSize.height} color={AppStyles.inactiveMoreIcon.tintColor} />
                  <View style={AppStyles.marginLeft_2}>
                    {<AntDesign onPress={() => this.onDelete(index)}
                      name="delete" size={AppStyles.iconSize.height} color={AppStyles.inactiveMoreIcon.tintColor} />}
                  </View>
                </View>}
              </TouchableOpacity>



              <View style={[{ height: this.state.selectedFamilyIndex == index ? null : 0, overflow: 'hidden', }]}>
                <View style={AppStyles.marginLeft_4}>
                  <View style={AppStyles.marginTop_1}>
                    <Caption style={[AppStyles.textColor]}>Heading</Caption>
                    <Text>{item.heading}</Text>
                  </View>
                  <View style={AppStyles.marginTop_1}>
                    <Caption style={[AppStyles.textColor,]}>Sub Heading</Caption>
                    <Text>{item.subHeading}</Text>
                  </View>

                  <View style={AppStyles.marginTop_1}>
                    <Caption style={[AppStyles.textColor,]}>Remarks/Comments</Caption>
                    <Text>{item.remarks != '' ? item.remarks : 'no remarks/comments'}</Text>
                  </View>

                  {stateObject.state.currentOperation != 'Create' && <View style={[AppStyles.flex_start, AppStyles.marginTop_2]}>
                    <Caption style={[AppStyles.textColor,]}>Status</Caption>
                    <Caption style={item.status == "N" ? AppStyles.errorStatusStyle : AppStyles.successStatusStyle}>{SelectListUtils.functions.getSelectedValue(SelectListUtils.functions.selectMaster.PlanStatusMaster, item.status)}</Caption>
                  </View>}


                  {(stateObject.state.currentOperation == "Modification" && GeneralUtils.functions.showCompletion) && <View style={AppStyles.marginTop_2}>
                    <Caption style={[AppStyles.textColor,]}>Mark topic as completed</Caption>
                    <CustomSwitch
                      label={'Completion status'}
                      onPress={() => {

                        if (item.status == 'N') {
                          item.status = 'C'
                        }
                        else {
                          item.status = 'N'
                        }
                        parentStateChange({ dataModel: dataModel })
                      }}
                      checked={item.status == 'C' ? true : false}

                    />
                  </View>}


                </View>
              </View>
              {/* <Divider style={AppStyles.marginVertical_2} /> */}
            </View>
          ))}
        </View>
        {Paggination.functions.editModalone && <SecondModal
          templates={<EditLessonDetail stateObject={stateObject} />}
          stateObject={stateObject}
          title={Paggination.functions.selectedIndex == null ? 'Add' : (GeneralUtils.functions.showCompletion ? 'Mark topic as completed' : 'Edit')}
          subTitle={'Lesson'}
          onSubmit={() => this.onSubmit()}
        />}
      </View>

    );
  }
}

const styles = StyleSheet.create({
})
export default StudentLessonPlannerPlanDetail;
