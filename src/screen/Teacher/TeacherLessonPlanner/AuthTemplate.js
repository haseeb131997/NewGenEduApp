
import React from "react";
import { View } from "react-native";
import TabScreen from '../../../components/TabScreen';
import AppStyles from "../../../AppStyles/AppStyles";
import TeacherLessonPlannerClassDetail from './TeacherLessonPlannerClassDetail';
import ExamAssessmentGeneralView from './ExamAssessmentGeneralView';
import { UiColor } from "../../../theme";
import { Divider,} from 'react-native-paper';
import Remarks from './../../../components/Remarks';
import NotificationConfiguration from './../../../components/NotificationConfiguration';















class AuthTemplate { }

AuthTemplate.AuthorisationConfig = function (stateObject) {


  return (<View>

   <TabScreen
      tabHeading={['Basic Info','Assessment']}
      stateObject={stateObject}
      stateValue={'selectedTabIndex'}
      selectedStateValue={stateObject.state.selectedTabIndex}
      barColor={UiColor.WHITE}
    />
    {/* <Divider/> */}

    {stateObject.state.selectedTabIndex == 0 &&  <View>
  <View>
        <ExamAssessmentGeneralView
          stateObject={stateObject}
        />
    </View>

    <Divider style={AppStyles.marginTop_3} />
    <View style={AppStyles.marginTop_2}>
        <NotificationConfiguration
          stateObject={stateObject}
        />
    </View>

    <Divider style={AppStyles.marginTop_3} />
    <View style={AppStyles.marginTop_2}>
      <Remarks
        stateObject={stateObject}
      />
    </View>

  </View>}

{stateObject.state.selectedTabIndex == 1 && <View>

    <View style={AppStyles.marginTop_2}>
        <TeacherLessonPlannerClassDetail
          stateObject={stateObject}
        />
    </View>
    </View>}

  </View>)


}




module.exports = {
  functions: AuthTemplate
}