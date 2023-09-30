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
import { View, StyleSheet, LayoutAnimation, UIManager, TouchableOpacity } from 'react-native';
import SelectListUtils from '../../../../utils/SelectListUtils'
import AppStyles from "../../../../AppStyles/AppStyles";
import ListView from '../../../../components/ListView';
import { Caption, Title, Divider, Subheading, Text } from "react-native-paper";
import GeneralUtils from "../../../../utils/GeneralUtils"

import CustomButtons from '../../../../components/CustomButtons';
import SecondModal from '../../../../components/SecondModal';
import EditBreakupDetail from '../EditBreakupDetail';
import Paggination from "../../../../utils/Paggination";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Exception from '../../../../utils/Exception'
import ImpNotes from '../../../../components/ImpNotes';
import AntDesign from 'react-native-vector-icons/AntDesign';
import moment from 'moment';
import { UiColor } from "../../../../theme";
import AmountInputText from "../../../../components/AmountInputText"
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LabelText from '../../../../components/LabelText';





const notes = [

  {
    text: "Mention the amount received from Parent/Student",
    color: UiColor.DRAK_GRAY_COLOR
  },
  {
    text: "Parent/Student can pay the fee wholly or partially",
    color: UiColor.DRAK_GRAY_COLOR
  },
  {
    text: "If Parent/Student want to pay the fee partially, then the amount desired to be paid can be mentioned in the field 'Amount received from Parent/Student'",
    color: UiColor.DRAK_GRAY_COLOR
  },
  {
    text: "When an amount higher than the total due is mentioned in the field 'Amount received from Parent/Student', the system will show the balance amount to be paid back to the Parent/Student in the next step",
    color: UiColor.DRAK_GRAY_COLOR
  },
  {
    text: "When the 'Next' button is clicked, the system will distribute the 'Amount received from Parent/Student' over the available due fees, based on the due date of the corresponding fee",
    color: UiColor.DRAK_GRAY_COLOR
  },
]

class InstituteFeePaymentDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      selectedIndex: 0
    }
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    this.changeLayout = this.changeLayout.bind(this)
  }

  changeLayout = (index) => {
    if (this.state.selectedIndex == index) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      this.setState({ selectedIndex: null });
    }
    else {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      this.setState({ selectedIndex: index });
    }

  }














  render() {
    const { stateObject } = this.props
    const { dataModel, editable, errorField } = stateObject.state
    const { parentStateChange } = stateObject
    return (
      <View>

        {stateObject.state.currentOperation == 'Create' && <View style={[AppStyles.alignItems, AppStyles.marginTop_1]}>
          <Caption style={AppStyles.textColor}>{'Total due amount'}</Caption>
          <Title style={AppStyles.primaryTitleStyle}>{dataModel.totalAmountToBePaid} {stateObject.state.currencyCode}</Title>

        </View>}



       {stateObject.state.currentOperation == 'Create' ? <View style={AppStyles.marginTop_2}>
          <AmountInputText

            currencyCode={stateObject.state.currencyCode}
            required={true}
            editable={!editable}
            label={'Amount received from Parent/Student'}
            secureTextEntry={false}
            onChangeText={text => {
              dataModel.paymentPaid = text
              parentStateChange({ dataModel: dataModel })
            }}
            value={dataModel.paymentPaid}
            errorMessage={GeneralUtils.functions.getErrorMessage('field5', dataModel.paymentPaid, errorField, [], 'Amount received from Parent/Student')}
          />
        </View> :
        <View>
        <LabelText
          label={'Total due amount'}
          value={`${dataModel.totalAmountToBePaid} ${stateObject.state.currencyCode}`}
        />

          <LabelText
          label={'Total amount received'}
          value={`${dataModel.paymentPaid} ${stateObject.state.currencyCode}`}
        />

        <LabelText
          label={'Total amount paid'}
          value={`${dataModel.totalAmountPaid} ${stateObject.state.currencyCode}`}
        />

        <LabelText
          label={'Balance Amount paid to Parent/Student'}
          value={`${dataModel.balanceAmount} ${stateObject.state.currencyCode}`}
        />

        </View> 
        
        }






        <View style={AppStyles.marginTop_2}>
          <Subheading style={AppStyles.bold_600} >{'Fee details'}</Subheading>
        </View>

        {dataModel.Payments != 0 ?
          <View>
            {dataModel.Payments.map((item, index) => (
              <View key={index.toString()} style={[AppStyles.marginTop_2]}>
                {/* <View style={[AppStyles.row_space_between, AppStyles.alignItems]}>
                  <View style={AppStyles.width85}>
                      <Subheading>{item.feeDescription}</Subheading>
                    <Text style={AppStyles.attrNameStyle}>{stateObject.state.currencyCode} {item.amount}</Text>
                  </View>
                 
                </View> */}
                <TouchableOpacity onPress={() => this.changeLayout(index)} style={[AppStyles.flexDirectionRow, AppStyles.alignItems,]}>
                  <MaterialIcons name={this.state.selectedIndex != index ? "navigate-next" : "keyboard-arrow-down"} size={AppStyles.iconSize.height} color={UiColor.LIGHT_TEXT_COLOR} />

                  <View style={[AppStyles.marginLeft_1, AppStyles.flex_one]}>
                    <Subheading style={[AppStyles.bold_400]}>{item.feeDescription} </Subheading>

                    <View style={AppStyles.flexDirectionRow}>

                      <Caption style={AppStyles.primaryStatusStyle}>Due on {item.dueDate}</Caption>

                    </View>
                  </View>
                </TouchableOpacity>

                <View style={[{ height: this.state.selectedIndex == index ? null : 0, overflow: 'hidden', }]}>
                  <View style={AppStyles.marginLeft_4}>
                    <View style={AppStyles.marginTop_1}>
                      <Caption style={[AppStyles.textColor, AppStyles.marginTop_1]}>Fee Amount</Caption>
                      <Text>{item.feeAmount} {stateObject.state.currencyCode}</Text>
                    </View>

                    <View style={AppStyles.marginTop_1}>
                      <Caption style={[AppStyles.textColor, AppStyles.marginTop_1]}>Amount already paid</Caption>
                      <Text>{item.amountAlreadyPaid}</Text>
                    </View>
                    <View style={AppStyles.marginTop_1}>
                      <Caption style={[AppStyles.textColor, AppStyles.marginTop_1]}>Due</Caption>
                      <Text>{item.outStanding} {stateObject.state.currencyCode}</Text>
                    </View>

                     {stateObject.state.currentOperation != 'Create' && <View style={AppStyles.marginTop_1}>
                      <Caption style={[AppStyles.textColor, AppStyles.marginTop_1]}>Payment Amount</Caption>
                      <Text>{item.paymentForFee} {stateObject.state.currencyCode}</Text>
                    </View>}
                  </View>
                </View>


                {/* <View>

                  <Caption style={[AppStyles.textColor, AppStyles.marginTop_1]}>Fee Description</Caption>
                  <Text>{item.feeDescription}</Text>

                  <View style={AppStyles.marginTop_1}>
                    <Caption style={[AppStyles.textColor, AppStyles.marginTop_1]}>Due Date</Caption>
                    <Text>{item.dueDate}</Text>
                  </View>

                  <View style={AppStyles.marginTop_1}>
                    <Caption style={[AppStyles.textColor, AppStyles.marginTop_1]}>Fee Amount</Caption>
                    <Text>{item.feeAmount} {stateObject.state.currencyCode}</Text>
                  </View>

                  <View style={AppStyles.marginTop_1}>
                    <Caption style={[AppStyles.textColor, AppStyles.marginTop_1]}>Amount already paid</Caption>
                    <Text>{item.amountAlreadyPaid}</Text>
                  </View>
                  <View style={AppStyles.marginTop_1}>
                    <Caption style={[AppStyles.textColor, AppStyles.marginTop_1]}>Due</Caption>
                    <Text>{item.outStanding} {stateObject.state.currencyCode}</Text>
                  </View>


                </View> */}
              </View>))
            }
          </View> : null}

       {stateObject.state.currentOperation == 'Create' && <ImpNotes
          isArray={true}
          arrayMessage={notes}
        />}


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
