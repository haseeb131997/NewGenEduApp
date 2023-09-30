
import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, } from 'react-native';
//import { h, w } from '../../../../utils/Dimensions';
import { UiColor } from '../../../../theme';
import AppStyles from "../../../../AppStyles/AppStyles";
//import GeneralUtils from "../../../../utils/GeneralUtils";
import {  Card, Subheading, Text,  } from 'react-native-paper';
import SideMenu from "../../../../components/SideMenu";
import SelectListUtils from '../../../../utils/SelectListUtils'
//import Ribbon from "../../../../components/Ribbon";
import Batch from "../../../../components/Batch";
//import { ListItem } from 'react-native-elements';
import CustomButtons from '../../../../components/CustomButtons';
import NewOperation from "../../../../utils/NewOperation";








export default class ChildRecordListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentPath: '',
      showWebView: false
    }

  }




  clickAnswer(rowData) {
    const { stateObject } = this.props;
    
    stateObject.setState({
          viewDetail: rowData,
          currentOperation: 'Query',
          selectedTabIndex: 0,
          showAnswer:true
    }, () => {
      NewOperation.functions.screenEventHandler(stateObject)
    })
  }

  clickView(rowData) {
    const { stateObject } = this.props;
    
    stateObject.setState({
          viewDetail: rowData,
          currentOperation: 'Query',
          selectedTabIndex: 0,
          showAnswer:false
    }, () => {
      NewOperation.functions.screenEventHandler(stateObject)
    })
  }


  render() {
    const { stateObject } = this.props;
    const { childViewDetails } = stateObject.state

    return (
      <View>
        {childViewDetails != null && childViewDetails.assignments.map((rowData, index) => (
          <TouchableOpacity disabled key={index.toString()}>
            <Card style={AppStyles.marginTop_2}>
              <View style={AppStyles.row_space_between}>
                {/* <Ribbon
                  stateObject={stateObject}
                  label={SelectListUtils.functions.getSelectedValueNew(SelectListUtils.functions.selectMaster.AuthStatusMaster, rowData.authStat)}
                  status={rowData.authStat}
                /> */}
                <View />
                {(rowData.answerStatus == 'A' && (stateObject.state.userType == "P" || stateObject.state.userType == "S"))? <View style={AppStyles.menuContainer}>
                  <SideMenu
                    summaryResultIndex={stateObject.state.summaryResultIndex}
                    viewDetail={rowData}
                    stateObject={stateObject}
                    menuTitle={rowData.answerStatus == 'A' ? ['View', 'Edit'] : ['Answer']} //N0U-105
                  />
                </View> : null}
              </View>
              <Card.Content>
              <View style={[AppStyles.dashContainer, AppStyles.alignItems, AppStyles.marginTop_2]}>
                  <Subheading >{rowData.assignmentDescription}</Subheading>
                  <Text style={[AppStyles.titleColor, AppStyles.textAlign_center]}>{'Description'}</Text>
                </View>

                <View style={[AppStyles.row_space_between, AppStyles.marginTop_2]}>
                  <View style={[AppStyles.dashContainer, AppStyles.dashContaierWidth, AppStyles.alignItems]}>
                    <Subheading >{rowData.dueDate}</Subheading>
                    <Text style={[AppStyles.textColor, AppStyles.textAlign_center]}>{'Due Date'}</Text>
                  </View>
                  
                  <View style={[AppStyles.dashContainer, AppStyles.dashContaierWidth, AppStyles.alignItems]}>
                    <Subheading style={[AppStyles.textAlign_center]}>{SelectListUtils.functions.getSelectedValue(SelectListUtils.functions.selectMaster.AssignmentTypesMaster, rowData.type)}</Subheading>
                    <Text style={[AppStyles.textColor, AppStyles.textAlign_center]}>{'Type'}</Text>
                  </View>


                </View>

               {/* <View style={[AppStyles.dashContainer, AppStyles.alignItems, AppStyles.marginTop_2]}>
                  <Subheading >{rowData.assignmentDescription}</Subheading>
                  <Text style={[AppStyles.textColor, AppStyles.textAlign_center]}>{'Description'}</Text>
              </View> */}

               {(stateObject.state.userType == "A" || stateObject.state.userType == "T" || stateObject.state.userType == "O") && <View style={[AppStyles.marginTop_2, AppStyles.alignItems]}>
                  <Batch
                    value={rowData.answerStatus == "A" ? 'Answered' : 'Not Answered'}
                    status={rowData.answerStatus == "A" ? 'S' : 'E'}
                  />
                </View>
}



              


                {(rowData.answerStatus != 'A' && (stateObject.state.userType == "P" || stateObject.state.userType == "S")) && <View style={[AppStyles.alignItems, AppStyles.marginTop_2]}>
                  {/* <Text>{rowData.notAssessedCount}</Text> */}
                  <CustomButtons
                    onPress={() => this.clickAnswer(rowData, index)}
                    title="Answer"
                    // titleStyle={AppStyles.signInTextStyle}
                    buttonStyle={{ backgroundColor: UiColor.SKYBLUE }}
                  />
                </View>}

                {!(stateObject.state.userType == "P" || stateObject.state.userType == "S") && <View style={[AppStyles.alignItems, AppStyles.marginTop_2]}>
                  {/* <Text>{rowData.notAssessedCount}</Text> */}
                  <CustomButtons
                    onPress={() => this.clickView(rowData, index)}
                    title="Details"
                    // titleStyle={AppStyles.signInTextStyle}
                    buttonStyle={{ backgroundColor: UiColor.SKYBLUE }}
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



