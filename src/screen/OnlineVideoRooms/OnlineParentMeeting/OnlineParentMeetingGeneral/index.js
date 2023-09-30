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





var searchName = ""


class OnlineParentMeetingGeneral extends Component {
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
        tooltipReq={true}
        tooltipMsg={'By default, system will provide an auto-generated Meeting reference'}
        // tooltipMsg={'By default, system will provide an auto-generated Student ID that can be used. If the institute wants to assign their own student ID, then that ID can be entered replacing the auto-generated ID'}
        // tooltipStyle={styles.tooltipStyle}
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
        tooltipReq={true}
        tooltipMsg={'There are two types of Meeting.\n 1-to-1 Meeting : a Staff can conduct an online meeting with a single parent/student \n Group Meeting : a Staff can conduct an online meeting for all the parents/students under a single assignee group.'}
        tooltipStyle={styles.tooltipStyle}
        label={'Meeting type'}
        required={true}
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
              label={'Group meeting'}
              onPress={() => {
                dataModel.type = 'G'
                parentStateChange({ dataModel: dataModel })
              }}
              checked={dataModel.type == 'G' ? true : false}
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
        // tooltipReq={true}
        // tooltipMsg={'Enter the description about the video.'}
        required={false}
        editable={!editable}
        label={'Description'}
        secureTextEntry={false}
        multiline={true}
        onChangeText={text => {
          dataModel.subheading = text
          parentStateChange({ dataModel: dataModel })
        }}
        value={dataModel.subheading}

      />


{dataModel.type == "1" && <View>
     <SuggestionTextInput
      tooltipReq={true}
      tooltipMsg={'Mention the student/parent who attends this meeting'}
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
          searchName = "ReadOnly"
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

        errorMessage={GeneralUtils.functions.getErrorMessage('student1', dataModel.studentName, errorField, [], 'Student Name')}
      />
      <InputText
        required={false}
        editable={false}
        label={'Student ID'}
        value={dataModel.studentID}
      />
     </View>}


     {dataModel.type == "G" && <View>
     <SuggestionTextInput
        tooltipReq={true}
        tooltipMsg={'Mention the group of students/parent attends the meeting'}
        // tooltipStyle={styles.tooltipStyle}
        required={true}
        editable={editable}
        label={'Assignee Group'}
        placeholder={'Select assignee group'}
        secureTextEntry={false}
        value={dataModel.class}
        onFocus={() => {
          searchName = "classGroupDatamodel"
          SearchUtils.functions.launchSuggestion(stateObject, '', 'groupId')
        }
        }
        onClear={() => {
          dataModel.class = '';
          dataModel.description = '';
          parentStateChange({ dataModel: dataModel })
        }}

        errorMessage={GeneralUtils.functions.getErrorMessage('group1', dataModel.class, errorField, [], 'Assignee Group')}
      />
      <InputText
        required={false}
        editable={false}
        label={'Assignee Group Description'}
        value={dataModel.description}
      />
     </View>}




     <SuggestionList
        stateObject={stateObject}
        searchFieldName={stateObject.state.searchFieldName}
        searchText={stateObject.state.searchText}
        visible={stateObject.state.seachVisible}
        searchName={searchName}
        colHeading={searchName == "ReadOnly" ? ['Name', 'Id']: ['Group ID', 'Description',] }
       mapping={searchName == "ReadOnly" ? ['StudentName', 'StudentId']:['groupID', 'groupDescription',]}
        SuggestionHeading={searchName == "ReadOnly" ? 'Staff':'Assignee Group'}
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
    height:h('35%'),width:w('65%')
 }
})
export default OnlineParentMeetingGeneral;

