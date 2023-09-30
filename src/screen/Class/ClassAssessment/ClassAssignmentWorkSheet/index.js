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
import { View, StyleSheet,  Platform, } from 'react-native';
import {  Subheading } from 'react-native-paper';
//import SelectListUtils from '../../../../utils/SelectListUtils'
import AppStyles from "../../../../AppStyles/AppStyles";
//import { Avatar } from 'react-native-elements';
//import { httpUtils } from '../../../../utils/HttpUtils';
import GeneralUtils from "../../../../utils/GeneralUtils"
import DocumentCustom from '../../../../components/DocumentCustom';
import DownloadDocument from '../../../../components/DownloadDocument';
import Batch from "../../../../components/Batch";

// import FullViewDocument from '../../../../components/FullViewDocument';






class ClassAssignmentWorkSheet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      contentPath: '',
      showWebView: false
    }
    // this.openDocument = this.openDocument.bind(this)
  }




















  render() {
    const { stateObject, currentIndex } = this.props
    const { dataModel, editable, assessmentEmptyRecord } = stateObject.state




    return (
      <View>

        <View style={[AppStyles.marginTop_2]}>
          {assessmentEmptyRecord.workSheets.map((item, index) => (
            <View key={index.toString()} style={[AppStyles.marginTop_3]}>
              <View style={[AppStyles.flex_one]}>
                <Subheading style={[AppStyles.bold]}>{'Worksheet '}{index + 1}.</Subheading>
              </View>

              {(item.workSheetPath != '' && (GeneralUtils.functions.getFileType(item.workSheetPath) == 'pdf')) &&
                <DocumentCustom
                  openDocument={() => GeneralUtils.functions.openDocument(stateObject, item.workSheetPath)}
                  stateObject={stateObject}
                  source={GeneralUtils.functions.getSource(item.workSheetPath, stateObject)}
                  fileName={GeneralUtils.functions.getFileName(item.workSheetPath)}
                />}


              <View style={[AppStyles.flex_one, AppStyles.marginTop_2]}>
              {///N0U-106
              item.answerPath !=''? <Subheading style={[AppStyles.bold]}>{'Answer:'}</Subheading>
              :  
              <Batch
              value={'Not yet answered'}
              status={'E'}
            />}
              </View>


              {(item.answerPath != '' && (GeneralUtils.functions.getFileType(item.answerPath) == 'pdf')) &&
                <DocumentCustom
                  openDocument={() => GeneralUtils.functions.openDocument(stateObject, item.workSheetPath)}
                  stateObject={stateObject}
                  source={GeneralUtils.functions.getSource(item.answerPath, stateObject)}
                  fileName={GeneralUtils.functions.getFileName(item.answerPath)}
                />}
            </View>
          ))}
        </View>

        {(Platform.OS === 'android' && this.state.showWebView) && <DownloadDocument
          stateObject={stateObject}
          source={GeneralUtils.functions.getSource(GeneralUtils.functions.contentPath, stateObject)}
        />}
      </View>

    );
  }
}

const styles = StyleSheet.create({
})
export default ClassAssignmentWorkSheet;
