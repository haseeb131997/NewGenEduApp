
import React from "react";
import { View } from 'react-native';
import TeacherGenralDetailView from './TeacherGenralDetailView';
import TeacherFamilyDetail from './TeacherFamilyDetail';
// import StudentClassesDetailView from './StudentClassesDetailView';
import TeacherInstituteFieldDetail from './TeacherInstituteFieldDetail';

import Exception from '../../../utils/Exception'
// import Submit from './../../../components/Submit';
import CustomTabScreen from '../../../components/CustomTabScreen';
import { UiColor } from "../../../theme";
import AppStyles from "../../../AppStyles/AppStyles";
import AuditDetail from '../../../components/AuditDetail';
import { Divider, Subheading, Title } from 'react-native-paper';








class ViewTemplate { }

ViewTemplate.QueryConfig = function (stateObject) {
  return <View>
    {/* <TabScreen
      tabHeading={['Basic Info', 'Family']}
      stateObject={stateObject}
      stateValue={'selectedTabIndex'}
      selectedStateValue={stateObject.state.selectedTabIndex}
      barColor={UiColor.WHITE}

    /> */}
    <CustomTabScreen
      tabHeading={['Basic Info', 'Family Info']}
      otherTabHeading={['Institute defined fields', 'Audit']}
      stateObject={stateObject}
      stateValue={'selectedTabIndex'}
      selectedStateValue={stateObject.state.selectedTabIndex}
      barColor={UiColor.WHITE}
    />

    {stateObject.state.selectedTabIndex == 0 &&
      <View style={AppStyles.marginTop_2}>
        <TeacherGenralDetailView stateObject={stateObject} />
      </View>
    }
    {stateObject.state.selectedTabIndex == 1 &&
      <View style={AppStyles.marginTop_2}>
        <TeacherFamilyDetail stateObject={stateObject} />
      </View>
    }
    {/* {stateObject.state.selectedTabIndex == 2 &&
      <View style={AppStyles.marginTop_2}>
        <StudentClassesDetailView stateObject={stateObject} />
      </View>
    } */}
    {stateObject.state.selectedTabIndex == 2 &&
      <View style={AppStyles.marginTop_2}>
      <Subheading style={[AppStyles.bold_600]}>{stateObject.state.createStepsHeading[4]}</Subheading>
        <TeacherInstituteFieldDetail stateObject={stateObject} />
      </View>
    }
    {/* {stateObject.state.selectedTabIndex == 4 &&
      <View style={AppStyles.marginTop_2}>
        <StudentOtherDetailView stateObject={stateObject} />
      </View>
    } */}
    {stateObject.state.selectedTabIndex == 3 &&
       <View>
       <Subheading style={[AppStyles.bold_600]}>Audit</Subheading>
     <Divider style={AppStyles.marginTop_1} />
      <AuditDetail
        stateObject={stateObject}
      /></View>}
  </View>

}


module.exports = {
  functions: ViewTemplate
}