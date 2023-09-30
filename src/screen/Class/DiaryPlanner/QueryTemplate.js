
import React from "react";
import { View, Text } from "react-native";
import DiaryPlannerFilter from './DiaryPlannerFilter';
import Exception from '../../../utils/Exception'










class QueryTemplate { }





QueryTemplate.QueryMandatory = function (stateObject) {
 /* stateObject.state.errorField = []
  var mandatoryCheckError = false;

      if (stateObject.state.summaryDataModel.filter.studentName == '' || stateObject.state.summaryDataModel.filter.studentName == null) {
        mandatoryCheckError = true
        stateObject.state.errorField.push('field1')
      }
      if (mandatoryCheckError) {
        Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-080', errorMessage: '', errorParam: '' }])
        return false
      }
      else {
        return true
      }*/
      switch (stateObject.state.currentStep) {
        case 1:
          if ((stateObject.state.summaryDataModel.filter.classID == '' || stateObject.state.summaryDataModel.filter.classID == null) &&
          (stateObject.state.summaryDataModel.filter.month == '' || stateObject.state.summaryDataModel.filter.month == null) &&
          (stateObject.state.summaryDataModel.filter.year == '' || stateObject.state.summaryDataModel.filter.year == null)
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
  return (<DiaryPlannerFilter stateObject={stateObject}/>)
}




module.exports = {
  functions: QueryTemplate
}