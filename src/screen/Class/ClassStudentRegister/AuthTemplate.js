
import React from "react";
import { View, Text } from "react-native";
import AppStyles from "../../../AppStyles/AppStyles";
import ClassStudentRegisterView from './ClassStudentRegisterView';
import ClassStudentRegisterDetails from './ClassStudentRegisterDetails';
import { Divider, Subheading, Title } from 'react-native-paper';
import Remarks from './../../../components/Remarks';
import TabScreen from '../../../components/TabScreen';
import { UiColor } from "../../../theme";














class AuthTemplate {}

AuthTemplate.AuthorisationConfig = function (stateObject) {
  return (<View>

  <TabScreen
      tabHeading={['Basic info','Students']}
      stateObject={stateObject}
      stateValue={'selectedTabIndex'}
      selectedStateValue={stateObject.state.selectedTabIndex}
      barColor={UiColor.WHITE}
    />


  {stateObject.state.selectedTabIndex == 0 && <View>
   <View>
   {/* <Subheading style={AppStyles.bold_600}>{stateObject.state.createStepsHeading[0]}</Subheading> */}
   {/* <Divider style={AppStyles.marginTop_1} /> */}
     <ClassStudentRegisterView
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

{stateObject.state.selectedTabIndex == 1 &&  <View style={AppStyles.marginTop_2}>
   {/* <Subheading style={AppStyles.bold_600}>{stateObject.state.createStepsHeading[1]}</Subheading> */}
   {/* <Divider style={AppStyles.marginTop_1} /> */}
     <ClassStudentRegisterDetails
       stateObject={stateObject}
     />
 </View>}
 
</View>)


}




module.exports = {
    functions:AuthTemplate
}