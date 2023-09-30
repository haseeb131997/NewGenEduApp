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
import { View, StyleSheet, } from 'react-native';
import SelectListUtils from '../../../../utils/SelectListUtils'
import AppStyles from "../../../../AppStyles/AppStyles";
import { h, w } from '../../../../utils/Dimensions';
//import ListView from '../../../../components/ListView';
import { Card } from "react-native-paper";
import GeneralUtils from "../../../../utils/GeneralUtils"
import NewScreenDropDownPicker from '../../../../components/NewScreenDropDownPicker';
import InputText from '../../../../components/InputText';
import InputTextArea from '../../../../components/InputTextArea';
import CustomCheckBox from '../../../../components/CustomCheckBox';
import CustomDatePicker from "../../../../components/CustomDatePicker"
import LabelText from '../../../../components/LabelText';






class InstituteActivityEventDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    }

  }








  render() {
    const { stateObject } = this.props
    const { dataModel, editable, errorField } = stateObject.state
    const { parentStateChange } = stateObject
    return (stateObject.state.currentOperation == 'Create' || stateObject.state.currentOperation == 'Modification') ? (
      <View>



        <View style={AppStyles.marginTop_2}>

          <CustomDatePicker
            tooltipReq={true}
            tooltipMsg={'Specify the event date'}
            tooltipStyle={styles.tooltipStyle}
            required={true}
            editable={editable}
            label={'Event Date'}
            placeholder={'Pick event date'}
            secureTextEntry={false}
            // onChangeText={text => console.log(text,'p')}
            value={dataModel.date}
            format="DD-MM-YYYY"
            mode="date"
            onDateChange={value => {
              dataModel.date = value;
              parentStateChange({ dataModel: dataModel })
            }}
            errorMessage={GeneralUtils.functions.getErrorMessage('field6', dataModel.date, errorField, [], 'Event Date')}
          />
        </View>


        <View style={AppStyles.marginTop_2}>

          <CustomDatePicker
             tooltipReq={true}
             tooltipMsg={'Last date for enrollment'}
             tooltipStyle={styles.tooltipStyle}
            required={false}
            editable={editable}
            label={'Last date for enrollment'}
            placeholder={'Pick participation due date'}
            secureTextEntry={false}
            // onChangeText={text => console.log(text,'p')}
            value={dataModel.dueDate}
            format="DD-MM-YYYY"
            mode="date"
            onDateChange={value => {
              dataModel.dueDate = value;
              parentStateChange({ dataModel: dataModel })
            }}
            // errorMessage={GeneralUtils.functions.getErrorMessage('field7', dataModel.dueDate, errorField, [], 'Participation Due Date')}
          />
        </View>



        <View style={[AppStyles.marginTop_1]}>
          <NewScreenDropDownPicker
            editable={editable}
            required={false}
            label={'Activity Level'}
            stateObject={stateObject}
            items={SelectListUtils.functions.selectMaster.OtherActivityLevelMaster}
            value={SelectListUtils.functions.getSelectedValue(SelectListUtils.functions.selectMaster.OtherActivityLevelMaster, dataModel.level)}
            placeholder="Select activity level"
            onChangeValue={(value) => {
              dataModel.level = value;
              parentStateChange({ dataModel: dataModel })
            }}
            dropdownName={'activityDropdown'} 
            subHeadingRecordName = "an activity level"
            onClear={() => {
              dataModel.level = '';
            parentStateChange({ dataModel: dataModel })
          }}
          // errorMessage={GeneralUtils.functions.getErrorMessage('field3', dataModel.level, errorField, [], 'Fee Type')}
          />
        </View>


        <View style={AppStyles.marginTop_1}>
          <InputText
            tooltipReq={true}
            tooltipMsg={'Event Venue Details'}
            tooltipStyle={styles.tooltipStyle}
            // tooltipReq={true}
            // tooltipMsg={'By default, system will provide an auto-generated Student ID that can be used. If the institute wants to assign their own student ID, then that ID can be entered replacing the auto-generated ID'}
            // tooltipStyle={styles.tooltipStyle}
            required={true}
            editable={!editable}
            label={'Venue'}
            secureTextEntry={false}
            onChangeText={text => {
              dataModel.venue = text
              parentStateChange({ dataModel: dataModel })
            }}
            value={dataModel.venue}
            errorMessage={GeneralUtils.functions.getErrorMessage('field7', dataModel.venue, errorField, [], 'Venue')}
          />
        </View>

        <View style={AppStyles.marginTop_1}>
          <InputText
            tooltipReq={true}
            tooltipMsg={'Maximum no. of students who can enroll'}
            tooltipStyle={styles.tooltipStyle}
            required={false}
            editable={!editable}
            label={'Maximum no. of students who can enroll'}
            keyboardType='numeric'
            secureTextEntry={false}
            onChangeText={text => {
              dataModel.maxEnroll = text
              parentStateChange({ dataModel: dataModel })
            }}
            value={dataModel.maxEnroll}

          />
        </View>

        <View style={AppStyles.marginTop_1}>
          <InputText
            tooltipReq={true}
            tooltipMsg={'Maximum no. of students who can participate'}
            tooltipStyle={styles.tooltipStyle1}
            required={false}
            editable={!editable}
            label={'Maximum no. of students who can participate'}
            keyboardType='numeric'
            secureTextEntry={false}
            onChangeText={text => {
              dataModel.maxParticipation = text
              parentStateChange({ dataModel: dataModel })
            }}
            value={dataModel.maxParticipation}

          />
        </View>


        <View style={AppStyles.marginTop_1}>
          <InputTextArea
            tooltipReq={false}
            // tooltipMsg={'Enter Information for the parents/students that will be sent to the parents/student through mail/sms/ they can view in their login.'}
            tooltipStyle={styles.tooltipStyle}
            required={false}
            editable={!editable}
            label={'Instructions to Parents/Students'}
            secureTextEntry={false}
            value={dataModel.remarks}
            placeholder={''}
            onChangeText={text => {
              dataModel.remarks = text;
              parentStateChange({ dataModel: dataModel })
            }}

          />
        </View>

        <View style={AppStyles.marginTop_2}>
          <CustomCheckBox
            label={'Parent Enrollment Required'}
            onPress={() => {
              dataModel.parentEnroll = !dataModel.parentEnroll;
              parentStateChange({ dataModel: dataModel })
            }}
            checked={dataModel.parentEnroll}
            disabled={false}

          />
        </View>

        <View style={AppStyles.marginTop_2}>
          <CustomCheckBox
            label={'Competition Event'}
            onPress={() => {
              dataModel.competitionEvent = !dataModel.competitionEvent;
              parentStateChange({ dataModel: dataModel })
            }}
            checked={dataModel.competitionEvent}
            disabled={false}

          />
        </View>


      </View>


    ):(
      <View>
         <Card.Content>
          <LabelText
            label={'Event Date'}
            value={dataModel.date}
          />

          <LabelText
            label={'Participation Due Date'}
            value={dataModel.dueDate}
          />
          <LabelText
            label={'Activity Level'}
            value={SelectListUtils.functions.getSelectedValueNew(SelectListUtils.functions.selectMaster.OtherActivityLevelMaster, dataModel.level )}
          />
           <LabelText
            label={'Venue'}
            value={dataModel.venue}
          />
          {/* Maximum enrollment limit */}
          <LabelText
            label={'Maximum enrollment limit'}
            value={dataModel.maxEnroll}
          />
          <LabelText
            label={'Maximum participants limit'}
            value={dataModel.maxParticipation}
          />

          <LabelText
            label={'Instructions to Parents/Students'}
            value={dataModel.remarks}
          />

       <View style={AppStyles.marginTop_2}>
          <CustomCheckBox
            label={'Parent Enrollment Required'}
            onPress={() => {
              dataModel.parentEnroll = !dataModel.parentEnroll;
              parentStateChange({ dataModel: dataModel })
            }}
            checked={dataModel.parentEnroll}
            disabled={true}

          />
        </View>

        <View style={AppStyles.marginTop_2}>
          <CustomCheckBox
            label={'Competition Event'}
            onPress={() => {
              dataModel.competitionEvent = !dataModel.competitionEvent;
              parentStateChange({ dataModel: dataModel })
            }}
            checked={dataModel.competitionEvent}
            disabled={true}

          />
        </View>

    </Card.Content>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tooltipStyle: {
    height: h('15%'), width: w('60%')
  },
  tooltipStyle1: {
    height: h('15%'), width: w('50%')
  }
})
export default InstituteActivityEventDetails;
