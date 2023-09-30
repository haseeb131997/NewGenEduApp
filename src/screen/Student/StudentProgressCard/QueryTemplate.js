
import React from "react";
import StudentProgressCardFilter from './StudentProgressCardFilter';
import Exception from '../../../utils/Exception'
// import Submit from './../../../components/Submit';










class QueryTemplate { }




QueryTemplate.QueryMandatory = function (stateObject) {
  stateObject.state.errorField = []
  var mandatoryCheckError = false;

      if (stateObject.state.summaryDataModel.filter.studentName == '' || stateObject.state.summaryDataModel.filter.studentName == null) {
        mandatoryCheckError = true
        stateObject.state.errorField.push('field1')
      }
      if (stateObject.state.summaryDataModel.filter.studentID == '' || stateObject.state.summaryDataModel.filter.studentID == null) {
        mandatoryCheckError = true
        stateObject.state.errorField.push('field2')
      }
    if(stateObject.state.userType == 'A' || stateObject.state.userType == 'T' || stateObject.state.userType == 'O'){
        if (stateObject.state.summaryDataModel.filter.exam == '' || stateObject.state.summaryDataModel.filter.exam == null) {
          mandatoryCheckError = true
          stateObject.state.errorField.push('field3')
        }
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
  return <StudentProgressCardFilter stateObject={stateObject}/>
}


module.exports = {
  functions: QueryTemplate
}