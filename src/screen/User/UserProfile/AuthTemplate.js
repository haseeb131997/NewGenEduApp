
import React from "react";
import { View } from 'react-native';
import UserProfileView from './UserProfileView';
import UserProfileClass from './UserProfileClass';
import UserProfileParent from './UserProfileParent';
import UserProfileStaff from './UserProfileStaff';
import UserProfileInstitute from './UserProfileInstitute';
import AppStyles from "../../../AppStyles/AppStyles";
import { Divider, Subheading, Title } from 'react-native-paper';
import Remarks from './../../../components/Remarks';










class AuthTemplate {}


AuthTemplate.AuthorisationConfig = function (stateObject) {
  return (<View>
       <View>
       <Subheading style={AppStyles.bold_600}>{stateObject.state.createStepsHeading[0]}</Subheading>
      {/* <Divider style={AppStyles.marginTop_1} /> */}
        <UserProfileView
          stateObject={stateObject}
        />
    </View>

    {(stateObject.state.dataModel.userType == 'A' || stateObject.state.dataModel.userType == 'T') && <View>
      <Divider style={AppStyles.marginTop_3} />
      <View style={AppStyles.marginTop_2}>
        <Subheading style={AppStyles.bold_600}>{stateObject.state.createStepsHeading[1]}</Subheading>
        <UserProfileClass
          stateObject={stateObject}
        />
      </View>
    </View>}

    {(stateObject.state.dataModel.userType == 'P') && <View>
      <Divider style={AppStyles.marginTop_3} />
      <View style={AppStyles.marginTop_2}>
        <Subheading style={AppStyles.bold_600}>{stateObject.state.createStepsHeading[2]}</Subheading>
        <UserProfileParent
          stateObject={stateObject}
        />
      </View>
    </View>}

    {(stateObject.state.dataModel.userType == 'A' || stateObject.state.dataModel.userType == 'T' || stateObject.state.dataModel.userType == 'O') && <View>
      <Divider style={AppStyles.marginTop_3} />
      <View style={AppStyles.marginTop_2}>
        <Subheading style={AppStyles.bold_600}>{stateObject.state.createStepsHeading[3]}</Subheading>
        <UserProfileStaff
          stateObject={stateObject}
        />
      </View>
    </View>}

    {(stateObject.state.dataModel.userType == 'A' || stateObject.state.dataModel.userType == 'T' || stateObject.state.dataModel.userType == '0') && <View>
      <Divider style={AppStyles.marginTop_3} />
      <View style={AppStyles.marginTop_2}>
        <Subheading style={AppStyles.bold_600}>{stateObject.state.createStepsHeading[4]}</Subheading>
        <UserProfileInstitute
          stateObject={stateObject}
        />
      </View>
    </View>}

    


    <View style={AppStyles.marginTop_4}>
      <Remarks
        stateObject={stateObject}
      />
    </View>
  </View>)

}




module.exports = {
    functions:AuthTemplate
}