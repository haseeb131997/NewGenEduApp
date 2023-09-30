
import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { h, w } from '../../../../utils/Dimensions';
import { UiColor } from '../../../../theme';
import AppStyles from "../../../../AppStyles/AppStyles";
import GeneralUtils from "../../../../utils/GeneralUtils";
import { Caption, Card, Subheading, Text, Title } from 'react-native-paper';
import StudentSerachBox from '../../../../components/StudentSerachBox';





var showResults = []

export default class FilterListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      summaryResult: [],
      searchQuery: ''
    }
  }


  onChangeSearch(text) {
    this.setState({
      searchQuery: text
    })
  }


  render() {
    const { stateObject } = this.props;

    // showResults = GeneralUtils.functions.getSummaryResult(stateObject)

    var mapping = ['examDescription']

    showResults = GeneralUtils.functions.studentSerachFilter(stateObject, GeneralUtils.functions.getSummaryResult(stateObject), mapping, this.state.searchQuery)


    return (
      <View>
        <StudentSerachBox
          searchQuery={this.state.searchQuery}
          stateObject={stateObject}
          onChangeSearch={(text) => this.onChangeSearch(text)}
        />
        {showResults.map((rowData, index) => (
          <TouchableOpacity disabled key={index.toString()}>
            <Card style={AppStyles.marginTop_2}>

              <Card.Content>
                {/* <View style={AppStyles.alignItems}>
                  <Title style={AppStyles.primaryTitleStyle}>{rowData.studentName}</Title>
                  <Caption style={AppStyles.textColor}>{rowData.studentID}</Caption>
                </View> */}

                <View style={[AppStyles.marginTop_1]}>
                  <View style={[AppStyles.dashContainer, AppStyles.alignItems]}>
                    <Subheading style={AppStyles.titleColor} >{rowData.examDescription}</Subheading>
                    <Text style={AppStyles.textColor}>{rowData.exam}</Text>
                  </View>
                </View>



                <View style={[AppStyles.marginTop_2, AppStyles.alignItems]}>
                  <Subheading >{'Schedule'}</Subheading>
                </View>



                <View style={AppStyles.flex_one}>
                  {rowData.Subjectschedules.map((itemData, index1) => (
                    <View key={index1.toString()} style={[AppStyles.eventContainer, { borderLeftColor: GeneralUtils.functions._getRandomColor(index1) }]}>
                      <Text style={AppStyles.primaryTitleStyle}>{itemData.subjectName}</Text>
                      {/* <Batch
                    value={itemData.date}
                    status={"app"}
                  /> */}
                       <View style={[AppStyles.row_space_between,]}>
                        <View style={AppStyles.width48}>
                          <Text style={AppStyles.textColor}>{'Date:'}</Text>
                        </View>
                        {<View>
                          <Text style={AppStyles.countStyle}>{itemData.date}</Text>
                        </View>}
                      </View>

                      <View style={[AppStyles.row_space_between,]}>
                        <View style={AppStyles.width48}>
                          <Text style={AppStyles.textColor}>{'Time:'}</Text>
                        </View>
                        {<View>
                          <Text style={AppStyles.countStyle}>{`${itemData.startTime.hour}:${itemData.startTime.min} to ${itemData.endTime.hour}:${itemData.endTime.min}`}</Text>
                        </View>}
                      </View>

                      <View style={[AppStyles.row_space_between,]}>
                        <View style={AppStyles.width48}>
                          <Text style={AppStyles.textColor}>{'Maximum Mark:'}</Text>
                        </View>
                        {<View>
                          <Text style={AppStyles.countStyle}>{itemData.maxMark}</Text>
                        </View>}
                      </View>

                      <View style={[AppStyles.row_space_between,]}>
                        <View style={AppStyles.width48}>
                          <Text style={AppStyles.textColor}>{'Syllabus:'}</Text>
                        </View>
                        {<View>
                          <Text style={AppStyles.countStyle}>{itemData.syllabus}</Text>
                        </View>}
                      </View>



                      {itemData.hall != "" && <View style={[AppStyles.row_space_between,]}>
                        <View style={AppStyles.width48}>
                          <Text style={AppStyles.textColor}>{'Hall:'}</Text>
                        </View>
                        {<View>
                          <Text style={AppStyles.countStyle}>{itemData.hall}</Text>
                        </View>}
                      </View>}






                    </View>))
                  }
                </View>


                {rowData.softSkills.length != 0 &&
                  <View>
                    <View style={[AppStyles.marginTop_2, AppStyles.alignItems]}>
                      <Subheading >{'Soft skills to be assessed for this exam'}</Subheading>
                    </View>


                    <View style={AppStyles.flex_one}>
                      {rowData.softSkills.map((itemData, index1) => (
                        <View key={index1.toString()} style={[AppStyles.eventContainer, { borderLeftColor: GeneralUtils.functions._getRandomColor(index1) }]}>
                          <View style={[AppStyles.row_space_between,]}>
                            {/*<View style={AppStyles.width48}>
                              <Text style={AppStyles.textColor}>{'Skill name'}</Text>
                      </View> */}
                            {<View>
                              <Text style={AppStyles.countStyle}>{itemData.softSkillName}</Text>
                            </View>}
                          </View>
                        </View>))
                      }
                    </View>
                  </View>
                }
















              </Card.Content>
            </Card>
          </TouchableOpacity>
        ))}

      </View>
    )
  }
}

const styles = StyleSheet.create({


})



