
import React from "react";
import TeacherSubstituteReportFilter from './TeacherSubstituteReportFilter';
import Exception from '../../../utils/Exception'
// import Submit from './../../../components/Submit';










class QueryTemplate { }



QueryTemplate.QueryMandatory = function (stateObject) {
  stateObject.state.errorField = []
  var mandatoryCheckError = false;

      if (stateObject.state.dataModel.Master.teacherName == '' || stateObject.state.dataModel.Master.teacherName == null) {
        mandatoryCheckError = true
        stateObject.state.errorField.push('field1')
      }
      if (stateObject.state.dataModel.Master.date == '' || stateObject.state.dataModel.Master.date == null) {
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

QueryTemplate.QueryConfig = function (stateObject) {
  return <TeacherSubstituteReportFilter stateObject={stateObject}/>
}


module.exports = {
  functions: QueryTemplate
}