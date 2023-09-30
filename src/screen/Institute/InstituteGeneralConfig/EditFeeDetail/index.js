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
import { View, StyleSheet} from 'react-native';
import InputText from '../../../../components/InputText';
import GeneralUtils from "../../../../utils/GeneralUtils";







var searchName = 'studentPostSuggestion'


class EditSubjectDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      // currentIndex: 1,
    }

  }




  render() {
    const {
      stateObject,
      currentIndex
    } = this.props

    const { FeeTypeMasterEmptyrecord, editable, errorField } = stateObject.state
    const { parentStateChange } = stateObject
    var currentInd = 0
 


    return (
      <View>
       <InputText
        required={true}
        // editable={!primaryKeyEditable}
        label={'Type'}
        secureTextEntry={false}
        onChangeText={text => {
          FeeTypeMasterEmptyrecord.feeType = text
          parentStateChange({ FeeTypeMasterEmptyrecord: FeeTypeMasterEmptyrecord })
        }}
        value={FeeTypeMasterEmptyrecord.feeType}
        errorMessage={GeneralUtils.functions.getErrorMessage('field4', FeeTypeMasterEmptyrecord.feeType, errorField, [], 'Type')}
      />

       <InputText
        required={true}
        // editable={!primaryKeyEditable}
        label={'Description (in english)'}
        secureTextEntry={false}
        onChangeText={text => {
          FeeTypeMasterEmptyrecord.feeDescription = text
          parentStateChange({ FeeTypeMasterEmptyrecord: FeeTypeMasterEmptyrecord })
        }}
        value={FeeTypeMasterEmptyrecord.feeDescription}
        errorMessage={GeneralUtils.functions.getErrorMessage('field5', FeeTypeMasterEmptyrecord.feeDescription, errorField, [], 'Description (in english)')}
      />

        <InputText
        required={false}
        // editable={!primaryKeyEditable}
        label={'Description (in local language)'}
        secureTextEntry={false}
        onChangeText={text => {
          FeeTypeMasterEmptyrecord.otherLangDescription = text
          parentStateChange({ FeeTypeMasterEmptyrecord: FeeTypeMasterEmptyrecord })
        }}
        value={FeeTypeMasterEmptyrecord.otherLangDescription}
        // errorMessage={GeneralUtils.functions.getErrorMessage('field6', FeeTypeMasterEmptyrecord.otherLangDescription, errorField, [], 'Description (in local language)')}
      />
      </View>
    );
  }
}

const styles = StyleSheet.create({

})
export default EditSubjectDetail;

