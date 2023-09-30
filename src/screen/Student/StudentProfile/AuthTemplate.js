
import React from "react";
import { View } from 'react-native';
import StudentGenralDetailView from './StudentGenralDetailView';
import StudentFamilyDetail from './StudentFamilyDetail';
import StudentNotesDetailView from './StudentNotesDetailView';
import StudentClassesDetailView from './StudentClassesDetailView';
import AppStyles from "../../../AppStyles/AppStyles";
import { Divider, Subheading, Title } from 'react-native-paper';
import Remarks from './../../../components/Remarks';
import StudentInstituteFieldDetail from './StudentInstituteFieldDetail';









class AuthTemplate {}


AuthTemplate.AuthorisationConfig = function (stateObject) {
  return (<View>
       <View>
      <Subheading style={AppStyles.bold_600}>{stateObject.state.createStepsHeading[0]}</Subheading>
      {/* <Divider style={AppStyles.marginTop_1} /> */}
        <StudentGenralDetailView
          stateObject={stateObject}
        />
    </View>

    <Divider style={AppStyles.marginTop_3} />
    <View style={AppStyles.marginTop_2}>
      <Subheading style={[AppStyles.bold_600,AppStyles.marginTop_2]}>{stateObject.state.createStepsHeading[1]}</Subheading>
      {/* <Divider style={AppStyles.marginTop_1} /> */}
        <StudentFamilyDetail
          stateObject={stateObject}
        />
    </View>

    <Divider style={AppStyles.marginTop_3} />
    <View style={AppStyles.marginTop_2}>
      <Subheading style={[AppStyles.bold_600,AppStyles.marginTop_2]}>{'Classes'}</Subheading>
      {/* <Divider style={AppStyles.marginTop_1} /> */}
        <StudentClassesDetailView
          stateObject={stateObject}
        />
    </View>

    <Divider style={AppStyles.marginTop_3} />
    <View style={AppStyles.marginTop_2}>
      <Subheading style={[AppStyles.bold_600,AppStyles.marginTop_2]}>{stateObject.state.createStepsHeading[4]}</Subheading>
      {/* <Divider style={AppStyles.marginTop_1} /> */}
        <StudentInstituteFieldDetail
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