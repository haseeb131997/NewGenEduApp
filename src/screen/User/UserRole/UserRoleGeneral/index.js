
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
import { View, StyleSheet, Platform } from 'react-native';
import { TextInput } from 'react-native-paper';
import { w, h } from "../../../../utils/Dimensions";
import AppStyles from "../../../../AppStyles/AppStyles";
import SelectListUtils from '../../../../utils/SelectListUtils'
import { UiColor } from "../../../../theme";
import InputText from '../../../../components/InputText';
import GeneralUtils from "../../../../utils/GeneralUtils";







class UserRoleGeneral extends Component {
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
    const { dataModel, editable, primaryKeyEditable, summaryDataModel, errorField } = stateObject.state
    const { parentStateChange } = stateObject

    return (
      <View>
        <InputText
        required={true}
        editable={!primaryKeyEditable}
        label={'Role ID'}
        secureTextEntry={false}
        onChangeText={text => {
          dataModel.roleID = text
          parentStateChange({ dataModel: dataModel })
        }}
        value={dataModel.roleID}
        errorMessage={GeneralUtils.functions.getErrorMessage('field1', dataModel.roleID, errorField, [], 'Role ID')}
      />

      <View style={AppStyles.marginTop_1}>
        <InputText
          required={true}
          editable={!editable}
          label={'Role Description'}
          secureTextEntry={false}
          multiline={true}
          onChangeText={text => {
            dataModel.roleDescription = text
            parentStateChange({ dataModel: dataModel })
          }}
          value={dataModel.roleDescription}
          errorMessage={GeneralUtils.functions.getErrorMessage('field2', dataModel.roleDescription, errorField, [], 'Role Description')}
        />
      </View>


      </View>
    );
  }
}


const styles = StyleSheet.create({

})
export default UserRoleGeneral;

