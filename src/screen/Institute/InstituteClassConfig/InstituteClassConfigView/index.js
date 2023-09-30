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
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { TextInput, Card, Text, Modal, Title, Subheading, Caption } from 'react-native-paper';
import { w, h } from "../../../../utils/Dimensions";
import SelectListUtils from '../../../../utils/SelectListUtils'
import AppStyles from "../../../../AppStyles/AppStyles";
import CustomDropDownPicker from '../../../../components/CustomDropDownPicker';

import { UiColor } from "../../../../theme";

import LabelText from '../../../../components/LabelText';




class InstituteClassConfigView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    }
  }



  render() {
    const {
      stateObject
    } = this.props
    const { summaryDataModel, dataModel,currentOperation} = stateObject.state
    const { parentStateChange } = stateObject
    return (
      <View >
        <Card.Content>
          {/* <View style={AppStyles.alignItems}>
            <Title style={{ color: UiColor.SKYBLUE }}>{'2021'}</Title>
            <Caption >{'Academic Year'}</Caption>
          </View> */}
          {currentOperation == "Authorisation" && <View>
              <LabelText
                label={'Class Code'}
                value={dataModel.Class}
              />
            </View>}
          {/* <View style={[AppStyles.row_space_between]}> */}
            <View>
              <LabelText
                label={'Class Description'}
                value={dataModel.ClassDesc}
              />
            </View>
            <View>
              <LabelText
                label={'Teacher Name'}
                value={dataModel.teacherName}
              />
            </View>
            <View>
              <LabelText
                label={'Teacher ID'}
                value={dataModel.teacherID}
              />
            </View>
            <View>
              <LabelText
                label={'Year/Standard'}
                value={dataModel.Standard}
              />
            </View>
            <View>
              <LabelText
                label={'Section/Department/Major'}
                value={dataModel.Section}
              />
            </View>
            <View>
              <LabelText
                label={'Attendance'}
                value={SelectListUtils.functions.getSelectedValue(SelectListUtils.functions.selectMaster.AttendanceMaster, dataModel.attendance)}
              />
            </View>
          {/* </View> */}
        </Card.Content>
      </View>

    );
  }
}


export default InstituteClassConfigView;

