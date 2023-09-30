
import React from "react";
import { View, Text } from "react-native";
import InstituteFeeManagementFilter from './InstituteFeeManagementFilter';
import Exception from '../../../utils/Exception'










class QueryTemplate { }





QueryTemplate.QueryMandatory = function (stateObject) {
  switch (stateObject.state.currentStep) {
    case 1:
      if ((stateObject.state.summaryDataModel.filter.feeType == '' || stateObject.state.summaryDataModel.filter.feeType == null)
        && (stateObject.state.summaryDataModel.filter.assignee == '' || stateObject.state.summaryDataModel.filter.assignee == null)
        ) {
        Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-028', errorMessage: '', errorParam: '' }])
        return false;
       // Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-001', errorMessage: '', errorParam: ['Class'] }])
        //return false;
      }
    
      break;
  }
  return true;
}





QueryTemplate.QueryConfig = function (stateObject) {
  return (<InstituteFeeManagementFilter stateObject={stateObject}/>)
}




module.exports = {
  functions: QueryTemplate
}