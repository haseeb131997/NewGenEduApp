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
import { View, StyleSheet, Image, Platform } from 'react-native';
import {  Subheading } from 'react-native-paper';
import AppStyles from "../../../../AppStyles/AppStyles";
import { Avatar } from 'react-native-elements';
import { httpUtils } from '../../../../utils/HttpUtils';
import GeneralUtils from "../../../../utils/GeneralUtils"
import DocumentCustom from '../../../../components/DocumentCustom';
import DownloadDocument from '../../../../components/DownloadDocument';
// import FullViewDocument from '../../../../components/FullViewDocument';
import SecondModal from '../../../../components/SecondModal';
import EditWorksheetDetail from '../EditWorksheetDetail';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Paggination from "../../../../utils/Paggination";
import LabelText from '../../../../components/LabelText';
import Exception from '../../../../utils/Exception'








class ClassAssignmentWorkSheet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      contentPath: '',
      showWebView: false
    }
    this.onSubmit = this.onSubmit.bind(this)
    this.onEdit = this.onEdit.bind(this)
  }




  Mandatory = function () {
    const {
      stateObject,
    } = this.props
    const { worksheetsEmptyrecord } = stateObject.state

    stateObject.state.errorField = []
    var mandatoryCheckError = false;

    if (worksheetsEmptyrecord.answerPath == '' || worksheetsEmptyrecord.answerPath == null) {
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
    const { worksheetsEmptyrecord } = stateObject.state
    if (this.Mandatory()) {
      Paggination.functions.addAndedit(stateObject, 'workSheets', worksheetsEmptyrecord)
    }
    // familyView = false
  }


  onEdit(item, index) {
    Paggination.functions.editModalone = true
    const { stateObject } = this.props
    Paggination.functions.edit(stateObject, 'worksheetsEmptyrecord', item, index)
    // familyView = false
  }













  render() {
    const { stateObject, currentIndex } = this.props
    const { dataModel } = stateObject.state

    return (
      <View>
   
          {dataModel.workSheets.map((item, index) => (
            <View key={index.toString()} style={index != 0 ?[AppStyles.marginTop_3]:[]}>
                <LabelText
                label={'Worksheet Description'}
                value={item.workSheetDescription}
              />

              <View style={[AppStyles.flex_one,AppStyles.marginTop_1]}>
                <Subheading style={[AppStyles.bold]}>{'Worksheet '}{index + 1}.</Subheading>
              </View>

              {(item.workSheetPath != '' && (GeneralUtils.functions.getFileType(item.workSheetPath) == 'pdf')) &&
                <DocumentCustom
                  openDocument={() => GeneralUtils.functions.openDocument(stateObject, item.workSheetPath)}
                  stateObject={stateObject}
                  source={GeneralUtils.functions.getSource(item.workSheetPath, stateObject)}
                  fileName={GeneralUtils.functions.getFileName(item.workSheetPath)}
                />}


              <View style={[AppStyles.flex_one, AppStyles.marginTop_1, AppStyles.row_space_between]}>
                <Subheading style={[AppStyles.bold]}>{'Answer:'}</Subheading>
                {(stateObject.state.currentOperation == 'Create' || stateObject.state.currentOperation == 'Modification') && <AntDesign onPress={() => this.onEdit(item, index)}
                  name="edit" size={AppStyles.iconSize.height} color={AppStyles.inactiveMoreIcon.tintColor} />}
              </View>


              {(item.answerPath != '' && (GeneralUtils.functions.getFileType(item.answerPath) == 'pdf')) &&
                <DocumentCustom
                  openDocument={() => GeneralUtils.functions.openDocument(stateObject, item.answerPath)}
                  stateObject={stateObject}
                  source={GeneralUtils.functions.getSource(item.answerPath, stateObject)}
                  fileName={GeneralUtils.functions.getFileName(item.answerPath)}
                />}
            </View>
          ))}
     

        {(Platform.OS === 'android' && this.state.showWebView) && <DownloadDocument
          stateObject={stateObject}
          source={GeneralUtils.functions.getSource(GeneralUtils.functions.contentPath, stateObject)}
        />}


        {Paggination.functions.editModalone && <SecondModal
          templates={<EditWorksheetDetail stateObject={stateObject} />}
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
export default ClassAssignmentWorkSheet;
