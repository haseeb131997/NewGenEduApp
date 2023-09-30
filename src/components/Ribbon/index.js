
import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Image } from 'react-native';
import { Caption, Text, } from 'react-native-paper';
import { h, w } from '../../utils/Dimensions';
import { UiColor } from '../../theme';



export default class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  getStatusStyle(key) {
    // var item
    switch (key) {
      case 'A':
        return styles.success_Status
        break;
      case 'U':
        return styles.warring_Status
        break;
      case 'R':
        return styles.error_Status
        break;
      default:
        return styles.success_Status
        break;
    }

  }


  getShowStatus (){
    const { status,stateObject } = this.props;
    console.log('inside ribon',stateObject.state.autoAuthEnabled)
    if(status == 'A' && !stateObject.state.autoAuthEnabled){
      return true
    }
    else if(status == 'A' && stateObject.state.autoAuthEnabled){
      return false
    }
    else{
      return true
    }

  }


  render() {
    const { label, status,stateObject } = this.props;
    return this.getShowStatus() ? (
      <View style={styles.container}>
        <View
          style={this.getStatusStyle(status)}>
          <Text style={styles.labelStyle}>{label}</Text>
        </View>
        <View style={styles.bottomStyle} />
      </View>

    ): (<View/>)
  }
}


const styles = StyleSheet.create({

  container:{
    marginLeft: w('-2%')
  },

  labelStyle: {
    color: '#fff', fontWeight: '600'
  },

  success_Status: {
    width: w('25%'),
    padding: 5,
    paddingLeft: w('1%'),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: UiColor.SUCCESS_COLOR,
    borderTopRightRadius: w('1%'),
    borderBottomRightRadius: w('1%'),
  },
  error_Status: {
    width: w('25%'),
    padding: 5,
    paddingLeft: w('1%'),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: UiColor.ERROR_COLOR,
    borderTopRightRadius: w('1%'),
    borderBottomRightRadius: w('1%'),
  },
  warring_Status: {
    width: w('25%'),
    padding: 5,
    paddingLeft: w('1%'),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: UiColor.WARNING_COLOR,
    borderTopRightRadius: w('1%'),
    borderBottomRightRadius: w('1%'),
  },
  bottomStyle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderRightWidth: 10,
    borderTopWidth: 10,
    borderRightColor: 'transparent',
    borderTopColor: UiColor.BLACK,
    transform: [{ rotate: '90deg' }],
  }




})


