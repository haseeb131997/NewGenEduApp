
import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { h, w } from '../../../../utils/Dimensions';
import { UiColor } from '../../../../theme';
import AppStyles from "../../../../AppStyles/AppStyles";
import GeneralUtils from "../../../../utils/GeneralUtils";
import {  Card, Subheading, Text,  } from 'react-native-paper';
import StudentSerachBox from '../../../../components/StudentSerachBox';






var showResults = []

var arrayStatus = false

export default class FilterListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      summaryResult: [],
      searchQuery:''
    }
    this.onChangeSearch =  this.onChangeSearch.bind(this)
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



  getNoonDataModel(data) {


    if (data.foreNoon.length != 0 && data.afterNoon.length != 0) {
      arrayStatus = true
      return data.foreNoon
    }
    else if (data.foreNoon.length != 0) {
      arrayStatus = true
      return data.foreNoon
    }
    else if (data.afterNoon.length != 0) {
      arrayStatus = false
      return data.afterNoon
    }

    else {
      arrayStatus = false
      return []
    }
  }



  onChangeSearch(text){
    this.setState({
     searchQuery:text
    }) 
   }
 


  render() {
    const { stateObject, dataModel } = this.props;

    var mapping=['classDesc','month','year']
    // showResults = GeneralUtils.functions.getSummaryResult(stateObject)
     showResults = GeneralUtils.functions.studentSerachFilter(stateObject, GeneralUtils.functions.getSummaryResult(stateObject),mapping,this.state.searchQuery)

 

    return (
    <View>
    <StudentSerachBox
    searchQuery={this.state.searchQuery}
    stateObject={stateObject}
    onChangeSearch={(text)=> this.onChangeSearch(text)}
    />

        {showResults.map((rowData, index) => (
          <TouchableOpacity disabled key={index.toString()}>
            <Card style={AppStyles.marginTop_2}>
              <Card.Content>
                {/* <View style={AppStyles.alignItems}>
                  <Title style={AppStyles.primaryTitleStyle}>{rowData.studentName}</Title>
                  <Caption >{rowData.studentID}</Caption>
                </View> */}

                <View style={[AppStyles.marginTop_2]}>
                  <View style={[AppStyles.dashContainer, AppStyles.alignItems]}>
                    <Subheading style={AppStyles.titleColor}>{rowData.classDesc}</Subheading>
                    <Text style={AppStyles.textColor}>{'Class Description'}</Text>
                  </View>
                </View>
                <View style={[AppStyles.marginTop_2]}>
                  <View style={[AppStyles.dashContainer, AppStyles.alignItems]}>
                    <Subheading >{GeneralUtils.functions.getMonthFullName(rowData.month)} {rowData.year}</Subheading>
                    <Text style={AppStyles.textColor}>{'Month & Year'}</Text>
                  </View>
                </View>
                {/* {rowData.attendanceType = 'D'} */}
                {rowData.dates.map((parentData, parentIndex) => (
                  <View key={parentIndex.toString()}>
                    <View style={[AppStyles.alignItems, AppStyles.marginTop_2]}>
                      <Subheading style={AppStyles.primaryTitleStyle}>{parentData.date}</Subheading>
                    </View>
                    {rowData.attendanceType == "P" && <View style={[AppStyles.viewBottomLine, AppStyles.paddingBottom_2]}>
                      <View style={[AppStyles.marginTop_2, AppStyles.flexDirectionRow]}>
                        {this.getNoonDataModel(parentData).map((item, index1) => (
                          <View key={index1.toString()} >
                            <View >
                              <Text style={[AppStyles.textColor, AppStyles.alignSelf]}>P {item.periodNumber}</Text>
                              <TouchableOpacity disabled={true}
                                style={[AppStyles.marginTop_1, {
                                  backgroundColor: this.getColor(item.attendance),
                                }, AppStyles.projection, styles.btnStyle]}
                              >
                                <Text style={[{
                                  color: item.attendance != '-' ? '#fff' : '#000'
                                }]}>{item.attendance}</Text>
                              </TouchableOpacity>
                            </View>
                          </View>
                        ))}
                        {(arrayStatus && parentData.afterNoon.length != 0) && parentData.afterNoon.map((data, index3) => (
                          <View key={index3.toString()} >
                            <Text style={[AppStyles.textColor, AppStyles.alignSelf]}>P {data.periodNumber}</Text>
                            <TouchableOpacity disabled={true}

                              style={[AppStyles.marginTop_1, {
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
                    </View>}


                    {rowData.attendanceType == "N" && <View style={[AppStyles.viewBottomLine, AppStyles.paddingBottom_2]}>
                      <View style={[AppStyles.marginTop_2, AppStyles.row_in_space_around]}>
                        {this.getNoonDataModel(parentData).map((item, index1) => (
                          <View key={index1.toString()} >
                            <View style={AppStyles.alignItems}>
                              <Text style={[AppStyles.textColor, AppStyles.alignSelf]}>Forenoon</Text>
                              <TouchableOpacity disabled={true}
                                style={[AppStyles.marginTop_1, {
                                  backgroundColor: this.getColor(item.attendance),
                                }, AppStyles.projection, styles.btnStyle]}
                              >
                                <Text style={[{
                                  color: item.attendance != '-' ? '#fff' : '#000'
                                }]}>{item.attendance}</Text>
                              </TouchableOpacity>
                            </View>
                          </View>
                        ))}
                        {(arrayStatus && parentData.afterNoon.length != 0) && parentData.afterNoon.map((data, index3) => (
                          <View key={index3.toString()} >
                            <View style={AppStyles.alignItems}>
                              <Text style={[AppStyles.textColor, AppStyles.alignSelf]}>Afternoon</Text>
                              <TouchableOpacity disabled={true}

                                style={[AppStyles.marginTop_1, {
                                  backgroundColor: this.getColor(data.attendance),
                                }, AppStyles.projection, styles.btnStyle]}
                              >
                                <Text style={[{
                                  color: data.attendance != '-' ? '#fff' : '#000'
                                }]}>{data.attendance}</Text>
                              </TouchableOpacity>
                            </View>
                          </View>
                        ))}

                      </View>
                    </View>}


                    {rowData.attendanceType == "D" && <View style={[AppStyles.viewBottomLine, AppStyles.paddingBottom_2]}>
                      <View style={[AppStyles.marginTop_2, AppStyles.row_in_space_around]}>
                        {this.getNoonDataModel(parentData).map((item, index1) => (
                          <View key={index1.toString()} >
                            <View style={AppStyles.alignItems}>
                              <Text style={[AppStyles.textColor, AppStyles.alignSelf]}>Day wise</Text>
                              <TouchableOpacity disabled={true}
                                style={[AppStyles.marginTop_1, {
                                  backgroundColor: this.getColor(item.attendance),
                                }, AppStyles.projection, styles.btnStyle]}
                              >
                                <Text style={[{
                                  color: item.attendance != '-' ? '#fff' : '#000'
                                }]}>{item.attendance}</Text>
                              </TouchableOpacity>
                            </View>
                          </View>
                        ))}
                        {(arrayStatus && parentData.afterNoon.length != 0) && parentData.afterNoon.map((data, index3) => (
                          <View key={index3.toString()} >
                            <View style={AppStyles.alignItems}>
                              <Text style={[AppStyles.textColor, AppStyles.alignSelf]}>Day wise</Text>
                              <TouchableOpacity disabled={true}

                                style={[AppStyles.marginTop_1, {
                                  backgroundColor: this.getColor(data.attendance),
                                }, AppStyles.projection, styles.btnStyle]}
                              >
                                <Text style={[{
                                  color: data.attendance != '-' ? '#fff' : '#000'
                                }]}>{data.attendance}</Text>
                              </TouchableOpacity>
                            </View>
                          </View>
                        ))}

                      </View>
                    </View>}




                  </View>
                ))}




              </Card.Content>
            </Card>
          </TouchableOpacity>
        ))}

      </View>
    )
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
    marginRight: w('2%'),
    borderRadius: 5
  },


})



