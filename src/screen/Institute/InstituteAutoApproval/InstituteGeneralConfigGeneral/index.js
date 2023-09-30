
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
import { View, StyleSheet, Platform, Image } from 'react-native';
import { Card, TextInput, Text, Title, Subheading } from 'react-native-paper';
import { w, h } from "../../../../utils/Dimensions";
import AppStyles from "../../../../AppStyles/AppStyles";
import { UiColor } from "../../../../theme";
import { httpUtils } from '../../../../utils/HttpUtils';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LogoModal from "../LogoModal"
import EditInstituteLogo from "../EditInstituteLogo"








class InstituteGeneralConfigGeneral extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    }
    this.onImageSubmit = this.onImageSubmit.bind(this)
  }


  onImageSubmit() {
    const {
      stateObject
    } = this.props
    const { parentStateChange } = stateObject
    stateObject.callbackend('editImage',null)
  }


  render() {
    const {
      stateObject
    } = this.props
    const { dataModel, ivas, nekot, uhtuliak } = stateObject.state
    const { parentStateChange } = stateObject

    return (
      <View>
        <Card>
          <Card.Content>
            <View style={AppStyles.row_space_between}>
              <Title>{stateObject.state.createStepsHeading[2]}</Title>
              <AntDesign onPress={() => parentStateChange({
                logoModalVisible: true
              })}
                name="edit" size={AppStyles.iconSize.height} color={AppStyles.inactiveMoreIcon.tintColor} />
            </View>

            <View style={AppStyles.marginTop_2}>
              <Image
                resizeMode="contain"
                source={typeof dataModel.profileImgPath == 'string' && dataModel.profileImgPath.includes('CohesiveUpload') ? { uri: `${httpUtils.FILE_URL()}${dataModel.profileImgPath}?ivas=${ivas}&nekot=${nekot}&uhtuliak=${uhtuliak}` } : httpUtils.DEFAULT_IMAGE_FILE_PATH()}
                style={[AppStyles.schoolLogo, AppStyles.alignSelf]}
              />
            </View>

            {/* <ImpNotes
           message={'Logo with Landscape orientation (i.e. width dimension larger than height dimension) fits well. For instance, images with the below dimensions (width x height) are good looking: \n \n \u2022 210 x 52 \n \u2022 128 x 78 \n \u2022 165 x 56 \n \n For instance, images with the below dimensions are not good looking \n \n \u2022 106 x 131'}
         /> */}
            <View style={AppStyles.marginTop_2} />
          </Card.Content>
        </Card>

        <LogoModal
          templates={<EditInstituteLogo stateObject={stateObject} />}
          stateObject={stateObject}
          title={'Edit'}
          subTitle={stateObject.state.createStepsHeading[2]}
          onSubmit={() => this.onImageSubmit()}
        />
      </View>
    );
  }
}


const styles = StyleSheet.create({

})
export default InstituteGeneralConfigGeneral;

