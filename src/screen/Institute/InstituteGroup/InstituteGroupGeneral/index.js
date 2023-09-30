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
import { View, StyleSheet, Image, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { TextInput, Card, Text, Avatar } from 'react-native-paper';
import { w, h } from "../../../../utils/Dimensions";
import AppStyles from "../../../../AppStyles/AppStyles";
import SelectListUtils from '../../../../utils/SelectListUtils'
import SearchUtils from "../../../../utils/SearchUtils";
import InputText from '../../../../components/InputText';
import GeneralUtils from "../../../../utils/GeneralUtils";
import NewScreenDropDownPicker from '../../../../components/NewScreenDropDownPicker';
import SuggestionList from '../../../../components/SuggestionList';
import SuggestionTextInput from '../../../../components/SuggestionTextInput';










class InstituteGroupGeneral extends Component {
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
        label={'Group ID'}
        secureTextEntry={false}
        onChangeText={text => {
          dataModel.groupID = text
          parentStateChange({ dataModel: dataModel })
        }}
        value={dataModel.groupID}
        errorMessage={GeneralUtils.functions.getErrorMessage('field1', dataModel.groupID, errorField, [], 'Group ID')}
      />
      <View style={AppStyles.marginTop_1}>
        <InputText
          required={true}
          editable={!editable}
          label={'Group Description'}
          secureTextEntry={false}
          multiline={true}
          onChangeText={text => {
            dataModel.groupDescription = text
            parentStateChange({ dataModel: dataModel })
          }}
          value={dataModel.groupDescription}
          errorMessage={GeneralUtils.functions.getErrorMessage('field2', dataModel.groupDescription, errorField, [], 'Class Decription')}
        />
      </View>

    </View>
    );
  }
}


const styles = StyleSheet.create({

})
export default InstituteGroupGeneral;

