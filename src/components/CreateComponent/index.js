
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
import { Text, Modal, Portal, Title, Subheading, Card, Divider, Caption } from 'react-native-paper';
import { w, h } from "../../utils/Dimensions";
import AppStyles from '../../AppStyles/AppStyles';
import { UiColor } from "../../theme";
import NextPreviousBtn from '../NextPreviousBtn';
import NewOperation from "../../utils/NewOperation";
import { ScrollView } from 'react-native-gesture-handler';
import AlertBox from '../../components/AlertBox';
import Spinner from '../../components/Loader';
import RedirectToUserManual from "../../utils/RedirectToUserManual";
import Exception from '../../utils/Exception'
import GeneralUtils from "../../utils/GeneralUtils";
import SubScreenUtils from "../../utils/SubScreenUtils";



// ClassAttendance

const CreateDefaultScreen = ["ClassTimeTable", "ClassMark", "ClassSoftSkill", "TeacherLessonPlannerService", "ClassAttendance", "InstitutePayment", "NotificationTemplate"]

const levelTwoCreateDefaultScreen = ["InstitutePayment"]

const beforeCreateDefaultScreen = ["TeacherLessonPlannerService"]

class CreateComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true
    }
    this.callingBeforeCreateDefault = this.callingBeforeCreateDefault.bind(this)
  }



  async callingBeforeCreateDefault(serviceName) {
    const {
      stateObject, templates, stepsHeading, title
    } = this.props
    var operation = 'Create'

    switch (serviceName) {
      case 'TeacherLessonPlannerService':
        if (!stateObject.state.calendarIsOpen) {
          var dateArr = stateObject.state.dataModel.date.split("-");
          stateObject.state.summaryDataModel.filter.month = dateArr[1];
          stateObject.state.summaryDataModel.filter.year = dateArr[2];
          stateObject.state.summaryDataModel.filter.teacherName = stateObject.state.dataModel.teacherName;
          stateObject.state.summaryDataModel.filter.teacherID = stateObject.state.dataModel.teacherID;
          stateObject.state.summaryResultByFilter.SummaryResult = [];
          if (stateObject.mandatoryCheck(operation, stateObject.state.currentStep)) {
            await NewOperation.functions.search(stateObject);

            if (stateObject.state.summaryResultByFilter.SummaryResult.length != 0) {
              Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-091', errorMessage: '', errorParam: [this.state.dataModel.teacherName, this.state.summaryDataModel.filter.year, GeneralUtils.functions.getMonthName(this.state.summaryDataModel.filter.month), dataModel.date] }])
              return false;
            }
            else {
              await NewOperation.functions.createDefault(stateObject)
            }
          }
        }
        else {
          if (stateObject.mandatoryCheck(operation, stateObject.state.currentStep)) {
            NewOperation.functions.createDefault(stateObject)
          }
        }
        break;

      case 'StudentLessonPlannerService':
        if (!stateObject.state.calendarIsOpen) {
          var dateArr = stateObject.state.dataModel.date.split("-");
          stateObject.state.summaryDataModel.filter.month = dateArr[1];
          stateObject.state.summaryDataModel.filter.year = dateArr[2];
          stateObject.state.summaryDataModel.filter.studentName = stateObject.state.dataModel.studentName;
          stateObject.state.summaryDataModel.filter.studentID = stateObject.state.dataModel.studentID;
          stateObject.state.summaryResultByFilter.SummaryResult = [];
          if (stateObject.mandatoryCheck(operation, stateObject.state.currentStep)) {
            await NewOperation.functions.search(stateObject);

            if (stateObject.state.summaryResultByFilter.SummaryResult.length != 0) {
              Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-091', errorMessage: '', errorParam: [this.state.dataModel.studentName, this.state.summaryDataModel.filter.year, GeneralUtils.functions.getMonthName(this.state.summaryDataModel.filter.month), dataModel.date] }])
              return false;
            }
            else {
              await NewOperation.functions.createDefault(stateObject)
            }
          }
        }
        else {
          if (stateObject.mandatoryCheck(operation, stateObject.state.currentStep)) {
            NewOperation.functions.createDefault(stateObject)
          }
        }
        break;


    }


  }


  onNextEvent = () => {
    const {
      stateObject, templates, stepsHeading, title
    } = this.props
    const { currentOperation } = stateObject.state
    var operation = 'Create'
    if (stateObject.state.currentStep == 1 && CreateDefaultScreen.includes(stateObject.state.serviceName)) {
      // if (beforeCreateDefaultScreen.includes(stateObject.state.serviceName)) {
      //   this.callingBeforeCreateDefault(stateObject.state.serviceName)
      // } else {
      if (stateObject.mandatoryCheck(operation, stateObject.state.currentStep)) {
        if (stateObject.state.serviceName == "InstitutePayment") {
          NewOperation.functions.paymentCreateDefault(stateObject)
        }
        else {
          NewOperation.functions.createDefault(stateObject)
        }

      }
      // }
    }
    else if (stateObject.state.currentStep == 2 && levelTwoCreateDefaultScreen.includes(stateObject.state.serviceName)) {
      NewOperation.functions.paymentCreateDefault(stateObject)
    }
    else {
      NewOperation.functions.screenEventHandler(stateObject)
    }
  }

  closeModal() {
    const {
      stateObject, stepsHeading
    } = this.props
    if ((stepsHeading.length) != stateObject.state.currentStep) {
      GeneralUtils.functions.unSaveBtnStatus = true
      Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-104', errorMessage: '', errorParam: "" }])
    }
    else {
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
        <Modal visible={currentOperation == 'Create' ? true : false}
          onDismiss={() => this.closeModal()}
          contentContainerStyle={AppStyles.loginMainContainer}
        >
          <View style={[AppStyles.modalContainer, AppStyles.flex_one]}>
            <Card.Content>
              <View style={[AppStyles.row_space_between, AppStyles.marginVertical_1, AppStyles.alignItems]}>
                {/* <Title>Create</Title> */}
                <View>
                  <Title>{stateObject.state.serviceName == 'NewStudentAssignment' ? 'Answer' : stateObject.state.serviceName =='ClassAssignmentAssessment'? 'Assess':'Create'}</Title>
                  <Text style={AppStyles.textColor}>{title}</Text>
                </View>
                <TouchableOpacity
                  // onPress={() => SubScreenUtils.functions.closeModal(stateObject)}
                  onPress={() => this.closeModal()}

                >
                  <Image resizeMode='contain' style={AppStyles.crossIcon}
                    source={require('../../asssets/icons/arr061.png')}
                  /></TouchableOpacity>
              </View>
            </Card.Content>
            <Divider />
            <ScrollView
              scrollEnabled={stateObject.state.enableScrollViewScroll}
              bounces={false} showsVerticalScrollIndicator={false}>
              <View style={AppStyles.marginTop_2}>
                <Card.Content>
                  {templates}
                  <Text>{'\n'}</Text>
                </Card.Content>
              </View>
              <Divider />
              {(stepsHeading.length) != stateObject.state.currentStep ? <View style={[AppStyles.marginLeft_2, AppStyles.marginTop_1]}>
                <Caption>If you need more info, please check out <Text onPress={() => RedirectToUserManual.functions.redirectToUserManualLink(stateObject.state.userType, stateObject.state.serviceName)} style={AppStyles.manualTextStyle}>User Manual</Text></Caption>
              </View> : null}
              <NextPreviousBtn
                stateObject={stateObject}
                currentStep={stateObject.state.currentStep}
                onNextEvent={() => this.onNextEvent()}
                onPreviousEvent={() => NewOperation.functions.screenBackEventHandler(stateObject)}
                stepsHeading={stepsHeading}
              />


            </ScrollView>




            <View style={AppStyles.marginTop_2} />
            <AlertBox
              stateObject={stateObject}
            />

            {stateObject.state.isLoading &&
              <Spinner loading={stateObject.state.isLoading} />}


          </View>
        </Modal>
      </Portal>
    );
  }
}


const styles = StyleSheet.create({

})

export default CreateComponent



