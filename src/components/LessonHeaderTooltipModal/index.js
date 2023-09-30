
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



const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;


class LessonHeaderTooltipModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true
    }
  }



  render() {
    const {
      stateObject,
      planArray = [],
      title
    } = this.props
    // const { } = stateObject.state

    return (
      <Portal>
        <Modal visible={stateObject.state.showTooltipModal}
          onDismiss={() => stateObject.parentStateChange({
            showTooltipModal: false
          })}
        // contentContainerStyle={AppStyles.loginMainContainer}
        >
          <View style={[styles.modalContainer]}>
            <Card.Content>
              <View style={[AppStyles.row_space_between, AppStyles.marginVertical_1, AppStyles.alignItems]}>
                <View>
                <Title>Help</Title>
                </View>
                <TouchableOpacity onPress={() => stateObject.parentStateChange({
                  showTooltipModal: false
                })}>
                  <Image resizeMode='contain' style={AppStyles.crossIcon}
                    source={require('../../asssets/icons/arr061.png')}
                  /></TouchableOpacity>
              </View>
            </Card.Content>
             {/* <ImpNotes
              title={stateObject.state.heading}
                isArray={true}
                arrayMessage={ScreenContents.functions.getHeaderScreenContents(stateObject.state.serviceName)}
              /> */}
          <View style={[AppStyles.marginTop_2, styles.container, AppStyles.flexDirectionRow]}>
          <Image
            resizeMode='contain'
            style={AppStyles.infoIcon}
            source={require('../../asssets/icons/gen045.png')}
          />
          <View style={[AppStyles.marginLeft_1,AppStyles.flex_one]}>
            <Subheading style={AppStyles.bold_600}>{title}</Subheading>
            {planArray.map((item, index) => (
              <View key={index.toString()} style={styles.arrayContainer}>
                <Text style={styles.textColor}>{'\u2022'}</Text>
                <Text style={[{ color: item.color }, AppStyles.marginLeft_1]}>{item.text}</Text>
              </View>))
            }
           <View style={AppStyles.marginLeft_4}>

               <View  style={styles.arrayContainer}>
                <Text style={styles.textColor}>{'\u2022'}</Text>
                <Text style={styles.textColor}>Plan headings in <Text style={{color:UiColor.SUCCESS_COLOR}}>green color</Text> denotes completed plans </Text>
              </View>

              <View  style={styles.arrayContainer}>
                <Text style={styles.textColor}>{'\u2022'}</Text>
                <Text style={styles.textColor}>Plan headings in <Text style={{color:UiColor.WARNING_COLOR}}>yellow color</Text> denotes completed plans in future </Text>
              </View>

              <View  style={styles.arrayContainer}>
                <Text style={styles.textColor}>{'\u2022'}</Text>
                <Text style={styles.textColor}>Plan headings in <Text style={{color:UiColor.ERROR_COLOR}}>red color</Text> denotes completed plans in the past</Text>
              </View>


           




           </View>


          </View>
        </View>
            <Divider />
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
    padding: h('2%'),
    maxHeight: height - h('15%'),
  },
  container: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: UiColor.SKYBLUE,
    borderRadius: 5,
    padding: h('2%'),
    backgroundColor: UiColor.LIGHT_SKYBLUE

  },
  textStyle: {
    // textAlign: 'justify',
    color: UiColor.DRAK_GRAY_COLOR
  },
  arrayContainer: {
    flexDirection: 'row', marginTop: h('1%')
  },
  textColor: {
    color: UiColor.DRAK_GRAY_COLOR
  }

})

export default LessonHeaderTooltipModal



