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
import SelectListUtils from '../../../../utils/SelectListUtils'
import AppStyles from "../../../../AppStyles/AppStyles";
import ListView from '../../../../components/ListView';
import { Caption, Title, Divider, Subheading, Text } from "react-native-paper";
import GeneralUtils from "../../../../utils/GeneralUtils"

import ImpNotes from '../../../../components/ImpNotes';

import { UiColor } from "../../../../theme";
import AmountInputText from "../../../../components/AmountInputText"
import LabelText from '../../../../components/LabelText';



const notes = [

  {
    text: "Here system distributed the 'Total amount received' or paid the Fees based on its due date. If you want to change the system distributed/paid order or if you want to change the payment amount for the given fee, you can change here",
    color: UiColor.DRAK_GRAY_COLOR
  },

]

class InstituteFeePaymentDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    }

  }


  calculateBalanceAmount() {
    const {
      stateObject
    } = this.props

    const { dataModel, currentOperation } = stateObject.state
    dataModel.balanceAmount = "";
    dataModel.totalAmountPaid = "";
    var totalPaymentForFee = 0;
    for (var i = 0; i < dataModel.Payments.length; i++) {
      totalPaymentForFee += Number(dataModel.Payments[i].paymentForFee.replace(/\,/g, ''))
    }
    var amountReceived = Number(dataModel.paymentPaid.replace(/\,/g, ''));
    if (totalPaymentForFee <= amountReceived) {
      if (totalPaymentForFee <= dataModel.totalAmountToBePaid.replace(/\,/g, '')) {
        dataModel.balanceAmount = String(amountReceived - totalPaymentForFee);
        dataModel.totalAmountPaid = String(totalPaymentForFee)
      }
    }
  }











  render() {
    const { stateObject } = this.props
    const { dataModel, editable, errorField } = stateObject.state
    const { parentStateChange } = stateObject
    return (
      <View>

        {/* <View style={AppStyles.alignItems}>
          <Caption style={AppStyles.textColor}>{'Total due amount'}</Caption>
          <Title style={AppStyles.primaryTitleStyle}>{dataModel.totalAmountToBePaid} {stateObject.state.currencyCode}</Title>

        </View> */}

<LabelText
          label={'Total due amount'}
          value={`${dataModel.totalAmountToBePaid} ${stateObject.state.currencyCode}`}
        />


        <LabelText
          label={'Total amount paid'}
          value={`${dataModel.totalAmountPaid} ${stateObject.state.currencyCode}`}
        />

        <LabelText
          label={'Balance Amount to be paid for Parent/Student'}
          value={`${dataModel.balanceAmount} ${stateObject.state.currencyCode}`}
        />

        {stateObject.state.currentOperation == 'Modification' && <View style={AppStyles.marginTop_2}>
          <AmountInputText

            currencyCode={stateObject.state.currencyCode}
            required={true}
            editable={!editable}
            label={'Total amount received'}
            secureTextEntry={false}
            onChangeText={text => {
              dataModel.paymentPaid = text
              parentStateChange({ dataModel: dataModel })
              this.calculateBalanceAmount()
            }}
            value={dataModel.paymentPaid}
            errorMessage={GeneralUtils.functions.getErrorMessage('field5', dataModel.paymentPaid, errorField, [], 'Amount received from Parent/Student')}
          />
        </View>}


        <ImpNotes
          isArray={true}
          arrayMessage={notes}
        />

        <View style={AppStyles.marginTop_2}>
          <Subheading style={AppStyles.bold_600} >{'Fee details'}</Subheading>
        </View>

        {dataModel.Payments != 0 ?
          <View>
            {dataModel.Payments.map((item, index) => (
              <View key={index.toString()} style={[AppStyles.dashContainer, AppStyles.marginTop_2]}>
                <View>
                  <Caption style={[AppStyles.textColor, AppStyles.marginTop_1]}>Fee Description</Caption>
                  <Text>{item.feeDescription}</Text>

                  <View style={AppStyles.marginTop_1}>
                    <Caption style={[AppStyles.textColor, AppStyles.marginTop_1]}>Due Date</Caption>
                    <Text>{item.dueDate}</Text>
                  </View>

                  <View style={AppStyles.marginTop_1}>
                    <Caption style={[AppStyles.textColor, AppStyles.marginTop_1]}>Due</Caption>
                    <Text>{item.outStanding} {stateObject.state.currencyCode}</Text>
                  </View>

                  <View style={AppStyles.marginTop_1}>
                    <Caption style={[AppStyles.textColor, AppStyles.marginTop_1]}>Fee Amount</Caption>
                    <Text>{item.feeAmount} {stateObject.state.currencyCode}</Text>
                  </View>

                  <View style={AppStyles.marginTop_1}>
                    <Caption style={[AppStyles.textColor, AppStyles.marginTop_1]}>Amount already paid</Caption>
                    <Text>{item.amountAlreadyPaid}</Text>
                  </View>

                  <View style={AppStyles.marginTop_2}>
                    <AmountInputText

                      currencyCode={stateObject.state.currencyCode}
                      required={false}
                      editable={!editable}
                      label={'Payment Amount'}
                      secureTextEntry={false}
                      onChangeText={text => {
                        item.paymentForFee = text
                        parentStateChange({ dataModel: dataModel })
                        this.calculateBalanceAmount()
                      }}
                      value={item.paymentForFee}

                    />
                  </View>





                </View>
              </View>))
            }
          </View> : null}

        {/* <ImpNotes
          isArray={true}
          arrayMessage={notes}
        /> */}


        {/* {Paggination.functions.editModaltwo && <SecondModal
          templates={<EditBreakupDetail stateObject={stateObject} />}
          stateObject={stateObject}
          title={Paggination.functions.selectedIndex == null ? 'Add' : 'Edit'}
          subTitle={'Breakup Details'}
          onSubmit={() => this.onSubmit()}
        />} */}

      </View>


    );
  }
}

const styles = StyleSheet.create({
})
export default InstituteFeePaymentDetails;
