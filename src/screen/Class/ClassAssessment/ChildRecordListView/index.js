
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
import { ListItem } from 'react-native-elements';
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




  clickAssesss(rowData, index) {
    const { stateObject } = this.props;
    stateObject.state.dataModel.assignmentID = rowData.assignmentID
    stateObject.state.dataModel.classID = rowData.classID
    stateObject.state.dataModel.type = rowData.type
    stateObject.setState({
      viewDetail: rowData,
      currentOperation: 'Create-Default',
      selectedTabIndex: 0
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
                <Ribbon
                  stateObject={stateObject}
                  label={SelectListUtils.functions.getSelectedValueNew(SelectListUtils.functions.selectMaster.AuthStatusMaster, rowData.authStat)}
                  status={rowData.authStat}
                />
                <View />
                {rowData.assessmentStatus == 'Y' ? <View style={AppStyles.menuContainer}>
                  <SideMenu
                    summaryResultIndex={stateObject.state.summaryResultIndex}
                    viewDetail={rowData}
                    stateObject={stateObject}
                    menuTitle={rowData.assessmentStatus == 'Y' ? ['View', 'Edit', 'Delete'] : ['Assess']}
                  />
                </View> : null}
              </View>
              <Card.Content>

                <View style={[AppStyles.row_space_between, AppStyles.marginTop_2]}>
                  <View style={[AppStyles.dashContainer, AppStyles.dashContaierWidth, AppStyles.alignItems]}>
                    <Subheading >{rowData.dueDate}</Subheading>
                    <Text style={[AppStyles.textColor, AppStyles.textAlign_center]}>{'Due Date'}</Text>
                  </View>

                  <View style={[AppStyles.dashContainer, AppStyles.dashContaierWidth, AppStyles.alignItems]}>
                    <Subheading >{rowData.typeDescription}</Subheading>
                    <Text style={[AppStyles.textColor, AppStyles.textAlign_center]}>{'Type'}</Text>
                  </View>


                </View>

                <View style={[AppStyles.dashContainer, AppStyles.alignItems, AppStyles.marginTop_2]}>
                  <Subheading >{rowData.assignmentDescription}</Subheading>
                  <Text style={[AppStyles.textColor, AppStyles.textAlign_center]}>{'Description'}</Text>
                </View>





                <ListItem>
                  <Image resizeMode='contain' style={[AppStyles.inactiveMoreIcon, AppStyles.voiletImgColor]}
                    source={require('./../../../../asssets/icons/com006.png')}
                  />
                  <ListItem.Content>
                    <Text style={AppStyles.textColor}>No. of students submitted</Text>
                  </ListItem.Content>
                  <View>
                    <Text>{rowData.submittedStudentCount}</Text>
                  </View>
                </ListItem>
                <ListItem>
                  <Image resizeMode='contain' style={[AppStyles.inactiveMoreIcon, AppStyles.errorImgColor]}
                    source={require('./../../../../asssets/icons/com006.png')}
                  />
                  <ListItem.Content>
                    <Text style={AppStyles.textColor}>No. of students not submitted</Text>
                  </ListItem.Content>
                  <View>
                    <Text>{rowData.notSubmittedStudentCount}</Text>
                  </View>
                </ListItem>

                <View style={[AppStyles.marginTop_2, AppStyles.alignItems]}>
                  <Batch
                    value={rowData.assessmentStatus == "Y" ? 'Assessed' : rowData.assessmentStatus}
                    status={rowData.assessmentStatus == "Y" ? 'S' : 'E'}
                  />
                </View>


                {rowData.assessmentStatus != 'Y' && <View style={[AppStyles.alignItems, AppStyles.marginTop_2]}>
                  {/* <Text>{rowData.notAssessedCount}</Text> */}
                  <CustomButtons
                    onPress={() => this.clickAssesss(rowData, index)}
                    title="Assess"
                    // titleStyle={AppStyles.signInTextStyle}
                    buttonStyle={{ backgroundColor: UiColor.SKYBLUE }}
                  />
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



