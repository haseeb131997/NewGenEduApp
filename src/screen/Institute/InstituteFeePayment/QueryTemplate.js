
import React from "react";
import { View, Text } from "react-native";
import InstituteFeePaymentFilter from './InstituteFeePaymentFilter';
import Exception from '../../../utils/Exception'










class QueryTemplate { }





QueryTemplate.QueryMandatory = function (stateObject) {
  switch (stateObject.state.currentStep) {
    case 1:
      if ((stateObject.state.summaryDataModel.filter.paymentDate == '' || stateObject.state.summaryDataModel.filter.paymentDate == null)
       // && (stateObject.state.summaryDataModel.filter.authStat == '' || stateObject.state.summaryDataModel.filter.authStat == null)
        ) {
        // Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-028', errorMessage: '', errorParam: '' }])
        // return false;
       Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-001', errorMessage: '', errorParam: ['Payment Date'] }])
        return false;
      }
    
      break;
  }
  return true;
}





QueryTemplate.QueryConfig = function (stateObject) {
  return (<InstituteFeePaymentFilter stateObject={stateObject}/>)
}




module.exports = {
  functions: QueryTemplate
}