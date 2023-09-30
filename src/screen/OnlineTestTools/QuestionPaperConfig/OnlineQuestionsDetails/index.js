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
import { TextInput, Title, Text, Subheading,Caption } from 'react-native-paper';
import { w, h } from "../../../../utils/Dimensions";
import SelectListUtils from '../../../../utils/SelectListUtils'
import AppStyles from "../../../../AppStyles/AppStyles";
import CustomButtons from '../../../../components/CustomButtons';
import { UiColor } from "../../../../theme";
import OptionsDetails from '../OptionsDetails';
import EditQuestionDetails from '../EditQuestionDetails';
// import GradePaggination from "../GradePaggination";
import Paggination from "../../../../utils/Paggination";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Exception from '../../../../utils/Exception'
import AntDesign from 'react-native-vector-icons/AntDesign';
import ImpNotes from '../../../../components/ImpNotes';
import TwoLevelEditModal from '../../../../components/TwoLevelEditModal';


var Questionsempty = {
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
}




class OnlineQuestionsDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      selectedPeriodIndex: 0
    }
    this.onSubmit = this.onSubmit.bind(this)
    this.onClickNew = this.onClickNew.bind(this)
    this.onEdit = this.onEdit.bind(this)
    this.onDelete = this.onDelete.bind(this)
  }




  Mandatory = function () {
    const {
      stateObject,
    } = this.props
    const { questionDetailsEmptyrecord, sectionDetailsEmptyrecord } = stateObject.state
    stateObject.state.errorField = []
    var mandatoryCheckError = false;
    if (questionDetailsEmptyrecord.questionType == '' || questionDetailsEmptyrecord.questionType == null) {
      mandatoryCheckError = true
      stateObject.state.errorField.push('field1')
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
    Paggination.functions.editModalone = true
    const {
      stateObject,
    } = this.props

    const { questionDetailsEmptyrecord,selectedSectionIndex } = stateObject.state

    Paggination.functions.parentIndex = selectedSectionIndex
    if (this.Mandatory())
    Paggination.functions.addAndeditLevel2(stateObject, 'sectionDetails', 'questionDetails', questionDetailsEmptyrecord)
    
    
    }


    onClickNew(){
      Paggination.functions.editModalone = true
      const { stateObject } = this.props
      const { selectedSectionIndex } = stateObject.state
      Paggination.functions.parentIndex = selectedSectionIndex
      Paggination.functions.onClickNew(stateObject, 'questionDetailsEmptyrecord', Questionsempty)
    }
  
    
    onEdit(item, index){
      Paggination.functions.editModalone = true
      const { stateObject } = this.props
      Paggination.functions.edit(stateObject, 'questionDetailsEmptyrecord', item, index)
    }
  
    onDelete(index){
      Paggination.functions.editModalone = true
      const { stateObject } = this.props
      const { selectedSectionIndex } = stateObject.state
      // Paggination.functions.delete(stateObject, `sectionDetails[${selectedSectionIndex}].questionDetails`, index)

      Paggination.functions.deleteLevel2(stateObject, 'sectionDetails', 'questionDetails', selectedSectionIndex, index)

    }




  OptionsMandatory = function () {
    const {
      stateObject,
    } = this.props
    const { questionDetailsEmptyrecord } = stateObject.state
   
    if ((questionDetailsEmptyrecord.options.length == 0 || questionDetailsEmptyrecord.options == null)) {
      Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-089', errorMessage: '', errorParam: '' }])
      return false;
    }
  else{
    return true
  }
  }





  render() {
    const {
      stateObject,
      currentIndex
    } = this.props

    const { dataModel, editable, sectionDetailsEmptyrecord } = stateObject.state
    const { parentStateChange } = stateObject

 

  console.log(sectionDetailsEmptyrecord,"sectionDetailsEmptyrecord")

    return (

      <View>
        {/* <Title style={AppStyles.bold_600}>{SelectListUtils.functions.getSelectedValue(SelectListUtils.functions.selectMaster.SubjectMaster, sectionDetailsEmptyrecord.subjectID)}</Title> */}

        {(stateObject.state.currentOperation == 'Create') && <View style={[AppStyles.row_space_between]}>

          <Subheading style={AppStyles.bold_600}>{''}</Subheading>
          {sectionDetailsEmptyrecord.questionDetails.length != 0 && <CustomButtons
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

        {sectionDetailsEmptyrecord.questionDetails.length == 0 && <View style={AppStyles.marginTop_2}>
          <CustomButtons
            onPress={() => this.onClickNew()}
            title={`Add Question`}
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

        {(stateObject.state.currentOperation == 'Modification' && sectionDetailsEmptyrecord.questionDetails.length != 0) && <View style={[AppStyles.flex_End, AppStyles.marginTop_1]}>
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

        {sectionDetailsEmptyrecord.questionDetails == 0 && <ImpNotes
          isArray={false}
          // message={`By clicking 'Add new Period Details' for new group `}
          message={`Click 'Add Question' button to add the question details.`}
        />}



        <View >
          {sectionDetailsEmptyrecord.questionDetails.map((item, index) => (
            <View key={index.toString()} style={AppStyles.marginTop_1}>
              <View style={[AppStyles.row_in_space_around, AppStyles.alignItems]}>
                <View style={[ AppStyles.flex_one]}>
                <Text style={[AppStyles.textColor]}>Question Type</Text>
                  <Subheading style={[AppStyles.bold_400,AppStyles.payTextStyle]}>{SelectListUtils.functions.getSelectedValue(SelectListUtils.functions.selectMaster.QuestionType, item.questionType)}</Subheading>
                 
                </View>
                {(stateObject.state.currentOperation == 'Create' || stateObject.state.currentOperation == 'Modification') && <View style={[AppStyles.flexDirectionRow]}>
                  <AntDesign onPress={() => this.onEdit(item, index)}
                    name="edit" size={AppStyles.iconSize.height} color={AppStyles.inactiveMoreIcon.tintColor} />

                  <View style={AppStyles.marginLeft_2}>
                    <AntDesign onPress={() => this.onDelete(index)}
                      name="delete" size={AppStyles.iconSize.height} color={AppStyles.inactiveMoreIcon.tintColor} />
                  </View>
                </View>}
              </View>

              {/* <View style={AppStyles.marginTop_1}>
                <Caption style={[AppStyles.textColor,]}>Question No.</Caption>
                <Text>{index + 1}</Text>
              </View> */}

              <View style={AppStyles.marginTop_1}>
                <Caption style={[AppStyles.textColor,]}>Question</Caption>
                <Text>{index + 1} {item.question}</Text>
              </View>

              <View>
              <View style={AppStyles.marginTop_1}>
                <Caption style={[AppStyles.textColor,]}>Positive Mark</Caption>
                <Text>{item.positiveMark}</Text>
              </View>

              <View style={AppStyles.marginTop_1}>
                <Caption style={[AppStyles.textColor,]}>Negative Mark</Caption>
                <Text>{item.negativeMark}</Text>
              </View>
              </View>

              <View style={AppStyles.marginTop_1}>
                <Caption style={[AppStyles.textColor,]}>Upload image related to Question</Caption>
                {/* <Text>{item.maxQuestion}</Text> */}


              </View>

            </View>
          ))}
        </View>

        {Paggination.functions.editModalone && <TwoLevelEditModal
          templates1={<EditQuestionDetails stateObject={stateObject} />}
          templates2={<OptionsDetails stateObject={stateObject} />}
          stateObject={stateObject}
          title={Paggination.functions.selectedIndex == null ? 'Add' : 'Edit'}
          subTitle1={'Question Details'}
          subTitle2={'Option Details'}
          onSubmit={() => this.onSubmit()}
          checkMandatory={() => this.Mandatory()}
          checkMandatory2={() => this.OptionsMandatory()}
        />}

        {/* <GradeEditModal
          templates={<EditQuestionDetails stateObject={stateObject} />}
          stateObject={stateObject}
          title={GradePaggination.functions.selectedIndex == null ? 'Add' : 'Edit'}
          subTitle={'Question'}
          onSubmit={() => this.onSubmit()}
        /> */}

        

      </View>
    );
  }
}

const styles = StyleSheet.create({

})
export default OnlineQuestionsDetails;

