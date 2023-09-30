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
import { View, StyleSheet, Image, TouchableWithoutFeedback, ScrollView, Platform } from 'react-native';
import { TextInput, Card, Text, Divider, Caption } from 'react-native-paper';
import { w, h } from "../../../../utils/Dimensions";
import SelectListUtils from '../../../../utils/SelectListUtils'
import AppStyles from "../../../../AppStyles/AppStyles";
import InputText from '../../../../components/InputText';
import SuggestionTextInput from '../../../../components/SuggestionTextInput';
import SuggestionList from '../../../../components/SuggestionList';
import SearchUtils from "../../../../utils/SearchUtils";
import GeneralUtils from "../../../../utils/GeneralUtils";
import CustomSwitch from '../../../../components/CustomSwitch';









class EditAutoApprovalDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      // currentIndex: 1,
    }


  }




  render() {
    const {
      stateObject,
    } = this.props

    const { ServicesEmptyrecord } = stateObject.state
    const { parentStateChange } = stateObject



    return (
      <View>
        <View>
          <Caption style={[AppStyles.textColor]}>Menu Path</Caption>
          <Text>{ServicesEmptyrecord.serviceDescription}</Text>
        </View>
        <View style={AppStyles.marginTop_2}>
          <Caption style={[AppStyles.textColor]}>{'Auto Approval Status'}</Caption>
          <View style={AppStyles.marginTop_1}>
            <CustomSwitch
              label={'Auto Approval Status'}
              onPress={() => {
                ServicesEmptyrecord.status = !ServicesEmptyrecord.status;
                parentStateChange({ ServicesEmptyrecord: ServicesEmptyrecord })
              }}
              checked={ServicesEmptyrecord.status ? true : false}

            />
          </View>
        </View>


      </View>
    );
  }
}

const styles = StyleSheet.create({

})
export default EditAutoApprovalDetail;

