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
import DocumentView from '../../../../components/DocumentView';
import ImpNotes from '../../../../components/ImpNotes';
import SelectDocumentBox from '../../../../components/SelectDocumentBox';
import DownloadDocument from '../../../../components/DownloadDocument';
import ImageDocumentView from '../../../../components/ImageDocumentView';
import CustomVideo from '../../../../components/CustomVideo';
import GeneralUtils from "../../../../utils/GeneralUtils";





var uploadClickProcess = false


class StudyMaterialContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      downLoadDocument:false
    }
    this.uploadDocument = this.uploadDocument.bind(this)
    // this.uploadPhoto = this.uploadPhoto.bind(this)
    this.childStateChange = this.childStateChange.bind(this)
    // this.openDocument = this.openDocument.bind(this)
  }



  // openDocument() {
  //   const { stateObject } = this.props;
  //   const { dataModel} = stateObject.state




  //   var fileType = dataModel.contentPath.substring(dataModel.contentPath.lastIndexOf('.') + 1)

  
  //   if (Platform.OS === 'ios') {
  //     GeneralUtils.functions.contentPath = dataModel.contentPath
  //     stateObject.parentStateChange({
  //       showFullViewDoc: true
  //     })
  //   }
  //   else {
  //     if(fileType == 'pdf' || fileType == 'png' || fileType == 'PNG' || fileType == 'jpg' ||  fileType == 'JPG' || fileType == 'jpeg' || fileType == 'JPEG' || fileType == 'mp4') {
  //       GeneralUtils.functions.contentPath = dataModel.contentPath
  //       stateObject.parentStateChange({
  //         showFullViewDoc: true
  //       })
  //     }
  //    else{
  //     GeneralUtils.functions.contentPath = dataModel.contentPath
  //     this.setState({
  //       downLoadDocument: true
  //     })
  //     setTimeout(function () {
  //       this.setState({ downLoadDocument: false })
  //     }.bind(this), 3000)
  //    }
  //   }
  // }



  uploadDocument = async (type) => {
    const {
      stateObject
    } = this.props

    if (uploadClickProcess == false) {
      uploadClickProcess = true
    }
    else {
      return true
    }
    try {
      this.setState({
        visible: false
      })
      if (type == 'document') {
        await UploadUtils.functions.documentUpload(stateObject, 'ducuentFile', 0)
      }
      else {
        await UploadUtils.functions.galleryVideoUpload(stateObject, 'ducuentFile', 0)
      }

      uploadClickProcess = false
    }
    catch (error) {
      uploadClickProcess = false
      throw error
    }
  }



  childStateChange(object) {
    this.setState(
      object
    );
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
    // const source = { uri: 'http://www.africau.edu/images/default/sample.pdf', cache: false } 


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
            onPress={() => this.setState({ visible: true })}
            title="Choose file"
            // titleStyle={AppStyles.signInTextStyle}
            buttonStyle={{ backgroundColor: UiColor.SKYBLUE }}
          />
        </View>}

        {(dataModel.contentPath == '') && <ImpNotes
          isArray={false}
          message={`Click 'Choose file' button to upload material. You can upload only 1 file. File size can be upto 10 GB.`}
        />}



        {(dataModel.contentPath != '' && (fileType == 'pdf')) &&
          <DocumentCustom
          openDocument={() => GeneralUtils.functions.openDocument(stateObject,dataModel.contentPath)}
            stateObject={stateObject}
            source={source}
            fileName={fileName}
          />}

        <DocumentView
          openDocument={() => GeneralUtils.functions.openDocument(stateObject,dataModel.contentPath)}
          value={dataModel.contentPath}
          stateObject={stateObject}
          fileName={fileName}
          fileType={fileType}
        />


         <ImageDocumentView
          openDocument={() => GeneralUtils.functions.openDocument(stateObject,dataModel.contentPath)}
          value={dataModel.contentPath} 
          stateObject={stateObject}
          fileName={fileName}
          fileType={fileType}
        />
         <CustomVideo
          openDocument={() => GeneralUtils.functions.openDocument(stateObject,dataModel.contentPath)}
          value={dataModel.contentPath}
          // value={' '}
          stateObject={stateObject}
          fileName={fileName}
          fileType={fileType}
          // fileType={'mp4'}
          source={source}
        />


         <SelectDocumentBox
          stateObject={this}
          onChange={(type) => this.uploadDocument(type)}
          visible={this.state.visible}
        />
      
        {(Platform.OS === 'android' && stateObject.state.downLoadDocument) && <DownloadDocument
          stateObject={stateObject}
          source={source}
        />}
      </View>
    );
  }
}

const styles = StyleSheet.create({

})
export default StudyMaterialContent;

