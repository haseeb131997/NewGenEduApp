
import React from "react";
import { View } from 'react-native';
// import Submit from './../../../components/Submit';
import AppStyles from "../../../AppStyles/AppStyles";
import FilterListView from './FilterListView';








class ViewTemplateFilterList { }

ViewTemplateFilterList.QueryConfig = function (stateObject) {
  return <View style={AppStyles.marginTop_2}>
        <FilterListView stateObject={stateObject} />
       </View>
}


module.exports = {
  functions: ViewTemplateFilterList
}