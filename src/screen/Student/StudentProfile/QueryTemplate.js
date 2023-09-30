
import React from "react";
import StudentSearchFilter from './StudentSearchFilter';
import Exception from '../../../utils/Exception'
// import Submit from './../../../components/Submit';










class QueryTemplate { }




QueryTemplate.QueryMandatory = function (stateObject) {
  switch (stateObject.state.currentStep) {
     case 1:
       if ((stateObject.state.summaryDataModel.filter.class == '' || stateObject.state.summaryDataModel.filter.class == null)
         && (stateObject.state.summaryDataModel.filter.studentID == '' || stateObject.state.summaryDataModel.filter.studentID == null)
         ) {
           Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-105', errorMessage: '', errorParam: ['Year'] }])
          return false;
       }
    
      break;
  }
  return true;
}

QueryTemplate.QueryConfig = function (stateObject) {
  return <StudentSearchFilter stateObject={stateObject}/>
}


module.exports = {
  functions: QueryTemplate
}