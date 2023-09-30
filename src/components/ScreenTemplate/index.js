
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
import { Text, Divider, Caption } from 'react-native-paper';
import { w, h } from "../../utils/Dimensions";
import AppStyles from '../../AppStyles/AppStyles';
import { UiColor } from "../../theme";
import { ScrollView } from 'react-native-gesture-handler';
import AlertBox from '../../components/AlertBox';
import AppHeader from "../../components/AppHeader";
import Spinner from '../../components/Loader';
import CustomButtons from '../../components/CustomButtons';
import SpeedDailMenu from '../../components/SpeedDailMenu';
import CreateComponent from '../../components/CreateComponent';
import FilterComponent from '../../components/FilterComponent';
import EditComponent from '../../components/EditComponent';
import ViewComponent from '../../components/ViewComponent';
import AuthAndRejectComponent from '../../components/AuthAndRejectComponent';
import ScreenHeader from '../../components/ScreenHeader';
import SummaryResultTitle from '../../components/SummaryResultTitle';
import WelComeScreen from '../../components/WelComeScreen';
import NewOperation from "../../utils/NewOperation";
import ScreenUtils from "../../utils/ScreenUtils";
import Toast from 'react-native-toast-message';
import apiCall from "../../ApiCall/ActionApi";
import FullViewDocument from '../../components/FullViewDocument';
import GeneralUtils from "../../utils/GeneralUtils";
import ImpNotes from '../../components/ImpNotes';
import HeaderTooltipModal from '../../components/HeaderTooltipModal';





const toastConfig = {

  my_custom_type: ({ text2, props, ...rest }) => (

    <View style={[{
      width: '95%', backgroundColor: UiColor.WHITE,
      borderRadius: h('1%')
    }, AppStyles.projection]}>
      <Card.Content style={{ paddingVertical: h('1%') }}>
        <View style={AppStyles.row_space_between}>
          <View style={[AppStyles.flexDirectionRow, AppStyles.alignItems]}>
            <Image
              resizeMode="contain"
              style={{ height: h('5%'), width: w('10%') }}
              source={require('./../../asssets/app-icon.png')}
            />

            <Text style={AppStyles.marginLeft_1}>NewGenEducationApp</Text>
          </View>

          <TouchableOpacity onPress={() => Toast.hide()}>
            <Image resizeMode='contain' style={AppStyles.crossIcon}
              source={require('../../asssets/icons/arr061.png')}
            /></TouchableOpacity>
        </View>

      </Card.Content>
      <Divider />
      <Card.Content style={{ padding: h('1%') }}>
        <Caption>{text2}</Caption>
      </Card.Content>
    </View>

  )
};



class ScreenTemplate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true
    }
  }



  showMore = function (stateObject) {

  stateObject.state.currentOperation = "SummaryQuery";
    NewOperation.functions.screenEventHandler(stateObject)

  }
  // welComeTitle:'Academic year configuration',
  //     welcomeInstruction:Instruction

  getViewTitle(serviceName) {
    const { stateObject } = this.props

    switch (serviceName) {
      case "GroupMapping":
        return stateObject.state.dataModel.groupID
        break;
      case "ClassExamSchedule":
        return stateObject.state.dataModel.exam
        break;
      case "ClassAttendance":
        return stateObject.state.dataModel.date
        break;
      case "StudyMaterial":
        return stateObject.state.dataModel.materialID
        break;
      case "InstituteAssignment":
        return stateObject.state.dataModel.groupDesc
        break;
      case "InstituteFeeManagement":
        return stateObject.state.dataModel.groupDesc
        break;
      case "TeacherLeaveManagement":
        return stateObject.state.dataModel.teacherID
        break;
      case "StudentLeaveManagement":
        return stateObject.state.dataModel.studentID
        break;
      case "UserRole":
        return stateObject.state.dataModel.roleDescription
        break;
        case "InstitutePayment":
        return stateObject.state.dataModel.studentID
        break;
        case "Notification":
          return stateObject.state.dataModel.instant
          break;
        case "ClassLessonPlannerService":
        return stateObject.state.dataModel.classDescription
        break;
      default:
        return stateObject.state.heading
        break;
    }

  }

  render() {
    const { stateObject, CreateTemplate, QueryTemplate, EditTemplate, ViewTemplate, AuthTemplate, FilterTemplate, viewHeading } = this.props


    var viewTitle = this.getViewTitle(stateObject.state.serviceName)

    var lengthOfSummaryResult = GeneralUtils.functions.getSummaryResult(stateObject).length


    return (
      <View style={AppStyles.subScreenContainer}>
        <AppHeader
          stateObject={stateObject}
        />
        {((stateObject.state.currentOperation == 'SummaryQuery' || stateObject.state.displayContent == 'summaryResultByFilter') && !stateObject.state.calendarIsOpen && !stateObject.state.isChildRecordShow) && <View>
          {(!stateObject.state.intialFetching && stateObject.state.summaryDataModel.SummaryResult.length != 0 &&((!stateObject.state.hasOwnProperty('speedDialRequired')) ||(stateObject.state.hasOwnProperty('speedDialRequired') && stateObject.state.speedDialRequired))) && <SpeedDailMenu
            stateObject={stateObject}
          />}
        </View>}
        {/* <Text onPress={() => ScreenUtils.functions.openToast(stateObject)}>openToast</Text> */}
        {/* isChildRecordShow */}
        <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
          <View style={AppStyles.container}>


            <ScreenHeader
              stateObject={stateObject}
              title={stateObject.state.heading}
              breadcrumb={stateObject.state.breadcrumb}
              intialFetching={stateObject.state.intialFetching}
            />



            {!stateObject.state.intialFetching && <View>
              {stateObject.state.summaryDataModel.SummaryResult.length != 0 ?

                <SummaryResultTitle
                  stateObject={stateObject}
                />
                : (!apiCall.functions.apiError ? <WelComeScreen
                  stateObject={stateObject}
                  title={"Welcome!"}
                  message={"There are no records added yet"}
                  imagePath={require('../../asssets/image/illustration3.png')}
                /> : null)}

              {/* summary record */}
              {stateObject.state.summaryDataModel.SummaryResult.length > 0 &&
                FilterTemplate
              }

            

              {(stateObject.state.summaryDataModel.pageDetails.moreRecExists && stateObject.state.displayContent != 'summaryResultByFilter' && lengthOfSummaryResult < 30) &&
                <View style={[AppStyles.alignItems, AppStyles.marginTop_3,]}>
                  <CustomButtons
                    onPress={() => this.showMore(stateObject)}
                    title="Show more"
                    titleStyle={AppStyles.signInTextStyle}
                    containerStyle={AppStyles.btnContainer}
                    buttonStyle={{ backgroundColor: UiColor.SKYBLUE }}
                  />


                </View>}

              {(stateObject.state.displayContent != 'summaryResultByFilter' && lengthOfSummaryResult >= 30) &&
                <View>
                  <ImpNotes
                    isArray={false}
                    message={`At the maximum you can load upto ${lengthOfSummaryResult} recent records. Use search to find records that are not listed above.`}
                  />
                  <Text>{'\n \n \n'}</Text>
                </View>
              }
              {stateObject.state.displayContent == 'summaryResultByFilter' && <View style={[AppStyles.alignItems, AppStyles.marginTop_3,]}>
                <CustomButtons
                  onPress={() => ScreenUtils.functions.discardSearch(stateObject)}
                  title={'Discard search'}
                  // titleStyle={AppStyles.btnTextStyle}
                  containerStyle={AppStyles.errorBtnContainer}
                  buttonStyle={{ backgroundColor: UiColor.ERROR_COLOR }}
                />
              </View>}
            </View>
            }
          </View>
        </ScrollView>


        {(stateObject.state.serviceName == 'StudyMaterial' || stateObject.state.serviceName == 'ClassAssignment' || stateObject.state.serviceName == 'ClassAssignmentAssessment' || stateObject.state.serviceName == 'InstituteAssignment' || stateObject.state.serviceName == 'InstitutePayment'  || stateObject.state.serviceName ==  'TeacherNotesService' ) && <FullViewDocument
          stateObject={stateObject}
          source={GeneralUtils.functions.getSource(GeneralUtils.functions.contentPath, stateObject)}
          fileName={GeneralUtils.functions.getFileName(GeneralUtils.functions.contentPath)}
        />}

        <CreateComponent
          stateObject={stateObject}
          templates={CreateTemplate}
          stepsHeading={stateObject.state.createStepsHeading}
          title={stateObject.state.heading}
        />
        <FilterComponent
          stateObject={stateObject}
          templates={QueryTemplate}
          title={stateObject.state.heading}
        />
        <EditComponent
          stateObject={stateObject}
          templates={EditTemplate}
          title={stateObject.state.heading}
        />
        <ViewComponent
          stateObject={stateObject}
          templates={ViewTemplate}
          title={viewTitle}
          viewHeading={viewHeading}
        />
        <AuthAndRejectComponent
          stateObject={stateObject}
          templates={AuthTemplate}
          title={stateObject.state.heading}
        />

        <HeaderTooltipModal
          stateObject={stateObject}
        />



        
        {/*Rajfix001 Toast ref warning changes starts
        <Toast config={toastConfig} ref={(ref) => Toast.setRef(ref)} /> */}
        
      <Toast config={toastConfig} />
      {/*/*Toast ref warning changes ends*/}
        
        <AlertBox
          stateObject={stateObject}
        />
        {stateObject.state.isLoading &&
          <Spinner loading={stateObject.state.isLoading} />}

      </View>
    );
  }
}


const styles = StyleSheet.create({

})

export default ScreenTemplate



