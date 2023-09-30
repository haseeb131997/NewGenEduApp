
import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { h, w } from '../../utils/Dimensions';
import { UiColor } from '../../theme';
import AppStyles from "../../AppStyles/AppStyles";
import GeneralUtils from "../../utils/GeneralUtils";
import { Subheading,Text} from 'react-native-paper';



export default class ListView extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  


  render() {
    const { stateObject, mapValue1, mapValue2, mapValue3, stateArray } = this.props;
    return (
      <View>
        {stateArray.map((rowData, index) => (
          <View key={index.toString()} style={[AppStyles.eventContainer,{borderLeftColor: GeneralUtils.functions._getRandomColor(index)}]}>
            <View style={[AppStyles.row_space_between, AppStyles.alignItems]}>
              <View style={AppStyles.width85}>
                <Subheading>{rowData[mapValue1]}</Subheading>
                <Text style={AppStyles.attrNameStyle}>{rowData[mapValue2]}</Text>
              </View>
              {mapValue3 != undefined && <View style={AppStyles.qeueCountContainer}>
                <Text style={AppStyles.countStyle}>{rowData[mapValue3]}</Text>
              </View>}
            </View>
          </View>))
        }
      </View>
    )
  }
}


