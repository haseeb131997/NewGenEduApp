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
import { View, StyleSheet, } from 'react-native';
import SelectListUtils from '../../../../utils/SelectListUtils'
import AppStyles from "../../../../AppStyles/AppStyles";
import ListView from '../../../../components/ListView';
import { Caption, Title, Divider, Subheading, Text } from "react-native-paper";
import GeneralUtils from "../../../../utils/GeneralUtils"

import CustomButtons from '../../../../components/CustomButtons';
import SecondModal from '../../../../components/SecondModal';
import EditBreakupDetail from '../EditBreakupDetail';
import Paggination from "../../../../utils/Paggination";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Exception from '../../../../utils/Exception'
import ImpNotes from '../../../../components/ImpNotes';
import AntDesign from 'react-native-vector-icons/AntDesign';
import moment from 'moment';
import { UiColor } from "../../../../theme";




class InstituteFeeManagementBreakup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    }
    this.onSubmit = this.onSubmit.bind(this)
    this.onClickNew = this.onClickNew.bind(this)
    this.onEdit = this.onEdit.bind(this)
    this.onDelete = this.onDelete.bind(this)
  }


  Mandatory = function () {
    const {
      stateObject,
    } = this.props
    const { feeBreakupEmptyrecord } = stateObject.state

    stateObject.state.errorField = []
    var mandatoryCheckError = false;

    if (feeBreakupEmptyrecord.componentName == '' || feeBreakupEmptyrecord.componentName == null) {
      mandatoryCheckError = true
      stateObject.state.errorField.push('field1')
      // return false;
    }
    if (feeBreakupEmptyrecord.amount == '' || feeBreakupEmptyrecord.amount == null) {
      mandatoryCheckError = true
      stateObject.state.errorField.push('field2')
      // return false;
    }

    if (mandatoryCheckError) {
      Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-080', errorMessage: '', errorParam: '' }])
      return false
    }
    else {
      return true
    }

    // return true
  }



  onSubmit() {
    Paggination.functions.editModaltwo = true
    const {
      stateObject,
    } = this.props
    const { feeBreakupEmptyrecord } = stateObject.state
    console.log('Notes')
    if (this.Mandatory()){
      Paggination.functions.addAndedit(stateObject, 'feeBreakup', feeBreakupEmptyrecord)
    }
      // notesView = true
  }


  onClickNew(){
    Paggination.functions.editModaltwo = true
    const { stateObject } = this.props
    var emptyRecord = {
      check: false,
      componentName: "",
      amount: "",
    }
  
    Paggination.functions.onClickNew(stateObject, 'feeBreakupEmptyrecord', emptyRecord)
  }

  onEdit(item, index){
    Paggination.functions.editModaltwo = true
    const { stateObject } = this.props
    Paggination.functions.edit(stateObject, 'feeBreakupEmptyrecord', item, index)
  }

  onDelete(index){
   Paggination.functions.editModaltwo = true
    const { stateObject } = this.props
    Paggination.functions.delete(stateObject, 'feeBreakup', index)
  }




  render() {
    const { stateObject } = this.props
    const { dataModel, editable } = stateObject.state
    const { parentStateChange } = stateObject
    return (
      <View>
        {/* <Title>Notes about {dataModel.studentName}</Title>
        <Divider style={AppStyles.marginTop_1} /> */}

       {(stateObject.state.currentOperation == 'Create') && <View style={[AppStyles.row_space_between]}>
          <Subheading style={AppStyles.bold_600}>{stateObject.state.createStepsHeading[1]}</Subheading>
          {dataModel.feeBreakup.length != 0 && <CustomButtons
            onPress={() => this.onClickNew()}
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

        {((stateObject.state.currentOperation == 'Create' || stateObject.state.currentOperation == 'Modification') && dataModel.feeBreakup.length == 0) && <View style={AppStyles.marginTop_2}>
          <CustomButtons
            onPress={() => this.onClickNew()}
            title={`Add Breakup`}
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

        {(stateObject.state.currentOperation == 'Modification' && dataModel.feeBreakup.length != 0) && <View style={[AppStyles.flex_End, AppStyles.marginTop_1]}>
          <CustomButtons
            onPress={() => this.onClickNew()}
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

        {(dataModel.feeBreakup == 0 && (stateObject.state.currentOperation == 'Create' || stateObject.state.currentOperation == 'Modification')) && <ImpNotes
          isArray={false}
          message={`Click add button to add breakup components for fee`}
        />}

        {dataModel.feeBreakup != 0 ?
          <View>
            {dataModel.feeBreakup.map((item, index) => (
              <View key={index.toString()} style={[AppStyles.eventContainer, { borderLeftColor: GeneralUtils.functions._getRandomColor(index) }]}>
                <View style={[AppStyles.row_space_between, AppStyles.alignItems]}>
                  <View style={AppStyles.width85}>
                    {/* <Subheading>{stateObject.state.currencyCode} {item.amount}</Subheading>
                    <Text style={AppStyles.attrNameStyle}>{item.componentName}</Text> */}
                      <Subheading>{item.componentName}</Subheading>
                    <Text style={AppStyles.attrNameStyle}>{stateObject.state.currencyCode} {item.amount}</Text>
                  </View>
                  {(stateObject.state.currentOperation == 'Create' || stateObject.state.currentOperation == 'Modification') && <View style={[AppStyles.flexDirectionRow]}>

                    <AntDesign onPress={() => this.onEdit(item, index)}
                      name="edit" size={AppStyles.iconSize.height} color={AppStyles.inactiveMoreIcon.tintColor} />
                    <View style={AppStyles.marginLeft_2}>
                      <AntDesign onPress={() => this.onDelete(index)}
                        name="delete" size={AppStyles.iconSize.height} color={AppStyles.inactiveMoreIcon.tintColor} />
                    </View>
                  </View>}
                </View>
              </View>))
            }
          </View> :  <View style={[AppStyles.alignItems,AppStyles.marginTop_3]}><Caption>This fee does not have any breakup component</Caption></View> }


        {Paggination.functions.editModaltwo && <SecondModal
          templates={<EditBreakupDetail stateObject={stateObject} />}
          stateObject={stateObject}
          title={Paggination.functions.selectedIndex == null ? 'Add' : 'Edit'}
          subTitle={'Breakup Details'}
          onSubmit={() => this.onSubmit()}
        />}

      </View>


    );
  }
}

const styles = StyleSheet.create({
})
export default InstituteFeeManagementBreakup;
