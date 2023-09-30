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
import { TextInput, Title, Text, Subheading ,Caption} from 'react-native-paper';
import { w, h } from "../../../../utils/Dimensions";
import SelectListUtils from '../../../../utils/SelectListUtils'
import AppStyles from "../../../../AppStyles/AppStyles";
import CustomButtons from '../../../../components/CustomButtons';
import { UiColor } from "../../../../theme";
import OptionEditModal from '../OptionEditModal';
import EditOptionsDetails from '../EditOptionsDetails';
import OptionsPaggination from "../OptionsPaggination";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Exception from '../../../../utils/Exception'
import AntDesign from 'react-native-vector-icons/AntDesign';
import ImpNotes from '../../../../components/ImpNotes';

import Paggination from "../../../../utils/Paggination";







class InstituteClassConfigPeriod extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      selectedPeriodIndex: 0
    }
    this.onSubmit = this.onSubmit.bind(this)
  }




  Mandatory = function () {
    const {
      stateObject,
    } = this.props
    const { optionsEmptyRecord,questionDetailsEmptyrecord } = stateObject.state
    stateObject.state.errorField = []
    var mandatoryCheckError = false;
  
    if (optionsEmptyRecord.option == '' || optionsEmptyRecord.option == null) {
      mandatoryCheckError = true
      stateObject.state.errorField.push('field1')
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

    const { optionsEmptyRecord,selectedSectionIndex } = stateObject.state


    if (this.Mandatory())
    // OptionsPaggination.functions.addAndedit(stateObject,`sectionDetails[${selectedSectionIndex}].questionDetails.options`, optionsEmptyRecord)
    OptionsPaggination.functions.addAndedit(stateObject,'questionDetailsEmptyrecord' ,'options', optionsEmptyRecord)
     }






    onClickNew(){
      var emptyRecord = {
        optionNumber: "",
    option: "",
    optionImageID: "",
    optionImagePath: "",
    isItCorrectAnswer: false
      }
   
      const { stateObject } = this.props
      // Paggination.functions.onClickNew(stateObject, 'questionDetailsEmptyrecord', emptyRecord)
      OptionsPaggination.functions.onClickNew(stateObject, 'optionsEmptyRecord', emptyRecord)
     

    }
  
    onEdit(item, index){
 
      const { stateObject } = this.props
      // Paggination.functions.edit(stateObject, 'questionDetailsEmptyrecord', item, index)
      OptionsPaggination.functions.edit(stateObject, 'optionsEmptyRecord', item, index)
      
    }
  
    onDelete(index){
    
      const { stateObject } = this.props
      const { selectedSectionIndex } = stateObject.state
      // Paggination.functions.delete(stateObject, `sectionDetails[${selectedSectionIndex}].questionDetails`, index)
    
      OptionsPaggination.functions.delete(stateObject,'questionDetailsEmptyrecord' ,'options', index)
    }







  render() {
    const {
      stateObject,
      currentIndex
    } = this.props

    const { dataModel, editable, questionDetailsEmptyrecord } = stateObject.state
    const { parentStateChange } = stateObject

   console.log(questionDetailsEmptyrecord,"questionDetailsEmptyrecord")
 
    return (

      <View>
 
        {(stateObject.state.currentOperation == 'Create') && <View style={[AppStyles.row_space_between]}>
       
          <Subheading style={AppStyles.bold_600}>{'Options Details'}</Subheading>
          {questionDetailsEmptyrecord.options.length != 0 &&<CustomButtons
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

        {questionDetailsEmptyrecord.options.length == 0 && <View style={AppStyles.marginTop_2}>
          <CustomButtons
            onPress={() => this.onClickNew()}
            title={`Add Option`}
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

        {(stateObject.state.currentOperation == 'Modification' && questionDetailsEmptyrecord.options.length != 0 ) && <View style={[AppStyles.flex_End, AppStyles.marginTop_1]}>
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

        {questionDetailsEmptyrecord.options == 0 && <ImpNotes
          isArray={false}
          // message={`By clicking 'Add new Period Details' for new group `}
          message={`Click 'Option button to add the option details.`}
        />}



        <View >
          {questionDetailsEmptyrecord.options.map((item, index) => (
            <View key={index.toString()} style={AppStyles.marginTop_1}>
              <View style={[ AppStyles.row_in_space_around,AppStyles.alignItems]}>
                <View style={[AppStyles.flex_one]}>
                  <Subheading style={[AppStyles.bold_400]}>Option {index + 1}</Subheading>
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


              <View style={AppStyles.marginTop_1}>
                <Caption style={[AppStyles.textColor,]}>Option</Caption>
                <Text>{item.option}</Text>
              </View>

  
            </View>
          ))}
        </View>
        <OptionEditModal
          templates={<EditOptionsDetails stateObject={stateObject} />}
          stateObject={stateObject}
          title={OptionsPaggination.functions.selectedIndex == null ? 'Add' : 'Edit'}
          subTitle={'Option'}
          onSubmit={() => this.onSubmit()}
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({

})
export default InstituteClassConfigPeriod;

