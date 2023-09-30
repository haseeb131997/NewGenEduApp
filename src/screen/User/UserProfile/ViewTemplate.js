
import React from "react";
import { View } from 'react-native';
import UserProfileView from './UserProfileView';
import UserProfileClass from './UserProfileClass';
import UserProfileParent from './UserProfileParent';
import UserProfileStaff from './UserProfileStaff';
import UserProfileInstitute from './UserProfileInstitute';
import Exception from '../../../utils/Exception'
// import Submit from './../../../components/Submit';
import CustomTabScreen from '../../../components/CustomTabScreen';
import TabScreen from '../../../components/TabScreen';
import { UiColor } from "../../../theme";
import AppStyles from "../../../AppStyles/AppStyles";
import AuditDetail from '../../../components/AuditDetail';
import {  Subheading } from 'react-native-paper';








class ViewTemplate { }



ViewTemplate.AdminView = function (stateObject) {

  return <View>
    <CustomTabScreen
      tabHeading={['Basic Info', 'Class']}
      otherTabHeading={['Staff', 'Institute', 'Audit']}
      stateObject={stateObject}
      stateValue={'selectedTabIndex'}
      selectedStateValue={stateObject.state.selectedTabIndex}
      barColor={UiColor.WHITE}
    />
    {stateObject.state.selectedTabIndex == 0 &&
      <View >
        <UserProfileView stateObject={stateObject} />
      </View>
    }
    {stateObject.state.selectedTabIndex == 1 &&
      <View >
        <UserProfileClass stateObject={stateObject} />
      </View>
    }
      {stateObject.state.selectedTabIndex == 2 &&
      <View >
        <Subheading style={AppStyles.bold_600}>{stateObject.state.createStepsHeading[3]}</Subheading>
        <UserProfileStaff stateObject={stateObject} />
      </View>
    }
      {stateObject.state.selectedTabIndex == 3 &&
      <View >
          <Subheading style={AppStyles.bold_600}>{stateObject.state.createStepsHeading[4]}</Subheading>
        <UserProfileInstitute stateObject={stateObject} />
      </View>
    }
    {stateObject.state.selectedTabIndex == 4 &&
     <View>
        <Subheading style={AppStyles.bold_600}>{'Audit'}</Subheading>
      <AuditDetail
        stateObject={stateObject}
      />
     </View>
      }
  </View>

}


ViewTemplate.TeacherView = function (stateObject) {

  return <View>
    <CustomTabScreen
      tabHeading={['Basic Info', 'Class']}
      otherTabHeading={['Staff', 'Institute', 'Audit']}
      stateObject={stateObject}
      stateValue={'selectedTabIndex'}
      selectedStateValue={stateObject.state.selectedTabIndex}
      barColor={UiColor.WHITE}
    />
    {stateObject.state.selectedTabIndex == 0 &&
      <View >
        <UserProfileView stateObject={stateObject} />
      </View>
    }
    {stateObject.state.selectedTabIndex == 1 &&
      <View >
        <UserProfileClass stateObject={stateObject} />
      </View>
    }
      {stateObject.state.selectedTabIndex == 2 &&
      <View >
        <Subheading style={AppStyles.bold_600}>{stateObject.state.createStepsHeading[3]}</Subheading>
        <UserProfileStaff stateObject={stateObject} />
      </View>
    }
      {stateObject.state.selectedTabIndex == 3 &&
      <View >
          <Subheading style={AppStyles.bold_600}>{stateObject.state.createStepsHeading[4]}</Subheading>
        <UserProfileInstitute stateObject={stateObject} />
      </View>
    }
    {stateObject.state.selectedTabIndex == 4 &&
     <View>
        <Subheading style={AppStyles.bold_600}>{'Audit'}</Subheading>
      <AuditDetail
        stateObject={stateObject}
      />
     </View>
      }
  </View>
}

ViewTemplate.ParentView = function (stateObject) {

  return <View>
    <TabScreen
      tabHeading={['Basic Info', 'Parent', 'Audit']}
      stateObject={stateObject}
      stateValue={'selectedTabIndex'}
      selectedStateValue={stateObject.state.selectedTabIndex}
      barColor={UiColor.WHITE}
    />
    {stateObject.state.selectedTabIndex == 0 &&
      <View >
        <UserProfileView stateObject={stateObject} />
      </View>
    }
    {stateObject.state.selectedTabIndex == 1 &&
      <View >
        <UserProfileParent stateObject={stateObject} />
      </View>
    }
    {stateObject.state.selectedTabIndex == 2 &&
      <AuditDetail
        stateObject={stateObject}
      />}
  </View>

}

ViewTemplate.StudentView = function (stateObject) {

  return <View>
    <TabScreen
      tabHeading={['Basic Info', 'Audit']}
      stateObject={stateObject}
      stateValue={'selectedTabIndex'}
      selectedStateValue={stateObject.state.selectedTabIndex}
      barColor={UiColor.WHITE}

    />
    {stateObject.state.selectedTabIndex == 0 &&
      <View>
        <UserProfileView stateObject={stateObject} />
      </View>
    }
    {stateObject.state.selectedTabIndex == 1 &&
      <AuditDetail
        stateObject={stateObject}
      />}
  </View>

}

ViewTemplate.OtherView = function (stateObject) {

  return <View>
   <CustomTabScreen
      tabHeading={['Basic Info', 'Staff']}
      otherTabHeading={['Institute', 'Audit']}
      stateObject={stateObject}
      stateValue={'selectedTabIndex'}
      selectedStateValue={stateObject.state.selectedTabIndex}
      barColor={UiColor.WHITE}
    />
    {stateObject.state.selectedTabIndex == 0 &&
      <View>
        <UserProfileView stateObject={stateObject} />
      </View>
    }
    {stateObject.state.selectedTabIndex == 1 &&
      <View>
        <UserProfileStaff stateObject={stateObject} />
      </View>
    }
      {stateObject.state.selectedTabIndex == 2 &&
      <View>
          <Subheading style={AppStyles.bold_600}>{stateObject.state.createStepsHeading[4]}</Subheading>
        <UserProfileInstitute stateObject={stateObject} />
      </View>
    }
    {stateObject.state.selectedTabIndex == 3 &&
    <View>
        <Subheading style={AppStyles.bold_600}>{'Audit'}</Subheading>
      <AuditDetail
        stateObject={stateObject}
      />
      </View>
      }
  </View>

}



ViewTemplate.SelectedUserTypeView = function (stateObject) {
  var userType = stateObject.state.dataModel.userType
  switch (userType) {
    case "A":
      return ViewTemplate.AdminView(stateObject)
      break;
    case "T":
      return ViewTemplate.TeacherView(stateObject)
      break;
    case "P":
      return ViewTemplate.ParentView(stateObject)
      break;
    case "S":
      return ViewTemplate.StudentView(stateObject)
      break;
    case "O":
      return ViewTemplate.OtherView(stateObject)
      break;

    default:
      return ViewTemplate.AdminView(stateObject)
      break;
  }

}

ViewTemplate.QueryConfig = function (stateObject) {
  return ViewTemplate.SelectedUserTypeView(stateObject)
  // <View>
  //   <TabScreen
  //     tabHeading={['Basic Info','Class','Audit']}
  //     stateObject={stateObject}
  //     stateValue={'selectedTabIndex'}
  //     selectedStateValue={stateObject.state.selectedTabIndex}
  //     barColor={UiColor.WHITE}

  //   />
  //    {stateObject.state.selectedTabIndex == 0 &&
  //    <View style={AppStyles.marginTop_2}>
  //       <UserProfileView stateObject={stateObject} />
  //    </View>
  //   }
  //   {stateObject.state.selectedTabIndex == 1 &&
  //    <View style={AppStyles.marginTop_2}>
  //       <UserProfileClass stateObject={stateObject} />
  //    </View>
  //   }
  //   {stateObject.state.selectedTabIndex == 2 &&
  //      <AuditDetail
  //      stateObject={stateObject}
  //    />}
  // </View>

}


module.exports = {
  functions: ViewTemplate
}