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
import { View, StyleSheet, Image, TouchableOpacity, ScrollView, LayoutAnimation, Platform, UIManager } from 'react-native';
import { TextInput, Title, Text, Subheading } from 'react-native-paper';
import SelectListUtils from '../../../../utils/SelectListUtils'
import AppStyles from "../../../../AppStyles/AppStyles";
import CustomButtons from '../../../../components/CustomButtons';
import { UiColor } from "../../../../theme";
import SecondModal from '../../../../components/SecondModal';
import PeriodTimeDetails from '../PeriodTimeDetails';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Paggination from "../../../../utils/Paggination";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Exception from '../../../../utils/Exception'
import AntDesign from 'react-native-vector-icons/AntDesign';
import ImpNotes from '../../../../components/ImpNotes';








class InstituteClassConfigPeriod extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      selectedPeriodIndex: 0
    }
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    this.changeLayout = this.changeLayout.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  changeLayout = (index) => {
    if (this.state.selectedPeriodIndex == index) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      this.setState({ selectedPeriodIndex: null });
    }
    else {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      this.setState({ selectedPeriodIndex: index });
    }

  }


  Mandatory = function () {
    const {
      stateObject,
    } = this.props
    const { periodTimingsEmptyrecord } = stateObject.state
    stateObject.state.errorField = []
    var mandatoryCheckError = false;
    if (periodTimingsEmptyrecord.periodNumber == '' || periodTimingsEmptyrecord.periodNumber == null) {
      mandatoryCheckError = true
      stateObject.state.errorField.push('field7')
    }
    if (periodTimingsEmptyrecord.noon == '' || periodTimingsEmptyrecord.noon == null) {

      mandatoryCheckError = true
      stateObject.state.errorField.push('field8')
    }
    if ((periodTimingsEmptyrecord.startTime.hour == '' || periodTimingsEmptyrecord.startTime.hour == null) && (periodTimingsEmptyrecord.startTime.min == '' || periodTimingsEmptyrecord.startTime.min == null)) {

      mandatoryCheckError = true
      stateObject.state.errorField.push('field9')
    }

    if ((periodTimingsEmptyrecord.endTime.hour == '' || periodTimingsEmptyrecord.endTime.hour == null) && (periodTimingsEmptyrecord.endTime.min == '' || periodTimingsEmptyrecord.endTime.min == null)) {

      mandatoryCheckError = true
      stateObject.state.errorField.push('field10')
    }
    if (mandatoryCheckError) {
      Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-080', errorMessage: '', errorParam: '' }])
      return false
    }
    else {
      return true
    }
  }



  onSubmit() {
    const {
      stateObject,
    } = this.props

    const { periodTimingsEmptyrecord } = stateObject.state

    if (this.Mandatory())
      Paggination.functions.addAndedit(stateObject, 'periodTimings', periodTimingsEmptyrecord)
  }











  render() {
    const {
      stateObject,
      currentIndex
    } = this.props

    const { dataModel, editable, periodTimingsEmptyrecord } = stateObject.state
    const { parentStateChange } = stateObject
    var currentInd = 0
    if (currentIndex >= 1) {
      currentInd = currentIndex - 1
    }
    var periodTimingsEmpty = {
      idx: "",
      class: "",
      periodNumber: "",
      noon: "",
      startTime: {
        hour: "",
        min: ""
      },
      endTime: {
        hour: "",
        min: ""
      }
    }
    // View
    return (

      <View>

        {(stateObject.state.currentOperation == 'Create') && <View style={[AppStyles.row_space_between]}>
          <Title>{stateObject.state.createStepsHeading[1]}</Title>
          {dataModel.periodTimings.length != 0 &&<CustomButtons
            onPress={() => Paggination.functions.onClickNew(stateObject, 'periodTimingsEmptyrecord', periodTimingsEmpty)}
            title={'Add'}
            containerStyle={AppStyles.signInContainer}
            titleStyle={AppStyles.btnTextStyle}
            buttonStyle={{ backgroundColor: UiColor.LIGHT_SKYBLUE }}
            icon={
              <Ionicons
                name="add"
                size={AppStyles.addIconSize.height}
                color={UiColor.SKYBLUE}
                style={AppStyles.addIconStyle}
              />
            }
          />}
        </View>}

        {dataModel.periodTimings.length == 0 && <View style={AppStyles.marginTop_2}>
          <CustomButtons
            onPress={() => Paggination.functions.onClickNew(stateObject, 'periodTimingsEmptyrecord', periodTimingsEmpty)}
            title={`Add new period`}
            containerStyle={AppStyles.signInContainer}
            titleStyle={AppStyles.btnTextStyle}
            buttonStyle={{ backgroundColor: UiColor.LIGHT_SKYBLUE }}
            icon={
              <Ionicons
                name="add"
                size={AppStyles.addIconSize.height}
                color={UiColor.SKYBLUE}
                style={AppStyles.addIconStyle}
              />
            }
          />
        </View>}

        {(dataModel.periodTimings.length != 0 && stateObject.state.currentOperation == 'Modification' ) && <View style={[AppStyles.flex_End, AppStyles.marginTop_1]}>
          <CustomButtons
            onPress={() => Paggination.functions.onClickNew(stateObject, 'periodTimingsEmptyrecord', periodTimingsEmpty)}
            title={'Add'}
            containerStyle={AppStyles.signInContainer}
            titleStyle={AppStyles.btnTextStyle}
            buttonStyle={{ backgroundColor: UiColor.LIGHT_SKYBLUE }}
            icon={
              <Ionicons
                name="add"
                size={AppStyles.addIconSize.height}
                color={UiColor.SKYBLUE}
                style={AppStyles.addIconStyle}
              />
            }
          />
        </View>}

        {dataModel.periodTimings == 0 && <ImpNotes
          isArray={false}
          // message={`By clicking 'Add new Period Details' for new group `}
          message={`Click 'Add new period' button to add a new period details for this class.`}
        />}



        <View >
          {dataModel.periodTimings.map((item, index) => (
            <View key={index.toString()} style={AppStyles.marginTop_1}>
              <TouchableOpacity onPress={() => this.changeLayout(index)} style={[AppStyles.flexDirectionRow, AppStyles.alignItems]}>
                <MaterialIcons name={this.state.selectedPeriodIndex != index ? "navigate-next" : "keyboard-arrow-down"} size={AppStyles.iconSize.height} color={UiColor.LIGHT_TEXT_COLOR} />
                <View style={[AppStyles.marginLeft_1, AppStyles.flex_one]}>
                  <Subheading style={[AppStyles.bold_400]}>Period {item.periodNumber}</Subheading>
                  <Text style={[{ color: UiColor.LIGHT_TEXT_COLOR }]}>{SelectListUtils.functions.getSelectedValueNew(SelectListUtils.functions.selectMaster.AttendanceNoonMaster, item.noon)}</Text>
                </View>

                {(stateObject.state.currentOperation == 'Create' || stateObject.state.currentOperation == 'Modification') && <View style={[AppStyles.flexDirectionRow]}>
                  {/* <TouchableOpacity onPress={() =>  Paggination.functions.edit(stateObject,'periodTimingsEmptyrecord',item,index)}>
                    <Image resizeMode='contain' style={AppStyles.inactiveMoreIcon}
                      source={require('./../../../../asssets/icons/art005.png')}
                    /></TouchableOpacity>
                  <TouchableOpacity style={AppStyles.marginLeft_2} onPress={() => Paggination.functions.delete(stateObject,'periodTimings',index)}>
                    <Image resizeMode='contain' style={AppStyles.inactiveMoreIcon}
                      source={require('./../../../../asssets/icons/gen027.png')}
                    /></TouchableOpacity> */}

                  <AntDesign onPress={() => Paggination.functions.edit(stateObject, 'periodTimingsEmptyrecord', item, index)}
                    name="edit" size={AppStyles.iconSize.height} color={AppStyles.inactiveMoreIcon.tintColor} />


                  <View style={AppStyles.marginLeft_2}>
                    <AntDesign onPress={() => Paggination.functions.delete(stateObject, 'periodTimings', index)}
                      name="delete" size={AppStyles.iconSize.height} color={AppStyles.inactiveMoreIcon.tintColor} />
                  </View>
                </View>}
              </TouchableOpacity>
              <View style={[{ height: this.state.selectedPeriodIndex == index ? null : 0, overflow: 'hidden', }]}>
                <View style={[AppStyles.flexDirectionRow, AppStyles.marginTop_2, AppStyles.marginLeft_4]}>
                  <Text style={AppStyles.listHeading}>Start Time</Text>
                  <Text style={AppStyles.listValue}>{item.startTime.hour}:{item.startTime.min}</Text>
                </View>
                <View style={[AppStyles.flexDirectionRow, AppStyles.marginTop_1, AppStyles.marginLeft_4]}>
                  <Text style={AppStyles.listHeading}>End Time</Text>
                  <Text style={AppStyles.listValue}>{item.endTime.hour}:{item.endTime.min}</Text>
                </View>

              </View>
              {/* <Divider style={AppStyles.marginVertical_2} /> */}
            </View>
          ))}
        </View>
        <SecondModal
          templates={<PeriodTimeDetails stateObject={stateObject} />}
          stateObject={stateObject}
          title={Paggination.functions.selectedIndex == null ? 'Add' : 'Edit'}
          subTitle={'Period Details'}
          onSubmit={() => this.onSubmit()}
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({

})
export default InstituteClassConfigPeriod;

