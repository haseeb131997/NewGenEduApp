
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
import { w, h } from "../../../../utils/Dimensions";
import GeneralUtils from "../../../../utils/GeneralUtils";
import InputText from '../../../../components/InputText';
import InputTextArea from '../../../../components/InputTextArea';
import AppStyles from "../../../../AppStyles/AppStyles";
import { UiColor } from "../../../../theme";
import ImpNotes from '../../../../components/ImpNotes';
import { DataTable } from 'react-native-paper';






class NotificationTemplateSample extends Component {
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
    const { dataModel, } = stateObject.state
    const { parentStateChange } = stateObject


    return (
      <View style={AppStyles.flex_one}>
        {(dataModel.sampleMessage != '' && dataModel.sampleMessage != null) ? <Image
          resizeMode='contain'
          source={{ uri: dataModel.sampleMessage }}
          style={styles.sampleStyle}
        /> : null}

      </View>
    );
  }
}


const styles = StyleSheet.create({
  sampleStyle: {
    width: w('90%'), height: h('50%') 
  }
})
export default NotificationTemplateSample;

