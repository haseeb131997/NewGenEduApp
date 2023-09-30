
import React from "react";
import { View } from 'react-native';
import CustomTabScreen from '../../../components/CustomTabScreen';
import { UiColor } from "../../../theme";
import AppStyles from "../../../AppStyles/AppStyles";
import AuditDetail from '../../../components/AuditDetail';
import InstituteActivityEventView from './InstituteActivityEventView';
import InstituteActivityEventFeeDetails from './InstituteActivityEventFeeDetails';
import InstituteActivityEventDetails from './InstituteActivityEventDetails';
import InstituteActivityEventImages from './InstituteActivityEventImages';
import InstituteActivityEventParticipation from './InstituteActivityEventParticipation';
import NotificationConfiguration from './../../../components/NotificationConfiguration';
import { Divider, Subheading } from "react-native-paper";







class ViewTemplate { }

ViewTemplate.QueryConfig = function (stateObject) {
  return <View>
    {/* <TabScreen
      tabHeading={['Basic Info','Leave Details','Audit']}
      stateObject={stateObject}
      stateValue={'selectedTabIndex'}
      selectedStateValue={stateObject.state.selectedTabIndex}
      barColor={UiColor.WHITE}
    /> */}
    <CustomTabScreen
      tabHeading={['Basic Info', 'Fee Details']}
      otherTabHeading={['Event', 'Event Images','Participation & Result','Notification' ,'Audit']}
      stateObject={stateObject}
      stateValue={'selectedTabIndex'}
      selectedStateValue={stateObject.state.selectedTabIndex}
      barColor={UiColor.WHITE}
    />
    {/* <Divider/> */}

    {stateObject.state.selectedTabIndex == 0 &&
      <View style={AppStyles.marginTop_2}>
        <InstituteActivityEventView stateObject={stateObject} />
      </View>
    }
    {stateObject.state.selectedTabIndex == 1 &&
      <InstituteActivityEventFeeDetails
        stateObject={stateObject}
      />}
    {stateObject.state.selectedTabIndex == 2 &&
        <View>
        <Subheading style={AppStyles.bold_600}>{stateObject.state.createStepsHeading[2]}</Subheading>
      <InstituteActivityEventDetails
        stateObject={stateObject}
      />
      </View>
      }
    {stateObject.state.selectedTabIndex == 3 &&
    <View>
      <Subheading style={AppStyles.bold_600}>{stateObject.state.createStepsHeading[3]}</Subheading>
      <InstituteActivityEventImages
        stateObject={stateObject}
      />
      </View>
      }
       {stateObject.state.selectedTabIndex == 4 &&
  <View>
  <Subheading style={AppStyles.bold_600}>{'Participation & Result'}</Subheading>
      <InstituteActivityEventParticipation
        stateObject={stateObject}
      />
      </View>
      }
    {stateObject.state.selectedTabIndex == 5 &&
      <NotificationConfiguration
        stateObject={stateObject}
      />}
    {stateObject.state.selectedTabIndex == 6 &&

      <View>
        {/* <Subheading style={[AppStyles.bold_600]}>Audit Details</Subheading> */}
        <AuditDetail
          stateObject={stateObject}
        /></View>
    }

  </View>
}


module.exports = {
  functions: ViewTemplate
}