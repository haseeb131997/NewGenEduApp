
import React from "react";
import StudentSoftSkillFilter from './StudentSoftSkillFilter';
import Exception from '../../../utils/Exception'
// import Submit from './../../../components/Submit';










class QueryTemplate { }




QueryTemplate.QueryMandatory = function (stateObject) {
  stateObject.state.errorField = []
  var mandatoryCheckError = false;

      if (stateObject.state.summaryDataModel.filter.class == '' || stateObject.state.summaryDataModel.filter.class == null) {
        mandatoryCheckError = true
        stateObject.state.errorField.push('field1')
      }
      // if (stateObject.state.summaryDataModel.filter.studentID == '' || stateObject.state.summaryDataModel.filter.studentID == null) {
      //   mandatoryCheckError = true
      //   stateObject.state.errorField.push('field2')
      // }
      if (stateObject.state.summaryDataModel.filter.exam == '' || stateObject.state.summaryDataModel.filter.exam == null) {
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
  return <StudentSoftSkillFilter stateObject={stateObject}/>
}


module.exports = {
  functions: QueryTemplate
}