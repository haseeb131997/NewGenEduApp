
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
import AppStyles from "../../../../AppStyles/AppStyles";
import { UiColor } from "../../../../theme";
import DocumentCustom from '../../../../components/DocumentCustom';
import GeneralUtils from "../../../../utils/GeneralUtils";
import UploadUtils from '../../../../utils/UploadUtils'
import CustomButtons from '../../../../components/CustomButtons';
import ImpNotes from '../../../../components/ImpNotes';









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
   await UploadUtils.functions.documentUpload(stateObject, 'answerAssignemntFile', 0)
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
    const { worksheetsEmptyrecord } = stateObject.state
    const { parentStateChange } = stateObject

  
    return (
      <View style={AppStyles.marginTop_2}>
        {<View style={AppStyles.flex_End}>
          <CustomButtons
            onPress={() => this.uploadDocument(stateObject)}
            title="Choose file"
            // titleStyle={AppStyles.signInTextStyle}
            buttonStyle={{ backgroundColor: UiColor.SKYBLUE }}
          />
        </View>}

        {(worksheetsEmptyrecord.answerPath != '' && (GeneralUtils.functions.getFileType(worksheetsEmptyrecord.answerPath) == 'pdf')) &&
          <DocumentCustom
           openDocument={() => GeneralUtils.functions.openDocument(stateObject, worksheetsEmptyrecord.answerPath)}
            stateObject={stateObject}
            source={GeneralUtils.functions.getSource(worksheetsEmptyrecord.answerPath, stateObject)}
            fileName={GeneralUtils.functions.getFileName(worksheetsEmptyrecord.answerPath)}
          />}

        {(worksheetsEmptyrecord.answerPath == '') && <ImpNotes
          isArray={false}
          message={`Click 'Choose file' button to upload worksheet. You can upload only 1 file. File size can be upto 10 GB.`}
        />}


      </View>
    );
  }
}


const styles = StyleSheet.create({
 
})
export default EditWorksheetDetail;

