
import React from "react";
import InstituteHolidayFilter from './InstituteHolidayFilter';
import Exception from '../../../utils/Exception'
// import Submit from './../../../components/Submit';










class QueryTemplate { }




QueryTemplate.QueryMandatory = function (stateObject) {
  switch (stateObject.state.currentStep) {
    case 1:
      if ((stateObject.state.summaryDataModel.filter.month == '' || stateObject.state.summaryDataModel.filter.month == null)
      && (stateObject.state.summaryDataModel.filter.year == '' || stateObject.state.summaryDataModel.filter.year == null)
      && (stateObject.state.summaryDataModel.filter.authStat == '' || stateObject.state.summaryDataModel.filter.authStat == null)
      ) {
      Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-028', errorMessage: '', errorParam: '' }])
      return false;
    }
    
      break;
  }
  return true;
}

QueryTemplate.QueryConfig = function (stateObject) {
  return <InstituteHolidayFilter stateObject={stateObject}/>
}


module.exports = {
  functions: QueryTemplate
}