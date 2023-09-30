
import React from "react";
import { View, Text } from "react-native";
import TeacherGenralDetail from './TeacherGenralDetail';
import TeacherFamilyDetail from './TeacherFamilyDetail';
import TeacherNotesDetail from './TeacherNotesDetail';












class ProfileDetail { }

ProfileDetail.ProfileDetailConfig = function (stateObject) {
  return <View>
    {stateObject.state.selectedTabIndex == 0 &&
      <TeacherGenralDetail
        stateObject={stateObject}
      />
    }
    {stateObject.state.selectedTabIndex == 2 &&
      <TeacherNotesDetail
        stateObject={stateObject}
      />
    }

    {stateObject.state.selectedTabIndex == 1 &&
      <TeacherFamilyDetail
        stateObject={stateObject}
      />
    }
  </View>
}

module.exports = {
  functions: ProfileDetail
}