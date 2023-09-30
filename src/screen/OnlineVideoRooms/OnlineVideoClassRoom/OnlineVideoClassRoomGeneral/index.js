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
import GeneralUtils from "../../../../utils/GeneralUtils";
import NewScreenDropDownPicker from '../../../../components/NewScreenDropDownPicker';
import InputText from '../../../../components/InputText';
import { h, w } from "../../../../utils/Dimensions";

import CustomRadioButton from '../../../../components/CustomRadioButton';
import CustomLabel from '../../../../components/CustomLabel';









class OnlineVideoClassRoomGeneral extends Component {
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
        required={true}
        editable={!primaryKeyEditable}
        label={'Classroom ID'}
        secureTextEntry={false}
        onChangeText={text => {
          dataModel.classroomID = text
          parentStateChange({ dataModel: dataModel })
        }}
        value={dataModel.classroomID}
        errorMessage={GeneralUtils.functions.getErrorMessage('field1', dataModel.classroomID, errorField, [], 'Classroom ID')}
      />


      <CustomLabel
      tooltipReq={true}
      tooltipMsg={'There are two types of Classroom. \n 1-to-1 Classroom : a teacher can conduct a virtual online \n classroom for a single student \n Group Classroom : a teacher can conduct a virtual online classroom for all the students under a single class.'}
        label={'Classroom type'}
        required={true}
        //  tooltipReq={}
        //  tooltipMsg={}
         tooltipStyle={styles.tooltipStyle}
        template={
          <View style={[AppStyles.flexDirectionRow]}>
            <CustomRadioButton
              label={'1-to-1 Classroom'}
              onPress={() => {
                dataModel.type = '1'
                parentStateChange({ dataModel: dataModel })
              }}
              checked={dataModel.type == '1' ? true : false}
              disabled={false}

            />

            <CustomRadioButton
              label={'Group Classroom'}
              onPress={() => {
                dataModel.type = 'G'
                parentStateChange({ dataModel: dataModel })
              }}
              checked={dataModel.type == 'G' ? true : false}
              disabled={false}

            />

          </View>
        }
        errorMessage={GeneralUtils.functions.getErrorMessage('field2', dataModel.type, errorField, [], 'Classroom type')}
      />


      <View style={AppStyles.marginTop_2} />


      <NewScreenDropDownPicker
        tooltipReq={true}
        tooltipMsg={'Enter the Subject on which video class being scheduled'}
        editable={editable}
        required={true}
        label={'Subject'}
        stateObject={stateObject}
        items={SelectListUtils.functions.selectMaster.SubjectMaster}
        value={SelectListUtils.functions.getSelectedValue(SelectListUtils.functions.selectMaster.SubjectMaster, dataModel.subject)}
        placeholder="Select Subject"
        onChangeValue={(value) => {
          dataModel.subject = value;
          dataModel.subjectName = SelectListUtils.functions.getSelectedValue(SelectListUtils.functions.selectMaster.SubjectMaster, dataModel.subject);
          parentStateChange({ dataModel: dataModel })

        }}
        dropdownName={'subjectDropdown'}
        subHeadingRecordName="a subject"
        onClear={() => {
          dataModel.subject = '';
          dataModel.subjectName = '';
          parentStateChange({ dataModel: dataModel })
        }}
        errorMessage={GeneralUtils.functions.getErrorMessage('field3', dataModel.subject, errorField, [], 'Subject')}
      />

      <InputText
        tooltipReq={true}
        tooltipMsg={'Enter the Lesson/Unit number.'}
        // tooltipStyle={styles.tooltipStyle}
        required={false}
        editable={!editable}
        label={'Unit/Lesson'}
        secureTextEntry={false}
        onChangeText={text => {
          dataModel.unitNo = text
          parentStateChange({ dataModel: dataModel })
        }}
        value={dataModel.unitNo}
      />

      <InputText
        tooltipReq={true}
        tooltipMsg={'Enter any content section of the lesson.'}
        // tooltipStyle={styles.tooltipStyle}
        required={false}
        editable={!editable}
        label={'Heading'}
        secureTextEntry={false}
        onChangeText={text => {
          dataModel.heading = text
          parentStateChange({ dataModel: dataModel })
        }}
        value={dataModel.heading}

      />

      <InputText
        tooltipReq={true}
        tooltipMsg={'Enter any subcontent section of the lesson.'}
        // tooltipStyle={styles.tooltipStyle}
        required={false}
        editable={!editable}
        label={'Sub Heading'}
        secureTextEntry={false}
        onChangeText={text => {
          dataModel.subheading = text
          parentStateChange({ dataModel: dataModel })
        }}
        value={dataModel.subheading}

      />

      <InputText
        tooltipReq={true}//N0U-109 changes
        tooltipMsg={'Enter the description about the Meeting'} //N0U-109 changes
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

    </View>
    );
  }
}


const styles = StyleSheet.create({
  typetooltipStyle: {
    width: w('65%'),
    height: h('15%')
  },
  grptooltipStyle: {
    width: w('60%'),
    height: h('15%')
  },
  tooltipStyle:{
    height:h('30%'),width:w('65%'),
 }
})
export default OnlineVideoClassRoomGeneral;

