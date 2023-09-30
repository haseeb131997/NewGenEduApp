
import React from "react";
import { View, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import TabScreen from '../../../components/TabScreen';
import GeneralUtils from "../../../utils/GeneralUtils";
import AppStyles from "../../../AppStyles/AppStyles";
import AuditDetail from '../../../components/AuditDetail';
import InstituteClassConfigView from './InstituteClassConfigView';
import InstituteClassConfigPeriod from './InstituteClassConfigPeriod';
import { UiColor } from "../../../theme";
import { Divider, Subheading, Title } from 'react-native-paper';
import Remarks from './../../../components/Remarks';














class AuthTemplate {}

AuthTemplate.AuthorisationConfig = function (stateObject) {
  // return (<View>
  //   <TabScreen
  //     tabHeading={['Details','Period','Audit']}
  //     stateObject={stateObject}
  //     stateValue={'selectedTabIndex'}
  //     selectedStateValue={stateObject.state.selectedTabIndex}
  //     barColor={UiColor.WHITE}
  //   />

  //   {stateObject.state.selectedTabIndex == 0 &&
  //    <View style={AppStyles.marginTop_2}>
  //       <InstituteClassConfigView stateObject={stateObject} />
  //    </View>
  //   }
  //   {stateObject.state.selectedTabIndex == 1 &&
  //      <InstituteClassConfigPeriod 
  //      stateObject={stateObject}
  //    />}
  //   {stateObject.state.selectedTabIndex == 2 &&
  //      <AuditDetail
  //      stateObject={stateObject}
  //    />}

  // </View>
  // )


  return (<View>
    <View>
   <Subheading style={AppStyles.bold_600}>{stateObject.state.createStepsHeading[0]}</Subheading>
   {/* <Divider style={AppStyles.marginTop_1} /> */}
     <InstituteClassConfigView
       stateObject={stateObject}
     />
 </View>
 <Divider style={AppStyles.marginTop_3} />
    <View style={AppStyles.marginTop_2}>
   <Subheading style={AppStyles.bold_600}>{stateObject.state.createStepsHeading[1]}</Subheading>
   {/* <Divider style={AppStyles.marginTop_1} /> */}
     <InstituteClassConfigPeriod
       stateObject={stateObject}
     />
 </View>
 <Divider style={AppStyles.marginTop_3} />
    <View style={AppStyles.marginTop_2}>
   <Remarks
     stateObject={stateObject}
   />
 </View>
</View>)


}




module.exports = {
    functions:AuthTemplate
}