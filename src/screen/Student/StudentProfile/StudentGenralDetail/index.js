
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
import { UiColor } from "../../../../theme";
import CustomDatePicker from "../../../../components/CustomDatePicker"
import NewScreenDropDownPicker from '../../../../components/NewScreenDropDownPicker';
import InputTextArea from '../../../../components/InputTextArea';
import GeneralUtils from "../../../../utils/GeneralUtils";
import InputText from '../../../../components/InputText';
import SelectBox from '../../../../components/SelectBox';
import { httpUtils } from '../../../../utils/HttpUtils';
import UploadUtils from '../../../../utils/UploadUtils'
import Entypo from 'react-native-vector-icons/Entypo';





var uploadClickProcess = false

class StudentGenralDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    }
    this.uploadPhoto = this.uploadPhoto.bind(this)
    this.childStateChange = this.childStateChange.bind(this)
  }



  uploadPhoto = async (type) => {
    const {
      stateObject
    } = this.props

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
        await UploadUtils.functions.galleryImageUpload(stateObject, 'studentPhoto', 0)
      }
      else {
        await UploadUtils.functions.cameraImageUpload(stateObject, 'studentPhoto', 0)
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
    const {
      stateObject
    } = this.props
    const { dataModel,
      nekot,
      ivas,
      uhtuliak } = stateObject.state

    if (typeof dataModel.profileImgPath == 'string' && dataModel.profileImgPath.includes('CohesiveUpload')) {
      return { uri: `${httpUtils.FILE_URL()}${dataModel.profileImgPath}?ivas=${ivas}&nekot=${nekot}&uhtuliak=${uhtuliak}` }
    }
    else if (typeof dataModel.profileImgPath == 'string' && dataModel.profileImgPath.includes('objectstorage')) {
      return { uri: dataModel.profileImgPath }
    }
    else {
      return httpUtils.DEFAULT_IMAGE_FILE_PATH()
    }

  }




  render() {
    const {
      stateObject
    } = this.props
    const { dataModel, editable, primaryKeyEditable, summaryDataModel, errorField } = stateObject.state
    const { parentStateChange } = stateObject

    return (
      <View style={AppStyles.marginTop_2}>

        {/* 
        <TouchableOpacity
          style={AppStyles.alignSelf}
          disabled={editable}
          onPress={() => this.setState({ visible: true })}>
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
          tooltipReq={true}
          tooltipMsg={'By default, system will provide an auto-generated Student ID that can be used. If the institute wants to assign their own student ID, then that ID can be entered replacing the auto-generated ID'}
          tooltipStyle={styles.tooltipStyle}
          required={true}
          editable={!primaryKeyEditable}
          label={'ID'}
          secureTextEntry={false}
          onChangeText={text => {
            dataModel.studentID = text
            parentStateChange({ dataModel: dataModel })
          }}
          value={dataModel.studentID}
          errorMessage={GeneralUtils.functions.getErrorMessage('field1', dataModel.studentID, errorField, [], 'ID')}
        />

        <InputText

          required={true}
          editable={!editable}
          label={'Name'}
          secureTextEntry={false}
          onChangeText={text => {
            dataModel.studentName = text
            parentStateChange({ dataModel: dataModel })
          }}
          value={dataModel.studentName}
          errorMessage={GeneralUtils.functions.getErrorMessage('field2', dataModel.studentName, errorField, [], 'Name')}
        />

        <View style={[AppStyles.marginTop_2]}>
          <NewScreenDropDownPicker
            editable={editable}
            required={true}
            label={'Gender'}
            stateObject={stateObject}
            items={SelectListUtils.functions.selectMaster.GenderMaster}
            value={SelectListUtils.functions.getSelectedValue(SelectListUtils.functions.selectMaster.GenderMaster, dataModel.general.gender)}
            placeholder="Select Gender"
            onChangeValue={(value) => {
              dataModel.general.gender = value;
              parentStateChange({ dataModel: dataModel })

            }}
            dropdownName={'genderDropdown'}
            subHeadingRecordName="a gender"
            onClear={() => {
              dataModel.general.gender = '';
              parentStateChange({ dataModel: dataModel })
            }}
            errorMessage={GeneralUtils.functions.getErrorMessage('field3', dataModel.general.gender, errorField, [], 'Gender')}
          />
        </View>


        <InputText
          required={false}
          editable={!editable}
          label={'Email ID'}
          secureTextEntry={false}
          keyboardType='email-address'
          onChangeText={text => {
            dataModel.email = text
            parentStateChange({ dataModel: dataModel })
          }}
          value={dataModel.email}
          errorMessage={GeneralUtils.functions.getErrorMessage('email', dataModel.email, errorField, ['email'], 'Email ID')}
        />

        <InputText
          required={false}
          editable={!editable}
          label={'Mobile No'}
          secureTextEntry={false}
          keyboardType='phone-pad'
          maxLength={10}
          onChangeText={text => {
            dataModel.mobNo = text
            parentStateChange({ dataModel: dataModel })
          }}
          value={dataModel.mobNo}
          errorMessage={GeneralUtils.functions.getErrorMessage('mobile', dataModel.mobNo, errorField, ['mobileNumber'], 'Mobile No')}
        />
        <View style={AppStyles.marginTop_1}>
          <CustomDatePicker
            // tooltipReq={false}
            // tooltipMsg={'Specify the starting date of the academic year to be created'}
            // tooltipStyle={styles.tooltipStyle}
            required={true}
            editable={editable}
            label={'DOB'}
            placeholder={'Pick DOB'}
            secureTextEntry={false}
            value={dataModel.general.dob}
            format="DD-MM-YYYY"
            mode="date"
            onDateChange={value => {
              dataModel.general.dob = value;
              parentStateChange({ dataModel: dataModel })
            }}
            errorMessage={GeneralUtils.functions.getErrorMessage('field4', dataModel.general.dob, errorField, [], 'DOB')}
          />
        </View>
        {(stateObject.state.currentOperation == 'Create') && <InputText
          required={false}
          editable={!editable}
          label={'Note'}
          secureTextEntry={false}
          onChangeText={text => {
            dataModel.note = text
            parentStateChange({ dataModel: dataModel })
          }}
          value={dataModel.note}
          multiline={true}
        // errorMessage={GeneralUtils.functions.getErrorMessage('field1', dataModel.note, errorField, [], 'Note')}
        />}


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
    height: h('20%'), width: w('70%')
  }
})
export default StudentGenralDetail;

