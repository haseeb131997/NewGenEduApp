
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
import { View, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Text, Modal, Portal, Title, Subheading, Card, Divider } from 'react-native-paper';
import { w, h } from "../../utils/Dimensions";
import AppStyles from '../../AppStyles/AppStyles';
import { UiColor } from "../../theme";
import { ScrollView } from 'react-native-gesture-handler';
import AlertBox from '../../components/AlertBox';
import Spinner from '../../components/Loader';
import SubScreenUtils from "../../utils/SubScreenUtils";
import EditComponent from '../../components/EditComponent';
import ViewComponent from '../../components/ViewComponent';
import CreateComponent from '../../components/CreateComponent';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LessonHeaderTooltipModal from '../../components/LessonHeaderTooltipModal';


const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;


const plannerCalendarArray = [
  {
    text:'Click "Add daily plan" to add a new lesson plan',
    color:UiColor.DRAK_GRAY_COLOR
  },
  {
    text:'The plan headings are denoted in different colors based on their completion status.',
    color:UiColor.DRAK_GRAY_COLOR
  }
]


class CalendarModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true
    }
  }


  openToottipHelp() {
    const { stateObject } = this.props;
    stateObject.parentStateChange({
      showTooltipModal: true
    })
  }


  



  render() {
    const {
      stateObject, templates, stepsHeading, title, viewHeading, ViewTemplate, EditTemplate, CreateTemplate, queryTitle, querySubTitle
    } = this.props
    const { currentOperation } = stateObject.state
    return (
      <Portal>
        <Modal visible={stateObject.state.calendarIsOpen}
          onDismiss={() => SubScreenUtils.functions.calendarCloseModal(stateObject)}
          contentContainerStyle={AppStyles.loginMainContainer}
        >
          <View style={[styles.modalContainer, AppStyles.flex_one]}>
            <Card.Content>
              <View style={[AppStyles.row_space_between, AppStyles.marginVertical_1, AppStyles.alignItems]}>
                <View>
                  {stateObject.state.serviceName != 'TeacherLessonPlannerService' ? <Title>{viewHeading}</Title>
                    :
                    <View style={[AppStyles.flexDirectionRow, AppStyles.alignItems]}>
                      <Title>{viewHeading}</Title>
                      <View style={AppStyles.marginLeft_1}>
                        <AntDesign onPress={() => this.openToottipHelp()} name="questioncircle" size={styles.tooltipIcn.height} color={UiColor.VOILET_COLOR} />
                      </View>
                    </View>}

                  <Text style={AppStyles.textColor}>{title}</Text>
                </View>
                <TouchableOpacity onPress={() => SubScreenUtils.functions.calendarCloseModal(stateObject)}>
                  <Image resizeMode='contain' style={AppStyles.crossIcon}
                    source={require('../../asssets/icons/arr061.png')}
                  /></TouchableOpacity>
              </View>
            </Card.Content>
            <Divider />
            {templates}

            <CreateComponent
              stateObject={stateObject}
              templates={CreateTemplate}
              stepsHeading={stateObject.state.createStepsHeading}
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
              title={querySubTitle}
              viewHeading={queryTitle}
            />

            <AlertBox
              stateObject={stateObject}
            />

            <LessonHeaderTooltipModal
              stateObject={stateObject}
              planArray={plannerCalendarArray}
              title={'Montly Lesson Planner'}
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

  modalContainer: {
    backgroundColor: UiColor.WHITE,
    height: height - h('10%'),
    // margin: h('1.5%')
  },
  tooltipIcn: {
    height: h('2.5%')
  },

})

export default CalendarModal



