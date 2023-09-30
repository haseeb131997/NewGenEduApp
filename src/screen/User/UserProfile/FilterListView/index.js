
import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { h, w } from '../../../../utils/Dimensions';
import { UiColor } from '../../../../theme';
import AppStyles from "../../../../AppStyles/AppStyles";
import GeneralUtils from "../../../../utils/GeneralUtils";
import { Caption, Card, Subheading, Text, Title } from 'react-native-paper';
import SideMenu from "../../../../components/SideMenu";
import SelectListUtils from '../../../../utils/SelectListUtils'
import Ribbon from "../../../../components/Ribbon";


export default class FilterListView extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }




  render() {
    const { stateObject } = this.props;
    var showResults = []




    // showResults = (stateObject.state.summaryDataModel.pageDetails.searchType == 'More' || stateObject.state.summaryDataModel.pageDetails.searchType == 'Initial') ? stateObject.state.summaryDataModel.SummaryResult : stateObject.state.summaryResultByFilter.SummaryResult

    showResults = GeneralUtils.functions.getSummaryResult(stateObject)

    return (
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
                <View style={AppStyles.alignItems}>
                  <Title style={AppStyles.primaryTitleStyle}>{rowData.userName}</Title>
                  <Caption >{rowData.userID}</Caption>
                </View>

                {/* <View style={AppStyles.alignItems}>
                  <Subheading style={AppStyles.primaryTitleStyle}>{rowData.userType}</Subheading>
                  <Caption >{'User Type'}</Caption>
                </View> */}

                <View style={[AppStyles.dashContainer, AppStyles.alignItems, AppStyles.marginTop_1]}>
                  <Subheading >{rowData.userType}</Subheading>
                  <Text style={AppStyles.textColor}>{'User Type'}</Text>
                </View>

                <View style={[AppStyles.marginTop_2]}>
                  <View style={[AppStyles.dashContainer,]}>
                    <Text style={[AppStyles.textColor, AppStyles.textAlign_center]}>{rowData.emailID}{rowData.emailID != '' && ','} {rowData.mobileNo}</Text>
                  </View>
                </View>
                {/* <View style={[AppStyles.row_space_between, AppStyles.marginTop_2]}>
                  <View style={[AppStyles.dashContainer, AppStyles.dashContaierWidth,AppStyles.alignItems]}>
                    <Subheading >{rowData.startDate}</Subheading>
                    <Text style={AppStyles.textColor}>{'Start Date'}</Text>
                  </View>

                  <View style={[AppStyles.dashContainer, AppStyles.dashContaierWidth,AppStyles.alignItems]}>
                    <Subheading >{rowData.endDate}</Subheading>
                    <Text style={AppStyles.textColor}>{'End Date'}</Text>
                  </View>
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



