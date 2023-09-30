
import React from "react";
import { View, Text } from "react-native";
import TeacherEcircularFilter from './TeacherEcircularFilter';
import Exception from '../../../utils/Exception'










class QueryTemplate { }





QueryTemplate.QueryMandatory = function (stateObject) {
  switch (stateObject.state.currentStep) {
    case 1:
      if ((stateObject.state.summaryDataModel.filter.month == '' || stateObject.state.summaryDataModel.filter.month == null)
        && (stateObject.state.summaryDataModel.filter.year == '' || stateObject.state.summaryDataModel.filter.year == null)
        && (stateObject.state.summaryDataModel.filter.signStatus == '' || stateObject.state.summaryDataModel.filter.signStatus == null)
       
        ) {
         Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-028', errorMessage: '', errorParam: '' }])
        return false;
        //Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-001', errorMessage: '', errorParam: ['Class'] }])
        //return false;
      }
    
      break;
  }
  return true;
}





QueryTemplate.QueryConfig = function (stateObject) {
  return (<TeacherEcircularFilter stateObject={stateObject}/>)
}




module.exports = {
  functions: QueryTemplate
}