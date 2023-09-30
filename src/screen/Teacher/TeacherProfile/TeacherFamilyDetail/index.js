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
import EditTeacherFamilyDetail from '../EditTeacherFamilyDetail';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Paggination from "../../../../utils/Paggination";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Exception from '../../../../utils/Exception'
import ImpNotes from '../../../../components/ImpNotes';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { UiColor } from "../../../../theme";


var familyView = false
var notesView = false


class TeacherFamilyDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      selectedFamilyIndex: 0
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
    if (this.state.selectedFamilyIndex == index) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      this.setState({ selectedFamilyIndex: null });
    }
    else {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      this.setState({ selectedFamilyIndex: index });
    }

  }


  Mandatory = function () {
    const {
      stateObject,
    } = this.props
    const { familyEmptyrecord } = stateObject.state

    stateObject.state.errorField = []
    var mandatoryCheckError = false;

    if (familyEmptyrecord.cp_Name == '' || familyEmptyrecord.cp_Name == null) {
      // Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-001', errorMessage: '', errorParam: ['Year'] }])
      mandatoryCheckError = true
      stateObject.state.errorField.push('field5')
      // return false;
    }
    if (familyEmptyrecord.cp_relationship == '' || familyEmptyrecord.cp_relationship == null) {
      // Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-001', errorMessage: '', errorParam: ['Start Date'] }])
      mandatoryCheckError = true
      stateObject.state.errorField.push('field6')
      // return false;
    }
    if (familyEmptyrecord.cp_contactNo == '' || familyEmptyrecord.cp_contactNo == null) {
      // Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-001', errorMessage: '', errorParam: ['Start Date'] }])
      mandatoryCheckError = true
      stateObject.state.errorField.push('field7')
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
    const { familyEmptyrecord } = stateObject.state

    if (this.Mandatory())
      Paggination.functions.addAndeditLevel1(stateObject, 'emergency', 'contactPerson', familyEmptyrecord)
  }



  onClickNew() {
    Paggination.functions.editModalone = true
    const { stateObject } = this.props
    var familyEmpty = {
      idx: '',
      cp_Name: "",
      cp_relationship: "",
      cp_occupation: "",
      cp_emailID: "",
      cp_contactNo: "",
      cp_imgPath: ""
    }

    Paggination.functions.onClickNew(stateObject, 'familyEmptyrecord', familyEmpty)
    // familyView = false
  }

  onEdit(item, index) {
    Paggination.functions.editModalone = true
    const { stateObject } = this.props
    Paggination.functions.edit(stateObject, 'familyEmptyrecord', item, index)
    // familyView = false
  }

  onDelete(index) {
    // Paggination.functions.editModalone = true
    const { stateObject } = this.props
    Paggination.functions.deleteLevel1(stateObject, 'emergency', 'contactPerson', index)
    // familyView = false
  }






  render() {
    const { stateObject, currentIndex } = this.props
    const { dataModel, editable, familyEmptyrecord } = stateObject.state
    const { parentStateChange } = stateObject

    var familyEmpty = {
      idx: '',
      cp_Name: "",
      cp_relationship: "",
      cp_occupation: "",
      cp_emailID: "",
      cp_contactNo: "",
      cp_imgPath: ""
    }
    return (
      <View>

        {(stateObject.state.currentOperation == 'Create') && <View style={[AppStyles.row_space_between]}>
          <Subheading style={AppStyles.bold_600}>{stateObject.state.createStepsHeading[1]}</Subheading>
          {dataModel.emergency.contactPerson.length != 0 && <CustomButtons
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

        {dataModel.emergency.contactPerson.length == 0 && <View style={AppStyles.marginTop_2}>
          <CustomButtons
            onPress={() => this.onClickNew()}
            title={`Add family member`}
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

        {(stateObject.state.currentOperation == 'Modification' && dataModel.emergency.contactPerson.length != 0) && <View style={[AppStyles.flex_End, AppStyles.marginTop_1]}>
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


        {(dataModel.emergency.contactPerson == 0 && (stateObject.state.currentOperation == 'Create' || stateObject.state.currentOperation == 'Modification')) && <ImpNotes
          isArray={false}
          message={`Click "Add family member" button to add details about the family members.`}
        />}






        <View style={[AppStyles.marginTop_2]}>
          {dataModel.emergency.contactPerson.map((item, index) => (
            <View key={index.toString()} style={[AppStyles.marginTop_3]}>
              <TouchableOpacity onPress={() => this.changeLayout(index)} style={[AppStyles.flexDirectionRow, AppStyles.alignItems,]}>
                <MaterialIcons name={this.state.selectedFamilyIndex != index ? "navigate-next" : "keyboard-arrow-down"} size={AppStyles.iconSize.height} color={UiColor.LIGHT_TEXT_COLOR} />
                <View style={[AppStyles.marginLeft_1]}>
                  <Avatar
                    size={AppStyles.familyProfileAvatarSize.height}
                    rounded
                    source={GeneralUtils.functions.getImagePath(stateObject, item.cp_imgPath)}
                  />
                </View>
                <View style={[AppStyles.marginLeft_1, AppStyles.flex_one]}>
                  <Subheading style={[AppStyles.bold_400]}>{item.cp_Name} </Subheading>
                  <Text style={[AppStyles.textColor]}>{SelectListUtils.functions.getSelectedValue(SelectListUtils.functions.selectMaster.RelationshipMaster, item.cp_relationship)}</Text>
                  {/* <View style={AppStyles.flexDirectionRow}>

                 <Caption style={AppStyles.primaryStatusStyle}>Notification in {SelectListUtils.functions.getSelectedValue(SelectListUtils.functions.selectMaster.LanguageMaster,item.language)}</Caption>
                 
                 </View> */}
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

              <View style={[{ height: this.state.selectedFamilyIndex == index ? null : 0, overflow: 'hidden', }]}>

                <View style={AppStyles.marginLeft_4}>


                  <View style={AppStyles.marginTop_1}>
                    <Caption style={[AppStyles.textColor,]}>Occupation</Caption>
                    <Text>{item.cp_occupation}</Text>
                  </View>

                  <View style={AppStyles.marginTop_1}>
                    <Caption style={[AppStyles.textColor,]}>Email address</Caption>
                    <Text>{item.cp_emailID}</Text>
                  </View>

                  <View style={AppStyles.marginTop_1}>
                    <Caption style={[AppStyles.textColor,]}>Contact number</Caption>
                    <Text>{item.cp_contactNo}</Text>
                  </View>

                </View>

                {/* <View style={[AppStyles.flexDirectionRow, AppStyles.marginTop_3, AppStyles.marginLeft_4]}>
                  <Text style={AppStyles.listHeading}>Occupation</Text>
                  <Text style={AppStyles.listValue}>{item.cp_occupation}</Text>
                </View>
                <View style={[AppStyles.flexDirectionRow, AppStyles.marginTop_1, AppStyles.marginLeft_4]}>
                  <Text style={AppStyles.listHeading}>Email address</Text>
                  <Text style={AppStyles.listValue}>{item.cp_emailID}</Text>
                </View>
                <View style={[AppStyles.flexDirectionRow, AppStyles.marginTop_1, AppStyles.marginLeft_4]}>
                  <Text style={AppStyles.listHeading}>Contact number</Text>
                  <Text style={AppStyles.listValue}>{item.cp_contactNo}</Text>
                </View> */}
              </View>
              {/* <Divider style={AppStyles.marginVertical_2} /> */}
            </View>
          ))}
        </View>
        {Paggination.functions.editModalone && <SecondModal
          templates={<EditTeacherFamilyDetail stateObject={stateObject} />}
          stateObject={stateObject}
          title={Paggination.functions.selectedIndex == null ? 'Add' : 'Edit'}
          subTitle={'Family Member'}
          onSubmit={() => this.onSubmit()}
        />}
      </View>

    );
  }
}

const styles = StyleSheet.create({
})
export default TeacherFamilyDetail;
