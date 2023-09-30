
import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { h, w } from '../../utils/Dimensions';
import { UiColor } from '../../theme';
import AppStyles from "../../AppStyles/AppStyles";
import { Title, Caption, Card, Text } from 'react-native-paper';
import CustomButtons from '../../components/CustomButtons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SubScreenUtils from "../../utils/SubScreenUtils";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ScreenUtils from "../../utils/ScreenUtils";
import ScreenContents from "../../utils/ScreenContents";





export default class FilterScreenHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
    this.onClickGenerate = this.onClickGenerate.bind(this)
    this.onClickNew = this.onClickNew.bind(this)

  }


  onClickGenerate() {
    const { stateObject } = this.props;
    ScreenUtils.functions.discardSearch(stateObject)
  }



  openToottipHelp() {
    const { stateObject } = this.props;
    // ScreenContents.functions.showTooltipModal = true
    stateObject.parentStateChange({
      showTooltipModal: true
    })
  }

  onClickNew() {
    const { stateObject } = this.props;
    SubScreenUtils.functions.createNew(stateObject)
   

  }

  

  render() {
    const { title, breadcrumb, stateObject } = this.props;
    return (
      <View>
        <View style={[AppStyles.row_space_between]}>
          
          <View style={[AppStyles.flexDirectionRow, AppStyles.alignItems, AppStyles.flex_one]}>
            {((stateObject.state.userType == 'P' || stateObject.state.userType == 'S') && SubScreenUtils.functions.parentScreenType.includes(stateObject.state.serviceName)) ?
              <Title>{title} {stateObject.state.serviceName == 'NewStudentAssignment' ? 'for' : 'of'} {stateObject.state.summaryDataModel.filter.studentName}</Title> : <Title>{title}</Title>}
           <View style={[AppStyles.marginLeft_1]}>
              <AntDesign onPress={() => this.openToottipHelp()} name="questioncircle" size={styles.tooltipIcn.height} color={UiColor.VOILET_COLOR} />
            </View>
          </View>

          <View style={styles.spaceStyle} />
          { ((stateObject.state.serviceName == 'StudentLeaveManagement' || stateObject.state.serviceName == 'StudentNotesService' || stateObject.state.serviceName == 'StudentLessonPlannerService') && (stateObject.state.userType == 'P'  || stateObject.state.userType == 'S')) && <View>
            <CustomButtons
              onPress={() => this.onClickNew()}
              title={ScreenContents.functions.getScreenBtnName(stateObject.state.serviceName) != null ? ScreenContents.functions.getScreenBtnName(stateObject.state.serviceName).newButtonText : `New`}
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
          {(stateObject.state.serviceType.includes('Report') && stateObject.state.displayContent == 'summaryResultByFilter') && <CustomButtons
            onPress={() => this.onClickGenerate()}
            title={`Back`}
            titleStyle={AppStyles.signInTextStyle}
            buttonStyle={{ backgroundColor: UiColor.ERROR_COLOR }}

          />}

        </View>
        <Caption>{breadcrumb}</Caption>

        {/* {intialFetching && <Card>
          <Card.Content>
           <View style={[styles.dashContainer]}>
           <Title>We need your attention!</Title>
           <Text style={styles.textStyle}>Data fetching is in progress , please wait!</Text>
           </View>
          </Card.Content>
        </Card>} */}

      </View>
    )
  }
}


const styles = StyleSheet.create({
  spaceStyle: {
    width: '5%'
  },
  tooltipIcn: {
    height: h('2.5%')
  },
})