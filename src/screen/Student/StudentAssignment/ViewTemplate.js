
import React from "react";
import { View } from 'react-native';
import TabScreen from '../../../components/TabScreen';
import { UiColor } from "../../../theme";
import AppStyles from "../../../AppStyles/AppStyles";
import ClassAssignmentView from './ClassAssignmentView';
import ClassAssignmentQuestion from './ClassAssignmentQuestion';
import ClassAssignmentWorkSheet from './ClassAssignmentWorkSheet';
import ClassAssignmentAssessment from './ClassAssignmentAssessment';







class ViewTemplate { }

ViewTemplate.QueryConfig = function (stateObject) {
  return <View>
      {stateObject.state.showAnswer ? <View>   

{stateObject.state.dataModel.type == 'Q' ?  <ClassAssignmentQuestion
  stateObject={stateObject}
/> : <ClassAssignmentWorkSheet
stateObject={stateObject}
/>}
</View> : <View>
    <TabScreen
      tabHeading={['Basic Info','Assignment','Assessment']}
      stateObject={stateObject}
      stateValue={'selectedTabIndex'}
      selectedStateValue={stateObject.state.selectedTabIndex}
      barColor={UiColor.WHITE}
    />
     {/* <CustomTabScreen
      tabHeading={['Basic Info', 'Assignment']}
      otherTabHeading={['Notification','Audit']}
      stateObject={stateObject}
      stateValue={'selectedTabIndex'}
      selectedStateValue={stateObject.state.selectedTabIndex}
      barColor={UiColor.WHITE}
    /> */}
    {/* <Divider/> */}

    {stateObject.state.selectedTabIndex == 0 &&
     <View style={AppStyles.marginTop_2}>
        <ClassAssignmentView stateObject={stateObject} />
     </View>
    }
    {stateObject.state.selectedTabIndex == 1 &&
    <View>   

        {stateObject.state.dataModel.type == 'Q' ?  <ClassAssignmentQuestion
          stateObject={stateObject}
        /> : <ClassAssignmentWorkSheet
        stateObject={stateObject}
      />}
    </View>
     
     }
  
    {stateObject.state.selectedTabIndex == 2 &&
         <ClassAssignmentAssessment
       stateObject={stateObject}
     />
     }
    </View>}
    
    

  </View>
}


module.exports = {
  functions: ViewTemplate
}