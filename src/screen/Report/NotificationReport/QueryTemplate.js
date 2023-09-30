
import React from "react";
import NotificationReportFilter from './NotificationReportFilter';
import Exception from '../../../utils/Exception'
// import Submit from './../../../components/Submit';










class QueryTemplate { }



QueryTemplate.QueryMandatory = function (stateObject) {
  stateObject.state.errorField = []
  var mandatoryCheckError = false;

  // if (stateObject.state.dataModel.Master.notificationType == '' || stateObject.state.dataModel.Master.notificationType == null) {
  //   mandatoryCheckError = true
  //   stateObject.state.errorField.push('field1')
  // }

  if (stateObject.state.dataModel.Master.fromDate == '' || stateObject.state.dataModel.Master.fromDate == null) {
    mandatoryCheckError = true
    stateObject.state.errorField.push('field2')
  }

  if (stateObject.state.dataModel.Master.toDate == '' || stateObject.state.dataModel.Master.toDate == null) {
    mandatoryCheckError = true
    stateObject.state.errorField.push('field3')
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
  return <NotificationReportFilter stateObject={stateObject} />
}


module.exports = {
  functions: QueryTemplate
}