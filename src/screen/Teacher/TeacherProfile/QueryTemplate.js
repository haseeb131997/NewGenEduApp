
import React from "react";
import TeacherSearchFilter from './TeacherSearchFilter';
import Exception from '../../../utils/Exception'










class QueryTemplate { }




QueryTemplate.QueryMandatory = function (stateObject) {
  // switch (stateObject.state.currentStep) {
  //   case 1:
  //     if ((stateObject.state.summaryDataModel.filter.year == '' || stateObject.state.summaryDataModel.filter.year == null)
  //       && (stateObject.state.summaryDataModel.filter.authStat == '' || stateObject.state.summaryDataModel.filter.authStat == null)
  //       ) {
  //         Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-001', errorMessage: '', errorParam: ['Year'] }])
  //        return false;
  //     }
    
  //     break;
  // }
  return true;
}

QueryTemplate.QueryConfig = function (stateObject) {
  return <TeacherSearchFilter stateObject={stateObject}/>
}


module.exports = {
  functions: QueryTemplate
}