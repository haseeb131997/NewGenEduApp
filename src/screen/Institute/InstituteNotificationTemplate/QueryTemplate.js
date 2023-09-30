
import React from "react";
import NotificationTemplateFilter from './NotificationTemplateFilter';
import Exception from '../../../utils/Exception'
// import Submit from './../../../components/Submit';










class QueryTemplate { }
QueryTemplate.InstructionList = [
  {
    operation: 'Query',
    step: 1,
    InstructionHeading: 'Step2: Search record',
    instructionText: [
      {
        text: "Select year of the following value, to pick the record to be viewed"
      },
    ]
  },
  {
    operation: 'Query',
    step: 2,
    InstructionHeading: 'Step3: Choose record',
    instructionText: [
      {
        text: "Select or Double click a record to view more details about that record"
      },
    ]
  },
  {
    operation: 'Query',
    step: 3,
    InstructionHeading: 'Step4: Detailed view',
    instructionText: [
      {
        text: "Academic Year Configuration: Here the Institute can assign a start & end date for the given academic year. The start & end dates determined here applies to all the classes under the current institute. If a class follows different start and end dates, then the academic year can be configured for that class in Class->Student Register"
      },
      {
        text: "Switch between the tabs (general & audit) to view more corresponding details"
      },
       {
        text: "Under the audit tab the following can be seen:"
      },
      {
        text: "Maker - who created the record"
      },
      {
        text: "Checker - who authorized or verified the record"
      },
      {
        text: "Version - current version number of the record"
      },
      {
        text: "Current status – Open or Deleted"
      },
      {
        text: "Each modification creates a new version in the system. You can see only the latest version in the application. If you want old version, you have to raise the request to support@newgeneducationapp.com"
      },

    ]
  },
]



QueryTemplate.QueryMandatory = function (stateObject) {
  switch (stateObject.state.currentStep) {
    case 1:
      if ((stateObject.state.summaryDataModel.filter.year == '' || stateObject.state.summaryDataModel.filter.year == null)
        && (stateObject.state.summaryDataModel.filter.authStat == '' || stateObject.state.summaryDataModel.filter.authStat == null)
        ) {
          Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-001', errorMessage: '', errorParam: ['Year'] }])
         return false;
      }
    
      break;
  }
  return true;
}

QueryTemplate.QueryConfig = function (stateObject) {
  return <NotificationTemplateFilter stateObject={stateObject}/>
}


module.exports = {
  functions: QueryTemplate
}