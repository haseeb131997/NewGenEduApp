
import React, { Component } from "react";
import { View, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, ScrollView,Image } from 'react-native';
import { TextInput, Card, Text, Divider,Subheading,Title, Appbar, Caption, } from 'react-native-paper';
import { w, h } from "../../../../utils/Dimensions";
import { UiColor} from "../../../../theme";
import { httpUtils } from '../../../../utils/HttpUtils';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Paggination from "../../../../utils/Paggination";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Exception from '../../../../utils/Exception'
import ImpNotes from '../../../../components/ImpNotes';
import AppStyles from '../../../../AppStyles/AppStyles';
import CustomButtons from '../../../../components/CustomButtons';
import GeneralInstituteEditModal from '../../../../components/GeneralInstituteEditModal';
import EditFeeDetail from '../EditFeeDetail ';
import { functions } from "lodash";




// import {Calendar} from 'react-native-calendars';








class InstituteGeneralConfigSubject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      // currentIndex: 1,
    }
    this.onFeeTypeSubmit = this.onFeeTypeSubmit.bind(this)
    this.deleteFeeType = this.deleteFeeType.bind(this)
  }


  Mandatory = function () {
    const {
      stateObject,
    } = this.props
    const { FeeTypeMasterEmptyrecord } = stateObject.state

    stateObject.state.errorField = []
    var mandatoryCheckError = false;

    if (stateObject.state.dataModel.FeeTypeMaster.length == 0 || stateObject.state.dataModel.FeeTypeMaster == null) {
      Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-087', errorMessage: '', errorParam: ['fee type'] }])
      return false;
    }

      if (FeeTypeMasterEmptyrecord.feeType  == '' || FeeTypeMasterEmptyrecord.feeType  == null) {
        mandatoryCheckError = true
        stateObject.state.errorField.push('field4')
      }
      if (FeeTypeMasterEmptyrecord.feeDescription == '' || FeeTypeMasterEmptyrecord.feeDescription == null) {
        mandatoryCheckError = true
        stateObject.state.errorField.push('field5')
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



  onFeeTypeSubmit() {
    const {
      stateObject,
    } = this.props
    const { FeeTypeMasterEmptyrecord } = stateObject.state


   
    if (this.Mandatory()){
    if(Paggination.functions.selectedIndex == null){
      // stateObject.state.dataModel.FeeTypeMaster.push(FeeTypeMasterEmptyrecord)
      stateObject.callbackend('editFeeType',null)
  }
  else{
      // stateObject.state.dataModel.SubjectMaster[Paggination.functions.selectedIndex] = FeeTypeMasterEmptyrecord
      stateObject.callbackend('editFeeType',Paggination.functions.selectedIndex)
    }
    }
     
    // Paggination.functions.selectedIndex = null


    }



    deleteFeeType(selectedIndex) {
      const {
        stateObject,
      } = this.props
  
      // stateObject.state.dataModel.FeeTypeMaster.splice(selectedIndex, 1);
     
      stateObject.callbackend('deleteFeeType',selectedIndex)

      }


  render() {
    const {
      stateObject,
      currentIndex
    } = this.props

    const { dataModel, editable } = stateObject.state
    const { parentStateChange } = stateObject

    var FeeTypeMasterEmpty ={
      feeType: "",
      otherLangDescription: "",
      feeDescription: ""
    }


 
    return (
      // return (
      <View >
          <Card>
          <Card.Content>
            <View style={AppStyles.flex_start}>
            <CustomButtons
            onPress={() => Paggination.functions.onClickNew(stateObject, 'FeeTypeMasterEmptyrecord', FeeTypeMasterEmpty)}
            title={'Add Fee Types'}
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
          <Title>{stateObject.state.createStepsHeading[1]}</Title>
          {dataModel.FeeTypeMaster.length != 0 && <CustomButtons
            onPress={() => Paggination.functions.onClickNew(stateObject, 'FeeTypeMasterEmptyrecord', FeeTypeMasterEmpty)}
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
        </View>}

        {dataModel.FeeTypeMaster.length == 0 && <View style={AppStyles.marginTop_2}>
          <CustomButtons
            onPress={() => Paggination.functions.onClickNew(stateObject, 'FeeTypeMasterEmptyrecord', FeeTypeMasterEmpty)}
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

       


        {dataModel.FeeTypeMaster == 0 && <ImpNotes
          isArray={false}
          message={`By clicking 'Add Fee Types' for new fee type`}
        />}
    

        <View>
          {dataModel.FeeTypeMaster.map((item, index) => (
            <View key={index.toString()} style={AppStyles.marginTop_1}>
              <View style={[AppStyles.flexDirectionRow, AppStyles.alignItems]}>
                <View style={[AppStyles.flex_one]}>

              

                  <View>

                    <Caption style={[AppStyles.textColor, AppStyles.marginTop_1]}>Fee Type</Caption>
                    <Text>{item.feeType}</Text>

                  <View style={AppStyles.marginTop_1}>
                  <Caption style={[AppStyles.textColor, AppStyles.marginTop_1]}>Description</Caption>
                    <Text>{item.feeDescription}</Text>
                  </View>

                  <View style={AppStyles.marginTop_1}>
                  <Caption style={[AppStyles.textColor, AppStyles.marginTop_1]}>Description (in local language)</Caption>
                    <Text>{item.otherLangDescription}</Text>
                  </View>


                  </View>

                </View>
                {<View style={[AppStyles.flexDirectionRow]}>
                  {/* <TouchableOpacity onPress={() => Paggination.functions.edit(stateObject, 'FeeTypeMasterEmptyrecord', item, index)}>
                    <Image resizeMode='contain' style={AppStyles.inactiveMoreIcon}
                      source={require('./../../../../asssets/icons/art005.png')}
                    /></TouchableOpacity>
                  <TouchableOpacity style={AppStyles.marginLeft_2} onPress={() => Paggination.functions.delete(stateObject, 'FeeTypeMaster', index)}>
                    <Image resizeMode='contain' style={AppStyles.inactiveMoreIcon}
                      source={require('./../../../../asssets/icons/gen027.png')}
                    /></TouchableOpacity> */}

                       <AntDesign onPress={() => Paggination.functions.edit(stateObject, 'FeeTypeMasterEmptyrecord', item, index)}
                        name="edit" size={AppStyles.iconSize.height} color={AppStyles.inactiveMoreIcon.tintColor} />


                      <View style={AppStyles.marginLeft_2}>
                        <AntDesign onPress={() => this.deleteFeeType(index)}
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
          templates={<EditFeeDetail stateObject={stateObject} />}
          stateObject={stateObject}
          title={Paggination.functions.selectedIndex == null ? 'Add' : 'Edit'}
          subTitle={stateObject.state.createStepsHeading[1]}
          onSubmit={() => this.onFeeTypeSubmit()}
        />
  
      </View>
    );
  }
}

const styles = StyleSheet.create({

})
export default InstituteGeneralConfigSubject;

