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
import { View, StyleSheet, Image, Platform, LayoutAnimation, UIManager } from 'react-native';
import { TextInput, Caption, Text, Title, Divider, Subheading } from 'react-native-paper';
import SelectListUtils from '../../../../utils/SelectListUtils'
import AppStyles from "../../../../AppStyles/AppStyles";
import { Avatar } from 'react-native-elements';
import { httpUtils } from '../../../../utils/HttpUtils';
import GeneralUtils from "../../../../utils/GeneralUtils"

import CustomButtons from '../../../../components/CustomButtons';
import SecondModal from '../../../../components/SecondModal';
import EditWorksheetDetail from '../EditWorksheetDetail';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Paggination from "../../../../utils/Paggination";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Exception from '../../../../utils/Exception'
import ImpNotes from '../../../../components/ImpNotes';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DocumentCustom from '../../../../components/DocumentCustom';
import DownloadDocument from '../../../../components/DownloadDocument';
// import FullViewDocument from '../../../../components/FullViewDocument';






import { UiColor } from "../../../../theme";

var familyView = false
var notesView = false

class ClassAssignmentWorkSheet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      contentPath: '',
      showWebView: false
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
    const { worksheetsEmptyrecord } = stateObject.state

    stateObject.state.errorField = []
    var mandatoryCheckError = false;

    if (worksheetsEmptyrecord.workSheetDescription == '' || worksheetsEmptyrecord.workSheetDescription == null) {
      mandatoryCheckError = true
      stateObject.state.errorField.push('field1')
      // return false;
    }

    if (worksheetsEmptyrecord.workSheetPath == '' || worksheetsEmptyrecord.workSheetPath == null) {
      mandatoryCheckError = true
      stateObject.state.errorField.push('field2')
      // return false;
    }

    // if (worksheetsEmptyrecord.workSheetPath  == '' || worksheetsEmptyrecord.workSheetPath == null) {
    //   Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-102', errorMessage: '', errorParam: ['Worksheet'] }])
    //   return false;
    // }


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
      Paggination.functions.addAndedit(stateObject, 'worksheets', worksheetsEmptyrecord)
    }
    // familyView = false
  }


  onClickNew() {
    Paggination.functions.editModalone = true
    const { stateObject } = this.props
    var emptyRecord = {
      workSheetPath: "",
      workSheetID: "",
      workSheetDescription: ""
    }

    Paggination.functions.onClickNew(stateObject, 'worksheetsEmptyrecord', emptyRecord)
    // familyView = false
  }

  onEdit(item, index) {
    Paggination.functions.editModalone = true
    const { stateObject } = this.props
    Paggination.functions.edit(stateObject, 'worksheetsEmptyrecord', item, index)
    // familyView = false
  }

  onDelete(index) {
    Paggination.functions.editModalone = true
    const { stateObject } = this.props
    Paggination.functions.delete(stateObject, 'worksheets', index)
    // familyView = false
  }








  render() {
    const { stateObject, currentIndex } = this.props
    const { dataModel, editable, worksheetsEmptyrecord } = stateObject.state
    const { parentStateChange } = stateObject


    return (
      <View>
        {(stateObject.state.currentOperation == 'Create') && <View style={[AppStyles.row_space_between]}>
          <Subheading style={AppStyles.bold_600}>{'Worksheets'}</Subheading>
          {dataModel.worksheets.length != 0 && <CustomButtons
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
        {((stateObject.state.currentOperation == 'Create' || stateObject.state.currentOperation == 'Modification') && dataModel.worksheets.length == 0) && <View style={AppStyles.marginTop_2}>
          <CustomButtons
            onPress={() => this.onClickNew()}
            title={`Add Worksheets`}
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

        {(stateObject.state.currentOperation == 'Modification' && dataModel.worksheets.length != 0) && <View style={[AppStyles.flex_End, AppStyles.marginTop_1]}>
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


        {(dataModel.worksheets == 0 && (stateObject.state.currentOperation == 'Create' || stateObject.state.currentOperation == 'Modification')) && <ImpNotes
          isArray={false}
          message={`Click "Add Worksheets" button to enter more worksheets for an assignment.`}
        />}






        <View style={[AppStyles.marginTop_2]}>
          {dataModel.worksheets.map((item, index) => (
            <View key={index.toString()} style={[AppStyles.marginTop_3]}>
              <View style={[AppStyles.flexDirectionRow, AppStyles.alignItems,]}>
                <View style={[AppStyles.flex_one]}>
                  <Subheading style={[AppStyles.bold]}>{'Worksheet '}{index + 1}.</Subheading>
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
              <Subheading style={[AppStyles.bold_400]}>{item.workSheetDescription} </Subheading>

              {(item.workSheetPath != '' && (GeneralUtils.functions.getFileType(item.workSheetPath) == 'pdf')) &&
                <DocumentCustom
                  openDocument={() =>  GeneralUtils.functions.openDocument(stateObject,item.workSheetPath)}
                  stateObject={stateObject}
                  source={GeneralUtils.functions.getSource(item.workSheetPath, stateObject)}
                  fileName={GeneralUtils.functions.getFileName(item.workSheetPath)}
                />}


            </View>
          ))}
        </View>

        {(Platform.OS === 'android' && this.state.showWebView) && <DownloadDocument
          stateObject={stateObject}
          source={GeneralUtils.functions.getSource(GeneralUtils.functions.contentPath, stateObject)}
        />}


        {Paggination.functions.editModalone && <SecondModal
          templates={<EditWorksheetDetail stateObject={stateObject} />}
          stateObject={stateObject}
          title={Paggination.functions.selectedIndex == null ? 'Add' : 'Edit'}
          subTitle={'Worksheet'}
          onSubmit={() => this.onSubmit()}
        />}

               {/* <FullViewDocument
                    stateObject={stateObject}
                    source={GeneralUtils.functions.getSource(GeneralUtils.functions.contentPath, this)}
                    fileName={GeneralUtils.functions.getFileName(GeneralUtils.functions.contentPath)}
                  /> */}

      </View>

    );
  }
}

const styles = StyleSheet.create({
})
export default ClassAssignmentWorkSheet;
