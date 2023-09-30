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
import EditNotesDetail from '../EditNotesDetail';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Paggination from "../../../../utils/Paggination";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Exception from '../../../../utils/Exception'
import ImpNotes from '../../../../components/ImpNotes';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DocumentCustom from '../../../../components/DocumentCustom';



import { UiColor } from "../../../../theme";



class TeacherNotesDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      selectedIndex: 0
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
    if (this.state.selectedIndex == index) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      this.setState({ selectedIndex: null });
    }
    else {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      this.setState({ selectedIndex: index });
    }

  }



  Mandatory = function () {
    const {
      stateObject,
    } = this.props
    const { notesDetailsEmptyrecord } = stateObject.state

    stateObject.state.errorField = []
    var mandatoryCheckError = false;

    if (notesDetailsEmptyrecord.lesson == '' || notesDetailsEmptyrecord.lesson == null) {
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
    const { notesDetailsEmptyrecord } = stateObject.state

    if (this.Mandatory()) {
      Paggination.functions.addAndedit(stateObject, 'notesDetails', notesDetailsEmptyrecord)
    }
    // familyView = false
  }


  onClickNew() {
    Paggination.functions.editModalone = true
    const { stateObject } = this.props
    var emptyRecord = {
      lesson: "",
      heading: "",
      subHeading: "",
      typeNotes: "",
      contentPath: ""
    }

    Paggination.functions.onClickNew(stateObject, 'notesDetailsEmptyrecord', emptyRecord)
    // familyView = false
  }

  onEdit(item, index) {
    Paggination.functions.editModalone = true
    const { stateObject } = this.props
    Paggination.functions.edit(stateObject, 'notesDetailsEmptyrecord', item, index)
    // familyView = false
  }

  onDelete(index) {
    Paggination.functions.editModalone = true
    const { stateObject } = this.props
    Paggination.functions.delete(stateObject, 'notesDetails', index)
    // familyView = false
  }








  render() {
    const { stateObject, currentIndex } = this.props
    const { dataModel, editable, notesDetailsEmptyrecord } = stateObject.state
    const { parentStateChange } = stateObject


    return (
      <View>

        {(stateObject.state.currentOperation == 'Create') && <View style={[AppStyles.row_space_between]}>
          <Subheading style={AppStyles.bold_600}>{stateObject.state.createStepsHeading[1]}</Subheading>
          {dataModel.notesDetails.length != 0 && <CustomButtons
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
        {((stateObject.state.currentOperation == 'Create' || stateObject.state.currentOperation == 'Modification') && dataModel.notesDetails.length == 0) && <View style={AppStyles.marginTop_2}>
          <CustomButtons
            onPress={() => this.onClickNew()}
            title={`Add notes`}
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

        {(stateObject.state.currentOperation == 'Modification' && dataModel.notesDetails.length != 0) && <View style={[AppStyles.flex_End, AppStyles.marginTop_1]}>
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


        {(dataModel.notesDetails == 0 && (stateObject.state.currentOperation == 'Create' || stateObject.state.currentOperation == 'Modification')) && <ImpNotes
          isArray={false}
          message={`Click add button to add mutliple notes for this date.`}
        />}






        <View style={[AppStyles.marginTop_2]}>
          {dataModel.notesDetails.map((item, index) => (
            <View key={index.toString()} style={[AppStyles.marginTop_3]}>
              <TouchableOpacity onPress={() => this.changeLayout(index)} style={[AppStyles.flexDirectionRow, AppStyles.alignItems,]}>
                <MaterialIcons name={this.state.selectedIndex != index ? "navigate-next" : "keyboard-arrow-down"} size={AppStyles.iconSize.height} color={UiColor.LIGHT_TEXT_COLOR} />
                <View style={[AppStyles.marginLeft_1]}>
                </View>
                <View style={[AppStyles.flex_one]}>
                  <Text style={[AppStyles.bold_400,AppStyles.textColor]}>Unit/Lesson: <Text style={[AppStyles.bold_400]}>{item.lesson} </Text></Text>
                  <Text style={[AppStyles.bold_400,AppStyles.textColor]}>Heading: <Text style={[AppStyles.bold_400]}>{item.heading} </Text></Text>
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



              <View style={[{ height: this.state.selectedIndex == index ? null : 0, overflow: 'hidden', }]}>
                <View style={AppStyles.marginLeft_4}>
                  {/* <View style={AppStyles.marginTop_1}>
                    <Caption style={[AppStyles.textColor, AppStyles.marginTop_1]}>Heading</Caption>
                    <Text>{item.heading}</Text>
                  </View> */}

                  <View style={AppStyles.marginTop_1}>
                    <Caption style={[AppStyles.textColor, AppStyles.marginTop_1]}>Sub Heading</Caption>
                    <Text>{item.subHeading}</Text>
                  </View>

                  <View style={AppStyles.marginTop_1}>
                    <Caption style={[AppStyles.textColor, AppStyles.marginTop_1]}>Notes</Caption>
                    <Text>{item.typeNotes}</Text>
                  </View>


                  <View style={AppStyles.marginTop_1}>
                    <Caption style={[AppStyles.textColor, AppStyles.marginTop_1]}>Upload</Caption>
                    {/* <Text>{item.typeNotes}</Text> */}

                    {(item.contentPath != '' && (GeneralUtils.functions.getFileType(item.contentPath) == 'pdf')) &&
                      <DocumentCustom
                        openDocument={() => GeneralUtils.functions.openDocument(stateObject, item.contentPath)}
                        stateObject={stateObject}
                        source={GeneralUtils.functions.getSource(item.contentPath, stateObject)}
                        fileName={GeneralUtils.functions.getFileName(item.contentPath)}
                      />}

                  </View>


                </View>
              </View>
              {/* <Divider style={AppStyles.marginVertical_2} /> */}
            </View>
          ))}
        </View>
        {Paggination.functions.editModalone && <SecondModal
          templates={<EditNotesDetail stateObject={stateObject} />}
          stateObject={stateObject}
          title={Paggination.functions.selectedIndex == null ? 'Add' : 'Edit'}
          subTitle={'Notes'}
          onSubmit={() => this.onSubmit()}
        />}
      </View>

    );
  }
}

const styles = StyleSheet.create({
})
export default TeacherNotesDetails;
