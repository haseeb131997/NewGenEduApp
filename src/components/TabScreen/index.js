
import React, { Component } from 'react';
import { StyleSheet, View, } from 'react-native';
import MaterialTabs from 'react-native-material-tabs';
import { h,w } from '../../utils/Dimensions';
import { UiColor} from '../../theme';


 

export default class TabScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['Name', 'ID', 'Class',],
      widthArr: [115, 115, 115,],
      selectedTab: 0
    }
  }




  render() {
    const {stateObject,tabHeading,stateValue,selectedStateValue,barColor} = this.props
    const {parentStateChange} = stateObject
    const {selectedTabIndex} = stateObject.state
    return (
      <View style={styles.container}>
     <MaterialTabs
        items={tabHeading}
        selectedIndex={selectedStateValue}
        onChange={index => {parentStateChange({[stateValue]:index})}}
        barColor={barColor}
        indicatorColor={UiColor.SKYBLUE}
        activeTextColor={UiColor.SKYBLUE}
        inactiveTextColor={UiColor.LIGHT_TEXT_COLOR}
        scrollable={tabHeading.length >= 4 ? true : false}
        // scrollable={true}
        uppercase={false}
        allowFontScaling={false}
        // start NEAI2-60
        //  textStyle={styles.tabWidth}
        // end NEAI2-60
      />
    </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop:h('1%'),
    width:'100%'
  },

});
