
import React from "react";
import { View, Text } from "react-native";
import OnlineVideoClassRoomFilter from './OnlineVideoClassRoomFilter';
import Exception from '../../../utils/Exception'










class QueryTemplate { }





QueryTemplate.QueryMandatory = function (stateObject) {
  console.log(stateObject.state.currentStep,'Query Mandatory')
  switch (stateObject.state.currentStep) {
    case 1:
      if(!(stateObject.state.userType == 'P' || stateObject.state.userType == 'S' ))
      {
      if ((stateObject.state.summaryDataModel.filter.subject == '' || stateObject.state.summaryDataModel.filter.subject == null)
        && (stateObject.state.summaryDataModel.filter.month == '' || stateObject.state.summaryDataModel.filter.month == null)
        && (stateObject.state.summaryDataModel.filter.year == '' || stateObject.state.summaryDataModel.filter.year == null)
        ) {
        // Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-028', errorMessage: '', errorParam: '' }])
        // return false;
        Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-028', errorMessage: '', errorParam: '' }])
        return false;
      }
    }
      break;
  }
  return true;
}





QueryTemplate.QueryConfig = function (stateObject) {
  return (<OnlineVideoClassRoomFilter stateObject={stateObject}/>)
}




module.exports = {
  functions: QueryTemplate
}