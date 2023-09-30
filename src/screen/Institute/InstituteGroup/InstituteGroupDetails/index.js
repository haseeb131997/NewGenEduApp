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
import { TextInput, Title, Text, Subheading, Divider } from 'react-native-paper';
import AppStyles from "../../../../AppStyles/AppStyles";
import CustomButtons from '../../../../components/CustomButtons';
import { UiColor } from "../../../../theme";
import SecondModal from '../../../../components/SecondModal';
import GroupDetails from '../GroupDetails';
import Paggination from "../../../../utils/Paggination";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Exception from '../../../../utils/Exception'
import ImpNotes from '../../../../components/ImpNotes';
import AntDesign from 'react-native-vector-icons/AntDesign';








class InstituteGroupDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    }
    this.onSubmit = this.onSubmit.bind(this)
    this.onClickNew = this.onClickNew.bind(this)
    this.onClickEdit = this.onClickEdit.bind(this)
  }



  Mandatory = function () {
    const {
      stateObject,
    } = this.props
    const { groupEmptyrecord } = stateObject.state

    if ((groupEmptyrecord.class == '' || groupEmptyrecord.class == null) && (groupEmptyrecord.studentName == '' || groupEmptyrecord.studentName == null)) {
      Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-085', errorMessage: '', errorParam: '' }])
      return false
    }

    if (groupEmptyrecord.class !== '' && groupEmptyrecord.studentName !== '') {
      Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-086', errorMessage: '', errorParam: '' }])
      return false
    }

    else {
      return true
    }

    // return true
  }



  onSubmit() {
    const {
      stateObject,
    } = this.props
    const { groupEmptyrecord } = stateObject.state

    if (this.Mandatory())
      Paggination.functions.addAndedit(stateObject, 'group', groupEmptyrecord)
  }



  onClickNew() {
    const {
      stateObject
    } = this.props
    var groupEmpty = {
      idx: "",
      class: "",
      studentName: "",
      studentID: ""
    }
    Paggination.functions.onClickNew(stateObject, 'groupEmptyrecord', groupEmpty)
    if (stateObject.state.currentOperation == 'Create' || stateObject.state.currentOperation == 'Modification') {
      stateObject.parentStateChange({
        selectOption: ''
      })
    }


  }

  onClickEdit(item, index) {
    const {
      stateObject,
    } = this.props
    Paggination.functions.edit(stateObject, 'groupEmptyrecord', item, index)

    console.log(item, "item")
    if (item.class !== '') {
      stateObject.parentStateChange({
        selectOption: 'class'
      })
    }
    else if (item.studentID !== '') {
      stateObject.parentStateChange({
        selectOption: 'student'
      })
    }
  }






  render() {
    const {
      stateObject,
      currentIndex
    } = this.props

    const { dataModel, editable, groupEmptyrecord } = stateObject.state
    const { parentStateChange } = stateObject


    // View
    return (
      <View>
        {(stateObject.state.currentOperation == 'Create') && <View style={[AppStyles.row_space_between]}>
          <Subheading>{stateObject.state.createStepsHeading[1]}</Subheading>
          {dataModel.group.length != 0 && <CustomButtons
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

        {dataModel.group.length == 0 && <View style={AppStyles.marginTop_2}>
          <CustomButtons
            onPress={() => this.onClickNew()}
            title={`Add group member`}
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

        {(stateObject.state.currentOperation == 'Modification' && dataModel.group.length != 0) && <View style={[AppStyles.flex_End, AppStyles.marginTop_1]}>
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


        {dataModel.group == 0 && <ImpNotes
          isArray={false}
          // message={`By clicking 'Add new ${stateObject.state.createStepsHeading[1]}' for new group `}
          message={`To create a group, Click the "Add group member" button to add the targeted classes/students under the group.`}
        />}


        <View>
          {dataModel.group.map((item, index) => (
            <View key={index.toString()} style={AppStyles.marginTop_1}>
              <View style={[AppStyles.flexDirectionRow, AppStyles.alignItems]}>
                <View style={[AppStyles.flex_one]}>

                  {(item.class != '' && item.class != null) ? <Text style={[AppStyles.textColor, AppStyles.marginTop_1]}>Class : <Text>{item.class}</Text></Text> : null}

                  {(item.studentName != '' && item.studentName != null) ? <View>
                    <Text style={[AppStyles.textColor, AppStyles.marginTop_1]}>Student Name : <Text>{item.studentName}</Text></Text>

                    <Text style={[AppStyles.textColor, AppStyles.marginTop_1]}>Student ID : <Text>{item.studentID}</Text></Text>
                  </View> : null}

                </View>
                {(stateObject.state.currentOperation == 'Create' || stateObject.state.currentOperation == 'Modification') && <View style={[AppStyles.flexDirectionRow]}>
                  {/* <TouchableOpacity onPress={() => Paggination.functions.edit(stateObject, 'groupEmptyrecord', item, index)}>
                    <Image resizeMode='contain' style={AppStyles.inactiveMoreIcon}
                      source={require('./../../../../asssets/icons/art005.png')}
                    /></TouchableOpacity>
                  <TouchableOpacity style={AppStyles.marginLeft_2} onPress={() => Paggination.functions.delete(stateObject, 'group', index)}>
                    <Image resizeMode='contain' style={AppStyles.inactiveMoreIcon}
                      source={require('./../../../../asssets/icons/gen027.png')}
                    /></TouchableOpacity> */}

                  <AntDesign onPress={() => this.onClickEdit(item, index)}
                    name="edit" size={AppStyles.iconSize.height} color={AppStyles.inactiveMoreIcon.tintColor} />


                  <View style={AppStyles.marginLeft_2}>
                    <AntDesign onPress={() => Paggination.functions.delete(stateObject, 'group', index)}
                      name="delete" size={AppStyles.iconSize.height} color={AppStyles.inactiveMoreIcon.tintColor} />
                  </View>
                </View>}
              </View>

              <Divider style={[AppStyles.marginVertical_2]} />
            </View>
          ))}
        </View>
        <SecondModal
          templates={<GroupDetails stateObject={stateObject} />}
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
export default InstituteGroupDetails;

