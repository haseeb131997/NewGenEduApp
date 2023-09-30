
import React from "react";
import { View, Text } from "react-native";
import ClassStudentRegisterFilter from './ClassStudentRegisterFilter';
import GeneralUtils from "../../../utils/GeneralUtils";
import AppStyles from "../../../AppStyles/AppStyles";
import Exception from '../../../utils/Exception'










class QueryTemplate { }





QueryTemplate.QueryMandatory = function (stateObject) {
      if (stateObject.state.summaryDataModel.filter.authStat == '' || stateObject.state.summaryDataModel.filter.authStat == null
      && stateObject.state.summaryDataModel.filter.classCode == '' || stateObject.state.summaryDataModel.filter.classCode == null
      && stateObject.state.summaryDataModel.filter.startDate == '' || stateObject.state.summaryDataModel.filter.startDate == null
      && stateObject.state.summaryDataModel.filter.endDate == '' || stateObject.state.summaryDataModel.filter.endDate == null
      
      ) {
         
        
        Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-028', errorMessage: '', errorParam:'' }])
         return false;
       }
    
  return true;
}





QueryTemplate.QueryConfig = function (stateObject) {
  return (<ClassStudentRegisterFilter stateObject={stateObject}/>)

}




module.exports = {
  functions: QueryTemplate
}