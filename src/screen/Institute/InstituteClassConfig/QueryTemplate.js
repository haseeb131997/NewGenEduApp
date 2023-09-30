
import React from "react";
import { View, Text } from "react-native";
import InstituteClassConfigFilter from './InstituteClassConfigFilter';
import TabScreen from '../../../components/TabScreen';
import AuditDetail from '../../../components/AuditDetail';
import InstituteClassConfigGeneral from './InstituteClassConfigGeneral';
import InstituteClassConfigPeriod from './InstituteClassConfigPeriod';
import GeneralUtils from "../../../utils/GeneralUtils";
import AppStyles from "../../../AppStyles/AppStyles";
import Exception from '../../../utils/Exception'










class QueryTemplate { }





QueryTemplate.QueryMandatory = function (stateObject) {
  switch (stateObject.state.currentStep) {
    case 1:
      if ((stateObject.state.summaryDataModel.filter.Class == '' || stateObject.state.summaryDataModel.filter.Class == null)
        && (stateObject.state.summaryDataModel.filter.authStat == '' || stateObject.state.summaryDataModel.filter.authStat == null)
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
  return (<InstituteClassConfigFilter stateObject={stateObject}/>)

}




module.exports = {
  functions: QueryTemplate
}