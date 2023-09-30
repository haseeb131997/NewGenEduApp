
import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity,} from 'react-native';
//import { h, w } from '../../../../utils/Dimensions';
import { UiColor } from '../../../../theme';
import AppStyles from "../../../../AppStyles/AppStyles";
//import GeneralUtils from "../../../../utils/GeneralUtils";
import { Caption, Card, Subheading, Text, Title } from 'react-native-paper';
import SideMenu from "../../../../components/SideMenu";
import SelectListUtils from '../../../../utils/SelectListUtils'
import Ribbon from "../../../../components/Ribbon";
import Batch from "../../../../components/Batch";
import CustomButtons from '../../../../components/CustomButtons';
import NewOperation from "../../../../utils/NewOperation";
import apiCall from "../../../../ApiCall/ActionApi";






export default class ChildRecordListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentPath: '',
      showWebView: false
    }

  }
approve(rowData, index,stateObject)
{
  //const { stateObject } = this.props;
  var prevOperation =stateObject.state.currentOperation;
  var childViewDetails = stateObject.state.childViewDetails;
  console.log('Inside Leave Approve',index)
  //var 
   
  stateObject.setState({
    dataModel: rowData,
  }, async () => {
   await NewOperation.functions.viewRecordfornextOperation(stateObject)
   console.log('Data feching api call is completed ')
   if (!apiCall.functions.apiError)
  {
  /*stateObject.setState({
    currentOperation: 'Authorisation',
    }, async () => {*/
    stateObject.state.currentOperation='Authorisation';   
   await NewOperation.functions.DirectAuth(stateObject)
   console.log('Approve Api call is completed ')
   stateObject.state.currentOperation=prevOperation;
   if (!apiCall.functions.apiError)
   {
    childViewDetails.leaveDetails.splice(index,1)
    console.log('Inside Leave Approve leaveDetails',childViewDetails.leaveDetails)
    if(childViewDetails.leaveDetails.length==0)
    {
      stateObject.setState({
        childViewDetails: childViewDetails,
        isChildRecordShow: false,
        })
      
    } 
    else{
    stateObject.setState({
      childViewDetails: childViewDetails,
      })
    }
  }  
  }  
  })
  
  
}



reject(rowData, index,stateObject)
{
   //const { stateObject } = this.props;
  var prevOperation =stateObject.state.currentOperation;
  var childViewDetails = stateObject.state.childViewDetails;
  console.log('Inside Leave Reject',index)
  //var 
   
  stateObject.setState({
    dataModel: rowData,
  }, async () => {
   await NewOperation.functions.viewRecordfornextOperation(stateObject)
   console.log('Data feching api call is completed ')
   if (!apiCall.functions.apiError)
  {
  /*stateObject.setState({
    currentOperation: 'Authorisation',
    }, async () => {*/
    stateObject.state.currentOperation='Reject';   
   await NewOperation.functions.DirectReject(stateObject)
   console.log('Approve Api call is completed ')
   stateObject.state.currentOperation=prevOperation;
   if (!apiCall.functions.apiError)
   {
    childViewDetails.leaveDetails.splice(index,1)
    console.log('Inside Leave Approve leaveDetails',childViewDetails.leaveDetails)
    if(childViewDetails.leaveDetails.length==0)
    {
      stateObject.setState({
        childViewDetails: childViewDetails,
        isChildRecordShow: false,
        })
      
    } 
    else{
    stateObject.setState({
      childViewDetails: childViewDetails,
      })
    }
  }  
  }  
  })


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
    if (type == 'S' || type == 'P' || type == 'C') {
      return SelectListUtils.functions.getSelectedValue(SelectListUtils.functions.selectMaster.LeaveMaster, type)
    }
    else {
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
                {!(rowData.leaveStatus == "Pending") &&
                <View style={AppStyles.menuContainer}>
                  <SideMenu
                    summaryResultIndex={stateObject.state.summaryResultIndex}
                    viewDetail={rowData}
                    stateObject={stateObject}
                    menuTitle={(rowData.authStat == 'A' || rowData.authStat == 'R') ? ['View', 'Edit', 'Cancel'] : ['View', 'Edit', 'Cancel', 'Approve/Reject']}
                  />
                </View>}
              </View>
              <Card.Content>

                <View style={[AppStyles.alignItems]}>
                  <Title style={[AppStyles.titleColor]}>{rowData.studentName}</Title>
                  <Caption style={[AppStyles.width85, AppStyles.textAlign_center]}>{rowData.studentID}</Caption>
                </View>

                <View style={[AppStyles.dashContainer, AppStyles.alignItems]}>
                  <Subheading >{rowData.classDescription}</Subheading>
                  <Text style={[AppStyles.textColor, AppStyles.textAlign_center]}>{'Class'}</Text>
                </View>

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

                {(typeof rowData.reason!='undefined' && rowData.reason!='')  &&<View style={[AppStyles.alignItems,AppStyles.marginTop_2]}>
                <View style={[AppStyles.dashContainer, AppStyles.dashContaierWidth, AppStyles.alignItems]}>
                    <Subheading >{rowData.reason}</Subheading>
                    <Text style={[AppStyles.textColor, AppStyles.textAlign_center]}>{'Reason'}</Text>
                  </View>
                </View> }

                {(rowData.leaveStatus == "Pending") && <View style={[AppStyles.alignItems, AppStyles.marginTop_3, AppStyles.flexDirectionRow, AppStyles.space_around]}>
                  <CustomButtons
                    onPress={() => this.approve(rowData, index,stateObject)}
                    title="Approve"
                    // titleStyle={AppStyles.signInTextStyle}
                    buttonStyle={{ backgroundColor: UiColor.SKYBLUE }}
                  />
                  <CustomButtons
                    onPress={() => this.reject(rowData, index,stateObject)}
                    title="Reject"
                    // titleStyle={AppStyles.signInTextStyle}
                    buttonStyle={{ backgroundColor: UiColor.ERROR_COLOR }}
                  />
                </View>}
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



