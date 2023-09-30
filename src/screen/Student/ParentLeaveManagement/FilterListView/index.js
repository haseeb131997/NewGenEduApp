
import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { h, w } from '../../../../utils/Dimensions';
import { UiColor } from '../../../../theme';
import AppStyles from "../../../../AppStyles/AppStyles";
import GeneralUtils from "../../../../utils/GeneralUtils";
import { Caption, Card, Subheading, Text, Title } from 'react-native-paper';
import CustomButtons from '../../../../components/CustomButtons';
import apiCall from "../../../../ApiCall/ActionApi";
import NewOperation from "../../../../utils/NewOperation";
import Ribbon from "../../../../components/Ribbon";
import Batch from "../../../../components/Batch";
import SelectListUtils from '../../../../utils/SelectListUtils'
import SideMenu from "../../../../components/SideMenu";
import { ListItem } from 'react-native-elements';




export default class FilterListView extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  // async viewDetails(rowData, index, status) {
  //   const { stateObject } = this.props;

  //   stateObject.state.emptySummaryDataModel.filter.authStat = status

  //   stateObject.state.currentOperation = "SecondLevel";
  //   stateObject.state.childViewDetails = rowData
  //   await NewOperation.functions.screenEventHandler(stateObject);


  //   if (apiCall.functions.apiError) {
  //     stateObject.parentStateChange({
  //       isLoading: false,
  //     })
  //   }
  //   else {
  //     stateObject.parentStateChange({
  //       summaryResultIndex: index,
  //       isChildRecordShow: true,
  //       childViewDetails: stateObject.state.childViewDetails,
  //       isLoading: false,
  //       currentOperation: ''
  //     })
  //   }
  // }


  getNoon(noon) {
    switch (noon) {
      case 'F':
        return 'Forenoon'
        break
      case 'A':
        return 'Afternoon'
        break
    }
  }

  getType(type) {
    if (type == 'S' || type == 'P' || type == 'C') {
      return SelectListUtils.functions.getSelectedValue(SelectListUtils.functions.selectMaster.LeaveMaster, type)
    }
    else {
      return type
    }
  }


  render() {
    const { stateObject } = this.props;
    var showResults = []
    showResults = GeneralUtils.functions.getParentTransactionSummaryResult(stateObject)

console.log(stateObject.state.summaryDataModel,"stateObject.state.summaryDataModel.SummaryResult")

console.log(stateObject.state.summaryResultByFilter,"stateObject.state.summaryDataModel.SummaryResult")


console.log(stateObject.state.displayContent,"stateObject.state.summaryDataModel.SummaryResult")

    return (<View>
      {showResults.map((rowData, index) => (
        <TouchableOpacity disabled key={index.toString()}>
          <Card style={AppStyles.marginTop_2}>
            <View style={AppStyles.row_space_between}>
              <Ribbon
                stateObject={stateObject}
                label={SelectListUtils.functions.getSelectedValueNew(SelectListUtils.functions.selectMaster.AuthStatusMaster, rowData.authStat)}
                status={rowData.authStat}
              />
              <View />
              <View style={AppStyles.menuContainer}>
                <SideMenu
                  summaryResultIndex={stateObject.state.summaryResultIndex}
                  viewDetail={rowData}
                  stateObject={stateObject}
                  menuTitle={(rowData.authStat == 'A' || rowData.authStat == 'R') ? ['View', 'Edit', 'Cancel'] : ['View', 'Edit', 'Cancel']}
                />
              </View>
            </View>
            <Card.Content>
              {/* {stateObject.state.userType == "P" && <View style={[AppStyles.alignItems]}>
                <Title style={[AppStyles.titleColor]}>{rowData.studentName}</Title>
                <Caption style={[AppStyles.width85, AppStyles.textAlign_center]}>{rowData.studentID}</Caption>
              </View>} */}

              {/* <View style={[AppStyles.dashContainer, AppStyles.alignItems]}>
                  <Subheading >{rowData.classDescription}</Subheading>
                  <Text style={[AppStyles.textColor, AppStyles.textAlign_center]}>{'Class'}</Text>
                </View> */}

              <View style={[AppStyles.row_space_between, AppStyles.marginTop_2]}>
                <View style={[AppStyles.dashContainer, AppStyles.dashContaierWidth, AppStyles.alignItems]}>
                  <Subheading >{this.getType(rowData.type)}</Subheading>
                  <Text style={[AppStyles.textColor, AppStyles.textAlign_center]}>{'Leave Type'}</Text>
                </View>
                <View style={[AppStyles.dashContainer, AppStyles.dashContaierWidth, AppStyles.alignItems]}>
                  <Batch
                    value={rowData.leaveStatus}
                    status={rowData.leaveStatus == "Approved" ? 'S' : (rowData.leaveStatus == "Pending" ? 'W' : 'E')}
                  />
                  <Text style={AppStyles.textColor}>{'Leave Status'}</Text>
                </View>
              </View>


              {(rowData.fromNoon == 'D' && rowData.toNoon == 'D') && <View style={[AppStyles.row_space_between, AppStyles.marginTop_2]}>
                <View style={[AppStyles.dashContainer, AppStyles.dashContaierWidth, AppStyles.alignItems]}>
                  <Subheading >{rowData.from}</Subheading>
                  <Text style={[AppStyles.textColor, AppStyles.textAlign_center]}>{'Leave Start Date'}</Text>
                </View>
                <View style={[AppStyles.dashContainer, AppStyles.dashContaierWidth, AppStyles.alignItems]}>
                  <Subheading >{rowData.to}</Subheading>
                  <Text style={AppStyles.textColor}>{'Leave End Date'}</Text>
                </View>
              </View>}
              {((rowData.fromNoon == 'F' && rowData.toNoon == 'F') || (rowData.fromNoon == 'A' && rowData.toNoon == 'A')) && <View style={[AppStyles.row_space_between, AppStyles.marginTop_2]}>
                <View style={[AppStyles.dashContainer, AppStyles.dashContaierWidth, AppStyles.alignItems]}>
                  <Subheading >{rowData.from}</Subheading>
                  <Text style={[AppStyles.textColor, AppStyles.textAlign_center]}>{'Date'}</Text>
                </View>
                <View style={[AppStyles.dashContainer, AppStyles.dashContaierWidth, AppStyles.alignItems]}>
                  <Subheading style={AppStyles.textAlign_center}>{this.getNoon(rowData.fromNoon)}</Subheading>
                  <Text style={AppStyles.textColor}>{'Leave'}</Text>
                </View>
              </View>}
            </Card.Content>
          </Card>
        </TouchableOpacity>
      ))}
    </View>)
  }
}

const styles = StyleSheet.create({

})



