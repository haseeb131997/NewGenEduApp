
import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { h, w } from '../../utils/Dimensions';
import { UiColor } from '../../theme';
import AppStyles from "../../AppStyles/AppStyles";
import { Title, Caption, Card, Text } from 'react-native-paper';
import CustomButtons from '../../components/CustomButtons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SubScreenUtils from "../../utils/SubScreenUtils";
import ScreenContents from "../../utils/ScreenContents";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';



//const removeCreateBtn = ['ClassAssignmentAssessment','HolidayMaintenance','OnlineMeetingAttendanceService','UserProfile']

export default class ScreenHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
    this.onClickNew = this.onClickNew.bind(this)
  }


  onClickNew() {
    const { stateObject } = this.props;
    SubScreenUtils.functions.createNew(stateObject)
    // var dummyDataModel = cloneDeep(stateObject.state.emptyDataModel)
    // var dummyAuditDataModel = cloneDeep(stateObject.state.emptyAuditDataModel)
    // if(apiCall.functions.CreateDefaultScreen.includes(stateObject.state.serviceName)){
    //   stateObject.parentStateChange({
    //     currentOperation:'CreateDefault',
    //     currentStep:  1 ,
    //     dataModel: dummyDataModel,
    //     auditDataModel:dummyAuditDataModel,
    //     editable: false,
    //     errorField:[]
    //    })
    //   NewOperation.functions.screenEventHandler(stateObject)
    // }
    // else{
    //   stateObject.parentStateChange({
    //     currentOperation:'Create',
    //     currentStep:  1, // for reset to 1st  form
    //     dataModel: dummyDataModel,
    //     auditDataModel:dummyAuditDataModel,
    //     editable: false,
    //     errorField:[]
    //    })
    //    if(stateObject.state.currentStep != 1){
    //     NewOperation.functions.screenEventHandler(stateObject)
    //    }

    // }

  }

  getTitleNewBtn(serviceName) {
    switch (serviceName) {
      case 'ClassAttendance':
        return 'Mark Attendance'
        break;

      default:
        return 'New'
        break;
    }
  }

  openToottipHelp() {
    const { stateObject } = this.props;
    // ScreenContents.functions.showTooltipModal = true
    stateObject.parentStateChange({
      showTooltipModal: true
    })
  }



  render() {
    const { title, breadcrumb, intialFetching, stateObject } = this.props;
    return (
      <View >
        <View style={[AppStyles.row_space_between]}>
          <View style={[AppStyles.flexDirectionRow, AppStyles.alignItems, AppStyles.flex_one]}>
            <Title>{title}</Title>
            <View style={[AppStyles.marginLeft_1]}>
              <AntDesign onPress={() => this.openToottipHelp()} name="questioncircle" size={styles.tooltipIcn.height} color={UiColor.VOILET_COLOR} />
            </View>
          </View>

          <View style={styles.spaceStyle} />

          {!SubScreenUtils.functions.removeCreateBtn.includes(stateObject.state.serviceName) && <View>
            <CustomButtons
              onPress={() => this.onClickNew()}
              title={stateObject.state.serviceName == 'ClassAttendance'  ? 'Mark Attendance' :(ScreenContents.functions.getScreenBtnName(stateObject.state.serviceName) != null ? ScreenContents.functions.getScreenBtnName(stateObject.state.serviceName).newButtonText : `New`)}
              titleStyle={AppStyles.signInTextStyle}
              buttonStyle={{ backgroundColor: UiColor.SKYBLUE }}
              icon={
                <MaterialCommunityIcons
                  name="newspaper-plus"
                  size={AppStyles.addIconSize.height}
                  color="white"
                  style={AppStyles.addIconStyle}
                />
              }
            /></View>}

        {(stateObject.state.serviceName == 'HolidayMaintenance' && (stateObject.state.userType == 'A' || stateObject.state.userType == 'O' )  )&& <View>
            <CustomButtons
              onPress={() => this.onClickNew()}
              title={stateObject.state.serviceName == 'ClassAttendance'  ? 'Mark Attendance' :(ScreenContents.functions.getScreenBtnName(stateObject.state.serviceName) != null ? ScreenContents.functions.getScreenBtnName(stateObject.state.serviceName).newButtonText : `New`)}
              titleStyle={AppStyles.signInTextStyle}
              buttonStyle={{ backgroundColor: UiColor.SKYBLUE }}
              icon={
                <MaterialCommunityIcons
                  name="newspaper-plus"
                  size={AppStyles.addIconSize.height}
                  color="white"
                  style={AppStyles.addIconStyle}
                />
              }
            /></View>}



        </View>
        <Caption>{breadcrumb}</Caption>
        {intialFetching && <Card>
          <Card.Content>
            <View style={[styles.dashContainer]}>
              <Title>We need your attention!</Title>
              <Text style={styles.textStyle}>Data fetching is in progress , please wait!</Text>
            </View>
          </Card.Content>
        </Card>}

      </View>
    )
  }
}


const styles = StyleSheet.create({
  dashContainer: {
    borderWidth: 1,
    padding: h('2%'),
    borderRadius: 5,
    borderStyle: 'dashed',
    backgroundColor: UiColor.LIGHT_ORANGE_COLOR,
    borderColor: UiColor.ORANGE_COLOR
  },
  textStyle: {
    color: UiColor.DRAK_GRAY_COLOR,

  },
  tooltipIcn: {
    height: h('2.5%')
  },
  titleStyle: {
    width: '73%'
  },
  spaceStyle: {
    width: '5%'
  }




})