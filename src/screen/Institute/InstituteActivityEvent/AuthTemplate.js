
import React from "react";
import { View } from "react-native";
import TabScreen from '../../../components/TabScreen';
import AppStyles from "../../../AppStyles/AppStyles";
import InstituteActivityEventFeeDetails from './InstituteActivityEventFeeDetails';
import InstituteActivityEventDetails from './InstituteActivityEventDetails';
import InstituteActivityEventImages from './InstituteActivityEventImages';
import InstituteActivityEventParticipation from './InstituteActivityEventParticipation';
import InstituteActivityEventView from './InstituteActivityEventView';
import { Divider, Subheading } from 'react-native-paper';
import Remarks from './../../../components/Remarks';
import NotificationConfiguration from './../../../components/NotificationConfiguration';

import { UiColor } from "../../../theme";













class AuthTemplate { }

AuthTemplate.AuthorisationConfig = function (stateObject) {


  return (<View>

    <TabScreen
      tabHeading={['Basic Info','Participation & Result']}
      stateObject={stateObject}
      stateValue={'selectedTabIndex'}
      selectedStateValue={stateObject.state.selectedTabIndex}
      barColor={UiColor.WHITE}
    />
    {/* <Divider/> */}


    {stateObject.state.selectedTabIndex == 0 && <View>
  <View>
      <Subheading style={AppStyles.bold_600}>{stateObject.state.createStepsHeading[0]}</Subheading>
      <InstituteActivityEventView
        stateObject={stateObject}
      />
    </View>

    <Divider style={AppStyles.marginTop_3} />
    <View style={AppStyles.marginTop_2}>
      <Subheading style={AppStyles.bold_600}>{stateObject.state.createStepsHeading[1]}</Subheading>
      <InstituteActivityEventFeeDetails
        stateObject={stateObject}
      />
    </View>

    <Divider style={AppStyles.marginTop_3} />
    <View style={AppStyles.marginTop_2}>
      <Subheading style={AppStyles.bold_600}>{stateObject.state.createStepsHeading[2]}</Subheading>
      <InstituteActivityEventDetails
        stateObject={stateObject}
      />
    </View>

    <Divider style={AppStyles.marginTop_3} />
    <View style={AppStyles.marginTop_2}>
      <Subheading style={AppStyles.bold_600}>{stateObject.state.createStepsHeading[3]}</Subheading>
      <InstituteActivityEventImages
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
    <InstituteActivityEventParticipation
      stateObject={stateObject}
    />
</View>
</View>}





  </View>)


}




module.exports = {
  functions: AuthTemplate
}