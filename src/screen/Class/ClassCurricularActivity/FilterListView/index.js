
import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { h, w } from '../../../../utils/Dimensions';
import { UiColor } from '../../../../theme';
import AppStyles from "../../../../AppStyles/AppStyles";
import GeneralUtils from "../../../../utils/GeneralUtils";
import { Caption, Card, Subheading, Text, Title } from 'react-native-paper';
import SelectListUtils from "../../../../utils/SelectListUtils";
import Batch from "../../../../components/Batch";
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

  onChangeSearch(text){
    this.setState({
     searchQuery:text
    }) 
   }



  getParticipationStatus(data) {
    if (data.participate && data.enroll) {
      return {
        lable: 'Enrolled & Participated',
        status: 'S'
      }
    }
    else if (!data.participate && data.enroll) {
      return {
        lable: 'Enrolled & Not Participated',
        status: 'W'
      }
    }
    else if (!data.participate && !data.enroll) {
      return {
        lable: 'Not Enrolled & Not Participated',
        status: 'E'
      }
    }
    else {
      return {
        lable: '',
        status: ''
      }
    }

  }


  render() {
    const { stateObject } = this.props;

    // showResults = GeneralUtils.functions.getSummaryResult(stateObject)

    var mapping=['activityName','date','dueDate','maxEnroll','maxParticipation','venue','feeDescription','feeDueDate','feeDescription','amount']

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

              <Card.Content>
                <View style={AppStyles.alignItems}>
                  <Title style={AppStyles.primaryTitleStyle}>{rowData.studentName}</Title>
                  <Caption style={AppStyles.textColor}>{rowData.studentID}</Caption>
                </View>


                <View style={[AppStyles.marginTop_2, AppStyles.alignItems]}>
                  <Subheading style={AppStyles.primaryTitleStyle}>{'Event Information'}</Subheading>
                </View>

                <View style={[AppStyles.marginTop_1]}>
                  <View style={[AppStyles.dashContainer, AppStyles.alignItems]}>
                    <Subheading style={AppStyles.textAlign_center}>{rowData.activityName}</Subheading>
                    <Text style={AppStyles.textColor}>{'Activity Name'}</Text>
                  </View>
                </View>



                {rowData.level != '' ? <View style={[AppStyles.row_space_between, AppStyles.marginTop_2]}>
                  <View style={[AppStyles.dashContainer, AppStyles.dashContaierWidth, AppStyles.alignItems]}>
                    <Subheading >{SelectListUtils.functions.getSelectedValueNew(SelectListUtils.functions.selectMaster.ActivityTypeMaster, rowData.activityType)}</Subheading>
                    <Text style={AppStyles.textColor}>{'Activity Type'}</Text>
                  </View>

                  <View style={[AppStyles.dashContainer, AppStyles.dashContaierWidth, AppStyles.alignItems]}>
                    <Subheading >{SelectListUtils.functions.getSelectedValue(SelectListUtils.functions.selectMaster.OtherActivityLevelMaster, rowData.level)}</Subheading>
                    <Text style={AppStyles.textColor}>{'Level'}</Text>
                  </View>
                </View> : <View style={[AppStyles.marginTop_2]}>
                  <View style={[AppStyles.dashContainer, AppStyles.alignItems]}>
                    <Subheading >{SelectListUtils.functions.getSelectedValueNew(SelectListUtils.functions.selectMaster.ActivityTypeMaster, rowData.activityType)}</Subheading>
                    <Text style={AppStyles.textColor}>{'Activity Type'}</Text>
                  </View>
                </View>}

                <View style={[AppStyles.marginTop_2]}>
                  <View style={[AppStyles.dashContainer, AppStyles.alignItems]}>
                    <Subheading >{rowData.date}</Subheading>
                    <Text style={AppStyles.textColor}>{'Event Date'}</Text>
                  </View>
                </View>

                <View style={[AppStyles.marginTop_2]}>
                  <View style={[AppStyles.dashContainer, AppStyles.alignItems]}>
                    <Subheading style={AppStyles.textAlign_center}>{rowData.venue}</Subheading>
                    <Text style={AppStyles.textColor}>{'Venue'}</Text>
                  </View>
                </View>


                <View style={[AppStyles.marginTop_2, AppStyles.alignItems]}>
                  <Subheading style={AppStyles.primaryTitleStyle}>{'Enroll details'}</Subheading>
                </View>

                <View style={[AppStyles.marginTop_2]}>
                  <View style={[AppStyles.dashContainer, AppStyles.alignItems]}>
                    {/* <Subheading >{rowData.dueDate}</Subheading> */}
                    <Batch
                      value={this.getParticipationStatus(rowData).lable}
                      status={this.getParticipationStatus(rowData).status}
                    />
                    <Text style={AppStyles.textColor}>{'Participation status'}</Text>
                  </View>
                </View>

                <View style={[AppStyles.row_space_between, AppStyles.marginTop_2]}>
                  <View style={[AppStyles.dashContainer, AppStyles.dashContaierWidth, AppStyles.alignItems]}>
                    <Subheading >{rowData.maxEnroll}</Subheading>
                    <Text style={[AppStyles.textColor, AppStyles.textAlign_center]}>{'Maximum no. of students who can enroll'}</Text>
                  </View>

                  <View style={[AppStyles.dashContainer, AppStyles.dashContaierWidth, AppStyles.alignItems]}>
                    <Subheading >{rowData.maxParticipation}</Subheading>
                    <Text style={[AppStyles.textColor, AppStyles.textAlign_center]}>{'Maximum no. of students who can participation'}</Text>
                  </View>
                </View>

                <View style={[AppStyles.marginTop_2]}>
                  <View style={[AppStyles.dashContainer, AppStyles.alignItems]}>
                    <Subheading >{rowData.dueDate}</Subheading>
                    <Text style={AppStyles.textColor}>{'Last date for enrollment'}</Text>
                  </View>
                </View>


                {rowData.feeID != '' && <View>
                  <View style={[AppStyles.marginTop_2, AppStyles.alignItems]}>
                    <Subheading style={AppStyles.primaryTitleStyle}>{'Fee Information'}</Subheading>
                  </View>

                  <View style={[AppStyles.marginTop_1]}>
                    <View style={[AppStyles.dashContainer, AppStyles.alignItems]}>
                      <Subheading >{rowData.feeDescription}</Subheading>
                      <Text style={AppStyles.textColor}>{'Fee Description'}</Text>
                    </View>
                  </View>

                  <View style={[AppStyles.row_space_between, AppStyles.marginTop_2]}>
                    <View style={[AppStyles.dashContainer, AppStyles.dashContaierWidth, AppStyles.alignItems]}>
                      <Subheading >{rowData.feeDueDate}</Subheading>
                      <Text style={[AppStyles.textColor, AppStyles.textAlign_center]}>{'Fee Due date'}</Text>
                    </View>

                    <View style={[AppStyles.dashContainer, AppStyles.dashContaierWidth, AppStyles.alignItems]}>
                      <Subheading >{rowData.amount} {stateObject.state.currencyCode}</Subheading>
                      <Text style={[AppStyles.textColor, AppStyles.textAlign_center]}>{'Amount'}</Text>
                    </View>
                  </View>
                </View>}





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



