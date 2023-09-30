
import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { h, w } from '../../../../utils/Dimensions';
import { UiColor } from '../../../../theme';
import AppStyles from "../../../../AppStyles/AppStyles";
import GeneralUtils from "../../../../utils/GeneralUtils";
import { Caption, Card, Subheading, Text, Title } from 'react-native-paper';
import SideMenu from "../../../../components/SideMenu";
import SelectListUtils from '../../../../utils/SelectListUtils'
import Ribbon from "../../../../components/Ribbon";


var tableHeading = []
var timeTableshowResults = []

export default class FilterListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      summaryResult: [],
    }
  }




  getTableHeading(rowData) {
    const tabHeading = ["Mon", "Tue", "Wed", "Thu", "Fri", 'Sat', "Sun",]
    tableHeading = []
    for (let item of tabHeading) {
      for (let val of rowData.timeTable)
        if (item == val.day) {
          tableHeading.push(val.day)
        }
    }
    return tableHeading
    // }
  }


  onSelectDay(index, item,parentIndex) {
    const { stateObject } = this.props;
    for (let i = 0; i < [stateObject.state.timeTableshowResults[parentIndex]].length; i++) {
      if (i == index) {
        [stateObject.state.timeTableshowResults[parentIndex]][i].selectedDay = item
      }
    }
    stateObject.setState({
      timeTableshowResults: stateObject.state.timeTableshowResults
    })

  }




  getPeriodList(timeTableArray, selectedDay) {

    for (let i = 0; i < timeTableArray.length; i++) {
      if (timeTableArray[i].day == selectedDay) {
        return timeTableArray[i].period
      }

    }
    return []
  }



  render() {
    const { stateObject } = this.props;
    var showResults = []



    showResults = GeneralUtils.functions.getSummaryResult(stateObject)

  



    return (
      <View>
        {showResults.map((rowData, index) => (
          <TouchableOpacity disabled key={index.toString()}>
            <Card style={AppStyles.marginTop_2}>
              <View style={AppStyles.row_space_between}>
                <Ribbon
                  stateObject={stateObject}
                  label={SelectListUtils.functions.getSelectedValueNew(SelectListUtils.functions.selectMaster.AuthStatusMaster, rowData.authStat)}
                  status={rowData.authStat}
                />
                <View style={AppStyles.menuContainer}>
                  <SideMenu
                    summaryResultIndex={index}
                    viewDetail={rowData}
                    stateObject={stateObject}
                    menuTitle={(rowData.authStat == 'A' || rowData.authStat == 'R') ? ['View', 'Edit', 'Delete'] : ['View', 'Edit', 'Delete', 'Approve/Reject']}
                  />
                </View>
              </View>
              <Card.Content>
                <View style={AppStyles.alignItems}>
                  <Title style={[AppStyles.primaryTitleStyle, AppStyles.textAlign_center]}>{rowData.classDesc}</Title>
                  <Caption style={AppStyles.textColor}>{'Class'}</Caption>
                </View>
                <View style={[AppStyles.row_space_between, AppStyles.marginTop_2]}>
                  <View style={[AppStyles.dashContainer, AppStyles.dashContaierWidth, AppStyles.alignItems]}>
                    <Subheading >{rowData.standard}</Subheading>
                    <Text style={AppStyles.textColor}>{'Standard'}</Text>
                  </View>

                  <View style={[AppStyles.dashContainer, AppStyles.dashContaierWidth, AppStyles.alignItems]}>
                    <Subheading >{rowData.section}</Subheading>
                    <Text style={AppStyles.textColor}>{'Section'}</Text>
                  </View>
                </View>


                {stateObject.state.timeTableshowResults.length != 0 && [stateObject.state.timeTableshowResults[index]].map((rowData, childIndex) => (
                  <TouchableOpacity disabled key={childIndex.toString()}>
                    <View style={AppStyles.marginTop_2}>

                      <View style={[AppStyles.marginTop_2]}>
                        <View style={[AppStyles.dashContainer]}>
                          <View style={AppStyles.row_in_space_around}>
                            {this.getTableHeading(rowData).map((item, index1) => (
                              <TouchableOpacity key={index1.toString()}
                                onPress={() => this.onSelectDay(childIndex, item, index)}
                                style={[AppStyles.marginTop_2, { backgroundColor: rowData.selectedDay == item ? UiColor.SKYBLUE : UiColor.WHITE }, styles.dayContainer]}>
                                <Text style={{ color: rowData.selectedDay == item ? UiColor.WHITE : UiColor.SKYBLUE }}>{item}</Text>
                              </TouchableOpacity>
                            ))}
                          </View>


                          {(rowData.timeTable != undefined && rowData.timeTable.length != 0) && this.getPeriodList(rowData.timeTable, rowData.selectedDay).map((item, index2) => (
                            <View key={index2.toString()}>
                              <View style={[AppStyles.flexDirectionRow, AppStyles.alignItems, AppStyles.marginTop_2,]}>
                                <View
                                  style={[AppStyles.periodBox]}>
                                  <Text style={{ color: UiColor.SKYBLUE }}>Period {item.periodNumber}</Text>
                                </View>
                                <View style={AppStyles.marginLeft_1}>
                                  <Subheading>{item.startTime.hour}:{item.startTime.min} - {item.endTime.hour}:{item.endTime.min}</Subheading>
                                  <Caption style={AppStyles.textColor}>Teacher : <Caption style={styles.valueStyle}>{item.teacherName}</Caption></Caption>
                                  <Caption style={AppStyles.textColor}>Subject : <Caption style={styles.valueStyle}>{item.subjectName}</Caption></Caption>
                                </View>
                              </View>
                              <View style={AppStyles.dashedLine} />
                            </View>
                          ))}
                        </View>
                      </View>

                    </View>
                  </TouchableOpacity>
                ))}






              </Card.Content>
            </Card>
          </TouchableOpacity>
        ))}

      </View>
    )
  }
}

const styles = StyleSheet.create({

  dayContainer: {
    height: h('7.5%'), width: w('10%'), borderRadius: h('10%'), alignItems: "center", justifyContent: 'center'
  },



})



