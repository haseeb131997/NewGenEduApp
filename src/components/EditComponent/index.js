
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


import React, { Component } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Text, Modal, Portal, Title,  Card, Divider } from 'react-native-paper';
//import { w, h } from "../../utils/Dimensions";
import AppStyles from '../../AppStyles/AppStyles';
import { UiColor } from "../../theme";
import NewOperation from "../../utils/NewOperation";
import { ScrollView } from 'react-native-gesture-handler';
import CustomButtons from '../../components/CustomButtons';
import AlertBox from '../../components/AlertBox';
import Spinner from '../../components/Loader';
import CompletedScreen from '../../components/CompletedScreen';
import SubScreenUtils from "../../utils/SubScreenUtils";
import GeneralUtils from "../../utils/GeneralUtils";
import Exception from '../../utils/Exception'
import SpeedDailMenu from '../../components/SpeedDailMenu';




class CreateComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true
    }
  }


  getActivityTitle() {
    const { stateObject } = this.props
    if (stateObject.state.type == 'Enroll' && !GeneralUtils.functions.uploadEventImage) {
      return 'Enroll Students'
    }
    else if (stateObject.state.type == 'Shortlist' && !GeneralUtils.functions.uploadEventImage) {
      return 'Shortlist participants'
    }
    else if (stateObject.state.type == 'Result' && !GeneralUtils.functions.uploadEventImage) {
      return 'Result declaration'
    }
    else if (stateObject.state.type == 'Edit' && GeneralUtils.functions.uploadEventImage) {
      return 'Event Gallery'
    }
    else {
      return 'Edit'
    }
  }



 getTitle (){
  const {
    stateObject
  } = this.props
  if(stateObject.state.serviceName == 'TeacherLessonPlannerService'  && GeneralUtils.functions.showCompletion){
    return 'Mark Completion'
  }
  else if(stateObject.state.serviceName == 'InstituteOtherActivity'){
  
    return this.getActivityTitle()
 
  }
  else{
    return 'Edit'
  }

 }

 closeModal(){
  const {
    stateObject
  } = this.props
  if(!stateObject.state.showComplete){
    GeneralUtils.functions.unSaveBtnStatus = true
    Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-104', errorMessage: '', errorParam: "" }])
  }
  else{
    SubScreenUtils.functions.closeModal(stateObject)
  }
 

 
}

  render() {
    const {
      stateObject, templates, stepsHeading, title
    } = this.props
    const { currentOperation } = stateObject.state
    return (
      <Portal>
        <Modal visible={currentOperation == 'Modification' ? true : false}
          // onDismiss={() => this.closeModal()}
          contentContainerStyle={AppStyles.loginMainContainer}
        >
          <View style={[AppStyles.modalContainer,AppStyles.flex_one]}>
            
            <Card.Content>
              <View style={[AppStyles.row_space_between, AppStyles.marginVertical_1, AppStyles.alignItems]}>
                <View>
                  <Title>{this.getTitle()}</Title>
                  <Text style={AppStyles.textColor}>{title}</Text>
                </View>
                <TouchableOpacity onPress={() => this.closeModal()}>
                  <Image resizeMode='contain' style={AppStyles.crossIcon}
                    source={require('../../asssets/icons/arr061.png')}
                  /></TouchableOpacity>
              </View>
            </Card.Content>
            <Divider />
            
           


            {!stateObject.state.showComplete && <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
              <View style={AppStyles.marginTop_2}>
                <Card.Content>
                  {templates}
                  <View style={AppStyles.marginTop_3} />
                </Card.Content>

              </View>
              <Divider />
              <View>
              <SpeedDailMenu  stateObject={stateObject}></SpeedDailMenu>
             </View>

              {!stateObject.state.showComplete && <View style={[AppStyles.row_space_between, AppStyles.marginVertical_2, AppStyles.marginHorizontal_2]}>
                <CustomButtons
                  onPress={() => SubScreenUtils.functions.closeModal(stateObject)}
                  title={'Discard'}
                  // titleStyle={AppStyles.btnTextStyle}
                  containerStyle={AppStyles.errorBtnContainer}
                  buttonStyle={{ backgroundColor: UiColor.ERROR_COLOR }}
                />

                <CustomButtons
                  onPress={() => NewOperation.functions.edit(stateObject)}
                  title={'Save Changes'}
                  containerStyle={AppStyles.signInContainer}
                  buttonStyle={{ backgroundColor: UiColor.SKYBLUE }}
                />
              </View>}

             
            </ScrollView>}
            


            {stateObject.state.showComplete &&
                <CompletedScreen
                  title={stateObject.state.heading}
                  Subheading={'edited'}
                  stateObject={stateObject}
                />
              }

            <AlertBox
              stateObject={stateObject}
            />
            {stateObject.state.isLoading &&
              <Spinner loading={stateObject.state.isLoading} />}
            {/* {(stateObject.state.serviceName == 'StudyMaterial' || stateObject.state.serviceName == 'ClassAssignment' || stateObject.state.serviceName == 'ClassAssignmentAssessment') && <FullViewDocument
              stateObject={stateObject}
              source={GeneralUtils.functions.getSource(GeneralUtils.functions.contentPath, stateObject)}
              fileName={GeneralUtils.functions.getFileName(GeneralUtils.functions.contentPath)}
            />} */}
          </View>
        </Modal>
      </Portal>
    );
  }
}


const styles = StyleSheet.create({


})

export default CreateComponent



