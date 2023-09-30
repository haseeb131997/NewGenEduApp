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
import { TextInput, Card, Text, Divider } from 'react-native-paper';
import { w, h } from "../../../../utils/Dimensions";
import SelectListUtils from '../../../../utils/SelectListUtils'
import AppStyles from "../../../../AppStyles/AppStyles";
import InputText from '../../../../components/InputText';
import SuggestionTextInput from '../../../../components/SuggestionTextInput';
import SuggestionList from '../../../../components/SuggestionList';
import SearchUtils from "../../../../utils/SearchUtils";
import GeneralUtils from "../../../../utils/GeneralUtils";










class EditSubjectDetail extends Component {
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

    const { dataModel, editable, errorField, SubjectMasterEmptyrecord } = stateObject.state
    const { parentStateChange } = stateObject
    var currentInd = 0


    return (
      <View>
         <InputText
        required={true}
        // editable={!primaryKeyEditable}
        label={'Subject ID'}
        secureTextEntry={false}
        onChangeText={text => {
          SubjectMasterEmptyrecord.subjectID = text
          parentStateChange({ SubjectMasterEmptyrecord: SubjectMasterEmptyrecord })
        }}
        value={SubjectMasterEmptyrecord.subjectID}
        errorMessage={GeneralUtils.functions.getErrorMessage('field1', SubjectMasterEmptyrecord.subjectID, errorField, [], 'ID')}
      />

       <InputText
        required={true}
        // editable={!primaryKeyEditable}
        label={'Subject Name'}
        secureTextEntry={false}
        onChangeText={text => {
          SubjectMasterEmptyrecord.subjectName = text
          parentStateChange({ SubjectMasterEmptyrecord: SubjectMasterEmptyrecord })
        }}
        value={SubjectMasterEmptyrecord.subjectName}
        errorMessage={GeneralUtils.functions.getErrorMessage('field2', SubjectMasterEmptyrecord.subjectName, errorField, [], 'Subject name')}
      />

        <InputText
        required={false}
        // editable={!primaryKeyEditable}
        label={'Subject Name (in local language)'}
        secureTextEntry={false}
        onChangeText={text => {
          SubjectMasterEmptyrecord.otherLangDescription = text
          parentStateChange({ SubjectMasterEmptyrecord: SubjectMasterEmptyrecord })
        }}
        value={SubjectMasterEmptyrecord.otherLangDescription}
        // errorMessage={GeneralUtils.functions.getErrorMessage('field3', SubjectMasterEmptyrecord.otherLangDescription, errorField, [], 'Description (in local language)')}
      />
      </View>
    );
  }
}

const styles = StyleSheet.create({

})
export default EditSubjectDetail;

