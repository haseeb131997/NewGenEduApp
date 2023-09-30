
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
//  Created:- 10-09-21
/**/
/**/




import React, { Component } from "react";
import { View, StyleSheet, Platform } from 'react-native';
import { w, h } from "../../../../utils/Dimensions";
import AppStyles from "../../../../AppStyles/AppStyles";
import InputText from '../../../../components/InputText';
import NewScreenDropDownPicker from '../../../../components/NewScreenDropDownPicker';
import GeneralUtils from "../../../../utils/GeneralUtils";
import SelectListUtils from '../../../../utils/SelectListUtils'
import CustomCheckBox from '../../../../components/CustomCheckBox';
import SearchUtils from "../../../../utils/SearchUtils";
import SuggestionList from '../../../../components/SuggestionList';
import SuggestionTextInput from '../../../../components/SuggestionTextInput';

import { Text } from 'react-native-paper';





var searchName = 'TimeZoneModel'

class InstituteGeneralConfigOther extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    }

  }




  render() {
    const {
      stateObject
    } = this.props
    const { dataModel, editable, primaryKeyEditable, errorField } = stateObject.state
    const { parentStateChange } = stateObject

    return (
      <View>
        <InputText
          tooltipReq={true}
          tooltipMsg={'Mention Institute mail ID from which the parent mail notifications will be sent'}
          tooltipStyle={styles.emailtooltipStyle}
          required={true}
          // editable={!primaryKeyEditable}
          label={'Email ID'}
          secureTextEntry={false}
          onChangeText={text => {
            dataModel.contactMail = text
            parentStateChange({ dataModel: dataModel })
          }}
          value={dataModel.contactMail}
          errorMessage={GeneralUtils.functions.getErrorMessage('field7', dataModel.contactMail, errorField, [], 'Email ID')}
        />

        <InputText
          required={true}
          // editable={!primaryKeyEditable}
          label={'Contact Number'}
          secureTextEntry={false}
          keyboardType='number-pad'
          onChangeText={text => {
            dataModel.contactNo = text
            parentStateChange({ dataModel: dataModel })
          }}
          value={dataModel.contactNo}
          errorMessage={GeneralUtils.functions.getErrorMessage('field8', dataModel.contactNo, errorField, [], 'Contact No')}
        />

        <InputText
          tooltipReq={true}
          tooltipMsg={'Mention number of days institute wants to send fee remainder notifications before and after due date'}
          tooltipStyle={styles.feetooltipStyle}
          required={true}
          // editable={!primaryKeyEditable}
          label={'Fee remainder notification days'}
          secureTextEntry={false}
          keyboardType='numeric'
          onChangeText={text => {
            dataModel.feeNotificationDays = text
            parentStateChange({ dataModel: dataModel })
          }}
          value={dataModel.feeNotificationDays}
          errorMessage={GeneralUtils.functions.getErrorMessage('field9', dataModel.feeNotificationDays, errorField, [], 'Fee remainder notification days')}
        />

        <InputText
          tooltipReq={true}
          tooltipMsg={'Mention minimum age for students to allow access to app'}
          tooltipStyle={styles.studenttooltipStyle}
          required={true}
          // editable={!primaryKeyEditable}
          label={'Allow student login for the student who completed age'}
          secureTextEntry={false}
          keyboardType='numeric'
          onChangeText={text => {
            dataModel.studentLoginAge = text
            parentStateChange({ dataModel: dataModel })
          }}
          value={dataModel.studentLoginAge}
          errorMessage={GeneralUtils.functions.getErrorMessage('field10', dataModel.studentLoginAge, errorField, [], 'Enter age for student login')}
        />

        <View >
          <NewScreenDropDownPicker
            tooltipReq={true}
            tooltipMsg={'Mention Language to be used for parent notification messages under Notification Language field , It can be English , Local Language and Both . English => Parent notifications will be sent in english , Local language=> Parent Notifications will be sent in Local language spoken in the Institute Geo graphical Area , Both => Parent Notifications can be sent either English or Local language preferred by parent'}
            tooltipStyle={styles.notificationtooltipStyle}
            required={true}
            label={'Notification Language'}
            stateObject={stateObject}
            items={SelectListUtils.functions.selectMaster.LanguageCodeMaster}
            value={SelectListUtils.functions.getSelectedValue(SelectListUtils.functions.selectMaster.LanguageCodeMaster, dataModel.communicationLanguage)}
            onChangeValue={(value) => {
              dataModel.communicationLanguage = value;
              parentStateChange({ dataModel: dataModel })

            }}
            errorMessage={GeneralUtils.functions.getErrorMessage('field12', dataModel.communicationLanguage, errorField, [], 'Notification Language')}

            dropdownName={'notificationDropdown'}
            subHeadingRecordName="a notification language"
            onClear={() => {
              dataModel.communicationLanguage = '';
              parentStateChange({ dataModel: dataModel })
            }}
          />
        </View>

        <View>
          <NewScreenDropDownPicker
            tooltipReq={true}
            tooltipMsg={'Mention currency which is used to handle transactions in your Institute'}
            tooltipStyle={styles.emailtooltipStyle}
            required={true}
            label={'Currency'}
            stateObject={stateObject}
            items={SelectListUtils.functions.selectMaster.CurrenceCodeMaster}
            value={SelectListUtils.functions.getSelectedValue(SelectListUtils.functions.selectMaster.CurrenceCodeMaster, dataModel.currencyCode)}
            placeholder="Select Currency"
            onChangeValue={(value) => {
              dataModel.currencyCode = value;
              parentStateChange({ dataModel: dataModel })

            }}
            dropdownName={'currencyDropdown'}
            subHeadingRecordName="a currency"
            onClear={() => {
              dataModel.currencyCode = '';
              parentStateChange({ dataModel: dataModel })
            }}
            errorMessage={GeneralUtils.functions.getErrorMessage('field14', dataModel.currencyCode, errorField, [], 'Currency')}
          />
        </View>

        <View style={[AppStyles.marginTop_1]}>

          <SuggestionTextInput
            tooltipReq={true}
            tooltipMsg={'Mention Time Zone at which your Institute is located at'}
            tooltipStyle={styles.timeZonetooltipStyle}
            required={true}
            label={'Time Zone'}
            placeholder={'Select time zone'}
            secureTextEntry={false}
            value={SelectListUtils.functions.getSelectedValue(SelectListUtils.functions.selectMaster.TimeZoneMaster, dataModel.timezone)}
            onFocus={() => {
              searchName = 'TimeZoneModel'
              //  if(dataModel.teacherName == null || dataModel.teacherName == '' ){
              SearchUtils.functions.launchSuggestion(stateObject, '', 'TimeZone')
              //  }

            }
            }
            onClear={() => {
              dataModel.timezone = '';
              parentStateChange({ dataModel: dataModel })
            }}
            errorMessage={GeneralUtils.functions.getErrorMessage('field11', dataModel.timezone, errorField, [], 'Time Zone')}

          />

        </View>

        <View style={[AppStyles.marginTop_1]}>

          <SuggestionTextInput
            tooltipReq={true}
            tooltipMsg={'Mention Country in which your Institute is located at'}
            tooltipStyle={styles.emailtooltipStyle}
            required={true}
            label={'Country'}
            placeholder={'Select country'}
            secureTextEntry={false}
            value={SelectListUtils.functions.getSelectedValue(SelectListUtils.functions.selectMaster.CountryCodeMaster, dataModel.countryCode)}
            onFocus={() => {
              searchName = 'CountryModel'
              //  if(dataModel.teacherName == null || dataModel.teacherName == '' ){
              SearchUtils.functions.launchSuggestion(stateObject, '', 'country')
              //  }
            }
            }
            onClear={() => {
              dataModel.countryCode = '';
              parentStateChange({ dataModel: dataModel })
            }}
            errorMessage={GeneralUtils.functions.getErrorMessage('field13', dataModel.countryCode, errorField, [], 'Country')}


          />

        </View>




        <Text style={AppStyles.bold_600}>Can Parents and/or Students access your institute through NewGenEducationApp?</Text>


        <View style={AppStyles.marginTop_2}>
          <CustomCheckBox
            label={'Allow Parent Access'}
            onPress={() => {
              dataModel.parentAccess = !dataModel.parentAccess;
              parentStateChange({ dataModel: dataModel })
            }}
            checked={dataModel.parentAccess ? true : false}
            disabled={false}

          />
        </View>
        <View style={AppStyles.marginTop_2}>
          <CustomCheckBox

            label={'Allow Student Access'}
            onPress={() => {
              dataModel.studentAccess = !dataModel.studentAccess;
              parentStateChange({ dataModel: dataModel })
            }}
            checked={dataModel.studentAccess ? true : false}
            disabled={false}

          />
        </View>

      <View style={AppStyles.marginTop_2}>
      <Text style={AppStyles.bold_600}>Choose who pays for the Parents/Students usage</Text>
      </View>
        <View style={AppStyles.marginTop_2}>

          <CustomCheckBox

            label={'Institute buy Parent/Student server hits'}
            onPress={() => {
              dataModel.instituteBuy = !dataModel.instituteBuy;
              dataModel.parentBuy = !dataModel.instituteBuy;
              parentStateChange({ dataModel: dataModel })
            }}
            checked={dataModel.instituteBuy ? true : false}
            disabled={false}

          />
        </View>
        <View style={AppStyles.marginTop_2}>
          <CustomCheckBox

            label={'Parent/Student buy thier server hits'}
            onPress={() => {
              dataModel.parentBuy = !dataModel.parentBuy;
              dataModel.instituteBuy = !dataModel.parentBuy;
              parentStateChange({ dataModel: dataModel })
            }}
            checked={dataModel.parentBuy ? true : false}
            disabled={false}

          />
        </View>


        <SuggestionList
          stateObject={stateObject}
          searchFieldName={stateObject.state.searchFieldName}
          searchText={stateObject.state.searchText}
          visible={stateObject.state.seachVisible}
          searchName={searchName}
          colHeading={['Name', 'Id',]}
          mapping={['label', 'value',]}
          SuggestionHeading={searchName == 'TimeZoneModel' ? 'Time Zone' : 'Country'}
        />


      </View>
    );
  }
}


const styles = StyleSheet.create({
  emailtooltipStyle: {
    height: h('10%'), width: w('70%')
  },

  timeZonetooltipStyle: {
    height: h('10%'), width: w('60%')
  },
  studenttooltipStyle: {
    height: h('15%'), width: w('50%')
  },


  feetooltipStyle: {
    height: h('18%'), width: w('60%')
  },
  notificationtooltipStyle: {
    height: h('40%'), width: w('70%')
  },
})
export default InstituteGeneralConfigOther;

