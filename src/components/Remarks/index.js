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
import { View, StyleSheet, Keyboard, Image, TouchableOpacity } from 'react-native';
import InputTextArea from '../../components/InputTextArea';
import AppStyles from "../../AppStyles/AppStyles";
import { Caption, Divider, Subheading, Title } from 'react-native-paper';





class Submit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    }
  }


  render() {
    const { stateObject } = this.props
    const { remarks } = stateObject.state
    const { parentStateChange } = stateObject
    return (
      <View>
       
       <Subheading style={[AppStyles.bold_600]}>Remarks</Subheading>
        {/* <Divider style={AppStyles.marginTop_1}/> */}
        <InputTextArea
          label={''}
          secureTextEntry={false}
          value={remarks}
          placeholder={'Please enter remarks if you want'}
          onChangeText={text => {
            parentStateChange({ remarks: text })
          }}

        />
      </View>
    );
  }
}

const styles = StyleSheet.create({

})
export default Submit;

