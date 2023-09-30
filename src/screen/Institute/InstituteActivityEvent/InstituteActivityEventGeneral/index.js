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
import { View, StyleSheet, } from 'react-native';
import { h, w } from '../../../../utils/Dimensions';
import { Divider,Subheading } from 'react-native-paper';
import AppStyles from "../../../../AppStyles/AppStyles";
import SearchUtils from "../../../../utils/SearchUtils";
import GeneralUtils from "../../../../utils/GeneralUtils";
import SuggestionList from '../../../../components/SuggestionList';
import SuggestionTextInput from '../../../../components/SuggestionTextInput';
import InputText from '../../../../components/InputText';
import NewScreenDropDownPicker from '../../../../components/NewScreenDropDownPicker';
import SelectListUtils from '../../../../utils/SelectListUtils'
import AmountInputText from "../../../../components/AmountInputText"
//import GeneralUtils from '../../../../utils/GeneralUtils'










var searchName = 'groupId'

class InstituteActivityEventGeneral extends Component {
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

      <View>
        <InputText
          // tooltipReq={true}
          // tooltipMsg={'By default, system will provide an auto-generated Student ID that can be used. If the institute wants to assign their own student ID, then that ID can be entered replacing the auto-generated ID'}
          // tooltipStyle={styles.tooltipStyle}
          required={true}
          editable={!primaryKeyEditable}
          label={'Activity ID'}
          secureTextEntry={false}
          onChangeText={text => {
            dataModel.activityID = text
            parentStateChange({ dataModel: dataModel })
          }}
          value={dataModel.activityID}
          errorMessage={GeneralUtils.functions.getErrorMessage('field1', dataModel.activityID, errorField, [], 'Activity ID')}
        />
      </View>

      <View style={AppStyles.marginTop_1}>
        <InputText
          tooltipReq={true}
          tooltipMsg={'Event or Activity Name'}
          tooltipStyle={styles.tooltipStyle}
          required={true}
          editable={!editable}
          label={'Activity Name'}
          secureTextEntry={false}
          onChangeText={text => {
            dataModel.activityName = text
            parentStateChange({ dataModel: dataModel })
          }}
          value={dataModel.activityName}
          errorMessage={GeneralUtils.functions.getErrorMessage('field2', dataModel.activityName, errorField, [], 'Activity Name')}
        />
      </View>


      <View style={[AppStyles.marginTop_1]}>
        <NewScreenDropDownPicker
          editable={editable}
          required={true}
          label={'Activity Type'}
          stateObject={stateObject}
          items={SelectListUtils.functions.selectMaster.ActivityTypeMaster}
          value={SelectListUtils.functions.getSelectedValue(SelectListUtils.functions.selectMaster.ActivityTypeMaster, dataModel.activityType)}
          placeholder="Select activity type"
          onChangeValue={(value) => {
            dataModel.activityType = value;
            parentStateChange({ dataModel: dataModel })

          }}
          dropdownName={'activityTypeDropdown'} 
          subHeadingRecordName = "an activity type"
          onClear={() => {
            dataModel.activityType = '';
          parentStateChange({ dataModel: dataModel })
        }}
          errorMessage={GeneralUtils.functions.getErrorMessage('field3', dataModel.activityType, errorField, [], 'Activity Type')}
        />
      </View>


      <View style={AppStyles.marginTop_1}>
        <SuggestionTextInput
          tooltipReq={true}
          tooltipMsg={'Mention the group of students for whom the activity or event applicable'}
          tooltipStyle={styles.tooltipStyle1}
          required={true}
          editable={editable}
          label={'Assignee Group'}
          placeholder={'Select assignee group'}
          secureTextEntry={false}
          value={dataModel.groupID}
          onFocus={() => {
            //  if(dataModel.groupID == null || dataModel.groupID == '' ){
              searchName = 'groupId'
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
      <View style={AppStyles.marginTop_1}>
        <InputText
          required={false}
          editable={false}
          label={'Assignee Group Description'}
          value={dataModel.groupDesc}
          multiline={true}
        />

      </View>
      {stateObject.state.currentOperation == 'Modification' &&
      
         <View>
      <Divider style={AppStyles.marginTop_3} />
      <Subheading style={AppStyles.bold_600}>{stateObject.state.createStepsHeading[1]}</Subheading>     
         <View style={AppStyles.marginTop_2}>
         <SuggestionTextInput
            tooltipReq={true}
            tooltipMsg={'Select Fee applicable for this event'}
            tooltipStyle={styles.tooltipStyle}
            required={false}
            editable={editable}
            label={'Fee applicable'}
            placeholder={'Select fee description'}
            secureTextEntry={false}
            value={dataModel.feeDescription}
            onFocus={() => {
              //  if(dataModel.feeDescription == null || dataModel.feeDescription == '' ){
                searchName='feeDataModel'  
              //parentStateChange({ searchName: 'feeID' }) 
              SearchUtils.functions.launchSuggestion(stateObject, '', 'feeID')
              //  }
            }
            }
            onClear={() => {
              dataModel.feeDescription = '';
              dataModel.feeID = '';
              dataModel.amount = '';
              dataModel.feeDueDate = '';
              parentStateChange({ dataModel: dataModel })
            }}
  
          // errorMessage={GeneralUtils.functions.getErrorMessage('field5', dataModel.feeDescription, errorField, [], 'Fee Description')}
          />
         </View>
         <View style={AppStyles.marginTop_1}>
          <InputText
          tooltipReq={true}
          tooltipMsg={'Last Date for fee to be paid'}
          tooltipStyle={styles.tooltipStyle}
            required={false}
            editable={false}
            label={'Fee Due Date'}
            value={dataModel.feeDueDate}
    
          />
  
        </View>
        <View style={AppStyles.marginTop_1}>
          {/* <InputText
            required={false}
            editable={false}
            label={'Fee Amount'}
            value={dataModel.amount}
    
          /> */}
           <AmountInputText
           tooltipReq={true}
           tooltipMsg={'Fee Amount'}
           tooltipStyle={styles.tooltipStyle}
          currencyCode={stateObject.state.currencyCode}
          required={false}
          editable={false}
          label={'Fee Amount'}
          secureTextEntry={false}
          value={dataModel.amount}
        />
        </View>
  
        </View>

        }

      {/* {stateObject.state.currentOperation == "Create" && <Text>{'\n \n \n \n \n \n \n \n \n \n'}</Text>} */}
      {console.log('Inside General render',stateObject.state.currentOperation)}
      {console.log('Inside General render type',stateObject.state.type)}
      
     {stateObject.state.currentOperation == 'Modification'?
      <SuggestionList
        stateObject={stateObject}
        searchFieldName={stateObject.state.searchFieldName}
        searchText={stateObject.state.searchText}
        visible={stateObject.state.seachVisible}
        searchName={searchName}
        colHeading={searchName == 'groupId' ? ['Group ID', 'Description',] : ['Description','Amount','Due Date']}
        mapping={searchName == 'groupId' ? ['groupID', 'groupDescription',] : ['feeDescription', 'amount','feeDueDate']}
        SuggestionHeading={searchName == 'groupId' ? 'Assignee group' : 'Fee'}
      /> :

<SuggestionList
        stateObject={stateObject}
        searchFieldName={stateObject.state.searchFieldName}
        searchText={stateObject.state.searchText}
        visible={stateObject.state.seachVisible}
        searchName={searchName}
        colHeading={['Group ID', 'Description',]}
        mapping={['groupID', 'groupDescription',]}
        SuggestionHeading={'Assignee group'}
      />}
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
export default InstituteActivityEventGeneral;

