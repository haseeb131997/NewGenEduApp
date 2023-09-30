
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


import React, { Component } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Text, Modal, Portal, Title, Subheading, Card, Divider } from 'react-native-paper';
import { w, h } from "../../../../utils/Dimensions";
import AppStyles from '../../../../AppStyles/AppStyles';
import { UiColor } from "../../../../theme";
import { ScrollView } from 'react-native-gesture-handler';






const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

class ViewDetailsModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true
    }
  }




  render() {
    const {
      stateObject, templates, title, subTitle
    } = this.props
    const { detailsModalVisible } = stateObject.state
    return (
      <Portal>
        <Modal visible={detailsModalVisible}
          onDismiss={() => stateObject.parentStateChange({
            detailsModalVisible: false
          })}
        // contentContainerStyle={{}}
        >

          <View style={[styles.modalContainer]}>
            <Card.Content>
              <View style={[AppStyles.row_space_between, AppStyles.marginVertical_1, AppStyles.alignItems]}>
                <View>
                  <Title>{title}</Title>
                  <Text style={AppStyles.textColor}>{subTitle}</Text>
                </View>
                <TouchableOpacity onPress={() => stateObject.parentStateChange({
                  detailsModalVisible: false
                })}>
                  <Image resizeMode='contain' style={AppStyles.crossIcon}
                    source={require('../../../../asssets/icons/arr061.png')}
                  /></TouchableOpacity>
              </View>
            </Card.Content>
            <Divider />

            <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
              <View style={AppStyles.marginTop_2}>
                <Card.Content>
                  {templates}
                  <View style={AppStyles.marginTop_3} />
                </Card.Content>
              </View>
            </ScrollView>

          </View>

        </Modal>
      </Portal>
    );
  }
}


const styles = StyleSheet.create({

  modalContainer: {
    backgroundColor: UiColor.WHITE,
    margin: h('1.5%'),
    padding: h('.5%'),
    maxHeight: height - h('15%'),
  },


})

export default ViewDetailsModal



