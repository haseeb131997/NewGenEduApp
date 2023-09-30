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
import { View, StyleSheet, Image, TouchableOpacity, ScrollView, LayoutAnimation, Platform, UIManager } from 'react-native';
import { TextInput, Title, Text, Subheading, Divider, Caption } from 'react-native-paper';
import AppStyles from "../../../../AppStyles/AppStyles";
import { UiColor } from "../../../../theme";
import InputText from '../../../../components/InputText';
import GeneralUtils from "../../../../utils/GeneralUtils";
import CustomCheckBox from '../../../../components/CustomCheckBox';
import CustomVideo from '../../../../components/CustomVideo';
import ImpNotes from '../../../../components/ImpNotes';
import UploadUtils from '../../../../utils/UploadUtils'
import CustomButtons from '../../../../components/CustomButtons';
import CustomYouTubeVideo from '../../../../components/CustomYouTubeVideo';
import { Tooltip } from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { h, w } from '../../../../utils/Dimensions';
import CustomLabel from '../../../../components/CustomLabel';

import Exception from '../../../../utils/Exception'









var uploadClickProcess = false

var videoId = ''

class VideoAssignmentContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    }
  }

  chooseOptions(type) {
    const {
      stateObject,
    } = this.props

    const { dataModel, editable, errorField } = stateObject.state
    const { parentStateChange, } = stateObject

    dataModel.URL = ''

    if (type == 'youTube') {
      stateObject.parentStateChange({
        youtubeOption: true,
        deviceOption: false,
        dataModel: dataModel
      })
    }
    else {
      stateObject.parentStateChange({
        deviceOption: true,
        youtubeOption: false,
        dataModel: dataModel
      })
    }

  }

  openDocument() {
    const { stateObject } = this.props;
    const { dataModel } = stateObject.state
    GeneralUtils.functions.contentPath = dataModel.URL
    stateObject.parentStateChange({
      showFullViewDoc: true
    })
  }



  uploadVideo = async (stateObject) => {
    if (uploadClickProcess == false) {
      uploadClickProcess = true
    }
    else {
      return true
    }
    try {
      await UploadUtils.functions.galleryVideoUpload(stateObject, 'videoFile', 0)
      uploadClickProcess = false
    }
    catch (error) {
      uploadClickProcess = false
      throw error
    }
  }


  setYouTubeUrl(url){
    const {
      stateObject,
      currentIndex
    } = this.props
    const { dataModel } = stateObject.state
    if( url == null || url == "" ){ }
else if (url.toLowerCase().includes("youtube") || url.toLowerCase().includes("youtu.be")){


dataModel.URL = GeneralUtils.functions.frameYoutubeURL(url);
stateObject.parentStateChange({ dataModel: dataModel })
  }

else {
// fn_Show_Exception_With_Param('FE-VAL-035', '');
Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-100', errorMessage: '', errorParam: '' }])
return false;
}
  }




  render() {
    const {
      stateObject,
      currentIndex
    } = this.props

    const { dataModel, editable, errorField } = stateObject.state
    const { parentStateChange, } = stateObject

    videoId = GeneralUtils.functions.getYouTubeCode(dataModel.URL)

   var fileType =   GeneralUtils.functions.getFileType(dataModel.URL)
  if(dataModel.URL != ''){
    if(fileType == 'mp4'){
      stateObject.state.deviceOption = true
      stateObject.state.youtubeOption = false
     } 
     else{
      stateObject.state.youtubeOption = true
      stateObject.state.deviceOption = false
     }
  }

    return (
      <View>


       {(stateObject.state.currentOperation == "Create" || stateObject.state.currentOperation == "Modification") && <View>
       {/* <View style={AppStyles.marginTop_2}>
          <View style={[AppStyles.flexDirectionRow,AppStyles.alignItems]}>
    <Text style={AppStyles.bold_600}>Choose any one of the video option <Text style={AppStyles.requiredStyle}>* </Text></Text>
      {<Tooltip
       overlayColor={UiColor.TRANSPARENT}
       containerStyle={[AppStyles.tooltipContainer,AppStyles.projection,styles.tooltip]}
       popover={<Caption>{'You can include video content through any one of the following two options. If you want to upload video from your device, click "Upload from device" option. If you want to link video from youtube, click "Paste youtube video link" & mention the link of the desired youtube video.'}</Caption>}>
        <AntDesign  name="questioncircle" size={AppStyles.tooltipIcn.height} color={UiColor.LIGHT_TEXT_COLOR} />
        </Tooltip>}
       </View>
        </View> */}


       <CustomLabel
        label={'Choose any one of the video option'}
        required={true}
         tooltipReq={true}
         tooltipMsg={'You can include video content through any one of the following two options. If you want to upload video from your device, click "Upload from device" option. If you want to link video from youtube, click "Paste youtube video link" & mention the link of the desired youtube video.'}
         tooltipStyle={styles.tooltip}
        template={
          <View>
            <View style={AppStyles.marginTop_2}>
          <CustomCheckBox
            label={'Upload from device'}
            onPress={() => this.chooseOptions('Device')}
            checked={stateObject.state.deviceOption}
            disabled={false}

          />
        </View>

        <View style={AppStyles.marginTop_2}>
          <CustomCheckBox
            label={'Paste youtube video link'}
            onPress={() => this.chooseOptions('youTube')}
            checked={stateObject.state.youtubeOption}
            disabled={false}

          />
        </View>

          </View>
        }
        errorMessage={GeneralUtils.functions.getErrorMessage('field5', dataModel.URL, errorField, [], 'Choose any one of the video option')}
      />

       
       </View>}


        { stateObject.state.deviceOption&& <View style={AppStyles.marginTop_2}>
          {(stateObject.state.currentOperation == "Create" || stateObject.state.currentOperation == "Modification") && <View style={AppStyles.flex_End}>
            <CustomButtons
              onPress={() => this.uploadVideo(stateObject)}
              title="Choose file"
              // titleStyle={AppStyles.signInTextStyle}
              buttonStyle={{ backgroundColor: UiColor.SKYBLUE }}
            />
          </View>}

          <CustomVideo
            openDocument={() => this.openDocument()}
            value={dataModel.URL}
            stateObject={stateObject}
            fileName={GeneralUtils.functions.getFileName(dataModel.URL)}
            fileType={GeneralUtils.functions.getFileType(dataModel.URL)}
            source={GeneralUtils.functions.getSource(dataModel.URL, stateObject)}
          />

          {(dataModel.URL == '') && <ImpNotes
            isArray={false}
            message={`Click 'Choose file' button to upload material. You can upload only 1 file. File size can be upto 10 GB.`}
          />}

        </View>}

        {((stateObject.state.currentOperation == "Create" || stateObject.state.currentOperation == "Modification") && stateObject.state.youtubeOption )&& <View style={AppStyles.marginTop_2}>
          <InputText
            required={false}
            editable={!editable}
            label={'Paste youtube video link here'}
            secureTextEntry={false}
            // onChangeText={text => {
            //   dataModel.URL = text
            //   parentStateChange({ dataModel: dataModel })
            // }}
            onChangeText={text => this.setYouTubeUrl(text)}
            value={dataModel.URL}
          // errorMessage={GeneralUtils.functions.getErrorMessage('field1', dataModel.assignmentID, errorField, [], 'Lesson ID')}
          />
          <CustomYouTubeVideo
            value={dataModel.URL}
            stateObject={stateObject}
            videoId={videoId}
          />
        </View>}

      </View>
    );
  }
}

const styles = StyleSheet.create({
tooltip:{
  height:h('40%'),width:w('50%')
}
})
export default VideoAssignmentContent;

