
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
import AppStyles from "../../../../AppStyles/AppStyles";
import GeneralUtils from "../../../../utils/GeneralUtils";
import InputText from '../../../../components/InputText';






class StudentAddressDetail extends Component {
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
      <View style={AppStyles.marginTop_2}>
        <InputText
          required={false}
          editable={!editable}
          label={'Address Line 1'}
          secureTextEntry={false}
          onChangeText={text => {
            dataModel.general.address.addressLine1 = text
            parentStateChange({ dataModel: dataModel })
          }}
          value={dataModel.general.address.addressLine1}
          errorMessage={GeneralUtils.functions.getErrorMessage('field1', dataModel.general.address.addressLine1, errorField, [], 'Address Line 1')}
        />

<InputText
          required={false}
          editable={!editable}
          label={'Address Line 2'}
          secureTextEntry={false}
          onChangeText={text => {
            dataModel.general.address.addressLine2 = text
            parentStateChange({ dataModel: dataModel })
          }}
          value={dataModel.general.address.addressLine2}
          errorMessage={GeneralUtils.functions.getErrorMessage('field1', dataModel.general.address.addressLine2, errorField, [], 'Address Line 2')}
        />

<InputText
          required={false}
          editable={!editable}
          label={'Address Line 3'}
          secureTextEntry={false}
          onChangeText={text => {
            dataModel.general.address.addressLine3 = text
            parentStateChange({ dataModel: dataModel })
          }}
          value={dataModel.general.address.addressLine3}
          errorMessage={GeneralUtils.functions.getErrorMessage('field1', dataModel.general.address.addressLine3, errorField, [], 'Address Line 3')}
        />
        <InputText
          required={false}
          editable={!editable}
          label={'Address Line 4'}
          secureTextEntry={false}
          onChangeText={text => {
            dataModel.general.address.addressLine4 = text
            parentStateChange({ dataModel: dataModel })
          }}
          value={dataModel.general.address.addressLine4}
          errorMessage={GeneralUtils.functions.getErrorMessage('field1', dataModel.general.address.addressLine4, errorField, [], 'Address Line 4')}
        />

<InputText
          required={false}
          editable={!editable}
          label={'Address Line 5'}
          secureTextEntry={false}
          onChangeText={text => {
            dataModel.general.address.addressLine5 = text
            parentStateChange({ dataModel: dataModel })
          }}
          value={dataModel.general.address.addressLine5}
          errorMessage={GeneralUtils.functions.getErrorMessage('field1', dataModel.general.address.addressLine5, errorField, [], 'Address Line 5')}
        />

        

      </View>
    );
  }
}


const styles = StyleSheet.create({

})
export default StudentAddressDetail;

