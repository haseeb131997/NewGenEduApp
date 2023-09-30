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
import { View, StyleSheet } from 'react-native';

import InputText from '../../../../components/InputText';
import GeneralUtils from "../../../../utils/GeneralUtils";
import NewScreenDropDownPicker from '../../../../components/NewScreenDropDownPicker';
import SelectListUtils from '../../../../utils/SelectListUtils'
import InputTextArea from '../../../../components/InputTextArea';
import ImpNotes from '../../../../components/ImpNotes';
import { UiColor } from "../../../../theme";
import CustomButtons from '../../../../components/CustomButtons';
import AppStyles from "../../../../AppStyles/AppStyles";
import ImageDocumentView from '../../../../components/ImageDocumentView';
import UploadUtils from '../../../../utils/UploadUtils'



var uploadClickProcess = false



class EditOptionsDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      // currentIndex: 1,
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
   await UploadUtils.functions.documentUpload(stateObject, 'questionImg', 0)
    uploadClickProcess = false
    }
    catch(error){
      uploadClickProcess = false
      throw error
    }
  }







  render() {
    const {
      stateObject,
      currentIndex
    } = this.props

    const { dataModel, editable, errorField, optionsEmptyRecord } = stateObject.state
    const { parentStateChange } = stateObject

    return (
      <View>
     


     
    
       <InputText
          required={true}
          label={'Option'}
          secureTextEntry={false}
          onChangeText={text => {
            optionsEmptyRecord.option = text
            parentStateChange({ optionsEmptyRecord: optionsEmptyRecord })
          }}
          value={optionsEmptyRecord.option}
          errorMessage={GeneralUtils.functions.getErrorMessage('field1', optionsEmptyRecord.option, errorField, [], 'Option')}
        />

        

        <View style={AppStyles.flex_End}>
          <CustomButtons
            onPress={() => this.uploadDocument(stateObject)}
            title="Choose file"
            // titleStyle={AppStyles.signInTextStyle}
            buttonStyle={{ backgroundColor: UiColor.SKYBLUE }}
          />
        </View>

        <ImageDocumentView
          openDocument={() => GeneralUtils.functions.openDocument(stateObject,optionsEmptyRecord.optionImagePath)}
          value={optionsEmptyRecord.optionImagePath} 
          stateObject={stateObject}
          fileName={GeneralUtils.functions.getFileName(optionsEmptyRecord.optionImagePath)}
          fileType={GeneralUtils.functions.getFileType(optionsEmptyRecord.optionImagePath)}
        />
     

        {(optionsEmptyRecord.optionImagePath == '') && <ImpNotes
          isArray={false}
          message={`Click 'Choose file' button to upload image for the answer option. You can upload only 1 file. File size can be upto 10 GB. Only '.pdf' files can be uploaded.`}
        />}





      </View>
    );
  }
}

const styles = StyleSheet.create({

})
export default EditOptionsDetails;

