
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
import { View, StyleSheet, Platform,TouchableOpacity } from 'react-native';
import AppStyles from "../../../../AppStyles/AppStyles";
import GeneralUtils from "../../../../utils/GeneralUtils";
import UploadUtils from '../../../../utils/UploadUtils'


import ImageDocumentView from '../../../../components/ImageDocumentView';
import { httpUtils } from '../../../../utils/HttpUtils';
import CustomButtons from '../../../../components/CustomButtons';
import ImpNotes from '../../../../components/ImpNotes';
import { UiColor } from "../../../../theme";
import CustomVideo from '../../../../components/CustomVideo';
import SelectDocumentBox from '../../../../components/SelectDocumentBox';








var uploadClickProcess = false


class EditActivityEventImages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    }
    this.uploadDocument = this.uploadDocument.bind(this)
    this.openDocument = this.openDocument.bind(this)

  }



  openDocument() {
    const { stateObject } = this.props;
    const { eventImagesEmptyrecord} = stateObject.state
    GeneralUtils.functions.contentPath = eventImagesEmptyrecord.imagePath
      stateObject.parentStateChange({
        showFullViewDoc: true
      })
  
  }


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
        await UploadUtils.functions.documentUpload(stateObject, 'enventImage', 0)
      }
      else {
        await UploadUtils.functions.galleryVideoUpload(stateObject, 'enventImage', 0)
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


 
  // uploadDocument = async () => {
  //   const {
  //     stateObject
  //   } = this.props
  //   if (uploadClickProcess == false) {
  //     uploadClickProcess = true
  //   }
  //   else {
  //     return true
  //   }
  //   try {
  //         await UploadUtils.functions.documentUpload(stateObject, 'enventImage', 0)
  //       uploadClickProcess = false
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
    const { eventImagesEmptyrecord,  errorField, nekot,
      ivas,
      uhtuliak } = stateObject.state
    const { parentStateChange } = stateObject

    const source = eventImagesEmptyrecord.imagePath.includes('objectstorage') ? { uri: eventImagesEmptyrecord.imagePath, cache: false } : { uri: `${httpUtils.FILE_URL()}${eventImagesEmptyrecord.imagePath}?ivas=${ivas}&nekot=${nekot}&uhtuliak=${uhtuliak}`, cache: false }

   
    var fileName

    if (eventImagesEmptyrecord.imagePath != '' && (eventImagesEmptyrecord.imagePath.includes('CohesiveUpload') || eventImagesEmptyrecord.imagePath.includes('objectstorage'))) {
      fileName = eventImagesEmptyrecord.imagePath.substring(eventImagesEmptyrecord.imagePath.lastIndexOf('/') + 1)
    }
    else {
      fileName = ''
    }

  


    var fileType = eventImagesEmptyrecord.imagePath.substring(eventImagesEmptyrecord.imagePath.lastIndexOf('.') + 1)


     console.log(eventImagesEmptyrecord.imagePath,"eventImagesEmptyrecord.imagePath")

    return (
      <View style={AppStyles.marginTop_2}>
       <View style={AppStyles.flex_End}>
          <CustomButtons
            onPress={() => this.setState({ visible: true })}
            title="Choose file"
            // titleStyle={AppStyles.signInTextStyle}
            buttonStyle={{ backgroundColor: UiColor.SKYBLUE }}
          />
        </View>

        {(eventImagesEmptyrecord.imagePath == '') && <ImpNotes
          isArray={false}
          message={`Click 'Choose file' button to upload event image/video. File size can be upto 10 GB. Only '.jpg', '.jpeg', '.png' & '.mp4' files can be uploaded.`}
        />}


        <ImageDocumentView
          openDocument={() => this.openDocument()}
          value={eventImagesEmptyrecord.imagePath} 
          stateObject={stateObject}
          fileName={fileName}
          fileType={fileType}
        />

      <CustomVideo
          openDocument={() => this.openDocument()}
          value={eventImagesEmptyrecord.imagePath}
          stateObject={stateObject}
          fileName={fileName}
          fileType={fileType}
          source={source}
        />


        <SelectDocumentBox
          stateObject={this}
          onChange={(type) => this.uploadDocument(type)}
          visible={this.state.visible}
        />

      </View>
    );
  }
}


const styles = StyleSheet.create({

})
export default EditActivityEventImages;

