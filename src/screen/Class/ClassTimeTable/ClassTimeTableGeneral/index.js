
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
import { View, StyleSheet,Platform } from 'react-native';
import { TextInput } from 'react-native-paper';
import { w, h } from "../../../../utils/Dimensions";
import AppStyles from "../../../../AppStyles/AppStyles";
import SelectListUtils from '../../../../utils/SelectListUtils'
import { UiColor } from "../../../../theme";
import SuggestionTextInput from '../../../../components/SuggestionTextInput';
import SuggestionList from '../../../../components/SuggestionList';
import GeneralUtils from "../../../../utils/GeneralUtils";
import SearchUtils from "../../../../utils/SearchUtils";
import LabelText from '../../../../components/LabelText';





class ClassTimeTableGeneral extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    }
  }



  render() {
    const {
      stateObject
    } = this.props
    const { dataModel, editable, primaryKeyEditable, summaryDataModel,errorField } = stateObject.state
    const { parentStateChange } = stateObject

    return (stateObject.state.currentOperation == 'Create' || stateObject.state.currentOperation == 'Modification' ) ? (
      <View style={AppStyles.marginTop_2}>


        <SuggestionTextInput
          tooltipReq={true}
          tooltipMsg={' Mention the class for which the timetable is to be created'}
          // tooltipStyle={styles.tooltipStyle}
          required={true}
          editable={primaryKeyEditable}
           label={'Class'}
           placeholder={'Select class'}
           secureTextEntry={false}
           value={dataModel.class}
          onFocus={()=> SearchUtils.functions.launchSuggestion(stateObject,'', 'class')}
          onClear={()=> { 
            dataModel.class = '';
            dataModel.classDesc = '';
            parentStateChange({ dataModel: dataModel })
           }}
           errorMessage={GeneralUtils.functions.getErrorMessage('field1',dataModel.class,errorField,[],'Class')}
        />

          <SuggestionList
           stateObject={stateObject}
           searchFieldName={stateObject.state.searchFieldName}
           searchText={stateObject.state.searchText}
           visible={stateObject.state.seachVisible}
           searchName={'classDataModel'}
           colHeading={['Class', 'Desc','Year/Standard','Major/Section']}
           mapping={['classCode', 'classDesc','standard','section']}
           SuggestionHeading={'Class'}

         />
      </View>
    ) : (<View>
      <LabelText
                label={'Class'}
                value={dataModel.class}
              />
    </View>);
  }
}


const styles = StyleSheet.create({

})
export default ClassTimeTableGeneral;

