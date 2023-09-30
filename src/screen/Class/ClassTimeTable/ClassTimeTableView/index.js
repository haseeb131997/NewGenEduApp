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
import { TextInput, Card, Text, Modal, Title, Subheading, Caption, Divider } from 'react-native-paper';
import { w, h } from "../../../../utils/Dimensions";
import SelectListUtils from '../../../../utils/SelectListUtils'
import AppStyles from "../../../../AppStyles/AppStyles";
import CustomDropDownPicker from '../../../../components/CustomDropDownPicker';
import { UiColor } from "../../../../theme";
import LabelText from '../../../../components/LabelText';




var tableHeading = []
var periodList = []
var heading = ''


class ClassTimeTableView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      selectedDay: 0
    }
    this.onSelectDay = this.onSelectDay.bind(this)
  }



  onSelectDay(index) {
    this.setState({
      selectedDay: index,
    })
  }

  render() {
    const {
      stateObject
    } = this.props
    const { summaryDataModel, dataModel, currentOperation } = stateObject.state
    const { parentStateChange } = stateObject


    const tabHeading = ["Mon", "Tue", "Wed", "Thu", "Fri", 'Sat', "Sun",]

    if (tableHeading.length == 0) {
      for (let item of tabHeading) {
        for (let val of dataModel.timeTable)
          if (item == val.day) {
            tableHeading.push(val.day)
            // temArry.push(val)
          }
      }
    }



    periodList = dataModel.timeTable.filter(data => Number(data.dayNumber) == (this.state.selectedDay + 1))



    return (
      <View >
        <Card.Content>
          <View style={AppStyles.row_in_space_around}>
            {tableHeading.map((item, index) => (
              <TouchableOpacity key={index.toString()}
                onPress={() => this.onSelectDay(index)}
                style={[AppStyles.marginTop_2, { backgroundColor: this.state.selectedDay == index ? UiColor.SKYBLUE : UiColor.WHITE }, styles.dayContainer]}>
                <Text style={{ color: this.state.selectedDay == index ? UiColor.WHITE : UiColor.SKYBLUE }}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <Divider style={AppStyles.marginTop_1} />
          {periodList.length != 0 && periodList[0].period.map((item, index) => (
            <View key={index.toString()}>
              <View style={[AppStyles.flexDirectionRow, AppStyles.alignItems, AppStyles.marginTop_2,]}>
                <View
                  style={[AppStyles.periodBox]}>
                  <Text style={{ color: UiColor.SKYBLUE }}>Period {item.periodNumber}</Text>
                </View>
                <View style={AppStyles.marginLeft_1}>
                  <Subheading>{item.startTime.hour}:{item.startTime.min} - {item.endTime.hour}:{item.endTime.min}</Subheading>
                  {/* <Caption style={AppStyles.textColor}>{item.teacherID}</Caption> */}
                  <Caption style={AppStyles.textColor}>Teacher Name : <Caption style={styles.valueStyle}>{item.teacherName}</Caption></Caption>
                  <Caption style={AppStyles.textColor}>Teacher ID : <Caption style={styles.valueStyle}>{item.teacherID}</Caption></Caption>
                  <Caption style={AppStyles.textColor}>Subject : <Caption style={styles.valueStyle}>{item.subjectName}</Caption></Caption>
                </View>
              </View>
              <View style={AppStyles.dashedLine} />
            </View>
          ))}

        </Card.Content>
      </View>

    );
  }
}

const styles = StyleSheet.create({

  dayContainer: {
    height: h('7.5%'), width: w('10%'), borderRadius: h('10%'), alignItems: "center", justifyContent: 'center'
  },
  valueStyle: {
    color: UiColor.BLACK
  },
})


export default ClassTimeTableView;

