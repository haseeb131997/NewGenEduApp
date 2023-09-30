
import React from "react";
import MeetingAttendanceFilter from './MeetingAttendanceFilter';
import Exception from '../../../utils/Exception'
// import Submit from './../../../components/Submit';










class QueryTemplate { }
QueryTemplate.InstructionList = []



QueryTemplate.QueryMandatory = function (stateObject) {
  stateObject.state.errorField = []
  var mandatoryCheckError = false;
  if(!(stateObject.state.userType == 'P' || stateObject.state.userType == 'S' ))
  {
      if (stateObject.state.summaryDataModel.filter.meetingScreenType == '' || stateObject.state.summaryDataModel.filter.meetingScreenType == null) {
        mandatoryCheckError = true
        stateObject.state.errorField.push('field1')
      }

      if (stateObject.state.summaryDataModel.filter.month == '' || stateObject.state.summaryDataModel.filter.month == null) {
        mandatoryCheckError = true
        stateObject.state.errorField.push('field2')
      }
      if (stateObject.state.summaryDataModel.filter.year == '' || stateObject.state.summaryDataModel.filter.year == null) {
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
 return true;
}

QueryTemplate.QueryConfig = function (stateObject) {
  return <MeetingAttendanceFilter stateObject={stateObject}/>
}


module.exports = {
  functions: QueryTemplate
}