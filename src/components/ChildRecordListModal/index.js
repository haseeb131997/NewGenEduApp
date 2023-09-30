
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
import { w, h } from "../../utils/Dimensions";
import AppStyles from '../../AppStyles/AppStyles';
import { UiColor } from "../../theme";
import { ScrollView } from 'react-native-gesture-handler';
import AlertBox from '../../components/AlertBox';
import Spinner from '../../components/Loader';
import SubScreenUtils from "../../utils/SubScreenUtils";
import FullViewDocument from '../../components/FullViewDocument';
import GeneralUtils from "../../utils/GeneralUtils";
import EditComponent from '../../components/EditComponent';
import ViewComponent from '../../components/ViewComponent';
import AuthAndRejectComponent from '../../components/AuthAndRejectComponent';
import CreateComponent from '../../components/CreateComponent';




const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;


class ChildRecordListModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true
    }
  }





  render() {
    const {
      stateObject, templates, stepsHeading, title, viewHeading, CreateTemplate,EditTemplate, ViewTemplate, queryTitle, querySubTitle, AuthTemplate
    } = this.props
    const { currentOperation, isChildRecordShow } = stateObject.state
    return (
      <Portal>
        <Modal visible={isChildRecordShow} 
        onDismiss={() => SubScreenUtils.functions.closeChildListModal(stateObject)}
        contentContainerStyle={AppStyles.loginMainContainer}
          >
          <View style={[AppStyles.modalContainer,AppStyles.flex_one]}>
            <Card.Content>
              <View style={[AppStyles.row_space_between, AppStyles.marginVertical_1, AppStyles.alignItems]}>
                <View>
                  <Title>{viewHeading}</Title>
                  <Text style={AppStyles.textColor}>{title}</Text>
                </View>
                <TouchableOpacity onPress={() => SubScreenUtils.functions.closeChildListModal(stateObject)}>
                  <Image resizeMode='contain' style={AppStyles.crossIcon}
                    source={require('../../asssets/icons/arr061.png')}
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
            <AlertBox
              stateObject={stateObject}
            />

            {stateObject.state.isLoading &&
              <Spinner loading={stateObject.state.isLoading} />}
          </View>




          <FullViewDocument
            stateObject={stateObject}
            source={GeneralUtils.functions.getSource(GeneralUtils.functions.contentPath, this)}
            fileName={GeneralUtils.functions.getFileName(GeneralUtils.functions.contentPath)}
          />

          <CreateComponent
            stateObject={stateObject}
            templates={CreateTemplate}
            stepsHeading={stateObject.state.createStepsHeading}
            title={stateObject.state.heading}
          />

          <EditComponent
            stateObject={stateObject}
            templates={EditTemplate}
            title={stateObject.state.heading}
          />
          <ViewComponent
            stateObject={stateObject}
            templates={ViewTemplate}
            title={querySubTitle}
            viewHeading={queryTitle}
          />
          <AuthAndRejectComponent
            stateObject={stateObject}
            templates={AuthTemplate}
            title={stateObject.state.heading}
          />


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
    maxHeight: height - h('10%')
  }

})

export default ChildRecordListModal



