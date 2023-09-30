
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
import { View, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-paper';
import { w, h } from "../../../../utils/Dimensions";
import AppStyles from "../../../../AppStyles/AppStyles";
import SelectListUtils from '../../../../utils/SelectListUtils'
import NewScreenDropDownPicker from '../../../../components/NewScreenDropDownPicker';
import GeneralUtils from "../../../../utils/GeneralUtils";
import InputText from '../../../../components/InputText';
import SelectBox from '../../../../components/SelectBox';
import { httpUtils } from '../../../../utils/HttpUtils';
import UploadUtils from '../../../../utils/UploadUtils'
import Entypo from 'react-native-vector-icons/Entypo';






var uploadClickProcess = false


class EditTeacherFamilyDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    }
    this.uploadPhoto = this.uploadPhoto.bind(this)
    this.childStateChange = this.childStateChange.bind(this)

  }




  uploadPhoto = async (type) => {
    const { stateObject, currentIndex } = this.props
    // var currentInd = 0
    // if (currentIndex >= 1) {
    //   currentInd = currentIndex - 1
    // }
    if (uploadClickProcess == false) {
      uploadClickProcess = true
    }
    else {
      return true
    }
    try {
      this.setState({
        visible: false
      })
      if (type == 'gallery') {
        await UploadUtils.functions.galleryImageUpload(stateObject, 'familyprofileImg', 0)
      }
      else {
        await UploadUtils.functions.cameraImageUpload(stateObject, 'familyprofileImg', 0)
      }

      uploadClickProcess = false
    }
    catch (error) {
      uploadClickProcess = false
      throw error
    }
  }




  childStateChange(object) {
    this.setState(
      object
    );

  }


  getImagePath() {
    const { stateObject, currentIndex } = this.props

    const { dataModel, editable, nekot,
      ivas,
      uhtuliak, familyEmptyrecord } = stateObject.state

    if (typeof familyEmptyrecord.cp_imgPath == 'string' && familyEmptyrecord.cp_imgPath.includes('CohesiveUpload')) {
      return { uri: `${httpUtils.FILE_URL()}${familyEmptyrecord.cp_imgPath}?ivas=${ivas}&nekot=${nekot}&uhtuliak=${uhtuliak}` }
    }
    else if (typeof familyEmptyrecord.cp_imgPath == 'string' && familyEmptyrecord.cp_imgPath.includes('objectstorage')) {
      return { uri: familyEmptyrecord.cp_imgPath }
    }
    else {
      return httpUtils.DEFAULT_IMAGE_FILE_PATH()
    }

  }


  // idx: '',
  // cp_Name: "",
  // cp_relationship: "",
  // cp_occupation: "",
  // cp_emailID: "",
  // cp_contactNo: "",
  // cp_imgPath: ""


  render() {
    const {
      stateObject
    } = this.props
    const { familyEmptyrecord, editable, primaryKeyEditable, summaryDataModel, errorField } = stateObject.state
    const { parentStateChange } = stateObject

    return (
      <View style={AppStyles.marginTop_2}>

        {/* <TouchableOpacity
          style={AppStyles.alignSelf}
          disabled={editable} onPress={() => this.setState({ visible: true })}>
           <Avatar.Image size={AppStyles.profileAvatarSize.height} source={this.getImagePath()} />
   
        </TouchableOpacity> */}

        <TouchableOpacity
          onPress={() => this.setState({ visible: true })}
          style={[AppStyles.marginTop_1, AppStyles.editProfileImgContainer, AppStyles.alignSelf]}>
          <Avatar.Image size={AppStyles.profileAvatarSize.height} source={this.getImagePath()} />
          <View style={AppStyles.editIconContainer}>
            <Entypo onPress={() => this.setState({ visible: true })}
              name="edit" size={AppStyles.iconSize.height} color={AppStyles.inactiveMoreIcon.tintColor} />
          </View>
        </TouchableOpacity>


        <InputText
          required={true}
          editable={!editable}
          label={'Name'}
          secureTextEntry={false}
          onChangeText={text => {
            familyEmptyrecord.cp_Name = text
            parentStateChange({ familyEmptyrecord: familyEmptyrecord })
          }}
          value={familyEmptyrecord.cp_Name}
          errorMessage={GeneralUtils.functions.getErrorMessage('field5', familyEmptyrecord.cp_Name, errorField, [], 'Name')}
        />

        <View style={[AppStyles.marginTop_2]}>
          <NewScreenDropDownPicker
            editable={editable}
            required={true}
            label={'Relationship'}
            stateObject={stateObject}
            items={SelectListUtils.functions.selectMaster.RelationshipMaster}
            value={SelectListUtils.functions.getSelectedValue(SelectListUtils.functions.selectMaster.RelationshipMaster, familyEmptyrecord.cp_relationship)}
            placeholder="Select Relationship"
            onChangeValue={(value) => {
              familyEmptyrecord.cp_relationship = value;
              parentStateChange({ familyEmptyrecord: familyEmptyrecord })

            }}
            dropdownName={'relationshipDropdown'}
            subHeadingRecordName="a relationship"
            onClear={() => {
              familyEmptyrecord.cp_relationship = '';
              parentStateChange({ familyEmptyrecord: familyEmptyrecord })
            }}
            errorMessage={GeneralUtils.functions.getErrorMessage('field6', familyEmptyrecord.cp_relationship, errorField, [], 'Relationship')}
          />
        </View>


        <InputText
          required={false}
          editable={!editable}
          label={'Occupation'}
          secureTextEntry={false}
          onChangeText={text => {
            familyEmptyrecord.cp_occupation = text
            parentStateChange({ familyEmptyrecord: familyEmptyrecord })
          }}
          value={familyEmptyrecord.cp_occupation}
        // errorMessage={GeneralUtils.functions.getErrorMessage('field1', familyEmptyrecord.memberName, errorField, [], 'Name')}
        />


        <InputText
          required={false}
          editable={!editable}
          label={'Email ID'}
          secureTextEntry={false}
          keyboardType='email-address'
          onChangeText={text => {
            familyEmptyrecord.cp_emailID = text
            parentStateChange({ familyEmptyrecord: familyEmptyrecord })
          }}
          value={familyEmptyrecord.cp_emailID}
          errorMessage={GeneralUtils.functions.getErrorMessage('email', familyEmptyrecord.cp_emailID, errorField, ['email'], 'Email ID')}
        />

        <InputText
          required={true}
          editable={!editable}
          label={'Contact Number'}
          secureTextEntry={false}
          keyboardType='phone-pad'
          maxLength={10}
          onChangeText={text => {
            familyEmptyrecord.cp_contactNo = text
            parentStateChange({ familyEmptyrecord: familyEmptyrecord })
          }}
          value={familyEmptyrecord.cp_contactNo}
          errorMessage={GeneralUtils.functions.getErrorMessage('field7', familyEmptyrecord.cp_contactNo, errorField, ['mobileNumber'], 'Contact Number')}
        />

        <SelectBox
          stateObject={this}
          onChange={(type) => this.uploadPhoto(type)}
          visible={this.state.visible}
        />
        {/*   // end SHA002 */}


      </View>
    );
  }
}


const styles = StyleSheet.create({

})
export default EditTeacherFamilyDetail;

