
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
import { View, StyleSheet,Platform,Image,TouchableOpacity } from 'react-native';
import AppStyles from "../../../../AppStyles/AppStyles";
import { httpUtils } from '../../../../utils/HttpUtils';
import ImpNotes from "../../../../components/ImpNotes"
import Entypo from 'react-native-vector-icons/Entypo';
import SelectBox from '../../../../components/SelectBox';
import UploadUtils from "../../../../utils/UploadUtils";






var uploadClickProcess = false

class EditInstituteLogo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    }
    this.uploadPhoto = this.uploadPhoto.bind(this)
    this.childStateChange = this.childStateChange.bind(this)
  }



  uploadPhoto = async (type)=>{
    const {
      stateObject
    } = this.props
    if (uploadClickProcess == false) {
      uploadClickProcess = true
    }
    else {
      return true
    }
    try{
      this.setState({
        visible: false
      })
      if (type == 'gallery') {
   await UploadUtils.functions.galleryImageUpload(stateObject, 'institutePhoto', 0)
      }
      else{
        await UploadUtils.functions.cameraImageUpload(stateObject, 'institutePhoto', 0)

      }
    uploadClickProcess = false
    }
    catch(error){
      uploadClickProcess = false
      throw error
    }
  }

  childStateChange(object) {
    this.setState(
      object
    );

  }

  render() {
    const {
      stateObject
    } = this.props
    const { dataModel, ivas,nekot,uhtuliak } = stateObject.state
    const { parentStateChange } = stateObject

    return (
      <View>
         <View style={AppStyles.flex_End}> 
         {/* <Title>{stateObject.state.createStepsHeading[2]}</Title> */}
       
         </View>

         <TouchableOpacity 
         onPress={() => this.setState({ visible: true })}
         style={[AppStyles.marginTop_1,AppStyles.editProfileImgContainer,AppStyles.alignSelf]}>
         <Image
           resizeMode="contain"
           source={typeof dataModel.profileImgPath == 'string' && dataModel.profileImgPath.includes('CohesiveUpload') ? { uri: `${httpUtils.FILE_URL()}${dataModel.profileImgPath}?ivas=${ivas}&nekot=${nekot}&uhtuliak=${uhtuliak}`  } : httpUtils.DEFAULT_IMAGE_FILE_PATH()}
           style={[AppStyles.schoolLogo,]}
           /> 
       <View style={AppStyles.editIconContainer}>
       <Entypo onPress={() => this.setState({ visible: true })}
        name="edit" size={AppStyles.iconSize.height} color={AppStyles.inactiveMoreIcon.tintColor} />
       </View>
         </TouchableOpacity>

         <ImpNotes
           message={'Logo with Landscape orientation (i.e. width dimension larger than height dimension) fits well. For instance, images with the below dimensions (width x height) are good looking: \n \n \u2022 210 x 52 \n \u2022 128 x 78 \n \u2022 165 x 56 \n \n For instance, images with the below dimensions are not good looking \n \n \u2022 106 x 131'}
         />
      <SelectBox
          stateObject={this}
          onChange={(type) => this.uploadPhoto(type)}
          visible={this.state.visible}
        />

      </View>
    );
  }
}


const styles = StyleSheet.create({

})
export default EditInstituteLogo;

