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




class InstituteFeeManagementView extends Component {
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
                label={'Fee ID'}
                value={dataModel.feeID}
              />
            </View>
            <View>
              <LabelText
                label={'Fee Description'}
                value={dataModel.feeDescription}
              />
            </View>
            <View>
              <LabelText
                label={'Fee Type'}
                value={dataModel.feeType}
              />
            </View>
            <View>
              <LabelText
                label={'Amount'}
                 value={`${stateObject.state.currencyCode} ${dataModel.amount}`}
              />
            </View>
            <View>
              <LabelText
                label={'Assignee Group Description'}
                 value={dataModel.groupDesc}
              />
            </View>
            <View>
              <LabelText
                label={'Due Date'}
                 value={dataModel.dueDate}
              />
            </View>
           
         
          {/* </View> */}
        </Card.Content>
      </View>

    );
  }
}


export default InstituteFeeManagementView;

