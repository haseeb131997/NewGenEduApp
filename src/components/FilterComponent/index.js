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
import { View, StyleSheet, Image, TouchableOpacity,Dimensions,ScrollView } from 'react-native';
import { TextInput, Card, Text, Modal, Title, Portal, Divider } from 'react-native-paper';
import { w, h } from "../../utils/Dimensions";
import AppStyles from "../../AppStyles/AppStyles";
import CustomButtons from '../../components/CustomButtons';
import { UiColor } from "../../theme";
import { template } from "lodash";
import NewOperation from "../../utils/NewOperation";
import SubScreenUtils from "../../utils/SubScreenUtils";
import AlertBox from '../../components/AlertBox';
import Spinner from '../../components/Loader';

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;



class FilterComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    }
  }


onSearch = function (stateObject) {
  // stateObject.parentStateChange({
  //   currentOperation: 'SearchInFilter'
  // })
  NewOperation.functions.screenEventHandler(stateObject)
}


  render() {
    const {
      stateObject,
      templates,
      title
    } = this.props
    const { currentOperation } = stateObject.state
    return (
      <Portal>
        <Modal visible={currentOperation == 'Search' ? true : false} 
        // onDismiss={() => SubScreenUtils.functions.closeModal(stateObject)}
        // contentContainerStyle={AppStyles.loginMainContainer}
        >
          {/* <View style={AppStyles.viewModalContainer}> */}
          <View style={[styles.modalContainer]}>

            <View style={AppStyles.row_space_between}>
              <Title></Title>
              <TouchableOpacity onPress={() => SubScreenUtils.functions.closeModal(stateObject)}>
                <Image resizeMode='contain' style={[AppStyles.viewCrossIcon]}
                  source={require('../../asssets/icons/arr061.png')}
                /></TouchableOpacity>
            </View>
            <Card.Content>
              <View style={AppStyles.alignItems, AppStyles.marginBottom_2}>
                <Title style={{ color: "#fff" }}>Find {title}</Title>
              </View>
            </Card.Content>

            {<ScrollView bounces={false} showsVerticalScrollIndicator={false}>
            <Card style={[AppStyles.marginHorizontal_1,{}]}>
              {templates}
              <View style={[AppStyles.flex_End, AppStyles.marginTop_2, AppStyles.margin_2]}>
                <CustomButtons
                  onPress={() => this.onSearch(stateObject)}
                  title="Search"
                  titleStyle={AppStyles.signInTextStyle}
                  containerStyle={AppStyles.btnContainer}
                  buttonStyle={{backgroundColor: UiColor.SUCCESS_COLOR }}
                />
              </View>
              {/* <Text>{'\n \n \n \n \n \n'}</Text> */}
            </Card>
            </ScrollView>}
            <View style={AppStyles.marginTop_5} />

          
          </View>
          <AlertBox
              stateObject={stateObject}
            />

            {stateObject.state.isLoading &&
              <Spinner loading={stateObject.state.isLoading} />}
        </Modal>
      </Portal>
    );
  }
}




const styles = StyleSheet.create({
 
  modalContainer: {
    backgroundColor: UiColor.SKYBLUE,
    margin: h('1.5%'),
    padding: h('.5%'),
    maxHeight: height - h('15%'),
    borderRadius:h('1%')
  },
})
export default FilterComponent;

