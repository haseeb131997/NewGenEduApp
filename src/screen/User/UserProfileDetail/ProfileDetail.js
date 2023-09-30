
import React from "react";
import { View, Text } from "react-native";
import TabScreen from '../../../components/TabScreen';
import UserProfileGeneral from './UserProfileGeneral';
import UserProfileParent from './UserProfileParent';
import { UiColor } from '../../../theme';
import { Divider } from 'react-native-paper';


class ProfileDetail { }

ProfileDetail.ProfileDetailConfig = function (stateObject) {
  return <View >

    {/* <TabScreen
      tabHeading={['General', 'Students']}
      stateObject={stateObject}
      stateValue={'selectedTabIndex'}
      selectedStateValue={stateObject.state.selectedTabIndex}
      barColor={UiColor.WHITE}
    /> */}
       {/* <Divider /> */}
    {stateObject.state.selectedTabIndex == 0 &&
      <UserProfileGeneral
        stateObject={stateObject}
      />
    }
    {stateObject.state.selectedTabIndex == 1 &&
      <View>
        <UserProfileParent
          stateObject={stateObject}
        />
      </View>
    }
  </View>
}

module.exports = {
  functions: ProfileDetail
}