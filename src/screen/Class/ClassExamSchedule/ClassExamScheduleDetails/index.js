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
import { View, StyleSheet, TouchableOpacity, LayoutAnimation, Platform, UIManager } from 'react-native';
import { Text, Subheading, Divider } from 'react-native-paper';
import { w, h } from "../../../../utils/Dimensions";
import SelectListUtils from '../../../../utils/SelectListUtils'
import AppStyles from "../../../../AppStyles/AppStyles";
import CustomButtons from '../../../../components/CustomButtons';
import { UiColor } from "../../../../theme";
import TwoLevelEditModal from '../../../../components/TwoLevelEditModal';
import EditExamScheduleDetails from '../EditExamScheduleDetails';
import ClassExamScheduleGrade from '../ClassExamScheduleGrade';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import GeneralUtils from "../../../../utils/GeneralUtils";
import Paggination from "../../../../utils/Paggination";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Exception from '../../../../utils/Exception'
import AntDesign from 'react-native-vector-icons/AntDesign';
import ImpNotes from '../../../../components/ImpNotes';








class InstituteClassConfigPeriod extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      selectedPeriodIndex: 0,
      mandatoryStatus:false
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
    if (this.state.selectedPeriodIndex == index) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      this.setState({ selectedPeriodIndex: null });
    }
    else {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      this.setState({ selectedPeriodIndex: index });
    }

  }


  Mandatory = function () {
    const {
      stateObject,
    } = this.props
    const { Subjectschedulesemptyrecord } = stateObject.state
    stateObject.state.errorField = []
    var mandatoryCheckError = false;
    if (Subjectschedulesemptyrecord.subjectID == '' || Subjectschedulesemptyrecord.subjectID == null) {
      mandatoryCheckError = true
      stateObject.state.errorField.push('field1')
    }
    if (Subjectschedulesemptyrecord.date == '' || Subjectschedulesemptyrecord.date == null) {

      mandatoryCheckError = true
      stateObject.state.errorField.push('field2')
    }

    if ((Subjectschedulesemptyrecord.startTime.hour == '' || Subjectschedulesemptyrecord.startTime.hour == null) && (Subjectschedulesemptyrecord.startTime.min == '' || Subjectschedulesemptyrecord.startTime.min == null)) {

      mandatoryCheckError = true
      stateObject.state.errorField.push('field3')
    }

    if ((Subjectschedulesemptyrecord.endTime.hour == '' || Subjectschedulesemptyrecord.endTime.hour == null) && (Subjectschedulesemptyrecord.endTime.min == '' || Subjectschedulesemptyrecord.endTime.min == null)) {

      mandatoryCheckError = true
      stateObject.state.errorField.push('field4')
    }

    // if (Subjectschedulesemptyrecord.hall == '' || Subjectschedulesemptyrecord.hall == null) {

    //   mandatoryCheckError = true
    //   stateObject.state.errorField.push('field5')
    // }
    if (Subjectschedulesemptyrecord.maxMark == '' || Subjectschedulesemptyrecord.maxMark == null) {

      mandatoryCheckError = true
      stateObject.state.errorField.push('field6')
    }

    if (Subjectschedulesemptyrecord.syllabus == '' || Subjectschedulesemptyrecord.syllabus == null) {
      mandatoryCheckError = true
      stateObject.state.errorField.push('field7')
    }

  

    if (mandatoryCheckError) {
      Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-080', errorMessage: '', errorParam: '' }])
      return false
    }
    else {
      return true
    }
  }


GradeMandatory = function () {
  const {
    stateObject,
  } = this.props
  const { Subjectschedulesemptyrecord } = stateObject.state
 
  if ((Subjectschedulesemptyrecord.gradeDetails.length == 0 || Subjectschedulesemptyrecord.gradeDetails == null)) {
    Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-089', errorMessage: '', errorParam: '' }])
    return false;
  }
else{
  return true
}
}


  onSubmit() {
    Paggination.functions.editModalone = true
    const {
      stateObject,
    } = this.props

    const { Subjectschedulesemptyrecord,parentStateChange } = stateObject.state

    if (this.Mandatory())
      Paggination.functions.addAndedit(stateObject, 'Subjectschedules', Subjectschedulesemptyrecord)
    }



    onClickNew(){
      Paggination.functions.editModalone = true
      const { stateObject } = this.props
      var Subjectschedulesempty = {
        idx: '',
        subjectID: "",
        date: "",
        startTime: {
          hour: "",
          min: ""
        },
        endTime: {
          hour: "",
          min: ""
        },
        hall: "",
        maxMark: '',
        syllabus: '',
        gradeDetails: []
      }
    
      Paggination.functions.onClickNew(stateObject, 'Subjectschedulesemptyrecord', Subjectschedulesempty)

    }
  
    onEdit(item, index){
      Paggination.functions.editModalone = true
      const { stateObject } = this.props
      Paggination.functions.edit(stateObject, 'Subjectschedulesemptyrecord', item, index)
    }
  
    onDelete(index){
      Paggination.functions.editModalone = true
      const { stateObject } = this.props
      Paggination.functions.delete(stateObject, 'Subjectschedules', index)

    }







  render() {
    const {
      stateObject,
      currentIndex
    } = this.props

    const { dataModel, editable, Subjectschedulesemptyrecord } = stateObject.state
    const { parentStateChange } = stateObject
    var currentInd = 0
    if (currentIndex >= 1) {
      currentInd = currentIndex - 1
    }

    // View
   
    return (

      <View>

        {(stateObject.state.currentOperation == 'Create') && <View style={[AppStyles.row_space_between]}>
          <Subheading style={AppStyles.bold_600}>{stateObject.state.createStepsHeading[1]}</Subheading>
          {dataModel.Subjectschedules.length != 0 && <CustomButtons
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

        {dataModel.Subjectschedules.length == 0 && <View style={AppStyles.marginTop_2}>
          <CustomButtons
            onPress={() => this.onClickNew()}
            title={`Add Exam Schedule`}
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

        {(stateObject.state.currentOperation == 'Modification' && dataModel.Subjectschedules.length != 0) && <View style={[AppStyles.flex_End, AppStyles.marginTop_1]}>
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

        {dataModel.Subjectschedules == 0 && <ImpNotes
          isArray={false}
          // message={`By clicking 'Add new Period Details' for new group `}
          message={`Click add button to add the exam schedule details.`}
        />}

{/* SelectListUtils.functions.getSelectedValue(SelectListUtils.functions.selectMaster.SubjectMaster, item.subjectID) */}

        <View >
          {dataModel.Subjectschedules.map((item, index) => (
            <View key={index.toString()} style={AppStyles.marginTop_1}>
              <TouchableOpacity onPress={() => this.changeLayout(index)} style={[AppStyles.flexDirectionRow, AppStyles.alignItems]}>
                <MaterialIcons name={this.state.selectedPeriodIndex != index ? "navigate-next" : "keyboard-arrow-down"} size={AppStyles.iconSize.height} color={UiColor.LIGHT_TEXT_COLOR} />
                <View style={[AppStyles.marginLeft_1, AppStyles.flex_one]}>
                  <Subheading style={[AppStyles.bold_400]}>{SelectListUtils.functions.getSelectedValue(SelectListUtils.functions.selectMaster.SubjectMaster, item.subjectID)}</Subheading>
                  <Text style={[{ color: UiColor.LIGHT_TEXT_COLOR }]}>{item.date}</Text>
                </View>

                {(stateObject.state.currentOperation == 'Create' || stateObject.state.currentOperation == 'Modification') && <View style={[AppStyles.flexDirectionRow]}>
                  <AntDesign onPress={() => this.onEdit(item, index)}
                    name="edit" size={AppStyles.iconSize.height} color={AppStyles.inactiveMoreIcon.tintColor} />


                  <View style={AppStyles.marginLeft_2}>
                    <AntDesign onPress={() => this.onDelete(index)}
                      name="delete" size={AppStyles.iconSize.height} color={AppStyles.inactiveMoreIcon.tintColor} />
                  </View>
                </View>}
              </TouchableOpacity>
              <View style={[{ height: this.state.selectedPeriodIndex == index ? null : 0, overflow: 'hidden', }]}>
                <View style={[AppStyles.flexDirectionRow, AppStyles.marginTop_2, AppStyles.marginLeft_4]}>
                  <Text style={AppStyles.listHeading}>Exam Time</Text>
                  <Text style={AppStyles.listValue}>{item.startTime.hour}:{item.startTime.min} - {item.endTime.hour}:{item.endTime.min}</Text>
                </View>
                <View style={[AppStyles.flexDirectionRow, AppStyles.marginTop_1, AppStyles.marginLeft_4]}>
                  <Text style={AppStyles.listHeading}>Hall</Text>
                  <Text style={AppStyles.listValue}>{item.hall}</Text>
                </View>
                <View style={[AppStyles.flexDirectionRow, AppStyles.marginTop_1, AppStyles.marginLeft_4]}>
                  <Text style={AppStyles.listHeading}>Maximum Mark</Text>
                  <Text style={AppStyles.listValue}>{item.maxMark}</Text>
                </View>
                <View style={[AppStyles.flexDirectionRow, AppStyles.marginTop_1, AppStyles.marginLeft_4]}>
                  <Text style={AppStyles.listHeading}>Syllabus/Remarks</Text>
                  <Text style={AppStyles.listValue}>{item.syllabus}</Text>
                </View>

                <View style={styles.marginLeft_15}>
                {item.gradeDetails.map((item, index) => (
                  <View key={index.toString()} style={[AppStyles.eventContainer, { borderLeftColor: GeneralUtils.functions._getRandomColor(index) }]}>
                    <View style={[AppStyles.width85,]}>
                      <Subheading>Grade {item.grade}</Subheading>
                      <Text style={AppStyles.attrNameStyle}>Mark/Score <Text>{item.from} - {item.to}</Text></Text>
                    </View>
                  </View>
                ))}
              </View>

              </View>
              {/* <Divider style={AppStyles.marginVertical_2} /> */}


            </View>
          ))}
        </View>
       {Paggination.functions.editModalone && <TwoLevelEditModal
          templates1={<EditExamScheduleDetails stateObject={stateObject} />}
          templates2={<ClassExamScheduleGrade stateObject={stateObject} />}
          stateObject={stateObject}
          title={Paggination.functions.selectedIndex == null ? 'Add' : 'Edit'}
          subTitle1={'Exam Schedule'}
          subTitle2={'Exam Schedule'}
          onSubmit={() => this.onSubmit()}
          checkMandatory={() => this.Mandatory()}
          checkMandatory2={() => this.GradeMandatory()}
        />}

      </View>
    );
  }
}

const styles = StyleSheet.create({
  marginLeft_15: {
    marginLeft: w('15%')
  }
})
export default InstituteClassConfigPeriod;

