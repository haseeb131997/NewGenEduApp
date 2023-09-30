
import React from "react";
import { View } from 'react-native';
import ClassTimeTableView from './ClassTimeTableView';
import ClassTimeTableGeneral from './ClassTimeTableGeneral';
import AppStyles from "../../../AppStyles/AppStyles";
import { Divider, Subheading, Title } from 'react-native-paper';
import Remarks from './../../../components/Remarks';










class AuthTemplate {}


AuthTemplate.AuthorisationConfig = function (stateObject) {
  return (<View>
       <View>
      <Subheading style={AppStyles.bold_600}>{stateObject.state.createStepsHeading[0]}</Subheading>
        <ClassTimeTableGeneral
          stateObject={stateObject}
        />
    </View>

    <Divider style={AppStyles.marginTop_3} />
    <View style={AppStyles.marginTop_2}>
      <Subheading style={AppStyles.bold_600}>{stateObject.state.createStepsHeading[1]}</Subheading>
        <ClassTimeTableView
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