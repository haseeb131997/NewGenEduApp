
import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity ,Image} from 'react-native';
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
import { cloneDeep } from 'lodash';


export default class FilterListView extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  async viewDetails(rowData, index,status) {
    const { stateObject } = this.props;

    var emptySummaryDataModel = cloneDeep(stateObject.state.emptySummaryDataModel)

    stateObject.state.emptySummaryDataModel.filter.authStat = status
    stateObject.state.emptySummaryDataModel.filter.leaveStatus = status

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
        currentOperation: '',
        emptySummaryDataModel:emptySummaryDataModel
      })
    }
  }





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
    if(type == 'S' || type == 'P' || type == 'C'){
     return SelectListUtils.functions.getSelectedValue(SelectListUtils.functions.selectMaster.LeaveMaster,type)
    }
    else{
      return type
    }
  }



  render() {
    const { stateObject } = this.props;
    var showResults = []
    showResults = GeneralUtils.functions.getSummaryResult(stateObject)

 

    return stateObject.state.userType == "A" ? (
      <View>
        {showResults.map((rowData, index) => (
          <TouchableOpacity disabled key={index.toString()}>
            <Card style={AppStyles.marginTop_2}>

              <Card.Content>

                {/* <View style={[AppStyles.alignItems]}>
                  <Title style={[AppStyles.titleColor]}>{rowData.teacherName}</Title>
                  <Caption style={[AppStyles.width85, AppStyles.textAlign_center]}>{rowData.teacherID}</Caption>
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



               {rowData.approvedCount != 0 && <ListItem >
                  <ListItem.Content>
                    <Text style={AppStyles.textColor}>No. of leaves approved : <Text>{rowData.approvedCount}</Text></Text>
                  </ListItem.Content>
                  <View>
                    {/* <Text>{rowData.assessedCount}</Text> */}
                    <CustomButtons
                    onPress={() => this.viewDetails(rowData, index,'A')}
                    title="View"
                    // titleStyle={AppStyles.signInTextStyle}
                    buttonStyle={{ backgroundColor: UiColor.SKYBLUE }}
                  />
                  </View>
                </ListItem>}

                {rowData.rejectedCount != 0 && <ListItem >
                  <ListItem.Content>  
                    <Text style={AppStyles.textColor}>No. of leaves rejected : <Text>{rowData.rejectedCount}</Text></Text>
                  </ListItem.Content>
                  <View>
                    {/* <Text>{rowData.assessedCount}</Text> */}
                    <CustomButtons
                    onPress={() => this.viewDetails(rowData, index,'R')}
                    title="View"
                    // titleStyle={AppStyles.signInTextStyle}
                    buttonStyle={{ backgroundColor: UiColor.SKYBLUE }}
                  />
                  </View>
                </ListItem>}

               {rowData.pendingCount != 0 && <ListItem >
                  <ListItem.Content>
                    <Text style={AppStyles.textColor}>No. of leaves yet to approve : <Text>{rowData.pendingCount}</Text></Text>
                  </ListItem.Content>
                  <View>
                    {/* <Text>{rowData.notAssessedCount}</Text> */}
                    <CustomButtons
                    onPress={() => this.viewDetails(rowData, index,'U')}
                    title="Approve/Reject"
                    // titleStyle={AppStyles.signInTextStyle}
                    buttonStyle={{ backgroundColor: UiColor.SKYBLUE }}
                  />
                  </View>
                </ListItem>}




                {/* <View style={[AppStyles.alignItems, AppStyles.marginTop_2]}>
                  <CustomButtons
                    onPress={() => this.viewDetails(rowData, index)}
                    title="View Leaves"
                    // titleStyle={AppStyles.signInTextStyle}
                    buttonStyle={{ backgroundColor: UiColor.SKYBLUE }}
                  />
                </View> */}
              </Card.Content>
            </Card>
          </TouchableOpacity>
        ))}

      </View>
    ) : (
      <View>
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
                    summaryResultIndex={index}
                    viewDetail={rowData}
                    stateObject={stateObject}
                    menuTitle={(rowData.authStat == 'A' || rowData.authStat == 'R') ? ['View', 'Edit', 'Delete'] : ['View', 'Edit', 'Delete', 'Approve/Reject']}
                  />
                </View>
              </View>
              <Card.Content>

                {/* <View style={[AppStyles.alignItems]}>
                  <Title style={[AppStyles.titleColor]}>{rowData.teacherName}</Title>
                  <Caption style={[AppStyles.width85, AppStyles.textAlign_center]}>{rowData.teacherID}</Caption>
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

                {/* <View style={[AppStyles.alignItems,AppStyles.marginTop_2]}>
                <Batch
                value={rowData.leaveStatus}
                status={rowData.leaveStatus == "Approved" ? 'S' : (rowData.leaveStatus == "Pending" ? 'W'  : 'E')}
                />
                </View> */}
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



