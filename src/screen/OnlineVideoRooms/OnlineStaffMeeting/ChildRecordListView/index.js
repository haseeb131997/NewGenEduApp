
import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Platform, Image } from 'react-native';
import { h, w } from '../../../../utils/Dimensions';
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
import { cloneDeep } from 'lodash';



export default class ChildRecordListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentPath: '',
      showWebView: false
    }
  }



  async showMore() {
    const { stateObject } = this.props;
    var parentPageDetial = cloneDeep(stateObject.state.summaryDataModel.pageDetails)

    stateObject.state.summaryDataModel.pageDetails = stateObject.state.secondLevelPageDetails
    stateObject.state.currentOperation = "SecondLevel";
    await NewOperation.functions.screenEventHandler(stateObject);

    stateObject.state.summaryDataModel.pageDetails = parentPageDetial
    stateObject.setState({
      summaryDataModel: stateObject.state.summaryDataModel
    })
  }

  onClickStart(rowData){
    const { stateObject } = this.props;
    stateObject.startClassroom_action(rowData.classroomID)
  }



  onClickJoin(rowData){
    const { stateObject } = this.props;
    stateObject.joinClassroom_action(rowData.classroomID)
  }




  render() {
    const { stateObject } = this.props;
    const { childViewDetails } = stateObject.state

    return (
      <View>
        {childViewDetails != null && childViewDetails.roomDetails.map((rowData, index) => (
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
                  <Subheading style={[AppStyles.titleColor, AppStyles.textAlign_center]}>{rowData.date}</Subheading>
                  <Caption style={AppStyles.textColor}>{'Date'}</Caption>
                  <Subheading style={[AppStyles.titleColor, AppStyles.textAlign_center]}>{rowData.participant}</Subheading>
                  <Caption style={AppStyles.textColor}>{'Attendees'}</Caption>
                </View>

                {/* <View style={[AppStyles.alignItems]}>
                    <Subheading style={[AppStyles.titleColor, AppStyles.textAlign_center]}>{rowData.dueDate}</Subheading>
                    <Caption >{'Due Date'}</Caption>
                  </View> */}

                <View style={[AppStyles.marginTop_2]}>
                  <View style={[AppStyles.dashContainer, AppStyles.alignItems]}>
                    <Subheading style={[AppStyles.textAlign_center]} >{rowData.heading}</Subheading>
                    <Text style={AppStyles.textColor}>{'Topic / Objective'}</Text>
                  </View>
                </View>

              


                <View style={[AppStyles.row_space_between, AppStyles.marginTop_2]}>
                  <View style={[AppStyles.dashContainer, AppStyles.dashContaierWidth, AppStyles.alignItems]}>
                    <Subheading >{rowData.startTime}</Subheading>
                    <Text style={[AppStyles.textColor, AppStyles.textAlign_center]}>{'Start Time'}</Text>
                  </View>

                  <View style={[AppStyles.dashContainer, AppStyles.dashContaierWidth, AppStyles.alignItems]}>
                    <Subheading >{rowData.duration}</Subheading>
                    <Text style={AppStyles.textColor}>{'Duration (in min)'}</Text>
                  </View>
                </View>

                {rowData.meetingStatus!='E' ?
                <View style={[AppStyles.alignItems, AppStyles.marginTop_3, AppStyles.flexDirectionRow, AppStyles.space_around]}>
                  <CustomButtons
                    onPress={() => this.onClickStart(rowData)}
                    title="Start"
                    titleStyle={AppStyles.signInTextStyle}
                    containerStyle={AppStyles.btnContainer}
                    buttonStyle={{ backgroundColor: UiColor.SKYBLUE }}
                  />
                  <CustomButtons
                    onPress={() =>  this.onClickJoin(rowData)}
                    title="Join"
                    titleStyle={AppStyles.signInTextStyle}
                    containerStyle={AppStyles.btnContainer}
                    buttonStyle={{ backgroundColor: UiColor.SKYBLUE }}
                  />
                </View>:<View style={[AppStyles.alignItems,AppStyles.marginTop_2]}>
                  <Batch
                      value={'Meeting ended'}
                      status={'E'}
                    />
                    
                </View>  }  
              </Card.Content>


            </Card>
          </TouchableOpacity>
        ))}



        {stateObject.state.secondLevelPageDetails.moreRecExists &&
          <View style={[AppStyles.alignItems, AppStyles.marginTop_3,]}>
            <CustomButtons
              onPress={() => this.showMore(stateObject)}
              title="Show more"
              titleStyle={AppStyles.signInTextStyle}
              containerStyle={AppStyles.btnContainer}
              buttonStyle={{ backgroundColor: UiColor.SKYBLUE }}
            />
          </View>}






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



