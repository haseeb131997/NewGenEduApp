
import React from "react";
import { View, Text } from "react-native";
import TabScreen from '../../../components/TabScreen';
import CustomTabScreen from '../../../components/CustomTabScreen';

import StudentGenralDetail from './StudentGenralDetail';
import StudentFamilyDetail from './StudentFamilyDetail';
import StudentAddressDetail from './StudentAddressDetail';
import StudentOtherDetail from './StudentOtherDetail';
import StudentClassesDetail from './StudentClassesDetail';
import StudentNotesDetail from './StudentNotesDetail';
import { UiColor } from '../../../theme';
import { Divider } from 'react-native-paper';









class ProfileDetail { }
ProfileDetail.ProfileDetailStepConfig = function (stateObject) {
  return <View >
    {/* <TabScreen
      tabHeading={['General', 'Family', 'Classes', 'Address', 'Notes', 'Others']}
      stateObject={stateObject}
      stateValue={'selectedTabIndex'}
      selectedStateValue={stateObject.state.selectedTabIndex}
      barColor={UiColor.WHITE}
    /> */}
    {/* <CustomTabScreen
      tabHeading={['General', 'Family',]}
      otherTabHeading={['Classes', 'Address', 'Notes', 'Others']}
      stateObject={stateObject}
      stateValue={'selectedTabIndex'}
      selectedStateValue={stateObject.state.selectedTabIndex}
      barColor={UiColor.WHITE}
    /> */}
    {/* <Divider /> */}
    {stateObject.state.selectedTabIndex == 0 &&
      <StudentGenralDetail
        stateObject={stateObject}
      />
    }

    {stateObject.state.selectedTabIndex == 1 &&

      <StudentFamilyDetail
        stateObject={stateObject}

      />

    }
    {stateObject.state.selectedTabIndex == 2 &&
      <StudentClassesDetail
        stateObject={stateObject}

      />
    }

    {stateObject.state.selectedTabIndex == 3 &&
      <StudentNotesDetail
        stateObject={stateObject}
      />
    }
   


  </View>
}

module.exports = {
  functions: ProfileDetail
}