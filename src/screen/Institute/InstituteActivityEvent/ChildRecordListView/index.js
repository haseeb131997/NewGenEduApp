
import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Platform, Image } from 'react-native';
import { h, w } from '../../../../utils/Dimensions';
import { UiColor } from '../../../../theme';
import AppStyles from "../../../../AppStyles/AppStyles";
import GeneralUtils from "../../../../utils/GeneralUtils";
import { Caption, Card, Subheading, Text, Title } from 'react-native-paper';
import SideMenu from "../../../../components/SideMenu";
import SelectListUtils from '../../../../utils/SelectListUtils'
import Ribbon from "../../../../components/Ribbon";
import Batch from "../../../../components/Batch";
import { startsWith } from 'lodash';







export default class ChildRecordListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentPath: '',
      showWebView: false
    }

  }


  getMenuList(rowData) {
    if (!rowData.feeApplicable && rowData.competition) {
      return ['View', 'Edit','Enroll Students' ,'Shortlist participants', 'Result declaration','Event Gallery','Delete']
    }
    else if (!rowData.feeApplicable) {
      return ['View', 'Edit','Enroll Students' ,'Shortlist participants','Event Gallery', 'Delete']
    }
    else if (rowData.competition) {
      return ['View', 'Edit','Enroll Students' ,'Result declaration','Event Gallery' ,'Delete']
    }
    else {
      return ['View', 'Edit','Enroll Students','Event Gallery' ,'Delete']
    }

    // ['View', 'Edit', 'Delete', 'Approve/Reject']
  }

  getMenuListWithApprove(rowData) {
    const original = this.getMenuList(rowData);
      let newArray;
      newArray = original.concat('Approve/Reject');
      newArray = [...original, 'Approve/Reject'];
      return newArray;
  }



  render() {
    const { stateObject } = this.props;
    const { childViewDetails } = stateObject.state


    // rowData.feeApplicable

    // rowData.competition

    return (
      <View>
        {childViewDetails != null && childViewDetails.activityDetails.map((rowData, index) => (
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
                    menuTitle={(rowData.authStat == 'A' || rowData.authStat == 'R') ? this.getMenuList(rowData) : this.getMenuListWithApprove(rowData)}
                  />
                </View>
              </View>
              <Card.Content>

                <View style={[AppStyles.alignItems]}>

                  <Subheading style={[AppStyles.titleColor, AppStyles.textAlign_center]}>{rowData.activityName}</Subheading>
                  <Text style={AppStyles.textColor}>{'Event Description'}</Text>
                </View>



                {rowData.level != '' && <View style={[AppStyles.marginTop_2]}>
                  <View style={[AppStyles.dashContainer, AppStyles.alignItems]}>
                    <Subheading >{rowData.level}</Subheading>
                    <Text style={AppStyles.textColor}>{'Level'}</Text>
                  </View>
                </View>}

                <View style={[AppStyles.marginTop_2]}>
                  <View style={[AppStyles.dashContainer, AppStyles.alignItems]}>
                    <Subheading >{rowData.venue}</Subheading>
                    <Text style={AppStyles.textColor}>{'Venue'}</Text>
                  </View>
                </View>




                {/* <View style={[AppStyles.row_space_between, AppStyles.marginTop_2]}>
                  <View style={[AppStyles.dashContainer, AppStyles.dashContaierWidth, AppStyles.alignItems]}>
                    <Subheading >{rowData.type}</Subheading>
                    <Text style={[AppStyles.textColor, AppStyles.textAlign_center]}>{'Leave Type'}</Text>
                  </View>
                  <View style={[AppStyles.dashContainer, AppStyles.dashContaierWidth, AppStyles.alignItems]}>
                  <Batch
                value={rowData.leaveStatus}
                status={rowData.leaveStatus == "Approved" ? 'S' : (rowData.leaveStatus == "Pending" ? 'W'  : 'E')}
                />
                    <Text style={AppStyles.textColor}>{'Leave Status'}</Text>
                  </View>
                </View> */}

                {rowData.dueDate!='' &&
                <View style={[AppStyles.row_space_between, AppStyles.marginTop_2]}>
                  <View style={[AppStyles.dashContainer, AppStyles.dashContaierWidth, AppStyles.alignItems]}>
                    <Subheading >{rowData.date}</Subheading>
                    <Text style={[AppStyles.textColor, AppStyles.textAlign_center]}>{'Event Date'}</Text>
                  </View>
                  <View style={[AppStyles.dashContainer, AppStyles.dashContaierWidth, AppStyles.alignItems]}>
                    <Subheading >{rowData.dueDate}</Subheading>
                    <Text style={[AppStyles.textColor, AppStyles.textAlign_center]}>{'Participation Due Date'}</Text>
                  </View>
                </View>}
                {rowData.dueDate=='' &&
                <View style={[AppStyles.alignItems, AppStyles.marginTop_2]}>
                  <View style={[AppStyles.dashContainer, AppStyles.dashContaierWidth, AppStyles.alignItems]}>
                    <Subheading >{rowData.date}</Subheading>
                    <Text style={[AppStyles.textColor, AppStyles.textAlign_center]}>{'Event Date'}</Text>
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
  contaierWidth: {
    width: '48%'
  },
  menuContainer: {
    top: h('1%'),
    right: h('2%')

  },
  titleColor: {
    color: UiColor.SKYBLUE,
    fontWeight: '500'
  },
  instructionStyle: {
    color: UiColor.LIGHT_TEXT_COLOR, textAlign: 'center'
  }
})



