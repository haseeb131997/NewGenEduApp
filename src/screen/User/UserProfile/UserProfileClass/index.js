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
import EditClass from '../EditClass';
import Paggination from "../../../../utils/Paggination";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Exception from '../../../../utils/Exception'
import ImpNotes from '../../../../components/ImpNotes';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { UiColor } from "../../../../theme";
import CustomCheckBox from '../../../../components/CustomCheckBox';
import CustomLabel from '../../../../components/CustomLabel';




class UserProfileClass extends Component {
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
    const { classEmptyrecord } = stateObject.state

    stateObject.state.errorField = []
    var mandatoryCheckError = false;

    if (classEmptyrecord.roleID == '' || classEmptyrecord.roleID == null) {
      mandatoryCheckError = true
      stateObject.state.errorField.push('field1')
      // return false;
    }
    if (classEmptyrecord.class == '' || classEmptyrecord.class == null) {
      mandatoryCheckError = true
      stateObject.state.errorField.push('field2')
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
    const { classEmptyrecord } = stateObject.state

    if (this.Mandatory()) {
      Paggination.functions.addAndedit(stateObject, 'studentClassRoleMapping', classEmptyrecord)
    }

  }


  onClickNew() {
    Paggination.functions.editModalone = true
    const { stateObject } = this.props
    var emptyRecord = {
      idx: "",
      roleID: "",
      class: "",
      instituteName: stateObject.state.instituteName,
      instituteID: stateObject.state.instituteID
    }

    Paggination.functions.onClickNew(stateObject, 'classEmptyrecord', emptyRecord)

  }

  onEdit(item, index) {
    Paggination.functions.editModalone = true
    const { stateObject } = this.props
    Paggination.functions.edit(stateObject, 'classEmptyrecord', item, index)

  }

  onDelete(index) {
    Paggination.functions.editModalone = true
    const { stateObject } = this.props
    Paggination.functions.delete(stateObject, 'studentClassRoleMapping', index)

  }








  render() {
    const { stateObject, currentIndex } = this.props
    const { dataModel, editable, classEmptyrecord } = stateObject.state
    const { parentStateChange } = stateObject

    // dataModel.studentClassRoleMapping =[{
    //   idx: "",
    //   roleID: "Admin",
    //   class: "11+C001",
    //   instituteName: "Amry School",
    //   instituteID: "I90909090"

    // }]

    return (
      <View>

        {(stateObject.state.currentOperation == 'Create') && <View style={[AppStyles.row_space_between]}>
          <Subheading style={AppStyles.bold_600}>{stateObject.state.createStepsHeading[1]}</Subheading>
          {dataModel.studentClassRoleMapping.length != 0 && <CustomButtons
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

        {((stateObject.state.currentOperation == 'Create' || stateObject.state.currentOperation == 'Modification') && dataModel.studentClassRoleMapping.length == 0) && <View style={AppStyles.marginTop_2}>
          <CustomButtons
            onPress={() => this.onClickNew()}
            title={`Add class role`}
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

        {(stateObject.state.currentOperation == 'Modification' && dataModel.studentClassRoleMapping.length != 0) && <View style={[AppStyles.flex_End, AppStyles.marginTop_1]}>
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


        {(dataModel.studentClassRoleMapping == 0 && (stateObject.state.currentOperation == 'Create' || stateObject.state.currentOperation == 'Modification')) && <ImpNotes
          isArray={false}
          message={`Click 'Add class role' button to add  for this profile.`}
        />}






        {dataModel.studentClassRoleMapping.length != 0 ? <View >
          {dataModel.studentClassRoleMapping.map((item, index) => (
            <View key={index.toString()} style={[AppStyles.marginTop_3]}>

              <View style={[AppStyles.row_space_between]}>
                <View style={AppStyles.flex_one}>
                  <Caption>{'Role ID'}</Caption>
                  <Subheading style={[AppStyles.payTextStyle,]}>{item.roleID}</Subheading>
                  
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

              <View style={AppStyles.marginTop_1}>
                <Caption style={[AppStyles.textColor]}>Class</Caption>
                <Text>{item.class}</Text>
              </View>

              <View style={AppStyles.marginTop_1}>
                <Caption style={[AppStyles.textColor]}>Institute name</Caption>
                <Text>{item.instituteName}</Text>
              </View>

              <View style={AppStyles.marginTop_1}>
                <Caption style={[AppStyles.textColor]}>Institute ID</Caption>
                <Text>{item.instituteID}</Text>
              </View>

              {(dataModel.studentClassRoleMapping.length - 1) != index && <Divider style={[AppStyles.marginVertical_2]} />}
            </View>
          ))}
        </View> : (stateObject.state.currentOperation != 'Create' && stateObject.state.currentOperation != 'Modification') ? <View style={[AppStyles.alignItems, AppStyles.marginTop_3]}><Caption style={AppStyles.textAlign_center}>There is no class record.</Caption></View> : null}


        {Paggination.functions.editModalone && <SecondModal
          templates={<EditClass stateObject={stateObject} />}
          stateObject={stateObject}
          title={Paggination.functions.selectedIndex == null ? 'Add' : 'Edit'}
          subTitle={'Class'}
          onSubmit={() => this.onSubmit()}
        />}
      </View>

    );
  }
}


export default UserProfileClass;
