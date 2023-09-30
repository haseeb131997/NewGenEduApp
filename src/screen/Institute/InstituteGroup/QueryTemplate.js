
import React from "react";
import { View, Text } from "react-native";
import InstituteGroupFilter from './InstituteGroupFilter';
import GeneralUtils from "../../../utils/GeneralUtils";
import AppStyles from "../../../AppStyles/AppStyles";
import Exception from '../../../utils/Exception'










class QueryTemplate { }





QueryTemplate.QueryMandatory = function (stateObject) {
       if( (stateObject.state.summaryDataModel.filter.authStat == '' || stateObject.state.summaryDataModel.filter.authStat == null) && 
       (stateObject.state.summaryDataModel.filter.groupID == '' || stateObject.state.summaryDataModel.filter.groupID == null)
       ){
         Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-028', errorMessage: '', errorParam:'' }])
         return false;
       }
    
  return true;
}





QueryTemplate.QueryConfig = function (stateObject) {
  return (<InstituteGroupFilter stateObject={stateObject}/>)

}




module.exports = {
  functions: QueryTemplate
}