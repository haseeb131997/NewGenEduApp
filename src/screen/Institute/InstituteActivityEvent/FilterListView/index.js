
import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity,Image } from 'react-native';
import { h, w } from '../../../../utils/Dimensions';
import { UiColor } from '../../../../theme';
import AppStyles from "../../../../AppStyles/AppStyles";
import GeneralUtils from "../../../../utils/GeneralUtils";
import { Caption, Card, Subheading, Text, Title } from 'react-native-paper';
import CustomButtons from '../../../../components/CustomButtons';
import apiCall from "../../../../ApiCall/ActionApi";
import NewOperation from "../../../../utils/NewOperation";
import SelectListUtils from "../../../../utils/SelectListUtils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ListItem } from 'react-native-elements';




export default class FilterListView extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  async viewDetails(rowData, index) {
    const { stateObject } = this.props;

    var globalData = JSON.parse(await AsyncStorage.getItem('GLOBAL'));


    stateObject.state.currentOperation = "SecondLevel";
    stateObject.state.childViewDetails = rowData
    await NewOperation.functions.screenEventHandler(stateObject);




    for (let i = 0; i < stateObject.state.childViewDetails.activityDetails.length; i++) {

      stateObject.state.childViewDetails.activityDetails[i].instituteID = globalData.instituteID
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

              <View style={[AppStyles.alignSelf]}>
                  <View style={[AppStyles.alignItems]}>
                  <Caption >{'Activity Type'}</Caption>
                    <Subheading style={[AppStyles.titleColor, AppStyles.textAlign_center]}>{SelectListUtils.functions.getSelectedValueNew(SelectListUtils.functions.selectMaster.ActivityTypeMaster,rowData.activityType)}</Subheading>
                   
                  </View>
                  <View style={[AppStyles.alignItems, AppStyles.marginTop_1]}>
                    <Caption >{'Activities applicable to'}</Caption>
                    <Subheading style={[AppStyles.titleColor,AppStyles.textAlign_center]}>{rowData.groupDescription}</Subheading>

                  </View>
                </View>

                <ListItem >
                  <Image resizeMode='contain' style={[AppStyles.labelImgIcon, AppStyles.appImgColor]}
                    source={require('./../../../../asssets/icons/placard.png')}
                  />
                  <ListItem.Content>
                    <Text style={AppStyles.textColor}>No. of events conducted</Text>
                  </ListItem.Content>
                  <View>
                    <Text>{rowData.activityCount}</Text>
                  </View>
                </ListItem>


                <View style={[AppStyles.alignItems, AppStyles.marginTop_2]}>

                  <CustomButtons
                    onPress={() => this.viewDetails(rowData, index)}
                    title="View Activities/Events"
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



