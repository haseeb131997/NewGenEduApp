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
import { View, StyleSheet, Image, TouchableOpacity,  } from 'react-native';
import {  Title, Text,} from 'react-native-paper';
import AppStyles from "../../../../AppStyles/AppStyles";
import { UiColor } from "../../../../theme";
import { h, w } from '../../../../utils/Dimensions';
import ImpNotes from '../../../../components/ImpNotes';








var arrayStatus = false

class AttendanceTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    }
  }

 




  onChange = (item) => {
    // var item = value[studentIndex].period[periodIndex];
    switch (item.attendance) {
      case 'P':
        item.attendance = 'L'
        this.setState({
          btnColor: '#F8C146'
        })
        break
      case 'A':
        item.attendance = 'P'
        this.setState({
          btnColor: '#EFEFEF'
        })
        break
      case 'L':
        item.attendance = 'A'
        this.setState({
          btnColor: '#DC3545'
        })
        break
      // case '-':
      //   item.attendance = 'P'
      //   this.setState({
      //     btnColor: '#4CA746'
      //   })
      //   break
    }
  }



  getColor = (value) => {
    var colorCode
    // var item = value[studentIndex].period[periodIndex];
    switch (value) {
      case 'P':
        colorCode = UiColor.SUCCESS_COLOR
        break
      case 'A':
        colorCode = UiColor.ERROR_COLOR
        break
      case 'L':
        colorCode = UiColor.WARNING_COLOR
        break
      case '-':
        colorCode = '#EFEFEF'
        break
    }
    return colorCode
  }


  getNoonDataModel (){
    const {
      stateObject,
    } = this.props
    const { dataModel} = stateObject.state

    if(dataModel.foreNoon.length != 0 && dataModel.afterNoon.length != 0){
      arrayStatus = true
     return dataModel.foreNoon
    }
    else if(dataModel.foreNoon.length != 0){
      arrayStatus = true
     return dataModel.foreNoon
    }
    else if(dataModel.afterNoon.length != 0){
      arrayStatus = false
      return dataModel.afterNoon
    }
    
    else{
      arrayStatus = false
      return []
    }
  }



  render() {
    const {
      stateObject,
      currentIndex
    } = this.props

    const { dataModel, editable, errorField } = stateObject.state 
    const { parentStateChange, } = stateObject

    return (
      <View>
     {(stateObject.state.currentOperation == 'Create' || stateObject.state.currentOperation == 'Modification')  ? <ImpNotes
          isArray={false}
          message={`By default all the students are marked as present (P), the staffs are supposed to alter the values accordingly. \n \nClick on the coloured button (P/L/A) to toggle the values: \n P - Present \n L - Leave (informed) \n A - Absent (uninformed)`}
        />
:
        <ImpNotes
          isArray={false}
          message={` P - Present \n L - Leave (informed) \n A - Absent (uninformed)`}
        />}


        <View>
          {this.getNoonDataModel().map((item, index) => (
            <View key={index.toString()} >
              <View style={[AppStyles.marginTop_2, AppStyles.viewBottomLine, AppStyles.paddingBottom_2]}>
                <View>
                  <Title style={[AppStyles.payTextStyle,]}>{index + 1}. {item.studentName}</Title>
                </View>

                <View style={[AppStyles.marginTop_2, AppStyles.flexDirectionRow]}>
                  {item.period.map((data, index1) => (
                    <View key={index1.toString()} >
                      <Text style={[AppStyles.textColor,AppStyles.alignSelf]}>P {data.periodNumber}</Text>
                      <TouchableOpacity disabled={editable}
                        onPress={() => this.onChange(data)}
                        style={[AppStyles.marginTop_1,{
                          backgroundColor: this.getColor(data.attendance),
                        }, AppStyles.projection, styles.btnStyle]}
                      >
                        <Text style={[{
                          color: data.attendance != '-' ? '#fff' : '#000'
                        }]}>{data.attendance}</Text>
                      </TouchableOpacity>

                    </View>
                  ))}

                  {(arrayStatus && dataModel.afterNoon.length != 0) && dataModel.afterNoon[index].period.map((data, index2) => (
                    <View key={index2.toString()} >
                        <Text style={[AppStyles.textColor,AppStyles.alignSelf]}>P {data.periodNumber}</Text>  
                      <TouchableOpacity disabled={editable}
                        onPress={() => this.onChange(data)}
                        style={[AppStyles.marginTop_1,{
                          backgroundColor: this.getColor(data.attendance),
                        }, AppStyles.projection, styles.btnStyle]}
                      >
                        <Text style={[{
                          color: data.attendance != '-' ? '#fff' : '#000'
                        }]}>{data.attendance}</Text>
                      </TouchableOpacity>

                    </View>
                  ))}
                </View>
                {/* <Divider style={[AppStyles.marginVertical_1]} /> */}
              </View>

            </View>
          ))}
        </View>

     
      

      </View>
    );
  }
}

const styles = StyleSheet.create({
  btnStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: w('9%'),
    height: h("5%"),
    // padding:h('1.5%'),
    // alignSelf: 'center',
    marginRight:w('2%'),
    borderRadius: 5
  },
})
export default AttendanceTable;

