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

/* * * Change Tag:SHA001
 Change Desc: add property for iPad and Tablet style in dropdown
 Changed By : Shashank
 Date:22-12-2020 
 */

import React, { Component } from "react";
import { View, StyleSheet, Platform } from 'react-native';
import { Card } from 'react-native-paper';
import AppStyles from "../../../../AppStyles/AppStyles";
import SearchUtils from "../../../../utils/SearchUtils";
import GeneralUtils from "../../../../utils/GeneralUtils";
import SuggestionList from '../../../../components/SuggestionList';
import SuggestionTextInput from '../../../../components/SuggestionTextInput';
import InputText from '../../../../components/InputText';
import { h, w } from "../../../../utils/Dimensions";
import CustomCheckBox from '../../../../components/CustomCheckBox';



import LabelText from '../../../../components/LabelText';



var searchName = ""



class OnlineVideoClassRoomAttendance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    }
  }






  render() {
    const {
      stateObject
    } = this.props
    const { dataModel, editable, primaryKeyEditable, errorField } = stateObject.state
    const { parentStateChange } = stateObject



    return (stateObject.state.currentOperation == 'Create' || stateObject.state.currentOperation == 'Modification') ? (<View style={[AppStyles.marginTop_2]}>
      {dataModel.type == "1" && <View>
        <SuggestionTextInput
          // tooltipReq={true}
          // tooltipMsg={'Mention the teacher incharge for this class.'}
          // tooltipStyle={styles.tooltipStyle}
          required={true}
          editable={editable}
          label={'Student Name'}
          placeholder={'Select student name'}
          secureTextEntry={false}
          value={dataModel.studentName}
          onFocus={() => {
            searchName = "ReadOnly"
            //  if(dataModel.studentName == null || dataModel.studentName == '' ){
            SearchUtils.functions.launchSuggestion(stateObject, '', 'studentName')
            //  }
          }
          }
          onClear={() => {
            dataModel.studentName = '';
            dataModel.studentID = '';
            parentStateChange({ dataModel: dataModel })
          }}

          errorMessage={GeneralUtils.functions.getErrorMessage('field8', dataModel.studentName, errorField, [], 'Student Name')}
        />
        <InputText
          required={false}
          editable={false}
          label={'Student ID'}
          value={dataModel.studentID}
        />
      </View>}


      {dataModel.type == "G" && <View>
        <SuggestionTextInput
          tooltipReq={false}
          // tooltipMsg={'Mention the class for which the exam is to be assessed.'}
          // tooltipStyle={styles.tooltipStyle}
          required={true}
          editable={editable}
          label={'Class'}
          placeholder={'Select class'}
          secureTextEntry={false}
          value={dataModel.class}
          onFocus={() => {
            searchName = "classDataModel"
            //  if(dataModel.class == null || dataModel.class == '' ){
            SearchUtils.functions.launchSuggestion(stateObject, '', 'class')
            //  }
          }
          }
          onClear={() => {
            dataModel.class = '';
            parentStateChange({ dataModel: dataModel })
          }}
          errorMessage={GeneralUtils.functions.getErrorMessage('field9', dataModel.class, errorField, [], 'Class')}
        />
      </View>}


      <View style={AppStyles.marginTop_2}>
        <CustomCheckBox
          label={'SMS Notification Required'}
          onPress={() => {
            dataModel.smsNotification = !dataModel.smsNotification;
            parentStateChange({ dataModel: dataModel })
          }}
          checked={dataModel.smsNotification ? true : false}
          disabled={editable}
        />
      </View>

      <View style={AppStyles.marginTop_2}>
        <CustomCheckBox
          label={'E-mail Notification Required'}
          onPress={() => {
            dataModel.emailNotification = !dataModel.emailNotification;
            parentStateChange({ dataModel: dataModel })
          }}
          checked={dataModel.emailNotification ? true : false}
          disabled={editable}
        />
      </View>



      <SuggestionList
        stateObject={stateObject}
        searchFieldName={stateObject.state.searchFieldName}
        searchText={stateObject.state.searchText}
        visible={stateObject.state.seachVisible}
        searchName={searchName}
        colHeading={searchName == "ReadOnly" ? ['Name', 'Id'] : ['Class', 'Desc', 'Year/Standard', 'Major/Section']}
        mapping={searchName == "ReadOnly" ? ['StudentName', 'StudentId'] : ['classCode', 'classDesc', 'standard', 'section']}
        SuggestionHeading={searchName == "ReadOnly" ? 'Student' : 'Class'}
      />

    </View>
    ):(<View>
      <Card.Content>
      {dataModel.type == "1" ? <View>
       <LabelText
          label={'Student Name'}
          value={dataModel.studentName}
        />
        <LabelText
          label={'Student ID'}
          value={dataModel.studentID}
        />
       </View> :  <LabelText
          label={'Class'}
          value={dataModel.class}
        />
}

        <View style={AppStyles.marginTop_2}>
        <CustomCheckBox
          label={'SMS Notification Required'}
          checked={dataModel.smsNotification ? true : false}
          disabled={editable}
        />
      </View>

      <View style={AppStyles.marginTop_2}>
        <CustomCheckBox
          label={'E-mail Notification Required'}
          checked={dataModel.emailNotification ? true : false}
          disabled={editable}
        />
      </View>
      </Card.Content>
    </View>);
  }
}


const styles = StyleSheet.create({

})
export default OnlineVideoClassRoomAttendance;

