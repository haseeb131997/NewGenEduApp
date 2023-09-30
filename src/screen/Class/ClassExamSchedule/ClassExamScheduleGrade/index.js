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
import { TextInput, Title, Text, Subheading } from 'react-native-paper';
import { w, h } from "../../../../utils/Dimensions";
import SelectListUtils from '../../../../utils/SelectListUtils'
import AppStyles from "../../../../AppStyles/AppStyles";
import CustomButtons from '../../../../components/CustomButtons';
import { UiColor } from "../../../../theme";
import GradeEditModal from '../GradeEditModal';
import EditGradeDetails from '../EditGradeDetails';
import GradePaggination from "../GradePaggination";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Exception from '../../../../utils/Exception'
import AntDesign from 'react-native-vector-icons/AntDesign';
import ImpNotes from '../../../../components/ImpNotes';








class InstituteClassConfigPeriod extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      selectedPeriodIndex: 0
    }
    this.onSubmit = this.onSubmit.bind(this)
  }




  Mandatory = function () {
    const {
      stateObject,
    } = this.props
    const { GradeDetailsemptyrecord,Subjectschedulesemptyrecord } = stateObject.state
    stateObject.state.errorField = []
    var mandatoryCheckError = false;
    if (GradeDetailsemptyrecord.subjectID == '' || GradeDetailsemptyrecord.subjectID == null) {
      mandatoryCheckError = true
      stateObject.state.errorField.push('field8')
    }
    if (GradeDetailsemptyrecord.grade == '' || GradeDetailsemptyrecord.grade == null) {

      mandatoryCheckError = true
      stateObject.state.errorField.push('field9')
    }

    if (GradeDetailsemptyrecord.from == '' || GradeDetailsemptyrecord.from == null) {

      mandatoryCheckError = true
      stateObject.state.errorField.push('field10')
    }
    if (GradeDetailsemptyrecord.to == '' || GradeDetailsemptyrecord.to == null) {

      mandatoryCheckError = true
      stateObject.state.errorField.push('field11')
    }


   

   
    
    if (mandatoryCheckError) {
      Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-080', errorMessage: '', errorParam: '' }])
      return false
    }
    else {
      return true
    }
  }



  onSubmit() {
    const {
      stateObject,
    } = this.props

    const { GradeDetailsemptyrecord } = stateObject.state

    if (this.Mandatory())
      GradePaggination.functions.addAndedit(stateObject,'Subjectschedulesemptyrecord' ,'gradeDetails', GradeDetailsemptyrecord)
     }











  render() {
    const {
      stateObject,
      currentIndex
    } = this.props

    const { dataModel, editable, Subjectschedulesemptyrecord } = stateObject.state
    const { parentStateChange } = stateObject

    var Gradeempty = {
      idx: "",
      subjectID: Subjectschedulesemptyrecord.subjectID,
      grade: "",
      from: "",
      to: ""
    }
    // View SelectListUtils.functions.getSelectedValue(SelectListUtils.functions.selectMaster.SubjectMaster, Subjectschedulesemptyrecord.subjectID)
    return (

      <View>
     <Title style={AppStyles.bold_600}>{SelectListUtils.functions.getSelectedValue(SelectListUtils.functions.selectMaster.SubjectMaster, Subjectschedulesemptyrecord.subjectID)}</Title>
        {(stateObject.state.currentOperation == 'Create') && <View style={[AppStyles.row_space_between]}>
       
          <Subheading style={AppStyles.bold_600}>{'Grade Details'}</Subheading>
          {Subjectschedulesemptyrecord.gradeDetails.length != 0 &&<CustomButtons
            onPress={() => GradePaggination.functions.onClickNew(stateObject, 'GradeDetailsemptyrecord', Gradeempty)}
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

        {Subjectschedulesemptyrecord.gradeDetails.length == 0 && <View style={AppStyles.marginTop_2}>
          <CustomButtons
            onPress={() => GradePaggination.functions.onClickNew(stateObject, 'GradeDetailsemptyrecord', Gradeempty)}
            title={`Add Grade`}
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

        {(stateObject.state.currentOperation == 'Modification' && Subjectschedulesemptyrecord.gradeDetails.length != 0 ) && <View style={[AppStyles.flex_End, AppStyles.marginTop_1]}>
          <CustomButtons
            onPress={() => GradePaggination.functions.onClickNew(stateObject, 'GradeDetailsemptyrecord', Gradeempty)}
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

        {Subjectschedulesemptyrecord.gradeDetails == 0 && <ImpNotes
          isArray={false}
          // message={`By clicking 'Add new Period Details' for new group `}
          message={`Click add button to add the grade details.`}
        />}



        <View >
          {Subjectschedulesemptyrecord.gradeDetails.map((item, index) => (
            <View key={index.toString()} style={AppStyles.marginTop_1}>
              <View style={[ AppStyles.row_in_space_around,AppStyles.alignItems]}>
                <View style={[AppStyles.marginLeft_1, AppStyles.flex_one]}>
                  <Subheading style={[AppStyles.bold_400]}>Grade {item.grade}</Subheading>
                  <Text style={[AppStyles.textColor]}>Mark/Score <Text>{item.from} - {item.to}</Text></Text>
                </View>

                {(stateObject.state.currentOperation == 'Create' || stateObject.state.currentOperation == 'Modification') && <View style={[AppStyles.flexDirectionRow]}>
                  <AntDesign onPress={() => GradePaggination.functions.edit(stateObject, 'GradeDetailsemptyrecord', item, index)}
                    name="edit" size={AppStyles.iconSize.height} color={AppStyles.inactiveMoreIcon.tintColor} />


                  <View style={AppStyles.marginLeft_2}>
                    <AntDesign onPress={() => GradePaggination.functions.delete(stateObject,'Subjectschedulesemptyrecord' ,'gradeDetails', index)}
                      name="delete" size={AppStyles.iconSize.height} color={AppStyles.inactiveMoreIcon.tintColor} />
                  </View>
                </View>}
              </View>
  
            </View>
          ))}
        </View>
        <GradeEditModal
          templates={<EditGradeDetails stateObject={stateObject} />}
          stateObject={stateObject}
          title={GradePaggination.functions.selectedIndex == null ? 'Add' : 'Edit'}
          subTitle={'Grade'}
          onSubmit={() => this.onSubmit()}
         

        />

      </View>
    );
  }
}

const styles = StyleSheet.create({

})
export default InstituteClassConfigPeriod;

