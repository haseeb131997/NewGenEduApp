
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
import CustomCheckBox from '../../../../components/CustomCheckBox';
import Entypo from 'react-native-vector-icons/Entypo';





var uploadClickProcess = false


class EditStudenFamilyDetail extends Component {
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
        await UploadUtils.functions.galleryImageUpload(stateObject, 'familyMember', 0)
      }
      else {
        await UploadUtils.functions.cameraImageUpload(stateObject, 'familyMember', 0)
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

    if (typeof familyEmptyrecord.memberImgPath == 'string' && familyEmptyrecord.memberImgPath.includes('CohesiveUpload')) {
      return { uri: `${httpUtils.FILE_URL()}${familyEmptyrecord.memberImgPath}?ivas=${ivas}&nekot=${nekot}&uhtuliak=${uhtuliak}` }
    }
    else if (typeof familyEmptyrecord.memberImgPath == 'string' && familyEmptyrecord.memberImgPath.includes('objectstorage')) {
      return { uri: familyEmptyrecord.memberImgPath }
    }
    else {
      return httpUtils.DEFAULT_IMAGE_FILE_PATH()
    }

  }


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
            familyEmptyrecord.memberName = text
            parentStateChange({ familyEmptyrecord: familyEmptyrecord })
          }}
          value={familyEmptyrecord.memberName}
          errorMessage={GeneralUtils.functions.getErrorMessage('field5', familyEmptyrecord.memberName, errorField, [], 'Name')}
        />

        <View style={[AppStyles.marginTop_2]}>
          <NewScreenDropDownPicker
            editable={editable}
            required={true}
            label={'Relationship'}
            stateObject={stateObject}
            items={SelectListUtils.functions.selectMaster.RelationshipMaster}
            value={SelectListUtils.functions.getSelectedValue(SelectListUtils.functions.selectMaster.RelationshipMaster, familyEmptyrecord.memberRelationship)}
            placeholder="Select Relationship"
            onChangeValue={(value) => {
              familyEmptyrecord.memberRelationship = value;
              parentStateChange({ familyEmptyrecord: familyEmptyrecord })

            }}
            dropdownName={'relationshipDropdown'}
            subHeadingRecordName="a relationship"
            onClear={() => {
              familyEmptyrecord.memberRelationship = '';
              parentStateChange({ familyEmptyrecord: familyEmptyrecord })
            }}
            errorMessage={GeneralUtils.functions.getErrorMessage('field6', familyEmptyrecord.memberRelationship, errorField, [], 'Relationship')}
          />
        </View>


        <InputText
          required={false}
          editable={!editable}
          label={'Occupation'}
          secureTextEntry={false}
          onChangeText={text => {
            familyEmptyrecord.memberOccupation = text
            parentStateChange({ familyEmptyrecord: familyEmptyrecord })
          }}
          value={familyEmptyrecord.memberOccupation}
        // errorMessage={GeneralUtils.functions.getErrorMessage('field1', familyEmptyrecord.memberName, errorField, [], 'Name')}
        />


        <InputText
          required={true}
          editable={!editable}
          label={'Email ID'}
          secureTextEntry={false}
          keyboardType='email-address'
          onChangeText={text => {
            familyEmptyrecord.memberEmailID = text
            parentStateChange({ familyEmptyrecord: familyEmptyrecord })
          }}
          value={familyEmptyrecord.memberEmailID}
          errorMessage={GeneralUtils.functions.getErrorMessage('email', familyEmptyrecord.memberEmailID, errorField, ['email'], 'Email ID')}
        />

        <InputText
          required={true}
          editable={!editable}
          label={'Contact Number'}
          secureTextEntry={false}
          keyboardType='phone-pad'
          maxLength={10}
          onChangeText={text => {
            familyEmptyrecord.memberContactNo = text
            parentStateChange({ familyEmptyrecord: familyEmptyrecord })
          }}
          value={familyEmptyrecord.memberContactNo}
          errorMessage={GeneralUtils.functions.getErrorMessage('mobile', familyEmptyrecord.memberContactNo, errorField, ['mobileNumber'], 'Contact Number')}
        />

        <View style={[]}>
          <NewScreenDropDownPicker
            tooltipReq={true}
            tooltipMsg={'Choose English/local language to recieve notifications in that particular language.'}
            tooltipStyle={styles.tooltipStyle}
            editable={editable}
            required={true}
            label={'Preferred notification language'}
            stateObject={stateObject}
            items={SelectListUtils.functions.selectMaster.LanguageMaster}
            value={SelectListUtils.functions.getSelectedValue(SelectListUtils.functions.selectMaster.LanguageMaster, familyEmptyrecord.language)}
            placeholder="Preferred notification language"
            onChangeValue={(value) => {
              familyEmptyrecord.language = value;
              parentStateChange({ familyEmptyrecord: familyEmptyrecord })

            }}
            onClear={() => {
              familyEmptyrecord.language = '';
              parentStateChange({ familyEmptyrecord: familyEmptyrecord })
            }}
          // errorMessage={GeneralUtils.functions.getErrorMessage('field1', familyEmptyrecord.language, errorField, [], 'Preferred notification language')}
          />
        </View>

        <View style={AppStyles.marginTop_2}>
          <CustomCheckBox
            label={'Parent notification and access to the app required'}
            onPress={() => {
              familyEmptyrecord.notificationRequired = !familyEmptyrecord.notificationRequired;
              parentStateChange({ familyEmptyrecord: familyEmptyrecord })
            }}
            checked={familyEmptyrecord.notificationRequired ? true : false}
            disabled={false}

          />
        </View>
        {/*   // start SHA002 */}
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
  tooltipStyle: {
    height: h('15%'), width: w('60%')
  }
})
export default EditStudenFamilyDetail;

