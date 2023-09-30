
import React from "react";
import ClassTimeTableFilter from './ClassTimeTableFilter';
import Exception from '../../../utils/Exception'
// import Submit from './../../../components/Submit';










class QueryTemplate { }



QueryTemplate.QueryMandatory = function (stateObject) {
  switch (stateObject.state.currentStep) {
    case 1:
      if ((stateObject.state.summaryDataModel.filter.class == '' || stateObject.state.summaryDataModel.filter.class == null) &&
      (stateObject.state.summaryDataModel.filter.authStat == '' || stateObject.state.summaryDataModel.filter.authStat == null)
      ) {
        //Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-001', errorMessage: '', errorParam: ['Class'] }])
        //return false;
         Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-028', errorMessage: '', errorParam: '' }])
        return false;
      }
    
      break;
  }
  return true;
}

QueryTemplate.QueryConfig = function (stateObject) {
  return <ClassTimeTableFilter stateObject={stateObject}/>
}


module.exports = {
  functions: QueryTemplate
}