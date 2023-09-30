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
import { View, StyleSheet, Platform, UIManager } from 'react-native';
import AppStyles from "../../../../AppStyles/AppStyles";
import { UiColor } from "../../../../theme";

import CustomButtons from '../../../../components/CustomButtons';
import UploadUtils from '../../../../utils/UploadUtils'
import { httpUtils } from '../../../../utils/HttpUtils';
import DocumentCustom from '../../../../components/DocumentCustom';
import ImpNotes from '../../../../components/ImpNotes';
import DownloadDocument from '../../../../components/DownloadDocument';
import GeneralUtils from "../../../../utils/GeneralUtils";



var uploadClickProcess = false

class StudentEcircularContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      showWebView:false
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
   await UploadUtils.functions.documentUpload(stateObject, 'ducuentFile', 0)
    uploadClickProcess = false
    }
    catch(error){
      uploadClickProcess = false
      throw error
    }
  }



 
  // uploadDocument = async (stateObject) => {
  //   if (uploadClickProcess == false) {
  //     uploadClickProcess = true
  //   }
  //   else {
  //     return true
  //   }
  //   try {
  //     await UploadUtils.functions.documentUpload(stateObject, 'ducuentFile', 0)
  //     uploadClickProcess = false
  //   }
  //   catch (error) {
  //     uploadClickProcess = false
  //     throw error
  //   }
  // }


  render() {
    const {
      stateObject
    } = this.props
    const { dataModel, editable,
      nekot,
      ivas,
      uhtuliak } = stateObject.state
    const { parentStateChange } = stateObject


    const source = dataModel.contentPath.includes('objectstorage') ? { uri: dataModel.contentPath, cache: false } : { uri: `${httpUtils.FILE_URL()}${dataModel.contentPath}?ivas=${ivas}&nekot=${nekot}&uhtuliak=${uhtuliak}`, cache: false }
  


    var fileName

    if (dataModel.contentPath != '' && (dataModel.contentPath.includes('CohesiveUpload') || dataModel.contentPath.includes('objectstorage'))) {
      fileName = dataModel.contentPath.substring(dataModel.contentPath.lastIndexOf('/') + 1)
    }
    else {
      fileName = ''
    }

  


    var fileType = dataModel.contentPath.substring(dataModel.contentPath.lastIndexOf('.') + 1)



    return (
      <View>
       {(stateObject.state.currentOperation == "Create" || stateObject.state.currentOperation == "Modification" ) &&<View style={AppStyles.flex_End}>
          <CustomButtons
            onPress={() => this.uploadDocument(stateObject)}
            title="Choose file"
            // titleStyle={AppStyles.signInTextStyle}
            buttonStyle={{ backgroundColor: UiColor.SKYBLUE }}
          />
        </View>}

        {(dataModel.contentPath == '') && <ImpNotes
          isArray={false}
          message={`Click 'Choose file' button to upload eCircular. You can upload only 1 file. File size can be upto 10 GB. Only '.pdf' files can be uploaded.`}
        />}



        {(dataModel.contentPath != '' && (fileType == 'pdf')) &&
          <DocumentCustom
          openDocument={() =>  GeneralUtils.functions.openDocument(stateObject, dataModel.contentPath)}
            stateObject={stateObject}
            source={source}
            fileName={fileName}
          />}

       

        {(Platform.OS === 'android' && this.state.showWebView) && <DownloadDocument
          stateObject={stateObject}
          source={source}
        />}
      </View>
    );
  }
}

const styles = StyleSheet.create({

})
export default StudentEcircularContent;

