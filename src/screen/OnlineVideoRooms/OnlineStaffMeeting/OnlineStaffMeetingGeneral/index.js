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
import { View, StyleSheet, Platform } from 'react-native';
import AppStyles from "../../../../AppStyles/AppStyles";
import GeneralUtils from "../../../../utils/GeneralUtils";
import InputText from '../../../../components/InputText';
import { h, w } from "../../../../utils/Dimensions";
import CustomRadioButton from '../../../../components/CustomRadioButton';
import CustomLabel from '../../../../components/CustomLabel';
import SuggestionList from '../../../../components/SuggestionList';
import SearchUtils from "../../../../utils/SearchUtils";
import SuggestionTextInput from '../../../../components/SuggestionTextInput';








class OnlineStaffMeetingGeneral extends Component {
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



    return (<View style={[AppStyles.marginTop_2]}>
      <InputText
        // tooltipReq={true}
        // tooltipMsg={'By default, system will provide an auto-generated Student ID that can be used. If the institute wants to assign their own student ID, then that ID can be entered replacing the auto-generated ID'}
        // tooltipStyle={styles.tooltipStyle}
        tooltipReq={true}
        tooltipMsg={'By default, system will provide an auto-generated Meeting reference'}
        required={true}
        editable={!primaryKeyEditable}
        label={'Meeting ID'}
        secureTextEntry={false}
        onChangeText={text => {
          dataModel.classroomID = text
          parentStateChange({ dataModel: dataModel })
        }}
        value={dataModel.classroomID}
        errorMessage={GeneralUtils.functions.getErrorMessage('field1', dataModel.classroomID, errorField, [], 'Meeting ID')}
      />


      <CustomLabel
        label={'Meeting type'}
        required={true}
        tooltipReq={true}
      tooltipMsg={'There are four types of Staff Meetings.\n 1-to-1 Meeting : an online meeting with any other staff \n Teachers Meeting : an online meeting where all the Teachers can participate \n Non-Teaching Staffs Meeting : an online meeting where all the Non-teaching staffs can participate \nAll Staffs Meeting : an online meeting in which all the staffs from the Institute can participate '}
      tooltipStyle={styles.tooltipStyle}
        //  tooltipReq={}
        //  tooltipMsg={}
        //  tooltipStyle={}
        template={
          <View>
            <CustomRadioButton
              label={'1-to-1 Meeting'}
              onPress={() => {
                dataModel.type = '1'
                parentStateChange({ dataModel: dataModel })
              }}
              checked={dataModel.type == '1' ? true : false}
              disabled={false}

            />

            <CustomRadioButton
              label={'Teacher meeting'}
              onPress={() => {
                dataModel.type = 'T'
                parentStateChange({ dataModel: dataModel })
              }}
              checked={dataModel.type == 'T' ? true : false}
              disabled={false}

            />

            <CustomRadioButton
              label={'Non-Teaching staffs meetings'}
              onPress={() => {
                dataModel.type = 'N'
                parentStateChange({ dataModel: dataModel })
              }}
              checked={dataModel.type == 'N' ? true : false}
              disabled={false}

            />

            <CustomRadioButton
              label={'All staffs meetings'}
              onPress={() => {
                dataModel.type = 'S'
                parentStateChange({ dataModel: dataModel })
              }}
              checked={dataModel.type == 'S' ? true : false}
              disabled={false}

            />

          </View>
        }
        errorMessage={GeneralUtils.functions.getErrorMessage('field2', dataModel.type, errorField, [], 'Meeting type')}
      />


      <View style={AppStyles.marginTop_2} />


     

      <InputText
        tooltipReq={true}
        tooltipMsg={'Enter the Topic / Objective about the meeting'}
        // tooltipStyle={styles.tooltipStyle}
        required={true}
        editable={!editable}
        label={'Topic / Objective'}
        secureTextEntry={false}
        onChangeText={text => {
          dataModel.heading = text
          parentStateChange({ dataModel: dataModel })
        }}
        value={dataModel.heading}
        errorMessage={GeneralUtils.functions.getErrorMessage('field3', dataModel.heading, errorField, [], 'Topic / Objective')}
      />

     
  
      <InputText
        tooltipReq={true}
        tooltipMsg={'Enter the description about the meeting'}
        required={false}
        editable={!editable}
        label={'Description'}
        secureTextEntry={false}
        multiline={true}
        onChangeText={text => {
          dataModel.description = text
          parentStateChange({ dataModel: dataModel })
        }}
        value={dataModel.description}

      />


{dataModel.type == "1" && <View>
     <SuggestionTextInput
        tooltipReq={true}
        tooltipMsg={'Mention the staff who attends this meeting'}
        // tooltipStyle={styles.tooltipStyle}
        required={true}
        editable={editable}
        label={'Staff Name'}
        placeholder={'Select staff name'}
        secureTextEntry={false}
        value={dataModel.studentName}
        onFocus={() => {
          //  if(dataModel.studentName == null || dataModel.studentName == '' ){
          SearchUtils.functions.launchSuggestion(stateObject, '', 'teacherName')
          //  }
        }
        }
        onClear={() => {
          dataModel.studentName = '';
          dataModel.studentID = '';
          parentStateChange({ dataModel: dataModel })
        }}

        errorMessage={GeneralUtils.functions.getErrorMessage('staff1', dataModel.studentName, errorField, [], 'Staff Name')}
      />
      <InputText
        required={false}
        editable={false}
        label={'Staff ID'}
        value={dataModel.studentID}
      />
     </View>}

     <SuggestionList
        stateObject={stateObject}
        searchFieldName={stateObject.state.searchFieldName}
        searchText={stateObject.state.searchText}
        visible={stateObject.state.seachVisible}
        searchName={'StudentTeacherDataModel'}
          colHeading={['Name', 'Id',]}
          mapping={['TeacherName', 'TeacherId',]}
        SuggestionHeading={'Staff'}
      /> 

    </View>
    );
  }
}


const styles = StyleSheet.create({
  // typetooltipStyle: {
  //   width: w('65%'),
  //   height: h('15%')
  // },
  // grptooltipStyle: {
  //   width: w('60%'),
  //   height: h('15%')
  // }
  tooltipStyle:{
    height:h('45%'),width:w('65%')
 }
})
export default OnlineStaffMeetingGeneral;

