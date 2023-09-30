
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
import { View, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { w, h } from "../../../../utils/Dimensions";
import AppStyles from "../../../../AppStyles/AppStyles";
import GeneralUtils from "../../../../utils/GeneralUtils";
import SuggestionList from '../../../../components/SuggestionList';
import SuggestionTextInput from '../../../../components/SuggestionTextInput';
import SearchUtils from "../../../../utils/SearchUtils";





var searchName = 'rolePostSuggestion'

class EditClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    }
    this.postSuggestionListresultClick = this.postSuggestionListresultClick.bind(this)
  }



  postSuggestionListresultClick(data) {
    const { stateObject } = this.props
    const { dataModel, classEmptyrecord } = stateObject.state
    const { parentStateChange } = stateObject
    const dummyDatamodel = Object.assign({}, dataModel)
    switch (searchName) {
      case 'rolePostSuggestion':
        classEmptyrecord.roleID = data.roleID;
        break
      case 'classPostSuggestion':
        classEmptyrecord.class = data.classCode;
        break
    }
    parentStateChange({ dataModel: dummyDatamodel })
  }









  render() {
    const {
      stateObject
    } = this.props
    const { classEmptyrecord, editable, errorField } = stateObject.state
    const { parentStateChange } = stateObject

    return (
      <View style={AppStyles.marginTop_2}>
        <View >
          <SuggestionTextInput
            // tooltipReq={true}
            // tooltipMsg={'Mention the teacher incharge for this class.'}
            // tooltipStyle={styles.tooltipStyle}
            required={true}
            editable={editable}
            label={'Role ID'}
            placeholder={'Select role Id'}
            secureTextEntry={false}
            value={classEmptyrecord.roleID}
            onFocus={() => {
              searchName = 'rolePostSuggestion'
              SearchUtils.functions.launchSuggestion(stateObject, '', 'roleID')
            }
            }
            onClear={() => {
              classEmptyrecord.roleID = '';
              parentStateChange({ classEmptyrecord: classEmptyrecord })
            }}

            errorMessage={GeneralUtils.functions.getErrorMessage('field1', classEmptyrecord.roleID, errorField, [], 'Role ID')}
          />

        </View>
        <View style={[AppStyles.marginTop_1]}>
          <SuggestionTextInput
            required={true}
            editable={editable}
            label={'Class'}
            placeholder={'Select class'}
            secureTextEntry={false}
            value={classEmptyrecord.class}
            onFocus={() => {
              searchName = "classPostSuggestion"
              SearchUtils.functions.launchSuggestion(stateObject, '', 'class')
            }
            }
            onClear={() => {
              classEmptyrecord.class = '';
              parentStateChange({ classEmptyrecord: classEmptyrecord })
            }}

            errorMessage={GeneralUtils.functions.getErrorMessage('field2', classEmptyrecord.class, errorField, [], 'Class')}
          />
        </View>

        {/* <View style={[AppStyles.marginTop_1]}>
        <InputText
          required={false}
          editable={false}
          label={'Institute name'}
          value={classEmptyrecord.instituteName}
        />
      </View>

      <View style={[AppStyles.marginTop_1]}>
        <InputText
          required={false}
          editable={false}
          label={'Institute Id'}
          value={classEmptyrecord.instituteID}
        />
      </View> */}



        <SuggestionList
          stateObject={stateObject}
          searchFieldName={stateObject.state.searchFieldName}
          searchText={stateObject.state.searchText}
          visible={stateObject.state.seachVisible}
          searchName={searchName}
          colHeading={searchName == 'rolePostSuggestion' ? ['Role Id', 'Description'] : ['Class', 'Desc', 'Year/Standard', 'Major/Section']}
          mapping={searchName == 'rolePostSuggestion' ? ['roleDescription', 'roleID',] : ['classCode', 'classDesc', 'standard', 'section']}
          postSuggestionListresultClick={this.postSuggestionListresultClick}
          SuggestionHeading={searchName == 'rolePostSuggestion' ? 'Role Id' : 'Class'}

        />



      </View>
    );
  }
}


const styles = StyleSheet.create({
  tooltipStyle: {
    height: h('15%'), width: w('60%')
  }
})
export default EditClass;

