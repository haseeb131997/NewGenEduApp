
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
import { Subheading } from 'react-native-paper';
import { w, h } from "../../../../utils/Dimensions";
import AppStyles from "../../../../AppStyles/AppStyles";
import GeneralUtils from "../../../../utils/GeneralUtils";
import InputText from '../../../../components/InputText';
import SelectBox from '../../../../components/SelectBox';
import { httpUtils } from '../../../../utils/HttpUtils';
import UploadUtils from '../../../../utils/UploadUtils'
import CustomCheckBox from '../../../../components/CustomCheckBox';
import Entypo from 'react-native-vector-icons/Entypo';
import InputTextArea from '../../../../components/InputTextArea';
import DocumentCustom from '../../../../components/DocumentCustom';
import CustomButtons from '../../../../components/CustomButtons';


import { UiColor } from "../../../../theme";
import ImpNotes from '../../../../components/ImpNotes';



var uploadClickProcess = false


class EditNotesDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    }

    this.childStateChange = this.childStateChange.bind(this)
    this.uploadDocument = this.uploadDocument.bind(this)
  }




  uploadDocument = async (stateObject) => {



    if (uploadClickProcess == false) {
      uploadClickProcess = true
    }
    else {
      return true
    }
    try {
      await UploadUtils.functions.documentUpload(stateObject, 'notesFile', 0, 0)
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



  render() {
    const {
      stateObject
    } = this.props
    const { notesDetailsEmptyrecord, editable, primaryKeyEditable, summaryDataModel, errorField } = stateObject.state
    const { parentStateChange } = stateObject

    return (
      <View style={AppStyles.marginTop_2}>

        <InputText
        tooltipReq={true}
        tooltipMsg={'Specify the Unit or Lesson Number'}
        tooltipStyle={styles.tooltipStyle}
          required={true}
          label={'Unit/Lesson'}
          secureTextEntry={false}
          onChangeText={text => {
            notesDetailsEmptyrecord.lesson = text
            parentStateChange({ notesDetailsEmptyrecord: notesDetailsEmptyrecord })
          }}
          value={notesDetailsEmptyrecord.lesson}
          errorMessage={GeneralUtils.functions.getErrorMessage('field1', notesDetailsEmptyrecord.lesson, errorField, [], 'Unit/Lesson')}
        />

        <InputText
        tooltipReq={true}
        tooltipMsg={'Specify the Section heading relevent to the lesson or unit'}
        tooltipStyle={styles.tooltipStyle}
          required={false}
          label={'Heading'}
          secureTextEntry={false}
          onChangeText={text => {
            notesDetailsEmptyrecord.heading = text
            parentStateChange({ notesDetailsEmptyrecord: notesDetailsEmptyrecord })
          }}
          value={notesDetailsEmptyrecord.heading}

        />

        <InputText
        tooltipReq={true}
        tooltipMsg={'Specify the Section sub heading relevent to the lesson or unit'}
        tooltipStyle={styles.tooltipStyle}
          required={false}
          label={'Sub Heading'}
          secureTextEntry={false}
          onChangeText={text => {
            notesDetailsEmptyrecord.subHeading = text
            parentStateChange({ notesDetailsEmptyrecord: notesDetailsEmptyrecord })
          }}
          value={notesDetailsEmptyrecord.subHeading}
        />


        <InputTextArea
          label={'Notes'}
          secureTextEntry={false}
          value={notesDetailsEmptyrecord.typeNotes}
          placeholder={'Enter notes'}
          onChangeText={text => {
            notesDetailsEmptyrecord.typeNotes = text
            parentStateChange({ notesDetailsEmptyrecord: notesDetailsEmptyrecord })
          }}

        />


        <Subheading style={AppStyles.bold_600}>{'Upload Document'}</Subheading>

        <View style={AppStyles.flex_End}>
          <CustomButtons
            onPress={() => this.uploadDocument(stateObject)}
            title="Choose file"
            // titleStyle={AppStyles.signInTextStyle}
            buttonStyle={{ backgroundColor: UiColor.SKYBLUE }}
          />
        </View>

        {(notesDetailsEmptyrecord.contentPath == '') && <ImpNotes
          isArray={false}
          message={`Click 'Choose file' button to upload notes. You can upload only 1 file. File size can be upto 10 GB. Only '.pdf' files can be uploaded.`}
        />}



        {(notesDetailsEmptyrecord.contentPath != '' && (GeneralUtils.functions.getFileType(notesDetailsEmptyrecord.contentPath) == 'pdf')) &&
          <DocumentCustom
            openDocument={() => GeneralUtils.functions.openDocument(stateObject, notesDetailsEmptyrecord.contentPath)}
            stateObject={stateObject}
            source={GeneralUtils.functions.getSource(notesDetailsEmptyrecord.contentPath, stateObject)}
            fileName={GeneralUtils.functions.getFileName(notesDetailsEmptyrecord.contentPath)}
          />}











        {/*   // start SHA002 */}
        <SelectBox
          stateObject={this}
          onChange={(type) => this.uploadPhoto(type)}
          visible={this.state.visible}
        />
        {/*   // end SHA002 */}


      </View>
    );
  }
}


const styles = StyleSheet.create({
  tooltipStyle: {
    height: h('15%'), width: w('60%')
  }
})
export default EditNotesDetail;

