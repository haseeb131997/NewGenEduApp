
import React from "react";
import { View, Text } from "react-native";
import StudentNotesFilter from './StudentNotesFilter';
import Exception from '../../../utils/Exception'










class QueryTemplate { }





QueryTemplate.QueryMandatory = function (stateObject) {
  stateObject.state.errorField = []
  var mandatoryCheckError = false;

      if (stateObject.state.summaryDataModel.filter.studentName == '' || stateObject.state.summaryDataModel.filter.studentName == null) {
        mandatoryCheckError = true
        stateObject.state.errorField.push('field1')
      }
      if (mandatoryCheckError) {
        Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-080', errorMessage: '', errorParam: '' }])
        return false
      }
      else {
        return true
      }

}





QueryTemplate.QueryConfig = function (stateObject) {
  return (<StudentNotesFilter stateObject={stateObject}/>)
}




module.exports = {
  functions: QueryTemplate
}