
import React from "react";
import MonthlyAttendanceReportFilter from './MonthlyAttendanceReportFilter';
import Exception from '../../../utils/Exception'
// import Submit from './../../../components/Submit';










class QueryTemplate { }



QueryTemplate.QueryMandatory = function (stateObject) {
  stateObject.state.errorField = []
  var mandatoryCheckError = false;

      if (stateObject.state.dataModel.Master.classCode == '' || stateObject.state.dataModel.Master.classCode == null) {
        mandatoryCheckError = true
        stateObject.state.errorField.push('field1')
      }
      if (stateObject.state.dataModel.Master.month == '' || stateObject.state.dataModel.Master.month == null) {
        mandatoryCheckError = true
        stateObject.state.errorField.push('field2')
      }
      if (stateObject.state.dataModel.Master.year == '' || stateObject.state.dataModel.Master.year == null) {
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
  return <MonthlyAttendanceReportFilter stateObject={stateObject}/>
}


module.exports = {
  functions: QueryTemplate
}