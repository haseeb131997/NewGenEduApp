
import React from "react";
import { View } from 'react-native';
import TabScreen from '../../../components/TabScreen';
import { UiColor } from "../../../theme";
import AppStyles from "../../../AppStyles/AppStyles";
import AuditDetail from '../../../components/AuditDetail';
import ClassAssignmentView from './ClassAssignmentView';
import ClassAssessmentStudentList from './ClassAssessmentStudentList';
import ClassAssignmentInstructions from './ClassAssignmentInstructions';
import ClassAssignmentWorkSheet from './ClassAssignmentWorkSheet';
import NotificationConfiguration from './../../../components/NotificationConfiguration';
import { Divider, Subheading } from "react-native-paper";







class ViewTemplate { }

ViewTemplate.QueryConfig = function (stateObject) {
  return <View>
    <TabScreen
      tabHeading={['Basic Info','Assesment','Audit']}
      stateObject={stateObject}
      stateValue={'selectedTabIndex'}
      selectedStateValue={stateObject.state.selectedTabIndex}
      barColor={UiColor.WHITE}
    />
     {/* <CustomTabScreen
      tabHeading={['Basic Info', 'Assignment']}
      otherTabHeading={['Notification','Audit']}
      stateObject={stateObject}
      stateValue={'selectedTabIndex'}
      selectedStateValue={stateObject.state.selectedTabIndex}
      barColor={UiColor.WHITE}
    /> */}
    {/* <Divider/> */}

    {stateObject.state.selectedTabIndex == 0 &&
     <View style={AppStyles.marginTop_2}>
        <ClassAssignmentView stateObject={stateObject} />
     </View>
    }
    {stateObject.state.selectedTabIndex == 1 &&
    <View>    
        <ClassAssessmentStudentList
          stateObject={stateObject}
        />
    </View>
     
     }
  
    {stateObject.state.selectedTabIndex == 2 &&
       <View>
         <AuditDetail
       stateObject={stateObject}
     /></View>
     }

  </View>
}


module.exports = {
  functions: ViewTemplate
}