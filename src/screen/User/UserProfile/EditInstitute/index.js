
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
import InputText from '../../../../components/InputText';





var searchName = 'rolePostSuggestion'

class EditInstitute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    }
    this.postSuggestionListresultClick = this.postSuggestionListresultClick.bind(this)
  }



  postSuggestionListresultClick(data) {
    const { stateObject } = this.props
    const { dataModel, instituteEmptyrecord } = stateObject.state
    const { parentStateChange } = stateObject
    const dummyDatamodel = Object.assign({}, dataModel)
    switch (searchName) {
      case 'rolePostSuggestion':
        instituteEmptyrecord.roleID = data.roleID;
        break
      // case 'institutePostSuggestion':
      // instituteEmptyrecord.instituteName = data.instituteName;
      // instituteEmptyrecord.instituteID = data.instituteID;
      // break  
    }
    parentStateChange({ dataModel: dummyDatamodel })
  }









  render() {
    const {
      stateObject
    } = this.props
    const { instituteEmptyrecord, editable, errorField } = stateObject.state
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
            value={instituteEmptyrecord.roleID}
            onFocus={() => {
              searchName = 'rolePostSuggestion'
              SearchUtils.functions.launchSuggestion(stateObject, '', 'roleID')
            }
            }
            onClear={() => {
              instituteEmptyrecord.roleID = '';
              parentStateChange({ instituteEmptyrecord: instituteEmptyrecord })
            }}

            errorMessage={GeneralUtils.functions.getErrorMessage('field1', instituteEmptyrecord.roleID, errorField, [], 'Role ID')}
          />

        </View>
       
        {/* <View style={[AppStyles.marginTop_1]}>
        <InputText
          required={false}
          editable={false}
          label={'Institute name'}
          value={instituteEmptyrecord.instituteName}
        />
      </View>

      <View style={[AppStyles.marginTop_1]}>
        <InputText
          required={false}
          editable={false}
          label={'Institute Id'}
          value={instituteEmptyrecord.instituteID}
        />
      </View> */}



        <SuggestionList
          stateObject={stateObject}
          searchFieldName={stateObject.state.searchFieldName}
          searchText={stateObject.state.searchText}
          visible={stateObject.state.seachVisible}
          searchName={searchName}
          searchName={'rolePostSuggestion'}
          colHeading={['Role Id', 'Description']}
          mapping={['roleDescription', 'roleID']}
          postSuggestionListresultClick={this.postSuggestionListresultClick}
          SuggestionHeading={'Role Id'}
        />



      </View>
    );
  }
}


const styles = StyleSheet.create({

})
export default EditInstitute;

