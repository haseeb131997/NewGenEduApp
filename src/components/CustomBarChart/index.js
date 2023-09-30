
import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { h, w } from '../../utils/Dimensions';
import { UiColor } from '../../theme';
import AppStyles from "../../AppStyles/AppStyles";
import {
  LineChart,
  BarChart,
} from "react-native-chart-kit";


export default class CustomBarChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
   // chart state config
   chartConfig: {
    backgroundGradientFrom: "#fff",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#fff",
    backgroundGradientToOpacity: 0.5,
    // color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    color: (opacity = 1) => UiColor.SUCCESS_COLOR,
    // labelColor: (opacity = 0.5) => `rgba(235, 60, 100, ${opacity})`,
    labelColor: (opacity = 0.5) => UiColor.DRAK_GRAY_COLOR,
    useShadowColorFromDataset: false // optional
  }
    }
  }

  


  render() {
    const { data} = this.props;
    return (
      <ScrollView horizontal={true}> 
      <BarChart
      data={data}
      width={AppStyles.barChartWidth.width}
      height={AppStyles.barChartHeight.height}
      yAxisSuffix="%"
      fromZero={true}
      chartConfig={this.state.chartConfig}
      verticalLabelRotation={28}
      showValuesOnTopOfBars={true}
    />
    </ScrollView>
    )
  }
}


