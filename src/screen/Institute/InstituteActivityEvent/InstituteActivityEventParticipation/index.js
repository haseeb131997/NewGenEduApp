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
import { Caption, Text, Title, Divider, } from 'react-native-paper';
import SelectListUtils from '../../../../utils/SelectListUtils'
import AppStyles from "../../../../AppStyles/AppStyles";
//import { Avatar } from 'react-native-elements';
//import { httpUtils } from '../../../../utils/HttpUtils';
//import GeneralUtils from "../../../../utils/GeneralUtils"
import InputTextArea from '../../../../components/InputTextArea';
//import CustomButtons from '../../../../components/CustomButtons';
import SecondModal from '../../../../components/SecondModal';
import EditParticipationDetails from '../EditParticipationDetails';
//import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Paggination from "../../../../utils/Paggination";
//import Ionicons from 'react-native-vector-icons/Ionicons';
import Exception from '../../../../utils/Exception'
//import ImpNotes from '../../../../components/ImpNotes';
//import AntDesign from 'react-native-vector-icons/AntDesign';
//import { UiColor } from "../../../../theme";
import CustomCheckBox from '../../../../components/CustomCheckBox';
import NewScreenDropDownPicker from '../../../../components/NewScreenDropDownPicker';


class InstituteActivityEventParticipation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      selectedFamilyIndex: 0
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
    const { enrollDetailsEmptyrecord } = stateObject.state

    stateObject.state.errorField = []
    var mandatoryCheckError = false;

    if (enrollDetailsEmptyrecord.studentName == '' || enrollDetailsEmptyrecord.studentName == null) {
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
    Paggination.functions.editModalone = true
    const {
      stateObject,
    } = this.props
    const { enrollDetailsEmptyrecord } = stateObject.state

    if (this.Mandatory()) {
      Paggination.functions.addAndedit(stateObject, 'enrollDetails', enrollDetailsEmptyrecord)
    }

  }


  onClickNew() {
    Paggination.functions.editModalone = true
    const { stateObject } = this.props
    var emptyRecord = {
      studentID: "",
      studentName: "",
      participate: false,
      result: "",
      comments: "",
      enroll: false
    }

    Paggination.functions.onClickNew(stateObject, 'enrollDetailsEmptyrecord', emptyRecord)

  }

  onEdit(item, index) {
    Paggination.functions.editModalone = true
    const { stateObject } = this.props
    Paggination.functions.edit(stateObject, 'enrollDetailsEmptyrecord', item, index)

  }

  onDelete(index) {
    Paggination.functions.editModalone = true
    const { stateObject } = this.props
    Paggination.functions.delete(stateObject, 'enrollDetails', index)

  }








  render() {
    const { stateObject, currentIndex } = this.props
    const { dataModel, editable, enrollDetailsEmptyrecord } = stateObject.state
    const { parentStateChange } = stateObject
    console.log('Inside Event Partcipation', stateObject.state.currentOperation)


    return (
      <View>

        {/*stateObject.state.type == 'Edit' && <View>
          {((stateObject.state.currentOperation == 'Modification') && dataModel.enrollDetails.length == 0) && <View style={AppStyles.marginTop_2}>
            <CustomButtons
              onPress={() => this.onClickNew()}
              title={`Add participant`}
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

          {(stateObject.state.currentOperation == 'Modification' && dataModel.enrollDetails.length != 0) && <View style={[AppStyles.flex_End, AppStyles.marginTop_1]}>
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


          {(dataModel.enrollDetails == 0 && (stateObject.state.currentOperation == 'Create' || stateObject.state.currentOperation == 'Modification')) && <ImpNotes
            isArray={false}
            message={`Click 'Add participant' button to add details about a participant & their result`}
          />}
            </View>*/}




        {dataModel.enrollDetails.length != 0 ? <View >
          {dataModel.enrollDetails.map((item, index) => (
            <View key={index.toString()} style={[AppStyles.marginTop_3]}>

              <View style={[AppStyles.row_space_between]}>
                <View style={AppStyles.flex_one}>
                  <Title style={[AppStyles.payTextStyle,]}>{index + 1}. {item.studentName}</Title>
                  <Caption>{item.studentID}</Caption>
                </View>
                {/*(stateObject.state.currentOperation == 'Modification') && <View style={[AppStyles.flexDirectionRow]}>
                  <AntDesign onPress={() => this.onEdit(item, index)}
                    name="edit" size={AppStyles.iconSize.height} color={AppStyles.inactiveMoreIcon.tintColor} />
                  {stateObject.state.type == 'Edit' && <View style={AppStyles.marginLeft_2}>
                    <AntDesign onPress={() => this.onDelete(index)}
                      name="delete" size={AppStyles.iconSize.height} color={AppStyles.inactiveMoreIcon.tintColor} />
                  </View>}
          </View>*/}
              </View>

              {stateObject.state.currentOperation == 'View' &&
                <View>
                  <View style={AppStyles.marginTop_2}>
                    <CustomCheckBox
                      label={'Enroll'}
                      checked={item.enroll}
                      disabled={true}
                    ></CustomCheckBox>

                  </View>

                  <View style={AppStyles.marginTop_2}>
                    <CustomCheckBox
                      label={'Participation'}
                      checked={item.participate}
                      disabled={true}
                    />
                  </View>

                  <Caption style={[AppStyles.textColor, AppStyles.marginTop_1]}>Result</Caption>
                    <Text>{SelectListUtils.functions.getSelectedValueNew(SelectListUtils.functions.selectMaster.ResultMaster, item.result)}</Text>

                    <Caption style={[AppStyles.textColor, AppStyles.marginTop_1]}>Teacher Comments on Results</Caption>
                  <Text>{item.comments}</Text>
                </View>


              }




              {stateObject.state.type == 'Result' && <View style={AppStyles.marginTop_2}>
                {/* <Caption style={[AppStyles.textColor, AppStyles.marginTop_1]}>Result</Caption>
                    <Text>{SelectListUtils.functions.getSelectedValueNew(SelectListUtils.functions.selectMaster.ResultMaster, item.result)}</Text>

                    <Caption style={[AppStyles.textColor, AppStyles.marginTop_1]}>Teacher Comments on Results</Caption>
        <Text>{item.comments}</Text> */}


                <View style={[AppStyles.marginTop_2]}>

                  <NewScreenDropDownPicker
                    label={'Result'}
                    stateObject={stateObject}
                    items={SelectListUtils.functions.selectMaster.ResultMaster}
                    value={SelectListUtils.functions.getSelectedValue(SelectListUtils.functions.selectMaster.ResultMaster, item.result)}
                    placeholder="Select result"
                    onChangeValue={(value) => {
                      item.result = value;
                      parentStateChange({ dataModel: dataModel })

                    }}
                    dropdownName={`resultropdown${index}`}
                    subHeadingRecordName="a result"
                    onClear={() => {
                      item.result = '';
                      parentStateChange({ dataModel: dataModel })
                    }}

                  />
                </View>
                <View style={AppStyles.marginTop_1}>

                  <InputTextArea
                    label={'Teacher Comments on Results'}
                    required={false}
                    secureTextEntry={false}
                    value={item.comments}
                    placeholder={'Please enter comments'}
                    onChangeText={text => {
                      item.comments = text
                      parentStateChange({ dataModel: dataModel })
                    }}

                  />
                </View>
              </View>



              }

              {(stateObject.state.type == 'Enroll') && <View style={AppStyles.marginTop_2}>
                <CustomCheckBox
                  label={'Enroll'}
                  checked={item.enroll}
                  disabled={false}
                  onPress={() => {
                    item.enroll = !item.enroll;

                    parentStateChange({ dataModel: dataModel })
                  }}
                />
              </View>}

              {stateObject.state.type == 'Shortlist' && <View style={AppStyles.marginTop_2}>
                <CustomCheckBox
                  label={'Enable Participation'}
                  checked={item.participate}
                  disabled={false}
                  onPress={() => {
                    item.participate = !item.participate;

                    parentStateChange({ dataModel: dataModel })
                  }}
                />
              </View>}


              <Divider style={[AppStyles.marginVertical_2]} />
            </View>
          ))}
        </View> : (stateObject.state.currentOperation != 'Create' && stateObject.state.currentOperation != 'Modification') ? <View style={[AppStyles.alignItems, AppStyles.marginTop_3]}><Caption style={AppStyles.textAlign_center}>This activity/event does not have any Participation & Result</Caption></View> : null}
        {Paggination.functions.editModalone && <SecondModal
          templates={<EditParticipationDetails stateObject={stateObject} />}
          stateObject={stateObject}
          title={Paggination.functions.selectedIndex == null ? 'Add' : 'Edit'}
          subTitle={this.getSubTitle()}
          onSubmit={() => this.onSubmit()}
        />}
      </View>
    );
  }


  getSubTitle() {
    const { stateObject } = this.props
    if (stateObject.state.type == 'Enroll') {
      return 'Enroll Students'
    }
    else if (stateObject.state.type == 'Shortlist') {
      return 'Shortlist participants'
    }
    else if (stateObject.state.type == 'Result') {
      return 'Result declaration'
    }
    else {
      return 'Participation & Result'
    }
  }
}

const styles = StyleSheet.create({
})
export default InstituteActivityEventParticipation;
