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
import { Text } from 'react-native-paper';
import AppStyles from "../../../../AppStyles/AppStyles";
import SelectListUtils from '../../../../utils/SelectListUtils'
import SearchUtils from "../../../../utils/SearchUtils";
import GeneralUtils from "../../../../utils/GeneralUtils";
import NewScreenDropDownPicker from '../../../../components/NewScreenDropDownPicker';
import SuggestionList from '../../../../components/SuggestionList';
import SuggestionTextInput from '../../../../components/SuggestionTextInput';
import InputText from '../../../../components/InputText';









class VideoAssignmentGeneral extends Component {
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
        required={true}
        editable={!primaryKeyEditable}
        label={'Lesson ID'}
        secureTextEntry={false}
        onChangeText={text => {
          dataModel.assignmentID = text
          parentStateChange({ dataModel: dataModel })
        }}
        value={dataModel.assignmentID}
        errorMessage={GeneralUtils.functions.getErrorMessage('field1', dataModel.assignmentID, errorField, [], 'Lesson ID')}
      />

      <InputText
        tooltipReq={true}
        tooltipMsg={'Enter the description about the video.'}
        required={true}
        editable={!editable}
        label={'Description'}
        secureTextEntry={false}
        multiline={true}
        onChangeText={text => {
          dataModel.assignmentDescription = text
          parentStateChange({ dataModel: dataModel })
        }}
        value={dataModel.assignmentDescription}
        errorMessage={GeneralUtils.functions.getErrorMessage('field2', dataModel.assignmentDescription, errorField, [], 'Description')}
      />


      <View >
        <NewScreenDropDownPicker
          editable={primaryKeyEditable}
          required={true}
          label={'Subject'}
          stateObject={stateObject}
          items={SelectListUtils.functions.selectMaster.SubjectMaster}
          value={SelectListUtils.functions.getSelectedValue(SelectListUtils.functions.selectMaster.SubjectMaster, dataModel.subjectID)}
          placeholder="Select Subject"
  
          onChangeValue={(value) => {
            dataModel.subjectID = value;
            dataModel.subjectName = SelectListUtils.functions.getSelectedValue(SelectListUtils.functions.selectMaster.SubjectMaster, dataModel.subjectID);
            parentStateChange({ dataModel: dataModel })

          }}
          dropdownName={'subjectDropdown'} 
            subHeadingRecordName = "a subject"
          onClear={() => {
            dataModel.subjectID= '';
            dataModel.subjectName = '';
            parentStateChange({ dataModel: dataModel })
          }}
          errorMessage={GeneralUtils.functions.getErrorMessage('field3', dataModel.subjectID, errorField, [], 'Subject')}
        />
      </View>

      <View >
        <SuggestionTextInput
          tooltipReq={true}
          tooltipMsg={'Mention the class/group for whom the video lesson is to be uploaded.'}
          // tooltipStyle={styles.tooltipStyle}
          required={true}
          editable={editable}
          label={'Assignee group'}
          placeholder={'Select assignee group'}
          secureTextEntry={false}
          value={dataModel.groupID}
          onFocus={() => {
            //  if(dataModel.groupID == null || dataModel.groupID == '' ){
            SearchUtils.functions.launchSuggestion(stateObject, '', 'groupId')
            //  }
          }
          }
          onClear={() => {
            dataModel.groupID = '';
            dataModel.groupDesc = '';
            parentStateChange({ dataModel: dataModel })
          }}

          errorMessage={GeneralUtils.functions.getErrorMessage('field4', dataModel.groupID, errorField, [], 'Assignee group')}

        />

      </View>
      <View >
        <InputText
          required={false}
          editable={false}
          label={'Assignee Group Description'}
          value={dataModel.groupDesc}
          multiline={true}
        />

      </View>



      {/* {stateObject.state.currentOperation == "Create" && <Text>{'\n \n \n \n \n \n \n \n \n \n'}</Text>} */}






      <SuggestionList
        stateObject={stateObject}
        searchFieldName={stateObject.state.searchFieldName}
        searchText={stateObject.state.searchText}
        visible={stateObject.state.seachVisible}
        searchName={'groupId'}
        colHeading={['Group ID', 'Description',]}
        mapping={['groupID', 'groupDescription',]}
        SuggestionHeading={'Assignee group'}
      />

    </View>
    );
  }
}


const styles = StyleSheet.create({

})
export default VideoAssignmentGeneral;

