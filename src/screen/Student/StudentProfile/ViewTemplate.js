
import React from "react";
import { View } from 'react-native';
import StudentGenralDetailView from './StudentGenralDetailView';
import StudentFamilyDetail from './StudentFamilyDetail';
import StudentClassesDetailView from './StudentClassesDetailView';
import StudentNotesDetailView from './StudentNotesDetailView';
// import Submit from './../../../components/Submit';
import CustomTabScreen from '../../../components/CustomTabScreen';
import { UiColor } from "../../../theme";
import AppStyles from "../../../AppStyles/AppStyles";
import AuditDetail from '../../../components/AuditDetail';
import { Divider, Subheading, Title } from 'react-native-paper';
import StudentInstituteFieldDetail from './StudentInstituteFieldDetail';







class ViewTemplate { }

ViewTemplate.QueryConfig = function (stateObject) {
  return <View>
    {/* <TabScreen
      tabHeading={['Basic Info', 'Family']}
      stateObject={stateObject}
      stateValue={'selectedTabIndex'}
      selectedStateValue={stateObject.state.selectedTabIndex}
      barColor={UiColor.WHITE}

    /> */}
    <CustomTabScreen
      tabHeading={['Basic Info', 'Family Info']}
      otherTabHeading={(stateObject.state.userType == "A" || stateObject.state.userType == "T" || stateObject.state.userType == "O") ? ['Classes', 'Institute defined fields', 'Audit'] : ['Classes', 'Institute defined fields']}
      stateObject={stateObject}
      stateValue={'selectedTabIndex'}
      selectedStateValue={stateObject.state.selectedTabIndex}
      barColor={UiColor.WHITE}
    />

    {stateObject.state.selectedTabIndex == 0 &&
      <View style={AppStyles.marginTop_2}>
        <StudentGenralDetailView stateObject={stateObject} />
      </View>
    }
    {stateObject.state.selectedTabIndex == 1 &&
      <View style={AppStyles.marginTop_2}>
        <StudentFamilyDetail stateObject={stateObject} />
      </View>
    }
    {stateObject.state.selectedTabIndex == 2 &&
      <View style={AppStyles.marginTop_2}>
        <Subheading style={[AppStyles.bold_600]}>Classes</Subheading>
        {/* <Divider style={AppStyles.marginTop_1} /> */}
        <StudentClassesDetailView stateObject={stateObject} />
      </View>
    }
    {stateObject.state.selectedTabIndex == 3 &&
      <View style={AppStyles.marginTop_2}>
        <Subheading style={[AppStyles.bold_600]}>{stateObject.state.createStepsHeading[4]}</Subheading>
        {/* <Divider style={AppStyles.marginTop_1} /> */}
        <StudentInstituteFieldDetail stateObject={stateObject} />
      </View>
    }
    {/* {stateObject.state.selectedTabIndex == 4 &&
      <View style={AppStyles.marginTop_2}>
        <StudentOtherDetailView stateObject={stateObject} />
      </View>
    } */}
    {stateObject.state.selectedTabIndex == 4 &&
     <View>
       <Subheading style={[AppStyles.bold_600]}>Audit Details</Subheading>
     {/* <Divider style={AppStyles.marginTop_1} /> */}
      <AuditDetail
        stateObject={stateObject}
      /></View>}
  </View>

}


module.exports = {
  functions: ViewTemplate
}