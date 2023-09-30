
import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { h, w } from '../../utils/Dimensions';
import { UiColor } from '../../theme';
import AppStyles from "../../AppStyles/AppStyles";
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { Subheading,Text} from 'react-native-paper';
import { PieChart } from "react-native-chart-kit";



export default class CustomPieChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
   // chart state config
   chartConfig: {
    backgroundGradientFrom: "yellow",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#fff",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    // labelColor: (opacity = 0.5) => `rgba(235, 60, 100, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
  },
    }
  }

  


  render() {
    const { data,accessor} = this.props;
    return (
      <PieChart
      data={data}
      width={AppStyles.pieChartWidth.width}
      height={AppStyles.pieChartHeight.height}
      chartConfig={this.state.chartConfig}
      accessor={accessor}
      backgroundColor="transparent"
      absolute
    />
  
    )
  }
}


