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
import { w, h } from "../../../../utils/Dimensions";
import AppStyles from "../../../../AppStyles/AppStyles";
import SearchUtils from "../../../../utils/SearchUtils";
import InputText from '../../../../components/InputText';
import GeneralUtils from "../../../../utils/GeneralUtils";
import SuggestionList from '../../../../components/SuggestionList';
import SuggestionTextInput from '../../../../components/SuggestionTextInput';










class ClassExamScheduleGeneral extends Component {
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
        editable={!primaryKeyEditable}
        label={'Exam ID'}
        secureTextEntry={false}
        onChangeText={text => {
          dataModel.exam = text
          parentStateChange({ dataModel: dataModel })
        }}
        value={dataModel.exam}
        errorMessage={GeneralUtils.functions.getErrorMessage('field1', dataModel.exam, errorField, [], 'Exam ID')}
      />

      <View style={AppStyles.marginTop_1}>
        <InputText
          required={true}
          editable={!editable}
          label={'Exam Decription'}
          secureTextEntry={false}
          multiline={true}
          onChangeText={text => {
            dataModel.examDescription = text
            parentStateChange({ dataModel: dataModel })
          }}
          value={dataModel.examDescription}
          errorMessage={GeneralUtils.functions.getErrorMessage('field2', dataModel.examDescription, errorField, [], 'Exam Decription')}
        />
      </View>

      <View style={[AppStyles.marginTop_1]}>
        <SuggestionTextInput
          // tooltipReq={true}
          // tooltipMsg={'Mention the teacher incharge for this class.'}
          // tooltipStyle={styles.tooltipStyle}
          required={true}
          editable={editable}
           label={'Class'}
           placeholder={'Select class'}
           secureTextEntry={false}
           value={dataModel.class}
          onFocus={()=>  
            { 
            //  if(dataModel.class == null || dataModel.class == '' ){
               SearchUtils.functions.launchSuggestion(stateObject,'', 'class')
            //  }
           }  
          }
          onClear={()=> { 
            dataModel.class = '';
            dataModel.classDesc = '';
            parentStateChange({ dataModel: dataModel })
           }}
          errorMessage={GeneralUtils.functions.getErrorMessage('field3', dataModel.class, errorField, [], 'Class')}
        />
      </View>
    


    
     


    

      <SuggestionList
        stateObject={stateObject}
        searchFieldName={stateObject.state.searchFieldName}
        searchText={stateObject.state.searchText}
        visible={stateObject.state.seachVisible}
        searchName={'classDataModel'}
        colHeading={['Class', 'Desc', 'Year/Standard', 'Major/Section']}
        mapping={['classCode', 'classDesc', 'standard', 'section']}
        SuggestionHeading={'Class'}
      /> 

    </View>
    );
  }
}


const styles = StyleSheet.create({
sectionStyle:{
  height:h('20%'),width:w('60%')
}
})
export default ClassExamScheduleGeneral;

