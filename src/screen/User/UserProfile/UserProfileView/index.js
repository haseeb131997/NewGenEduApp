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




class UserProfileView extends Component {
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
    const { summaryDataModel, dataModel, currentOperation } = stateObject.state
    const { parentStateChange } = stateObject
    return (
      <View >
        <Card.Content>
        

            <LabelText
              label={'User name'}
              value={dataModel.userName}
            />

            <LabelText
              label={'User ID'}
              value={dataModel.userID}
            />

            <LabelText
              label={'Password'}
              value={dataModel.password}
            />
            <LabelText
              label={'Expiry date'}
              value={dataModel.expiryDate}
            />

            <LabelText
              label={'User Type'}
              value={SelectListUtils.functions.getSelectedValue(SelectListUtils.functions.selectMaster.UserTypeMaster, dataModel.userType)}
            />

            <LabelText
              label={'Home institute name'}
              value={dataModel.instituteName}
            />

            {/* <LabelText
              label={'Home institute ID'}
              value={dataModel.roleDescription}
            /> */}
            <LabelText
              label={'Status'}
              value={SelectListUtils.functions.getSelectedValue(SelectListUtils.functions.selectMaster.ProfileStatusMaster, dataModel.status)}
            />
            <LabelText
              label={'Mobile number'}
              value={dataModel.mobileNo}
            />
            <LabelText
              label={'Email address'}
              value={dataModel.emailID}
            />
            {stateObject.state.dataModel.userType == 'S' && <View>
              <LabelText
                label={'Student name'}
                value={dataModel.studentName}
              />
              <LabelText
                label={'Student ID'}
                value={dataModel.studentID}
              />
            </View>}

            {(stateObject.state.dataModel.userType == 'T' || stateObject.state.dataModel.userType == 'A' || stateObject.state.dataModel.userType == 'O') && <View>
              <LabelText
                label={'Staff name'}
                value={dataModel.teacherName}
              />

              <LabelText
                label={'Staff ID'}
                value={dataModel.teacherID}
              />
            </View>}

    
        </Card.Content>
      </View>

    );
  }
}


export default UserProfileView;

