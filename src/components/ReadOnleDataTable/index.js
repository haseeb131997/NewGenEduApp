
import React, { Component } from 'react';
import { StyleSheet, View,ScrollView } from 'react-native';
import { h, w } from '../../utils/Dimensions';
import { UiColor } from '../../theme';
import { DataTable } from 'react-native-paper';

const optionsPerPage = [2, 3, 4];


export default class TabScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['Name', 'ID', 'Class',],
      widthArr: [115, 115, 115,],
      selectedTab: 0,
      page:0,
      itemsPerPage:optionsPerPage[0]
    }
  }




  render() {
    const { stateObject, colHeading, mappping, stateArray } = this.props;
    return (
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <DataTable  >
          <DataTable.Header>
            {colHeading.map((headingData, ind) => (
              <DataTable.Title key={ind.toString()}>{headingData}</DataTable.Title>
            ))
            }
          </DataTable.Header>
          {stateArray.map((rowData, index) => (
            <DataTable.Row key={index.toString()}>
              {mappping.map((colkey, index1) => (
                <DataTable.Cell key={index1.toString()}>{rowData[colkey]}</DataTable.Cell>
              ))}
            </DataTable.Row>
          ))}

       <DataTable.Pagination
        page={this.state.page}
        numberOfPages={3}
        onPageChange={(page) => this.setState({page:page})}
        label="1-2 of 6"
        optionsPerPage={optionsPerPage}
        itemsPerPage={this.state.itemsPerPage}
        setItemsPerPage={(perPage)=> this.setState({itemsPerPage:perPage}) }
        showFastPagination
        optionsLabel={'Rows per page'}
      />
        </DataTable>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width:w('170%')
  },

});
