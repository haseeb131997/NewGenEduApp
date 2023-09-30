
import React from "react";
import ClassReportFilter from './ClassReportFilter';
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
     
      if (mandatoryCheckError) {
        Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-080', errorMessage: '', errorParam: '' }])
        return false
      }
      else {
        return true
      }

}

QueryTemplate.QueryConfig = function (stateObject) {
  return <ClassReportFilter stateObject={stateObject}/>
}


module.exports = {
  functions: QueryTemplate
}