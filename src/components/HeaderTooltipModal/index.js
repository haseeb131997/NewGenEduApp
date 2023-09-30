
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
import { Modal, Portal, Title, Card, Divider } from 'react-native-paper';
import { h } from "../../utils/Dimensions";
import AppStyles from '../../AppStyles/AppStyles';
import ImpNotes from '../../components/ImpNotes';
import { UiColor } from "../../theme";
import ScreenContents from "../../utils/ScreenContents";
import { ScrollView } from 'react-native-gesture-handler';



const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;


class HeaderTooltipModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true
    }
  }
////N0U-108 fix starts
getContent (serviceName){
  const {
    stateObject,
  } = this.props
  switch(serviceName)
  {
     case 'GeneralLevelConfiguration':
  if(stateObject.state.screenType == 'subject'){
    return 'GeneralSubjectConfiguration'
  }
  else if(stateObject.state.screenType == 'fee'){
    return 'GeneralFeeConfiguration'
  }
  else if(stateObject.state.screenType == 'logo'){
    return 'GeneralLogoConfiguration'
  }
  else if(stateObject.state.screenType == 'other'){
    return 'GeneralOtherConfiguration'
  }
  break;
  case 'StudentProfile' :
   if(stateObject.state.userType == 'P' || stateObject.state.userType == 'S'){
    return 'StudentProfile_P'
   }
   else{
    return stateObject.state.serviceName
   }
   break;
   case 'OnlineClassroomService' :

   if(stateObject.state.heading=='Online Staff Meetings')
     return 'OnlineStaffMeetings';
   else if (stateObject.state.heading=='Online Parent/Student Meetings')
   return 'OnlineParentMeetings'
   else if (stateObject.state.heading=='Online Video Classroom')
   return 'OnlineVideoClassRoom'
   break 
  default:
    return stateObject.state.serviceName
  }
  
}
//N0U-108 fix ends


  render() {
    const {
      stateObject,
      planArray = []
    } = this.props
    // const { } = stateObject.state

    return (
      <Portal>
        <Modal visible={stateObject.state.showTooltipModal}
          onDismiss={() => stateObject.parentStateChange({
            showTooltipModal: false
            
          })}
        // contentContainerStyle={AppStyles.loginMainContainer}
        >
           <View style={[styles.modalContainer]}>
          <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
         
            <Card.Content>
              <View style={[AppStyles.row_space_between, AppStyles.marginVertical_1, AppStyles.alignItems]}>
                <View>
                <Title>Help</Title>
                </View>
                <TouchableOpacity onPress={() => stateObject.parentStateChange({
                  showTooltipModal: false
                })}>
                  <Image resizeMode='contain' style={AppStyles.crossIcon}
                    source={require('../../asssets/icons/arr061.png')}
                  /></TouchableOpacity>
              </View>
            </Card.Content>

         


            {(stateObject.state.serviceName == 'GeneralLevelConfiguration' || stateObject.state.serviceName == 'StudentProfile'||stateObject.state.serviceName == 'OnlineClassroomService') ?  <ImpNotes //N0U-108
              title={stateObject.state.heading}
                isArray={true}
                arrayMessage={ScreenContents.functions.getHeaderScreenContents(this.getContent(stateObject.state.serviceName),stateObject) } //N0U-108
              /> : <ImpNotes
              title={stateObject.state.heading}
                isArray={true}
                arrayMessage={stateObject.state.heading != 'Student eCircular' ? ScreenContents.functions.getHeaderScreenContents(stateObject.state.serviceName,stateObject) : ScreenContents.functions.getHeaderScreenContents('studentECircular',stateObject) }
              />}
            <Divider />
         
          </ScrollView>
          </View>
        </Modal>
      </Portal>
    );
  }
}


const styles = StyleSheet.create({

  modalContainer: {
    backgroundColor: UiColor.WHITE,
    margin: h('1.5%'),
    padding: h('2%'),
   // maxHeight: height - h('15%'),
  }

})

export default HeaderTooltipModal



