
import React, { Component } from "react";
import { View, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, ScrollView, Image } from 'react-native';
import { TextInput, Card, Text, Divider, Subheading, Title, Appbar, Caption, } from 'react-native-paper';
import { w, h } from "../../../../utils/Dimensions";
import { UiColor } from "../../../../theme";
import Paggination from "../../../../utils/Paggination";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Exception from '../../../../utils/Exception'
import ImpNotes from '../../../../components/ImpNotes';
import AppStyles from '../../../../AppStyles/AppStyles';
import CustomButtons from '../../../../components/CustomButtons';
import GeneralInstituteEditModal from '../../../../components/GeneralInstituteEditModal';
import EditAutoApprovalDetail from '../EditAutoApprovalDetail';
import AntDesign from 'react-native-vector-icons/AntDesign';

import Batch from "../../../../components/Batch";


// import {Calendar} from 'react-native-calendars';








class InstituteGeneralAutoApproval extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      // currentIndex: 1,
    }
    this.onsubjectSubmit = this.onsubjectSubmit.bind(this)
    // this.deleteSubject = this.deleteSubject.bind(this)
  }



  Mandatory = function () {
    const {
      stateObject,
    } = this.props
    const { ServicesEmptyrecord } = stateObject.state

    stateObject.state.errorField = []
    var mandatoryCheckError = false;


    // if (ServicesEmptyrecord.subjectID == '' || ServicesEmptyrecord.subjectID == null) {
    //   mandatoryCheckError = true
    //   stateObject.state.errorField.push('field1')
    // }
   

    if (mandatoryCheckError) {
      Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-080', errorMessage: '', errorParam: '' }])
      return false
    }




    else {
      return true
    }

    return true
  }



  onsubjectSubmit() {
    const {
      stateObject,
    } = this.props
    const { ServicesEmptyrecord } = stateObject.state


    if (this.Mandatory()) {
      if (Paggination.functions.selectedIndex == null) {
        stateObject.callbackend('editServices', null)
      }
      else {
        stateObject.callbackend('editServices', Paggination.functions.selectedIndex)
      }
    }


  }


  // deleteSubject(selectedIndex) {
  //   const {
  //     stateObject,
  //   } = this.props
  //   stateObject.callbackend('deleteServices', selectedIndex)
  // }



  render() {
    const {
      stateObject,
      currentIndex
    } = this.props

    const { dataModel, editable } = stateObject.state
    const { parentStateChange } = stateObject



    return (
      // return (
      <View >
        <Card>
          <Card.Content>
            <View>
              {dataModel.services.map((item, index) => (
                <View key={index.toString()} style={AppStyles.marginTop_1}>
                  <View style={[AppStyles.flexDirectionRow, AppStyles.alignItems]}>
                    <View style={[AppStyles.flex_one]}>
                      <View>
                        <Caption style={[AppStyles.textColor, AppStyles.marginTop_1]}>Menu Path</Caption>
                        <Text>{item.serviceDescription}</Text>
                        <View style={AppStyles.marginTop_1}>
                          <Caption style={[AppStyles.textColor, AppStyles.marginTop_1]}>Status</Caption>
                          {/* <Text>{item.status}</Text> */}

                         <View style={styles.batchStyle}>
                         <Batch
                            value={item.status ? 'Enabled' : 'Disabled'}
                            status={item.status ? 'S' : 'E'}
                          />
                         </View>

                        </View>
                      </View>
                    </View>
                    {<View style={[AppStyles.flexDirectionRow]}>
                      <AntDesign onPress={() => Paggination.functions.edit(stateObject, 'ServicesEmptyrecord', item, index)}
                        name="edit" size={AppStyles.iconSize.height} color={AppStyles.inactiveMoreIcon.tintColor} />
                    </View>}
                  </View>
                  <Divider style={[AppStyles.marginVertical_2]} />
                </View>
              ))}
            </View>

          </Card.Content>
        </Card>

        <GeneralInstituteEditModal
          templates={<EditAutoApprovalDetail stateObject={stateObject} />}
          stateObject={stateObject}
          title={Paggination.functions.selectedIndex == null ? 'Add' : 'Edit'}
          subTitle={stateObject.state.createStepsHeading[0]}
          onSubmit={() => this.onsubjectSubmit()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
batchStyle:{
  marginLeft:h('-1%')
}
})
export default InstituteGeneralAutoApproval;

