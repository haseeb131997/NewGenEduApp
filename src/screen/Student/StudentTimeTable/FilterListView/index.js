
import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { h, w } from '../../../../utils/Dimensions';
import { UiColor } from '../../../../theme';
import AppStyles from "../../../../AppStyles/AppStyles";
import GeneralUtils from "../../../../utils/GeneralUtils";
import { Caption, Card, Subheading, Text, Title } from 'react-native-paper';
import StudentSerachBox from '../../../../components/StudentSerachBox';



var tableHeading = []
var showResults = []

export default class FilterListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      summaryResult: [],
      searchQuery:''
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


  onSelectDay(index, item) {
    for (let i = 0; i < this.state.summaryResult.length; i++) {
      if (i == index) {
        this.state.summaryResult[i].selectedDay = item
      }
    }
    this.setState({
      summaryResult: this.state.summaryResult
    })


  }

  componentDidMount() {
    const { stateObject } = this.props;
    var temArray = GeneralUtils.functions.getSummaryResult(stateObject)
    for (let item of temArray) {
      item.selectedDay = 'Mon'
    }
    this.setState({
      summaryResult: temArray
    })
  }


  getPeriodList(timeTableArray,selectedDay){

    for (let i = 0; i < timeTableArray.length; i++) {
      if( timeTableArray[i].day == selectedDay){
        return timeTableArray[i].period
      }
     
    }
    return []
  }

  onChangeSearch(text){
    this.setState({
     searchQuery:text
    }) 
   }



  render() {
    const { stateObject, dataModel } = this.props;

    // showResults = GeneralUtils.functions.getSummaryResult(stateObject)

    // console.log(showResults, "showResults")

    var mapping=['classDesc',]

    showResults = GeneralUtils.functions.studentSerachFilter(stateObject, this.state.summaryResult,mapping,this.state.searchQuery)


    return (
      <View>
       <StudentSerachBox
    searchQuery={this.state.searchQuery}
    stateObject={stateObject}
    onChangeSearch={(text)=> this.onChangeSearch(text)}
    />

        {showResults.map((rowData, index) => (
          <TouchableOpacity disabled key={index.toString()}>
            <Card style={AppStyles.marginTop_2}>

              <Card.Content>
                {/* <View style={AppStyles.alignItems}>
                  <Title style={AppStyles.primaryTitleStyle}>{rowData.studentName}</Title>
                  <Caption >{rowData.studentID}</Caption>
                </View> */}

                <View style={[AppStyles.marginTop_2]}>
                  <View style={[AppStyles.dashContainer, AppStyles.alignItems]}>
                    <Subheading style={AppStyles.titleColor} >{rowData.classDesc}</Subheading>
                    <Text style={AppStyles.textColor}>{'Class'}</Text>
                  </View>
                </View>

                <View style={[AppStyles.marginTop_2]}>
                  <View style={[AppStyles.dashContainer]}>
                    <View style={AppStyles.row_in_space_around}>
                      {this.getTableHeading(rowData).map((item, index1) => (
                        <TouchableOpacity key={index1.toString()}
                          onPress={() => this.onSelectDay(index, item, rowData.studentID)}
                          style={[AppStyles.marginTop_2, { backgroundColor: rowData.selectedDay == item ? UiColor.SKYBLUE : UiColor.WHITE }, styles.dayContainer]}>
                          <Text style={{ color: rowData.selectedDay == item ? UiColor.WHITE : UiColor.SKYBLUE }}>{item}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>


                    {rowData.timeTable.length != 0 && this.getPeriodList(rowData.timeTable,rowData.selectedDay).map((item, index2) => (
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



