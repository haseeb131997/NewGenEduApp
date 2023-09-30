
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




export default class FilterListView extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }


  async viewDetails(rowData, index) {
    const { stateObject } = this.props;
    console.log(rowData)

    stateObject.state.currentOperation = "SecondLevel";
    stateObject.state.childViewDetails = rowData
    await NewOperation.functions.screenEventHandler(stateObject);



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
                <View style={[AppStyles.alignSelf]}>
                  <View style={[AppStyles.alignItems]}>
                  <Caption >{'Fee Type'}</Caption>
                    <Subheading style={[AppStyles.titleColor, AppStyles.textAlign_center]}>{rowData.feeType}</Subheading>
                   
                  </View>
                  <View style={[AppStyles.alignItems, AppStyles.marginTop_1]}>
                    <Caption >{'Fee applicable to'}</Caption>
                    <Subheading style={[AppStyles.titleColor,AppStyles.textAlign_center]}>{rowData.groupDescription}</Subheading>

                  </View>
                </View>


                <ListItem>
                  <Image resizeMode='contain' style={[AppStyles.inactiveMoreIcon, AppStyles.voiletImgColor]}
                    source={require('./../../../../asssets/icons/fin003.png')}
                  />
                  <ListItem.Content>
                    <Text style={AppStyles.textColor}>Total fee</Text>
                  </ListItem.Content>
                  <View>
                    <Text>{rowData.totalFeeAmount}</Text>
                    <Caption style={AppStyles.currentTextStyle}>{stateObject.state.currencyCode}</Caption>
                  </View>
                </ListItem>


                <ListItem >
                  <Image resizeMode='contain' style={[AppStyles.inactiveMoreIcon, AppStyles.primaryImgColor]}
                    source={require('./../../../../asssets/icons/gen037.png')}
                  />
                  <ListItem.Content>
                    <Text style={AppStyles.textColor}>Received</Text>
                  </ListItem.Content>
                  <View>
                    <Text>{rowData.amountCollected}</Text>
                    <Caption style={AppStyles.currentTextStyle}>{stateObject.state.currencyCode}</Caption>
                  </View>
                </ListItem>


                <ListItem >
                  <Image resizeMode='contain' style={[AppStyles.inactiveMoreIcon, AppStyles.errorImgColor]}
                    source={require('./../../../../asssets/icons/abs019.png')}
                  />
                  <ListItem.Content>
                    <Text style={AppStyles.textColor}>Pending</Text>
                  </ListItem.Content>
                  <View>
                    <Text>{rowData.amountPending}</Text>
                    <Caption style={AppStyles.currentTextStyle}>{stateObject.state.currencyCode}</Caption>
                  </View>
                </ListItem>


                <ListItem >
                  <Image resizeMode='contain' style={[AppStyles.inactiveMoreIcon, AppStyles.errorImgColor]}
                    source={require('./../../../../asssets/icons/gen044.png')}
                  />
                  <ListItem.Content>
                    <Text style={AppStyles.textColor}>Overdue</Text>
                  </ListItem.Content>
                  <View>
                    <Text>{rowData.amountOverDue}</Text>
                    <Caption style={AppStyles.currentTextStyle}>{stateObject.state.currencyCode}</Caption>
                  </View>
                </ListItem>



                
                <View style={[AppStyles.alignItems,AppStyles.marginTop_2]}>
                  <CustomButtons
                    onPress={() => this.viewDetails(rowData, index)}
                    title="View Breakup"
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



