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
import { View, } from 'react-native';
import {  Card,  } from 'react-native-paper';

import SelectListUtils from '../../../../utils/SelectListUtils'



import LabelText from '../../../../components/LabelText';




class InstituteFeePaymentView extends Component {
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
    const { summaryDataModel, dataModel,currentOperation} = stateObject.state
    const { parentStateChange } = stateObject
    return (
      <View >
        <Card.Content>
      
          <View>
              <LabelText
                label={'Payment ID'}
                value={dataModel.paymentID}
              />
            </View>
            <View>
              <LabelText
                label={'Date'}
                value={dataModel.paymentDate}
              />
            </View>
            <View>
              <LabelText
                label={'Student Name'}
                value={dataModel.studentName}
              />
            </View>
            <View>
              <LabelText
                label={'Student ID'}
                 value={`${dataModel.studentID}`}
              />
            </View>
            <View>
              <LabelText
                label={'Payment Mode'}
                 value={SelectListUtils.functions.getSelectedValue(SelectListUtils.functions.selectMaster.PayMentMaster, dataModel.paymentMode)}
              />
            </View>
            
           
         
          {/* </View> */}
        </Card.Content>
      </View>

    );
  }
}


export default InstituteFeePaymentView;

