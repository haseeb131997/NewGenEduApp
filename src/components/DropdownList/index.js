

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
import { View, StyleSheet, TouchableOpacity, FlatList, Image, Dimensions,} from 'react-native';
import { w, h, } from "../../utils/Dimensions";
import { Card, Portal, Divider,  Modal, Subheading,  Caption } from 'react-native-paper';
//import SearchUtils from "../../utils/SearchUtils";
import apiCall from "../../ApiCall/ActionApi";
import AppStyles from "../../AppStyles/AppStyles";
import { UiColor } from '../../theme';
//import Entypo from 'react-native-vector-icons/Entypo';




const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

var tempArray = new Map()
var standardService = []

class DropdownList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      query: '',
      searchValue: "",
      listStatus: false
    }
    this.onResultClick = this.onResultClick.bind(this)
  }

  componentDidMount() {
    const { searchText } = this.props
    apiCall.functions.searchDataModel = {
      searchFilter: "",
      searchResults: []
    }
  }
  // componentWillReceiveProps(nextProps) {
  //   this.setState({
  //     searchValue: nextProps.searchText
  //   })
  // }


yearDropdown


  onResultClick(item) {
    const { stateObject } = this.props

    this.props.onChangeValue(item.value)

    stateObject.parentStateChange({
      dropdownVisible: false,
    })

  }


// getDropDownList(){
//   const { dropdownName } = this.props
//   switch(dropdownName){
//     case 'authDropdown':
//      return SelectListUtils.functions.selectMaster.AuthStatusMaster
//     break;
//     case 'authDropdown':
//      return SelectListUtils.functions.selectMaster.AuthStatusMaster
//     break;
//   }
// }





  switchRender() {
    const { stateObject, items } = this.props
    return (<View >
      {items &&
        <View style={styles.flatListContainer}>
          <FlatList
            keyboardShouldPersistTaps='handled'
            data={items}
            bounces={false}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                key={index + 'touchable'}
                onPress={() => this.onResultClick(item)}
              >
                <View key={index + 'View'} style={styles.rowStyle}>
                  <Subheading key={index + 'text'} style={[styles.colTextStyle]}>{item.label}</Subheading>
                </View>
                <Divider style={styles.separatorStyle} />
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
          // extraData={selected}
          //  ListEmptyComponent={<View style={{}}><Text>empty</Text></View>}
          />
        </View>
      }
    </View>)

  }

  render() {
    const { query } = this.state
    const {
      searchName,
      visible,
      stateObject,
      SuggestionHeading,
      subHeadingRecordName,
      label
    } = this.props
    return (<Portal>
      <Modal visible={visible}
        onDismiss={() => stateObject.parentStateChange({
          dropdownVisible: false,
        })}
      >
        <View style={styles.container}>
          <Card.Content>
            <View style={[AppStyles.row_space_between, AppStyles.alignItems]}>
              <Subheading>{SuggestionHeading}</Subheading>

              <View>
              </View>
              <TouchableOpacity onPress={() => stateObject.parentStateChange({
                dropdownVisible: false,
              })}>
                <Image resizeMode='contain' style={AppStyles.crossIcon}
                  source={require('../../asssets/icons/arr061.png')}
                /></TouchableOpacity>
            </View>
            <Caption style={AppStyles.textColor}>You can choose {subHeadingRecordName} by clicking on it</Caption>
          </Card.Content>
          {this.switchRender(searchName)}
        </View>
      </Modal>
    </Portal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    //  height: '100%', width: '100%', backgroundColor: '#fff'
    backgroundColor: UiColor.WHITE,
    margin: h('3%'),
    padding: h('1%'),
    height: height - h('30%'),
  },
  postionStlye: {
    width: w(90),
    position: 'absolute',
    zIndex: 9999,
  },
  colHeadingContainer: {
    padding: h(1),
    flex: 1,
    justifyContent: 'space-between'
  },
  headdingcolTextStyle: {
    fontSize: h(2.5),
    width: w(20),
    textAlign: 'center'
  },
  colTextStyle: {
    textAlign: 'center',

  },
  textBold: {
    fontWeight: 'bold',
    color: UiColor.SKYBLUE
  },
  rowStyle: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingVertical: h('1%')
  },
  separatorStyle: {
    width: '95%',
    alignSelf: "center",
    marginVertical: h(.5)
  },
  inputs: {
    flex: 1,
    color: UiColor.DRAK_GRAY_COLOR,
    paddingHorizontal: 10,

  },
  inputView: {
    width: '100%',
    height: h('6%'),
    backgroundColor: UiColor.APP_BACKGROUND,
    borderRadius: 6,
    paddingHorizontal: 10,
    display: 'flex',
    flexDirection: 'row'
  },
  flatListContainer: {
    height: height - h('40%')
  }

})
export default DropdownList;
