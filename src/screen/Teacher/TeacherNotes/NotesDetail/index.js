
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
import { Caption } from 'react-native-paper';
import { w, h } from "../../../../utils/Dimensions";
import AppStyles from "../../../../AppStyles/AppStyles";
import GeneralUtils from "../../../../utils/GeneralUtils";
import LabelText from '../../../../components/LabelText';
import DocumentCustom from '../../../../components/DocumentCustom';







class NotesDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    }

  }




  render() {
    const {
      stateObject
    } = this.props
    const { notesDetails, } = stateObject.state
    const { parentStateChange } = stateObject

    return (
      <View>


        <LabelText
          label={'Unit/Lesson'}
          value={notesDetails.lesson}
        />

        <LabelText
          label={'Heading'}
          value={notesDetails.heading}
        />

        <LabelText
          label={'Sub Heading'}
          value={notesDetails.subHeading}
        />



        <LabelText
          label={'Notes'}
          value={notesDetails.typeNotes}
        />

        <View style={AppStyles.marginTop_1}>
          <Caption style={[AppStyles.textColor, AppStyles.marginTop_1]}>Upload</Caption>


          {(notesDetails.contentPath != '' && (GeneralUtils.functions.getFileType(notesDetails.contentPath) == 'pdf')) &&
            <DocumentCustom
              openDocument={() => GeneralUtils.functions.openDocument(stateObject, notesDetails.contentPath)}
              stateObject={stateObject}
              source={GeneralUtils.functions.getSource(notesDetails.contentPath, stateObject)}
              fileName={GeneralUtils.functions.getFileName(notesDetails.contentPath)}
            />}


        </View>



      </View>
    );
  }
}


const styles = StyleSheet.create({
  tooltipStyle: {
    height: h('15%'), width: w('60%')
  }
})
export default NotesDetail;

