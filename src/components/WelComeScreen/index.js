
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
import { Text, Modal, Portal, Title, Subheading, Card } from 'react-native-paper';
import { w, h } from "../../utils/Dimensions";
import Exception from "../../utils/Exception.json";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GeneralUtils from "../../utils/GeneralUtils";
import AppStyles from '../../AppStyles/AppStyles';
import { Button } from 'react-native-elements';
import { UiColor } from "../../theme";
import CustomButtons from '../../components/CustomButtons';
import SubScreenUtils from "../../utils/SubScreenUtils";
import ImpNotes from '../../components/ImpNotes';





class WelComeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true
    }
  }

getBtnName (){
  const { stateObject } = this.props
switch (stateObject.state.serviceName) {
  case 'ClassAssignmentAssessment':
     return 'Assess Assignments'
    break;
    case 'ECircular':
      return 'eCircular'
     break;
     case 'OnlineClassroomService':
       if(stateObject.state.dataModel.meetingScreenType == 'S'){
        return '/ Schedule meeting'
       }
       else if (stateObject.state.dataModel.meetingScreenType == 'O') {
        return '/ Schedule Classroom'
       }
     break;

  default:
    return stateObject.state.heading
    break;
}

}



  render() {
    const { stateObject, title, message, imagePath } = this.props
    return (
      <Card style={[AppStyles.marginTop_3, AppStyles.flex_one]}>
        <View >
          {/* <View style={[AppStyles.alignItems, AppStyles.margin_2]}>
            <Title >{stateObject.state.welComeTitle}</Title>
          </View>
          <View style={{ marginHorizontal: w('8%') }}>
            {stateObject.state.welcomeInstruction.map((item, index) => (
              <View key={index.toString()} style={{flexDirection:'row',marginTop:h('1%')}}>
                <Text style={{ color: UiColor.DRAK_GRAY_COLOR }}>{'\u2022'}</Text>
                <Text style={[{ color: item.color},AppStyles.marginLeft_1]}>{item.text}</Text>
              </View>))
            }


          </View> */}

          <View style={AppStyles.margin_1}>
          <ImpNotes
           isArray={true}
           arrayMessage={stateObject.state.welcomeInstruction}
           title = {stateObject.state.welComeTitle}
          />
          </View>

          

         {stateObject.state.serviceName != 'ClassAssignmentAssessment' && <View style={[AppStyles.alignItems, AppStyles.marginTop_2]}>
            <CustomButtons
              onPress={() => SubScreenUtils.functions.createNew(stateObject)}
              title={`Create ${this.getBtnName()}`}
              // titleStyle={AppStyles.signInTextStyle}
              // containerStyle={AppStyles.goToContainer}
              buttonStyle={{ backgroundColor: UiColor.SKYBLUE }}
            />

          </View>}
        </View>
        <View style={[AppStyles.alignItems, styles.container]}>
          <Image
            resizeMode="contain"
            style={AppStyles.wellComeimageStyle}
            source={imagePath}
          />
        </View>
      </Card>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    marginTop: '5%'
  }

})

export default WelComeScreen



