
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
import { View, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { Avatar, Title, Caption } from 'react-native-paper';
import { w, h } from "../../../../utils/Dimensions";
import AppStyles from "../../../../AppStyles/AppStyles";
import SelectListUtils from '../../../../utils/SelectListUtils'
import NewScreenDropDownPicker from '../../../../components/NewScreenDropDownPicker';
import GeneralUtils from "../../../../utils/GeneralUtils";
import InputText from '../../../../components/InputText';
import SelectBox from '../../../../components/SelectBox';
import CustomCheckBox from '../../../../components/CustomCheckBox';
import SuggestionList from '../../../../components/SuggestionList';
import SuggestionTextInput from '../../../../components/SuggestionTextInput';
import SearchUtils from "../../../../utils/SearchUtils";







class EditParticipationDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    }

    this.postSuggestionListresultClick = this.postSuggestionListresultClick.bind(this)

  }

  postSuggestionListresultClick(data) {
    const { stateObject } = this.props
    const { dataModel, enrollDetailsEmptyrecord } = stateObject.state
    const { parentStateChange } = stateObject
    switch ('studentPostSuggestion') {
      case 'studentPostSuggestion':
        enrollDetailsEmptyrecord.studentName = data.StudentName;
        enrollDetailsEmptyrecord.studentID = data.StudentId;
        break
    }
    parentStateChange({ enrollDetailsEmptyrecord: enrollDetailsEmptyrecord })
  }










  render() {
    const {
      stateObject
    } = this.props
    const { enrollDetailsEmptyrecord, editable, primaryKeyEditable, summaryDataModel, errorField } = stateObject.state
    const { parentStateChange } = stateObject

    return (
      <View style={{}}>

        {stateObject.state.type == 'Enroll' &&
          <View>
            <Title style={[AppStyles.payTextStyle,]}>{enrollDetailsEmptyrecord.studentName}</Title>
            <Caption>{enrollDetailsEmptyrecord.studentID}</Caption>

            <View style={AppStyles.marginTop_2}>
              <CustomCheckBox
                label={'Enrollment'}
                onPress={() => {
                  enrollDetailsEmptyrecord.enroll = !enrollDetailsEmptyrecord.enroll;
                  parentStateChange({ enrollDetailsEmptyrecord: enrollDetailsEmptyrecord })
                }}
                checked={enrollDetailsEmptyrecord.enroll ? true : false}
                disabled={false}

              />
            </View>

          </View>
        }

        {stateObject.state.type == 'Shortlist' &&
          <View>
            <Title style={[AppStyles.payTextStyle,]}>{enrollDetailsEmptyrecord.studentName}</Title>
            <Caption>{enrollDetailsEmptyrecord.studentID}</Caption>

            <View style={AppStyles.marginTop_2}>
              <CustomCheckBox
                label={'Enrollment'}
                onPress={() => {
                  enrollDetailsEmptyrecord.enroll = !enrollDetailsEmptyrecord.enroll;
                  parentStateChange({ enrollDetailsEmptyrecord: enrollDetailsEmptyrecord })
                }}
                checked={enrollDetailsEmptyrecord.enroll ? true : false}
                disabled={false}

              />
            </View>


            <View style={AppStyles.marginTop_2}>
              <CustomCheckBox
                label={'Participation'}
                onPress={() => {
                  enrollDetailsEmptyrecord.participate = !enrollDetailsEmptyrecord.participate;
                  parentStateChange({ enrollDetailsEmptyrecord: enrollDetailsEmptyrecord })
                }}
                checked={enrollDetailsEmptyrecord.participate ? true : false}
                disabled={false}

              />
            </View>

          </View>
        }


        {stateObject.state.type == 'Result' &&
          <View>
            <Title style={[AppStyles.payTextStyle,]}>{enrollDetailsEmptyrecord.studentName}</Title>
            <Caption>{enrollDetailsEmptyrecord.studentID}</Caption>

            <View style={AppStyles.marginTop_2}>
              <CustomCheckBox
                label={'Enrollment'}
                onPress={() => {
                  enrollDetailsEmptyrecord.enroll = !enrollDetailsEmptyrecord.enroll;
                  parentStateChange({ enrollDetailsEmptyrecord: enrollDetailsEmptyrecord })
                }}
                checked={enrollDetailsEmptyrecord.enroll ? true : false}
                disabled={true}

              />
            </View>


            <View style={AppStyles.marginTop_2}>
              <CustomCheckBox
                label={'Participation'}
                onPress={() => {
                  enrollDetailsEmptyrecord.participate = !enrollDetailsEmptyrecord.participate;
                  parentStateChange({ enrollDetailsEmptyrecord: enrollDetailsEmptyrecord })
                }}
                checked={enrollDetailsEmptyrecord.participate ? true : false}
                disabled={true}

              />
            </View>

            <View style={[AppStyles.marginTop_2]}>
              <NewScreenDropDownPicker
                editable={editable}
                required={false}
                label={'Result'}
                stateObject={stateObject}
                items={SelectListUtils.functions.selectMaster.ResultMaster}
                value={SelectListUtils.functions.getSelectedValue(SelectListUtils.functions.selectMaster.ResultMaster, enrollDetailsEmptyrecord.result)}
                placeholder="Select result"
                onChangeValue={(value) => {
                  enrollDetailsEmptyrecord.result = value;
                  parentStateChange({ enrollDetailsEmptyrecord: enrollDetailsEmptyrecord })

                }}
                dropdownName={'resultDropdown'}
                subHeadingRecordName="a result"
                onClear={() => {
                  enrollDetailsEmptyrecord.result = '';
                  parentStateChange({ enrollDetailsEmptyrecord: enrollDetailsEmptyrecord })
                }}

              />
            </View>


            <View style={AppStyles.marginTop_1}>
              <InputText
                // tooltipReq={true}
                // tooltipMsg={'By default, system will provide an auto-generated Student ID that can be used. If the institute wants to assign their own student ID, then that ID can be entered replacing the auto-generated ID'}
                // tooltipStyle={styles.tooltipStyle}
                required={false}
                label={'Teacher Comments on Results'}
                secureTextEntry={false}
                onChangeText={text => {
                  enrollDetailsEmptyrecord.comments = text
                  parentStateChange({ enrollDetailsEmptyrecord: enrollDetailsEmptyrecord })
                }}
                value={enrollDetailsEmptyrecord.comments}

              />
            </View>



          </View>
        }


        {stateObject.state.type == 'Edit' && <View>
          <View style={[AppStyles.zIndex_2000, AppStyles.marginTop_1]}>
            <SuggestionTextInput
              // tooltipReq={true}
              // tooltipMsg={'Mention the teacher incharge for this class.'}
              // tooltipStyle={styles.tooltipStyle}
              required={true}
              editable={editable}
              label={'Student Name'}
              placeholder={'Select student name'}
              secureTextEntry={false}
              value={enrollDetailsEmptyrecord.studentName}
              onFocus={() => {
                //  if(enrollDetailsEmptyrecord.studentName == null || enrollDetailsEmptyrecord.studentName == '' ){
                SearchUtils.functions.launchSuggestion(stateObject, '', 'studentName')
                //  }
              }
              }
              onClear={() => {
                enrollDetailsEmptyrecord.studentName = '';
                enrollDetailsEmptyrecord.studentID = '';
                parentStateChange({ enrollDetailsEmptyrecord: enrollDetailsEmptyrecord })
              }}

              errorMessage={GeneralUtils.functions.getErrorMessage('field1', enrollDetailsEmptyrecord.studentName, errorField, [], 'Student Name')}
            />
          </View>
          <View style={[AppStyles.marginTop_1]}>
            <InputText
              required={true}
              editable={false}
              label={'Student ID'}
              value={enrollDetailsEmptyrecord.studentID}
            />
          </View>




          {/* {<View>
            <View style={[AppStyles.marginTop_2]}>
              <NewScreenDropDownPicker
                editable={editable}
                required={false}
                label={'Result'}
                stateObject={stateObject}
                items={SelectListUtils.functions.selectMaster.ResultMaster}
                value={SelectListUtils.functions.getSelectedValue(SelectListUtils.functions.selectMaster.ResultMaster, enrollDetailsEmptyrecord.result)}
                placeholder="Select result"
                onChangeValue={(value) => {
                  enrollDetailsEmptyrecord.result = value;
                  parentStateChange({ enrollDetailsEmptyrecord: enrollDetailsEmptyrecord })

                }}
                dropdownName={'resultDropdown'}
                subHeadingRecordName="a result"
                onClear={() => {
                  enrollDetailsEmptyrecord.result = '';
                  parentStateChange({ enrollDetailsEmptyrecord: enrollDetailsEmptyrecord })
                }}

              />
            </View>


            <View style={AppStyles.marginTop_1}>
              <InputText
                required={false}
                label={'Teacher Comments on Results'}
                secureTextEntry={false}
                onChangeText={text => {
                  enrollDetailsEmptyrecord.comments = text
                  parentStateChange({ enrollDetailsEmptyrecord: enrollDetailsEmptyrecord })
                }}
                value={enrollDetailsEmptyrecord.comments}

              />
            </View>
          </View>} */}

          <View style={AppStyles.marginTop_2}>
            <CustomCheckBox
              label={'Enrollment'}
              onPress={() => {
                enrollDetailsEmptyrecord.enroll = !enrollDetailsEmptyrecord.enroll;
                parentStateChange({ enrollDetailsEmptyrecord: enrollDetailsEmptyrecord })
              }}
              checked={enrollDetailsEmptyrecord.enroll ? true : false}
              disabled={false}

            />
          </View>
          <View style={AppStyles.marginTop_2}>
            <CustomCheckBox
              label={'Participation'}
              onPress={() => {
                enrollDetailsEmptyrecord.participate = !enrollDetailsEmptyrecord.participate;
                parentStateChange({ enrollDetailsEmptyrecord: enrollDetailsEmptyrecord })
              }}
              checked={enrollDetailsEmptyrecord.participate ? true : false}
              disabled={false}

            />
          </View>

        </View>}

        <SuggestionList
          stateObject={stateObject}
          searchFieldName={stateObject.state.searchFieldName}
          searchText={stateObject.state.searchText}
          visible={stateObject.state.seachVisible}
          searchName={'studentPostSuggestion'}
          colHeading={['Name', 'Id']}
          mapping={['StudentName', 'StudentId']}
          postSuggestionListresultClick={this.postSuggestionListresultClick}
          SuggestionHeading={'Student'}
        />


      </View>
    );
  }
}


const styles = StyleSheet.create({
  tooltipStyle: {
    height: h('15%'), width: w('60%')
  }
})
export default EditParticipationDetails;

