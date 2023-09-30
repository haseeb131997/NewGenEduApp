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
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { TextInput, Card, Text, Avatar, Title,Divider,Subheading,Caption } from 'react-native-paper';
import AppStyles from "../../../../AppStyles/AppStyles";
import InputText from '../../../../components/InputText';
import ImpNotes from '../../../../components/ImpNotes';





class StudentClassesDetailView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    }
  }




  _classDetailItem  = ({ item, index }) => {
    const { stateObject } = this.props
    const { dataModel, editable, } = stateObject.state
   
    return (
      <View key={index.toString()} style={[AppStyles.marginTop_3,AppStyles.marginLeft_1,AppStyles.marginRight_2]}  >
        <View style={AppStyles.marginTop_3}>
          <InputText
            label={'Class Code'}
            secureTextEntry={false}
            value={item.classId}
            editable={editable}
          />
        </View>

        <View style={AppStyles.marginTop_3}>
          <InputText
            label={'Description'}
            secureTextEntry={false}
            value={item.classDesc}
            editable={editable}
          />
        </View>

        <View style={AppStyles.marginTop_3}>
          <InputText
            label={'Start Date'}
            secureTextEntry={false}
            value={item.startDate}
            editable={editable}
          />
        </View>
    
        <View style={AppStyles.marginTop_3}>
          <InputText
            label={'End Date'}
            secureTextEntry={false}
            value={item.endDate}
            editable={editable}
          />
        </View>

       

      </View>
    );
  }




  render() {
    const { stateObject, currentIndex } = this.props
    var currentInd = 0
    if (currentIndex >= 1) {
      currentInd = currentIndex - 1
    }
    const { dataModel, editable } = stateObject.state
    const { parentStateChange } = stateObject
    return (
      <View>
  
        {/* <Title>Classes enrolled</Title> */}
        {/* <Divider style={AppStyles.marginTop_1} /> */}
        {/* <MaterialCommunityIcons name={"message-reply-text"} size={AppStyles.iconSize.height} color={UiColor.LIGHT_TEXT_COLOR} /> */}

        {dataModel.classes != 0 ? <View>
          {dataModel.classes.map((item, index) => (
        <View key={index.toString()} style={[AppStyles.flexDirectionRow,AppStyles.marginTop_3]}>
          <Image resizeMode='contain' style={[AppStyles.inactiveMoreIcon, AppStyles.marginTop_2]}
            source={require('./../../../../asssets/icons/com003.png')}
          />
          <View style={[AppStyles.marginLeft_2, AppStyles.flex_one]}>
            <Subheading>{item.classDesc}</Subheading>
            <Caption style={AppStyles.textColor}>{item.classId}</Caption>
           <View style={AppStyles.row_space_between}>
           <View style={[AppStyles.dashContainer, AppStyles.marginTop_1]}>
              <Caption style={AppStyles.textColor}>Start date</Caption>
              <Subheading>{item.startDate}</Subheading>
            </View>

            <View style={[AppStyles.dashContainer, AppStyles.marginTop_1]}>
            <Caption style={AppStyles.textColor}>End date</Caption>
              <Subheading>{item.endDate}</Subheading>
            </View>
           </View>
          </View>

        </View>
    ))}
   </View> : stateObject.state.currentOperation != 'Modification' ? <ImpNotes
              isArray={false}
              message={`${dataModel.studentName} is not registered into any classes now.`}
            /> : null}
  
        {/* <CustomCarousel
          stateObject={stateObject}
          data={dataModel.classes}
          renderItem={this._classDetailItem}
          activeSlideIndexStateName= {'classActiveSlideIndex'}
          activeSlideIndex={stateObject.state.classActiveSlideIndex}
        /> */}


      </View>

    );
  }
}

const styles = StyleSheet.create({
})
export default StudentClassesDetailView;
