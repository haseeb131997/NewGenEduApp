
import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { h, w } from '../../../../utils/Dimensions';
import { UiColor } from '../../../../theme';
import AppStyles from "../../../../AppStyles/AppStyles";
import GeneralUtils from "../../../../utils/GeneralUtils";
import { Caption, Card, Subheading, Text, Title } from 'react-native-paper';
import SelectListUtils from "../../../../utils/SelectListUtils";
import Batch from "../../../../components/Batch";
import Ribbon from "../../../../components/Ribbon";
import StudentSerachBox from '../../../../components/StudentSerachBox';





var showResults = []

export default class FilterListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      summaryResult: [],
      searchQuery:''
    }
  }



  // getlable(status){
  //  if(status == 'Not Signed'){
  //   return 'Parent not signed'
  //  }
  //  else{
  //   return 'Parent signed'
  //  }
  // }

  onChangeSearch(text){
    this.setState({
     searchQuery:text
    }) 
   }



  render() {
    const { stateObject } = this.props;
    // showResults = GeneralUtils.functions.getSummaryResult(stateObject)
    var mapping=['studentName','studentID','classDesc','examDescription','signStatus']

    showResults = GeneralUtils.functions.studentSerachFilter(stateObject, GeneralUtils.functions.getSummaryResult(stateObject),mapping,this.state.searchQuery)
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
              <Ribbon
                stateObject={stateObject}
                label={rowData.signStatus}
                status={rowData.signStatus == 'Not Signed' ? 'R' : 'A'}
              />
              <Card.Content>
                <View style={AppStyles.alignItems}>
                  <Title style={AppStyles.primaryTitleStyle}>{rowData.studentName}</Title>
                  <Caption style={AppStyles.textColor}>{rowData.studentID}</Caption>
                </View>


                <View style={[AppStyles.marginTop_1]}>
                  <View style={[AppStyles.dashContainer, AppStyles.alignItems]}>
                    <Subheading >{rowData.classDesc}</Subheading>
                    <Text style={AppStyles.textColor}>{'Class'}</Text>
                  </View>
                </View>

                <View style={[AppStyles.marginTop_1]}>
                  <View style={[AppStyles.dashContainer, AppStyles.alignItems]}>
                    <Subheading >{rowData.examDescription}</Subheading>
                    <Text style={AppStyles.textColor}>{'Exam'}</Text>
                  </View>
                </View>
{/* 
                <View style={[AppStyles.row_space_between, AppStyles.marginTop_2]}>
                  <View style={[AppStyles.dashContainer, AppStyles.dashContaierWidth, AppStyles.alignItems]}>
                    <Subheading >{rowData.total}</Subheading>
                    <Text style={[AppStyles.textColor, AppStyles.textAlign_center]}>{'Total mark'}</Text>
                  </View>

                  <View style={[AppStyles.dashContainer, AppStyles.dashContaierWidth, AppStyles.alignItems]}>
                    <Subheading >{rowData.rank}</Subheading>
                    <Text style={[AppStyles.textColor, AppStyles.textAlign_center]}>{'Rank'}</Text>
                  </View>
                </View> */}



                <View style={[AppStyles.marginTop_2, AppStyles.alignItems]}>
                  <Subheading style={AppStyles.primaryTitleStyle}>{'Soft Skills'}</Subheading>
                </View>



                <View style={AppStyles.flex_one}>
                  {rowData.skills.map((itemData, index1) => (
                    <View key={index1.toString()} style={[AppStyles.eventContainer, { borderLeftColor: GeneralUtils.functions._getRandomColor(index1) }]}>
                      <Text style={AppStyles.titleColor}>{itemData.skillName}</Text>
                      {/* <Batch
                    value={itemData.date}
                    status={"app"}
                  /> */}



                      {/* <View style={[AppStyles.row_space_between,]}>
                        <View style={AppStyles.width48}>
                          <Text style={AppStyles.textColor}>{'Grade:'}</Text>
                        </View>
                        {<View>
                          <Text style={AppStyles.countStyle}>{itemData.grade}</Text>
                        </View>}
                      </View>
                      <View style={[AppStyles.row_space_between,]}>
                        <View style={AppStyles.width48}>
                          <Text style={AppStyles.textColor}>{'Mark:'}</Text>
                        </View>
                        {<View>
                          <Text style={AppStyles.countStyle}>{itemData.mark}</Text>
                        </View>}
                      </View> */}
{//N0U-103
                                                               }
                      <View style={{flexDirection: "row"}}> 
                        <View style={AppStyles.width48}>
                          <Text style={AppStyles.textColor}>{'Rating:'}</Text>
                        </View>
                        {<View style={AppStyles.width52}>
                          <Text style={AppStyles.countStyle}>{itemData.category}</Text>
                        </View>}
                      </View>
                     { //N0U-103
                                                               }
                      <View style={{flexDirection: "row"}}> 
                        <View style={AppStyles.width48}>
                          <Text style={AppStyles.textColor}>{'Teacher Feedback:'}</Text>
                        </View>
                        {<View style={AppStyles.width52} >
                          <Text  style={AppStyles.countStyle} >{itemData.teacherFeedback != '' ? itemData.teacherFeedback : 'No feedback'}</Text>
                        </View>}
                      </View>
                       {/* <Batch
                    value={itemData.category}
                    status={"S"}
                  /> */}
                    </View>))
                  }
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


})



