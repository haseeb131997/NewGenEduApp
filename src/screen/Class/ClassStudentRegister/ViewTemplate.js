
import React from "react";
import { View } from 'react-native';
import Exception from '../../../utils/Exception'
import TabScreen from '../../../components/TabScreen';
import { UiColor } from "../../../theme";
import AppStyles from "../../../AppStyles/AppStyles";
import AuditDetail from '../../../components/AuditDetail';
import ClassStudentRegisterDetails from './ClassStudentRegisterDetails';
import ClassStudentRegisterView from './ClassStudentRegisterView';








class ViewTemplate { }

ViewTemplate.QueryConfig = function (stateObject) {
  return <View>
    <TabScreen
      tabHeading={['Basic info','Students','Audit']}
      stateObject={stateObject}
      stateValue={'selectedTabIndex'}
      selectedStateValue={stateObject.state.selectedTabIndex}
      barColor={UiColor.WHITE}
    />

     {stateObject.state.selectedTabIndex == 0 &&
       <ClassStudentRegisterView 
       stateObject={stateObject}
     />}

    {stateObject.state.selectedTabIndex == 1 &&
       <ClassStudentRegisterDetails 
       stateObject={stateObject}
     />}
    {stateObject.state.selectedTabIndex == 2 &&
       <AuditDetail
       stateObject={stateObject}
     />}

  </View>
}


module.exports = {
  functions: ViewTemplate
}