
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
import SelectListUtils from '../../../../utils/SelectListUtils'

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

     for (let i = 0; i < stateObject.state.childViewDetails.notificationDetails.length; i++) {
      stateObject.state.childViewDetails.notificationDetails[i].bodyTemplate = ''
    }



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
                <View style={AppStyles.alignItems}>
                  <Title style={AppStyles.primaryTitleStyle}>{SelectListUtils.functions.getSelectedValue(SelectListUtils.functions.selectMaster.NotificationMaster, rowData.notificationType)}</Title>
                  <Caption style={AppStyles.textColor}>{'Notification Type'}</Caption>
                </View>



                {/* <View style={[AppStyles.marginTop_1]}>
                  <View style={[AppStyles.dashContainer, AppStyles.alignItems]}>
                    <Subheading >{rowData.notificationTypeDescription}</Subheading>
                    <Text style={AppStyles.textColor}>{'Description'}</Text>
                  </View>
                </View> */}

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

                <ListItem >
                  <Image resizeMode='contain' style={[AppStyles.inactiveMoreIcon, AppStyles.primaryImgColor]}
                    source={require('./../../../../asssets/icons/gen037.png')}
                  />
                  <ListItem.Content>
                    <Text style={AppStyles.textColor}>No. of notifications</Text>
                  </ListItem.Content>
                  <View>
                    <Text>{rowData.notificationCount}</Text>
              
                  </View>
                </ListItem>





                <View style={[AppStyles.alignItems, AppStyles.marginTop_2]}>
                  <CustomButtons
                    onPress={() => this.viewDetails(rowData, index)}
                    title="View Notification"
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



