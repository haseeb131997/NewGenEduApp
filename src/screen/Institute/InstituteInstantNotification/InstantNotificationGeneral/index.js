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
import { View, StyleSheet,  } from 'react-native';
import { w, h } from "../../../../utils/Dimensions";
//import { Text } from 'react-native-paper';
import AppStyles from "../../../../AppStyles/AppStyles";
import SearchUtils from "../../../../utils/SearchUtils";
import SelectListUtils from "../../../../utils/SelectListUtils";
import GeneralUtils from "../../../../utils/GeneralUtils";
import NewScreenDropDownPicker from '../../../../components/NewScreenDropDownPicker';
import SuggestionList from '../../../../components/SuggestionList';
import SuggestionTextInput from '../../../../components/SuggestionTextInput';
import InputText from '../../../../components/InputText';
import CustomDatePicker from "../../../../components/CustomDatePicker"
//import InputTextArea from '../../../../components/InputTextArea';
import CustomRadioButton from '../../../../components/CustomRadioButton';
import CustomLabel from '../../../../components/CustomLabel';









var searchName = 'assigneeDataModel'

class InstantNotificationGeneral extends Component {
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





    return (<View style={[AppStyles.marginTop_2]}>
      <InputText
        tooltipReq={true}
        tooltipMsg={'By default, system will provide an auto-generated Reference'}
        tooltipStyle={styles.tooltipStyle}
        required={true}
        editable={!primaryKeyEditable}
        label={'Notification ID'}
        secureTextEntry={false}
        onChangeText={text => {
          dataModel.notificationID = text
          parentStateChange({ dataModel: dataModel })
        }}
        value={dataModel.notificationID}
        errorMessage={GeneralUtils.functions.getErrorMessage('field1', dataModel.notificationID, errorField, [], 'Notification ID')}
      />

<CustomLabel
      tooltipReq={true}
      tooltipMsg={'Please select to whom you want to send notification'}
        label={'To whom notification to be sent '}
        required={true}
        //  tooltipReq={}
        //  tooltipMsg={}
         tooltipStyle={styles.tooltipStyle}
        template={
          <View style={[AppStyles.flexDirectionRow]}>
            <CustomRadioButton
              label={'Student'}
              onPress={() => {
                dataModel.receiverType = 'S'
                parentStateChange({ dataModel: dataModel })
              }}
              checked={dataModel.receiverType == 'S' ? true : false}
              disabled={false}

            />

            <CustomRadioButton
              label={'Group'}
              onPress={() => {
                dataModel.receiverType = 'G'
                parentStateChange({ dataModel: dataModel })
              }}
              checked={dataModel.receiverType == 'G' ? true : false}
              disabled={false}

            />

          </View>
        }
        errorMessage={GeneralUtils.functions.getErrorMessage('field11', dataModel.type, errorField, [], 'To whom notification to be sent')}
      />
{dataModel.receiverType=='G' &&
<View>
      <SuggestionTextInput
        tooltipReq={true}
        tooltipMsg={'Mention the class/group for whom the instant message to be sent.'}
        tooltipStyle={styles.tooltipStyle}
        required={true}
        editable={editable}
        label={'Assignee group'}
        placeholder={'Select assignee group'}
        secureTextEntry={false}
        value={dataModel.assignee}
        onFocus={() => {
          searchName = 'assigneeDataModel'
          SearchUtils.functions.launchSuggestion(stateObject, '', 'groupId')

        }
        }
        onClear={() => {
          dataModel.assignee = '';
          dataModel.groupDesc = '';
          parentStateChange({ dataModel: dataModel })
        }}

        errorMessage={GeneralUtils.functions.getErrorMessage('field2', dataModel.assignee, errorField, [], 'Assignee group')}

      />
      
      <InputText
        required={false}
        editable={false}
        label={'Assignee Group Description'}
        value={dataModel.groupDesc}
        multiline={true}
      />
     </View> 
      
      }

{dataModel.receiverType == "S" && <View>
        <SuggestionTextInput
          tooltipReq={true}
          tooltipMsg={'Mention the student for whom the instant message to be sent.'}//N0U-109
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

          errorMessage={GeneralUtils.functions.getErrorMessage('field12', dataModel.studentName, errorField, [], 'Student Name')}
        />
        <InputText
          required={false}
          editable={false}
          label={'Student ID'}
          value={dataModel.studentID}
        />
      </View>}

      
    <View  style={[AppStyles.marginTop_2]}> 
<CustomDatePicker
        tooltipReq={true}
        tooltipMsg={'Specify the date on which message needs to be delivered'}
        tooltipStyle={styles.tooltipStyle}
        required={true}
        editable={editable}
        label={'Delivery Date'}
        placeholder={'Pick delivery date'}
        secureTextEntry={false}
        // onChangeText={text => console.log(text,'p')}
        value={dataModel.instant}
        format="DD-MM-YYYY"
        mode="date"
        onDateChange={value => {
          dataModel.instant = value;
          parentStateChange({ dataModel: dataModel })
        }}
        errorMessage={GeneralUtils.functions.getErrorMessage('field3', dataModel.instant, errorField, [], 'Delivery Date')}
      />
    </View>  

      {/*<SuggestionTextInput
        tooltipReq={false}
        // tooltipMsg={'Mention the class/group for whom the video lesson is to be uploaded.'}
        // tooltipStyle={styles.tooltipStyle}
        required={true}
        editable={editable}
        label={'Template ID'}
        placeholder={'Select template ID'}
        secureTextEntry={false}
        value={dataModel.templateID}
        onFocus={() => {
          searchName = 'templateDataModel'
          SearchUtils.functions.launchSuggestion(stateObject, '', 'templateID')

        }
        }
        onClear={() => {
          dataModel.templateID = '';
          dataModel.templateDescription = '';
          parentStateChange({ dataModel: dataModel })
        }}

        errorMessage={GeneralUtils.functions.getErrorMessage('field3', dataModel.templateID, errorField, [], 'Template ID')}

      />
      <InputText
        required={false}
        editable={false}
        label={'Template Description'}
        value={dataModel.templateDescription}
        multiline={true}
      />*





      


       <InputTextArea
          required={true}
          tooltipReq={false}
          tooltipMsg={'It contains body section of email or sms message'}
          editable={!editable}
          label={'Message Content'}
          secureTextEntry={false}
          value={dataModel.bodyTemplate}
          onChangeText={text => {
            dataModel.bodyTemplate = text;
            parentStateChange({ dataModel: dataModel })
          }}

          errorMessage={GeneralUtils.functions.getErrorMessage('field5', dataModel.bodyTemplate, errorField, [], 'Message Content')}

        />*/}

<NewScreenDropDownPicker
          tooltipReq={true}
          tooltipMsg={'Select the required Message type for which message to be sent'}
          tooltipStyle={styles.tooltipStyle}
          editable={primaryKeyEditable}
          required={true}
          label={'Message Type'}
          stateObject={stateObject}
          items={SelectListUtils.functions.selectMaster.NotificationMasterWithOutEvent}
          value={SelectListUtils.functions.getSelectedValue(SelectListUtils.functions.selectMaster.NotificationMasterWithOutEvent, dataModel.messageType)}
          placeholder="Select Message Type"
          onChangeValue={(value) => {
            dataModel.messageType = value;
            parentStateChange({ dataModel: dataModel })

          }}
          dropdownName={'MessageTypeDropDown'}
          subHeadingRecordName="a message type"
          onClear={() => {
            dataModel.messageType = '';
            parentStateChange({ dataModel: dataModel })
          }}
          errorMessage={GeneralUtils.functions.getErrorMessage('field4', dataModel.messageType, errorField, [], 'Message Type')}
        />

<NewScreenDropDownPicker
          tooltipReq={true}
          tooltipMsg={'Select the required channel on which message to be sent'}
          tooltipStyle={styles.tooltipStyle}
          editable={primaryKeyEditable}
          required={true}
          label={'Channel'}
          stateObject={stateObject}
          items={SelectListUtils.functions.selectMaster.MediaCommunication}
          value={SelectListUtils.functions.getSelectedValue(SelectListUtils.functions.selectMaster.MediaCommunication, dataModel.channel)}
          placeholder="Select channel"
          onChangeValue={(value) => {
            dataModel.channel = value;
            parentStateChange({ dataModel: dataModel })

          }}
          dropdownName={'channelDropDown'}
          subHeadingRecordName="a channel"
          onClear={() => {
            dataModel.channel = '';
            parentStateChange({ dataModel: dataModel })
          }}
          errorMessage={GeneralUtils.functions.getErrorMessage('field5', dataModel.channel, errorField, [], 'Channel')}
        />

<NewScreenDropDownPicker
          tooltipReq={true}
          tooltipMsg={'Select the desired language(English/local) for the notification template so that parent/staff can view messages in that particular language.'}
          tooltipStyle={styles.tooltipStyle}
          editable={primaryKeyEditable}
          required={true}
          label={'Language'}
          stateObject={stateObject}
          items={SelectListUtils.functions.selectMaster.LanguageMaster}
          value={SelectListUtils.functions.getSelectedValue(SelectListUtils.functions.selectMaster.LanguageMaster, dataModel.language)}
          placeholder="Select language"
          onChangeValue={(value) => {
            dataModel.language = value;
            parentStateChange({ dataModel: dataModel })

          }}
          dropdownName={'languageDropDown'}
          subHeadingRecordName="a language"
          onClear={() => {
            dataModel.language = '';
            parentStateChange({ dataModel: dataModel })
          }}
          errorMessage={GeneralUtils.functions.getErrorMessage('field6', dataModel.language, errorField, [], 'Language')}
        />



      <SuggestionList
        stateObject={stateObject}
        searchFieldName={stateObject.state.searchFieldName}
        searchText={stateObject.state.searchText}
        visible={stateObject.state.seachVisible}
        searchName={searchName}
        colHeading={searchName == 'assigneeDataModel' ? ['Group ID', 'Description',] : searchName =='ReadOnly'?['Name', 'Id']:['Template Description', 'Template ID',]}
        mapping={searchName == 'assigneeDataModel' ? ['groupID', 'groupDescription',] : searchName =='ReadOnly'? ['StudentName', 'StudentId']:['templateDescription', 'templateID']}
        SuggestionHeading={searchName == 'assigneeDataModel' ? 'Assignee group' : searchName =='ReadOnly'?'Student':'Template ID'}
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
export default InstantNotificationGeneral;

