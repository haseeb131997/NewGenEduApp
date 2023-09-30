
import React from "react";
import FeesReportFilter from './FeesReportFilter';
import Exception from '../../../utils/Exception'
// import Submit from './../../../components/Submit';










class QueryTemplate { }



QueryTemplate.QueryMandatory = function (stateObject) {
  stateObject.state.errorField = []
  var mandatoryCheckError = false;

  // if (stateObject.state.dataModel.Master.classCode == '' || stateObject.state.dataModel.Master.classCode == null) {
  //   mandatoryCheckError = true
  //   stateObject.state.errorField.push('field1')
  // }

  // if (stateObject.state.dataModel.Master.feeDescription == '' || stateObject.state.dataModel.Master.feeDescription == null) {
  //   mandatoryCheckError = true
  //   stateObject.state.errorField.push('field2')
  // }

  if ((stateObject.state.dataModel.Master.classCode == '' || stateObject.state.dataModel.Master.classCode == null)
  && (stateObject.state.dataModel.Master.feeID == '' || stateObject.state.dataModel.Master.feeID == null)
  && (stateObject.state.dataModel.Master.feeStatus == '' || stateObject.state.dataModel.Master.feeStatus == null)
) {
  Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-028', errorMessage: '', errorParam: '' }])
  return false;
}

return true;
  // if (mandatoryCheckError) {
  //   Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-080', errorMessage: '', errorParam: '' }])
  //   return false
  // }
  // else {
  //   return true
  // }

}

QueryTemplate.QueryConfig = function (stateObject) {
  return <FeesReportFilter stateObject={stateObject} />
}


module.exports = {
  functions: QueryTemplate
}