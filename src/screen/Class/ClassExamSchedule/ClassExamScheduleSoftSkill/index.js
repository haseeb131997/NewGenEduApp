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
import { View, StyleSheet, LayoutAnimation, Platform, UIManager } from 'react-native';
import { Subheading } from 'react-native-paper';
import AppStyles from "../../../../AppStyles/AppStyles";
import CustomButtons from '../../../../components/CustomButtons';
import { UiColor } from "../../../../theme";
import SecondModal from '../../../../components/SecondModal';
import EditSoftSkillDetails from '../EditSoftSkillDetails';
import GeneralUtils from "../../../../utils/GeneralUtils";
import Paggination from "../../../../utils/Paggination";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Exception from '../../../../utils/Exception'
import AntDesign from 'react-native-vector-icons/AntDesign';
import ImpNotes from '../../../../components/ImpNotes';
import CustomCheckBox from '../../../../components/CustomCheckBox';









class ClassExamScheduleSoftSkill extends Component {
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
    this.onClickNew = this.onClickNew.bind(this)
    this.onEdit = this.onEdit.bind(this)
    this.onDelete = this.onDelete.bind(this)
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
    const { softSkillsEmptyrecord } = stateObject.state
    stateObject.state.errorField = []
    var mandatoryCheckError = false;
    if (softSkillsEmptyrecord.softSkillName == '' || softSkillsEmptyrecord.softSkillName == null) {
      mandatoryCheckError = true
      stateObject.state.errorField.push('field12')
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
    Paggination.functions.editModaltwo = true
    const {
      stateObject,
    } = this.props

    const { softSkillsEmptyrecord } = stateObject.state

    if (this.Mandatory())
      Paggination.functions.addAndedit(stateObject, 'softSkills', softSkillsEmptyrecord)
  }




  onClickNew(){
    Paggination.functions.editModaltwo = true
    const { stateObject } = this.props

    var softSkillsEmptyObject = {
      check: false,
      softSkillName: ""
    }
  
    Paggination.functions.onClickNew(stateObject, 'softSkillsEmptyrecord', softSkillsEmptyObject)

  }

  onEdit(item, index){
    Paggination.functions.editModaltwo = true
    const { stateObject } = this.props
    Paggination.functions.edit(stateObject, 'softSkillsEmptyrecord', item, index)

  }

  onDelete(index){
    Paggination.functions.editModaltwo = true
    const { stateObject } = this.props
    Paggination.functions.delete(stateObject, 'softSkills', index)

  }









  render() {
    const {
      stateObject,
      currentIndex
    } = this.props

    const { dataModel, editable, softSkillsEmptyrecord } = stateObject.state
    const { parentStateChange } = stateObject
    var currentInd = 0
    if (currentIndex >= 1) {
      currentInd = currentIndex - 1
    }
    var softSkillsEmptyObject = {
      check: false,
      softSkillName: ""
    }
    // View
    return (

      <View>
   <Subheading style={AppStyles.bold_600}>{stateObject.state.createStepsHeading[3]}</Subheading>
        {/* <Title>Soft Skill Details</Title> */}
        <View style={AppStyles.marginTop_1}>
          <CustomCheckBox
            label={'Soft Skill Assessment Required'}
            onPress={() => {
              dataModel.softSkillRequired = !dataModel.softSkillRequired;
              if (!dataModel.softSkillRequired) {
                dataModel.softSkills = []
              }
              parentStateChange({ dataModel: dataModel })
            }}
            checked={dataModel.softSkillRequired ? true : false}
            disabled={editable}
          />
        </View>


        {dataModel.softSkillRequired && <View>
          {/* {(stateObject.state.currentOperation == 'Create') && <View style={[AppStyles.row_space_between,AppStyles.marginTop_1]}>
          <Title></Title>
          {dataModel.softSkills.length != 0 &&<CustomButtons
            onPress={() => Paggination.functions.onClickNew(stateObject, 'softSkillsEmptyrecord', softSkillsEmptyObject)}
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
        </View>} */}

          {(stateObject.state.currentOperation == 'Create' || stateObject.state.currentOperation == 'Modification') && <View style={AppStyles.marginTop_2}>
            <CustomButtons
              onPress={() => this.onClickNew()}
              title={`Add soft skill`}
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

          {/* {(stateObject.state.currentOperation == 'Modification') && <View style={[AppStyles.flex_End, AppStyles.marginTop_1]}>
          <CustomButtons
            onPress={() => Paggination.functions.onClickNew(stateObject, 'softSkillsEmptyrecord', softSkillsEmptyObject)}
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
        </View>} */}

          {dataModel.softSkills == 0 && <ImpNotes
            isArray={false}
            message={`Click add button to add soft-skill details for an examination.`}
          />}

          <View>
            {dataModel.softSkills.map((item, index) => (
              <View key={index.toString()} style={[AppStyles.eventContainer, { borderLeftColor: GeneralUtils.functions._getRandomColor(index) }]}>
                <View style={[AppStyles.row_space_between, AppStyles.alignItems]}>
                  <View style={AppStyles.width80}>
                    <Subheading>{item.softSkillName}</Subheading>
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
              </View>

            ))}
          </View>
        </View>}


      {  Paggination.functions.editModaltwo &&  <SecondModal
          templates={<EditSoftSkillDetails stateObject={stateObject} />}
          stateObject={stateObject}
          title={Paggination.functions.selectedIndex == null ? 'Add' : 'Edit'}
          subTitle={'Soft Skill'}
          onSubmit={() => this.onSubmit()}
        />}

      </View>
    );
  }
}

const styles = StyleSheet.create({

})
export default ClassExamScheduleSoftSkill;

