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
import { View, StyleSheet, Platform } from 'react-native';
import { Text, Card } from 'react-native-paper';
import AppStyles from "../../../../AppStyles/AppStyles";
import GeneralUtils from "../../../../utils/GeneralUtils";
import InputTextArea from '../../../../components/InputTextArea';
import LabelText from '../../../../components/LabelText';








class QuestionPaperConfigInstructions extends Component {
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
    const { dataModel, editable, errorField } = stateObject.state
    const { parentStateChange } = stateObject

    return (stateObject.state.currentOperation == 'Create' || stateObject.state.currentOperation == 'Modification') ? (<View style={[AppStyles.marginTop_2]}>
    <InputTextArea
        required={true}
        editable={!editable}
          label={'Question Paper Instructions'}
          secureTextEntry={false}
          value={dataModel.questionPaperInstruction}
          placeholder={'Enter question paper instructions'}
          onChangeText={text => {
            dataModel.questionPaperInstruction = text
            parentStateChange({ dataModel: dataModel })
          }}
          errorMessage={GeneralUtils.functions.getErrorMessage('field5', dataModel.questionPaperInstruction, errorField, [], 'Question Paper Instructions')}
        />

    </View>
    ) : (<View>
      <Card.Content>
        <LabelText
          label={'Question Paper Instructions'}
          value={dataModel.questionPaperInstruction}
        />
      </Card.Content>
    </View>);
  }
}


const styles = StyleSheet.create({

})
export default QuestionPaperConfigInstructions;

