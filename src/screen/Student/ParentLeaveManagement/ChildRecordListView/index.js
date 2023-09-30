
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








export default class ChildRecordListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentPath: '',
      showWebView: false
    }

  }




getNoon (noon){
  switch(noon){
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
    const { childViewDetails } = stateObject.state

    return (
      <View>
        {childViewDetails != null && childViewDetails.leaveDetails.map((rowData, index) => (
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
                    menuTitle={(rowData.authStat == 'A' || rowData.authStat == 'R') ? ['View', 'Edit', 'Delete'] : ['View', 'Edit', 'Delete', 'Approve/Reject']}
                  />
                </View>
              </View>
              <Card.Content>

              <View style={[AppStyles.alignItems]}>
                  <Title style={[AppStyles.titleColor]}>{rowData.studentName}</Title>
                  <Caption style={[AppStyles.width85, AppStyles.textAlign_center]}>{rowData.studentID}</Caption>
                </View>

              <View style={[AppStyles.row_space_between, AppStyles.marginTop_2]}>
                  <View style={[AppStyles.dashContainer, AppStyles.dashContaierWidth, AppStyles.alignItems]}>
                    <Subheading >{this.getType(rowData.type)}</Subheading>
                    <Text style={[AppStyles.textColor, AppStyles.textAlign_center]}>{'Leave Type'}</Text>
                  </View>
                  <View style={[AppStyles.dashContainer, AppStyles.dashContaierWidth, AppStyles.alignItems]}>
                  <Batch
                value={rowData.leaveStatus}
                status={rowData.leaveStatus == "Approved" ? 'S' : (rowData.leaveStatus == "Pending" ? 'W'  : 'E')}
                />
                    <Text style={AppStyles.textColor}>{'Leave Status'}</Text>
                  </View>
                </View>


               {(rowData.fromNoon == 'D' &&  rowData.toNoon == 'D') && <View style={[AppStyles.row_space_between, AppStyles.marginTop_2]}>
                  <View style={[AppStyles.dashContainer, AppStyles.dashContaierWidth, AppStyles.alignItems]}>
                    <Subheading >{rowData.from}</Subheading>
                    <Text style={[AppStyles.textColor, AppStyles.textAlign_center]}>{'Leave Start Date'}</Text>
                  </View>
                  <View style={[AppStyles.dashContainer, AppStyles.dashContaierWidth, AppStyles.alignItems]}>
                    <Subheading >{rowData.to}</Subheading>
                    <Text style={AppStyles.textColor}>{'Leave End Date'}</Text>
                  </View>
                </View>}

                {((rowData.fromNoon == 'F' &&  rowData.toNoon == 'F') || (rowData.fromNoon == 'A' &&  rowData.toNoon == 'A')) && <View style={[AppStyles.row_space_between, AppStyles.marginTop_2]}>
                  <View style={[AppStyles.dashContainer, AppStyles.dashContaierWidth, AppStyles.alignItems]}>
                    <Subheading >{rowData.from}</Subheading>
                    <Text style={[AppStyles.textColor, AppStyles.textAlign_center]}>{'Date'}</Text>
                  </View>
                  <View style={[AppStyles.dashContainer, AppStyles.dashContaierWidth, AppStyles.alignItems]}>
                    <Subheading style={AppStyles.textAlign_center}>{this.getNoon(rowData.fromNoon)}</Subheading>
                    <Text style={AppStyles.textColor}>{'Leave'}</Text>
                  </View>
                </View>}

                {rowData.reason!='' &&<View style={[AppStyles.alignItems,AppStyles.marginTop_2]}>
                <View style={[AppStyles.dashContainer, AppStyles.dashContaierWidth, AppStyles.alignItems]}>
                    <Subheading >{rowData.reason}</Subheading>
                    <Text style={[AppStyles.textColor, AppStyles.textAlign_center]}>{'Reason'}</Text>
                  </View>
                </View> }
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



