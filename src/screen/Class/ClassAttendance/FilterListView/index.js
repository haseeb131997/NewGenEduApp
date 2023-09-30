
import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { h, w } from '../../../../utils/Dimensions';
import { UiColor } from '../../../../theme';
import AppStyles from "../../../../AppStyles/AppStyles";
import GeneralUtils from "../../../../utils/GeneralUtils";
import { Caption, Card, Subheading, Text, Title } from 'react-native-paper';
import CustomButtons from '../../../../components/CustomButtons';
import NewOperation from "../../../../utils/NewOperation";
import apiCall from "../../../../ApiCall/ActionApi";
import { cloneDeep } from 'lodash';



export default class FilterListView extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

 async viewDetails(rowData, index) {
    const { stateObject } = this.props;



    var emptyDetials = cloneDeep(stateObject.state.emptySummaryDataModel)

    stateObject.state.emptySummaryDataModel.filter.class = rowData.classID

  
    stateObject.state.currentOperation = "SecondLevel";
    stateObject.state.childViewDetails = rowData
    await NewOperation.functions.screenEventHandler(stateObject);


    if (apiCall.functions.apiError) {
      stateObject.parentStateChange({
        calendarIsOpen: false,
      })
    }
    else {
      stateObject.parentStateChange({
        summaryResultIndex: index,
        calendarIsOpen: true,
        childViewDetails:stateObject.state.childViewDetails,
        emptySummaryDataModel:emptyDetials,
        currentOperation: ''
      })
    }



    // stateObject.parentStateChange({
    //   summaryResultIndex: index,
    //   calendarIsOpen: true,
    //   childViewDetails: rowData
    // })
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

              <Card.Content>

                <View style={[AppStyles.alignItems]}>
                  <Title style={[AppStyles.titleColor]}>{rowData.classDescription}</Title>
                  <Caption style={[AppStyles.width85, AppStyles.textAlign_center,AppStyles.textColor]}>{rowData.classID}</Caption>
                </View>



                <View style={[AppStyles.row_space_between, AppStyles.marginTop_2]}>
                  <View style={[AppStyles.dashContainer, AppStyles.dashContaierWidth, AppStyles.alignItems]}>
                    <Subheading >{GeneralUtils.functions.getMonthFullName(rowData.month)}</Subheading>
                    <Text style={AppStyles.textColor}>{'Month'}</Text>
                  </View>

                  <View style={[AppStyles.dashContainer, AppStyles.dashContaierWidth, AppStyles.alignItems]}>
                    <Subheading >{rowData.year}</Subheading>
                    <Text style={AppStyles.textColor}>{'Year'}</Text>
                  </View>
                </View>



                <View style={[AppStyles.alignItems, AppStyles.marginTop_2]}>

                  <CustomButtons
                    onPress={() => this.viewDetails(rowData, index)}
                    title="View Attendances"
                    // titleStyle={AppStyles.signInTextStyle}
                    buttonStyle={{ backgroundColor: UiColor.SKYBLUE }}
                  />
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



