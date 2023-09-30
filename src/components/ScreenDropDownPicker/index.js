
import React, { Component } from 'react';
import { StyleSheet, View, ScrollView ,Image} from 'react-native';
import AppStyles from "../../AppStyles/AppStyles";
import { UiColor } from '../../theme';
import DropDownPicker from 'react-native-dropdown-picker';
import { h } from '../../utils/Dimensions';
import { Button, Caption, Text } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Tooltip } from 'react-native-elements';

export default class ScreenDropDownPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open:false,
      value:null,
      items: props.items
    }
    this.setOpen = this.setOpen.bind(this)
    this.setValue = this.setValue.bind(this)
  }

  
  setOpen(open) {
    this.setState({
      open
    });
  }
  

  setValue(callback){
    const {onChangeValue} = this.props;
    this.setState(state => ({
      value: callback(state.value)
    }),()=>{
      onChangeValue(this.state.value)
    }); 
  }



  setItems(callback) {
    this.setState(state => ({
      items: callback(state.items)
    }));
  }

  render() {
    const {items,value,stateObject,placeholder,onChangeValue,label,required,errorMessage,editable,zIndex,zIndexInverse, tooltipReq,
      tooltipMsg,
       tooltipStyle} = this.props;
    const {open} = this.state;

     


    return (
      <View >
           <View style={AppStyles.flexDirectionRow}>
      <Text style={styles.labelHeadingStyle}>{label} {required && <Text style={styles.requiredStyle}>* </Text>}</Text> 
      {tooltipReq &&<Tooltip
       overlayColor={UiColor.TRANSPARENT}
       containerStyle={[AppStyles.tooltipContainer,AppStyles.projection,AppStyles.degfaulttooltipStyle,tooltipStyle]}
       popover={<Caption>{tooltipMsg}</Caption>}>
        <AntDesign  name="questioncircle" size={AppStyles.tooltipIcn.height} color={UiColor.LIGHT_TEXT_COLOR} />
        </Tooltip>}
      </View>
      <DropDownPicker
      open={open}
      items={this.state.items}
      value={value}
      activeLabelStyle={styles.activeLabelStyle}
      labelStyle={styles.labelStyle}
      placeholder={placeholder}
      style={styles.dropDownStyle}
      dropDownContainerStyle={styles.dropDownContainerStyle}
      setOpen={this.setOpen}
      // setValue={this.setValue}
      setValue={this.setValue}
      listMode="SCROLLVIEW"  
      arrowIconStyle={styles.arrowIconStyle}
      tickIconStyle={styles.tickIconStyle}
      textStyle={styles.textStyle}
      setItems={this.setItems}
      disabled={editable}
      zIndex={zIndex}
      zIndexInverse={zIndexInverse}
    
    />
         <Caption style={AppStyles.fieldErrorMsg}>{errorMessage}</Caption>
  </View>
    )
  }
}

const styles = StyleSheet.create({
activeLabelStyle:{
  color: UiColor.SKYBLUE 
},
labelStyle:{
  color: UiColor.DRAK_GRAY_COLOR
},
textStyle:{
  color: UiColor.DRAK_GRAY_COLOR
},
arrowIconStyle:{
  tintColor:UiColor.DRAK_GRAY_COLOR
},
tickIconStyle:{
  tintColor:UiColor.SUCCESS_COLOR
},
dropDownStyle:{
  backgroundColor: UiColor.APP_BACKGROUND,
   color: '#000',
   borderWidth:0,
   width:'100%',
   alignSelf:'center',
   height:h('6%'), 
   marginTop: 6,
   
},
dropDownContainerStyle:{
  borderWidth:0,
  width:'100%',
  alignSelf:'center',
  backgroundColor:"#fff"
},
labelHeadingStyle: {
  fontWeight: '400' 
},
requiredStyle: {
  fontWeight: '400',
  color:UiColor.ERROR_COLOR 
},
})
