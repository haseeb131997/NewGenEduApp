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
import SearchUtils from "../../../../utils/SearchUtils";
import GeneralUtils from "../../../../utils/GeneralUtils";
import SuggestionList from '../../../../components/SuggestionList';
import SuggestionTextInput from '../../../../components/SuggestionTextInput';
import InputText from '../../../../components/InputText';
import CustomDatePicker from "../../../../components/CustomDatePicker"
import CustomRadioButton from '../../../../components/CustomRadioButton';
import CustomLabel from '../../../../components/CustomLabel';
import { w } from "../../../../utils/Dimensions";











class StudentLeaveManagementGenral extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    }
  }


 


  chooseOptions(type) {
    const {
      stateObject
    } = this.props

    const { dataModel } = stateObject.state
    if (type == 'fullDay') {
      dataModel.fromNoon = 'D'
      dataModel.toNoon = 'D'
      dataModel.from = ''
      dataModel.to = ''
      stateObject.parentStateChange({
        selectOption: type,
        dataModel: dataModel
      })
    }
    else if (type == 'halfDay') {
      dataModel.fromNoon = ''
      dataModel.toNoon = ''
      dataModel.from = ''
      dataModel.to = ''
      stateObject.parentStateChange({
        selectOption: type,
        dataModel: dataModel
      })


    }


  }

  selectNoon(noon) {
    const {
      stateObject
    } = this.props
    const { dataModel } = stateObject.state
    if (noon == 'foreNoon') {
      dataModel.fromNoon = 'F'
      dataModel.toNoon = 'F'
      stateObject.parentStateChange({
        dataModel: dataModel
      })
    }
    else if (noon == 'afterNoon') {
      dataModel.fromNoon = 'A'
      dataModel.toNoon = 'A'
      stateObject.parentStateChange({
        dataModel: dataModel
      })
    }
  }


  render() {
    const {
      stateObject
    } = this.props
    const { dataModel, editable, primaryKeyEditable, errorField } = stateObject.state
    const { parentStateChange } = stateObject


    if(stateObject.state.currentOperation == 'Modification'){
 
     if(dataModel.fromNoon == 'D' &&  dataModel.toNoon == 'D'){
      stateObject.state.selectOption = 'fullDay'
     }
     else if(dataModel.fromNoon == 'F' &&  dataModel.toNoon == 'F'){
      stateObject.state.selectOption = 'halfDay'
     }
    else if(dataModel.fromNoon == 'A' &&  dataModel.toNoon == 'A'){
      stateObject.state.selectOption = 'halfDay'
     }

    }




    return (<View style={[AppStyles.marginTop_2]}>






      <View style={AppStyles.marginTop_2}>
        <InputText
          // tooltipReq={true}
          // tooltipMsg={'By default, system will provide an auto-generated Student ID that can be used. If the institute wants to assign their own student ID, then that ID can be entered replacing the auto-generated ID'}
          // tooltipStyle={styles.tooltipStyle}
          required={true}
          editable={!primaryKeyEditable}
          label={'Leave Reference ID'}
          secureTextEntry={false}
          onChangeText={text => {
            dataModel.referenceId = text
            parentStateChange({ dataModel: dataModel })
          }}
          value={dataModel.referenceId}
          errorMessage={GeneralUtils.functions.getErrorMessage('field1', dataModel.referenceId, errorField, [], 'Leave Reference ID')}
        />
      </View>


      <View style={[AppStyles.zIndex_2000, AppStyles.marginTop_1]}>
        <SuggestionTextInput
          tooltipReq={true}
          tooltipMsg={'Mention the student who needs to take leave.'}
          tooltipStyle={styles.tooltipStyle}
          required={true}
          editable={editable}
          label={'Student Name'}
          placeholder={'Select student name'}
          secureTextEntry={false}
          value={dataModel.studentName}
          onFocus={() => {
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





      <CustomLabel
         label={'Select Leave Option'}
         required={true}
        //  tooltipReq={}
        //  tooltipMsg={}
        //  tooltipStyle={}
        template={
          <View style={[AppStyles.flexDirectionRow]}>
        <CustomRadioButton
          label={'Full Day'}
          onPress={() => this.chooseOptions('fullDay')}
          checked={stateObject.state.selectOption == 'fullDay' ? true : false}
          disabled={false}

        />

        <CustomRadioButton
          label={'Half Day'}
          onPress={() => this.chooseOptions('halfDay')}
          checked={stateObject.state.selectOption == 'halfDay' ? true : false}
          disabled={false}

        />
        
      </View>
         }
         errorMessage={GeneralUtils.functions.getErrorMessage('field3',stateObject.state.selectOption, errorField, [], 'Leave Option')}
        />
     
      {/* <Caption style={AppStyles.fieldErrorMsg}>{'lll'}</Caption> */}





      {stateObject.state.selectOption == 'fullDay' && <View>
        <View >

          <CustomDatePicker
            tooltipReq={true}
            tooltipMsg={'Specify the starting date of the leave period.'}
            tooltipStyle={styles.tooltipStyle}
            required={true}
            editable={editable}
            label={'Leave Start Date'}
            placeholder={'Pick leave start date'}
            secureTextEntry={false}
            // onChangeText={text => console.log(text,'p')}
            value={dataModel.from}
            format="DD-MM-YYYY"
            mode="date"
            onDateChange={value => {
              dataModel.from = value;
              parentStateChange({ dataModel: dataModel })
            }}
            errorMessage={GeneralUtils.functions.getErrorMessage('field4', dataModel.from, errorField, [], 'Leave Start Date')}
          />
        </View>

        <View style={AppStyles.marginTop_1}>

          <CustomDatePicker
            tooltipReq={true}
            tooltipMsg={'Specify the ending date of the leave period.'}
            tooltipStyle={styles.tooltipStyle}
            required={true}
            editable={editable}
            label={'Leave End Date'}
            placeholder={'Pick leave end date'}
            secureTextEntry={false}
            // onChangeText={text => console.log(text,'p')}
            value={dataModel.to}
            format="DD-MM-YYYY"
            mode="date"
            onDateChange={value => {
              dataModel.to = value;
              parentStateChange({ dataModel: dataModel })
            }}
            errorMessage={GeneralUtils.functions.getErrorMessage('field5', dataModel.to, errorField, [], 'Leave End Date')}
          />
        </View>
      </View>}

      {stateObject.state.selectOption == 'halfDay' && <View>

      <View >
          <CustomDatePicker
            // tooltipReq={true}
            // tooltipMsg={'Specify the starting date of the academic year'}
            // tooltipStyle={styles.tooltipStyle}
            required={true}
            editable={editable}
            label={'Date'}
            placeholder={'Pick date'}
            secureTextEntry={false}
            // onChangeText={text => console.log(text,'p')}
            value={dataModel.from}
            format="DD-MM-YYYY"
            mode="date"
            onDateChange={value => {
              dataModel.from = value;
              dataModel.to = value;
              parentStateChange({ dataModel: dataModel })
            }}
            errorMessage={GeneralUtils.functions.getErrorMessage('field6', dataModel.from, errorField, [], 'Date')}
          />
        </View>

    
       <View style={AppStyles.marginTop_2}>
       <CustomLabel
         label={'Select Noon Option'}
         required={true}
        //  tooltipReq={}
        //  tooltipMsg={}
        //  tooltipStyle={}
         template={
          <View style={[AppStyles.flexDirectionRow]}>
          <CustomRadioButton
            label={'Fore Noon'}
            onPress={() => this.selectNoon('foreNoon')}
            checked={(dataModel.fromNoon == 'F' && dataModel.toNoon == 'F') ? true : false}
            disabled={false}
          />

          <CustomRadioButton
            label={'After Noon'}
            onPress={() => this.selectNoon('afterNoon')}
            checked={(dataModel.fromNoon == 'A' && dataModel.toNoon == 'A') ? true : false}
            disabled={false}

          />
        </View>
         }
         errorMessage={GeneralUtils.functions.getErrorMessage('field7', dataModel.fromNoon, errorField, [], 'Select Noon Option')}

        />
       </View>
       


      
      </View>}










      {/* {stateObject.state.currentOperation == "Create" && <Text>{'\n \n \n \n \n \n \n \n \n \n'}</Text>} */}






      <SuggestionList
        stateObject={stateObject}
        searchFieldName={stateObject.state.searchFieldName}
        searchText={stateObject.state.searchText}
        visible={stateObject.state.seachVisible}
        searchName={'ReadOnly'}
        colHeading={['Name', 'Id']}
        mapping={['StudentName', 'StudentId']}
        SuggestionHeading={'Student'}
      />
    </View>
    );
  }
}


const styles = StyleSheet.create({
  tooltipStyle :{
    width:w('50%')
  }
})
export default StudentLeaveManagementGenral;

