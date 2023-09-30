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
import {  Subheading } from 'react-native-paper';
import AppStyles from "../../../../AppStyles/AppStyles";
import SecondModal from '../../../../components/SecondModal';
import EditAnswerDetail from '../EditAnswerDetail';
import Paggination from "../../../../utils/Paggination";
import Exception from '../../../../utils/Exception'
import AntDesign from 'react-native-vector-icons/AntDesign';






class ClassAssignmentQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      selectedFamilyIndex: 0
    }
    this.onSubmit = this.onSubmit.bind(this)
    this.onEdit = this.onEdit.bind(this)

  }


  Mandatory = function () {
    const {
      stateObject,
    } = this.props
    const { questionsEmptyrecord } = stateObject.state

    stateObject.state.errorField = []
    var mandatoryCheckError = false;

    if (questionsEmptyrecord.answer == '' || questionsEmptyrecord.answer == null) {
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

    // return true
  }





  onSubmit() {
    Paggination.functions.editModalone = true
    const {
      stateObject,
    } = this.props
    const { questionsEmptyrecord } = stateObject.state
    if (this.Mandatory()) {
      Paggination.functions.addAndedit(stateObject, 'questions', questionsEmptyrecord)
    }
    // familyView = false
  }



  onEdit(item, index) {
    Paggination.functions.editModalone = true
    const { stateObject } = this.props
    Paggination.functions.edit(stateObject, 'questionsEmptyrecord', item, index)
    // familyView = false
  }




  render() {
    const { stateObject, currentIndex } = this.props
    const { dataModel, questionsEmptyrecord, } = stateObject.state
    const { parentStateChange } = stateObject

    return (
      <View>
        {dataModel.questions.map((item, index) => (
          <View key={index.toString()} style={index != 0 ? [AppStyles.marginTop_3]: []}>
            <View style={[AppStyles.flex_one]}>
              <Subheading style={[AppStyles.bold]}>{'Question '}{index + 1}.</Subheading>
            </View>
            <Subheading style={[AppStyles.bold_400]}>{item.question} </Subheading>

            <View style={[AppStyles.flex_one, AppStyles.marginTop_1,AppStyles.row_space_between]}>
              <Subheading style={[AppStyles.bold]}>{'Answer'}</Subheading>
             {(stateObject.state.currentOperation == 'Create' || stateObject.state.currentOperation == 'Modification') && <AntDesign onPress={() => this.onEdit(item, index)}
                name="edit" size={AppStyles.iconSize.height} color={AppStyles.inactiveMoreIcon.tintColor} />}
            </View>
            <Subheading style={[AppStyles.bold_400]}>{item.answer} </Subheading>
          </View>
        ))}


        {Paggination.functions.editModalone && <SecondModal
          templates={<EditAnswerDetail stateObject={stateObject} />}
          stateObject={stateObject}
          title={'Answer'}
          subTitle={''}
          onSubmit={() => this.onSubmit()}
        />}

      </View>

    );
  }
}

const styles = StyleSheet.create({
})
export default ClassAssignmentQuestion;
