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
import { Card, } from 'react-native-paper';

import LabelText from '../../../../components/LabelText';
import SelectListUtils from '../../../../utils/SelectListUtils'





class TeacherEcircularView extends Component {
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
    const { summaryDataModel, dataModel, currentOperation } = stateObject.state
    const { parentStateChange } = stateObject




    return (
      <View >
        <Card.Content>

          <View>
            <LabelText
              label={'Circular ID'}
              value={dataModel.circularID}
            />
          </View>
          <View>
            <LabelText
              label={'Description'}
              value={dataModel.circularDescription}
            />
          </View>
          <View>
            <LabelText
              label={'Circular Date'}
              value={dataModel.circularDate}
            />
          </View>

          <View>
            <LabelText
              label={'Instructions to Staffs'}
              value={dataModel.notes}
            />
          </View>





          {/* </View> */}
        </Card.Content>
      </View>

    );
  }
}


export default TeacherEcircularView;

