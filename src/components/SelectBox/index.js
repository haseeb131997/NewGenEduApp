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

import React from 'react';
import {  StyleSheet,TouchableOpacity } from 'react-native';
import { w, h } from "../../utils/Dimensions";
import { Button, Divider, Dialog, Portal,Text } from 'react-native-paper';
import { UiColor } from '../../theme';




const SelectBox = (props) => {
  const {visible,onChange,stateObject} = props
  return (
    <Portal>
    <Dialog visible={visible} onDismiss={()=> stateObject.childStateChange({
          visible:false
        })}>
      <Dialog.Title>Select Image</Dialog.Title>
      <Divider/>
      <Dialog.Content>
        <TouchableOpacity onPress={()=>onChange('camera')} 
        style={styles.textContainer}>
        <Text style={styles.textStyle}>Take Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        onPress={()=>onChange('gallery')} 
        style={styles.textContainer}>
        <Text style={styles.textStyle}>Choose from Library</Text>
        </TouchableOpacity>
      </Dialog.Content>
      <Divider/>
      <Dialog.Actions>
        <Button
        color={UiColor.ERROR_COLOR}
        onPress={()=> stateObject.childStateChange({
          visible:false
        })}>Cancel</Button>
      </Dialog.Actions>
    </Dialog>
  </Portal>
  )
};

const styles = StyleSheet.create({
textStyle:{
  // Start NEAI2-60
  // fontSize:h(2.6)
    // end NEAI2-60
},
textContainer:{
  paddingVertical:h('1%')
}
})

export default SelectBox
