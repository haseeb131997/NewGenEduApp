
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
import EditSubjectDetail from '../EditSubjectDetail';
import AntDesign from 'react-native-vector-icons/AntDesign';




// import {Calendar} from 'react-native-calendars';








class InstituteGeneralConfigSubject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      // currentIndex: 1,
    }
    this.onsubjectSubmit = this.onsubjectSubmit.bind(this)
    this.deleteSubject = this.deleteSubject.bind(this)
  }



  Mandatory = function () {
    const {
      stateObject,
    } = this.props
    const { SubjectMasterEmptyrecord } = stateObject.state

    stateObject.state.errorField = []
    var mandatoryCheckError = false;

    if (stateObject.state.dataModel.SubjectMaster.length == 0 || stateObject.state.dataModel.SubjectMaster == null) {
      Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-087', errorMessage: '', errorParam: ['subject'] }])
      return false;
    }

    if (SubjectMasterEmptyrecord.subjectID == '' || SubjectMasterEmptyrecord.subjectID == null) {

      mandatoryCheckError = true
      stateObject.state.errorField.push('field1')
    }
    if (SubjectMasterEmptyrecord.subjectName == '' || SubjectMasterEmptyrecord.subjectName == null) {
      mandatoryCheckError = true
      stateObject.state.errorField.push('field2')
    }

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
    const { SubjectMasterEmptyrecord } = stateObject.state


    if (this.Mandatory()) {
      if (Paggination.functions.selectedIndex == null) {
        // stateObject.state.dataModel.SubjectMaster.push(SubjectMasterEmptyrecord)
        stateObject.callbackend('editSubject', null)
      }
      else {
        // stateObject.state.dataModel.SubjectMaster[Paggination.functions.selectedIndex] = SubjectMasterEmptyrecord
        stateObject.callbackend('editSubject', Paggination.functions.selectedIndex)
      }
    }
    // Paggination.functions.selectedIndex = null

  }


  deleteSubject(selectedIndex) {
    const {
      stateObject,
    } = this.props

    // stateObject.state.dataModel.SubjectMaster.splice(selectedIndex, 1);
    // stateObject.parentStateChange({
    //   dataModel:stateObject.state.dataModel,
    // })
    stateObject.callbackend('deleteSubject', selectedIndex)

  }



  render() {
    const {
      stateObject,
      currentIndex
    } = this.props

    const { dataModel, editable } = stateObject.state
    const { parentStateChange } = stateObject

    var SubjectMasterEmpty = {
      subjectID: "",
      otherLangDescription: "",
      subjectName: ""
    }

  
    return (
      // return (
      <View >
        <Card>
          <Card.Content>

            <View style={AppStyles.flex_start}>
              <CustomButtons
                onPress={() => Paggination.functions.onClickNew(stateObject, 'SubjectMasterEmptyrecord', SubjectMasterEmpty)}
                title={'Add subject'}
                containerStyle={AppStyles.signInContainer}
                titleStyle={AppStyles.btnTextStyle}
                buttonStyle={{ backgroundColor: UiColor.LIGHT_SKYBLUE }}
                icon={
                  <Ionicons
                    name="add"
                    size={AppStyles.addIconSize.height}
                    color={UiColor.SKYBLUE}
                    style={AppStyles.addIconStyle}
                  />
                }
              />
            </View>
            {/* {<View style={[AppStyles.row_space_between]}>
              <Title>{stateObject.state.createStepsHeading[0]}</Title>
              {dataModel.SubjectMaster.length != 0 && <CustomButtons
                onPress={() => Paggination.functions.onClickNew(stateObject, 'SubjectMasterEmptyrecord', SubjectMasterEmpty)}
                title={'Add'}
                containerStyle={AppStyles.signInContainer}
                titleStyle={AppStyles.btnTextStyle}
                buttonStyle={{ backgroundColor: UiColor.LIGHT_SKYBLUE }}
                icon={
                  <Ionicons
                    name="add"
                    size={AppStyles.addIconSize.height}
                    color={UiColor.SKYBLUE}
                    style={AppStyles.addIconStyle}
                  />
                }
              />}
            </View>} */}
            {/* 
            {dataModel.SubjectMaster.length == 0 && <View style={AppStyles.marginTop_2}>
              <CustomButtons
                onPress={() => Paggination.functions.onClickNew(stateObject, 'SubjectMasterEmptyrecord', SubjectMasterEmpty)}
                title={`Add new ${stateObject.state.createStepsHeading[1]}`}
                containerStyle={AppStyles.signInContainer}
                titleStyle={AppStyles.btnTextStyle}
                buttonStyle={{ backgroundColor: UiColor.LIGHT_SKYBLUE }}
                icon={
                  <Ionicons
                    name="add"
                    size={AppStyles.addIconSize.height}
                    color={UiColor.SKYBLUE}
                    style={AppStyles.addIconStyle}
                  />
                }
              />
            </View>} */}




            {dataModel.SubjectMaster == 0 && <ImpNotes
              isArray={false}
              message={`By clicking 'Add subject' for new subject`}
            />}
            {/* subjectID: "",
        otherLangDescription: "",
        subjectName: "" */}

            <View>
              {dataModel.SubjectMaster.map((item, index) => (
                <View key={index.toString()} style={AppStyles.marginTop_1}>
                  <View style={[AppStyles.flexDirectionRow, AppStyles.alignItems]}>
                    <View style={[AppStyles.flex_one]}>
                      <View>
                        {/* <Caption style={[AppStyles.textColor, AppStyles.marginTop_1]}>ID</Caption> */}
                        <Caption style={[AppStyles.textColor, AppStyles.marginTop_1]}>Subject ID</Caption>
                        <Text>{item.subjectID}</Text>

                        <View style={AppStyles.marginTop_1}>
                          {/* <Caption style={[AppStyles.textColor, AppStyles.marginTop_1]}>Name (in english)</Caption> */}
                          <Caption style={[AppStyles.textColor, AppStyles.marginTop_1]}>Subject Name</Caption>
                          <Text>{item.subjectName}</Text>
                        </View>

                        <View style={AppStyles.marginTop_1}>
                          <Caption style={[AppStyles.textColor, AppStyles.marginTop_1]}>Subject Name (in local language)</Caption>
                          <Text>{item.otherLangDescription}</Text>
                        </View>
                      </View>

                    </View>
                    {<View style={[AppStyles.flexDirectionRow]}>
                      <AntDesign onPress={() => Paggination.functions.edit(stateObject, 'SubjectMasterEmptyrecord', item, index)}
                        name="edit" size={AppStyles.iconSize.height} color={AppStyles.inactiveMoreIcon.tintColor} />
                      <View style={AppStyles.marginLeft_2}>
                        <AntDesign onPress={() => this.deleteSubject(index)}
                          name="delete" size={AppStyles.iconSize.height} color={AppStyles.inactiveMoreIcon.tintColor} />
                      </View>

                    </View>}
                  </View>

                  <Divider style={[AppStyles.marginVertical_2]} />
                </View>
              ))}
            </View>

          </Card.Content>
        </Card>

        <GeneralInstituteEditModal
          templates={<EditSubjectDetail stateObject={stateObject} />}
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

})
export default InstituteGeneralConfigSubject;

