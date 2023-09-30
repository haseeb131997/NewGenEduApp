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

import ImpNotes from '../../../../components/ImpNotes';




import LabelText from '../../../../components/LabelText';




class ClassAssignmentView extends Component {
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
    const {  dataModel } = stateObject.state
    const { parentStateChange } = stateObject
    return (
      <View >
        <Card.Content>

          {dataModel.mark != '' ? <View>
            <LabelText
              label={'Mark/Score'}
              value={dataModel.mark}
            />

            <LabelText
              label={'Teacher feedback'}
              value={dataModel.teacherFeedback != '' ? dataModel.teacherFeedback : 'no feedback'}
            />
          </View> : <ImpNotes
            isArray={false}
            message={`Assignment is not assessed yet.`}
          />}




          {/* </View> */}
        </Card.Content>
      </View>

    );
  }
}


export default ClassAssignmentView;

