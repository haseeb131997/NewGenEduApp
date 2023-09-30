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
import { httpUtils } from '../../../../utils/HttpUtils';
import GeneralUtils from "../../../../utils/GeneralUtils"

import CustomButtons from '../../../../components/CustomButtons';
import SecondModal from '../../../../components/SecondModal';
import EditQuestionDetail from '../EditQuestionDetail';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Paggination from "../../../../utils/Paggination";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Exception from '../../../../utils/Exception'
import ImpNotes from '../../../../components/ImpNotes';
import AntDesign from 'react-native-vector-icons/AntDesign';



import { UiColor } from "../../../../theme";

var familyView = false
var notesView = false

class ClassAssignmentQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      selectedFamilyIndex: 0
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
    const { questionsEmptyrecord } = stateObject.state

    stateObject.state.errorField = []
    var mandatoryCheckError = false;

    if (questionsEmptyrecord.question == '' || questionsEmptyrecord.question == null) {
      mandatoryCheckError = true
      stateObject.state.errorField.push('field1')
      // return false;
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
    const { questionsEmptyrecord } = stateObject.state
 
    if (this.Mandatory()){
      Paggination.functions.addAndedit(stateObject, 'questions', questionsEmptyrecord)
    }
      // familyView = false
  }


  onClickNew(){
    Paggination.functions.editModalone = true
    const { stateObject } = this.props
    var emptyRecord = {
      question: "",
      questionID: "",
    }
  
    Paggination.functions.onClickNew(stateObject, 'questionsEmptyrecord', emptyRecord)
    // familyView = false
  }

  onEdit(item, index){
    Paggination.functions.editModalone = true
    const { stateObject } = this.props
    Paggination.functions.edit(stateObject, 'questionsEmptyrecord', item, index)
    // familyView = false
  }

  onDelete(index){
    Paggination.functions.editModalone = true
    const { stateObject } = this.props
    Paggination.functions.delete(stateObject, 'questions', index)
    // familyView = false
  }








  render() {
    const { stateObject, currentIndex } = this.props
    const { dataModel, editable, questionsEmptyrecord } = stateObject.state
    const { parentStateChange } = stateObject

  
    return (
      <View>

{/* <Subheading style={AppStyles.bold_600}>{'Questions'}</Subheading> */}

        {(stateObject.state.currentOperation == 'Create' ) && <View style={[AppStyles.row_space_between]}>
          <Subheading style={AppStyles.bold_600}>{'Questions'}</Subheading>
          {dataModel.questions.length != 0 && <CustomButtons
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
        {((stateObject.state.currentOperation == 'Create' || stateObject.state.currentOperation == 'Modification') && dataModel.questions.length == 0) && <View style={AppStyles.marginTop_2}>
          <CustomButtons
            onPress={() => this.onClickNew()}
            title={`Add Questions`}
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

        {(stateObject.state.currentOperation == 'Modification' && dataModel.questions.length != 0) && <View style={[AppStyles.flex_End, AppStyles.marginTop_1]}>
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


        {(dataModel.questions == 0 && (stateObject.state.currentOperation == 'Create' || stateObject.state.currentOperation == 'Modification')) && <ImpNotes
          isArray={false}
          message={`Click "Add Questions" button to enter more questions for an assignment.`}
        />}






        <View style={[AppStyles.marginTop_2]}>
          {dataModel.questions.map((item, index) => (
            <View key={index.toString()} style={[AppStyles.marginTop_3]}>
              <View  style={[AppStyles.flexDirectionRow, AppStyles.alignItems,]}>
                <View style={[ AppStyles.flex_one]}>
                  <Subheading style={[AppStyles.bold]}>{'Question '}{index+1}.</Subheading>
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
              <Subheading style={[AppStyles.bold_400]}>{item.question} </Subheading>

              {/* <Divider style={AppStyles.marginVertical_2} /> */}
            </View>
          ))}
        </View>
       {Paggination.functions.editModalone &&  <SecondModal
          templates={<EditQuestionDetail stateObject={stateObject} />}
          stateObject={stateObject}
          title={Paggination.functions.selectedIndex == null ? 'Add' : 'Edit'}
          subTitle={'Question'}
          onSubmit={() => this.onSubmit()}
        />}
      </View>

    );
  }
}

const styles = StyleSheet.create({
})
export default ClassAssignmentQuestion;
