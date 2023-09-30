/*
 * * Â© Copyright 2017-2020 IBD Tecnologies Private Limited.
 * *                       3/506 Kannadhsan Street ,ShanmugaNagar,Porur
 * *                       Chennai - 600125.
 * *                       India
 * *
 * * This source is part of the General Framework and is copyrighted by
 * * IBD Technologies Private Limited.
 * *
 * * All rights reserved.  No part of this work may be reproduced, stored in a
 * * retrieval system, adopted or transmitted in any form or by any means,
 * * electronic, mechanical, photographic, graphic, optic recording or otherwise,
 * * translated in any language or computer language, without the prior written
 * * permission of IBD Technologies Private Limited.
 /**/
/**/
/**/


import React, { Component } from "react";
import { View, StyleSheet, Image, TouchableOpacity, LayoutAnimation, UIManager } from 'react-native';
import { TextInput, Caption, Text, Title, Divider, Subheading } from 'react-native-paper';
import SelectListUtils from '../../../../utils/SelectListUtils'
import AppStyles from "../../../../AppStyles/AppStyles";
import GeneralUtils from "../../../../utils/GeneralUtils"
import CustomButtons from '../../../../components/CustomButtons';
import SecondModal from '../../../../components/SecondModal';
import EditLessonDetail from '../EditLessonDetail';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Paggination from "../../../../utils/Paggination";
import Exception from '../../../../utils/Exception'
import ImpNotes from '../../../../components/ImpNotes';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { UiColor } from "../../../../theme";
import { w, h } from "../../../../utils/Dimensions";
import CustomSwitch from '../../../../components/CustomSwitch';







class TeacherLessonPlannerClassDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      selectedFamilyIndex: 0
    }
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    this.changeLayout = this.changeLayout.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onClickNew = this.onClickNew.bind(this)
    this.onEdit = this.onEdit.bind(this)
    this.onDelete = this.onDelete.bind(this)
  }


  changeLayout = (index) => {
    if (this.state.selectedFamilyIndex == index) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      this.setState({ selectedFamilyIndex: null });
    }
    else {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      this.setState({ selectedFamilyIndex: index });
    }
  }


  Mandatory = function () {
    const {
      stateObject,
    } = this.props
    const { planDetailEmptyrecord } = stateObject.state

    stateObject.state.errorField = []
    var mandatoryCheckError = false;

    if (planDetailEmptyrecord.lesson == '' || planDetailEmptyrecord.lesson == null) {
      mandatoryCheckError = true
      stateObject.state.errorField.push('field1')
      // return false;
    }

    if (mandatoryCheckError) {
      Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-080', errorMessage: '', errorParam: '' }])
      return false
    }
    else {
      return true
    }

    // return true
  }



  onSubmit() {
    Paggination.functions.editModalone = true
    const {
      stateObject,
    } = this.props
    const { planDetailEmptyrecord } = stateObject.state

    if (this.Mandatory())
      Paggination.functions.addAndeditLevel2(stateObject, 'classAndSubjectDetails', 'planDetails', planDetailEmptyrecord)
  }

  

  onClickNew(item, index) {
    Paggination.functions.editModalone = true
    const { stateObject } = this.props
    var emptyRecordOfPlanDetail = {
      lesson: "",
      heading: "",
      subHeading: "",
      status: "",
      percentageOfCompletion: "",
      remarks: "",
    }
    Paggination.functions.parentIndex = index
    var ChildIndex = stateObject.state.dataModel.classAndSubjectDetails[index].planDetails.length
    Paggination.functions.edit(stateObject, 'planDetailEmptyrecord', emptyRecordOfPlanDetail, ChildIndex)
  }

  onEdit(item, parentIndex, childIndex) {
    Paggination.functions.editModalone = true
    const { stateObject } = this.props
    Paggination.functions.parentIndex = parentIndex
    Paggination.functions.edit(stateObject, 'planDetailEmptyrecord', item, childIndex)
  }

  onDelete(parentIndex, ChildIndex) {
    const { stateObject } = this.props
    Paggination.functions.deleteLevel2(stateObject, 'classAndSubjectDetails', 'planDetails', parentIndex, ChildIndex)
  }






  render() {
    const { stateObject, currentIndex } = this.props
    const { dataModel, editable, familyEmptyrecord } = stateObject.state
    const { parentStateChange } = stateObject

    console.log(dataModel.classAndSubjectDetails, "dataModel.classAndSubjectDetails")
    return (
      <View>
        <View style={[AppStyles.marginTop_2]}>
          {dataModel.classAndSubjectDetails.map((item, index) => (
            <View key={index.toString()} style={[AppStyles.marginTop_3]}>
              <TouchableOpacity onPress={() => this.changeLayout(index)} style={[AppStyles.flexDirectionRow, AppStyles.alignItems,]}>
                <MaterialIcons name={this.state.selectedFamilyIndex != index ? "navigate-next" : "keyboard-arrow-down"} size={AppStyles.iconSize.height} color={UiColor.LIGHT_TEXT_COLOR} />



                <View style={[AppStyles.marginLeft_1, AppStyles.flex_one]}>
                  <Subheading style={[AppStyles.bold_400]}>{'Period'} {item.periodNo}</Subheading>
                  <View style={[AppStyles.flexDirectionRow]}>
                    <Text style={AppStyles.listHeading}>Class: </Text>
                    <Text style={AppStyles.listValue}>{item.classID}</Text>
                  </View>
                  <View style={[AppStyles.flexDirectionRow]}>
                    <Text style={AppStyles.listHeading}>Subject:</Text>
                    <Text style={AppStyles.listValue}>{SelectListUtils.functions.getSelectedValue(SelectListUtils.functions.selectMaster.SubjectMaster, item.subjectID)}</Text>
                  </View>
                  <View style={[AppStyles.flexDirectionRow]}>
                    <Text style={AppStyles.listHeading}>Time:</Text>
                    <Text style={AppStyles.listValue}>{item.startTime} - {item.endTime}</Text>
                  </View>
                </View>

                {((stateObject.state.currentOperation == 'Create' || stateObject.state.currentOperation == 'Modification') && !GeneralUtils.functions.showCompletion) && <CustomButtons
                  onPress={() => this.onClickNew(item, index)}
                  title="Add Lesson"
                  titleStyle={AppStyles.signInTextStyle}
                  buttonStyle={{ backgroundColor: UiColor.SKYBLUE }}

                />}


              </TouchableOpacity>
              <View style={[{ height: this.state.selectedFamilyIndex == index ? null : 0, overflow: 'hidden', }]}>

                <View style={styles.marginLeft_10}>
                  {item.planDetails.map((data, index1) => (
                    <View key={index1.toString()} style={[AppStyles.row_space_between]}>

                      <View style={[AppStyles.eventContainer, { borderLeftColor: GeneralUtils.functions._getRandomColor(index) }, (stateObject.state.currentOperation == 'Create' || stateObject.state.currentOperation == 'Modification') ? styles.listContainer : styles.listContainer1]}>
                        <View >


                          <View style={[styles.listStyle, AppStyles.marginTop_1]}>
                            <Text style={AppStyles.textColor}>Unit/Lesson: </Text>
                            <Text style={AppStyles.flex_one}>{data.lesson}</Text>
                          </View>


                          <View style={[styles.listStyle, AppStyles.marginTop_1]}>
                            <Text style={AppStyles.textColor}>Heading: </Text>
                            <Text style={AppStyles.flex_one}>{data.heading}</Text>
                          </View>

                          <View style={[styles.listStyle, AppStyles.marginTop_1]}>
                            <Text style={AppStyles.textColor}>Subheading: </Text>
                            <Text style={AppStyles.flex_one}>{data.subHeading}</Text>
                          </View>

                          <View style={[styles.listStyle, AppStyles.marginTop_1]}>
                            <Text style={AppStyles.textColor}>Remarks/{'\n'}Comments: </Text>
                            <Text style={AppStyles.flex_one}>{data.remarks}</Text>
                          </View>

                          <View style={[styles.listStyle, AppStyles.marginTop_1]}>
                            <Text style={AppStyles.textColor}>Status: </Text>
                            {stateObject.state.currentOperation != 'Create' && <View style={[AppStyles.flex_start,]}>
                            <Caption style={data.status == "N" ? AppStyles.errorStatusStyle : AppStyles.successStatusStyle}>{SelectListUtils.functions.getSelectedValue(SelectListUtils.functions.selectMaster.PlanStatusMaster, data.status)}</Caption>
                          </View>}
                          </View>


                         


                          {/* <Text>asd,</Text> */}


                          {(stateObject.state.currentOperation == "Modification" && GeneralUtils.functions.showCompletion) && <View style={AppStyles.marginTop_1}>
                          <Text style={AppStyles.textColor}>Mark topic as completed</Text>
                           <View style={AppStyles.marginTop_1}>
                           <CustomSwitch
                              label={'Completion status'}
                              onPress={() => {

                                if (data.status == 'N') {
                                  data.status = 'C'
                                }
                                else {
                                  data.status = 'N'
                                }
                                parentStateChange({ dataModel: dataModel })
                              }}
                              checked={data.status == 'C' ? true : false}

                            />
                           </View>
                          </View>}



                        </View>

                      </View>

                      {(!GeneralUtils.functions.showCompletion && (stateObject.state.currentOperation == 'Create' || stateObject.state.currentOperation == 'Modification')) && <View style={[AppStyles.flexDirectionRow, styles.editDeleteContainer]}>
                        <AntDesign onPress={() => this.onEdit(data, index, index1)}
                          name="edit" size={AppStyles.iconSize.height} color={AppStyles.inactiveMoreIcon.tintColor} />

                        {<View style={AppStyles.marginLeft_2}>
                          <AntDesign onPress={() => this.onDelete(index, index1)}
                            name="delete" size={AppStyles.iconSize.height} color={AppStyles.inactiveMoreIcon.tintColor} />
                        </View>}
                      </View>}
                    </View>
                  ))}
                </View>




                {item.planDetails.length == 0 && <ImpNotes
                  isArray={false}
                  message={(stateObject.state.currentOperation == 'Create' || stateObject.state.currentOperation == 'Modification') ? `Please add new lesson by clicking "Add lesson" button.` : `No lessons planned for this period`}
                />}

              </View>
              {/* <Divider style={AppStyles.marginVertical_2} /> */}
            </View>
          ))}
        </View>
        {Paggination.functions.editModalone && <SecondModal
          templates={<EditLessonDetail stateObject={stateObject} />}
          stateObject={stateObject}
          title={Paggination.functions.selectedIndex == null ? 'Add' : (GeneralUtils.functions.showCompletion ? 'Mark topic as completed' : 'Edit')}
          subTitle={'Lesson'}
          onSubmit={() => this.onSubmit()}
        />}
      </View>

    );
  }
}

const styles = StyleSheet.create({
  marginLeft_10: {
    marginLeft: w('10%')
  },
  listStyle: {
    flexDirection: 'row',
  },
  editDeleteContainer: {
    width: '25%', alignItems: 'center', justifyContent: 'center'
  },
  listContainer: { width: '75%' },
  listContainer1: { width: '100%' }
})
export default TeacherLessonPlannerClassDetail;
