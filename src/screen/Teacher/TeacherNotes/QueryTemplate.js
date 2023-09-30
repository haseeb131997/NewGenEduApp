
import React from "react";
import { View, Text } from "react-native";
import TeacherNotesFilter from './TeacherNotesFilter';
import Exception from '../../../utils/Exception'










class QueryTemplate { }





QueryTemplate.QueryMandatory = function (stateObject) {
  switch (stateObject.state.currentStep) {
    case 1:
      if ((stateObject.state.summaryDataModel.filter.standard == '' || stateObject.state.summaryDataModel.filter.standard == null)
        && (stateObject.state.summaryDataModel.filter.subjectID == '' || stateObject.state.summaryDataModel.filter.subjectID == null)
        && (stateObject.state.summaryDataModel.filter.teacherID == '' || stateObject.state.summaryDataModel.filter.teacherID == null)
        ) {
         Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-028', errorMessage: '', errorParam: '' }])
         return false;
        //Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-001', errorMessage: '', errorParam: ['Class'] }])
        //return false;
      }
    
      break;
  }
  return true;
}





QueryTemplate.QueryConfig = function (stateObject) {
  return (<TeacherNotesFilter stateObject={stateObject}/>)
}




module.exports = {
  functions: QueryTemplate
}