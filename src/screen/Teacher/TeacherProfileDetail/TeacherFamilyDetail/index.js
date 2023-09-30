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
import { View, StyleSheet, Image, TouchableOpacity, LayoutAnimation, Platform ,UIManager} from 'react-native';
import { TextInput, Card, Text, Title, Subheading, Divider } from 'react-native-paper';
import SelectListUtils from '../../../../utils/SelectListUtils'
import AppStyles from "../../../../AppStyles/AppStyles";
import InputText from '../../../../components/InputText';
import CustomCarousel from '../../../../components/CustomCarousel';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { UiColor } from "../../../../theme";
import GeneralUtils from "../../../../utils/GeneralUtils";
import { Avatar } from 'react-native-elements';




class TeacherFamilyDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      selectedFamilyIndex: 0
    }
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    this.changeLayout = this.changeLayout.bind(this)
  }




  changeLayout = (index) => {
    if (this.state.selectedFamilyIndex == index) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      this.setState({ selectedFamilyIndex: null });
    }
    else {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      this.setState({ selectedFamilyIndex: index });
    }

  }


  render() {
    const { stateObject, currentIndex } = this.props
    var currentInd = 0
    if (currentIndex >= 1) {
      currentInd = currentIndex - 1
    }
    const { dataModel, editable } = stateObject.state
    const { parentStateChange } = stateObject
    return dataModel.emergency.contactPerson.length != 0 && (
      <View>
        <Title>Family Info</Title>
        <View style={AppStyles.marginTop_2}>
          {dataModel.emergency.contactPerson.map((item, index) => (
            <View key={index.toString()}  style={AppStyles.marginTop_3}>
              <TouchableOpacity onPress={() => this.changeLayout(index)} style={[AppStyles.flexDirectionRow, AppStyles.alignItems]}>
                <MaterialIcons name={this.state.selectedFamilyIndex != index ? "navigate-next" : "keyboard-arrow-down"} size={AppStyles.iconSize.height} color={UiColor.LIGHT_TEXT_COLOR} />
                <View style={[AppStyles.marginLeft_1]}>
                  <Avatar
                    size={AppStyles.familyProfileAvatarSize.height}
                    rounded
                    source={GeneralUtils.functions.getImagePath(stateObject, item.cp_imgPath)}
                  />
                </View>
                <View style={[AppStyles.marginLeft_1,AppStyles.flex_one]}>
                  <Subheading style={[AppStyles.bold_400]}>{item.cp_Name}</Subheading>
                  <Text style={[{ color: UiColor.LIGHT_TEXT_COLOR }]}>{item.cp_relationship}</Text>
                </View>

              </TouchableOpacity>
              <View style={[{ height: this.state.selectedFamilyIndex == index ? null : 0, overflow: 'hidden', }]}>
                <View style={[AppStyles.flexDirectionRow, AppStyles.marginTop_3, AppStyles.marginLeft_4]}>
                  <Text style={AppStyles.listHeading}>Occupation</Text>
                  <Text style={AppStyles.listValue}>{item.cp_occupation}</Text>
                </View>
                <View style={[AppStyles.flexDirectionRow, AppStyles.marginTop_1, AppStyles.marginLeft_4]}>
                  <Text style={AppStyles.listHeading}>Email address</Text>
                  <Text style={AppStyles.listValue}>{item.cp_emailID}</Text>
                </View>
                <View style={[AppStyles.flexDirectionRow, AppStyles.marginTop_1, AppStyles.marginLeft_4]}>
                  <Text style={AppStyles.listHeading}>Comtact number</Text>
                  <Text style={AppStyles.listValue}>{item.cp_contactNo}</Text>
                </View>
              </View>
              {/* <Divider style={AppStyles.marginVertical_2} /> */}
            </View>
          ))}
        </View>
      </View>

    );
  }
}

const styles = StyleSheet.create({
})
export default TeacherFamilyDetail;
