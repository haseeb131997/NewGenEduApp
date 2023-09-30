
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
import { View, StyleSheet, Platform } from 'react-native';
import { TextInput } from 'react-native-paper';
import { w, h } from "../../../../utils/Dimensions";
import AppStyles from "../../../../AppStyles/AppStyles";
import SelectListUtils from '../../../../utils/SelectListUtils'
import { UiColor } from "../../../../theme";
import InputText from '../../../../components/InputText';
import GeneralUtils from "../../../../utils/GeneralUtils";
import SuggestionList from '../../../../components/SuggestionList';
import SuggestionTextInput from '../../../../components/SuggestionTextInput';
import CustomDatePicker from "../../../../components/CustomDatePicker"
import NewScreenDropDownPicker from '../../../../components/NewScreenDropDownPicker';
import SearchUtils from "../../../../utils/SearchUtils";




var searchName = ''


class UserProfileGeneral extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    }
  }



  render() {
    const {
      stateObject
    } = this.props
    const { dataModel, editable, primaryKeyEditable, summaryDataModel, errorField } = stateObject.state
    const { parentStateChange } = stateObject

    return (
      <View>
        <InputText
          tooltipReq={true}
          tooltipMsg={'By default, system will provide an auto-generated User ID that can be used.'}
          tooltipStyle={styles.tooltipStyle}
          required={true}
          editable={!primaryKeyEditable}
          label={'User ID'}
          secureTextEntry={false}
          onChangeText={text => {
            dataModel.userID = text
            parentStateChange({ dataModel: dataModel })
          }}
          value={dataModel.userID}
          errorMessage={GeneralUtils.functions.getErrorMessage('field1', dataModel.userID, errorField, [], 'User ID')}
        />

        <View style={AppStyles.marginTop_1}>
          <InputText
            required={true}
            editable={!editable}
            label={'User Name'}
            secureTextEntry={false}
            onChangeText={text => {
              dataModel.userName = text
              parentStateChange({ dataModel: dataModel })
            }}
            value={dataModel.userName}
            errorMessage={GeneralUtils.functions.getErrorMessage('field2', dataModel.userName, errorField, [], 'User Name')}
          />
        </View>



        <View style={AppStyles.marginTop_1}>
          <InputText

            required={true}
            editable={!editable}//Rajfix001
            label={'Password'}
            secureTextEntry={true}
            onChangeText={text => {
              dataModel.password = text
              parentStateChange({ dataModel: dataModel })
            }}
            value={dataModel.password}
            errorMessage={GeneralUtils.functions.getErrorMessage('field3', dataModel.password, errorField, [], 'Password')}
          />
        </View>


        <View style={[AppStyles.marginTop_1]}>
          <NewScreenDropDownPicker
            editable={editable}
            required={true}
            label={'User Type'}
            stateObject={stateObject}
            items={SelectListUtils.functions.selectMaster.UserTypeMaster}
            value={SelectListUtils.functions.getSelectedValue(SelectListUtils.functions.selectMaster.UserTypeMaster, dataModel.userType)}
            placeholder="Select user type"
            onChangeValue={(value) => {
              dataModel.userType = value;
              parentStateChange({ dataModel: dataModel })

            }}
            dropdownName={'userTypeDropdown'}
            subHeadingRecordName="an user type"
            onClear={() => {
              dataModel.userType = '';
              parentStateChange({ dataModel: dataModel })
            }}
            errorMessage={GeneralUtils.functions.getErrorMessage('field4', dataModel.userType, errorField, [], 'User Type')}
          />
        </View>


        {stateObject.state.dataModel.userType == 'S' && <View>
          <View style={[AppStyles.marginTop_1]}>
            <SuggestionTextInput
              // tooltipReq={true}
              // tooltipMsg={'Mention the teacher incharge for this class.'}
              // tooltipStyle={styles.tooltipStyle}
              required={true}
              editable={editable}
              label={'Student Name'}
              placeholder={'Select student name'}
              secureTextEntry={false}
              value={dataModel.studentName}
              onFocus={() => {
                searchName = 'ReadOnly'
                //  if(dataModel.studentName == null || dataModel.studentName == '' ){
                SearchUtils.functions.launchSuggestion(stateObject, '', 'studentName')
                //  }
              }
              }
              onClear={() => {
                dataModel.studentName = '';
                dataModel.studentID = '';
                parentStateChange({ dataModel: dataModel })
              }}

              errorMessage={GeneralUtils.functions.getErrorMessage('field2', dataModel.studentName, errorField, [], 'Student Name')}
            />

          </View>
          <View style={[AppStyles.marginTop_1]}>
            <InputText
              required={true}
              editable={false}
              label={'Student ID'}
              value={dataModel.studentID}
            />

          </View>
        </View>}

        {(stateObject.state.dataModel.userType == 'T' || stateObject.state.dataModel.userType == 'A' || stateObject.state.dataModel.userType == 'O') && <View>
          <View style={[AppStyles.marginTop_1]}>
            <SuggestionTextInput

              required={true}
              editable={editable}
              label={'Staff Name'}
              placeholder={'Select teacher name'}
              secureTextEntry={false}
              value={dataModel.teacherName}
              onFocus={() => {
                searchName = 'TeacherDataModel'
                SearchUtils.functions.launchSuggestion(stateObject, '', 'teacherName')

              }
              }
              onClear={() => {
                dataModel.teacherName = '';
                dataModel.teacherID = '';
                parentStateChange({ dataModel: dataModel })
              }}

              errorMessage={GeneralUtils.functions.getErrorMessage('field6', dataModel.teacherName, errorField, [], 'Staff Name')}
            />

          </View>
          <View style={[AppStyles.marginTop_1]}>
            <InputText
              required={true}
              editable={false}
              label={'Staff ID'}
              value={dataModel.teacherID}
            />

          </View>
        </View>}

        <View style={[AppStyles.marginTop_1]}>
          <NewScreenDropDownPicker
           tooltipReq={true}
           tooltipMsg={'If the user staus is diabled , they can not login into application'}
           tooltipStyle={styles.tooltipStyle}
            editable={editable}
            required={true}
            label={'Status'}
            stateObject={stateObject}
            items={SelectListUtils.functions.selectMaster.ProfileStatusMaster}
            value={SelectListUtils.functions.getSelectedValue(SelectListUtils.functions.selectMaster.ProfileStatusMaster, dataModel.status)}
            placeholder="Select status"
            onChangeValue={(value) => {
              dataModel.status = value;
              parentStateChange({ dataModel: dataModel })
            }}
            dropdownName={'statusDropdown'}
            subHeadingRecordName="a status"
            onClear={() => {
              dataModel.status = '';
              parentStateChange({ dataModel: dataModel })
            }}
            errorMessage={GeneralUtils.functions.getErrorMessage('field7', dataModel.status, errorField, [], 'Status')}
          />
        </View>


        <View style={AppStyles.marginTop_1}>
          <InputText

            required={true}
            editable={!editable}
            label={'Email ID'}
            secureTextEntry={false}
            onChangeText={text => {
              dataModel.emailID = text
              parentStateChange({ dataModel: dataModel })
            }}
            value={dataModel.emailID}
            errorMessage={GeneralUtils.functions.getErrorMessage('field8', dataModel.emailID, errorField, [], 'Email Id')}
          />
        </View>


        <View style={AppStyles.marginTop_1}>
          <InputText

            required={true}
            editable={!editable}
            label={'Mobile No'}
            secureTextEntry={false}
            keyboardType='phone-pad'
            onChangeText={text => {
              dataModel.mobileNo = text
              parentStateChange({ dataModel: dataModel })
            }}
            value={dataModel.mobileNo}
            errorMessage={GeneralUtils.functions.getErrorMessage('field9', dataModel.mobileNo, errorField, [], 'Mobile No')}
          />
        </View>



        <View style={[AppStyles.marginTop_1]}>
          <SuggestionTextInput

            required={true}
            editable={editable}
            label={'Home Institute'}
            placeholder={'Select home institute'}
            secureTextEntry={false}
            value={dataModel.instituteName}
            onFocus={() => {
              searchName = 'InstituteDataModel'
              SearchUtils.functions.launchSuggestion(stateObject, '', 'instituteName')

            }
            }
            onClear={() => {
              dataModel.instituteName = '';
              dataModel.instituteID = '';
              parentStateChange({ dataModel: dataModel })
            }}

            errorMessage={GeneralUtils.functions.getErrorMessage('field10', dataModel.instituteName, errorField, [], 'Home Institute')}
          />

        </View>


        <View >

          <CustomDatePicker

            required={false}
            editable={editable}
            label={'Expiry Date'}
            placeholder={'Pick expiry date'}
            secureTextEntry={false}
            // onChangeText={text => console.log(text,'p')}
            value={dataModel.expiryDate}
            format="DD-MM-YYYY"
            mode="date"
            onDateChange={value => {
              dataModel.expiryDate = value;
              parentStateChange({ dataModel: dataModel })
            }}

          />
        </View>







        <SuggestionList
          stateObject={stateObject}
          searchFieldName={stateObject.state.searchFieldName}
          searchText={stateObject.state.searchText}
          visible={stateObject.state.seachVisible}
          searchName={searchName}
          colHeading={searchName == 'ReadOnly' ? ['Name', 'Id'] : (searchName == 'TeacherDataModel' ? ['Name', 'Id',] : ['Name', 'Id',])}
          mapping={searchName == 'ReadOnly' ? ['StudentName', 'StudentId'] : (searchName == 'TeacherDataModel' ? ['TeacherName', 'TeacherId'] : ['instituteName', 'instituteID'])}
          SuggestionHeading={searchName == 'ReadOnly' ? 'Student' : (searchName == 'TeacherDataModel' ? 'Staff' : 'Institute')}
        />


      </View>
    );
  }
}


const styles = StyleSheet.create({

})
export default UserProfileGeneral;

