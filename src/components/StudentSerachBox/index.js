
import React, { Component } from 'react';
import { StyleSheet,  } from 'react-native';
import {  Searchbar } from 'react-native-paper';
//import { h, w } from '../../utils/Dimensions';
//import { UiColor } from '../../theme';



export default class StudentSerachBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: ''
    }
  }

  onChangeSearch(text) {
    this.setState({
      searchQuery: text
    },()=>{
      //this.switchRender()  //N0U-103
    })


  }

  // switchRender() {
  //   const { mapping, stateObject, summaryResult,onChangeSearch } = this.props
  //   const { searchQuery } = this.state


  //   var filterData = []
  //   var i = 0
  //   var list
  //   try {
  //     list = summaryResult;
  //   } catch (err) {
  //     list = null
  //   }
  //   if (list != null && list.length != 0) {
  //     if (searchQuery != '') {
  //       for (let rowData of list) {
  //         for (let colkey of mapping) {
  //           if (rowData[colkey].toLowerCase().includes(searchQuery.toLowerCase())) {
  //             filterData[i] = rowData;
  //             i++;
  //             break;
  //           }
  //         }
  //       }
  //     }
  //     else {
  //       filterData = list
  //     }

  //     console.log(filterData, "filterData")
  //     // return (this.searchTemplate(filterData, searchName))
  //   }
  //   else
  //     return null

  // }



  render() {
    const { stateObject, summaryResult,onChangeSearch,searchQuery } = this.props;
    return (
      <Searchbar
        placeholder="Search"
        onChangeText={(text) => onChangeSearch(text)}
        value={searchQuery}
        style={{ elevation: 0 }}
      />
    )
  }
}


const styles = StyleSheet.create({


})


