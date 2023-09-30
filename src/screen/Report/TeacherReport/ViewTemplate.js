
import React from "react";
import { View } from 'react-native';
// import Submit from './../../../components/Submit';
import AppStyles from "../../../AppStyles/AppStyles";
import ViewReport from './ViewReport';








class ViewTemplate { }

ViewTemplate.QueryConfig = function (stateObject) {
  return <View style={AppStyles.marginTop_2}>
        <ViewReport stateObject={stateObject} />
       </View>
}


module.exports = {
  functions: ViewTemplate
}