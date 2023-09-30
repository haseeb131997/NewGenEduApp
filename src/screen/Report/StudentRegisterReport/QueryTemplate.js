
import React from "react";
import StudentRegisterReportFilter from './StudentRegisterReportFilter';
import Exception from '../../../utils/Exception'
// import Submit from './../../../components/Submit';










class QueryTemplate { }



QueryTemplate.QueryMandatory = function (stateObject) {
  stateObject.state.errorField = []
  var mandatoryCheckError = false;

  if (stateObject.state.dataModel.Master.studentStatus == '' || stateObject.state.dataModel.Master.studentStatus == null) {
    mandatoryCheckError = true
    stateObject.state.errorField.push('field1')
  }

  // if (stateObject.state.dataModel.Master.classCode == '' || stateObject.state.dataModel.Master.classCode == null) {
  //   mandatoryCheckError = true
  //   stateObject.state.errorField.push('field2')
  // }

  if (mandatoryCheckError) {
    Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-080', errorMessage: '', errorParam: '' }])
    return false
  }
  else {
    return true
  }

}

QueryTemplate.QueryConfig = function (stateObject) {
  return <StudentRegisterReportFilter stateObject={stateObject} />
}


module.exports = {
  functions: QueryTemplate
}