
import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { h, w } from '../../utils/Dimensions';
import { UiColor } from '../../theme';
import AppStyles from "../../AppStyles/AppStyles";

import CustomButtons from '../../components/CustomButtons';


export default class NextPreviousBtn extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }


// getTitleName (selectedIndex){
//   const { stepHeading} = this.props;
//   var item
//     item = stepHeading[selectedIndex] 
//   return item
// }
getBtnName (){
  const { stepsHeading, currentStep,onNextEvent,onPreviousEvent} = this.props;
  var item
  if((stepsHeading.length) -1 != currentStep  ){
    item = "Continue"
  }
  else{
    item = "Save"
  }
  return item
}




  render() {
    const {  stateObject,currentStep,onNextEvent,onPreviousEvent,stepsHeading} = this.props;
    return (stepsHeading.length) != currentStep ?  (
      <View style={AppStyles.marginHorizontal_2}>
      <View style={[currentStep!= 1 ? AppStyles.row_space_between : AppStyles.flex_End, AppStyles.marginTop_3,]}>
        {stateObject.state.serviceName == 'ClassAssignmentAssessment' ? <View>
        {currentStep != 2 && <CustomButtons
          onPress={() => onPreviousEvent()}
          title={'Back'}
          titleStyle={AppStyles.btnTextStyle}
          containerStyle={AppStyles.signInContainer}
          buttonStyle={{ backgroundColor: UiColor.APP_BACKGROUND }}
        />}
        </View> : 
      <View>
          {currentStep != 1 && <CustomButtons
          onPress={() => onPreviousEvent()}
          title={'Back'}
          titleStyle={AppStyles.btnTextStyle}
          containerStyle={AppStyles.signInContainer}
          buttonStyle={{ backgroundColor: UiColor.APP_BACKGROUND }}
        />}
      </View>

        }
        

        {<CustomButtons
            onPress={() => onNextEvent()}
          title={this.getBtnName()}
          titleStyle={AppStyles.signInTextStyle}
          containerStyle={AppStyles.signInContainer}
          buttonStyle={{ backgroundColor: UiColor.SKYBLUE }}
        />}
      </View>
      </View>
    ) : null
  }
}


