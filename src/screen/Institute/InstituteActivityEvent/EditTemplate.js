

import React from "react";
import { View, Text } from "react-native";
import TabScreen from '../../../components/TabScreen';
//import AuditDetail from './../../../components/AuditDetail';
import InstituteActivityEventGeneral from './InstituteActivityEventGeneral';
//import InstituteActivityEventFeeDetails from './InstituteActivityEventFeeDetails';
import InstituteActivityEventDetails from './InstituteActivityEventDetails';
import InstituteActivityEventImages from './InstituteActivityEventImages';
import InstituteActivityEventParticipation from './InstituteActivityEventParticipation';
import AppStyles from "../../../AppStyles/AppStyles";
import Exception from '../../../utils/Exception'
import { Caption, Divider, Subheading, Title } from 'react-native-paper';
import Remarks from './../../../components/Remarks';
import NotificationConfiguration from './../../../components/NotificationConfiguration';
import { UiColor } from "../../../theme";
import GeneralUtils from "../../../utils/GeneralUtils";


// GeneralUtils.functions.showParticipationTab  = false


// GeneralUtils.functions.uploadEventImage = false



class EditTemplate { }



EditTemplate.ModificationMandatory = function (stateObject) {
  stateObject.state.errorField = []
  var mandatoryCheckError = false;

  if (stateObject.state.dataModel.activityID == '' || stateObject.state.dataModel.activityID == null) {
    mandatoryCheckError = true
    stateObject.state.errorField.push('field1')
  }
  if (stateObject.state.dataModel.activityName == '' || stateObject.state.dataModel.activityName == null) {
    mandatoryCheckError = true
    stateObject.state.errorField.push('field2')
  }
  if (stateObject.state.dataModel.activityType == '' || stateObject.state.dataModel.activityType == null) {
    mandatoryCheckError = true
    stateObject.state.errorField.push('field3')
  }
  if (stateObject.state.dataModel.groupID == '' || stateObject.state.dataModel.groupID == null) {
    mandatoryCheckError = true
    stateObject.state.errorField.push('field4')
  }

  // if (stateObject.state.dataModel.feeDescription == '' || stateObject.state.dataModel.feeDescription == null) {
  //   mandatoryCheckError = true
  //   stateObject.state.errorField.push('field5')
  // }

  if (stateObject.state.dataModel.date == '' || stateObject.state.dataModel.date == null) {
    mandatoryCheckError = true
    stateObject.state.errorField.push('field6')
  }
  if (stateObject.state.dataModel.venue == '' || stateObject.state.dataModel.venue == null) {
    mandatoryCheckError = true
    stateObject.state.errorField.push('field7')
  }



  if (mandatoryCheckError) {
    Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-080', errorMessage: '', errorParam: '' }])
    return false
  }
  // if (stateObject.state.dataModel.feeBreakup.length == 0 || stateObject.state.dataModel.feeBreakup == null) {
  //   Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-087', errorMessage: '', errorParam: ['Breakup Details'] }])
  //   return false;
  // }
  else {
    return true
  }


  return true;
}


EditTemplate.ModificationConfig = function (stateObject) {
  return (<View>
      
    {(stateObject.state.type == 'Enroll' && !GeneralUtils.functions.uploadEventImage)  &&<View>
      <Subheading style={AppStyles.bold_600}>{'Enroll Students'}</Subheading>
      <InstituteActivityEventParticipation
        stateObject={stateObject}
      />
    </View>}

    {(stateObject.state.type == 'Shortlist' && !GeneralUtils.functions.uploadEventImage)  && <View>
      <Subheading style={AppStyles.bold_600}>{'Shortlist the students who already enrolled for the event'}</Subheading>
      <InstituteActivityEventParticipation
        stateObject={stateObject}
      />
    </View>}

    {(stateObject.state.type == 'Result' && !GeneralUtils.functions.uploadEventImage)  && <View>
      <Subheading style={AppStyles.bold_600}>{'Result Declaration'}</Subheading>
      <InstituteActivityEventParticipation
        stateObject={stateObject}
      />
    </View>}
    {(stateObject.state.type == 'Edit' && GeneralUtils.functions.uploadEventImage)  && <View>
    <Subheading style={AppStyles.bold_600}>{'Upload image/Video into Event Gallery'}</Subheading>
            <InstituteActivityEventImages
              stateObject={stateObject}
            />
    </View>}

    {(stateObject.state.type == 'Edit'  && !GeneralUtils.functions.uploadEventImage)  &&
      <View>
        {/*}  tabHeading={['Basic Info']}
          stateObject={stateObject}
          stateValue={'selectedTabIndex'}
          selectedStateValue={stateObject.state.selectedTabIndex}
          barColor={UiColor.WHITE}
       />*/}
        {/* <Divider /> */}


        {/*stateObject.state.selectedTabIndex == 0 && <View>*/}
          <View>
            <Subheading style={AppStyles.bold_600}>{stateObject.state.createStepsHeading[0]}</Subheading>
            <InstituteActivityEventGeneral
              stateObject={stateObject}
            />
          </View>


          {/*<View style={AppStyles.marginTop_2}>
            <Subheading style={AppStyles.bold_600}>{stateObject.state.createStepsHeading[1]}</Subheading>
            <InstituteActivityEventFeeDetails
              stateObject={stateObject}
            />
        </View> */}

          <Divider style={AppStyles.marginTop_3} />
          <View style={AppStyles.marginTop_2}>
            <Subheading style={AppStyles.bold_600}>{stateObject.state.createStepsHeading[2]}</Subheading>
            <InstituteActivityEventDetails
              stateObject={stateObject}
            />
          </View>

          <Divider style={AppStyles.marginTop_3} />
          <View style={AppStyles.marginTop_2}>
            <Subheading style={AppStyles.bold_600}>{stateObject.state.createStepsHeading[3]}</Subheading>
            <InstituteActivityEventImages
              stateObject={stateObject}
            />
          </View>

          <Divider style={AppStyles.marginTop_3} />
          <View style={AppStyles.marginTop_2}>
            <NotificationConfiguration
              stateObject={stateObject}
            />
          </View>


          <Divider style={AppStyles.marginTop_3} />
          <View style={AppStyles.marginTop_2}>
            <Remarks
              stateObject={stateObject}
            />
          </View>
        </View>
        /*stateObject.state.selectedTabIndex == 1 && <View>

          <View style={AppStyles.marginTop_2}>
            <InstituteActivityEventParticipation
              stateObject={stateObject}
            />
          </View>
        </View>**/}


  </View>)

}


module.exports = {
  functions: EditTemplate
}