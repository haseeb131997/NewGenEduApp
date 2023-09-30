
import React from "react";
import { View } from "react-native";
import TabScreen from '../../../components/TabScreen';
import AppStyles from "../../../AppStyles/AppStyles";
import TeacherEcircularContent from './TeacherEcircularContent';
import TeacherEcircularView from './TeacherEcircularView';
import { UiColor } from "../../../theme";
import { Divider, Subheading } from 'react-native-paper';
import Remarks from './../../../components/Remarks';
import NotificationConfiguration from './../../../components/NotificationConfiguration';















class AuthTemplate { }

AuthTemplate.AuthorisationConfig = function (stateObject) {


  return (<View>

    {/* <TabScreen
      tabHeading={['Basic Info','Content']}
      stateObject={stateObject}
      stateValue={'selectedTabIndex'}
      selectedStateValue={stateObject.state.selectedTabIndex}
      barColor={UiColor.WHITE}
    />
    <Divider/> */}


    <View>
      <Subheading style={AppStyles.bold_600}>{stateObject.state.createStepsHeading[0]}</Subheading>
      <TeacherEcircularView
        stateObject={stateObject}
      />
    </View>

    <Divider style={AppStyles.marginTop_3} />
    <View style={AppStyles.marginTop_2}>
      <Subheading style={AppStyles.bold_600}>{stateObject.state.createStepsHeading[1]}</Subheading>
      <TeacherEcircularContent
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




  </View>)


}




module.exports = {
  functions: AuthTemplate
}