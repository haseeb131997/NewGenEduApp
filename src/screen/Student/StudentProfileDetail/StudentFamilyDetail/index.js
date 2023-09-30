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
import { View, StyleSheet, Image, TouchableOpacity,LayoutAnimation,UIManager } from 'react-native';
import { TextInput, Caption, Text, Title,Divider,Subheading } from 'react-native-paper';
import SelectListUtils from '../../../../utils/SelectListUtils'
import AppStyles from "../../../../AppStyles/AppStyles";
import InputText from '../../../../components/InputText';
import CustomCarousel from '../../../../components/CustomCarousel';
import { Avatar } from 'react-native-elements';
import { httpUtils } from '../../../../utils/HttpUtils';
import GeneralUtils from "../../../../utils/GeneralUtils";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { UiColor } from "../../../../theme";



class StudentFamilyDetail extends Component {
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
    return dataModel.family.length != 0 && (
      <View> 
        <Title>Family Info</Title>
        <Divider style={AppStyles.marginTop_1} />
        <View style={[AppStyles.marginTop_2]}>
          {dataModel.family.map((item, index) => (
            <View key={index.toString()} style={[AppStyles.marginTop_3]}>
              <TouchableOpacity onPress={() => this.changeLayout(index)} style={[AppStyles.flexDirectionRow, AppStyles.alignItems,]}>
                <MaterialIcons name={this.state.selectedFamilyIndex != index ? "navigate-next" : "keyboard-arrow-down"} size={AppStyles.iconSize.height} color={UiColor.LIGHT_TEXT_COLOR} />
                <View style={[AppStyles.marginLeft_1]}>
                  <Avatar
                    size={AppStyles.familyProfileAvatarSize.height}
                    rounded
                    source={GeneralUtils.functions.getImagePath(stateObject, item.memberImgPath)}
                  />
                </View>
                <View style={[AppStyles.marginLeft_1,AppStyles.flex_one]}>
                  <Subheading style={[AppStyles.bold_400]}>{item.memberName} </Subheading>
                  <Text style={[AppStyles.textColor]}>{SelectListUtils.functions.getSelectedValue(SelectListUtils.functions.selectMaster.RelationshipMaster, item.memberRelationship)}</Text>
                 <View style={AppStyles.flexDirectionRow}>
                 <Caption style={AppStyles.primaryStatusStyle}>Notification in {SelectListUtils.functions.getSelectedValue(SelectListUtils.functions.selectMaster.LanguageMaster,item.language)}</Caption>
                 </View>
                </View>

              </TouchableOpacity>
              <View style={[{ height: this.state.selectedFamilyIndex == index ? null : 0, overflow: 'hidden', }]}>
                <View style={[AppStyles.flexDirectionRow, AppStyles.marginTop_3, AppStyles.marginLeft_4]}>
                  <Text style={AppStyles.listHeading}>Occupation</Text>
                  <Text style={AppStyles.listValue}>{item.memberOccupation}</Text>
                </View>
                <View style={[AppStyles.flexDirectionRow, AppStyles.marginTop_1, AppStyles.marginLeft_4]}>
                  <Text style={AppStyles.listHeading}>Email address</Text>
                  <Text style={AppStyles.listValue}>{item.memberEmailID}</Text>
                </View>
                <View style={[AppStyles.flexDirectionRow, AppStyles.marginTop_1, AppStyles.marginLeft_4]}>
                  <Text style={AppStyles.listHeading}>Comtact number</Text>
                  <Text style={AppStyles.listValue}>{item.memberContactNo}</Text>
                </View>
              </View>
              {/* <Divider style={AppStyles.marginVertical_2} /> */}
            </View>
          ))}
        </View>


          {/* <CustomCarousel
          stateObject={stateObject}
          data={dataModel.family}
          renderItem={this._familyDetailItem}
          activeSlideIndexStateName= {'activeSlideIndex'}
          activeSlideIndex={stateObject.state.activeSlideIndex}
        /> */}
      </View>

    );
  }
}

const styles = StyleSheet.create({
})
export default StudentFamilyDetail;
