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
//import { Text } from 'react-native-paper';
import AppStyles from "../../../../AppStyles/AppStyles";
import SelectListUtils from '../../../../utils/SelectListUtils'
//import SearchUtils from "../../../../utils/SearchUtils";
import GeneralUtils from "../../../../utils/GeneralUtils";
import NewScreenDropDownPicker from '../../../../components/NewScreenDropDownPicker';
//import SuggestionList from '../../../../components/SuggestionList';
//import SuggestionTextInput from '../../../../components/SuggestionTextInput';
//import FilterSuggestionTextInput from '../../../../components/FilterSuggestionTextInput';
//import InputText from '../../../../components/InputText';
import ExamSuggestion from "../../../../components/ExamSuggestion";






var searchName='classDataModel'
class ClassExamAssessmentGeneral extends Component {
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


 

    return (<View style={[AppStyles.marginTop_1]}>


<ExamSuggestion
        required={true}
        editable={primaryKeyEditable}
        stateObject= {stateObject} 
        classCode={"class"} 
        classDescription="classDescription" 
        examID='exam'
        examDescription='examDescription'
        compType='Normal'
        />
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
            parentStateChange({ dataModel: dataModel })

          }}
          dropdownName={'subjectDropdown'} 
            subHeadingRecordName = "a subject"
            onClear={() => {
              dataModel.subjectID= '';
              parentStateChange({ dataModel: dataModel })
            }}
          errorMessage={GeneralUtils.functions.getErrorMessage('field3', dataModel.subjectID, errorField, [], 'Subject')}
        />        
     {/*<View style={[AppStyles.marginTop_1]}>
        <SuggestionTextInput
          tooltipReq={true}
          tooltipMsg={'Mention the exam is to be assessed.'}
          // tooltipStyle={styles.tooltipStyle}
          required={true}
          editable={primaryKeyEditable}
          label={'Exam'}
          placeholder={'Select Exam'}
          secureTextEntry={false}
          value={dataModel.examDescription}
          onFocus={() => {
            searchName='ExamSearch'
            //  if(dataModel.class == null || dataModel.class == '' ){
            SearchUtils.functions.launchSuggestion(stateObject, '', 'ExamSearch')
            //  }
          }
          }
          onClear={() => {
            dataModel.exam = '';
            dataModel.examDescription = '';
            parentStateChange({ dataModel: dataModel })
          }}
          errorMessage={GeneralUtils.functions.getErrorMessage('field2', dataModel.exam, errorField, [], 'Exam')}
        />
      </View>
      <View style={[AppStyles.marginTop_1]}>
      <InputText
      tooltipReq={true}
      tooltipMsg={'Class will be defaulted from Exam selection'}
        required={true}
        editable={false}
        label={'Class'}
        secureTextEntry={false}
        onChangeText={text => {
          dataModel.classDescription = text
          parentStateChange({ dataModel: dataModel })
        }}
        value={dataModel.classDesc}
        errorMessage={GeneralUtils.functions.getErrorMessage('field1', dataModel.classDescription, errorField, [], 'Class')}
      />
      </View> */}
     {/*} <View style={[AppStyles.marginTop_1]}>
        <SuggestionTextInput
          tooltipReq={true}
          tooltipMsg={'Mention the class for which the exam is to be assessed.'}
          // tooltipStyle={styles.tooltipStyle}
          required={true}
          editable={false}
          label={'Class'}
          placeholder={'Select class'}
          secureTextEntry={false}
          value={dataModel.class}
          onFocus={() => {
            searchName='classDataModel'
            //  if(dataModel.class == null || dataModel.class == '' ){
            SearchUtils.functions.launchSuggestion(stateObject, '', 'class')
            //  }
          }
          }
          onClear={() => {
            dataModel.class = '';
            dataModel.classDesc = '';
            parentStateChange({ dataModel: dataModel })
          }}
          errorMessage={GeneralUtils.functions.getErrorMessage('field1', dataModel.class, errorField, [], 'Class')}
        />
        </View>*/}

 {/*}
        <NewScreenDropDownPicker
          tooltipReq={true}
          tooltipMsg={'Select the required exam which is to be assessed.'}
          // tooltipStyle={styles.tooltipStyle}
          editable={primaryKeyEditable}
          required={true}
          label={'Exam'}
          stateObject={stateObject}
          items={SelectListUtils.functions.selectMaster.ExamMaster}
          value={SelectListUtils.functions.getSelectedValue(SelectListUtils.functions.selectMaster.ExamMaster, dataModel.exam)}
          placeholder="Select Exam"
          onChangeValue={(value) => {
            dataModel.exam = value;
            parentStateChange({ dataModel: dataModel })
          }}
          dropdownName={'examDropdown'} 
            subHeadingRecordName = "an exam"
            onClear={() => {
              dataModel.exam= '';
              parentStateChange({ dataModel: dataModel })
            }}
          errorMessage={GeneralUtils.functions.getErrorMessage('field2', dataModel.exam, errorField, [], 'Exam')}
          />*/}
  {/*} <View style={[AppStyles.marginTop_1]}>
        <SuggestionTextInput
          tooltipReq={true}
          tooltipMsg={'Mention the exam is to be assessed.'}
          // tooltipStyle={styles.tooltipStyle}
          required={true}
          editable={primaryKeyEditable}
          label={'Exam'}
          placeholder={'Select Exam'}
          secureTextEntry={false}
          value={dataModel.examDesc}
          onFocus={() => {
            searchName='ExamSearch'
            //  if(dataModel.class == null || dataModel.class == '' ){
            SearchUtils.functions.launchSuggestion(stateObject, '', 'ExamSearch')
            //  }
          }
          }
          onClear={() => {
            dataModel.exam = '';
            dataModel.examDesc = '';
            parentStateChange({ dataModel: dataModel })
          }}
          errorMessage={GeneralUtils.functions.getErrorMessage('field2', dataModel.exam, errorField, [], 'Exam')}
        />
        </View>*/}
  

       
    

  






     {/*} <SuggestionList
        stateObject={stateObject}
        searchFieldName={stateObject.state.searchFieldName}
        searchText={stateObject.state.searchText}
        visible={stateObject.state.seachVisible}
        searchName={'classDataModel'}
        colHeading={['Class', 'Desc', 'Year/Standard', 'Major/Section']}
        mapping={['classCode', 'classDesc', 'standard', 'section']}
        SuggestionHeading={'Class'}
          />*/}

{/*<SuggestionList
          stateObject={stateObject}
          searchFieldName={stateObject.state.searchFieldName}
          searchText={stateObject.state.searchText}
          visible={stateObject.state.seachVisible}
          searchName={searchName}
          colHeading={searchName == 'classDataModel' ? ['Class', 'Desc', 'Year/Standard', 'Major/Section'] : ['Exam','Class Desc','Start Date','End Date']}
          mapping={searchName == 'classDataModel' ? ['classCode', 'classDesc','standard', 'section'] : ['examDescription','classDescription','startDate','endDate']}
          SuggestionHeading={searchName == 'classDataModel' ? 'Class' : 'Exam'}
         
        />  */} 

    </View>
    );
  }
}


const styles = StyleSheet.create({

})
export default ClassExamAssessmentGeneral;

