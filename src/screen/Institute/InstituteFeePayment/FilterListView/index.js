
import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { h, w } from '../../../../utils/Dimensions';
import { UiColor } from '../../../../theme';
import AppStyles from "../../../../AppStyles/AppStyles";
import GeneralUtils from "../../../../utils/GeneralUtils";
import { Caption, Card, Subheading, Text, Title } from 'react-native-paper';
import CustomButtons from '../../../../components/CustomButtons';
import NewOperation from "../../../../utils/NewOperation";
import apiCall from "../../../../ApiCall/ActionApi";

import { ListItem } from 'react-native-elements';
import { cloneDeep } from 'lodash';



export default class FilterListView extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }


  async viewDetails(rowData, index) {
    const { stateObject } = this.props;
    stateObject.state.childViewDetails.paymentDetails = []

    var  parentPageDetial = cloneDeep(stateObject.state.summaryDataModel.pageDetails)

    stateObject.state.summaryDataModel.pageDetails.pageNumber =  0
    stateObject.state.summaryDataModel.pageDetails.recordStartingNumber =  0
    stateObject.state.summaryDataModel.pageDetails.recordEndingNumber =  0
    stateObject.state.summaryDataModel.pageDetails.totalRecords =  0
    stateObject.state.summaryDataModel.pageDetails.totalPages =  0

    stateObject.state.currentOperation = "SecondLevel";
    stateObject.state.childViewDetails = rowData
    await NewOperation.functions.screenEventHandler(stateObject);

     for(let item of stateObject.state.childViewDetails.paymentDetails){
          item.paymentDate = stateObject.state.childViewDetails.paymentDate
     }

     stateObject.state.summaryDataModel.pageDetails = parentPageDetial
    if (apiCall.functions.apiError) {
      stateObject.parentStateChange({
        isLoading: false,
      })
    }
    else {
      stateObject.parentStateChange({
        summaryResultIndex: index,
        isChildRecordShow: true,
        childViewDetails: stateObject.state.childViewDetails,
        summaryDataModel:stateObject.state.summaryDataModel,
        isLoading: false,
        currentOperation: ''
      })
    }

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
              <View style={AppStyles.alignItems}>
                  <Title style={AppStyles.primaryTitleStyle}>{rowData.paymentDate}</Title>
                  <Caption style={AppStyles.textColor}>{'Payment Date'}</Caption>
                </View>


               

                <ListItem >
                  <Image resizeMode='contain' style={[AppStyles.inactiveMoreIcon, AppStyles.primaryImgColor]}
                    source={require('./../../../../asssets/icons/gen037.png')}
                  />
                  <ListItem.Content>
                    <Text style={AppStyles.textColor}>Collected Amount</Text>
                  </ListItem.Content>
                  <View>
                    <Text>{rowData.amountCollected}</Text>
                    <Caption style={AppStyles.currentTextStyle}>{stateObject.state.currencyCode}</Caption>
                  </View>
                </ListItem>


               


               



                
                <View style={[AppStyles.alignItems,AppStyles.marginTop_2]}>
                  <CustomButtons
                    onPress={() => this.viewDetails(rowData, index)}
                    title="View Payments"
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



