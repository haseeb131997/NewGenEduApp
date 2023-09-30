
import React, { Component } from 'react';
import { StyleSheet, View, } from 'react-native';
import MaterialTabs from 'react-native-material-tabs';
import { h,w } from '../../utils/Dimensions';
import { UiColor} from '../../theme';
import AppStyles from "../../AppStyles/AppStyles";
import { Text,Menu,Divider} from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { color } from 'r';


 

export default class CustomTabScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['Name', 'ID', 'Class',],
      widthArr: [115, 115, 115,],
      selectedTab: 0,
      visible:false
    }
  }

  openMenu = () => this.setState({visible:true});

  closeMenu = () => this.setState({visible:false});


   hideMenu = async (selectedIndex) => {
    const {stateObject,stateValue} = this.props
    const {parentStateChange} = stateObject
    parentStateChange({[stateValue]:selectedIndex})
    this.setState({
      visible:false
    })
  };


  render() {
    const {stateObject,tabHeading,stateValue,selectedStateValue,barColor,otherTabHeading} = this.props
    const {parentStateChange} = stateObject
    const {selectedTabIndex} = stateObject.state
    return (
      <View style={[AppStyles.flexDirectionRow,]}>
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
   
      <View style={[AppStyles.alignInCenter,
       (selectedStateValue != 0 && selectedStateValue != 1 ) ? styles.activeMoreContainer : styles.inActiveMoreContainer,
        ]}>
       <Menu
          visible={this.state.visible}
          onDismiss={this.closeMenu}
          anchor={<TouchableOpacity onPress={this.openMenu} ><Text style={{color: (selectedStateValue != 0 && selectedStateValue != 1 ) ? UiColor.SKYBLUE : UiColor.LIGHT_TEXT_COLOR}}>More</Text></TouchableOpacity>}>
            {otherTabHeading.map((item, index) => (
         <View key={index.toString()}>
            <Menu.Item  onPress={() => this.hideMenu(index + 2)} title={item} />
          {/* {otherTabHeading.length > 1 && <Divider />} */}
         </View>
          ))
                    }
        
        </Menu>

     
      </View>
    </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    // marginTop:h('1%'),
    width:'70%'
  },
  activeMoreContainer: {
    borderBottomColor:UiColor.SKYBLUE,
    width:'30%',
    borderBottomWidth:2
  },
  inActiveMoreContainer: {
    borderBottomColor:UiColor.LIGHT_TEXT_COLOR,
    width:'30%',
    borderBottomWidth:0
  },
  moreTextStyle: {
    color:UiColor.LIGHT_TEXT_COLOR,
  },

});
