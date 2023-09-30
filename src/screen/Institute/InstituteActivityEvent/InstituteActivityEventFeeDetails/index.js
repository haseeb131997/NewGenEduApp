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
import { View, StyleSheet, } from 'react-native';
import { h, w } from '../../../../utils/Dimensions';
import AppStyles from "../../../../AppStyles/AppStyles";
import {  Card } from "react-native-paper";
import InputText from '../../../../components/InputText';
import LabelText from '../../../../components/LabelText';
import SuggestionList from '../../../../components/SuggestionList';
import SuggestionTextInput from '../../../../components/SuggestionTextInput';
import SearchUtils from "../../../../utils/SearchUtils";
import AmountInputText from "../../../../components/AmountInputText"
//import GeneralUtils from '../../../../utils/GeneralUtils'




//var search='feeDataModel'

class InstituteActivityEventFeeDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    }

  }








  render() {
    const { stateObject } = this.props
    const { dataModel, editable, errorField } = stateObject.state
    const { parentStateChange } = stateObject
    return (stateObject.state.currentOperation == 'Create' || stateObject.state.currentOperation == 'Modification') ?(
      <View>
       <View style={AppStyles.marginTop_2}>
       <SuggestionTextInput
          tooltipReq={true}
          tooltipMsg={'Select Fee applicable for this event'}
          tooltipStyle={styles.tooltipStyle}
          required={false}
          editable={editable}
          label={'Fee applicable'}
          placeholder={'Select fee description'}
          secureTextEntry={false}
          value={dataModel.feeDescription}
          onFocus={() => {
            //  if(dataModel.feeDescription == null || dataModel.feeDescription == '' ){
             // parentStateChange({ searchName: 'feeID' }) 
             //search='feeDataModel'
            SearchUtils.functions.launchSuggestion(stateObject, '', 'feeID')
            //  }
          }
          }
          onClear={() => {
            dataModel.feeDescription = '';
            dataModel.feeID = '';
            dataModel.amount = '';
            dataModel.feeDueDate = '';
            parentStateChange({ dataModel: dataModel })
          }}

        // errorMessage={GeneralUtils.functions.getErrorMessage('field5', dataModel.feeDescription, errorField, [], 'Fee Description')}
        />
       </View>
       <View style={AppStyles.marginTop_1}>
        <InputText
        tooltipReq={true}
        tooltipMsg={'Last Date for fee to be paid'}
        tooltipStyle={styles.tooltipStyle}
          required={false}
          editable={false}
          label={'Fee Due Date'}
          value={dataModel.feeDueDate}
  
        />

      </View>
      <View style={AppStyles.marginTop_1}>
        {/* <InputText
          required={false}
          editable={false}
          label={'Fee Amount'}
          value={dataModel.amount}
  
        /> */}
         <AmountInputText
         tooltipReq={true}
         tooltipMsg={'Fee Amount'}
         tooltipStyle={styles.tooltipStyle}
        currencyCode={stateObject.state.currencyCode}
        required={false}
        editable={false}
        label={'Fee Amount'}
        secureTextEntry={false}
        value={dataModel.amount}
      />
      </View>

      

      <SuggestionList
        stateObject={stateObject}
        searchFieldName={stateObject.state.searchFieldName}
        searchText={stateObject.state.searchText}
        visible={stateObject.state.seachVisible}
        searchName={'feeDataModel'}
        colHeading={['Description', 'Amount','Due Date','ID']}
        mapping={['feeDescription', 'amount','feeDueDate','feeID']}
        SuggestionHeading={'Fee'}
      />
      </View>


    ) :(
      <View>
         <Card.Content>
         <LabelText
            label={'Fee ID'}
            value={dataModel.feeID}
          />

          <LabelText
            label={'Fee Description'}
            value={dataModel.feeDescription}
          />
 
          <LabelText
            label={'Fee Due Date'}
            value={dataModel.feeDueDate}
          />
          <LabelText
            label={'Fee Amount'}
            value={`${dataModel.amount} ${stateObject.state.currencyCode}`}
          />

    </Card.Content>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tooltipStyle: {
    height: h('15%'), width: w('60%')
  }
})
export default InstituteActivityEventFeeDetails;
