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
import { Text, Subheading, Divider, Caption } from 'react-native-paper';
import { w, h } from "../../../../utils/Dimensions";
import SelectListUtils from '../../../../utils/SelectListUtils'
import AppStyles from "../../../../AppStyles/AppStyles";
import CustomButtons from '../../../../components/CustomButtons';
import { UiColor } from "../../../../theme";
import TwoLevelEditModal from '../../../../components/TwoLevelEditModal';
import EditSectionDetails from '../EditSectionDetails';
import OnlineQuestionsDetails from '../OnlineQuestionsDetails';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import GeneralUtils from "../../../../utils/GeneralUtils";
import Paggination from "../../../../utils/Paggination";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Exception from '../../../../utils/Exception'
import AntDesign from 'react-native-vector-icons/AntDesign';
import ImpNotes from '../../../../components/ImpNotes';
import SecondModal from '../../../../components/SecondModal';

import QuestionDetailsModal from '../QuestionDetailsModal';



var sectionDetailrecord = {
  sectionNumber: "",
  sectionName: "",
  questionType: "",
  maxTimeHour: "",
  maxTimeMin: "",
  maxQuestion: "",
  sectionInstructions: "",
  maxMark: "",
  questionDetails: [{
    questionType: "",
    questionID: "",
    questionNumber: "",
    imageID: "",
    imagePath: "",
    question: "",
    negativeMark: "",
    positiveMark: "",
    descriptiveAnswer: "",
    options: [{
      optionNumber: "",
      option: "",
      optionImageID: "",
      optionImagePath: "",
      isItCorrectAnswer: false
    }],
    comprehensiveQuestionDetails: [{
      questionID: "",
      questionNumber: "",
      questionType: "S",
      imageID: "",
      imagePath: "",
      question: "",
      negativeMark: "",
      positiveMark: "",
      options: [{
        optionNumber: "",
        option: "",
        optionImageID: "",
        optionImagePath: "",
        isItCorrectAnswer: false
      }]
    }]
  }]
}





class QuestionPaperConfigSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      selectedPeriodIndex: 0,
      mandatoryStatus: false
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
    const { sectionDetailsEmptyrecord } = stateObject.state
    stateObject.state.errorField = []
    var mandatoryCheckError = false;
    if (sectionDetailsEmptyrecord.sectionName == '' || sectionDetailsEmptyrecord.sectionName == null) {
      mandatoryCheckError = true
      stateObject.state.errorField.push('field1')
    }
    if (sectionDetailsEmptyrecord.maxQuestion == '' || sectionDetailsEmptyrecord.maxQuestion == null) {
      mandatoryCheckError = true
      stateObject.state.errorField.push('field2')
    }

    if (sectionDetailsEmptyrecord.maxMark == '' || sectionDetailsEmptyrecord.maxMark == null) {
      mandatoryCheckError = true
      stateObject.state.errorField.push('field3')
    }

    if ((sectionDetailsEmptyrecord.maxTimeHour == '' || sectionDetailsEmptyrecord.maxTimeHour == null) && (sectionDetailsEmptyrecord.maxTimeMin == '' || sectionDetailsEmptyrecord.maxTimeMin == null)) {
      mandatoryCheckError = true
      stateObject.state.errorField.push('field4')
    }


    if (sectionDetailsEmptyrecord.sectionInstructions == '' || sectionDetailsEmptyrecord.sectionInstructions == null) {
      mandatoryCheckError = true
      stateObject.state.errorField.push('field5')
    }

    if (mandatoryCheckError) {
      Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-080', errorMessage: '', errorParam: '' }])
      return false
    }
    else {
      return true
    }
  }




  // GradeMandatory = function () {
  //   const {
  //     stateObject,
  //   } = this.props
  //   const { sectionDetailsEmptyrecord } = stateObject.state

  //   if ((sectionDetailsEmptyrecord.questionDetails.length == 0 || sectionDetailsEmptyrecord.questionDetails == null)) {
  //     Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-089', errorMessage: '', errorParam: '' }])
  //     return false;
  //   }
  //   else {
  //     return true
  //   }
  // }


  onSubmit() {
    Paggination.functions.editModalone = true
    const {
      stateObject,
    } = this.props

    const { sectionDetailsEmptyrecord } = stateObject.state

    if (this.Mandatory())
      Paggination.functions.addAndedit(stateObject, 'sectionDetails', sectionDetailsEmptyrecord)
  }



  onClickNew() {
    Paggination.functions.editModalone = true
    const { stateObject } = this.props
    Paggination.functions.onClickNew(stateObject, 'sectionDetailsEmptyrecord', sectionDetailrecord)

  }

  onEdit(item, index) {
    Paggination.functions.editModalone = true
    const { stateObject } = this.props
    Paggination.functions.edit(stateObject, 'sectionDetailsEmptyrecord', item, index)
  }

  onDelete(index) {
    Paggination.functions.editModalone = true
    const { stateObject } = this.props
    Paggination.functions.delete(stateObject, 'sectionDetails', index)

  }



  viewQuestion(data,index){
    const {
      stateObject,
    } = this.props
    stateObject.parentStateChange({
      sectionDetailsEmptyrecord:data,
      questionDetailsVisible:true,
      selectedSectionIndex:index
    })
  }



  render() {
    const {
      stateObject,
      currentIndex
    } = this.props

    const { dataModel, editable, sectionDetailsEmptyrecord } = stateObject.state
    const { parentStateChange } = stateObject
  

    // View

    return (

      <View>
        {(stateObject.state.currentOperation == 'Create') && <View style={[AppStyles.row_space_between]}>
          <Subheading style={AppStyles.bold_600}>{stateObject.state.createStepsHeading[2]}</Subheading>
          {dataModel.sectionDetails.length != 0 && <CustomButtons
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

        {dataModel.sectionDetails.length == 0 && <View style={AppStyles.marginTop_2}>
          <CustomButtons
            onPress={() => this.onClickNew()}
            title={`Add Section`}
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

        {(stateObject.state.currentOperation == 'Modification' && dataModel.sectionDetails.length != 0) && <View style={[AppStyles.flex_End, AppStyles.marginTop_1]}>
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

        {dataModel.sectionDetails == 0 && <ImpNotes
          isArray={false}
          // message={`By clicking 'Add new Period Details' for new group `}
          message={`Click 'Add Section' button to add the section details.`}
        />}



        <View >
          {dataModel.sectionDetails.map((item, index) => (
            <View key={index.toString()} style={AppStyles.marginTop_1}>
              <TouchableOpacity onPress={() => this.changeLayout(index)} style={[AppStyles.flexDirectionRow, AppStyles.alignItems]}>
                <MaterialIcons name={this.state.selectedPeriodIndex != index ? "navigate-next" : "keyboard-arrow-down"} size={AppStyles.iconSize.height} color={UiColor.LIGHT_TEXT_COLOR} />

                <View style={[AppStyles.marginLeft_1, AppStyles.flex_one]}>
                  {/* <Subheading style={[AppStyles.bold_400]}>{SelectListUtils.functions.getSelectedValue(SelectListUtils.functions.selectMaster.SubjectMaster, item.subjectID)}</Subheading> */}
                  <Subheading style={AppStyles.payTextStyle}>{index + 1}. {item.sectionName}</Subheading>
                  <Text style={[AppStyles.textColor]}>{'Section Name'}</Text>
                 
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
              <View style={[AppStyles.marginTop_1, AppStyles.flex_End]}>
                    <CustomButtons
                      onPress={() => this.viewQuestion(item,index)}
                      title="Questions"
                      // titleStyle={AppStyles.signInTextStyle}
                      buttonStyle={{ backgroundColor: UiColor.SKYBLUE }}
                    />
                  </View>
              <View style={[{ height: this.state.selectedPeriodIndex == index ? null : 0, overflow: 'hidden', }]}>
                <View style={AppStyles.marginLeft_4}>

                  <View style={AppStyles.marginTop_1}>
                    <Caption style={[AppStyles.textColor,]}>Maximum Question</Caption>
                    <Text>{item.maxQuestion}</Text>
                  </View>

                  <View style={AppStyles.marginTop_1}>
                    <Caption style={[AppStyles.textColor,]}>Maximum Mark</Caption>
                    <Text>{item.maxMark}</Text>
                  </View>

                  <View style={AppStyles.marginTop_1}>
                    <Caption style={[AppStyles.textColor,]}>Maximum Alloted Time</Caption>
                    <Text>{`${item.maxTimeHour}:${item.maxTimeMin}`}</Text>
                  </View>

                  <View style={AppStyles.marginTop_1}>
                    <Caption style={[AppStyles.textColor,]}>Section Instruction</Caption>
                    <Text>{item.sectionInstructions}</Text>
                  </View>

                </View>

              </View>
              {/* <Divider style={AppStyles.marginVertical_2} /> */}


            </View>
          ))}
        </View>
        {Paggination.functions.editModalone &&
          <SecondModal
            templates={<EditSectionDetails stateObject={stateObject} />}
            stateObject={stateObject}
            title={Paggination.functions.selectedIndex == null ? 'Add' : 'Edit'}
            subTitle={'Section Details'}
            onSubmit={() => this.onSubmit()}
          />
        }

      <QuestionDetailsModal
          templates={<OnlineQuestionsDetails stateObject={stateObject} />}
          stateObject={stateObject}
          title={'Questions'}
          subTitle={'Details'}
          // onSubmit={() => this.onSubmit()}
        />


      </View>
    );
  }
}

const styles = StyleSheet.create({
  marginLeft_15: {
    marginLeft: w('15%')
  }
})
export default QuestionPaperConfigSection;

