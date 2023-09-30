
import React from "react";
import StudentLessonPlannerReportFilter from './StudentLessonPlannerReportFilter';
import Exception from '../../../utils/Exception'
// import Submit from './../../../components/Submit';










class QueryTemplate { }



QueryTemplate.QueryMandatory = function (stateObject) {
  stateObject.state.errorField = []
  var mandatoryCheckError = false;

      if (stateObject.state.dataModel.Master.studentName == '' || stateObject.state.dataModel.Master.studentName == null) {
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
  return <StudentLessonPlannerReportFilter stateObject={stateObject}/>
}


module.exports = {
  functions: QueryTemplate
}