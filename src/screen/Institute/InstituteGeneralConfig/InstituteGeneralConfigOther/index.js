
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
import { View, StyleSheet, Image, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { TextInput, Card, Text, Avatar, Title } from 'react-native-paper';
import { w, h, totalSize } from "../../../../utils/Dimensions";
import AppStyles from "../../../../AppStyles/AppStyles";
import { Dropdown } from 'react-native-material-dropdown';
import SelectListUtils from '../../../../utils/SelectListUtils'
import LabelText from '../../../../components/LabelText';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomCheckBox from '../../../../components/CustomCheckBox';
import GeneralInstituteEditModal from '../../../../components/GeneralInstituteEditModal';
import EditOtherDetail from '../EditOtherDetail';
import Exception from '../../../../utils/Exception'











class InstituteGeneralConfigOther extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    }
    this.onOtherSubmit = this.onOtherSubmit.bind(this)
    this.edit = this.edit.bind(this)
  }



  Mandatory = function () {
    const {
      stateObject,
    } = this.props
    const { dataModel } = stateObject.state

    stateObject.state.errorField = []
    var mandatoryCheckError = false;

    if (dataModel.contactMail == '' || dataModel.contactMail == null) {
      mandatoryCheckError = true
      stateObject.state.errorField.push('field7')
    }
    if (dataModel.contactNo == '' || dataModel.contactNo == null) {
      mandatoryCheckError = true
      stateObject.state.errorField.push('field8')
    }
    if (dataModel.feeNotificationDays == '' || dataModel.feeNotificationDays == null) {
      mandatoryCheckError = true
      stateObject.state.errorField.push('field9')
    }
    if (dataModel.studentLoginAge == '' || dataModel.studentLoginAge == null) {
      mandatoryCheckError = true
      stateObject.state.errorField.push('field10')
    }
    if (dataModel.timezone == '' || dataModel.timezone == null) {
      mandatoryCheckError = true
      stateObject.state.errorField.push('field11')
    }

    if (dataModel.communicationLanguage == '' || dataModel.communicationLanguage == null) {
      mandatoryCheckError = true
      stateObject.state.errorField.push('field12')
    }
    if (dataModel.countryCode == '' || dataModel.countryCode == null) {
      mandatoryCheckError = true
      stateObject.state.errorField.push('field13')
    }
    if (dataModel.currencyCode == '' || dataModel.currencyCode == null) {
      mandatoryCheckError = true
      stateObject.state.errorField.push('field14')
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



  onOtherSubmit() {
    const {
      stateObject,
    } = this.props
    const {  } = stateObject.state

    if (this.Mandatory()){
      stateObject.callbackend('editOther',null)
    }
    
    // stateObject.parentStateChange({
    //   secondModalVisible : false
    // })

    // if (this.Mandatory())
    //   Paggination.functions.addAndedit(stateObject, 'SubjectMaster', dataModel)
  }


  edit(){
    const {
      stateObject,
    } = this.props
    stateObject.parentStateChange({
      secondModalVisible : true,
      showComplete:false
    })
  }



  render() {
    const {
      stateObject
    } = this.props
    const { dataModel, editable, primaryKeyEditable } = stateObject.state
    const { parentStateChange } = stateObject

    return (
      <View>
        <Card>
          <Card.Content>
            <View style={AppStyles.row_space_between}>
              <Title>{stateObject.state.createStepsHeading[3]}</Title>
              <AntDesign onPress={() => this.edit()}
                name="edit" size={AppStyles.iconSize.height} color={AppStyles.inactiveMoreIcon.tintColor} />
            </View>




            <LabelText
              label={'Email ID'}
              value={dataModel.contactMail}
            />

            <LabelText
              label={'Contact No'}
              value={dataModel.contactNo}
            />
            <LabelText
              label={'Fee remainder notification days'}
              value={dataModel.feeNotificationDays}
            />
            <LabelText
              label={'Allow student login for the student who completed age'}
              value={dataModel.studentLoginAge}
            />

            <LabelText
              label={'Time zone'}
              value={dataModel.timezone}
            />
            <LabelText
              label={'Notification language'}
              value={SelectListUtils.functions.getSelectedValue(SelectListUtils.functions.selectMaster.LanguageCodeMaster, dataModel.communicationLanguage)}
            />

            <LabelText
              label={'Country'}
              value={SelectListUtils.functions.getSelectedValue(SelectListUtils.functions.selectMaster.CountryCodeMaster, dataModel.countryCode)}
            />

            <LabelText
              label={'Currency'}
              value={SelectListUtils.functions.getSelectedValue(SelectListUtils.functions.selectMaster.CurrenceCodeMaster, dataModel.currencyCode)}
            />

            <View style={AppStyles.marginTop_2}>

              <CustomCheckBox

                label={'Parent Access to application'}
                onPress={() => {
                  dataModel.parentAccess = !dataModel.parentAccess;
                  parentStateChange({ dataModel: dataModel })
                }}
                checked={dataModel.parentAccess ? true : false}
                disabled={true}

              />
            </View>
            <View style={AppStyles.marginTop_2}>
              <CustomCheckBox

                label={'Student Access to application'}
                onPress={() => {
                  dataModel.studentAccess = !dataModel.studentAccess;
                  parentStateChange({ dataModel: dataModel })
                }}
                checked={dataModel.studentAccess ? true : false}
                disabled={true}

              />
            </View>
            <View style={AppStyles.marginTop_2}>

              <CustomCheckBox

                label={'Institute buy parent/student server hits'}
                onPress={() => {
                  dataModel.instituteBuy = !dataModel.instituteBuy;
                  parentStateChange({ dataModel: dataModel })
                }}
                checked={dataModel.instituteBuy ? true : false}
                disabled={true}

              />
            </View>
            <View style={AppStyles.marginTop_2}>
              <CustomCheckBox

                label={'Parent/Student buy their server hits'}
                onPress={() => {
                  dataModel.parentBuy = !dataModel.parentBuy;
                  parentStateChange({ dataModel: dataModel })
                }}
                checked={dataModel.parentBuy ? true : false}
                disabled={true}

              />
            </View>
          </Card.Content>
        </Card>
        <GeneralInstituteEditModal
          templates={<EditOtherDetail stateObject={stateObject} />}
          stateObject={stateObject}
          title={'Edit'}
          subTitle={stateObject.state.createStepsHeading[3]}
          onSubmit={() => this.onOtherSubmit()}
        />
      </View>
    );
  }
}


const styles = StyleSheet.create({

})
export default InstituteGeneralConfigOther;

