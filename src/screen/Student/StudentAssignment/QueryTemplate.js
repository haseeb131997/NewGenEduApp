
import React from "react";
//import { View, Text } from "react-native";
import StudentAssignmentFilter from './StudentAssignmentFilter';
import Exception from '../../../utils/Exception'










class QueryTemplate { }





QueryTemplate.QueryMandatory = function (stateObject) {
  switch (stateObject.state.currentStep) {
    case 1:
      var mandatoryCheckError;
      if (!(stateObject.state.userType == 'P' || stateObject.state.userType == 'S')) {
        if (stateObject.state.summaryDataModel.filter.studentName == '' || stateObject.state.summaryDataModel.filter.studentName == null) {
          mandatoryCheckError = true
          stateObject.state.errorField.push('field1')
        }
        if (stateObject.state.summaryDataModel.filter.studentID == '' || stateObject.state.summaryDataModel.filter.studentID == null) {
          mandatoryCheckError = true
          stateObject.state.errorField.push('field2')
        }
        if (mandatoryCheckError) {
          Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-080', errorMessage: '', errorParam: '' }])
          return false
        }
        else {
          return true
        }
      }
     /* if ((stateObject.state.summaryDataModel.filter.Class == '' || stateObject.state.summaryDataModel.filter.Class == null)
        && (stateObject.state.summaryDataModel.filter.authStat == '' || stateObject.state.summaryDataModel.filter.authStat == null)
        ) {
        // Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-028', errorMessage: '', errorParam: '' }])
        // return false;
        Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-001', errorMessage: '', errorParam: ['Class'] }])
        return false;
      }*/
    
      break;
    }
  return true;
}





QueryTemplate.QueryConfig = function (stateObject) {
  return (<StudentAssignmentFilter stateObject={stateObject}/>)
}




module.exports = {
  functions: QueryTemplate
}