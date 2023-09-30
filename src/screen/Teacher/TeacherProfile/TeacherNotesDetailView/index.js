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
import EditTeacherNotesDetail from '../EditTeacherNotesDetail';
import Paggination from "../../../../utils/Paggination";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Exception from '../../../../utils/Exception'
import ImpNotes from '../../../../components/ImpNotes';
import AntDesign from 'react-native-vector-icons/AntDesign';
import moment from 'moment';
import { UiColor } from "../../../../theme";





class TeacherNotesDetailView extends Component {
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
    const { teacherNoteEmptyrecord } = stateObject.state

    stateObject.state.errorField = []
    var mandatoryCheckError = false;

    if (teacherNoteEmptyrecord.notes == '' || teacherNoteEmptyrecord.notes == null) {
      // Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-001', errorMessage: '', errorParam: ['Year'] }])
      mandatoryCheckError = true
      stateObject.state.errorField.push('field1')
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
    const { teacherNoteEmptyrecord } = stateObject.state

    if (this.Mandatory())
      Paggination.functions.addAndedit(stateObject, 'teacherNotes', teacherNoteEmptyrecord)
  }


  onClickNew(){
    Paggination.functions.editModaltwo = true
    const { stateObject } = this.props
    var teacherNoteEmpty = {
      date: moment(new Date).format('DD-MM-YYYY'),
      notes: "",
      check: false
    }
  
    Paggination.functions.onClickNew(stateObject, 'teacherNoteEmptyrecord', teacherNoteEmpty)
    // notesView = false
  }

  onEdit(item, index){
    Paggination.functions.editModaltwo = true

    const { stateObject } = this.props
    Paggination.functions.edit(stateObject, 'teacherNoteEmptyrecord', item, index)
    // notesView = false
  }

  onDelete(index){
    // Paggination.functions.editModaltwo = true
    const { stateObject } = this.props
    Paggination.functions.delete(stateObject, 'teacherNotes', index)
    // notesView = false
  }





  render() {
    const { stateObject } = this.props
    const { dataModel, editable } = stateObject.state
    const { parentStateChange } = stateObject
    var teacherNoteEmpty = {
      date: moment(new Date).format('DD-MM-YYYY'),
      notes: "",
      check: false
    }
    return (
      <View style={{}}>
        {/* <Title>Notes about {dataModel.studentName}</Title>
        <Divider style={AppStyles.marginTop_1} /> */}

        {(stateObject.state.currentOperation == 'Modification' && dataModel.teacherNotes.length == 0) && <View style={AppStyles.marginTop_2}>
          <CustomButtons
            onPress={() => this.onClickNew()}
            title={`Add Notes`}
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

        {(stateObject.state.currentOperation == 'Modification' && dataModel.teacherNotes.length != 0) && <View style={[AppStyles.flex_End, AppStyles.marginTop_1]}>
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

        {(dataModel.teacherNotes == 0 && (stateObject.state.currentOperation == 'Modification')) && <ImpNotes
          isArray={false}
          message={`By clicking 'Add Notes' you can add special notes about teacher`}
        />}

        {dataModel.teacherNotes != 0 ?

          //  <ListView
          //    mapValue1 ={['date']} 
          //    mapValue2 ={['notes']} 
          //   //  mapValue3 ={[]} 
          //   stateArray ={dataModel.teacherNotes}
          //    />
          <View>
            {dataModel.teacherNotes.map((item, index) => (
              <View key={index.toString()} style={[AppStyles.eventContainer, { borderLeftColor: GeneralUtils.functions._getRandomColor(index) }]}>
                <View style={[AppStyles.row_space_between, AppStyles.alignItems]}>
                  <View style={AppStyles.width85}>
                    <Subheading>{item.date}</Subheading>
                    <Text style={AppStyles.attrNameStyle}>{item.notes}</Text>
                  </View>
                  {(stateObject.state.currentOperation == 'Modification') && <View style={[AppStyles.flexDirectionRow]}>

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
          </View>
          :  stateObject.state.currentOperation != 'Modification' ? <View style={AppStyles.alignItems}><Caption>There is no special notes for the teacher</Caption></View> : null}

        {Paggination.functions.editModaltwo && <SecondModal
          templates={<EditTeacherNotesDetail stateObject={stateObject} />}
          stateObject={stateObject}
          title={Paggination.functions.selectedIndex == null ? 'Add' : 'Edit'}
          subTitle={'Notes'}
          onSubmit={() => this.onSubmit()}
        />}
      </View>


    );
  }
}

const styles = StyleSheet.create({
})
export default TeacherNotesDetailView;
