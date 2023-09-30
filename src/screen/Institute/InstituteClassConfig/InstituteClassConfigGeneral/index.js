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

/* * * Change Tag:SHA001
 Change Desc: add property for iPad and Tablet style in dropdown
 Changed By : Shashank
 Date:22-12-2020 
 */

import React, { Component } from "react";
import { View, StyleSheet, Image, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { TextInput, Card, Text, Avatar } from 'react-native-paper';
import { w, h } from "../../../../utils/Dimensions";
import AppStyles from "../../../../AppStyles/AppStyles";
import SelectListUtils from '../../../../utils/SelectListUtils'
import SearchUtils from "../../../../utils/SearchUtils";
import InputText from '../../../../components/InputText';
import GeneralUtils from "../../../../utils/GeneralUtils";
import NewScreenDropDownPicker from '../../../../components/NewScreenDropDownPicker';
import SuggestionList from '../../../../components/SuggestionList';
import SuggestionTextInput from '../../../../components/SuggestionTextInput';










class InstituteClassConfigGeneral extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    }
  }






  render() {
    const {
      stateObject
    } = this.props
    const { dataModel, editable, primaryKeyEditable, errorField } = stateObject.state
    const { parentStateChange } = stateObject

    return (<View style={AppStyles.marginTop_2}>


      <InputText
        required={true}
        editable={!editable}
        label={'Class Code'}
        secureTextEntry={false}
        onChangeText={text => {
          dataModel.Class = text
          parentStateChange({ dataModel: dataModel })
        }}
        value={dataModel.Class}
        errorMessage={GeneralUtils.functions.getErrorMessage('field1', dataModel.Class, errorField, [], 'Class Code')}
      />


      <View style={AppStyles.marginTop_1}>
        <InputText
          required={true}
          editable={!editable}
          label={'Class Decription'}
          secureTextEntry={false}
          multiline={true}
          onChangeText={text => {
            dataModel.ClassDesc = text
            parentStateChange({ dataModel: dataModel })
          }}
          value={dataModel.ClassDesc}
          errorMessage={GeneralUtils.functions.getErrorMessage('field2', dataModel.ClassDesc, errorField, [], 'Class Decription')}
        />
      </View>

      <View style={[AppStyles.zIndex_2000, AppStyles.marginTop_1]}>
        <SuggestionTextInput
          tooltipReq={true}
          tooltipMsg={'Mention the teacher incharge for this class.'}
          // tooltipStyle={styles.tooltipStyle}
          required={false}
          editable={editable}
           label={'Teacher Name'}
           placeholder={'Select teacher name'}
           secureTextEntry={false}
           value={dataModel.teacherName}
          onFocus={()=>  
            { 
            //  if(dataModel.teacherName == null || dataModel.teacherName == '' ){
               SearchUtils.functions.launchSuggestion(stateObject,'', 'teacherName')
            //  }
           }  
          }
          onClear={()=> { 
            dataModel.teacherName = '';
            dataModel.teacherID='';
            parentStateChange({ dataModel: dataModel })
           }}
        />

      </View>
      <View style={[AppStyles.marginTop_1]}>
        <InputText
          required={false}
          editable={false}
          label={'Teacher ID'}
          value={dataModel.teacherID}
        />

      </View>


      <View style={[AppStyles.marginTop_1]}>
        <InputText
          tooltipReq={true}
          tooltipMsg={'Please enter year group of the student who will be studied in this class room or batch or course Say for example , You can enter either 1  or in roman number as I to indicate Year one students'}
          tooltipStyle={styles.sectionStyle}
          required={true}
          editable={!editable}
          label={'Year Group (or) Standard'}
          secureTextEntry={false}
          onChangeText={text => {
            dataModel.Standard = text
            parentStateChange({ dataModel: dataModel })
          }}
          value={dataModel.Standard}
          errorMessage={GeneralUtils.functions.getErrorMessage('field4', dataModel.Standard, errorField, [], 'Year/Standard')}
        />

      </View>
      <View style={[AppStyles.marginTop_1]}>

        <InputText
         tooltipReq={true}
         tooltipMsg={'If there are multiple same year group students will be studied on this type of class or batch or course , you can give values hear as ‘A’  and ‘B’ to differentiate them Say for example Year Group field can have 1 or I and this field can have A for one class , and you can create another one with same Year Group value and section as B , so that institute can  create 1A and 1B as 2 classes'}
         tooltipStyle={styles.sectionStyle}
          required={false}
          editable={!editable}
          label={'Section/Department/Major'}
          secureTextEntry={false}
          onChangeText={text => {
            dataModel.Section = text
            parentStateChange({ dataModel: dataModel })
          }}
          value={dataModel.Section}
          errorMessage={GeneralUtils.functions.getErrorMessage('field5', dataModel.Section, errorField, [], 'Section/Department/Major')}
        />

      </View>


      <View>
        <NewScreenDropDownPicker
          tooltipReq={true}
          tooltipMsg={'Mention the desired attendance type to be followed. Period wise - Attendance is taken for each period. Day wise - Attendance is taken once per day. Noon wise - Attendance is taken once in the forenoon & once in the afternoon'}
          tooltipStyle={{height:h('30%'),width:w('60%')}}
          editable={editable}
          required={true}
          label={'Attendance Type'}
          stateObject={stateObject}
          items={SelectListUtils.functions.selectMaster.AttendanceMaster}
          value={SelectListUtils.functions.getSelectedValue(SelectListUtils.functions.selectMaster.AttendanceMaster, dataModel.attendance)}
          placeholder="Select attendance type"
          onChangeValue={(value) => {
            dataModel.attendance = value;
            parentStateChange({ dataModel: dataModel })

          }}
          dropdownName={'attendanceDropdown'} 
          subHeadingRecordName = "an attendance type"
          onClear={() => {
            dataModel.attendance = '';
            parentStateChange({ dataModel: dataModel })
          }}
          errorMessage={GeneralUtils.functions.getErrorMessage('field6', dataModel.attendance, errorField, [], 'Attendance type')}
        />
      </View>

      <SuggestionList
        stateObject={stateObject}
        searchFieldName={stateObject.state.searchFieldName}
        searchText={stateObject.state.searchText}
        visible={stateObject.state.seachVisible}
        searchName={'TeacherDataModel'}
        colHeading={['Name', 'Id',]}
        mapping={['TeacherName', 'TeacherId',]}
        SuggestionHeading={'Teacher'}
      /> 


      {/* <Text>{'\n \n \n \n \n \n \n \n'}</Text> */}

    </View>
    );
  }
}


const styles = StyleSheet.create({
sectionStyle:{
  height:h('40%'),width:w('50%')
}
})
export default InstituteClassConfigGeneral;

