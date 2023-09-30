
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
import { Avatar } from 'react-native-paper';
import { w, h } from "../../../../utils/Dimensions";
import AppStyles from "../../../../AppStyles/AppStyles";
import { UiColor } from "../../../../theme";
import InputTextArea from '../../../../components/InputTextArea';
import GeneralUtils from "../../../../utils/GeneralUtils";
import UploadUtils from '../../../../utils/UploadUtils'
import CustomButtons from '../../../../components/CustomButtons';
import ImpNotes from '../../../../components/ImpNotes';
import DocumentCustom from '../../../../components/DocumentCustom';
import CustomLabel from '../../../../components/CustomLabel';











var uploadClickProcess = false


class EditWorksheetDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      showWebView: false

    }


 this.uploadDocument = this.uploadDocument.bind(this)
  }






  uploadDocument = async (stateObject)=>{
    if (uploadClickProcess == false) {
      uploadClickProcess = true
    }
    else {
      return true
    }
    try{
   await UploadUtils.functions.documentUpload(stateObject, 'assignemntFile', 0,0)
    uploadClickProcess = false
    }
    catch(error){
      uploadClickProcess = false
      throw error
    }
  }










  render() {
    const {
      stateObject
    } = this.props
    const { worksheetsEmptyrecord, editable, primaryKeyEditable, summaryDataModel, errorField } = stateObject.state
    const { parentStateChange } = stateObject

    return (
      <View style={AppStyles.marginTop_2}>

        <InputTextArea
        required={true}
          editable={!editable}
          label={'Worksheet Description'}
          secureTextEntry={false}
          value={worksheetsEmptyrecord.workSheetDescription}
          placeholder={'Enter worksheet description'}
          onChangeText={text => {
            worksheetsEmptyrecord.workSheetDescription = text;
            parentStateChange({ worksheetsEmptyrecord: worksheetsEmptyrecord })
          }}
          errorMessage={GeneralUtils.functions.getErrorMessage('field1', worksheetsEmptyrecord.workSheetDescription, errorField, [], 'Worksheet Description')}
        />

        {<View style={AppStyles.flex_End}>
          <CustomButtons
            onPress={() => this.uploadDocument(stateObject)}
            title="Upload worksheet"
            // titleStyle={AppStyles.signInTextStyle}
            buttonStyle={{ backgroundColor: UiColor.SKYBLUE }}
          />
        </View>}


      <CustomLabel
         label={''}
         required={false}
         errorMessage={GeneralUtils.functions.getErrorMessage('field2',worksheetsEmptyrecord.workSheetPath, errorField, [], 'Worksheet')}
        />

        {(worksheetsEmptyrecord.workSheetPath != '' && (GeneralUtils.functions.getFileType(worksheetsEmptyrecord.workSheetPath) == 'pdf')) &&
          <DocumentCustom
           openDocument={() => GeneralUtils.functions.openDocument(stateObject,worksheetsEmptyrecord.workSheetPath)}
            stateObject={stateObject}
            source={GeneralUtils.functions.getSource(worksheetsEmptyrecord.workSheetPath, stateObject)}
            fileName={GeneralUtils.functions.getFileName(worksheetsEmptyrecord.workSheetPath)}
          />}

        {(worksheetsEmptyrecord.workSheetPath == '') && <ImpNotes
          isArray={false}
          message={`Click 'Choose file' button to upload worksheet. You can upload only 1 file. File size can be upto 10 GB.`}
        />}


      </View>
    );
  }
}


const styles = StyleSheet.create({
  tooltipStyle: {
    height: h('15%'), width: w('60%')
  }
})
export default EditWorksheetDetail;

