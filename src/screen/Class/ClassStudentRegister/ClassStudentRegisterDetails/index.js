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
import { Text, Subheading, Divider } from 'react-native-paper';
import AppStyles from "../../../../AppStyles/AppStyles";
import CustomButtons from '../../../../components/CustomButtons';
import { UiColor } from "../../../../theme";
import SecondModal from '../../../../components/SecondModal';
import StudentDetails from '../StudentDetails';
import Paggination from "../../../../utils/Paggination";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Exception from '../../../../utils/Exception'
import ImpNotes from '../../../../components/ImpNotes';
import AntDesign from 'react-native-vector-icons/AntDesign';








class ClassStudentRegisterDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    }
    this.onSubmit = this.onSubmit.bind(this)
  }



  Mandatory = function () {
    const {
      stateObject,
    } = this.props
    const { studentsEmptyrecord } = stateObject.state

    stateObject.state.errorField = []
    var mandatoryCheckError = false;

    if (studentsEmptyrecord.studentName == '' || studentsEmptyrecord.studentName == null) {

      mandatoryCheckError = true
      stateObject.state.errorField.push('field5')
    }
    if (studentsEmptyrecord.studentID == '' || studentsEmptyrecord.studentID == null) {
      mandatoryCheckError = true
      stateObject.state.errorField.push('field6')
    }

    if (mandatoryCheckError) {
      Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-080', errorMessage: '', errorParam: '' }])
      return false
    }


    else {
      return true
    }

    return true
  }



  onSubmit() {
    const {
      stateObject,
    } = this.props
    const { studentsEmptyrecord } = stateObject.state

    if (this.Mandatory())
      Paggination.functions.addAndedit(stateObject, 'students', studentsEmptyrecord)
  }











  render() {
    const {
      stateObject,
      currentIndex
    } = this.props

    const { dataModel, editable, studentsEmptyrecord } = stateObject.state
    const { parentStateChange } = stateObject

    var studentEmpty = {
      studentName: "",
      studentID: ""
    }
    // View
    return (
      <View>
        {(stateObject.state.currentOperation == 'Create') && <View style={[AppStyles.row_space_between]}>
          <Subheading style={AppStyles.bold_600}>{stateObject.state.createStepsHeading[1]}</Subheading>
          {dataModel.students.length != 0 && <CustomButtons
            onPress={() => Paggination.functions.onClickNew(stateObject, 'studentsEmptyrecord', studentEmpty)}
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

        {dataModel.students.length == 0 && <View style={AppStyles.marginTop_2}>
          <CustomButtons
            onPress={() => Paggination.functions.onClickNew(stateObject, 'studentsEmptyrecord', studentEmpty)}
            title={`Add ${stateObject.state.createStepsHeading[1]}`}
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

        {(stateObject.state.currentOperation == 'Modification' && dataModel.students.length != 0) && <View style={[AppStyles.flex_End, AppStyles.marginTop_1]}>
          <CustomButtons
            onPress={() => Paggination.functions.onClickNew(stateObject, 'studentsEmptyrecord', studentEmpty)}
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


        {dataModel.students.length == 0 && <ImpNotes
          isArray={false}
          message={`Click "${stateObject.state.createStepsHeading[1]}" button to add a student in the selected class.`}
        />}


        <View>
          {dataModel.students.map((item, index) => (
            <View key={index.toString()} style={AppStyles.marginTop_1}>
              <View style={[AppStyles.flexDirectionRow, AppStyles.alignItems]}>
                <View style={[AppStyles.flex_one]}>



                  <View>
                    <Text style={[AppStyles.textColor, AppStyles.marginTop_1]}>Student Name : <Text>{item.studentName}</Text></Text>
                    <Text style={[AppStyles.textColor, AppStyles.marginTop_1]}>Student ID : <Text>{item.studentID}</Text></Text>
                  </View>

                </View>
                {(stateObject.state.currentOperation == 'Create' || stateObject.state.currentOperation == 'Modification') && <View style={[AppStyles.flexDirectionRow]}>
                  {/* <TouchableOpacity onPress={() => Paggination.functions.edit(stateObject, 'studentsEmptyrecord', item, index)}>
                    <Image resizeMode='contain' style={AppStyles.inactiveMoreIcon}
                      source={require('./../../../../asssets/icons/art005.png')}
                    /></TouchableOpacity>
                  <TouchableOpacity style={AppStyles.marginLeft_2} onPress={() => Paggination.functions.delete(stateObject, 'students', index)}>
                    <Image resizeMode='contain' style={AppStyles.inactiveMoreIcon}
                      source={require('./../../../../asssets/icons/gen027.png')}
                    /></TouchableOpacity> */}

                  {/* <AntDesign onPress={() => Paggination.functions.edit(stateObject, 'studentsEmptyrecord', item, index)}
                        name="edit" size={AppStyles.iconSize.height} color={AppStyles.inactiveMoreIcon.tintColor} /> */}


                  <View style={AppStyles.marginLeft_2}>
                    <AntDesign onPress={() => Paggination.functions.delete(stateObject, 'students', index)}
                      name="delete" size={AppStyles.iconSize.height} color={AppStyles.inactiveMoreIcon.tintColor} />
                  </View>
                </View>}
              </View>

              {(dataModel.students.length - 1) != index && <Divider style={[AppStyles.marginVertical_2]} />}
            </View>
          ))}
        </View>
        <SecondModal
          templates={<StudentDetails stateObject={stateObject} />}
          stateObject={stateObject}
          title={Paggination.functions.selectedIndex == null ? 'Add' : 'Edit'}
          subTitle={stateObject.state.createStepsHeading[1]}
          onSubmit={() => this.onSubmit()}
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({

})
export default ClassStudentRegisterDetails;

